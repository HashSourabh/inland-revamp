"use client";

import Image from "next/image";
import { HomeIcon, StarIcon } from "@heroicons/react/24/outline";
import PromoSidebar from "@/components/PromoSidebar";

export default function AboutLocationPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Location Content */}
      <section className="md:col-span-2 bg-white rounded-xl shadow-lg p-8 border border-neutral-200">
        <h1 className="font-script text-4xl md:text-5xl font-bold text-neutral-900 mb-4">The location of Andalucia</h1>
        <p className="mb-4 text-neutral-800 text-lg">
          The autonomous region of Andalucia lies in the the south of Spain, and its coasts are bathed by both the Mediterranean and Atlantic oceans.
        </p>
        <p className="mb-4 text-neutral-800 text-lg">
          It borders Extremadura and Castile-La Mancha in the north, Murcia and the Mediterranean Sea in the east, the Mediterranean and Atlantic ocean in the south, and Portugal in the west. The region's scenery stands out because of its sheer diversity. Some areas are covered in mountains while others are full of plains. There are three distinct geographical structures: the sierra Morena to the north, the Guadalquivir river and Betica depression in the central part of the region, and the Betica mountain ranges in the south.
        </p>
        <p className="mb-4 text-neutral-800 text-lg">
          The two most notable mountainous areas are the sub-Betica range, containing La Sagra massif that reaches an altitude of 2,383 metres and the Penibetica mountain range. The Sierra Nevada is also outstanding and is home to el Mulhacen, the highest mountain peak on the Iberian Peninsula reaching a height of 3,481 metres. Next comes Veleta peak at 3,392 metres. Andalucian rivers that lead into the Mediterranean sea are relatively short and contain small amounts of water. Amongst these are the Almanzora, the Almeria, the Adra, the Guadalfeo, the Guadalhorce and the Guadiaro. The rivers that flow into the Atlantic are bigger and have more copious waters. The region's most important river is the Guadalquivir and its tributaries: the Guadalimar, the Guadiana Menor and the Genil. The Guadiana, the Odiel and the Tinto rivers also flow into the Atlantic.
        </p>
        <div className="mt-8 flex justify-center">
          <Image
            src="/images/map-preview.jpg"
            alt="Map of Andalucia"
            width={500}
            height={350}
            className="rounded-lg border border-neutral-200 shadow"
          />
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