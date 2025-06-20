"use client";

import React, { useState, useMemo } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";

// Example property data (replace with real data or fetch from API)
const propertyAreas = [
  { name: "Antequera", lat: 37.0194, lng: -4.5612, count: 27, province: "Malaga" },
  { name: "Ronda", lat: 36.7423, lng: -5.1671, count: 14, province: "Malaga" },
  { name: "Priego de Córdoba", lat: 37.4386, lng: -4.1956, count: 74, province: "Cordoba" },
  { name: "Iznájar", lat: 37.2572, lng: -4.3081, count: 28, province: "Cordoba" },
  { name: "Montefrio", lat: 37.3206, lng: -4.0117, count: 12, province: "Granada" },
  { name: "Almedinilla", lat: 37.4417, lng: -4.0917, count: 7, province: "Cordoba" },
  { name: "Baena", lat: 37.6167, lng: -4.3167, count: 5, province: "Cordoba" },
  { name: "Cabra", lat: 37.4722, lng: -4.4422, count: 6, province: "Cordoba" },
  { name: "Carcabuey", lat: 37.4461, lng: -4.2778, count: 16, province: "Cordoba" },
  { name: "Castro Del Rio", lat: 37.6961, lng: -4.4806, count: 1, province: "Cordoba" },
  { name: "Encinas Reales", lat: 37.2667, lng: -4.5333, count: 3, province: "Cordoba" },
  { name: "Fuente-Tojar", lat: 37.4492, lng: -4.0917, count: 23, province: "Cordoba" },
  { name: "Iznajar", lat: 37.2572, lng: -4.3081, count: 28, province: "Cordoba" },
  { name: "Lucena", lat: 37.4089, lng: -4.4853, count: 4, province: "Cordoba" },
  { name: "Luque", lat: 37.5572, lng: -4.2778, count: 35, province: "Cordoba" },
  { name: "Montilla", lat: 37.5861, lng: -4.6389, count: 1, province: "Cordoba" },
  { name: "Montoro", lat: 38.0222, lng: -4.3833, count: 1, province: "Cordoba" },
  { name: "Monturque", lat: 37.5333, lng: -4.6333, count: 5, province: "Cordoba" },
  { name: "Puente Genil", lat: 37.3897, lng: -4.7667, count: 8, province: "Cordoba" },
  { name: "Rute", lat: 37.3222, lng: -4.3639, count: 54, province: "Cordoba" },
  { name: "Santaella", lat: 37.6167, lng: -4.8500, count: 1, province: "Cordoba" },
  { name: "Zuheros", lat: 37.5431, lng: -4.3156, count: 9, province: "Cordoba" },
  { name: "Alcala la Real", lat: 37.4600, lng: -3.9231, count: 14, province: "Jaen" },
  { name: "Alcaudete", lat: 37.5917, lng: -4.0833, count: 5, province: "Jaen" },
  { name: "Andujar", lat: 38.0397, lng: -4.0500, count: 3, province: "Jaen" },
  { name: "Arjona", lat: 37.9347, lng: -4.0492, count: 2, province: "Jaen" },
  { name: "Baeza", lat: 37.9931, lng: -3.4714, count: 6, province: "Jaen" },
  { name: "Bailen", lat: 38.0961, lng: -3.7778, count: 2, province: "Jaen" },
  { name: "Castillo de Locubin", lat: 37.5167, lng: -3.9333, count: 8, province: "Jaen" },
  { name: "Frailes", lat: 37.5167, lng: -3.8167, count: 10, province: "Jaen" },
  { name: "Jaén", lat: 37.7796, lng: -3.7849, count: 7, province: "Jaen" },
  { name: "Linares", lat: 38.0956, lng: -3.6361, count: 3, province: "Jaen" },
  { name: "Martos", lat: 37.7211, lng: -3.9722, count: 8, province: "Jaen" },
  { name: "Sabiote", lat: 38.0667, lng: -3.3167, count: 5, province: "Jaen" },
  { name: "Ubeda", lat: 38.0114, lng: -3.3708, count: 6, province: "Jaen" },
  { name: "Valdepeñas de Jaén", lat: 37.5667, lng: -3.9333, count: 3, province: "Jaen" },
  { name: "Alameda", lat: 37.2000, lng: -4.6667, count: 12, province: "Malaga" },
  { name: "Alhaurin de la Torre", lat: 36.6644, lng: -4.5611, count: 15, province: "Malaga" },
  { name: "Alhaurin el Grande", lat: 36.6431, lng: -4.6875, count: 8, province: "Malaga" },
  { name: "Alora", lat: 36.8222, lng: -4.7056, count: 7, province: "Malaga" },
  { name: "Archidona", lat: 37.0961, lng: -4.3889, count: 15, province: "Malaga" },
  { name: "Ardales", lat: 36.8806, lng: -4.8458, count: 9, province: "Malaga" },
  { name: "Campillos", lat: 37.0492, lng: -4.8625, count: 4, province: "Malaga" },
  { name: "Cartama", lat: 36.7106, lng: -4.6333, count: 6, province: "Malaga" },
  { name: "Casarabonela", lat: 36.7822, lng: -4.8417, count: 3, province: "Malaga" },
  { name: "Coin", lat: 36.6597, lng: -4.7569, count: 11, province: "Malaga" },
  { name: "El Burgo", lat: 36.7625, lng: -5.0000, count: 2, province: "Malaga" },
  { name: "Fuente de Piedra", lat: 37.1333, lng: -4.7333, count: 5, province: "Malaga" },
  { name: "Humilladero", lat: 37.1333, lng: -4.7333, count: 3, province: "Malaga" },
  { name: "Mollina", lat: 37.1333, lng: -4.6833, count: 19, province: "Malaga" },
  { name: "Teba", lat: 36.9833, lng: -4.9167, count: 4, province: "Malaga" },
  { name: "Yunquera", lat: 36.7167, lng: -4.9167, count: 2, province: "Malaga" },
  { name: "Loja", lat: 37.1681, lng: -4.1511, count: 16, province: "Granada" },
  { name: "Durcal", lat: 36.9881, lng: -3.5631, count: 1, province: "Granada" },
  { name: "Illora", lat: 37.2567, lng: -3.8856, count: 3, province: "Granada" },
  { name: "Moclin", lat: 37.3833, lng: -3.7667, count: 4, province: "Granada" },
  { name: "Salar", lat: 37.1833, lng: -4.1500, count: 1, province: "Granada" },
  { name: "Tozar", lat: 37.3833, lng: -3.8167, count: 11, province: "Granada" },
  { name: "Zagra", lat: 37.2667, lng: -4.1833, count: 1, province: "Granada" },
  { name: "Baza", lat: 37.4889, lng: -2.7717, count: 1, province: "Granada" },
  { name: "Guadix", lat: 37.2992, lng: -3.1394, count: 1, province: "Granada" },
  { name: "Cazorla", lat: 37.9106, lng: -3.0025, count: 1, province: "Jaen" },
  { name: "Utrera", lat: 37.1856, lng: -5.7806, count: 2, province: "Sevilla" },
  { name: "Ecija", lat: 37.5411, lng: -5.0822, count: 2, province: "Sevilla" },
  { name: "Osuna", lat: 37.2375, lng: -5.1031, count: 2, province: "Sevilla" },
  { name: "Carmona", lat: 37.4714, lng: -5.6464, count: 2, province: "Sevilla" },
  { name: "Estepa", lat: 37.2922, lng: -4.8781, count: 2, province: "Sevilla" },
  { name: "Pruna", lat: 36.9833, lng: -5.1833, count: 1, province: "Sevilla" },
  { name: "Marchena", lat: 37.3292, lng: -5.4167, count: 1, province: "Sevilla" },
  { name: "Moron de la Frontera", lat: 37.1206, lng: -5.4511, count: 1, province: "Sevilla" },
  { name: "Lora del Rio", lat: 37.6597, lng: -5.5278, count: 1, province: "Sevilla" },
  { name: "Lebrija", lat: 36.9208, lng: -6.0750, count: 1, province: "Sevilla" },
  { name: "Sanlucar la Mayor", lat: 37.3861, lng: -6.2014, count: 1, province: "Sevilla" },
  { name: "Cazalla de la Sierra", lat: 37.9292, lng: -5.7656, count: 1, province: "Sevilla" },
  { name: "Constantina", lat: 37.8708, lng: -5.6211, count: 1, province: "Sevilla" },
  { name: "El Saucejo", lat: 37.0500, lng: -5.0000, count: 1, province: "Sevilla" },
  { name: "La Rambla", lat: 37.6000, lng: -4.7500, count: 1, province: "Sevilla" },
  { name: "Montemayor", lat: 37.6167, lng: -4.7167, count: 1, province: "Sevilla" },
  { name: "Aguilar de la Frontera", lat: 37.5147, lng: -4.6556, count: 1, province: "Sevilla" },
  { name: "Benameji", lat: 37.2667, lng: -4.5667, count: 2, province: "Sevilla" },
  { name: "Doña Mencia", lat: 37.5486, lng: -4.3556, count: 1, province: "Sevilla" },
  { name: "Espejo", lat: 37.6333, lng: -4.4833, count: 1, province: "Sevilla" },
  { name: "Fernan-Nuñez", lat: 37.6667, lng: -4.7333, count: 1, province: "Sevilla" },
  { name: "La Carlota", lat: 37.6708, lng: -4.9281, count: 2, province: "Sevilla" },
  { name: "La Guijarrosa", lat: 37.6167, lng: -4.8167, count: 2, province: "Sevilla" },
  { name: "Valenzuela", lat: 37.7667, lng: -4.2833, count: 1, province: "Sevilla" }
];

