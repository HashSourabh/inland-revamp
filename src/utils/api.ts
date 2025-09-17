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

// Generic error handler for API calls
export function handleApiError(error: any): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}