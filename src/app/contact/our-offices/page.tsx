"use client";

import Image from "next/image";
import Link from "next/link";
import { HomeIcon, StarIcon } from "@heroicons/react/24/outline";
import PromoSidebar from "@/components/PromoSidebar";

const offices = [
  {
    name: "Mollina Office",
    address: ["Calle Sol 8, 29532 Mollina (Málaga)"],
    phone: "+34 952 741 525",
    mobile: "+34 600 370 543",
    email: "info@inlandandalucia.com",
    images: [
      "/images/mollina-exterior.jpg",
      "/images/mollina-interior-1.jpg",
      "/images/mollina-interior-2.jpg",
    ],
  },
  {
    name: "Alcala Office",
    address: ["Calle Abad Moya 4 bajo, 23680 Alcalá la Real (Jaén)"],
    phone: "+34 953 587 040",
    email: "info@inlandandalucia.com",
    images: [
      "/images/alcala-exterior.jpg",
      "/images/alcala-interior-1.jpg",
      "/images/alcala-interior-2.jpg",
    ],
  },
  {
    name: "Martos Office",
    address: ["Calle Lope de Vega, 6, 23600 Martos (Jaén)"],
    phone: "+34 953 704 319",
    email: "info@inlandandalucia.com",
    images: [
      "/images/martos-exterior.jpg",
      "/images/martos-interior-1.jpg",
      "/images/martos-interior-2.jpg",
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
            <div key={office.name} className=" gap-6 items-start bg-neutral-50 rounded-lg p-6">
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
              <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="">
                  <h2 className="text-lg font-semibold text-primary-900 mb-1">{office.name}</h2>
                  <p className="text-neutral-600 text-sm mb-1">{office.address[0]}</p>
                  <p className="text-neutral-600 text-sm mb-1">Tel: {office.phone}</p>
                  {office.mobile && <p className="text-neutral-800 text-sm mb-1">Mob Tel: {office.mobile}</p>}
                  <a href={`mailto:${office.email}`} className="text-primary-700 font-medium hover:underline text-sm">{office.email}</a>
                </div>
                {/* Gallery */}
                <div className=" flex gap-4">
                  {office.images.slice(1).map((img, i) => (
                    <Image
                      key={img}
                      src={img}
                      alt={`${office.name} photo ${i + 2}`}
                      width={160}
                      height={100}
                      className="rounded-lg object-cover border border-neutral-200"
                    />
                  ))}
                </div>
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