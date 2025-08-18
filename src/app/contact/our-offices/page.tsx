"use client";

import Image from "next/image";
import Link from "next/link";
import { HomeIcon, StarIcon } from "@heroicons/react/24/outline";
import PromoSidebar from "@/components/PromoSidebar";
import Mollina from "../../../assets/images/office/mollina.jpg";
import Mollina2 from "../../../assets/images/office/mollina1.jpg";
import Mollina3 from "../../../assets/images/office/mollina-office1.jpg";
import Alcala from "../../../assets/images/office/Alcala1.jpg";
import Alcala2 from "../../../assets/images/office/alcala-office-1.jpg";
import Alcala3 from "../../../assets/images/office/alcala-office.jpg";
import Martos from "../../../assets/images/office/Martos.png";
import Martos2 from "../../../assets/images/office/Martos_1.jpeg";
import Martos3 from "../../../assets/images/office/Martos_2.jpeg";

const offices = [
  {
    name: "Mollina Office",
    address: ["Calle Sol 8, 29532 Mollina (Málaga)"],
    phone: "+34 952 741 525",
    mobile: "+34 600 370 543",
    email: "info@inlandandalucia.com",
    image: Mollina,
    images: [
      Mollina3,
      Mollina2,
    ],
  },
  {
    name: "Alcala Office",
    address: ["Calle Abad Moya 4 bajo, 23680 Alcalá la Real (Jaén)"],
    phone: "+34 953 587 040",
    email: "info@inlandandalucia.com",
    image: Alcala,
    images: [
      Alcala2,
      Alcala3,
    ],
  },
  {
    name: "Martos Office",
    address: ["Calle Lope de Vega, 6, 23600 Martos (Jaén)"],
    phone: "+34 953 704 319",
    email: "info@inlandandalucia.com",
    image: Martos,
    images: [
      Martos2,
      Martos3,
    ],
  },
];

export default function OurOfficesPage() {
  return (
    <div className="mx-auto max-w-7xl px-5  my-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Offices Content */}
      <section className="md:col-span-2 bg-white rounded-xl  p-8 border border-black/10">
        <h1 className="text-3xl font-bold text-primary-600 dark:text-white mb-6">Our offices</h1>
        <p className="mb-8 text-neutral-600 text-base">
          Please feel free to drop by one of our offices in Alcala la Real, Mollina, Axarquia, Martos should you be in the area looking for an inland property we cover most of Inland Andalucia. However in order to best serve you, we ask that you contact us in advance so we can give you the individual attention you deserve while searching your inland property in Andalucia.{' '}
          <Link href="/contact" className="text-primary-600">Click here to go to our contact form</Link>
        </p>
        <div className="space-y-8">
          {offices.map((office, idx) => (
            <div key={office.name} className=" gap-6 items-start bg-neutral-50 rounded-lg p-4">
              {/* Office Main Image */}
              {/*<div className="md:col-span-1 flex flex-col gap-2">
                <Image
                  src={office.images[0]}
                  alt={office.name}
                  width={180}
                  height={120}
                  className="rounded-lg object-cover border border-neutral-200"
                />
              </div>*/}
              {/* Office Info and Gallery */}
              <div className=" grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className=" flex gap-4">
                    <Image
                      src={office.image}
                      alt={`${office.name}`}
                      width={160}
                      height={100}
                      className="rounded-lg object-cover border border-neutral-200"
                    />
                 
                </div>
                <div className="col-span-2">
                  <h2 className="text-lg font-semibold text-primary-900 mb-1">{office.name}</h2>
                  <p className="text-neutral-600 text-sm mb-1">{office.address[0]}</p>
                  <p className="text-neutral-600 text-sm mb-1">Tel: {office.phone}</p>
                  {office.mobile && <p className="text-neutral-800 text-sm mb-1">Mob Tel: {office.mobile}</p>}
                  <a href={`mailto:${office.email}`} className="text-primary-700 font-medium hover:underline text-sm">{office.email}</a>
                </div>
                {/* Gallery */}
                  {office.images.map((img, i) => (
                    <div className="flex">
                        <Image
                          key={img}
                          src={img}
                          alt={`${office.name} photo ${i + 2}`}
                          width={160}
                          height={100}
                          className="rounded-lg object-cover border border-neutral-200"
                        />
                    </div>
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