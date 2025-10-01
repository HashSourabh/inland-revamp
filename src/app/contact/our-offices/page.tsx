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
    <div className="mx-auto max-w-7xl px-5 my-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Offices Content */}
      <section className="md:col-span-2 bg-white rounded-xl p-8 border border-black/10">
        <h1 className="text-3xl font-bold text-primary-600 dark:text-white mb-6">
          {t('header.title')}
        </h1>
        <p className="mb-8 text-neutral-600 text-base">
          {t('intro')}{' '}
          <Link href={t('contactLink')} className="text-primary-600">
            {t('intro').includes('Click here') && 'Click here to go to our contact form'}
          </Link>
        </p>
        <div className="space-y-8">
          {offices.map((office) => (
            <div
              key={office.key}
              className="gap-6 items-start bg-neutral-50 rounded-lg p-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Main office image */}
                <div className="flex gap-4">
                  <Image
                    src={imageMap[office.images[0]]}
                    alt={office.name}
                    width={160}
                    height={100}
                    className="rounded-lg object-cover border border-neutral-200"
                  />
                </div>
                {/* Office details */}
                <div className="col-span-2">
                  <h2 className="text-lg font-semibold text-primary-900 mb-1">
                    {office.name}
                  </h2>
                  <p className="text-neutral-600 text-sm mb-1">{office.address[0]}</p>
                  <p className="text-neutral-600 text-sm mb-1">Tel: {office.phone}</p>
                  {office.mobile && (
                    <p className="text-neutral-800 text-sm mb-1">
                      Mob Tel: {office.mobile}
                    </p>
                  )}
                  <a
                    href={`mailto:${office.email}`}
                    className="text-primary-700 font-medium hover:underline text-sm"
                  >
                    {office.email}
                  </a>
                </div>
                {/* Gallery images */}
                {office.images.slice(1).map((imgKey, i) => (
                  <div className="flex" key={i}>
                    <Image
                      src={imageMap[imgKey]}
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