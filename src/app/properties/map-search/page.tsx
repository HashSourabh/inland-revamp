"use client";

import React, { useState, useMemo } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import Image from "next/image";
import { allProperties } from '@/data/properties';
import { CheckIcon } from '@heroicons/react/24/outline';


// Define area coordinates
const areaCoordinates: Record<string, { lat: number; lng: number }> = {
  // Cordoba Province
  'Almedinilla': { lat: 37.4417, lng: -4.0917 },
  'Baena': { lat: 37.6167, lng: -4.3167 },
  'Benameji': { lat: 37.2667, lng: -4.5667 },
  'Cabra': { lat: 37.4722, lng: -4.4422 },
  'Carcabuey': { lat: 37.4461, lng: -4.2778 },
  'Cordoba (city)': { lat: 37.4461, lng: -4.2778 },
  'Encinas Reales': { lat: 37.2667, lng: -4.5333 },
  'Espejo': { lat: 37.2667, lng: -4.5333 },
  'Fuente Carreteros': { lat: 37.2667, lng: -4.5333 },
  'Fuente Obejuna': { lat: 37.4492, lng: -4.0917 },
  'Fuente-Tojar': { lat: 37.4492, lng: -4.0917 },
  'Iznajar': { lat: 37.2572, lng: -4.3081 },
  'Jauja': { lat: 37.2572, lng: -4.3081 },
  'La Carlota': { lat: 37.6708, lng: -4.9281 },
  'La Guijarrosa': { lat: 37.6167, lng: -4.8167 },
  'La Rambla': { lat: 37.6167, lng: -4.8167 },
  'Los Juncares': { lat: 37.6167, lng: -4.8167 },
  'Lucena': { lat: 37.4089, lng: -4.4853 },
  'Luque': { lat: 37.5572, lng: -4.2778 },
  'Almodovar Del Rio': { lat: 37.8125, lng: -5.0194 },
  'Castro Del Rio': { lat: 37.6961, lng: -4.4806 },
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
  'Agron': { lat: 37.0176, lng: -3.8012 },
  'Algarinejo': { lat: 37.3227, lng: -4.1297 },
  'Alhama de Granada': { lat: 37.0089, lng: -3.9906 },
  'Atarfe': { lat: 37.2204, lng: -3.6852 },
  'Benalua de las Villas': { lat: 37.5095, lng: -3.7537 },
  'Campotejar': { lat: 37.5212, lng: -3.6909 },
  'Huetor Tajar': { lat: 37.1961, lng: -4.0461 },
  'Illora': { lat: 37.2888, lng: -3.8813 },
  'Las Casillas de Gumiel': { lat: 37.4181, lng: -3.9789 }, // Approximate
  'Loja': { lat: 37.1681, lng: -4.1511 },
  'Moclin': { lat: 37.3852, lng: -3.7877 },
  'Montefrio': { lat: 37.3206, lng: -4.0117 },
  'Montillana': { lat: 37.4943, lng: -3.7534 },
  'Moraleda de Zafayona': { lat: 37.1494, lng: -3.9944 },
  'Nevada National Parc': { lat: 37.0500, lng: -3.3500 }, // General location
  'Otura': { lat: 37.0945, lng: -3.6503 },
  'Puerto Lope': { lat: 37.3858, lng: -3.8967 },
  'Tozar': { lat: 37.3628, lng: -3.9115 },
  'Ventorros de San Jose': { lat: 37.2590, lng: -4.1201 },
  'Villanueva de las Torres': { lat: 37.5833, lng: -3.0167 },
  'Zagra': { lat: 37.2977, lng: -4.1938 },

  // Jaen Province
  'Alcala la Real': { lat: 37.4600, lng: -3.9231 },
  'Alcaudete': { lat: 37.5830, lng: -4.1000 },
  'Baeza': { lat: 37.9967, lng: -3.4676 },
  'Bobadilla de Alcaudete': { lat: 37.6611, lng: -4.1055 },
  'Cambil': { lat: 37.6670, lng: -3.5670 },
  'Carchelejo': { lat: 37.6353, lng: -3.6404 },
  'Castillo de Locubin': { lat: 37.5167, lng: -3.9333 },
  'Charilla': { lat: 37.4871, lng: -3.8910 }, // random near Alcala la Real
  'Ermita Nueva': { lat: 37.4740, lng: -3.8982 }, // random nearby
  'Frailes': { lat: 37.5167, lng: -3.8167 },
  'Fuensanta de Martos': { lat: 37.6478, lng: -3.9060 },
  'Fuente Alamo': { lat: 37.7205, lng: -3.9955 }, // random near Martos
  'Huelma': { lat: 37.6484, lng: -3.4505 },
  'Jaen (city)': { lat: 37.7692, lng: -3.7903 },
  'La Carrasca': { lat: 37.5100, lng: -3.8600 }, // random nearby
  'La Pedriza': { lat: 37.4980, lng: -3.8750 }, // random
  'La Rabita': { lat: 37.5380, lng: -3.9600 }, // random
  'Las Casillas': { lat: 37.6300, lng: -4.0100 }, // random
  'Martos': { lat: 37.7211, lng: -3.9722 },
  'Mengibar': { lat: 37.9683, lng: -3.8088 },
  'Monte Lope Alvarez': { lat: 37.7032, lng: -4.1137 },
  'Mures': { lat: 37.4805, lng: -3.9522 }, // random
  'Noguerones': { lat: 37.5466, lng: -4.0644 }, // random
  'Pegalajar': { lat: 37.7111, lng: -3.6816 },
  'Porcuna': { lat: 37.8709, lng: -4.1847 },
  'Sabariego': { lat: 37.5750, lng: -4.0150 }, // random
  'San Jose de La Rabita': { lat: 37.5300, lng: -3.9480 }, // random
  'Santiago de Calatrava': { lat: 37.8333, lng: -4.1167 },
  'Torredonjimeno': { lat: 37.7658, lng: -3.9574 },
  'Valdepenas de Jaen': { lat: 37.5167, lng: -3.8500 }, // random
  'Villardompardo': { lat: 37.8374, lng: -4.0005 },

  // Malaga Province
  'Alameda': { lat: 37.2095, lng: -4.6603 },                // accurate per multiple mapping sources :contentReference[oaicite:1]{index=1}
  'Alcaucin': { lat: 36.9030, lng: -4.1141 },                // precise mapping sources :contentReference[oaicite:2]{index=2}
  'Campillos': { lat: 37.0492, lng: -4.8625 },              // your provided point
  'Coin': { lat: 36.6597, lng: -4.7569 },
  'Mijas': { lat: 36.5968, lng: -4.6373 },                  // accurate per wiki :contentReference[oaicite:3]{index=3}
  'Arroyo de la Miel': { lat: 36.6033, lng: -4.5424 },       // reliable map data :contentReference[oaicite:4]{index=4}
  'Antequera': { lat: 37.0194, lng: -4.5612 },
  'Archidona': { lat: 37.0961, lng: -4.3889 },
  'Villanueva del Rosario': { lat: 37.0089, lng: -4.3636 },
  'Villanueva de Tapia': { lat: 37.1833, lng: -4.3333 },

  // Random-but-regionally-appropriate coordinates for the remaining
  'Alfarnatejo': { lat: 36.9290, lng: -4.1750 },
  'Algarrobo': { lat: 36.7440, lng: -4.1150 },
  'Alhaurin de la Torre': { lat: 36.6840, lng: -4.5600 },
  'Alhaurin el Grande': { lat: 36.6200, lng: -4.6500 },
  'Almachar': { lat: 36.8000, lng: -4.4000 },
  'Almogia': { lat: 36.7700, lng: -4.6000 },
  'Alora': { lat: 36.8650, lng: -4.6800 },
  'Ardales': { lat: 36.8800, lng: -4.7300 },
  'Benamargosa': { lat: 36.7500, lng: -4.0100 },
  'Benaojan': { lat: 36.6750, lng: -5.2000 },
  'Bobadilla': { lat: 37.0200, lng: -4.6000 },
  'Canillas de Aceituno': { lat: 36.8000, lng: -4.0000 },
  'Canillas de Albaida': { lat: 36.8350, lng: -4.0700 },
  'Carratraca': { lat: 36.9000, lng: -4.7000 },
  'Cartama': { lat: 36.7500, lng: -4.6300 },
  'Casabermeja': { lat: 36.9000, lng: -4.4000 },
  'Casarabonela': { lat: 36.8200, lng: -4.6700 },
  'Colmenar': { lat: 36.9000, lng: -4.0500 },
  'Comares': { lat: 36.8200, lng: -4.1100 },
  'Competa': { lat: 36.7750, lng: -4.0000 },
  'Cuevas Bajas': { lat: 37.0000, lng: -4.7000 },
  'Cuevas de San Marcos': { lat: 37.1500, lng: -4.6500 },
  'Cutar': { lat: 36.8000, lng: -4.2000 },
  'El Borge': { lat: 36.8500, lng: -4.0000 },
  'El Burgo': { lat: 36.9000, lng: -4.7500 },
  'Frigiliana': { lat: 36.7800, lng: -3.8800 },
  'Fuente de Piedra': { lat: 37.1500, lng: -4.7500 },
  'Guaro': { lat: 36.6500, lng: -4.7700 },
  'Humilladero': { lat: 36.7900, lng: -4.8500 },
  'Istan': { lat: 36.5200, lng: -4.8800 },
  'Iznate': { lat: 36.8200, lng: -4.0000 },
  'Mollina': { lat: 37.0700, lng: -4.7600 },
  'Monda': { lat: 36.6500, lng: -4.9000 },
  'Montejaque': { lat: 36.7500, lng: -5.2000 },
  'Montes de Malaga': { lat: 36.7800, lng: -4.4500 },
  'Periana': { lat: 36.8500, lng: -4.0500 },
  'Pizarra': { lat: 36.8000, lng: -4.7000 },
  'Riogordo': { lat: 36.8000, lng: -4.2000 },
  'Ronda': { lat: 36.7400, lng: -5.1700 },
  'Salares': { lat: 36.8000, lng: -4.1000 },
  'Salinas': { lat: 36.9000, lng: -4.2000 },
  'Sedella': { lat: 36.8000, lng: -4.0000 },
  'Sierra de Yeguas': { lat: 37.1100, lng: -4.6100 },
  'Tolox': { lat: 36.7000, lng: -4.9200 },
  'Torre Del Mar': { lat: 36.7800, lng: -4.1000 },
  'Torrox': { lat: 36.7200, lng: -3.9200 },
  'Valle de Abdalajis': { lat: 37.1500, lng: -4.6500 },
  'Velez Malaga': { lat: 36.7900, lng: -4.1000 },
  'Villanueva de Algaidas': { lat: 37.0500, lng: -4.6500 },
  'Villanueva de la Concepcion': { lat: 37.1000, lng: -4.6300 },
  'Villanueva Del Trabuco': { lat: 37.1200, lng: -4.6500 },
  'Vinuela': { lat: 36.8500, lng: -4.0500 },



  // Sevilla Province
  'Aguadulce': { lat: 37.2528, lng: -4.9911 },             // Aguadulce (Seville) :contentReference[oaicite:1]{index=1}
  'Arahal': { lat: 37.2627, lng: -5.5453 },                // Arahal, Seville :contentReference[oaicite:2]{index=2}
  'Écija': { lat: 37.5415, lng: -5.0827 },                 // Écija, Seville :contentReference[oaicite:3]{index=3}
  'Estepa': { lat: 37.2922, lng: -4.8781 },                // your provided
  'Osuna': { lat: 37.2375, lng: -5.1031 },                 // your provided
  'La Roda de Andalucia': { lat: 37.2000, lng: -4.7833 },  // your provided

  // Random coordinates within Seville province, realistic proximity
  'Badolatosa': { lat: 37.1500, lng: -5.1000 },
  'Casariche': { lat: 37.1830, lng: -4.9000 },
  'El Rubio': { lat: 37.1700, lng: -4.8200 },
  'El Saucejo': { lat: 37.2000, lng: -4.8800 },
  'Gilena': { lat: 37.2300, lng: -4.9500 },
  'Herrera': { lat: 37.2500, lng: -4.8000 },
  'Isla Redonda': { lat: 37.2100, lng: -5.0500 },
  'La Puebla de Cazalla': { lat: 37.2500, lng: -5.0300 },
  'Lora de Estepa': { lat: 37.2900, lng: -4.9000 },
  'Lora Del Rio': { lat: 37.6600, lng: -5.5300 },          // approximate real coordinates :contentReference[oaicite:4]{index=4}
  'Marchena': { lat: 37.3100, lng: -5.0600 },
  'Marinaleda': { lat: 37.3830, lng: -4.8800 },
  'Moron de la Frontera': { lat: 37.3100, lng: -5.2300 },
  'Pedrera': { lat: 37.2100, lng: -4.8700 },
  'Pruna': { lat: 37.2200, lng: -4.7200 },
  'Utrera': { lat: 37.1800, lng: -5.7800 },

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