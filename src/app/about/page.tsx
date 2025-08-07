import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import mollina from "@/assets/images/mollina.jpg";

const quickTowns = [
  { province: "Malaga", 
    towns: [
      {
        "name": "Alameda",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Alcaucin",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Campillos",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Coin",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Mijas",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Arroyo de la Miel",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Antequera",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Archidona",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Villanueva del Rosario",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Villanueva de Tapia",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Alfarnatejo",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Algarrobo",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Alhaurin de la Torre",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Alhaurin el Grande",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Almachar",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Almogia",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Alora",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Ardales",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Benamargosa",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Benaojan",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Bobadilla",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Canillas de Aceituno",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Canillas de Albaida",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Carratraca",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Cartama",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Casabermeja",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Casarabonela",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Colmenar",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Comares",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Competa",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Cuevas Bajas",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Cuevas de San Marcos",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Cutar",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "El Borge",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "El Burgo",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Frigiliana",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Fuente de Piedra",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Guaro",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Humilladero",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Istan",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Iznate",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Mollina",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Monda",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Montejaque",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Montes de Malaga",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Periana",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Pizarra",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Riogordo",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Ronda",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Salares",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Salinas",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Sedella",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Sierra de Yeguas",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Tolox",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Torre Del Mar",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Torrox",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Valle de Abdalajis",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Velez Malaga",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Villanueva de Algaidas",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Villanueva de la Concepcion",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Villanueva Del Trabuco",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Vinuela",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      }
    ]
  },
  { province: "Cordoba", 
    towns: [
      {
        "name": "Almedinilla",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Baena",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Benameji",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Cabra",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Carcabuey",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Cordoba (city)",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Encinas Reales",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Espejo",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Fuente Carreteros",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Fuente Obejuna",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Fuente-Tojar",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Iznajar",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Jauja",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "La Carlota",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "La Guijarrosa",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "La Rambla",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Los Juncares",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Lucena",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Luque",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Almodovar Del Rio",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Castro Del Rio",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Montilla",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Montoro",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Monturque",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Priego de Cordoba",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Puente Genil",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Rute",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Santaella",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Valenzuela",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      },
      {
        "name": "Zuheros",
        "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP"
      }
    ]
     
  },
  { 
    province: "Granada",
    towns: [
      { "name": "Agron", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Algarinejo", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Alhama de Granada", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Atarfe", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Benalua de las Villas", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Campotejar", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Huetor Tajar", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Illora", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Las Casillas de Gumiel", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Loja", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Moclin", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Montefrio", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Montillana", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Moraleda de Zafayona", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Nevada National Parc", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Otura", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Puerto Lope", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Tozar", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Ventorros de San Jose", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Villanueva de las Torres", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Zagra", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" }
    ]
  },
  { 
    province: "Jaen",
    towns: [
      { "name": "Alcala la Real", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Alcaudete", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Baeza", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Bobadilla de Alcaudete", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Cambil", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Carchelejo", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Castillo de Locubin", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Charilla", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Ermita Nueva", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Frailes", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Fuensanta de Martos", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Fuente Alamo", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Huelma", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Jaen (city)", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "La Carrasca", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "La Pedriza", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "La Rabita", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Las Casillas", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Martos", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Mengibar", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Monte Lope Alvarez", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Mures", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Noguerones", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Pegalajar", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Porcuna", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Sabariego", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "San Jose de La Rabita", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Santiago de Calatrava", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Torredonjimeno", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Valdepenas de Jaen", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
      { "name": "Villardompardo", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" }
    ]

  },
  {
    province: "Sevilla",
    towns: [
        { "name": "Aguadulce", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Arahal", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Badolatosa", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Casariche", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Ecija", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "El Rubio", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "El Saucejo", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Estepa", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Gilena", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Herrera", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Isla Redonda", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "La Puebla de Cazalla", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "La Roda de Andalucia", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Lora de Estepa", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Lora Del Rio", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Marchena", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Marinaleda", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Moron de la Frontera", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Pedrera", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Pruna", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" },
        { "name": "Utrer", "weather": "https://weather.com/weather/today/l/SPXX0121:1:SP" }
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