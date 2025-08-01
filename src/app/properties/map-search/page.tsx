"use client";

import React, { useState, useMemo } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import Image from "next/image";
import { allProperties } from '@/data/properties';
import { CheckIcon } from '@heroicons/react/24/outline';


// Define area coordinates
const areaCoordinates: Record<string, { lat: number; lng: number }> = {
  // Malaga Province
  'Antequera': { lat: 37.0194, lng: -4.5612 },
  'Archidona': { lat: 37.0961, lng: -4.3889 },
  'Campillos': { lat: 37.0492, lng: -4.8625 },
  'Coin': { lat: 36.6597, lng: -4.7569 },
  'Villanueva del Rosario': { lat: 37.0089, lng: -4.3636 },
  'Villanueva de Tapia': { lat: 37.1833, lng: -4.3333 },

  // Cordoba Province
  'Almedinilla': { lat: 37.4417, lng: -4.0917 },
  'Almodovar Del Rio': { lat: 37.8125, lng: -5.0194 },
  'Baena': { lat: 37.6167, lng: -4.3167 },
  'Benamejí': { lat: 37.2667, lng: -4.5667 },
  'Cabra': { lat: 37.4722, lng: -4.4422 },
  'Carcabuey': { lat: 37.4461, lng: -4.2778 },
  'Castro Del Rio': { lat: 37.6961, lng: -4.4806 },
  'Encinas Reales': { lat: 37.2667, lng: -4.5333 },
  'Fuente-Tojar': { lat: 37.4492, lng: -4.0917 },
  'Iznajar': { lat: 37.2572, lng: -4.3081 },
  'La Carlota': { lat: 37.6708, lng: -4.9281 },
  'La Guijarrosa': { lat: 37.6167, lng: -4.8167 },
  'Lucena': { lat: 37.4089, lng: -4.4853 },
  'Luque': { lat: 37.5572, lng: -4.2778 },
  'Montilla': { lat: 37.5861, lng: -4.6389 },
  'Montoro': { lat: 38.0222, lng: -4.3833 },
  'Monturque': { lat: 37.5333, lng: -4.6333 },
  'Priego de Cordoba': { lat: 37.4386, lng: -4.1956 },
  'Puente Genil': { lat: 37.3897, lng: -4.7667 },
  'Rute': { lat: 37.3222, lng: -4.3639 },
  'Santaella': { lat: 37.6167, lng: -4.8500 },
  'Valenzuela': { lat: 37.7667, lng: -4.2833 },
  'Zuheros': { lat: 37.5431, lng: -4.3156 },

  // Granada Province
  'Alhama de Granada': { lat: 37.0089, lng: -3.9906 },
  'Loja': { lat: 37.1681, lng: -4.1511 },
  'Montefrio': { lat: 37.3206, lng: -4.0117 },

  // Jaen Province
  'Alcala la Real': { lat: 37.4600, lng: -3.9231 },
  'Alcaudete': { lat: 37.5917, lng: -4.0833 },
  'Castillo de Locubin': { lat: 37.5167, lng: -3.9333 },
  'Frailes': { lat: 37.5167, lng: -3.8167 },
  'Martos': { lat: 37.7211, lng: -3.9722 },

  // Sevilla Province
  'Estepa': { lat: 37.2922, lng: -4.8781 },
  'Osuna': { lat: 37.2375, lng: -5.1031 },
  'La Roda de Andalucia': { lat: 37.2000, lng: -4.7833 },

  // Cadiz Province
  'Arcos de la Frontera': { lat: 36.7500, lng: -5.8167 },
  'Olvera': { lat: 36.9333, lng: -5.2667 },
  'Villamartin': { lat: 36.8667, lng: -5.6333 }
};

