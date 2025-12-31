'use client'

import Image from 'next/image'
import Link from 'next/link'
// Performance: Use cached region data hook instead of direct API calls
import { useRegionData, type RegionCount } from '@/hooks/useRegionData'
import { TownGuideNav } from '@/components/buyers-guide/TownGuideNav'
import { useState, useEffect, useMemo, useCallback } from "react";
import Cordoba from '@/assets/images/cordoba/vistas-cordoba.jpg'
import Cordoba1 from '@/assets/images/cordoba/about.jpg'
import Cordoba2 from '@/assets/images/cordoba/culture-heritage.jpg'
import Cordoba3 from '@/assets/images/cordoba/geography.jpg'
import Cordoba4 from '@/assets/images/cordoba/salmorejo.jpg'
import Cordoba5 from '@/assets/images/cordoba/lunes-Santo-fixed.jpg'
import PageOverlayLoader from '@/components/loader/PageOverlayLoader';
import { useTranslations } from 'next-intl';


export default function CordobaPage() {
  const t=useTranslations('town-guide');
  const tCommon = useTranslations('common');
  // Performance: Use cached region data instead of fetching on every render
  const { regionCounts, areasCache, fetchRegionCounts, fetchAreas } = useRegionData();
  const [regionId, setRegionId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Performance: Memoize region name extraction
  const regionName = useMemo(() => {
    if (typeof window === 'undefined') return 'cordoba';
    const params = window.location.pathname
    return params.split('/').filter(Boolean).pop() || 'cordoba'
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
          (region: RegionCount) => 
            region.regionName.toLowerCase() === regionName.toLowerCase()
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
      <div className="max-w-none">
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden bg-black">
          <Image
            src={Cordoba}
            alt={`${displayRegionName} Mezquita`}
            fill
            className="object-cover mt-0 opacity-45"
            priority
          />
          <div className="absolute top-0 left-0 w-full h-full flex items-center">
            <div className="mx-auto max-w-5xl px-5 text-center">
              <h1 className="font-heading text-5xl font-bold text-white mb-2">
                 {t('cordoba.title')}
              </h1>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <div className="col-span-3">
            <p className="text-base mb-8 text-neutral-700">
                {t('description')}
            </p>

            {/* Areas Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <PageOverlayLoader /> {/* or a smaller loader if you want */}
              </div>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : areas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {areas.map((area) => (
                  <Link
                    key={area.areaId}
                    href={`/properties?regionId=${regionId}&areaId=${area.areaId}`}
                    className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-primary-900 font-medium">{area.areaName}</span>
                      <span className="text-secondary-600">
                        {area.count} {area.count === 1 ? tCommon('property') : tCommon('properties')}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">{tCommon('noAreasFound')}</p>
            )}



            {/* Content Sections */}
            <div className="space-y-6">
              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h2 className="text-3xl font-semibold text-primary-900 mb-4">
                       {t('cordoba.section1.heading')}
                    </h2>
                    <p className="text-base text-neutral-700">
                      {t('cordoba.section1.text')}
                    </p>
                  </div>
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image 
                      src={Cordoba1} 
                      alt={`${displayRegionName} Jewish Quarter`} 
                      fill 
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </section>

              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image 
                      src={Cordoba2} 
                      alt={`${displayRegionName} Alcazar`} 
                      fill 
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div>
                    <h2 className="text-3xl font-semibold text-primary-900 mb-4">  {t('cordoba.section2.heading')}</h2>
                    <p className="text-base text-neutral-700">
                        {t('cordoba.section2.text')}
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h2 className="text-3xl font-semibold text-primary-900 mb-4">{t('cordoba.section3.heading')}</h2>
                    <p className="text-base text-neutral-700">
                      {t('cordoba.section3.text')}
                    </p>
                  </div>
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image 
                      src={Cordoba3} 
                      alt={`${displayRegionName} Countryside`} 
                      fill 
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </section>

              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image 
                      src={Cordoba4} 
                      alt={`${displayRegionName} Cuisine`} 
                      fill 
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div>
                    <h2 className="text-3xl font-semibold text-primary-900 mb-4">{t('cordoba.section4.heading')}</h2>
                    <p className="text-base text-neutral-700">
                      {t('cordoba.section4.text')}
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-primary-900 mb-4">{t('cordoba.section5.heading')}</h2>
                    <p className="text-base text-neutral-700">
                      {t('cordoba.section5.text')}
                    </p>
                  </div>
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image 
                      src={Cordoba5} 
                      alt={`${displayRegionName} Festivals`} 
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

          <div>
            <TownGuideNav />
          </div>
        </div>
      </div>
    </div>
  )
}