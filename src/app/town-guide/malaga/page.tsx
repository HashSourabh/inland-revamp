'use client'
import Image from 'next/image';
import Link from 'next/link';
import { TownGuideNav } from '@/components/buyers-guide/TownGuideNav';
import Malaga from '@/assets/images/malaga/malaga.jpg';
import Malaga1 from '@/assets/images/malaga/malaga1.jpg';
import Malaga2 from '@/assets/images/malaga/natural.jpg';
import Malaga3 from '@/assets/images/malaga/cultural.jpg';
import Malaga4 from '@/assets/images/malaga/local-cuisine.jpg';
import Malaga5 from '@/assets/images/malaga/festivals.jpg';
import { useEffect, useState } from 'react';
import { Area, fetchAreas, fetchRegions } from '@/utils/api';
import PageOverlayLoader from '@/components/loader/PageOverlayLoader';
import { useTranslations } from 'next-intl';

export default function MalagaPage() {
  const t=useTranslations('town-guide');
  const tCommon = useTranslations('common');
  const [regionName, setRegionName] = useState<string>('')
  const [regionId, setRegionId] = useState<number | null>(null)
  const [areas, setAreas] = useState<Area[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ✅ Extract region name from URL
  useEffect(() => {
    const params = window.location.pathname
    const name = params.split('/').filter(Boolean).pop() || ''
    setRegionName(name)
  }, [])

  // ✅ Fetch regions and areas
  useEffect(() => {
    async function loadRegionAndAreas() {
      try {
        setLoading(true)
        setError(null)

        const regions = await fetchRegions()
        const matchingRegion = regions.find(
          region => region.region.toLowerCase() === regionName.toLowerCase()
        )

        if (!matchingRegion) {
          throw new Error(`Region "${regionName}" not found`)
        }
        console.log(matchingRegion, 'region id is this ')

        // ✅ set regionId directly
        setRegionId(matchingRegion.regionId)

        const { areas: fetchedAreas } = await fetchAreas(matchingRegion.regionId)
        setAreas(fetchedAreas)
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
  }, [regionName])

  const formatRegionName = (name: string) =>
    name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

  const displayRegionName = formatRegionName(regionName)
  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-[250px] md:h-[400px] mb-8 overflow-hidden bg-black">
        <Image src={Malaga} alt={`${displayRegionName} Mezquita`} fill className="object-cover mt-0 opacity-45" priority />
        <div className="absolute top-0 left-0 w-full h-full flex items-center">
          <div className="mx-auto max-w-5xl px-5 text-center">
            <h1 className="font-heading lg:text-5xl md:text-4xl text-3xl font-bold text-white mb-2">{t('malaga.title')}</h1>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="mx-auto max-w-7xl px-5 grid grid-cols-6 lg:grid-cols-4 gap-6 xl:gap-10 mb-10">
        <div className="col-span-6 md:col-span-4 lg:col-span-3">
          <p className="text-base mb-8 text-neutral-700">
            {t('description')}
          </p>
          {/* Towns Grid */}
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


          {/* About Section */}
          <div className="md:space-y-6 space-y-4 mt-6">
            <section>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                <div>
                  <h2 className="lg:text-3xl md:text-2xl text-xl font-semibold text-primary-900 mb-2 sm:mb-4">{t('malaga.section1.heading')}</h2>
                  <p className="md:text-base text-sm text-neutral-700">{t('malaga.section1.text')}.</p>
                </div>
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src={Malaga1}
                    alt={`${displayRegionName} ${tCommon('cityView')}`}

                    className="object-cover w-full"
                  />
                </div>
              </div>
            </section>
            <section>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                <div className="relative h-[300px] rounded-lg overflow-hidden row-start-2 lg:row-start-1 lg:col-start-1">
                  <Image
                    src={Malaga2}
                    alt={`${displayRegionName} ${tCommon('cityView')}`}

                    className="object-cover w-full"
                  />
                </div>
                <div>
                  <h2 className="lg:text-3xl md:text-2xl text-xl font-semibold text-primary-900 mb-2 sm:mb-4">{t('malaga.section2.heading')}</h2>
                  <p className="md:text-base text-sm text-neutral-700">{t('malaga.section2.text')}</p>
                </div>
              </div>
            </section>
            <section>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                <div>
                  <h2 className="lg:text-3xl md:text-2xl text-xl font-semibold text-primary-900 mb-2 sm:mb-4">{t('malaga.section3.heading')}</h2>
                  <p className="md:text-base text-sm text-neutral-700">{t('malaga.section3.text')}</p>
                </div>
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src={Malaga3}
                    alt={`${displayRegionName} ${tCommon('cityView')}`}

                    className="object-cover w-full"
                  />
                </div>
              </div>
            </section>
            <section>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                <div className="relative h-[300px] rounded-lg overflow-hidden row-start-2 lg:row-start-1 lg:col-start-1">
                  <Image
                    src={Malaga4}
                    alt={`${displayRegionName} ${tCommon('cityView')}`}
                    className="object-cover w-full"
                  />
                </div>
                <div>
                  <h2 className="lg:text-3xl md:text-2xl text-xl font-semibold text-primary-900 mb-2 sm:mb-4">{t('malaga.section4.heading')}</h2>
                  <p className="md:text-base text-sm text-neutral-700">{t('malaga.section4.text')}</p>
                </div>
              </div>
            </section>
            <section>      
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                <div>
                  <h2 className="lg:text-3xl md:text-2xl text-xl font-semibold text-primary-900 mb-2 sm:mb-4">{t('malaga.section5.heading')}</h2>
                  <p className="md:text-base text-sm text-neutral-700">{t('malaga.section5.text')}</p>
                </div>
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src={Malaga5}
                    alt={`${displayRegionName} ${tCommon('cityView')}`}

                    className="object-cover w-full "
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

  )
};