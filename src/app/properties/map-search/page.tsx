"use client";

import React, { useState, useMemo, useEffect } from "react";
// Performance: Lazy load Google Maps components to reduce initial bundle size
import dynamic from 'next/dynamic';
import Image from "next/image";
import { CheckIcon, ChevronDownIcon, ChevronRightIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { fetchRegions, fetchAreas } from '@/utils/api';
import { getRegionColors, getAreaColors } from '@/utils/colorUtils';
import { areaImages, getIAMarkerIcon } from '@/utils/mapUtils';
import PageOverlayLoader from "@/components/loader/PageOverlayLoader";
import { useTranslations } from "next-intl";

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
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA5h3ZfC3rhIC2ow1VlVC_J6sprxC1Rbns",
  });

  const [regions, setRegions] = useState<Region[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>("ALL");
  const [selectedTown, setSelectedTown] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<AreaWithCoordinates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRegions, setExpandedRegions] = useState<Set<string>>(new Set());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  // Fetch areas based on selected region
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
        } catch (err) {
          console.error(err);
        }
      }
    };

    if (regions.length > 0) loadAreas();
  }, [selectedRegion, regions]);

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

  // Compute region stats
  const regionStats = useMemo(() => {
    if (!regions.length) return [];
    const totalCount = regions.reduce((sum, region) => sum + region.count, 0);
    return [
      { name: "ALL", count: totalCount },
      ...regions.map(region => ({ name: region.region, count: region.count }))
    ].sort((a, b) => b.count - a.count);
  }, [regions]);

  // Compute town stats for selected region
  const townStats = useMemo(() => {
    if (!selectedRegion || selectedRegion === "ALL") return [];
    return areas
      .filter(area => area.regionName === selectedRegion)
      .map(area => ({ name: area.areaName, count: area.count }))
      .sort((a, b) => b.count - a.count);
  }, [selectedRegion, areas]);

  // Get towns for a specific region
  const getTownsForRegion = (regionName: string) => {
    return areas
      .filter(area => area.regionName === regionName)
      .map(area => ({ name: area.areaName, count: area.count }))
      .sort((a, b) => b.count - a.count);
  };

  // Areas with coordinates
  const areasWithCoordinates = useMemo((): AreaWithCoordinates[] => {
    return areas
      .filter(area => {
        if (selectedTown) return area.areaName === selectedTown;
        if (selectedRegion && selectedRegion !== "ALL") return area.regionName === selectedRegion;
        return true;
      })
      .filter(area => area.lat && area.lng) // only valid coordinates
      .map(area => ({
        ...area,
        lat: area.lat!,
        lng: area.lng!
      }));
  }, [areas, selectedRegion, selectedTown]);

  const handleRegionSelect = (regionName: string) => {
    const newSelected = regionName === selectedRegion ? null : regionName;
    setSelectedRegion(newSelected);
    setSelectedTown(null);
    
    // Auto-expand if region is selected and has towns
    if (newSelected && newSelected !== "ALL") {
      const regionTowns = areas.filter(area => area.regionName === newSelected);
      if (regionTowns.length > 0) {
        setExpandedRegions(prev => new Set(prev).add(newSelected));
      }
    }
  };

  const handleTownSelect = (townName: string) => {
    setSelectedTown(townName === selectedTown ? null : townName);
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
          aria-label="Toggle filters"
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
              <h2 className="text-lg font-semibold text-primary-900">Filters</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
                aria-label="Close filters"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
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
                  <span>All Regions</span>
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
                      href={`/properties?location=${encodeURIComponent(selectedArea.areaName)}&regionId=${selectedArea.regionId}&areaId=${selectedArea.areaId}`}
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