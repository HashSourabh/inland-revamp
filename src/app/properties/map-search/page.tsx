"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
// Performance: Lazy load Google Maps components to reduce initial bundle size
import dynamic from 'next/dynamic';
import Image from "next/image";
import { CheckIcon, ChevronDownIcon, ChevronRightIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { fetchRegions, fetchAreas, fetchPropertyTypes, PropertyType } from '@/utils/api';
import { getRegionColors, getAreaColors } from '@/utils/colorUtils';
import { areaImages, getIAMarkerIcon } from '@/utils/mapUtils';
import PageOverlayLoader from "@/components/loader/PageOverlayLoader";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams, useRouter } from 'next/navigation';
import { usePropertyCache } from '@/context/PropertyCacheContext';

// Performance: Import useJsApiLoader normally as it's needed for initialization
// This hook is lightweight and needed early in the component lifecycle
import { useJsApiLoader } from "@react-google-maps/api";

// Performance: Dynamically import Google Maps components with loading state
// This reduces initial bundle size significantly as Google Maps is a large library
const GoogleMap = dynamic(
  () => import("@react-google-maps/api").then((mod) => ({ default: mod.GoogleMap })),
  {
    loading: () => (
      <div className="h-[70vh] flex items-center justify-center bg-neutral-100">
        <PageOverlayLoader />
      </div>
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
    const tCommon = useTranslations('common');
    const locale = useLocale();
    const searchParams = useSearchParams();
    const router = useRouter();
    const { propertyTypesMap, setPropertyTypesMap } = usePropertyCache();
    
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

  const [regions, setRegions] = useState<Region[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [filteredAreas, setFilteredAreas] = useState<Area[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>("ALL");
  const [selectedTown, setSelectedTown] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<AreaWithCoordinates | null>(null);
  const [loading, setLoading] = useState(true);
  const [filteringAreas, setFilteringAreas] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedRegions, setExpandedRegions] = useState<Set<string>>(new Set());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Advanced filter states
  const [selectedPropertyType, setSelectedPropertyType] = useState<string | null>(null);
  const [minBeds, setMinBeds] = useState<string | null>(null);
  const [minBaths, setMinBaths] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<string | null>(null);
  const [propertyTypesList, setPropertyTypesList] = useState<PropertyType[]>([]);
  const propertyTypesLoadedRef = useRef(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://inlandandalucia.onrender.com/api/v1';

  // Load property types
  useEffect(() => {
    let mounted = true;
    const loadPropertyTypes = async () => {
      try {
        // Check cache first
        if (Object.keys(propertyTypesMap).length > 0) {
          propertyTypesLoadedRef.current = true;
          return;
        }

        const res = await fetch(`${API_BASE_URL}/properties/types?languageId=${languageId}`);
        if (!res.ok) throw new Error(`Failed: ${res.status}`);

        const data = await res.json();
        if (data?.success && data.data && mounted) {
          const typesMap: Record<number, string> = {};
          const typesList: PropertyType[] = [];
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
          propertyTypesLoadedRef.current = true;
        }
      } catch (err) {
        console.error("Error loading property types:", err);
        propertyTypesLoadedRef.current = true;
      }
    };

    if (Object.keys(propertyTypesMap).length > 0) {
      propertyTypesLoadedRef.current = true;
    } else {
      loadPropertyTypes();
    }
    
    return () => {
      mounted = false;
    };
  }, [languageId, setPropertyTypesMap, API_BASE_URL, propertyTypesMap]);

  // Read URL parameters for filters
  useEffect(() => {
    if (!searchParams) return;

    const propertyTypeParam = searchParams.get('propertyType');
    const minBedsParam = searchParams.get('minBeds');
    const minBathsParam = searchParams.get('minBaths');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const regionParam = searchParams.get('region');
    const townParam = searchParams.get('town');

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
    if (regionParam !== null) {
      setSelectedRegion(regionParam || "ALL");
    }
    if (townParam !== null) {
      setSelectedTown(townParam || null);
    }
  }, [searchParams]);

  // Fetch regions
  useEffect(() => {
    const loadRegions = async () => {
      try {
        setLoading(true);
        const regionsData = await fetchRegions();
        setRegions(regionsData);
      } catch (err) {
        console.error(err);
        setError(tCommon('failedToLoadRegions'));
      } finally {
        setLoading(false);
      }
    };
    loadRegions();
  }, []);

  // Fetch areas based on selected region (base areas with coordinates)
  useEffect(() => {
    const loadAreas = async () => {
      if (!selectedRegion || selectedRegion === "ALL") {
        if (regions.length > 0) {
          try {
            const allAreasPromises = regions.map(region => fetchAreas(region.regionId));
            const allAreasResults = await Promise.all(allAreasPromises);

            const flattenedAreas: Area[] = allAreasResults.flatMap(result =>
              result.areas.map(area => ({
                ...area,
                regionId: result.regionId,
                regionName: regions.find(r => r.regionId === result.regionId)?.region || tCommon('unknown')
              }))
            );

            setAreas(flattenedAreas);
            // Initialize filtered areas with original areas when no filters are active
            if (!selectedPropertyType && !minBeds && !minBaths && !minPrice && !maxPrice) {
              setFilteredAreas(flattenedAreas);
            }
          } catch (err) {
            console.error(err);
          }
        }
        return;
      }

      const region = regions.find(r => r.region === selectedRegion);
      if (region) {
        try {
          const result = await fetchAreas(region.regionId);
          const areasWithRegion: Area[] = result.areas.map(area => ({
            ...area,
            regionId: result.regionId,
            regionName: region.region
          }));
          setAreas(areasWithRegion);
          // Initialize filtered areas with original areas when no filters are active
          if (!selectedPropertyType && !minBeds && !minBaths && !minPrice && !maxPrice) {
            setFilteredAreas(areasWithRegion);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };

    if (regions.length > 0) loadAreas();
  }, [selectedRegion, regions]);

  // Fetch filtered properties and update area counts
  useEffect(() => {
    const fetchFilteredProperties = async () => {
      // Check if any filters are active
      const hasFilters = selectedPropertyType || minBeds || minBaths || minPrice || maxPrice;
      
      if (!hasFilters || areas.length === 0) {
        // No filters or no areas, use original areas
        setFilteredAreas(areas);
        setFilteringAreas(false);
        return;
      }

      setFilteringAreas(true);
      try {
        // Build query params for filtered properties
        const queryParams = {
          limit: '1000', // Get a large number to calculate accurate counts
          ...(selectedRegion && selectedRegion !== "ALL" ? { 
            regionId: String(regions.find(r => r.region === selectedRegion)?.regionId || '') 
          } : {}),
          ...(selectedTown ? { town: selectedTown } : {}),
          ...(selectedPropertyType ? { propertyType: selectedPropertyType } : {}),
          ...(minBeds ? { minBeds } : {}),
          ...(minBaths ? { minBaths } : {}),
          ...(minPrice ? { minPrice } : {}),
          ...(maxPrice ? { maxPrice } : {}),
        };

        const query = new URLSearchParams(queryParams);
        const url = `${API_BASE_URL}/properties?${query.toString()}`;
        
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed: ${res.status}`);

        const data = await res.json();
        
        if (data.success && data.data) {
          // Group properties by area
          const areaCounts: Record<number, number> = {};
          const areaMap: Record<number, Area> = {};
          
          // Create a map of areaId to area for quick lookup
          areas.forEach(area => {
            areaMap[area.areaId] = area;
            areaCounts[area.areaId] = 0;
          });

          // Count properties per area
          // Try to match by area name first (more reliable), then by area ID
          data.data.forEach((property: any) => {
            const propertyAreaName = property.Area_Name || property.areaName;
            const areaId = property.Area_ID || property.areaId || property.AreaId;
            
            // First try to match by area name
            if (propertyAreaName) {
              const matchingArea = areas.find(area => 
                area.areaName === propertyAreaName || 
                area.areaName.toLowerCase() === propertyAreaName.toLowerCase()
              );
              if (matchingArea) {
                areaCounts[matchingArea.areaId]++;
                return;
              }
            }
            
            // Fallback to area ID matching
            if (areaId && areaCounts[areaId] !== undefined) {
              areaCounts[areaId]++;
            }
          });

          // Update areas with filtered counts
          const updatedAreas = areas.map(area => ({
            ...area,
            count: areaCounts[area.areaId] || 0
          }));

          setFilteredAreas(updatedAreas);
        } else {
          setFilteredAreas(areas);
        }
      } catch (err) {
        console.error("Error fetching filtered properties:", err);
        setFilteredAreas(areas);
      } finally {
        setFilteringAreas(false);
      }
    };

    fetchFilteredProperties();
  }, [areas, selectedPropertyType, minBeds, minBaths, minPrice, maxPrice, selectedRegion, selectedTown, regions, API_BASE_URL]);

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

  // Compute region stats with filtered counts
  const regionStats = useMemo(() => {
    if (!regions.length) return [];
    
    // Use filtered areas if filters are active, otherwise use original areas
    const areasToUse = filteredAreas.length > 0 ? filteredAreas : areas;
    const hasFilters = selectedPropertyType || minBeds || minBaths || minPrice || maxPrice;
    
    if (hasFilters && areasToUse.length > 0) {
      // Calculate filtered counts per region
      const regionCounts: Record<string, number> = {};
      areasToUse.forEach(area => {
        const regionName = area.regionName || '';
        regionCounts[regionName] = (regionCounts[regionName] || 0) + area.count;
      });
      
      const totalCount = Object.values(regionCounts).reduce((sum, count) => sum + count, 0);
      
      return [
        { name: "ALL", count: totalCount },
        ...regions.map(region => ({ 
          name: region.region, 
          count: regionCounts[region.region] || 0 
        }))
      ].sort((a, b) => b.count - a.count);
    } else {
      // Use original region counts
      const totalCount = regions.reduce((sum, region) => sum + region.count, 0);
      return [
        { name: "ALL", count: totalCount },
        ...regions.map(region => ({ name: region.region, count: region.count }))
      ].sort((a, b) => b.count - a.count);
    }
  }, [regions, filteredAreas, areas, selectedPropertyType, minBeds, minBaths, minPrice, maxPrice]);

  // Compute town stats for selected region with filtered counts
  const townStats = useMemo(() => {
    if (!selectedRegion || selectedRegion === "ALL") return [];
    const areasToUse = filteredAreas.length > 0 ? filteredAreas : areas;
    return areasToUse
      .filter(area => area.regionName === selectedRegion)
      .map(area => ({ name: area.areaName, count: area.count }))
      .sort((a, b) => b.count - a.count);
  }, [selectedRegion, filteredAreas, areas]);

  // Get towns for a specific region with filtered counts
  const getTownsForRegion = (regionName: string) => {
    const areasToUse = filteredAreas.length > 0 ? filteredAreas : areas;
    return areasToUse
      .filter(area => area.regionName === regionName)
      .map(area => ({ name: area.areaName, count: area.count }))
      .sort((a, b) => b.count - a.count);
  };

  // Areas with coordinates (use filtered areas if filters are active)
  const areasWithCoordinates = useMemo((): AreaWithCoordinates[] => {
    const areasToUse = filteredAreas.length > 0 ? filteredAreas : areas;
    return areasToUse
      .filter(area => {
        if (selectedTown) return area.areaName === selectedTown;
        if (selectedRegion && selectedRegion !== "ALL") return area.regionName === selectedRegion;
        return true;
      })
      .filter(area => area.lat && area.lng) // only valid coordinates
      .filter(area => area.count > 0) // Only show areas with properties matching filters
      .map(area => ({
        ...area,
        lat: area.lat!,
        lng: area.lng!
      }));
  }, [filteredAreas, areas, selectedRegion, selectedTown]);

  // Helper function to update URL with current filter state
  const updateURL = (updates: {
    propertyType?: string | null;
    minBeds?: string | null;
    minBaths?: string | null;
    minPrice?: string | null;
    maxPrice?: string | null;
    region?: string | null;
    town?: string | null;
  }) => {
    if (!searchParams) return;
    const params = new URLSearchParams(searchParams.toString());
    
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
    if (updates.region !== undefined) {
      if (updates.region && updates.region !== "ALL") {
        params.set('region', updates.region);
      } else {
        params.delete('region');
      }
    }
    if (updates.town !== undefined) {
      if (updates.town) {
        params.set('town', updates.town);
      } else {
        params.delete('town');
      }
    }
    
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleRegionSelect = (regionName: string) => {
    const newSelected = regionName === selectedRegion ? null : regionName;
    setSelectedRegion(newSelected || "ALL");
    setSelectedTown(null);
    updateURL({ region: newSelected || "ALL", town: null });
    
    // Auto-expand if region is selected and has towns
    if (newSelected && newSelected !== "ALL") {
      const areasToUse = filteredAreas.length > 0 ? filteredAreas : areas;
      const regionTowns = areasToUse.filter(area => area.regionName === newSelected);
      if (regionTowns.length > 0) {
        setExpandedRegions(prev => new Set(prev).add(newSelected));
      }
    }
  };

  const handleTownSelect = (townName: string) => {
    const newSelected = townName === selectedTown ? null : townName;
    setSelectedTown(newSelected);
    updateURL({ town: newSelected });
  };

  const toggleRegion = (regionName: string) => {
    setExpandedRegions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(regionName)) {
        newSet.delete(regionName);
      } else {
        newSet.add(regionName);
      }
      return newSet;
    });
  };

  const handleAreaClick = (area: AreaWithCoordinates) => {
    setSelectedArea(area);
  };

  if (!isLoaded) return <div className="text-center py-20"><PageOverlayLoader/></div>;
  if (loading) return <div className="text-center py-20">{tCommon('loadingRegionsAndAreas')}</div>;
  if (error) return <div className="text-center py-20 text-red-600">{tCommon('error')}: {error}</div>;

  return (
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

      <div className="flex flex-col lg:flex-row gap-4 relative">
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
          <div className="h-full lg:h-auto lg:max-h-[calc(100vh-12rem)] bg-white lg:rounded-xl lg:border lg:border-neutral-200 p-4 overflow-y-auto shadow-xl lg:shadow-none">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-primary-900">Advanced Search</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
                aria-label={tCommon("closeFilters")}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Advanced Search Filters */}
            <div className="pb-4 mb-4 border-b border-neutral-200">
              <div className="space-y-4">
                {/* Property Type */}
                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium text-neutral-700 mb-1">
                    Property Type
                  </label>
                  <select
                    id="propertyType"
                    value={selectedPropertyType || ''}
                    onChange={(e) => {
                      const value = e.target.value || null;
                      setSelectedPropertyType(value);
                      updateURL({ propertyType: value });
                    }}
                    className="w-full rounded-md border-neutral-300 py-2.5 text-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="">Any Type</option>
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
                    Min. Bedrooms
                  </label>
                  <select
                    id="minBeds"
                    value={minBeds || ''}
                    onChange={(e) => {
                      const value = e.target.value || null;
                      setMinBeds(value);
                      updateURL({ minBeds: value });
                    }}
                    className="w-full rounded-md border-neutral-300 py-2.5 text-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="">Any</option>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n}+
                      </option>
                    ))}
                  </select>
                </div>

                {/* Min. Bathrooms */}
                <div>
                  <label htmlFor="minBaths" className="block text-sm font-medium text-neutral-700 mb-1">
                    Min. Bathrooms
                  </label>
                  <select
                    id="minBaths"
                    value={minBaths || ''}
                    onChange={(e) => {
                      const value = e.target.value || null;
                      setMinBaths(value);
                      updateURL({ minBaths: value });
                    }}
                    className="w-full rounded-md border-neutral-300 py-2.5 text-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="">Any</option>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n}+
                      </option>
                    ))}
                  </select>
                </div>

                {/* Min. Price */}
                <div>
                  <label htmlFor="minPrice" className="block text-sm font-medium text-neutral-700 mb-1">
                    Min. Price
                  </label>
                  <select
                    id="minPrice"
                    value={minPrice || ''}
                    onChange={(e) => {
                      const value = e.target.value || null;
                      setMinPrice(value);
                      updateURL({ minPrice: value });
                    }}
                    className="w-full rounded-md border-neutral-300 py-2.5 text-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="">No Min</option>
                    <option value="50000">€50,000</option>
                    <option value="100000">€100,000</option>
                    <option value="150000">€150,000</option>
                    <option value="200000">€200,000</option>
                    <option value="250000">€250,000</option>
                    <option value="300000">€300,000</option>
                    <option value="400000">€400,000</option>
                    <option value="500000">€500,000</option>
                  </select>
                </div>

                {/* Max. Price */}
                <div>
                  <label htmlFor="maxPrice" className="block text-sm font-medium text-neutral-700 mb-1">
                    Max. Price
                  </label>
                  <select
                    id="maxPrice"
                    value={maxPrice || ''}
                    onChange={(e) => {
                      const value = e.target.value || null;
                      setMaxPrice(value);
                      updateURL({ maxPrice: value });
                    }}
                    className="w-full rounded-md border-neutral-300 py-2.5 text-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="">No Max</option>
                    <option value="200000">€200,000</option>
                    <option value="300000">€300,000</option>
                    <option value="400000">€400,000</option>
                    <option value="500000">€500,000</option>
                    <option value="600000">€600,000</option>
                    <option value="750000">€750,000</option>
                    <option value="1000000">€1,000,000</option>
                    <option value="1500000">€1,500,000</option>
                    <option value="2000000">€2,000,000+</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* All Regions Option */}
            <div className="mb-2">
              <button
                onClick={() => handleRegionSelect("ALL")}
                className={`w-full flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors
                  ${selectedRegion === "ALL"
                    ? "bg-primary-600 text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
              >
                <div className="flex items-center gap-2">
                  {selectedRegion === "ALL" && <CheckIcon className="h-5 w-5 text-white" />}
                  <span>{tCommon("allRegions")}</span>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-sm font-semibold
                  ${selectedRegion === "ALL"
                    ? "bg-white/20 text-white"
                    : "bg-white text-neutral-600"
                  }`}>
                  {regionStats.find(r => r.name === "ALL")?.count || 0}
                </span>
              </button>
            </div>

            {/* Region Accordions */}
            <div className="space-y-1">
              {regionStats
                .filter(({ name }) => name !== "ALL")
                .map(({ name, count }) => {
                  const colors = getRegionColors(name);
                  const isActive = selectedRegion === name;
                  const isExpanded = expandedRegions.has(name);
                  const regionTowns = getTownsForRegion(name);

                  return (
                    <div key={name} className="border border-neutral-200 rounded-lg overflow-hidden">
                      {/* Region Header */}
                      <button
                        onClick={() => {
                          handleRegionSelect(name);
                          if (!isExpanded && regionTowns.length > 0) {
                            toggleRegion(name);
                          }
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 text-base font-medium transition-colors
                          ${isActive
                            ? "bg-primary-600 text-white"
                            : "bg-white text-neutral-700 hover:bg-neutral-50"
                          }`}
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          {isActive && <CheckIcon className="h-5 w-5 text-white flex-shrink-0" />}
                          <span className="truncate">{name}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`rounded-full px-2.5 py-0.5 text-sm font-semibold
                            ${isActive
                              ? "bg-white/20 text-white"
                              : "bg-neutral-100 text-neutral-600"
                            }`}>
                            {count}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleRegion(name);
                            }}
                            className={`p-1 rounded transition-colors ${
                              isActive 
                                ? "hover:bg-white/20" 
                                : "hover:bg-neutral-200"
                            }`}
                          >
                            {isExpanded ? (
                              <ChevronDownIcon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-neutral-600'}`} />
                            ) : (
                              <ChevronRightIcon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-neutral-600'}`} />
                            )}
                          </button>
                        </div>
                      </button>

                      {/* Towns List (Accordion Content) */}
                      {isExpanded && regionTowns.length > 0 && (
                        <div className="bg-neutral-50 border-t border-neutral-200">
                          {regionTowns.map(town => {
                            const townColors = getAreaColors(name);
                            const isTownActive = selectedTown === town.name;

                            return (
                              <button
                                key={town.name}
                                onClick={() => handleTownSelect(town.name)}
                                className={`w-full flex items-center justify-between px-6 py-2.5 text-sm font-medium transition-colors
                                  ${isTownActive
                                    ? "bg-primary-500 text-white"
                                    : "text-neutral-700 hover:bg-neutral-100"
                                  }`}
                              >
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  {isTownActive && <CheckIcon className="h-4 w-4 text-white flex-shrink-0" />}
                                  <span className="truncate">{town.name}</span>
                                </div>
                                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold flex-shrink-0
                                  ${isTownActive
                                    ? "bg-white/20 text-white"
                                    : "bg-white text-neutral-600"
                                  }`}>
                                  {town.count}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 rounded-xl overflow-hidden border border-neutral-200">
          <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={defaultZoom}>
            {areasWithCoordinates.map(area => (
              <Marker
                key={`${area.areaId}-${area.areaName}`}
                position={{ lat: area.lat, lng: area.lng }}
                onClick={() => handleAreaClick(area)}
                icon={{
                  url: getIAMarkerIcon(area.regionName || 'default'),
                  scaledSize: new window.google.maps.Size(44, 54),
                  anchor: new window.google.maps.Point(22, 52),
                }}
              />
            ))}

            {selectedArea && (
              <InfoWindow
                position={{ lat: selectedArea.lat, lng: selectedArea.lng }}
                onCloseClick={() => setSelectedArea(null)}
              >
                <div className="min-w-[300px] max-w-[400px] overflow-hidden rounded-lg bg-white">
                  <div className="relative h-[160px] w-full">
                    <Image
                      src={areaImages[selectedArea.areaName] || areaImages.default}
                      alt={`${selectedArea.areaName} area`}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-bold text-primary-900 mb-2">{selectedArea.areaName}</h2>
                    <p className="text-neutral-600 mb-4">
                      {selectedArea.count === 1 ? tCommon('thereIs') : tCommon('thereAre')} <span className="font-semibold text-primary-700">{selectedArea.count}</span> {selectedArea.count === 1 ? tCommon('property') : tCommon('properties')} {tCommon('available')}
                    </p>
                    <div className="mb-4">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: getRegionColors(selectedArea.regionName || 'default').hex }}
                      >
                        {selectedArea.regionName || tCommon('unknown')}
                      </span>
                    </div>
                    <a
                      href={`/properties?location=${encodeURIComponent(selectedArea.areaName)}&regionId=${selectedArea.regionId}&areaId=${selectedArea.areaId}${selectedPropertyType ? `&propertyType=${selectedPropertyType}` : ''}${minBeds ? `&minBeds=${minBeds}` : ''}${minBaths ? `&minBaths=${minBaths}` : ''}${minPrice ? `&minPrice=${minPrice}` : ''}${maxPrice ? `&maxPrice=${maxPrice}` : ''}`}
                      className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      View Properties
                    </a>
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      </div>
      {/* <div>
        <PromoSidebar />
      </div> */}
    </div>
  );
}