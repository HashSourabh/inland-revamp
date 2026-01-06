'use client';

import Image from 'next/image';
import Link from 'next/link';
import { TownGuideNav } from '@/components/buyers-guide/TownGuideNav';
// Performance: Use cached region data hook instead of direct API calls
import { useRegionData, type RegionCount } from '@/hooks/useRegionData';
import Jaen from '@/assets/images/jaen/catedral-jaen.jpg';
import Jaen1 from '@/assets/images/jaen/about.jpg';
import Jaen2 from '@/assets/images/jaen/olive-oil.jpg';
import Jaen3 from '@/assets/images/jaen/jaen3.png';
import Jaen4 from '@/assets/images/jaen/natural-park.jpg';
import Jaen5 from '@/assets/images/jaen/ubeda-plaza-vazquez.jpg';
import { useEffect, useState, useMemo, useCallback } from 'react';
import PageOverlayLoader from '@/components/loader/PageOverlayLoader';
import { useTranslations } from 'next-intl';


export default function JaenPage() {
  const t=useTranslations('town-guide');
  const tCommon = useTranslations('common');
  // Performance: Use cached region data instead of fetching on every render
  const { regionCounts, areasCache, fetchRegionCounts, fetchAreas } = useRegionData();
  const [regionId, setRegionId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Performance: Memoize region name extraction
  const regionName = useMemo(() => {
    if (typeof window === 'undefined') return 'jaen';
    const params = window.location.pathname
    return params.split('/').filter(Boolean).pop() || 'jaen'
  }, [])

  // Performance: Memoize format function
  const formatRegionName = useCallback((name: string) =>
    name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '), [])

  const displayRegionName = useMemo(() => formatRegionName(regionName), [regionName, formatRegionName])

  // Performance: Get areas from cache if available
  const areas = useMemo(() => {
    if (!regionId) return [];
    return areasCache.get(regionId) || [];
  }, [regionId, areasCache])

  // ✅ Fetch regions and areas using cache
  useEffect(() => {
    async function loadRegionAndAreas() {
      try {
        setLoading(true)
        setError(null)

        // Use cached region counts
        const regions = regionCounts.length > 0 
          ? regionCounts 
          : await fetchRegionCounts();
        
        const matchingRegion = regions.find(
          (region: RegionCount) => region.regionName.toLowerCase() === regionName.toLowerCase()
        )

        if (!matchingRegion) {
          throw new Error(`Region "${regionName}" not found`)
        }

        setRegionId(matchingRegion.regionId)

        // Fetch areas (will use cache if available)
        await fetchAreas(matchingRegion.regionId)
      } catch (err) {
        console.error('Error loading region data:', err)
        setError(err instanceof Error ? err.message : tCommon('failedToLoadData'))
      } finally {
        setLoading(false)
      }
    }

    if (regionName) {
      loadRegionAndAreas()
    }
  }, [regionName, regionCounts, fetchRegionCounts, fetchAreas, tCommon])
  return (
    <div className="">
      {/* Hero Section */}
      <div className="max-w-none">
        <div className="relative w-full h-[250px] md:h-[400px] mb-8 overflow-hidden bg-black">
          <Image src={Jaen} alt={`${displayRegionName} Mezquita`} fill className="object-cover mt-0 opacity-45" priority />
          <div className="absolute top-0 left-0 w-full h-full flex items-center">
            <div className="mx-auto max-w-5xl px-5 text-center">
              <h1 className="font-heading lg:text-5xl md:text-4xl text-3xl font-bold text-white mb-2">{t('jaen.title')}</h1>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-5 grid grid-cols-6 lg:grid-cols-4 gap-6 xl:gap-10 mb-10">
          <div className="col-span-6 md:col-span-4 lg:col-span-3">
            <p className="text-base mb-8 text-neutral-700">
              {t('description')}
            </p>
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <PageOverlayLoader /> {/* or a smaller loader if you want */}
              </div>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : areas.length > 0 ? (
              <div className="grid grid-cols-1 2xs:grid-cols-2 lg:grid-cols-3 gap-3">
                {areas.map((area) => (
                  <Link
                    key={area.areaId}
                    href={`/properties?regionId=${regionId}&areaId=${area.areaId}`}
                    className="block p-3 md:p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-primary-900 font-medium text-sm sm:text-base">{area.areaName}</span>
                      <span className="text-secondary-600 text-sm sm:text-base">
                        {area.count} {area.count === 1 ? tCommon('property') : tCommon('properties')}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">{tCommon('noAreasFound')}</p>
            )}


            <div className="md:space-y-6 space-y-4 mt-6">
              <section>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h2 className="lg:text-3xl md:text-2xl text-xl font-semibold text-primary-900 mb-2 sm:mb-4">{t('jaen.section1.heading')}</h2>
                    <p className="md:text-base text-sm text-neutral-700">{t('jaen.section1.text')}</p>
                  </div>
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image
                      src={Jaen1}
                      alt={`${displayRegionName} ${tCommon('cityView')}`}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </section>
              <section>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                  <div className="relative h-[300px] rounded-lg overflow-hidden row-start-2 lg:row-start-1 lg:col-start-1">
                    <Image
                      src={Jaen2}
                      alt={`${displayRegionName} ${tCommon('cityView')}`}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div>
                    <h2 className="lg:text-3xl md:text-2xl text-xl font-semibold text-primary-900 mb-2 sm:mb-4">{t('jaen.section2.heading')}</h2>
                    <p className="md:text-base text-sm text-neutral-700">{t('jaen.section2.text')}</p>
                  </div>
                </div>
              </section>
              <section>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h2 className="lg:text-3xl md:text-2xl text-xl font-semibold text-primary-900 mb-2 sm:mb-4">{t('jaen.section3.heading')}</h2>
                    <p className="md:text-base text-sm text-neutral-700">{t('jaen.section2.text')}</p>
                  </div>
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image
                      src={Jaen5}
                      alt={`${displayRegionName} ${tCommon('cityView')}`}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </section>
              <section>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                  <div className="relative h-[300px] rounded-lg overflow-hidden row-start-2 lg:row-start-1 lg:col-start-1">
                    <Image
                      src={Jaen4}
                      alt={`${displayRegionName} ${tCommon('cityView')}`}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div>
                    <h2 className="lg:text-3xl md:text-2xl text-xl font-semibold text-primary-900 mb-2 sm:mb-4">{t('jaen.section4.heading')}</h2>
                    <p className="md:text-base text-sm text-neutral-700">{t('jaen.section4.text')}</p>
                  </div>
                </div>
              </section>
              <section>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h2 className="lg:text-3xl md:text-2xl text-xl font-semibold text-primary-900 mb-2 sm:mb-4">{t('jaen.section5.heading')}</h2>
                      <p className="md:text-base text-sm text-neutral-700">{t('jaen.section5.text')}</p>
                  </div>
                  <div className="relative h-[300px] rounded-lg overflow-hidden row-start-2 lg:row-start-1 lg:col-start-2">
                    <Image
                      src={Jaen3}
                      alt={`${displayRegionName} ${tCommon('cityView')}`}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div className="col-span-6 md:col-span-2 lg:col-span-1 md:block hidden">
            <TownGuideNav />
          </div>
        </div>
      </div>












      {/* CTA */}
      {/*<div className="text-center">
        <h2 className="text-3xl font-bold text-primary-900 mb-4">Find Your Dream Home in Jaén</h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Explore our extensive property listings and find the perfect home in this beautiful region of Andalucia.
        </p>
        <Link
          href="/properties?province=Jaen"
          className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium px-8 py-3 rounded-lg transition-colors"
        >
          Browse Properties
        </Link>
      </div>*/}
    </div>
  )
} 