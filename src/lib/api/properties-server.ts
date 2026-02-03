/**
 * Server-side API utilities for fetching properties
 * These functions run on the server and are used by Server Components
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://inlandandalucia.onrender.com/api/v1';

interface DatabaseProperty {
  Property_ID: number;
  Property_Ref: string | string[];
  Property_Address?: string;
  Public_Price: number;
  Bedrooms: number;
  Bathrooms: number;
  Property_Type_ID: number;
  PropertyType?: string;
  Area_ID: number;
  SubArea_ID: number;
  GPS_Latitude?: number;
  GPS_Longitude?: number;
  Property_Notes?: string;
  Display: number;
  Build_Size?: number;
  Plot_Size?: number;
  Year_Built?: number;
  Featured?: boolean;
  Exclusive?: boolean;
  Original_Price?: number;
  Num_Photos?: number;
  SQM_Built?: number;
  Area_Name?: string;
  Region_Name?: string;
  PropertyAddress?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  total?: number;
  page?: number;
  pageSize?: number;
}

interface PropertyType {
  id: number;
  name: string;
  code: string;
}

/**
 * Fetch featured properties from API (server-side)
 */
export async function getFeaturedPropertiesServer(
  page: number = 1,
  pageSize: number = 9
): Promise<DatabaseProperty[]> {
  try {
    const url = `${API_BASE_URL}/properties/featured?page=${page}&pageSize=${pageSize}`;
    
    const res = await fetch(url, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes (ISR)
    });

    if (!res.ok) {
      console.error(`Featured properties API error: ${res.status} ${res.statusText}`);
      return [];
    }

    const data: ApiResponse<DatabaseProperty[]> = await res.json();
    
    if (!data.success) {
      console.error("Featured properties API returned success: false", data);
      return [];
    }
    
    if (!data.data || !Array.isArray(data.data)) {
      console.error("Featured properties API returned invalid data format", data);
      return [];
    }
    
    return data.data;
  } catch (err) {
    console.error("Error fetching featured properties:", err);
    return [];
  }
}

/**
 * Fetch exclusive properties from API (server-side)
 */
export async function getExclusivePropertiesServer(): Promise<DatabaseProperty[]> {
  try {
    const url = `${API_BASE_URL}/properties/exclusive?limit=3`;
    
    const res = await fetch(url, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes (ISR)
    });

    if (!res.ok) {
      console.error(`Exclusive properties API error: ${res.status} ${res.statusText}`);
      return [];
    }
    
    const data: ApiResponse<DatabaseProperty[]> = await res.json();
    
    if (!data.success) {
      console.error("Exclusive properties API returned success: false", data);
      return [];
    }
    
    if (!data.data || !Array.isArray(data.data)) {
      console.error("Exclusive properties API returned invalid data format", data);
      return [];
    }
    
    return data.data;
  } catch (err) {
    console.error("Error fetching exclusive properties:", err);
    return [];
  }
}

/**
 * Fetch property types from API (server-side)
 */
export async function getPropertyTypesServer(): Promise<PropertyType[]> {
  try {
    const url = `${API_BASE_URL}/properties/types`;
    
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Revalidate every hour (types change less frequently)
    });

    if (!res.ok) {
      console.error(`Property types API error: ${res.status} ${res.statusText}`);
      return [];
    }
    
    const data: ApiResponse<PropertyType[]> = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error("Error fetching property types:", err);
    return [];
  }
}

/**
 * Fetch all property data in parallel (server-side)
 */
export async function getAllPropertyDataServer() {
  // Fetch all data in parallel for maximum performance
  const [featuredProperties, exclusiveProperties, propertyTypes] = await Promise.all([
    getFeaturedPropertiesServer(1, 9),
    getExclusivePropertiesServer(),
    getPropertyTypesServer(),
  ]);

  return {
    featuredProperties,
    exclusiveProperties,
    propertyTypes,
  };
}

