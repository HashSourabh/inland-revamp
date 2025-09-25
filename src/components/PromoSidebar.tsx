"use client";

import React from 'react';
import { HomeIcon, StarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function PromoSidebar() {
  const t = useTranslations('promo');

  return (
    <aside className="flex flex-col bg-white rounded-xl border border-black/10 p-3">
      {/* Exclusive Properties */}
      <div className="p-2.5 border-b border-black/10 text-center py-6">
        <h3 className="text-2xl font-semibold mb-2 text-gray-700 text-gray-600">
          {t('exclusive.title')}
        </h3>
        <p className="mb-4 text-base font-medium text-gray-500">
          {t('exclusive.short_description')}
        </p>
        <Link
          href="/properties/exclusives"
          className="inline-block bg-secondary-500 text-white font-medium px-8 py-2 rounded-md shadow hover:bg-primary-600 transition"
        >
          {t('exclusive.title')}
        </Link>
      </div>

      {/* Sell Your House */}
      <div className="p-2.5 border-b border-black/10 text-center py-6">
        <div className="w-12 min-w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto">
          <HomeIcon className="h-8 w-8 text-white" />
        </div>
        <div className="mt-2.5 mb-4">
          <h3 className="text-2xl font-semibold text-gray-700 text-gray-600">
            {t('sell_your_house.short_description')}
          </h3>
        </div>
        <Link
          href="/sell-your-property"
          className="inline-block bg-secondary-500 text-white font-medium px-8 py-2 rounded-md shadow hover:bg-primary-600 transition"
        >
          {t('sell_your_house.title')}
        </Link>
      </div>

      {/* Franchise */}
      <div className="p-2.5 border-b border-black/10 text-center py-6">
        <div className="w-12 min-w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto">
          <StarIcon className="h-8 w-8 text-white" />
        </div>
        <div className="mt-2.5 mb-4">
          <h3 className="text-2xl font-semibold text-gray-700 text-gray-600">
            {t('franchise.title')}
          </h3>
          <p className="mb-4 text-base font-medium text-gray-500 mt-2">
            {t('franchise.short_description')}
          </p>
        </div>
        <Link
          href="/franchise"
          className="inline-block bg-secondary-500 text-white font-medium px-8 py-2 rounded-md shadow hover:bg-primary-600 transition"
        >
          {t('franchise.title')}
        </Link>
      </div>

      {/* Safe Hands */}
      <div className="p-2.5 text-center py-6">
        <h3 className="text-2xl font-semibold text-gray-700 text-gray-600">
          {t('safe_hands.title')}
        </h3>
        <p className="mb-4 text-base font-medium text-gray-500 mt-2">
          {t('safe_hands.short_description')}
        </p>
        <Link
          href="/sell-your-property"
          className="inline-block bg-secondary-500 text-white font-medium px-8 py-2 rounded-md shadow hover:bg-primary-600 transition"
        >
          {t('safe_hands.title')}
        </Link>
      </div>
    </aside>
  );
}
