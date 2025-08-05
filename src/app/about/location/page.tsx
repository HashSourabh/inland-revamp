"use client";

import Image from "next/image";
import { HomeIcon, StarIcon } from "@heroicons/react/24/outline";
import PromoSidebar from "@/components/PromoSidebar";
import Mapimage from "@/assets/images/AndaluciaMap.gif";

export default function AboutLocationPage() {
  return (
    <div className="mx-auto max-w-7xl px-5  my-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Location Content */}
      <section className="md:col-span-2 bg-white rounded-xl  p-8 border border-black/10">
        <h1 className=" text-3xl font-bold text-primary-600 mb-6">The location of Andalucia</h1>
        <p className="mb-4 text-neutral-600 text-base">
          The autonomous region of Andalucia lies in the the south of Spain, and its coasts are bathed by both the Mediterranean and Atlantic oceans.
        </p>
        <p className="mb-4 text-neutral-600 text-base">
          It borders Extremadura and Castile-La Mancha in the north, Murcia and the Mediterranean Sea in the east, the Mediterranean and Atlantic ocean in the south, and Portugal in the west. The region's scenery stands out because of its sheer diversity. Some areas are covered in mountains while others are full of plains. There are three distinct geographical structures: the sierra Morena to the north, the Guadalquivir river and Betica depression in the central part of the region, and the Betica mountain ranges in the south.
        </p>
        <p className="mb-4 text-neutral-600 text-base">
          The two most notable mountainous areas are the sub-Betica range, containing La Sagra massif that reaches an altitude of 2,383 metres and the Penibetica mountain range. The Sierra Nevada is also outstanding and is home to el Mulhacen, the highest mountain peak on the Iberian Peninsula reaching a height of 3,481 metres. Next comes Veleta peak at 3,392 metres. Andalucian rivers that lead into the Mediterranean sea are relatively short and contain small amounts of water. Amongst these are the Almanzora, the Almeria, the Adra, the Guadalfeo, the Guadalhorce and the Guadiaro. The rivers that flow into the Atlantic are bigger and have more copious waters. The region's most important river is the Guadalquivir and its tributaries: the Guadalimar, the Guadiana Menor and the Genil. The Guadiana, the Odiel and the Tinto rivers also flow into the Atlantic.
        </p>
        <div className="mt-8 mb-8 flex justify-center">
          <Image
            src={Mapimage}
            alt="Map of Andalucia"
            width={650}
            height={350}
            className=""
          />
        </div>
        <p className="mb-4 text-neutral-600 text-base">The vast stretch of coast that extends along Andalucia is filled with bays and inlets, some a little more craggy than others as we near the Betica mountain ranges. The most notable geographical quirks that are found along the coast include: the steep rock summit of Farallon, Polacra point, Gata cape, the gulf of Almeria, las Entinas point, Adra bay, Sacratif bay, Malaga bay and Calaburras point. Europa Point forms the Gibraltar headland. This is where the Spanish coast begins stretching from the straits of Gibraltar up to the cape of Trafalgar. Within the straits the most notable parts of the landscape are formed by Algeciras bay as well as by Marroqui (Moroccan) and Tarifa points.</p>
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