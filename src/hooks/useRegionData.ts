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

  const fetchRegionCounts = useCallback(async () => {
    if (!cache.isRegionCountsStale() && cache.regionCounts.length > 0) {
      return cache.regionCounts;
    }

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://inlandandalucia.onrender.com/api/v1';
      const res = await fetch(`${API_BASE_URL}/properties/regions/counts`);
      
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
        
        cache.setRegionCounts(formatted);
        cache.updateRegionCountsFetchTime();
        
        return formatted;
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching region counts:', error);
      return [];
    }
  }, [cache]);

  const fetchAreas = useCallback(async (regionId: number) => {
    if (!cache.isAreasStale(regionId)) {
      const cachedAreas = cache.areasCache.get(regionId);
      if (cachedAreas) {
        return cachedAreas;
      }
    }

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://inlandandalucia.onrender.com/api/v1';
      const res = await fetch(`${API_BASE_URL}/properties/regions/${regionId}/areas`);
      
      if (!res.ok) {
        throw new Error(`Failed to fetch areas for region ${regionId}`);
      }
      
      const data = await res.json();
      const areas = data.data?.areas || [];
      
      cache.setAreas(regionId, areas);
      cache.updateAreasFetchTime(regionId);
      
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
