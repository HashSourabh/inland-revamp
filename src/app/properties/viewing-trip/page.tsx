"use client";

import React from "react";
import { HomeIcon, StarIcon } from "@heroicons/react/24/outline";
import PromoSidebar from "@/components/PromoSidebar";
import { useTranslations } from "next-intl";

export default function ViewingTripPage() {
  const t=useTranslations('viewing_trip')
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 lg:gap-8 gap-4">
      {/* Left: Viewing Trip Content */}
      <div className="md:col-span-3 lg:col-span-4">
        <section className=" bg-white rounded-xl md:p-8 sm:p-6 p-4 border border-black/10">
          <h1 className="font-heading lg:text-3xl sm:text-2xl text-xl font-bold text-primary-600 lg:mb-6 sm:mb-4 mb-3">{t('title')}</h1>
          <h2 className="mb-8 text-neutral-600 text-sm sm:text-base lg:text-lg">
            {t('description')}
          </h2>
          <ul className="list-disc pl-6 space-y-4 text-sm sm:text-base lg:text-lg mb-8 text-neutral-600">
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
      <div className="md:col-span-2 lg:col-span-2">
        <PromoSidebar />
      </div>
    </div>
  );
} 