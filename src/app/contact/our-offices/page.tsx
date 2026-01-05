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
import { useTranslations } from 'next-intl'; // or your i18n hook
import { StaticImageData } from 'next/image';

// Image mapping object with proper typing
const imageMap: Record<string, StaticImageData> = {
  Mollina,
  Mollina2,
  Mollina3,
  Alcala,
  Alcala2,
  Alcala3,
  Martos,
  Martos2,
  Martos3,
};

export default function OurOfficesPage() {
  const t = useTranslations('contact-us.our-offices');

  // Build offices array from translation keys
  const offices = ['mollina', 'alcala', 'martos'].map((key) => ({
    key,
    name: t(`offices.${key}.name`),
    address: [t(`offices.${key}.address.0`)],
    phone: t(`offices.${key}.phone`),
    mobile: t.has(`offices.${key}.mobile`) ? t(`offices.${key}.mobile`) : null,
    email: t(`offices.${key}.email`),
    images: [
      t(`offices.${key}.images.0`),
      t(`offices.${key}.images.1`),
      t(`offices.${key}.images.2`),
    ],
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 lg:gap-8 gap-4">
      {/* Left: Offices Content */}
      <section className="md:col-span-3 lg:col-span-4 bg-white rounded-xl md:p-8 sm:p-6 xs:p-5 p-4 border border-black/10">
        <h1 className="font-heading lg:text-3xl sm:text-2xl text-xl font-bold text-primary-600 lg:mb-6 sm:mb-4 mb-3">
          {t('header.title')}
        </h1>
        <p className="sm:mb-10 mb-6 text-neutral-600 text-sm sm:text-base lg:text-lg">
          {t('intro')}{' '}
          <Link href={t('contactLink')} className="text-primary-600">
            {t('intro').includes('Click here') && 'Click here to go to our contact form'}
          </Link>
        </p>
        <div className="space-y-8">
          {offices.map((office) => (
            <div
              key={office.key}
              className="gap-6 items-start bg-neutral-50 rounded-lg lg:p-6 md:p-5 xs:p-4 p-3"
            >
              <div className="grid grid-cols-5 sm:gap-4 gap-2">
                {/* Main office image */}
                <div className="flex sm:gap-4 gap-2 lg:col-span-1 xs:col-span-2 col-span-5">
                  <Image
                    src={imageMap[office.images[0]]}
                    alt={office.name}
                    width={160}
                    height={100}
                    className="rounded-lg object-cover border border-neutral-200 w-full h-full"
                  />
                </div>
                {/* Office details */}
                <div className="lg:col-span-2 2xs:col-span-3 col-span-5">
                  <h2 className="lg:text-2xl md:text-xl text-lg font-semibold text-primary-900 sm:mb-2 mb-1">
                    {office.name}
                  </h2>
                  <p className="text-neutral-600 text-sm mb-1">{office.address[0]}</p>
                  <p className="text-neutral-600 text-sm sm:mb-1 mb-0.5">Tel: {office.phone}</p>
                  {office.mobile && (
                    <p className="text-neutral-800 text-sm sm:mb-1 mb-0.5">
                      Mob Tel: {office.mobile}
                    </p>
                  )}
                  <a
                    href={`mailto:${office.email}`}
                    className="text-primary-700 font-medium hover:underline lg:text-base text-sm"
                  >
                    {office.email}
                  </a>
                </div>
                {/* Gallery images */}
                <div className="grid grid-cols-2 sm:gap-4 gap-2 lg:col-span-2 col-span-5">
                  {office.images.slice(1).map((imgKey, i) => (
                    <div key={i}>
                      <Image
                        src={imageMap[imgKey]}
                        alt={`${office.name} photo ${i + 2}`}
                        width={160}
                        height={100}
                        className="rounded-lg object-cover border border-neutral-200 w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Right: Sidebar (Promos) */}
      <div className="md:col-span-2 lg:col-span-2">
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