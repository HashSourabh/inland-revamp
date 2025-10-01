"use client";

import Link from "next/link";
import { HomeIcon, StarIcon } from "@heroicons/react/24/outline";
import PromoSidebar from "@/components/PromoSidebar";
import { useTranslations } from "next-intl";

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
  {
    province: "Malaga",
    towns: [
      {
        name: "Alameda",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Alcaucin",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Campillos",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Coin",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Mijas",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Arroyo de la Miel",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Antequera",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Archidona",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Villanueva del Rosario",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Villanueva de Tapia",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Alfarnatejo",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Algarrobo",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Alhaurin de la Torre",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Alhaurin el Grande",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Almachar",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Almogia",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Alora",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Ardales",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Benamargosa",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Benaojan",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Bobadilla",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Canillas de Aceituno",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Canillas de Albaida",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Carratraca",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Cartama",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Casabermeja",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Casarabonela",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Colmenar",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Comares",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Competa",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Cuevas Bajas",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Cuevas de San Marcos",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Cutar",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "El Borge",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "El Burgo",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Frigiliana",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Fuente de Piedra",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Guaro",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Humilladero",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Istan",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Iznate",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Mollina",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Monda",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Montejaque",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Montes de Malaga",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Periana",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Pizarra",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Riogordo",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Ronda",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Salares",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Salinas",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Sedella",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Sierra de Yeguas",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Tolox",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Torre Del Mar",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Torrox",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Valle de Abdalajis",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Velez Malaga",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Villanueva de Algaidas",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Villanueva de la Concepcion",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Villanueva Del Trabuco",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Vinuela",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      }
    ]
  },
  {
    province: "Cordoba",
    towns: [
      {
        name: "Almedinilla",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Baena",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Benameji",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Cabra",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Carcabuey",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Cordoba (city)",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Encinas Reales",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Espejo",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Fuente Carreteros",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Fuente Obejuna",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Fuente-Tojar",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Iznajar",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Jauja",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "La Carlota",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "La Guijarrosa",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "La Rambla",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Los Juncares",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Lucena",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Luque",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Almodovar Del Rio",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Castro Del Rio",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Montilla",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Montoro",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Monturque",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Priego de Cordoba",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Puente Genil",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Rute",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Santaella",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Valenzuela",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        name: "Zuheros",
        weather: "https://weather.com/weather/today/l/SPXX0121:1:SP"
      }
    ]

  },
  {
    province: "Granada",
    towns: [
      { name: "Agron", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Algarinejo", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Alhama de Granada", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Atarfe", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Benalua de las Villas", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Campotejar", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Huetor Tajar", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Illora", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Las Casillas de Gumiel", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Loja", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Moclin", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Montefrio", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Montillana", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Moraleda de Zafayona", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Nevada National Parc", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Otura", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Puerto Lope", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Tozar", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Ventorros de San Jose", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Villanueva de las Torres", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Zagra", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" }
    ]
  },
  {
    province: "Jaen",
    towns: [
      { name: "Alcala la Real", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Alcaudete", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Baeza", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Bobadilla de Alcaudete", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Cambil", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Carchelejo", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Castillo de Locubin", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Charilla", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Ermita Nueva", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Frailes", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Fuensanta de Martos", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Fuente Alamo", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Huelma", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Jaen (city)", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "La Carrasca", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "La Pedriza", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "La Rabita", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Las Casillas", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Martos", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Mengibar", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Monte Lope Alvarez", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Mures", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Noguerones", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Pegalajar", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Porcuna", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Sabariego", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "San Jose de La Rabita", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Santiago de Calatrava", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Torredonjimeno", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Valdepenas de Jaen", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Villardompardo", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" }
    ]

  },
  {
    province: "Sevilla",
    towns: [
      { name: "Aguadulce", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Arahal", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Badolatosa", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Casariche", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Ecija", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "El Rubio", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "El Saucejo", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Estepa", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Gilena", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Herrera", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Isla Redonda", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "La Puebla de Cazalla", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "La Roda de Andalucia", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Lora de Estepa", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Lora Del Rio", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Marchena", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Marinaleda", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Moron de la Frontera", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Pedrera", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Pruna", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { name: "Utrer", weather: "https://weather.com/weather/today/l/SPXX0121:1:SP" }
    ]


  },
  {
    province: "Huelva",
    towns: [
      { name: "Ayamonte", weather: "https://weather.com/weather/today/l/SPXX0033:1:SP" },
      { name: "Aracena", weather: "https://weather.com/weather/today/l/SPXX0072:1:SP" }
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
  const t = useTranslations("about-us");

  return (
    <div className="mx-auto max-w-7xl px-5  my-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Weather Content */}
      <section className="md:col-span-2 bg-white rounded-xl p-8 border border-black/10">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-primary-600 mb-6">{t("weather.title")}</h1>
          <p className="mb-4 text-neutral-600 text-base">
            {t("weather.text1")}
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
        <p className="mb-4 text-neutral-600 text-base">{t("weather.text2")}
        </p>
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