"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
// Performance: Lazy load Google Maps components to reduce initial bundle size
import dynamic from 'next/dynamic';
import Image from "next/image";
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { areaImages, getIAMarkerIcon } from '@/utils/mapUtils';
import { getRegionColors } from '@/utils/colorUtils';
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams, useRouter } from 'next/navigation';
import { usePropertyCache } from '@/context/PropertyCacheContext';
import AreaFilter from '@/components/properties/AreaFilter';
import { useRegionData } from '@/hooks/useRegionData';
import GlobalLoader from '@/components/shared/GlobalLoader';

// Performance: Import useJsApiLoader normally as it's needed for initialization
// This hook is lightweight and needed early in the component lifecycle
import { useJsApiLoader } from "@react-google-maps/api";

// Performance: Dynamically import Google Maps components
// This reduces initial bundle size significantly as Google Maps is a large library
const GoogleMap = dynamic(
  () => import("@react-google-maps/api").then((mod) => ({ default: mod.GoogleMap })),
  {
    loading: () => (
      <div className="h-[70vh] bg-neutral-100" />
    ),
    ssr: false, // Google Maps requires browser APIs, disable SSR
  }
);
const Marker = dynamic(
  () => import("@react-google-maps/api").then((mod) => ({ default: mod.Marker })),
  { ssr: false }
);
const InfoWindow = dynamic(
  () => import("@react-google-maps/api").then((mod) => ({ default: mod.InfoWindow })),
  { ssr: false }
);

const containerStyle = {
  width: "100%",
  height: "70vh",
};

const defaultCenter = { lat: 37.7, lng: -4.3 };
const defaultZoom = 8;

// Types
interface Region {
  regionId: number;
  region: string;
  count: number;
}

interface Area {
  areaId: number;
  areaName: string;
  count: number;
  regionId?: number;
  regionName?: string;
  lat?: number;
  lng?: number;
}

interface AreaWithCoordinates extends Area {
  lat: number;
  lng: number;
}

