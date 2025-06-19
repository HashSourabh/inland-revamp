"use client";

import React, { useState } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";

// Example property data (replace with real data or fetch from API)
const propertyAreas = [
  {
    name: "Antequera",
    lat: 37.0194,
    lng: -4.5612,
    count: 27,
  },
  {
    name: "Ron",
    lat: 36.7423,
    lng: -5.1671,
    count: 14,
  },
  {
    name: "Priego de Córdoba",
    lat: 37.4386,
    lng: -4.1956,
    count: 74,
  },
  {
    name: "Iznájar",
    lat: 37.2572,
    lng: -4.3081,
    count: 28,
  },
  {
    name: "Montefrio",
    lat: 37.3206,
    lng: -4.0117,
    count: 12,
  },
  {
    name: "Almedinilla",
    lat: 37.4417,
    lng: -4.0917,
    count: 7,
  },
  {
    name: "Baena",
    lat: 37.6167,
    lng: -4.3167,
    count: 5,
  },
  {
    name: "Cabra",
    lat: 37.4722,
    lng: -4.4422,
    count: 6,
  },
  {
    name: "Carcabuey",
    lat: 37.4461,
    lng: -4.2778,
    count: 16,
  },
  {
    name: "Castro Del Rio",
    lat: 37.6961,
    lng: -4.4806,
    count: 1,
  },
  {
    name: "Encinas Reales",
    lat: 37.2667,
    lng: -4.5333,
    count: 3,
  },
  {
    name: "Fuente-Tojar",
    lat: 37.4492,
    lng: -4.0917,
    count: 23,
  },
  {
    name: "Iznajar",
    lat: 37.2572,
    lng: -4.3081,
    count: 28,
  },
  {
    name: "Lucena",
    lat: 37.4089,
    lng: -4.4853,
    count: 4,
  },
  {
    name: "Luque",
    lat: 37.5572,
    lng: -4.2778,
    count: 35,
  },
  {
    name: "Montilla",
    lat: 37.5861,
    lng: -4.6389,
    count: 1,
  },
  {
    name: "Montoro",
    lat: 38.0222,
    lng: -4.3833,
    count: 1,
  },
  {
    name: "Monturque",
    lat: 37.5333,
    lng: -4.6333,
    count: 5,
  },
  {
    name: "Puente Genil",
    lat: 37.3897,
    lng: -4.7667,
    count: 8,
  },
  {
    name: "Rute",
    lat: 37.3222,
    lng: -4.3639,
    count: 54,
  },
  {
    name: "Santaella",
    lat: 37.6167,
    lng: -4.8500,
    count: 1,
  },
  {
    name: "Zuheros",
    lat: 37.5431,
    lng: -4.3156,
    count: 9,
  },
  {
    name: "Alcala la Real",
    lat: 37.4600,
    lng: -3.9231,
    count: 14,
  },
  {
    name: "Alcaudete",
    lat: 37.5917,
    lng: -4.0833,
    count: 5,
  },
  {
    name: "Andujar",
    lat: 38.0397,
    lng: -4.0500,
    count: 3,
  },
  {
    name: "Arjona",
    lat: 37.9347,
    lng: -4.0492,
    count: 2,
  },
  {
    name: "Baeza",
    lat: 37.9931,
    lng: -3.4714,
    count: 6,
  },
  {
    name: "Bailen",
    lat: 38.0961,
    lng: -3.7778,
    count: 2,
  },
  {
    name: "Castillo de Locubin",
    lat: 37.5167,
    lng: -3.9333,
    count: 8,
  },
  {
    name: "Frailes",
    lat: 37.5167,
    lng: -3.8167,
    count: 10,
  },
  {
    name: "Jaén",
    lat: 37.7796,
    lng: -3.7849,
    count: 7,
  },
  {
    name: "Linares",
    lat: 38.0956,
    lng: -3.6361,
    count: 3,
  },
  {
    name: "Martos",
    lat: 37.7211,
    lng: -3.9722,
    count: 8,
  },
  {
    name: "Sabiote",
    lat: 38.0667,
    lng: -3.3167,
    count: 5,
  },
  {
    name: "Ubeda",
    lat: 38.0114,
    lng: -3.3708,
    count: 6,
  },
  {
    name: "Valdepeñas de Jaén",
    lat: 37.5667,
    lng: -3.9333,
    count: 3,
  },
  {
    name: "Alameda",
    lat: 37.2000,
    lng: -4.6667,
    count: 12,
  },
  {
    name: "Alhaurin de la Torre",
    lat: 36.6644,
    lng: -4.5611,
    count: 15,
  },
  {
    name: "Alhaurin el Grande",
    lat: 36.6431,
    lng: -4.6875,
    count: 8,
  },
  {
    name: "Alora",
    lat: 36.8222,
    lng: -4.7056,
    count: 7,
  },
  {
    name: "Archidona",
    lat: 37.0961,
    lng: -4.3889,
    count: 15,
  },
  {
    name: "Ardales",
    lat: 36.8806,
    lng: -4.8458,
    count: 9,
  },
  {
    name: "Campillos",
    lat: 37.0492,
    lng: -4.8625,
    count: 4,
  },
  {
    name: "Cartama",
    lat: 36.7106,
    lng: -4.6333,
    count: 6,
  },
  {
    name: "Casarabonela",
    lat: 36.7822,
    lng: -4.8417,
    count: 3,
  },
  {
    name: "Coin",
    lat: 36.6597,
    lng: -4.7569,
    count: 11,
  },
  {
    name: "El Burgo",
    lat: 36.7625,
    lng: -5.0000,
    count: 2,
  },
  {
    name: "Fuente de Piedra",
    lat: 37.1333,
    lng: -4.7333,
    count: 5,
  },
  {
    name: "Humilladero",
    lat: 37.1333,
    lng: -4.7333,
    count: 3,
  },
  {
    name: "Mollina",
    lat: 37.1333,
    lng: -4.6833,
    count: 19,
  },
  {
    name: "Teba",
    lat: 36.9833,
    lng: -4.9167,
    count: 4,
  },
  {
    name: "Yunquera",
    lat: 36.7167,
    lng: -4.9167,
    count: 2,
  },
  {
    name: "Loja",
    lat: 37.1681,
    lng: -4.1511,
    count: 16,
  },
  {
    name: "Durcal",
    lat: 36.9881,
    lng: -3.5631,
    count: 1,
  },
  {
    name: "Illora",
    lat: 37.2567,
    lng: -3.8856,
    count: 3,
  },
  {
    name: "Moclin",
    lat: 37.3833,
    lng: -3.7667,
    count: 4,
  },
  {
    name: "Salar",
    lat: 37.1833,
    lng: -4.1500,
    count: 1,
  },
  {
    name: "Tozar",
    lat: 37.3833,
    lng: -3.8167,
    count: 11,
  },
  {
    name: "Zagra",
    lat: 37.2667,
    lng: -4.1833,
    count: 1,
  },
  {
    name: "Baza",
    lat: 37.4889,
    lng: -2.7717,
    count: 1,
  },
  {
    name: "Guadix",
    lat: 37.2992,
    lng: -3.1394,
    count: 1,
  },
  {
    name: "Cazorla",
    lat: 37.9106,
    lng: -3.0025,
    count: 1,
  },
  {
    name: "Utrera",
    lat: 37.1856,
    lng: -5.7806,
    count: 2,
  },
  {
    name: "Ecija",
    lat: 37.5411,
    lng: -5.0822,
    count: 2,
  },
  {
    name: "Osuna",
    lat: 37.2375,
    lng: -5.1031,
    count: 2,
  },
  {
    name: "Carmona",
    lat: 37.4714,
    lng: -5.6464,
    count: 2,
  },
  {
    name: "Estepa",
    lat: 37.2922,
    lng: -4.8781,
    count: 2,
  },
  {
    name: "Pruna",
    lat: 36.9833,
    lng: -5.1833,
    count: 1,
  },
  {
    name: "Marchena",
    lat: 37.3292,
    lng: -5.4167,
    count: 1,
  },
  {
    name: "Moron de la Frontera",
    lat: 37.1206,
    lng: -5.4511,
    count: 1,
  },
  {
    name: "Lora del Rio",
    lat: 37.6597,
    lng: -5.5278,
    count: 1,
  },
  {
    name: "Lebrija",
    lat: 36.9208,
    lng: -6.0750,
    count: 1,
  },
  {
    name: "Sanlucar la Mayor",
    lat: 37.3861,
    lng: -6.2014,
    count: 1,
  },
  {
    name: "Cazalla de la Sierra",
    lat: 37.9292,
    lng: -5.7656,
    count: 1,
  },
  {
    name: "Constantina",
    lat: 37.8708,
    lng: -5.6211,
    count: 1,
  },
  {
    name: "El Saucejo",
    lat: 37.0500,
    lng: -5.0000,
    count: 1,
  },
  {
    name: "La Rambla",
    lat: 37.6000,
    lng: -4.7500,
    count: 1,
  },
  {
    name: "Montemayor",
    lat: 37.6167,
    lng: -4.7167,
    count: 1,
  },
  {
    name: "Aguilar de la Frontera",
    lat: 37.5147,
    lng: -4.6556,
    count: 1,
  },
  {
    name: "Benameji",
    lat: 37.2667,
    lng: -4.5667,
    count: 2,
  },
  {
    name: "Doña Mencia",
    lat: 37.5486,
    lng: -4.3556,
    count: 1,
  },
  {
    name: "Espejo",
    lat: 37.6333,
    lng: -4.4833,
    count: 1,
  },
  {
    name: "Fernan-Nuñez",
    lat: 37.6667,
    lng: -4.7333,
    count: 1,
  },
  {
    name: "La Carlota",
    lat: 37.6708,
    lng: -4.9281,
    count: 2,
  },
  {
    name: "La Guijarrosa",
    lat: 37.6167,
    lng: -4.8167,
    count: 2,
  },
  {
    name: "Valenzuela",
    lat: 37.7667,
    lng: -4.2833,
    count: 1,
  },
];

const containerStyle = {
  width: "100%",
  height: "70vh",
};

const center = {
  lat: 37.7,
  lng: -4.3,
};

const zoom = 8;

const FAVICON_URL = "https://www.inlandandalucia.com/Images/Icons/favicon.ico";

export default function MapSearchPage() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", // Set your API key in .env.local
  });
  const [selectedArea, setSelectedArea] = useState<null | typeof propertyAreas[0]>(null);

  if (!isLoaded) return <div className="text-center py-20">Loading map...</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold text-neutral-900">Search Properties by Map</h1>
      <div className="rounded-xl shadow-lg overflow-hidden border border-neutral-200">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
          {propertyAreas.map((area) => (
            <Marker
              key={area.name}
              position={{ lat: area.lat, lng: area.lng }}
              onClick={() => setSelectedArea(area)}
              icon={{
                url: FAVICON_URL,
                scaledSize: new window.google.maps.Size(36, 36),
                anchor: new window.google.maps.Point(18, 36),
              }}
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