import { useCallback } from 'react';
import { usePropertyCache } from '@/context/PropertyCacheContext';

export interface RegionCount {
  regionId: number;
  regionName: string;
  count: number;
}

export interface AreaData {
  areaId: number;
  areaName: string;
  count: number;
}

export function useRegionData() {
  const cache = usePropertyCache();

  const fetchRegionCounts = useCallback(async (filters?: {
    propertyType?: string | null;
    minBeds?: string | null;
    minBaths?: string | null;
    minPrice?: string | null;
    maxPrice?: string | null;
  }) => {
    // For filtered counts, don't use cache - always fetch fresh data
    // Only use cache when no filters are applied
    const hasFilters = filters && (
      filters.propertyType || 
      filters.minBeds || 
      filters.minBaths || 
      filters.minPrice || 
      filters.maxPrice
    );

    if (!hasFilters && !cache.isRegionCountsStale() && cache.regionCounts.length > 0) {
      return cache.regionCounts;
    }

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://inlandandalucia.onrender.com/api/v1';
      
      // Build query string with filters
      const queryParams = new URLSearchParams();
      if (filters?.propertyType) queryParams.append('propertyType', filters.propertyType);
      if (filters?.minBeds) queryParams.append('minBeds', filters.minBeds);
      if (filters?.minBaths) queryParams.append('minBaths', filters.minBaths);
      if (filters?.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters?.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
      
      const queryString = queryParams.toString();
      const url = `${API_BASE_URL}/properties/regions/counts${queryString ? `?${queryString}` : ''}`;
      
      console.log('[REGION COUNTS] Fetching with filters:', filters);
      console.log('[REGION COUNTS] URL:', url);
      
      const res = await fetch(url);
      
      if (!res.ok) {
        throw new Error(`Failed to fetch region counts: ${res.status}`);
      }
      
      const data = await res.json();
      
      if (data && data.success && data.data?.regions) {
        const formatted = data.data.regions.map((r: any) => ({
          regionId: r.regionId,
          regionName: r.region,
          count: r.count,
        }));
        
        // Only cache if no filters were applied
        if (!hasFilters) {
          cache.setRegionCounts(formatted);
          cache.updateRegionCountsFetchTime();
        }
        
        return formatted;
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching region counts:', error);
      return [];
    }
  }, [cache]);

  const fetchAreas = useCallback(async (
    regionId: number,
    filters?: {
      propertyType?: string | null;
      minBeds?: string | null;
      minBaths?: string | null;
      minPrice?: string | null;
      maxPrice?: string | null;
    }
  ) => {
    // For filtered counts, don't use cache - always fetch fresh data
    // Only use cache when no filters are applied
    const hasFilters = filters && (
      filters.propertyType || 
      filters.minBeds || 
      filters.minBaths || 
      filters.minPrice || 
      filters.maxPrice
    );

    if (!hasFilters && !cache.isAreasStale(regionId)) {
      const cachedAreas = cache.areasCache.get(regionId);
      if (cachedAreas) {
        return cachedAreas;
      }
    }

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://inlandandalucia.onrender.com/api/v1';
      
      // Build query string with filters
      const queryParams = new URLSearchParams();
      if (filters?.propertyType) queryParams.append('propertyType', filters.propertyType);
      if (filters?.minBeds) queryParams.append('minBeds', filters.minBeds);
      if (filters?.minBaths) queryParams.append('minBaths', filters.minBaths);
      if (filters?.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters?.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
      
      const queryString = queryParams.toString();
      const url = `${API_BASE_URL}/properties/regions/${regionId}/areas${queryString ? `?${queryString}` : ''}`;
      
      const res = await fetch(url);
      
      if (!res.ok) {
        throw new Error(`Failed to fetch areas for region ${regionId}`);
      }
      
      const data = await res.json();
      const areas = data.data?.areas || [];
      
      // Only cache if no filters were applied
      if (!hasFilters) {
        cache.setAreas(regionId, areas);
        cache.updateAreasFetchTime(regionId);
      }
      
      return areas;
    } catch (error) {
      console.error(`Error fetching areas for region ${regionId}:`, error);
      return [];
    }
  }, [cache]);

  return {
    regionCounts: cache.regionCounts,
    areasCache: cache.areasCache,
    fetchRegionCounts,
    fetchAreas,
    isRegionCountsStale: cache.isRegionCountsStale,
    isAreasStale: cache.isAreasStale,
  };
}
