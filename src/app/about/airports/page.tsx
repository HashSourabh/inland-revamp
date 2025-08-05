"use client";
import Image from "next/image";
import Link from "next/link";
import { HomeIcon, StarIcon } from "@heroicons/react/24/outline";
import PromoSidebar from "@/components/PromoSidebar";
import malagaairportguide from "@/assets/images/malagaairportguide.jpg";
import granadaairport from "@/assets/images/granadaairport.jpg";
import sevillaairport from "@/assets/images/sevillaairport.jpg";

const airports = [
  {
    name: "Málaga Airport Guide",
    description:
      "Information on flights, car hire, airport transfers, services and facilities at Málaga Airport.",
    url: "https://www.aena.es/en/malaga-costa-del-sol.html",
    image: malagaairportguide,
  },
  {
    name: "Granada Airport Guide",
    description:
      "Information on flights, car hire, airport transfers, services and facilities at Granada Airport.",
    url: "https://www.aena.es/en/granada.html",
    image: granadaairport,
  },
  {
    name: "Sevilla Airport Guide",
    description:
      "Information on flights, car hire, airport transfers, services and facilities at Sevilla Airport.",
    url: "https://www.aena.es/en/sevilla.html",
    image: sevillaairport,
  },
];

const airlines = [
  { name: "Iberia", url: "https://www.iberia.com/" },
  { name: "Easyjet", url: "https://www.easyjet.com/" },
  { name: "Thomsonfly", url: "https://www.tui.co.uk/flight/" },
  { name: "Flybe", url: "https://www.flybe.com/" },
  { name: "British Airways", url: "https://www.ba.com/" },
  { name: "Ryanair", url: "https://www.ryanair.com/" },
  { name: "Monarch", url: "https://www.monarch.co.uk/" },
  { name: "Clickair", url: "https://www.clickair.com/" },
];

export default function AboutAirportsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 my-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Airports Content */}
      <section className="md:col-span-2 bg-white rounded-xl  p-8 border border-black/10">
        <h1 className="text-3xl font-bold text-primary-600 mb-3">The Airports in Andalucia</h1>
        <p className="mb-10 text-neutral-600 text-base">
          Andalucia is served by several major airports, making it easy to reach from across Europe and beyond. Below you'll find guides to the main airports in the region, as well as links to popular airlines operating flights to and from Andalucia.
        </p>
        <div className="grid grid-cols-1 gap-6 mb-10">
          {airports.map((airport) => (
            <div key={airport.name} className="bg-neutral-50 rounded-lg p-6 shadow-sm border border-primary-600/10 flex">
              <div className="flex-initial">
                <div>
                  <Image
                    src={airport.image}
                    alt="Map of Andalucia"
                    width={220}
                    height={170}
                    className="rounded-lg"
                  />
                </div>
                
              </div>
              <div className="flex-autO pl-6">
                <h2 className="text-2xl font-semibold text-primary-900 mb-2">{airport.name}</h2>
                <p className="text-neutral-600 mb-2 max-w-[500px]">{airport.description}</p>
                <Link href={`airport.url`} target="_blank" rel="noopener noreferrer" className="text-white text-base  font-semibold bg-primary-600 rounded-md py-2.5 hover:bg-primary-900 px-8 mt-2 inline-flex items-center justify-center">
                  Visit Website
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-primary-900 mb-4">Airlines</h2>
          <div className="flex flex-wrap gap-4">
            {airlines.map((airline) => (
              <Link
                key={airline.name}
                href={airline.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-slate-100 hover:bg-primary-100 font-medium rounded px-5 text-sm py-2.5 text-primary-900 border border-primary-600/10 hover:shadow-md cursor-pointer"
              >
                {airline.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="text-sm text-neutral-600">
          <p>
            Track flight status and more at{' '}
            <a href="https://www.flightstats.com/" target="_blank" rel="noopener noreferrer" className="text-primary-700 underline">flightstats.com</a>.
          </p>
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