// Define province colors with hex values instead of Tailwind classes
const provinceColors: Record<string, { bg: string; hover: string; hex: string }> = {
  'ALL': { bg: 'bg-neutral-500', hover: 'hover:bg-primary-600', hex: '#6B7280' },
  'Malaga': { bg: 'bg-neutral-500', hover: 'hover:bg-primary-600', hex: '#3B82F6' },
  'Cordoba': { bg: 'bg-neutral-500', hover: 'hover:bg-primary-600', hex: '#22C55E' },
  'Granada': { bg: 'bg-neutral-500', hover: 'hover:bg-primary-600', hex: '#A855F7' },
  'Jaen': { bg: 'bg-neutral-500', hover: 'hover:bg-primary-600', hex: '#F97316' },
  'Sevilla': { bg: 'bg-neutral-500', hover: 'hover:bg-primary-600', hex: '#EF4444' },
  'Cadiz': { bg: 'bg-neutral-500', hover: 'hover:bg-primary-600', hex: '#14B8A6' },
  'Almeria': { bg: 'bg-neutral-500', hover: 'hover:bg-primary-600', hex: '#EC4899' }
};

const containerStyle = {
  width: "100%",
  height: "70vh",
};

const center = {
  lat: 37.7,
  lng: -4.3,
};

const zoom = 8;

// Add this type for area images
type AreaImage = {
  [key: string]: string;
};

// Add area images mapping
const areaImages: AreaImage = {
  // Malaga Province
  'Antequera': '/images/areas/antequera.jpg',
  'Archidona': '/images/areas/archidona.jpg',
  'Campillos': '/images/areas/campillos.jpg',
  'Coin': '/images/areas/coin.jpg',
  'Villanueva del Rosario': '/images/areas/villanueva-del-rosario.jpg',
  'Villanueva de Tapia': '/images/areas/villanueva-de-tapia.jpg',

  // Cordoba Province
  'Almedinilla': '/images/areas/almedinilla.jpg',
  'Almodovar Del Rio': '/images/areas/almodovar-del-rio.jpg',
  'Baena': '/images/areas/baena.jpg',
  'Benamejí': '/images/areas/benameji.jpg',
  'Cabra': '/images/areas/cabra.jpg',
  'Carcabuey': '/images/areas/carcabuey.jpg',
  'Castro Del Rio': '/images/areas/castro-del-rio.jpg',
  'Encinas Reales': '/images/areas/encinas-reales.jpg',
  'Fuente-Tojar': '/images/areas/fuente-tojar.jpg',
  'Iznajar': '/images/areas/iznajar.jpg',
  'La Carlota': '/images/areas/la-carlota.jpg',
  'La Guijarrosa': '/images/areas/la-guijarrosa.jpg',
  'Lucena': '/images/areas/lucena.jpg',
  'Luque': '/images/areas/luque.jpg',
  'Montilla': '/images/areas/montilla.jpg',
  'Montoro': '/images/areas/montoro.jpg',
  'Monturque': '/images/areas/monturque.jpg',
  'Priego de Cordoba': '/images/areas/priego-de-cordoba.jpg',
  'Puente Genil': '/images/areas/puente-genil.jpg',
  'Rute': '/images/areas/rute.jpg',
  'Santaella': '/images/areas/santaella.jpg',
  'Valenzuela': '/images/areas/valenzuela.jpg',
  'Zuheros': '/images/areas/zuheros.jpg',

  // Granada Province
  'Alhama de Granada': '/images/areas/alhama-de-granada.jpg',
  'Loja': '/images/areas/loja.jpg',
  'Montefrio': '/images/areas/montefrio.jpg',

  // Jaen Province
  'Alcala la Real': '/images/areas/alcala-la-real.jpg',
  'Alcaudete': '/images/areas/alcaudete.jpg',
  'Castillo de Locubin': '/images/areas/castillo-de-locubin.jpg',
  'Frailes': '/images/areas/frailes.jpg',
  'Martos': '/images/areas/martos.jpg',

  // Sevilla Province
  'Estepa': '/images/areas/estepa.jpg',
  'Osuna': '/images/areas/osuna.jpg',
  'La Roda de Andalucia': '/images/areas/la-roda-de-andalucia.jpg',

  // Cadiz Province
  'Arcos de la Frontera': '/images/areas/arcos-de-la-frontera.jpg',
  'Olvera': '/images/areas/olvera.jpg',
  'Villamartin': '/images/areas/villamartin.jpg',

  // Default fallback image
  'default': '/images/areas/default.jpg'
};

