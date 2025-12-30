"use client";

import React, { useState, useMemo, useEffect } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import Image from "next/image";
import { CheckIcon } from '@heroicons/react/24/outline';
import { fetchRegions, fetchAreas } from '@/utils/api';
import { getRegionColors, getAreaColors } from '@/utils/colorUtils';
import { areaImages, getIAMarkerIcon } from '@/utils/mapUtils';
import PromoSidebar from "@/components/PromoSidebar";
import PageOverlayLoader from "@/components/loader/PageOverlayLoader";
import { useTranslations } from "next-intl";

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

  // Compute region stats
  const regionStats = useMemo(() => {
    if (!regions.length) return [];
    const totalCount = regions.reduce((sum, region) => sum + region.count, 0);
    return [
      { name: "ALL", count: totalCount },
      ...regions.map(region => ({ name: region.region, count: region.count }))
    ].sort((a, b) => b.count - a.count);
  }, [regions]);

  // Compute town stats
  const townStats = useMemo(() => {
    if (!selectedRegion || selectedRegion === "ALL") return [];
    return areas
      .filter(area => area.regionName === selectedRegion)
      .map(area => ({ name: area.areaName, count: area.count }))
      .sort((a, b) => b.count - a.count);
  }, [selectedRegion, areas]);

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
    setSelectedRegion(regionName === selectedRegion ? null : regionName);
    setSelectedTown(null);
  };

  const handleTownSelect = (townName: string) => {
    setSelectedTown(townName === selectedTown ? null : townName);
  };

  const handleAreaClick = (area: AreaWithCoordinates) => {
    setSelectedArea(area);
  };

  if (!isLoaded) return <div className="text-center py-20"><PageOverlayLoader/></div>;
  if (loading) return <div className="text-center py-20">{tCommon('loadingRegionsAndAreas')}</div>;
  if (error) return <div className="text-center py-20 text-red-600">{tCommon('error')}: {error}</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-6 font-heading text-3xl font-bold text-primary-600">{t('g_map')}</h1>

      {/* Region Filters */}
      <div className="mb-8 rounded-xl border border-neutral-200 bg-white p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {regionStats.map(({ name, count }) => {
            const colors = getRegionColors(name);
            const isActive = selectedRegion === name;

            return (
              <button
                key={name}
                onClick={() => handleRegionSelect(name)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-base font-medium transition-colors
                  ${isActive
                    ? "bg-primary-600 text-white border-primary-700"
                    : `text-white ${colors.hover}`
                  } border border-transparent shadow-sm`}
                style={isActive ? {} : { backgroundColor: colors.hex }}
              >
                {isActive && <CheckIcon className="h-4 w-4 text-white" />}
                <span>{name}</span>
                <span className="rounded-full bg-white/15 px-2 py-0.5 text-sm font-semibold text-white">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Town List */}
        {selectedRegion && selectedRegion !== "ALL" && townStats.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {townStats.map(town => {
              const colors = getAreaColors(selectedRegion);
              const isActive = selectedTown === town.name;

              return (
                <button
                  key={town.name}
                  onClick={() => handleTownSelect(town.name)}
                  className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium transition-colors
                    ${isActive
                      ? "bg-primary-500 text-white border-primary-600"
                      : `text-gray-700 ${colors.hover}`
                    } border border-transparent shadow-sm`}
                  style={isActive ? {} : { backgroundColor: colors.hex }}
                >
                  {isActive && <CheckIcon className="h-4 w-4 text-white" />}
                  <span>{town.name}</span>
                  <span className={`rounded-full px-1.5 py-0.5 text-xs font-semibold
                    ${isActive
                      ? "bg-white/20 text-white"
                      : "bg-white/60 text-neutral-600"
                    }`}>
                    {town.count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Map */}
        <div className="rounded-xl overflow-hidden border border-neutral-200">
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