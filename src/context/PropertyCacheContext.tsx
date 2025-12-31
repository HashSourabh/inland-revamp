'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface PropertyForCard {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  currency: string;
  shortDescription: string;
  location: {
    province: string | null;
    town: string | null;
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    buildSize: number;
    type: string;
  };
  images: {
    url: string;
    alt: string;
    isFeatured: boolean;
  }[];
  isReduced?: boolean;
  savingsAmount?: number;
}

interface RegionCount {
  regionId: number;
  regionName: string;
  count: number;
}

interface AreaData {
  areaId: number;
  areaName: string;
  count: number;
}

interface PropertyCacheContextType {
  featuredProperties: PropertyForCard[];
  exclusiveProperties: PropertyForCard[];
  propertyTypesMap: Record<number, string>;
  regionCounts: RegionCount[];
  areasCache: Map<number, AreaData[]>;
  lastFetchTime: number | null;
  regionCountsLastFetchTime: number | null;
  areasLastFetchTime: Map<number, number>;
  setFeaturedProperties: (properties: PropertyForCard[]) => void;
  setExclusiveProperties: (properties: PropertyForCard[]) => void;
  setPropertyTypesMap: (types: Record<number, string>) => void;
  setRegionCounts: (counts: RegionCount[]) => void;
  setAreas: (regionId: number, areas: AreaData[]) => void;
  updateLastFetchTime: () => void;
  updateRegionCountsFetchTime: () => void;
  updateAreasFetchTime: (regionId: number) => void;
  isDataStale: () => boolean;
  isRegionCountsStale: () => boolean;
  isAreasStale: (regionId: number) => boolean;
  clearCache: () => void;
}

const PropertyCacheContext = createContext<PropertyCacheContextType | undefined>(undefined);

// Performance: Cache duration set to 5 minutes (300,000ms) for optimal balance
// between fresh data and reduced API calls. This matches the documented behavior.
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export function PropertyCacheProvider({ children }: { children: ReactNode }) {
  const [featuredProperties, setFeaturedProperties] = useState<PropertyForCard[]>([]);
  const [exclusiveProperties, setExclusiveProperties] = useState<PropertyForCard[]>([]);
  const [propertyTypesMap, setPropertyTypesMap] = useState<Record<number, string>>({});
  const [regionCounts, setRegionCounts] = useState<RegionCount[]>([]);
  const [areasCache, setAreasCache] = useState<Map<number, AreaData[]>>(new Map());
  const [lastFetchTime, setLastFetchTime] = useState<number | null>(null);
  const [regionCountsLastFetchTime, setRegionCountsLastFetchTime] = useState<number | null>(null);
  const [areasLastFetchTime, setAreasLastFetchTime] = useState<Map<number, number>>(new Map());

  const updateLastFetchTime = useCallback(() => {
    setLastFetchTime(Date.now());
  }, []);

  const updateRegionCountsFetchTime = useCallback(() => {
    setRegionCountsLastFetchTime(Date.now());
  }, []);

  const updateAreasFetchTime = useCallback((regionId: number) => {
    setAreasLastFetchTime(prev => new Map(prev.set(regionId, Date.now())));
  }, []);

  const isDataStale = useCallback(() => {
    if (!lastFetchTime) return true;
    return Date.now() - lastFetchTime > CACHE_DURATION;
  }, [lastFetchTime]);

  const isRegionCountsStale = useCallback(() => {
    if (!regionCountsLastFetchTime) return true;
    return Date.now() - regionCountsLastFetchTime > CACHE_DURATION;
  }, [regionCountsLastFetchTime]);

  const isAreasStale = useCallback((regionId: number) => {
    const lastFetch = areasLastFetchTime.get(regionId);
    if (!lastFetch) return true;
    return Date.now() - lastFetch > CACHE_DURATION;
  }, [areasLastFetchTime]);

  const clearCache = useCallback(() => {
    setFeaturedProperties([]);
    setExclusiveProperties([]);
    setPropertyTypesMap({});
    setRegionCounts([]);
    setAreasCache(new Map());
    setLastFetchTime(null);
    setRegionCountsLastFetchTime(null);
    setAreasLastFetchTime(new Map());
  }, []);

  const value: PropertyCacheContextType = {
    featuredProperties,
    exclusiveProperties,
    propertyTypesMap,
    regionCounts,
    areasCache,
    lastFetchTime,
    regionCountsLastFetchTime,
    areasLastFetchTime,
    setFeaturedProperties,
    setExclusiveProperties,
    setPropertyTypesMap,
    setRegionCounts,
    setAreas: (regionId: number, areas: AreaData[]) => {
      setAreasCache(prev => new Map(prev.set(regionId, areas)));
    },
    updateLastFetchTime,
    updateRegionCountsFetchTime,
    updateAreasFetchTime,
    isDataStale,
    isRegionCountsStale,
    isAreasStale,
    clearCache,
  };

  return (
    <PropertyCacheContext.Provider value={value}>
      {children}
    </PropertyCacheContext.Provider>
  );
}

export function usePropertyCache() {
  const context = useContext(PropertyCacheContext);
  if (context === undefined) {
    throw new Error('usePropertyCache must be used within a PropertyCacheProvider');
  }
  return context;
}