// Function to generate a custom IA SVG marker as a data URL
function getIAMarkerIcon(province: string) {
  const color = provinceColors[province]?.hex || '#FFD600'; // Default to yellow if province not found
  const svg = `
    <svg width="44" height="54" viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="0" y="0" width="44" height="54" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.18"/>
        </filter>
      </defs>
      <g filter="url(#shadow)">
        <path d="M22 2C11.1 2 2 11.1 2 22.5C2 36.5 22 52 22 52C22 52 42 36.5 42 22.5C42 11.1 32.9 2 22 2Z" fill="${color}" stroke="#FFFFFF" stroke-width="2"/>
        <text x="50%" y="52%" text-anchor="middle" fill="#FFFFFF" font-size="16" font-family="Arial, sans-serif" font-weight="bold" dy=".3em">IA</text>
      </g>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export default function MapSearchPage() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA5h3ZfC3rhIC2ow1VlVC_J6sprxC1Rbns",
  });
  
  const [selectedArea, setSelectedArea] = useState<{
    name: string;
    lat: number;
    lng: number;
    count: number;
    province: string;
  } | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>("ALL");
  console.log("selectedProvince--",selectedProvince);
  const [selectedTown, setSelectedTown] = useState<string | null>(null);

  // Calculate area statistics from actual property data
  const areaStats = useMemo(() => {
    const stats = new Map<string, { count: number; province: string }>();
    
    allProperties.forEach(property => {
      const { town, province } = property.location;
      if (!stats.has(town)) {
        stats.set(town, { count: 1, province });
      } else {
        const current = stats.get(town)!;
        stats.set(town, { ...current, count: current.count + 1 });
      }
    });

    // Convert to array with coordinates
    return Array.from(stats.entries())
      .filter(([town]) => areaCoordinates[town]) // Only include towns with coordinates
      .map(([town, { count, province }]) => ({
        name: town,
        count,
        province,
        ...areaCoordinates[town]
      }));
  }, []);

  // Calculate province statistics
  const provinceStats = useMemo(() => {
    const stats = areaStats.reduce((acc, area) => {
      const province = area.province;
      acc[province] = (acc[province] || 0) + area.count;
      return acc;
    }, {} as Record<string, number>);

    // Calculate total count for ALL option
    const totalCount = Object.values(stats).reduce((sum, count) => sum + count, 0);

    // Add ALL option with total count
    const allStats = [
      ['ALL', totalCount],
      ...Object.entries(stats).sort((a, b) => b[1] - a[1])
    ];

    return allStats;
  }, [areaStats]);

  // Get towns for selected province
  const townStats = useMemo(() => {
    if (!selectedProvince || selectedProvince === 'ALL') return [];
    
    return areaStats
      .filter(area => area.province === selectedProvince)
      .map(area => ({
        name: area.name,
        count: area.count
      }))
      .sort((a, b) => b.count - a.count);
  }, [selectedProvince, areaStats]);

  // Filter areas based on selected province and town
  const filteredAreas = useMemo(() => {
    if (selectedTown) {
      return areaStats.filter(area => area.name === selectedTown);
    }
    
    if (selectedProvince && selectedProvince !== 'ALL') {
      return areaStats.filter(area => area.province === selectedProvince);
    }
    
    return areaStats;
  }, [selectedProvince, selectedTown, areaStats]);

  if (!isLoaded) return <div className="text-center py-20">Loading map...</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-6 font-heading text-3xl font-bold text-primary-600">Search Properties by Map</h1>
      
      {/* Province Filters */}
      <div className="mb-8 rounded-xl border border-neutral-200 bg-white p-4">
        <h2 className="text-base font-semibold text-gray-700 mb-4">
          {selectedTown ? `Properties in ${selectedTown}` : 
           selectedProvince === 'ALL' ? 'All Properties' :
           selectedProvince ? `Areas in ${selectedProvince}` : 
           'Filter by Province'}
        </h2>
        <div className="space-y-4 mb-6">
          {/* Province Buttons */}
          <div className="flex flex-wrap gap-2">
            {provinceStats.map(([province, count]) => {
              const colors = provinceColors[province] || { bg: 'bg-gray-500', hover: 'hover:bg-gray-600' };
              return (
                <button
                  key={province}
                  onClick={() => {
                    setSelectedProvince(province === selectedProvince ? null : province.toString());
                    setSelectedTown(null);
                  }}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-base font-medium transition-colors
                    ${selectedProvince === province ? `bg-primary-600 ${colors.hover} text-white` : `${colors.bg} ${colors.hover} text-white` } border border-transparent shadow-sm`}
                > 
                  {selectedProvince === province ? (
                    <span><CheckIcon className="h-4 w-4 text-white" /></span>
                  ):(
                    <></>
                  )}
                  <span>{province}</span>
                  <span className="rounded-full bg-white/15 px-2 py-0.5 text-sm font-semibold text-white">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Town List */}
          {selectedProvince && (
            <div className="mt-4 flex flex-wrap gap-2">
              {townStats.map((town) => (
                <button
                  key={town.name}
                  onClick={() => setSelectedTown(selectedTown === town.name ? null : town.name)}
                  className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium transition-colors
                    ${
                      selectedTown === town.name
                        ? 'bg-secondary-500 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600'
                    } border border-transparent`}
                >
                  {selectedTown === town.name ? (
                    <span><CheckIcon className="h-4 w-4 text-white" /></span>
                  ):(
                    <></>
                  )}
                  <span>{town.name}</span>
                  <span className={`rounded-full px-1.5 py-0.5 text-xs font-semibold
                    ${
                      selectedTown === town.name
                        ? 'bg-white/20 text-white'
                        : 'bg-white/60 text-neutral-600 dark:bg-black/30 dark:text-neutral-300'
                    }`}
                  >
                    {town.count}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      

        {/* Map */}
        <div className="rounded-xl overflow-hidden border border-neutral-200">
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
            {filteredAreas.map((area) => (
              <Marker
                key={area.name}
                position={{ lat: area.lat, lng: area.lng }}
                onClick={() => setSelectedArea(area)}
                icon={
                  {
                    url: getIAMarkerIcon(area.province),
                    scaledSize: new window.google.maps.Size(44, 54),
                    anchor: new window.google.maps.Point(22, 52),
                  }
                }
              />
            ))}
            {selectedArea && (
              <InfoWindow
                position={{ lat: selectedArea.lat, lng: selectedArea.lng }}
                onCloseClick={() => setSelectedArea(null)}
              >
                <div className="min-w-[300px] max-w-[400px] overflow-hidden rounded-lg bg-white">
                  {/* Area Image */}
                  <div className="relative h-[160px] w-full">
                    <Image
                      src={areaImages[selectedArea.name] || areaImages.default}
                      alt={`${selectedArea.name} area`}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <h2 className="text-xl font-bold text-primary-900 mb-2">
                      {selectedArea.name}
                    </h2>
                    
                    <p className="text-neutral-600 mb-4">
                      There {selectedArea.count === 1 ? 'is' : 'are'} <span className="font-semibold text-primary-700">{selectedArea.count}</span> {selectedArea.count === 1 ? 'property' : 'properties'} available in {selectedArea.name}
                    </p>
                    
                    {/* Province Tag */}
                    <div className="mb-4">
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${provinceColors[selectedArea.province].bg} text-white`}
                      >
                        {selectedArea.province}
                      </span>
                    </div>
                    
                    {/* View Properties Button */}
                    <a
                      href={`/properties?location=${encodeURIComponent(selectedArea.name)}`}
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
    </div>
  );
}