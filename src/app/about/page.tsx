import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import mollina from "@/assets/images/mollina.jpg";

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

];
export default function AboutPage() {
  return (
    <div className="">
      <div className="py-20 bg-primary-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">
            Welcome to Inland Andalucia
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/50">
            Your trusted partner for finding authentic Spanish properties in the heart of Andalucia
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        {/* About Hero */}
        <section className="py-10 md:py-10 md:pt-20">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
              <div className="h-full w-full bg-neutral-200"></div>
              {/* Placeholder for an actual image */}
               <Image
                src={mollina}
                alt="The Inland Andalucia team"
                width="600"
                height="400"
                className="object-cover h-[400px]"
              /> 
            </div>
            <div>
              <div className="space-y-4 text-neutral-700">
                <p>The leading inland property agent ever since 2001.</p>
                <p>With offices in inland Málaga (Mollina) and Jaén (Alcalá la Real) we can assist you at every step.</p>
                <p>Inland Andalucia is dedicated to finding you the best value inland property in the Andalucia region.</p>
                <p>You can select from our constantly updated property portfolio or contact us with your requirements.</p>
                <p>In the last three months 80% of our sales were for homes costing less than 100,000 Euros (circa £72.000).</p>
                <p>50% have been costing less than 150,000€ (circa £108.000) and 5% have been more expensive properties, but with great discounts.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-10">
          <div className="text-left">
            <h2 className="text-3xl font-semibold text-primary-900 mb-4">
              Personal care and attention to you
            </h2>
          </div>
          <div className="space-y-4 text-neutral-700">
            <p>Our personal attention to your needs will not falter after you have found the inland property of your dreams. We are also happy and willing to help and offer advice on every aspect of your purchase.</p>
            <p>We should be pleased to help with electricity and water account changes, opening of bank accounts, NIE application etc.</p>
            <p>You can rely on our long standing experience and superior local knowledge to be the right guide to help you buy your new property in inland Andalucia.</p>
            <p>We pride ourselves in personalised and good service, trying to give you as much help as possible. As we always want you to have the individual attention you need, please try to reserve an appointment with us before you leave your home, that way we can be ready and available for you personally at a pre-arranged time and date that suits you.</p>
          </div>

        </section>

       

        {/* CTA Section */}
        <section className="py-10 text-white">
          <p className="text-neutral-700 mb-6">Below is a list of our inland properties in Andalucia sorted by province and in alphabetical order:</p>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-10">
          {quickTowns.filter((prov) => prov.towns.length > 0).map((prov) => (
            <div key={prov.province}>
              <h3 className="font-medium text-primary-900 mb-2 capitalize text-xl pb-3 border-b border-primary-600/10 mb-4">{prov.province}</h3>
              <ul className="flex gap-3 flex-wrap">
                {prov.towns.map((town) => (
                  <li key={town.name} className="">
                    <Link href={`${town.weather}`} className="inline-block bg-primary-600/10 hover:bg-primary-100 font-medium rounded px-5 text-sm py-2.5 text-primary-900 border border-primary-600/10 hover:shadow-md cursor-pointer">
                      {town.name}
                      <span className="text-secondary-600 inline-block ml-5">10</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        </section>
      </div>
    </div>
  );
} 