export default function MapSearchPage() {
    const t = useTranslations('advance_search');
    const tFilters = useTranslations('home.filters');
    const tCommon = useTranslations('common');
    const locale = useLocale();
    const searchParams = useSearchParams();
    const router = useRouter();
    const { propertyTypesMap, setPropertyTypesMap } = usePropertyCache();
    const { regionCounts: cachedRegionCounts, fetchRegionCounts, fetchAreas } = useRegionData();
    const [regionCounts, setRegionCounts] = useState<Array<{ regionId: number; regionName: string; count: number }>>([]);
    
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA5h3ZfC3rhIC2ow1VlVC_J6sprxC1Rbns",
  });

  // Map locale to language ID
  const localeToLanguageId: Record<string, number> = {
    'en': 1,
    'es': 2,
    'fr': 3,
    'pt': 8,
    'de': 4,
  };
  const languageId = localeToLanguageId[locale] || 1;

  const [areas, setAreas] = useState<Area[]>([]);
  const [filteredAreas, setFilteredAreas] = useState<Area[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [selectedArea, setSelectedArea] = useState<number | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedTown, setSelectedTown] = useState<string | null>(null);
  const [selectedAreaMarker, setSelectedAreaMarker] = useState<AreaWithCoordinates | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [totalPropertiesCount, setTotalPropertiesCount] = useState(0);

  // Advanced filter states
  const [selectedPropertyType, setSelectedPropertyType] = useState<string | null>(null);
  const [minBeds, setMinBeds] = useState<string | null>(null);
  const [minBaths, setMinBaths] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<string | null>(null);
  
  // Store property types with codes
  const [propertyTypesList, setPropertyTypesList] = useState<Array<{ id: number; name: string; code: string }>>([]);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://inlandandalucia.onrender.com/api/v1';

  // Load property types if not in cache
  useEffect(() => {
    let mounted = true;
    const loadPropertyTypes = async () => {
      try {
        // Check cache first - if we already have types, initialize list from cache
        if (Object.keys(propertyTypesMap).length > 0 && propertyTypesList.length === 0) {
          // Initialize from cache - we need to fetch to get codes
          const res = await fetch(`${API_BASE_URL}/properties/types?languageId=${languageId}`);
          if (res.ok) {
            const data = await res.json();
            if (data?.success && data.data && mounted) {
              const typesList: Array<{ id: number; name: string; code: string }> = [];
              data.data.forEach((type: any) => {
                typesList.push({
                  id: type.id,
                  name: type.name,
                  code: type.code || String(type.id)
                });
              });
              setPropertyTypesList(typesList);
            }
          }
          return;
        }

        // Fetch property types with current language ID
        const res = await fetch(`${API_BASE_URL}/properties/types?languageId=${languageId}`);
        if (!res.ok) throw new Error(`Failed: ${res.status}`);

        const data = await res.json();
        if (data?.success && data.data && mounted) {
          const typesMap: Record<number, string> = {};
          const typesList: Array<{ id: number; name: string; code: string }> = [];
          data.data.forEach((type: any) => {
            typesMap[type.id] = type.name;
            typesList.push({
              id: type.id,
              name: type.name,
              code: type.code || String(type.id)
            });
          });
          setPropertyTypesMap(typesMap);
          setPropertyTypesList(typesList);
        }
      } catch (err) {
        console.error("Error loading property types:", err);
      }
    };

    // Always try to load
    loadPropertyTypes();
    
    return () => {
      mounted = false;
    };
  }, [languageId, setPropertyTypesMap, API_BASE_URL]);

  // Read URL parameters for filters
  useEffect(() => {
    if (!searchParams) return;

    const propertyTypeParam = searchParams.get('propertyType');
    const minBedsParam = searchParams.get('minBeds');
    const minBathsParam = searchParams.get('minBaths');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const regionIdParam = searchParams.get('regionId');
    const areaIdParam = searchParams.get('areaId');

    if (propertyTypeParam !== null) {
      setSelectedPropertyType(propertyTypeParam || null);
    }
    if (minBedsParam !== null) {
      setMinBeds(minBedsParam || null);
    }
    if (minBathsParam !== null) {
      setMinBaths(minBathsParam || null);
    }
    if (minPriceParam !== null) {
      setMinPrice(minPriceParam || null);
    }
    if (maxPriceParam !== null) {
      setMaxPrice(maxPriceParam || null);
    }
    if (regionIdParam !== null) {
      setSelectedRegion(regionIdParam ? Number(regionIdParam) : null);
    }
    if (areaIdParam !== null) {
      setSelectedArea(areaIdParam ? Number(areaIdParam) : null);
    }
  }, [searchParams]);

  // Track last fetch params to prevent duplicate calls
  // Removed duplicate check refs - following PropertiesLayout pattern
  // Always fetch to ensure data is up-to-date
  
  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return !!(selectedPropertyType || minBeds || minBaths || minPrice || maxPrice);
  }, [selectedPropertyType, minBeds, minBaths, minPrice, maxPrice]);

  // Fetch region counts with current filters applied
  // This ALWAYS runs to ensure counts reflect current filters
  useEffect(() => {
    const loadRegionCounts = async () => {
      try {
        // Build filter object from current filter state
        const filters = {
          propertyType: selectedPropertyType || undefined,
          minBeds: minBeds || undefined,
          minBaths: minBaths || undefined,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
        };
        
        // Only show loading on initial load, not on filter changes
        if (initialLoading) {
          setLoading(true);
        }
        
        const counts = await fetchRegionCounts(filters);
        
        // Always update region counts state with filtered results
        setRegionCounts(counts);
        
        // Calculate total properties count from region counts
        const totalCount = counts.reduce((sum: number, region: any) => sum + region.count, 0);
        setTotalPropertiesCount(totalCount);
        
        if (initialLoading) {
          setInitialLoading(false);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error loading region counts:", err);
        if (initialLoading) {
          setInitialLoading(false);
          setLoading(false);
        }
        setError(tCommon('failedToLoadRegions'));
        // On error, only use cache if no filters are active
        if (!hasActiveFilters && cachedRegionCounts.length > 0) {
          setRegionCounts(cachedRegionCounts);
          const totalCount = cachedRegionCounts.reduce((sum: number, region: any) => sum + region.count, 0);
          setTotalPropertiesCount(totalCount);
        } else {
          setTotalPropertiesCount(0);
        }
      }
    };
    
    // Always fetch region counts (with or without filters) to ensure accuracy
    // On initial load, fetch immediately. On filter changes, debounce to avoid too many requests
    const delay = initialLoading ? 0 : 300;
    const timeoutId = setTimeout(() => {
      loadRegionCounts();
    }, delay);
    
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPropertyType, minBeds, minBaths, minPrice, maxPrice, hasActiveFilters, cachedRegionCounts, initialLoading]); // fetchRegionCounts is stable from useCallback

  // Fetch areas when a region is selected (using cache)
  // This updates whenever filters change to show accurate counts
  // Following the same pattern as PropertiesLayout.tsx
  useEffect(() => {
    // Don't fetch if regionCounts haven't loaded yet
    if (regionCounts.length === 0) {
      setAreas([]);
      setFilteredAreas([]);
      return;
    }
    
    let mounted = true;
    
    // Clear areas immediately when filters change to show update is happening
    setFilteredAreas([]);
    setSelectedAreaMarker(null);
    
    // Show loader immediately when filters change (not on initial load)
    if (!initialLoading) {
      setLoading(true);
    }
    
    const loadAreas = async () => {
      const filters = {
        propertyType: selectedPropertyType || undefined,
        minBeds: minBeds || undefined,
        minBaths: minBaths || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
      };
      
      console.log('[MAP SEARCH] Fetching areas with filters:', filters);
      console.log('[MAP SEARCH] selectedRegion:', selectedRegion);
      
      try {
        if (!selectedRegion) {
          // If no region selected, fetch all areas from all regions
          const allAreasPromises = regionCounts.map(region => 
            fetchAreas(region.regionId, filters)
          );
          const allAreasResults = await Promise.all(allAreasPromises);
          
          if (mounted) {
            const flattenedAreas: Area[] = allAreasResults.flatMap((areas, index) =>
              areas.map((area: any) => ({
                areaId: area.areaId,
                areaName: area.areaName,
                count: area.count || 0,
                regionId: regionCounts[index].regionId,
                regionName: regionCounts[index].regionName,
                lat: area.lat,
                lng: area.lng,
              }))
            );
            
            console.log('[MAP SEARCH] ✅ Areas fetched (all regions):', flattenedAreas.length);
            console.log('[MAP SEARCH] Areas with coordinates:', flattenedAreas.filter(a => a.lat && a.lng).length);
            console.log('[MAP SEARCH] Areas with count > 0:', flattenedAreas.filter(a => a.count > 0).length);
            
            // Update immediately when API response comes
            setAreas(flattenedAreas);
            setFilteredAreas(flattenedAreas);
          }
        } else {
          // Fetch areas for selected region
          const areasData = await fetchAreas(selectedRegion, filters);
          
          if (mounted) {
            const areasWithRegion: Area[] = areasData.map((area: any) => ({
              areaId: area.areaId,
              areaName: area.areaName,
              count: area.count || 0,
              regionId: selectedRegion,
              regionName: regionCounts.find(r => r.regionId === selectedRegion)?.regionName || '',
              lat: area.lat,
              lng: area.lng,
            }));
            
            console.log('[MAP SEARCH] ✅ Areas fetched for region', selectedRegion, ':', areasWithRegion.length);
            console.log('[MAP SEARCH] Areas with coordinates:', areasWithRegion.filter(a => a.lat && a.lng).length);
            console.log('[MAP SEARCH] Areas with count > 0:', areasWithRegion.filter(a => a.count > 0).length);
            
            // Update immediately when API response comes
            setAreas(areasWithRegion);
            setFilteredAreas(areasWithRegion);
          }
        }
      } catch (err) {
        if (mounted) {
          console.error("Error loading areas:", err);
          setAreas([]);
          setFilteredAreas([]);
        }
      } finally {
        if (mounted) {
          // Always clear loading state when done
          if (!initialLoading) {
            setLoading(false);
          }
        }
      }
    };

    // Debounce filter changes (but not initial load) - same pattern as PropertiesLayout
    const shouldDebounce = !initialLoading;
    const delay = shouldDebounce ? 300 : 0;
    console.log('[MAP SEARCH] Debounce settings - shouldDebounce:', shouldDebounce, 'delay:', delay);
    
    const timeoutId = setTimeout(() => {
      loadAreas();
    }, delay);
    
    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRegion, regionCounts, selectedPropertyType, minBeds, minBaths, minPrice, maxPrice, initialLoading]); // fetchAreas is stable from useCallback


  // Handle body scroll lock when sidebar is open on mobile
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  // Close sidebar when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // Areas with coordinates (use filtered areas)
  // This recalculates whenever filteredAreas changes (which happens when filters change)
  const areasWithCoordinates = useMemo((): AreaWithCoordinates[] => {
    console.log('[MAP PINS] Recalculating areasWithCoordinates');
    console.log('[MAP PINS] filteredAreas count:', filteredAreas.length);
    console.log('[MAP PINS] selectedRegion:', selectedRegion, 'selectedArea:', selectedArea);
    
    const filtered = filteredAreas
      .filter(area => {
        if (selectedArea) return area.areaId === selectedArea;
        if (selectedRegion) return area.regionId === selectedRegion;
        return true;
      })
      .filter(area => area.lat && area.lng) // only valid coordinates
      .filter(area => area.count > 0); // Only show areas with properties matching filters
    
    console.log('[MAP PINS] After filtering - areas with coordinates:', filtered.length);
    console.log('[MAP PINS] Areas with count > 0:', filtered.filter(a => a.count > 0).length);
    
    const result = filtered.map(area => ({
      ...area,
      lat: area.lat!,
      lng: area.lng!
    }));
    
    console.log('[MAP PINS] Final areasWithCoordinates count:', result.length);
    return result;
  }, [filteredAreas, selectedRegion, selectedArea]);

  // Helper function to update URL with current filter state
  const updateURL = (updates: {
    propertyType?: string | null;
    minBeds?: string | null;
    minBaths?: string | null;
    minPrice?: string | null;
    maxPrice?: string | null;
    regionId?: number | null;
    areaId?: number | null;
  }) => {
    if (!searchParams) return;
    const params = new URLSearchParams(searchParams.toString());
    
    // Get current regionId and areaId from updates, state, or URL (in that priority order)
    const currentRegionId = updates.regionId !== undefined 
      ? updates.regionId 
      : (selectedRegion || (searchParams.get('regionId') ? Number(searchParams.get('regionId')) : null));
    const currentAreaId = updates.areaId !== undefined 
      ? updates.areaId 
      : (selectedArea || (searchParams.get('areaId') ? Number(searchParams.get('areaId')) : null));
    
    // Update or remove filter parameters
    if (updates.propertyType !== undefined) {
      if (updates.propertyType) {
        params.set('propertyType', updates.propertyType);
      } else {
        params.delete('propertyType');
      }
    }
    if (updates.minBeds !== undefined) {
      if (updates.minBeds) {
        params.set('minBeds', updates.minBeds);
      } else {
        params.delete('minBeds');
      }
    }
    if (updates.minBaths !== undefined) {
      if (updates.minBaths) {
        params.set('minBaths', updates.minBaths);
      } else {
        params.delete('minBaths');
      }
    }
    if (updates.minPrice !== undefined) {
      if (updates.minPrice) {
        params.set('minPrice', updates.minPrice);
      } else {
        params.delete('minPrice');
      }
    }
    if (updates.maxPrice !== undefined) {
      if (updates.maxPrice) {
        params.set('maxPrice', updates.maxPrice);
      } else {
        params.delete('maxPrice');
      }
    }
    
    // Always preserve regionId and areaId if they exist
    if (currentRegionId) {
      params.set('regionId', String(currentRegionId));
    } else {
      params.delete('regionId');
    }
    
    if (currentAreaId) {
      params.set('areaId', String(currentAreaId));
    } else {
      params.delete('areaId');
    }
    
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleAreaClick = (area: AreaWithCoordinates) => {
    setSelectedAreaMarker(area);
  };

  // Show error if critical error occurred
  if (error && initialLoading) {
    return <div className="text-center py-20 text-red-600">{tCommon('error')}: {error}</div>;
  }

  return (
    <>
      <GlobalLoader active={loading || initialLoading} />
      <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading lg:text-3xl md:text-2xl text-xl font-bold text-primary-600">{t('g_map')}</h1>
        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
          aria-label={tCommon("toggleFilters")}
        >
          <FunnelIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 relative items-start">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar Filters */}
        <div
          className={`fixed lg:static inset-y-0 left-0 z-50 lg:z-auto w-80 lg:w-80 flex-shrink-0 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="h-full lg:h-auto bg-white lg:rounded-xl lg:border lg:border-neutral-200 p-4 shadow-xl lg:shadow-none">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-primary-900">
                {tFilters('advance_search')}
              </h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
                aria-label={tCommon("closeFilters")}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              {/* Property Type */}
              <div>
                <label htmlFor="propertyType" className="block text-sm font-medium text-neutral-700 mb-1">
                  {tFilters('propertyTypeLabel')}
                </label>
                <select
                  id="propertyType"
                  value={selectedPropertyType || ''}
                  onChange={(e) => {
                    const value = e.target.value || null;
                    console.log('[MAP SEARCH] Property type changed to:', value);
                    // Clear areas immediately to show update is happening
                    setFilteredAreas([]);
                    setSelectedAreaMarker(null);
                    setSelectedPropertyType(value);
                    updateURL({ 
                      propertyType: value,
                      regionId: selectedRegion || null,
                      areaId: selectedArea || null
                    });
                  }}
                  className="w-full rounded-md border-neutral-300 py-2.5 text-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">{tFilters('allTypes')}</option>
                  {propertyTypesList.map((type) => (
                    <option key={type.id} value={type.code}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Min. Bedrooms */}
              <div>
                <label htmlFor="minBeds" className="block text-sm font-medium text-neutral-700 mb-1">
                  {tFilters('min_bed')}
                </label>
                <select
                  id="minBeds"
                  value={minBeds || ''}
                  onChange={(e) => {
                    const value = e.target.value || null;
                    setMinBeds(value);
                    updateURL({ 
                      minBeds: value,
                      regionId: selectedRegion || null,
                      areaId: selectedArea || null
                    });
                  }}
                  className="w-full rounded-md border-neutral-300 py-2.5 text-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">{tFilters('any')}</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
              </div>

              {/* Min. Bathrooms */}
              <div>
                <label htmlFor="minBaths" className="block text-sm font-medium text-neutral-700 mb-1">
                  {tFilters('min_bathrooms')}
                </label>
                <select
                  id="minBaths"
                  value={minBaths || ''}
                  onChange={(e) => {
                    const value = e.target.value || null;
                    console.log('[MAP SEARCH] Min baths changed to:', value);
                    // Set loading immediately when filter changes
                    if (!initialLoading) {
                      setLoading(true);
                    }
                    setMinBaths(value);
                    updateURL({ 
                      minBaths: value,
                      regionId: selectedRegion || null,
                      areaId: selectedArea || null
                    });
                  }}
                  className="w-full rounded-md border-neutral-300 py-2.5 text-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">{tFilters('any')}</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
              </div>

              {/* Min. Price */}
              <div>
                <label htmlFor="minPrice" className="block text-sm font-medium text-neutral-700 mb-1">
                  {tFilters('min_price')}
                </label>
                <select
                  id="minPrice"
                  value={minPrice || ''}
                  onChange={(e) => {
                    const value = e.target.value || null;
                    console.log('[MAP SEARCH] Min price changed to:', value);
                    // Set loading immediately when filter changes
                    if (!initialLoading) {
                      setLoading(true);
                    }
                    setMinPrice(value);
                    updateURL({ 
                      minPrice: value,
                      regionId: selectedRegion || null,
                      areaId: selectedArea || null
                    });
                  }}
                  className="w-full rounded-md border-neutral-300 py-2.5 text-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">{tFilters('any')}</option>
                  <option value="50000">€50,000</option>
                  <option value="100000">€100,000</option>
                  <option value="150000">€150,000</option>
                  <option value="200000">€200,000</option>
                  <option value="300000">€300,000</option>
                  <option value="500000">€500,000</option>
                  <option value="1000000">€1,000,000</option>
                </select>
              </div>

              {/* Max. Price */}
              <div>
                <label htmlFor="maxPrice" className="block text-sm font-medium text-neutral-700 mb-1">
                  {tFilters('max_price')}
                </label>
                <select
                  id="maxPrice"
                  value={maxPrice || ''}
                  onChange={(e) => {
                    const value = e.target.value || null;
                    console.log('[MAP SEARCH] Max price changed to:', value);
                    // Set loading immediately when filter changes
                    if (!initialLoading) {
                      setLoading(true);
                    }
                    setMaxPrice(value);
                    updateURL({ 
                      maxPrice: value,
                      regionId: selectedRegion || null,
                      areaId: selectedArea || null
                    });
                  }}
                  className="w-full rounded-md border-neutral-300 py-2.5 text-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">{tFilters('any')}</option>
                  <option value="100000">€100,000</option>
                  <option value="150000">€150,000</option>
                  <option value="200000">€200,000</option>
                  <option value="300000">€300,000</option>
                  <option value="500000">€500,000</option>
                  <option value="1000000">€1,000,000</option>
                  <option value="2000000">€2,000,000+</option>
                </select>
              </div>
            </div>
            
            {/* Horizontal line above All Regions */}
            <hr className="my-4 border-neutral-200" />
            
            <div className="space-y-4 mt-4">
              <AreaFilter
                properties={[]}
                selectedProvince={selectedProvince}
                selectedTown={selectedTown}
                selectedRegion={selectedRegion}
                selectedArea={selectedArea}
                regions={regionCounts}
                areas={filteredAreas.map(area => ({
                  areaId: area.areaId,
                  areaName: area.areaName,
                  count: area.count,
                  regionId: area.regionId
                }))}
                allCount={totalPropertiesCount}
                onProvinceChange={(province) => {
                  setSelectedProvince(province);
                }}
                onTownChange={(town) => {
                  setSelectedTown(town);
                }}
                onRegionChange={(regionId) => {
                  setSelectedRegion(regionId);
                  setSelectedArea(null);
                  updateURL({ 
                    regionId: regionId,
                    areaId: null
                  });
                }}
                onAreaChange={(areaId) => {
                  setSelectedArea(areaId);
                  updateURL({ 
                    areaId: areaId,
                    regionId: selectedRegion || null
                  });
                }}
              />
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 rounded-xl overflow-hidden border border-neutral-200">
          {isLoaded ? (
          <GoogleMap 
            mapContainerStyle={containerStyle} 
            center={defaultCenter} 
            zoom={defaultZoom}
            key={`map-${areasWithCoordinates.length}-${selectedPropertyType}-${minBeds}-${minBaths}-${minPrice}-${maxPrice}`}
          >
            {(() => {
              if (process.env.NODE_ENV === 'development') {
                console.log('[MAP RENDER] Rendering', areasWithCoordinates.length, 'markers');
              }
              return null;
            })()}
            {areasWithCoordinates.map(area => {
              if (process.env.NODE_ENV === 'development') {
                console.log('[MAP RENDER] Rendering marker for area:', area.areaName, 'count:', area.count, 'lat:', area.lat, 'lng:', area.lng);
              }
              return (
                <Marker
                  key={`region-${area.regionId}-area-${area.areaId}`}
                  position={{ lat: area.lat, lng: area.lng }}
                  onClick={() => handleAreaClick(area)}
                  icon={{
                    url: getIAMarkerIcon(area.regionName || 'default'),
                    scaledSize: new window.google.maps.Size(44, 54),
                    anchor: new window.google.maps.Point(22, 52),
                  }}
                />
              );
            })}

            {selectedAreaMarker && (
              <InfoWindow
                position={{ lat: selectedAreaMarker.lat, lng: selectedAreaMarker.lng }}
                onCloseClick={() => setSelectedAreaMarker(null)}
              >
                <div className="min-w-[300px] max-w-[400px] overflow-hidden rounded-lg bg-white">
                  <div className="relative h-[160px] w-full">
                    <Image
                      src={areaImages[selectedAreaMarker.areaName] || areaImages.default}
                      alt={`${selectedAreaMarker.areaName} area`}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-bold text-primary-900 mb-2">{selectedAreaMarker.areaName}</h2>
                    <p className="text-neutral-600 mb-4">
                      {selectedAreaMarker.count === 1 ? tCommon('thereIs') : tCommon('thereAre')} <span className="font-semibold text-primary-700">{selectedAreaMarker.count}</span> {selectedAreaMarker.count === 1 ? tCommon('property') : tCommon('properties')} {tCommon('available')}
                    </p>
                    <div className="mb-4">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: getRegionColors(selectedAreaMarker.regionName || 'default').hex }}
                      >
                        {selectedAreaMarker.regionName || tCommon('unknown')}
                      </span>
                    </div>
                    <a
                      href={`/properties?regionId=${selectedAreaMarker.regionId}&areaId=${selectedAreaMarker.areaId}${selectedPropertyType ? `&propertyType=${selectedPropertyType}` : ''}${minBeds ? `&minBeds=${minBeds}` : ''}${minBaths ? `&minBaths=${minBaths}` : ''}${minPrice ? `&minPrice=${minPrice}` : ''}${maxPrice ? `&maxPrice=${maxPrice}` : ''}`}
                      className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      View Properties
                    </a>
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
          ) : (
            <div className="h-[70vh] bg-neutral-100" />
          )}
        </div>
      </div>
      {/* <div>
        <PromoSidebar />
      </div> */}
    </div>
    </>
  );
}