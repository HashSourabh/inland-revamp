// utils/api.ts
// Compute a single, consistent API base URL (should include /api/v1)
// Uses NEXT_PUBLIC_API_URL from .env.development (local) or .env (server/production)
function computeApiBase(): string {
  const raw = (process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE || "").trim();

  if (raw) {
    return raw.replace(/\/$/, "");
  }

  // Only use port 4000 on localhost
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    return `${window.location.protocol}//${window.location.hostname}:4000/api/v1`;
  }

  // Default for production
  return "https://inlandandalucia.onrender.com/api/v1";
}

export const API_BASE_URL = computeApiBase();

// Types for API responses
export interface Region {
  regionId: number;
  region: string;
  count: number;
}

export interface Area {
  areaId: number;
  areaName: string;
  count: number;
}

export interface RegionsApiResponse {
  success: boolean;
  data: {
    regions: Region[];
    total: {
      regions: number;
      properties: number;
    };
    timestamp: string;
  };
}

export interface AreasApiResponse {
  success: boolean;
  data: {
    regionId: number;
    areas: Area[];
    total: {
      areas: number;
      properties: number;
    };
    timestamp: string;
  };
}

// Fetch all regions
export async function fetchRegions(): Promise<Region[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/properties/regions/counts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch regions: ${res.status} ${res.statusText}`);
    }

    const data: RegionsApiResponse = await res.json();
    console.log("Fetched regions:", data);

    return data.data.regions || [];
  } catch (error) {
    console.error("Error fetching regions:", error);
    throw error;
  }
}

// Find region by name (case-insensitive, handles URL formatting)
export async function findRegionByName(regionName: string): Promise<Region | null> {
  try {
    const regions = await fetchRegions();

    // Normalize the region name from URL (replace hyphens with spaces, etc.)
    const normalizedName = regionName
      .replace(/-/g, ' ')
      .toLowerCase()
      .trim();

    const matchingRegion = regions.find(region =>
      region.region.toLowerCase().trim() === normalizedName
    );

    return matchingRegion || null;
  } catch (error) {
    console.error("Error finding region:", error);
    return null;
  }
}

// Fetch areas by regionId
export async function fetchAreas(regionId: number): Promise<{ areas: Area[], regionId: number }> {
  try {
    const res = await fetch(`${API_BASE_URL}/properties/regions/${regionId}/areas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch areas: ${res.status} ${res.statusText}`);
    }

    const response: AreasApiResponse = await res.json();

    if (!response.success) {
      throw new Error('Failed to fetch areas');
    }

    return {
      areas: response.data.areas || [],
      regionId: response.data.regionId
    };
  } catch (error) {
    console.error('Error fetching areas:', error);
    throw error;
  }
}

// Fetch areas by region name (convenience method)
export async function fetchAreasByRegionName(regionName: string): Promise<{ areas: Area[], regionId: number } | null> {
  try {
    const region = await findRegionByName(regionName);
    if (!region) {
      throw new Error(`Region "${regionName}" not found`);
    }

    return await fetchAreas(region.regionId);
  } catch (error) {
    console.error('Error fetching areas by region name:', error);
    return null;
  }
}

// Fetch properties by location (for the "View Properties" button)
export async function fetchPropertiesByLocation(location: string, page: number = 1, limit: number = 10) {
  try {
    const params = new URLSearchParams({
      location: location,
      page: page.toString(),
      limit: limit.toString(),
    });

    const res = await fetch(`${API_BASE_URL}/properties?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch properties: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching properties by location:', error);
    throw error;
  }
}

export interface PropertyType {
  id: number;
  name: string;
  code: string;
}

export async function fetchPropertyTypes(): Promise<PropertyType[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/properties/types?languageId=1`);
    if (!res.ok) throw new Error(`Failed: ${res.status}`);

    const data = await res.json();
    if (data?.success && data.data) {
      return data.data.map((r: any) => ({
        id: r.id,
        name: r.name,
        code: r.code,
      }));
    }
    return [];
  } catch (err) {
    console.error("Error loading property types:", err);
    return [];
  }
}

// Fetch top N properties filtered by optional type and location keywords
export interface TopPropertyItem {
  id: number | string;
  title: string;
  link: string;
}

export async function fetchTopProperties({
  location,
  propertyType,
  limit = 5,
}: {
  location?: string;
  propertyType?: string | number; // name/code or id
  limit?: number;
}): Promise<TopPropertyItem[]> {
  try {
    const params = new URLSearchParams({
      limit: String(limit),
    });

    if (location && location.trim()) {
      // backend supports generic location matching (province/town/area)
      params.set('location', location.trim());
    }

    if (propertyType !== undefined && propertyType !== null && String(propertyType).trim()) {
      // Prefer numeric id; if not numeric, pass as code/name for backend to interpret if supported
      const pt = String(propertyType).trim();
      if (/^\d+$/.test(pt)) {
        params.set('propertyType', pt);
      } else {
        params.set('propertyTypeCode', pt);
      }
    }

    const url = `${API_BASE_URL}/properties?${params.toString()}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch top properties: ${res.status}`);
    const data = await res.json();

    const list = (data?.data || []) as Array<any>;
    return list.slice(0, limit).map((p: any) => ({
      id: p.Property_ID ?? p.id,
      title: p.Property_Address ?? p.title ?? `Property ${p.Property_ID ?? p.id}`,
      link: `/properties/${p.Property_ID ?? p.id}`,
    }));
  } catch (error) {
    console.error('Error fetching top properties:', error);
    return [];
  }
}

// Utility functions for URL handling
export function formatRegionNameForUrl(regionName: string): string {
  return regionName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function formatRegionNameForDisplay(urlName: string): string {
  return urlName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Generic error handler for API calls
export function handleApiError(error: any): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}