// Define province colors
const provinceColors: Record<string, { bg: string; hover: string }> = {
  'Malaga': { bg: 'bg-blue-500', hover: 'hover:bg-blue-600' },
  'Cordoba': { bg: 'bg-green-500', hover: 'hover:bg-green-600' },
  'Granada': { bg: 'bg-purple-500', hover: 'hover:bg-purple-600' },
  'Jaen': { bg: 'bg-orange-500', hover: 'hover:bg-orange-600' },
  'Sevilla': { bg: 'bg-red-500', hover: 'hover:bg-red-600' },
  'Cadiz': { bg: 'bg-teal-500', hover: 'hover:bg-teal-600' },
  'Almeria': { bg: 'bg-pink-500', hover: 'hover:bg-pink-600' }
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

// Function to generate a custom IA SVG marker as a data URL
function getIAMarkerIcon(count: number) {
  const svg = `
    <svg width="44" height="54" viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="0" y="0" width="44" height="54" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.18"/>
        </filter>
      </defs>
      <g filter="url(#shadow)">
        <path d="M22 2C11.1 2 2 11.1 2 22.5C2 36.5 22 52 22 52C22 52 42 36.5 42 22.5C42 11.1 32.9 2 22 2Z" fill="#FFD600" stroke="#1A237E" stroke-width="2"/>
        <text x="50%" y="52%" text-anchor="middle" fill="#1A237E" font-size="16" font-family="Arial, sans-serif" font-weight="bold" dy=".3em">IA</text>
      </g>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export default function MapSearchPage() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });
  const [selectedArea, setSelectedArea] = useState<null | typeof propertyAreas[0]>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedTown, setSelectedTown] = useState<string | null>(null);

  // Calculate province statistics
  const provinceStats = useMemo(() => {
    const stats = propertyAreas.reduce((acc, area) => {
      const province = area.province;
      acc[province] = (acc[province] || 0) + area.count;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(stats).sort((a, b) => b[1] - a[1]);
  }, []);

  // Get towns for selected province
  const townStats = useMemo(() => {
    if (!selectedProvince) return [];
    
    // Create a Map to store unique towns with their counts
    const uniqueTowns = new Map<string, number>();
    
    propertyAreas
      .filter(area => area.province === selectedProvince)
      .forEach(area => {
        // If town already exists, skip it (take only first occurrence)
        if (!uniqueTowns.has(area.name)) {
          uniqueTowns.set(area.name, area.count);
        }
      });

    // Convert Map to array of objects
    const stats = Array.from(uniqueTowns).map(([name, count]) => ({
      name,
      count
    }));

    return stats.sort((a, b) => b.count - a.count);
  }, [selectedProvince]);

  // Filter areas based on selected province and town
  const filteredAreas = useMemo(() => {
    // If a specific town is selected, only show that town's marker
    if (selectedTown) {
      return propertyAreas.filter(area => area.name === selectedTown);
    }
    
    // If only province is selected, show all towns in that province (without duplicates)
    if (selectedProvince) {
      const filtered = propertyAreas.filter(area => area.province === selectedProvince);
      return filtered.filter((area, index, self) => 
        index === self.findIndex(a => a.name === area.name)
      );
    }
    
    // If no filters, show all areas
    return propertyAreas;
  }, [selectedProvince, selectedTown]);

  if (!isLoaded) return <div className="text-center py-20">Loading map...</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold text-neutral-900">Search Properties by Map</h1>
      
      {/* Province Filters */}
      <div className="mb-8 rounded-lg border border-neutral-200 bg-white p-4">
        <h2 className="text-sm font-medium text-neutral-700 mb-4">
          {selectedTown ? `Properties in ${selectedTown}` : 
           selectedProvince ? `Areas in ${selectedProvince}` : 
           'Filter by Province'}
        </h2>
        <div className="space-y-4">
          {/* Province Buttons */}
          <div className="flex flex-wrap gap-2">
            {provinceStats.map(([province, count]) => {
              const colors = provinceColors[province] || { bg: 'bg-gray-500', hover: 'hover:bg-gray-600' };
              return (
                <button
                  key={province}
                  onClick={() => {
                    setSelectedProvince(selectedProvince === province ? null : province);
                    setSelectedTown(null);
                  }}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors
                    ${
                      selectedProvince === province
                        ? 'bg-primary-600 text-white'
                        : `${colors.bg} ${colors.hover} text-white`
                    } border border-transparent shadow-sm`}
                >
                  <span>{province}</span>
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold text-white">
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
      </div>

      {/* Map */}
      <div className="rounded-xl shadow-lg overflow-hidden border border-neutral-200">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
          {filteredAreas.map((area) => (
            <Marker
              key={area.name}
              position={{ lat: area.lat, lng: area.lng }}
              onClick={() => setSelectedArea(area)}
              icon={
                {
                  url: getIAMarkerIcon(area.count),
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
              <div className="min-w-[180px]">
                <h2 className="font-bold text-primary-700 mb-1">{selectedArea.name}</h2>
                <p className="text-neutral-700 mb-2">{selectedArea.count} properties available</p>
                <a
                  href={`/properties?location=${encodeURIComponent(selectedArea.name)}`}
                  className="inline-block rounded bg-primary-600 px-3 py-1 text-white text-sm hover:bg-primary-700"
                >
                  View Properties
                </a>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}