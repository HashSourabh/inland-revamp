// utils/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://inlandandalucia.onrender.com/api/v1";

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