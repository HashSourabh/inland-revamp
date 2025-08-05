"use client";

import Link from "next/link";
import { HomeIcon, StarIcon } from "@heroicons/react/24/outline";
import PromoSidebar from "@/components/PromoSidebar";

// Province weather.com URLs (example, real URLs should be used)
const provinceWeatherLinks = {
  malaga: "https://weather.com/weather/today/l/Malaga+Spain",
  almeria: "https://weather.com/weather/today/l/Almeria+Spain",
  cordoba: "https://weather.com/weather/today/l/Cordoba+Spain",
  sevilla: "https://weather.com/weather/today/l/Seville+Spain",
  granada: "https://weather.com/weather/today/l/Granada+Spain",
  huelva: "https://weather.com/weather/today/l/Huelva+Spain",
  cadiz: "https://weather.com/weather/today/l/Cadiz+Spain",
  jaen: "https://weather.com/weather/today/l/Jaen+Spain",
};

const quickTowns = [
  { province: "Malaga", 
    towns: [
      {
        "name": "Alameda",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Alcaucin",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Campillos",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Coin",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Mijas",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Arroyo de la Miel",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Antequera",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Archidona",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Villanueva del Rosario",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Villanueva de Tapia",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Alfarnatejo",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Algarrobo",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Alhaurin de la Torre",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Alhaurin el Grande",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Almachar",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Almogia",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Alora",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Ardales",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Benamargosa",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Benaojan",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Bobadilla",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Canillas de Aceituno",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Canillas de Albaida",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Carratraca",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Cartama",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Casabermeja",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Casarabonela",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Colmenar",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Comares",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Competa",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Cuevas Bajas",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Cuevas de San Marcos",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Cutar",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "El Borge",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "El Burgo",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Frigiliana",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Fuente de Piedra",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Guaro",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Humilladero",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Istan",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Iznate",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Mollina",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Monda",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Montejaque",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Montes de Malaga",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Periana",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Pizarra",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Riogordo",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Ronda",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Salares",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Salinas",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Sedella",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Sierra de Yeguas",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Tolox",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Torre Del Mar",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Torrox",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Valle de Abdalajis",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Velez Malaga",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Villanueva de Algaidas",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Villanueva de la Concepcion",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Villanueva Del Trabuco",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Vinuela",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      }
    ]
  },
  { province: "Cordoba", 
    towns: [
      {
        "name": "Almedinilla",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Baena",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Benameji",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Cabra",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Carcabuey",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Cordoba (city)",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Encinas Reales",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Espejo",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Fuente Carreteros",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Fuente Obejuna",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Fuente-Tojar",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Iznajar",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Jauja",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "La Carlota",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "La Guijarrosa",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "La Rambla",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Los Juncares",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Lucena",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Luque",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Almodovar Del Rio",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Castro Del Rio",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Montilla",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Montoro",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Monturque",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Priego de Cordoba",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Puente Genil",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Rute",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Santaella",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Valenzuela",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Zuheros",
        "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      }
    ]
     
  },
  { 
    province: "Granada",
    towns: [
      { "name": "Agron", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Algarinejo", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Alhama de Granada", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Atarfe", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Benalua de las Villas", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Campotejar", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Huetor Tajar", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Illora", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Las Casillas de Gumiel", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Loja", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Moclin", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Montefrio", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Montillana", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Moraleda de Zafayona", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Nevada National Parc", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Otura", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Puerto Lope", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Tozar", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Ventorros de San Jose", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Villanueva de las Torres", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Zagra", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" }
    ]
  },
  { 
    province: "Jaen",
    towns: [
      { "name": "Alcala la Real", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Alcaudete", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Baeza", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Bobadilla de Alcaudete", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Cambil", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Carchelejo", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Castillo de Locubin", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Charilla", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Ermita Nueva", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Frailes", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Fuensanta de Martos", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Fuente Alamo", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Huelma", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Jaen (city)", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "La Carrasca", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "La Pedriza", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "La Rabita", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Las Casillas", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Martos", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Mengibar", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Monte Lope Alvarez", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Mures", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Noguerones", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Pegalajar", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Porcuna", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Sabariego", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "San Jose de La Rabita", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Santiago de Calatrava", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Torredonjimeno", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Valdepenas de Jaen", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Villardompardo", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" }
    ]

  },
  {
    province: "Sevilla",
    towns: [
        { "name": "Aguadulce", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Arahal", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Badolatosa", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Casariche", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Ecija", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "El Rubio", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "El Saucejo", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Estepa", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Gilena", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Herrera", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Isla Redonda", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "La Puebla de Cazalla", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "La Roda de Andalucia", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Lora de Estepa", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Lora Del Rio", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Marchena", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Marinaleda", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Moron de la Frontera", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Pedrera", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Pruna", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Utrer", "Weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" }
      ]

    
  },
  { 
    province: "Huelva",
    towns: [
      { "name": "Ayamonte", "Weather": "https://weather.com/weather/today/l/SPXX0033:1:SP" },
      { "name": "Aracena", "Weather": "https://weather.com/weather/today/l/SPXX0072:1:SP" }
    ]
  },
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
    <div className="mx-auto max-w-7xl px-5  my-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Weather Content */}
      <section className="md:col-span-2 bg-white rounded-xl p-8 border border-black/10">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-primary-600 mb-6">The Weather in Andalucía</h1>
          <p className="mb-4 text-neutral-600 text-base">
            Check the Weather Forecast in any region of Andalucia by clicking a province below
          </p>
        </div>
        {/* Province Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
          {Object.entries(provinceWeatherLinks).map(([key, url]) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center aspect-square rounded bg-secondary-500 hover:bg-secondary-500 transition text-white text-lg font-medium shadow hover:shadow-md text-center py-2.5"
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </a>
          ))}
        </div>
        <p className="mb-4 text-neutral-600 text-base">Or check it on different towns of each region in Andalucia</p>
        {/* Quick Towns Section */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-10">
          {quickTowns.filter((prov) => prov.towns.length > 0).map((prov) => (
            <div key={prov.province}>
              <h3 className="font-medium text-primary-900 mb-2 capitalize text-xl pb-3 border-b border-primary-600/10 mb-4">{prov.province}</h3>
              <ul className="flex gap-3 flex-wrap">
                {prov.towns.map((town) => (
                  <li key={town.name} className="">
                    <Link href={`${town.weather}`} className="inline-block bg-slate-100 hover:bg-primary-100 font-medium rounded px-5 text-sm py-2.5 text-primary-900 border border-primary-600/10 hover:shadow-md cursor-pointer">
                      {town.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Right: Sidebar (Promos) */}
      <div>
        
        <PromoSidebar />
      </div>
      <style jsx global>{`
        .font-script {
          font-family: 'Dancing Script', cursive;
        }
      `}</style>
    </div>
  );
} 