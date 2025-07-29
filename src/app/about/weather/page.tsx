"use client";

import Link from "next/link";
import { HomeIcon, StarIcon } from "@heroicons/react/24/outline";
import PromoSidebar from "@/components/PromoSidebar";

// Province weather.com URLs (example, real URLs should be used)
const provinceWeatherLinks = {
  malaga: "https://weather.com/weather/today/l/Malaga+Spain",
  sevilla: "https://weather.com/weather/today/l/Seville+Spain",
  cordoba: "https://weather.com/weather/today/l/Cordoba+Spain",
  jaen: "https://weather.com/weather/today/l/Jaen+Spain",
  granada: "https://weather.com/weather/today/l/Granada+Spain",
  huelva: "https://weather.com/weather/today/l/Huelva+Spain",
  cadiz: "https://weather.com/weather/today/l/Cadiz+Spain",
  almeria: "https://weather.com/weather/today/l/Almeria+Spain",
};

const quickTowns = [
  { province: "Malaga", towns: ["Antequera", "Ronda", "Marbella"] },
  { province: "Cordoba", towns: [] },
  { province: "Granada", towns: ["Guadix", "Motril"] },
  { province: "Almeria", towns: ["El Ejido"] },
  { province: "Sevilla", towns: ["Ecija", "Utrera"] },
  { province: "Huelva", towns: ["Ayamonte", "Aracena"] },
];

// Example property data by province (replace with real data as needed)
const propertiesByProvince = [
  {
    province: "Cordoba Province",
    towns: [
      { name: "Almedinilla", count: 7 },
      { name: "Baena", count: 5 },
      { name: "Cabra", count: 6 },
      // ... add more towns as needed
    ],
  },
  {
    province: "Granada Province",
    towns: [
      { name: "Agron", count: 2 },
      { name: "Algarinejo", count: 1 },
      // ...
    ],
  },
  // ... add other provinces
];

const provinceSVG = [
  {
    name: "Huelva",
    link: provinceWeatherLinks.huelva,
    path: "M40,120 Q60,80 120,80 Q160,100 160,140 Q120,160 80,160 Q60,150 40,120 Z",
    label: { x: 80, y: 120 },
  },
  {
    name: "Sevilla",
    link: provinceWeatherLinks.sevilla,
    path: "M120,80 Q180,60 240,80 Q260,120 200,140 Q160,140 160,100 Q160,100 120,80 Z",
    label: { x: 170, y: 100 },
  },
  {
    name: "Cadiz",
    link: provinceWeatherLinks.cadiz,
    path: "M60,160 Q120,160 160,180 Q140,220 80,200 Q60,180 60,160 Z",
    label: { x: 100, y: 185 },
  },
  {
    name: "Malaga",
    link: provinceWeatherLinks.malaga,
    path: "M160,140 Q200,140 240,180 Q220,220 180,200 Q160,180 160,140 Z",
    label: { x: 200, y: 180 },
  },
  {
    name: "Cordoba",
    link: provinceWeatherLinks.cordoba,
    path: "M200,60 Q260,40 320,60 Q320,100 260,120 Q240,80 200,60 Z",
    label: { x: 260, y: 80 },
  },
  {
    name: "Jaén",
    link: provinceWeatherLinks.jaen,
    path: "M320,60 Q380,80 380,120 Q340,140 300,120 Q320,100 320,60 Z",
    label: { x: 350, y: 100 },
  },
  {
    name: "Granada",
    link: provinceWeatherLinks.granada,
    path: "M260,120 Q340,140 340,200 Q280,220 220,180 Q240,180 260,120 Z",
    label: { x: 290, y: 170 },
  },
  {
    name: "Almería",
    link: provinceWeatherLinks.almeria,
    path: "M340,200 Q400,180 400,120 Q380,120 340,140 Q340,200 340,200 Z",
    label: { x: 370, y: 170 },
  },
];

export default function AboutWeatherPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Weather Content */}
      <section className="md:col-span-2 bg-white rounded-xl shadow-lg p-8 border border-neutral-200">
        <h1 className="font-script text-4xl md:text-5xl font-bold text-neutral-900 mb-4">The weather in Andalucía:</h1>
        <p className="mb-4 text-neutral-800 text-lg">
          Check the Weather Forecast in any region of Andalucia by clicking a province below
        </p>
        {/* Province Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 my-6">
          {Object.entries(provinceWeatherLinks).map(([key, url]) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center aspect-square rounded-xl bg-primary-200 hover:bg-primary-400 transition text-white text-xl font-bold shadow-md text-center"
              style={{ minHeight: 80 }}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </a>
          ))}
        </div>
        <p className="mb-6 text-neutral-700">Or check it on different towns of each region in Andalucia</p>
        {/* Quick Towns Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {quickTowns.filter((prov) => prov.towns.length > 0).map((prov) => (
            <div key={prov.province}>
              <h3 className="font-bold text-primary-900 mb-2 uppercase text-sm">{prov.province}</h3>
              <ul>
                {prov.towns.map((town) => (
                  <li key={town} className="bg-neutral-100 rounded px-3 py-1 mb-1 text-neutral-800">{town}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Properties by Province Section */}
        <div className="space-y-8">
          {propertiesByProvince.map((prov) => (
            <div key={prov.province}>
              <h2 className="text-2xl font-bold text-primary-900 mb-3">{prov.province}</h2>
              <div className="flex flex-wrap gap-2">
                {prov.towns.map((town) => (
                  <span key={town.name} className="inline-flex items-center bg-neutral-100 rounded px-3 py-1 text-primary-900 font-medium text-sm">
                    {town.name}
                    <span className="ml-2 bg-yellow-400 text-primary-900 rounded-full px-2 py-0.5 text-xs font-bold">{town.count}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Right: Sidebar (Promos) */}
      <PromoSidebar />
      <style jsx global>{`
        .font-script {
          font-family: 'Dancing Script', cursive;
        }
      `}</style>
    </div>
  );
} 