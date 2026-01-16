"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PromoSidebar from "@/components/PromoSidebar";
import { useTranslations } from "next-intl";
import { useRegionData } from '@/hooks/useRegionData';
import { usePropertyCache } from '@/context/PropertyCacheContext';
import { useLocale } from 'next-intl'; 

export default function AdvancedSearchPage() {
  const t = useTranslations('advance_search');
  const tFilters = useTranslations('home.filters');
  const tCommon = useTranslations('common');
  const [filters, setFilters] = React.useState({
    regionId: "",
    propertyType: "",
    minBeds: "",
    minBaths: "",
    minPrice: "",
    priceTo: "",
  });

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://inlandandalucia.onrender.com/api/v1";

  const locale = useLocale();
  const router = useRouter();
  const refInput = useRef<HTMLInputElement>(null);
  const { regionCounts, fetchRegionCounts } = useRegionData();
  const { propertyTypesMap, setPropertyTypesMap } = usePropertyCache();

  // Map locale to language ID
  const localeToLanguageId: Record<string, number> = {
    'en': 1,
    'es': 2,
    'fr': 3,
    'pt': 8,
    'de': 4,
  };
  const languageId = localeToLanguageId[locale] || 1;

  // Store property types with actual codes from API
  const [propertyTypesList, setPropertyTypesList] = React.useState<Array<{ id: number; name: string; code: string }>>([]);

  // Convert region counts to format needed for select
  const regionCountsFormatted = React.useMemo(() => {
    return regionCounts.map((r) => ({
      regionId: r.regionId,
      region: r.regionName,
      count: r.count,
    }));
  }, [regionCounts]);

  // Load property types first, then region counts (sequenced)
  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      // Load property types with actual codes from API
      try {
        const res = await fetch(
          `${API_BASE_URL}/properties/types?languageId=${languageId}`
        );
        if (!res.ok) throw new Error(`Failed: ${res.status}`);
        const data = await res.json();
        if (data?.success && data.data && mounted) {
          const typesMap: Record<number, string> = {};
          const typesList: Array<{ id: number; name: string; code: string }> = [];
          data.data.forEach((type: any) => {
            typesMap[type.id] = type.name;
            // Use actual Property_Code from database (AP, BA, CH, etc.)
            const actualCode = type.code || String(type.id);
            typesList.push({
              id: type.id,
              name: type.name,
              code: actualCode
            });
          });
          setPropertyTypesMap(typesMap);
          setPropertyTypesList(typesList);
        }
      } catch (err) {
        console.error("Error loading property types:", err);
      }

      // Then load region counts (can use cache)
      if (mounted) {
        try {
          await fetchRegionCounts();
        } catch (err) {
          console.error("Error loading region counts:", err);
        }
      }
    };

    loadData();
    
    return () => {
      mounted = false;
    };
  }, [API_BASE_URL, languageId, setPropertyTypesMap, fetchRegionCounts]);

  // handle form submit -> build query string
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(
      Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== "")
      )
    );
    router.push(`/properties?${params.toString()}`);
  };
  // Inside your AdvancedSearchPage component

  const handleReferenceSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const ref = refInput.current?.value.trim();
    if (!ref) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/properties?ref=${encodeURIComponent(ref)}`
      );
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      const data = await res.json();

      if (data?.success && data.data) {
        const property = data.data; // assuming data.data is the property object
        router.push(`/properties/${property.Property_ID}`);
      } else {
        alert(tCommon('propertyNotFoundCheckRefPlease'));
      }
    } catch (err) {
      console.error("Error searching property by reference:", err);
      alert(tCommon('errorFetchingProperty'));
    }
  };


  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 lg:gap-8 gap-4">
      {/* Left: Advanced Search Form */}
      <section className="md:col-span-3 lg:col-span-4 bg-white rounded-xl md:p-8 sm:p-6 p-4 border border-black/10 ">
        <h1 className="font-heading lg:text-3xl sm:text-2xl text-xl font-bold text-primary-600 lg:mb-6 sm:mb-4 mb-3">
          {t('title')}
        </h1>
        <p className="mb-8 text-neutral-600 text-sm sm:text-base lg:text-lg">
          {t('text')}{" "}
          <Link
            href="/contact"
            className="text-primary-600 underline"
          >
            contact us
          </Link>
          , as we probably have it.
        </p>

        <div className="bg-primary-600 rounded-lg mb-6">
          <h2 className="md:text-lg text-base font-medium text-white px-4 md:px-6 md:py-3 py-2">
           {t('search_advance')}
          </h2>
        </div>

        <form
          className="bg-neutral-50 rounded-lg md:p-6 sm:p-5 p-4 mb-8"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-6 sm:gap-5 gap-4">
            {/* Area */}
            <div>
              <label className="block font-medium text-neutral-800 mb-1">
                {tFilters('area')}:
              </label>
              <select
                value={filters.regionId}
                onChange={(e) =>
                  setFilters({ ...filters, regionId: e.target.value })
                }
                className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">{tFilters('all')}</option>
                {regionCountsFormatted.map((r) => (
                  <option key={r.regionId} value={r.regionId}>
                    {r.region} ({r.count})
                  </option>
                ))}
              </select>
            </div>

            {/* PropertyType */}
            <div>
              <label className="block font-medium text-neutral-800 mb-1">
                {tFilters('propertyTypeLabel')}:
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) =>
                  setFilters({ ...filters, propertyType: e.target.value })
                }
                className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">{tFilters('all')}</option>
                {propertyTypesList.map((type) => (
                  <option key={type.id} value={type.code}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Beds */}
            <div>
              <label className="block font-medium text-neutral-800 mb-1">
                {tFilters('min_bed')}:
              </label>
              <select
                value={filters.minBeds}
                onChange={(e) =>
                  setFilters({ ...filters, minBeds: e.target.value })
                }
                className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">{tFilters('any')}</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5+</option>
              </select>
            </div>

            {/* Min Baths */}
            <div>
              <label className="block font-medium text-neutral-800 mb-1">
                {tFilters('min_bathrooms')}:
              </label>
              <select
                value={filters.minBaths}
                onChange={(e) =>
                  setFilters({ ...filters, minBaths: e.target.value })
                }
                className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">{tFilters('any')}</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5+</option>
              </select>
            </div>

            {/* Price From */}
            <div>
              <label className="block font-medium text-neutral-800 mb-1">
                {tFilters('min_price')}:
              </label>
              <select
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters({ ...filters, minPrice: e.target.value })
                }
                className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">{tFilters('any')}</option>
                <option value="50000">€50,000</option>
                <option value="100000">€100,000</option>
                <option value="150000">€150,000</option>
                <option value="200000">€200,000</option>
                <option value="300000">€300,000</option>
                <option value="500000">€500,000</option>
                <option value="1000000">€1,000,000</option>
              </select>
            </div>

            {/* Price To */}
            <div>
              <label className="block font-medium text-neutral-800 mb-1">
                {tFilters('max_price')}:
              </label>
              <select
                value={filters.priceTo}
                onChange={(e) =>
                  setFilters({ ...filters, priceTo: e.target.value })
                }
                className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">{tFilters('any')}</option>
                <option value="100000">€100,000</option>
                <option value="150000">€150,000</option>
                <option value="200000">€200,000</option>
                <option value="300000">€300,000</option>
                <option value="500000">€500,000</option>
                <option value="1000000">€1,000,000</option>
                <option value="2000000">€2,000,000+</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="bg-primary-600 text-white font-semibold md:px-8 px-6 md:py-3 py-2 rounded-md shadow hover:bg-primary-700 transition"
            >
              {tCommon('search')}
            </button>
          </div>
        </form>

        {/* Search by reference */}
        <div className="bg-primary-600 rounded-lg mb-4">
          <h2 className="md:text-lg text-base font-medium text-white px-4 md:px-6 md:py-3 py-2">
             {t('search_ref')}
          </h2>
        </div>
        <form
          className="bg-neutral-50 rounded-lg p-6 flex flex-col lg:flex-row gap-4 items-start lg:items-center"
          onSubmit={handleReferenceSearch}
        >
          <label className="font-medium text-neutral-800">{tCommon('propertyReference')}</label>
          <div className="flex-1 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 w-full">
            <input
              ref={refInput}
              type="text"
              className="flex-1 rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500 px-4 py-2 w-full"
              placeholder={tCommon('enterReference')}
            />
            <button
              type="submit"
              className="bg-primary-600 text-white font-semibold px-8 py-2 rounded-md shadow hover:bg-primary-700 transition"
            >
              {tCommon('search')}
            </button>
          </div>
        </form>

      </section>

      {/* Right: Sidebar */}
      <div className="md:col-span-2 lg:col-span-2">
        <PromoSidebar />
      </div>
    </div>
  );
}
