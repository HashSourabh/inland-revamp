"use client";

import React from "react";
import { HomeIcon, StarIcon } from "@heroicons/react/24/outline";
import PromoSidebar from "@/components/PromoSidebar";
import { useTranslations } from "next-intl";

export default function ViewingTripPage() {
  const t=useTranslations('viewing_trip')
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Viewing Trip Content */}
      <div className="md:col-span-2">
        <section className=" bg-white rounded-xl  p-8 border border-black/10">
          <h1 className="font-heading text-3xl font-bold text-primary-600 mb-6">{t('title')}</h1>
          <h2 className="mb-8 text-neutral-600 text-xl">
            {t('description')}
          </h2>
          <ul className="list-disc pl-6 space-y-4 text-base mb-8 text-neutral-600">
            <li>
              {t('points.point_1')}
            </li>
            <li>
             {t('points.point_2')}
            </li>
            <li>
              {t('points.point_3')}
            </li>
            <li>
              {t('points.point_4')}
            </li>
          </ul>
        </section>
      </div>

      {/* Right: Sidebar (same as advanced search page) */}
      <PromoSidebar />
    </div>
  );
} 