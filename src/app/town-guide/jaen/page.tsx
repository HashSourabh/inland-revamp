'use client';

import Image from 'next/image';
import Link from 'next/link';
import { TownGuideNav } from '@/components/buyers-guide/TownGuideNav';
import { fetchRegions, fetchAreas, Region, Area } from '@/utils/api';
import { getURL } from 'next/dist/shared/lib/utils';
import Jaen from '@/assets/images/jaen/catedral-jaen.jpg';
import Jaen1 from '@/assets/images/jaen/about.jpg';
import Jaen2 from '@/assets/images/jaen/olive-oil.jpg';
import Jaen3 from '@/assets/images/jaen/jaen3.png';
import Jaen4 from '@/assets/images/jaen/natural-park.jpg';
import Jaen5 from '@/assets/images/jaen/ubeda-plaza-vazquez.jpg';
import { useEffect, useState } from 'react';
import PageOverlayLoader from '@/components/loader/PageOverlayLoader';


export default function JaenPage() {
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
        setError(err instanceof Error ? err.message : 'Failed to load data')
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
    <div className="">
      {/* Hero Section */}
      <div className="max-w-none">
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden bg-black">
          <Image src={Jaen} alt={`${displayRegionName} Mezquita`} fill className="object-cover mt-0 opacity-45" priority />
          <div className="absolute top-0 left-0 w-full h-full flex items-center">
            <div className="mx-auto max-w-5xl px-5 text-center">
              <h1 className="font-heading text-5xl font-bold text-white mb-2">{displayRegionName}</h1>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <div className="col-span-3">
            <p className="text-base mb-8 text-neutral-700">
              Inland Andalucia is collaborating with LuvInland.com to give you the best level of Information about Andalucia and its LIFESTYLE.
              For Each town we have properties for sale, click on the town name to get all the information you need.
              Luvinland will return you to us to view the properties for sale in the town selected.
            </p>
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
                        {area.count} {area.count === 1 ? 'property' : 'properties'}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No areas found.</p>
            )}


            <div className="space-y-6">
              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h2 className="text-3xl font-semibold text-primary-900 mb-4">About {displayRegionName}</h2>
                    <p className="text-base text-neutral-700">Jaén province is known as the world's capital of olive oil, with endless olive groves covering its rolling hills and valleys. This beautiful inland region is home to Renaissance cities, medieval castles, and natural parks.</p>
                    <p className="text-base text-neutral-700">The province offers an authentic Spanish lifestyle away from the coastal tourist areas, with a rich cultural heritage and stunning natural landscapes such as the Sierra de Cazorla, Segura y Las Villas Natural Park.</p>
                  </div>
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image
                      src={Jaen1}
                      alt={`${displayRegionName} City View`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </section>
              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image
                      src={Jaen2}
                      alt={`${displayRegionName} City View`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-3xl font-semibold text-primary-900 mb-4">Olive Oil Heritage</h2>
                    <p className="text-base text-neutral-700">Jaén produces more olive oil than any other region in the world. The vast sea of olive trees covering the landscape is not just economically important but also shapes the culture and gastronomy of the area.</p>
                  </div>
                </div>
              </section>
              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h2 className="text-3xl font-semibold text-primary-900 mb-4">Renaissance Heritage</h2>
                    <p className="text-base text-neutral-700">The twin cities of Úbeda and Baeza are UNESCO World Heritage sites, known for their remarkable Renaissance architecture. These historic centers showcase palaces, churches, and plazas built during Spain's Golden Age.</p>
                  </div>
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image
                      src={Jaen5}
                      alt={`${displayRegionName} City View`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </section>
              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image
                      src={Jaen4}
                      alt={`${displayRegionName} City View`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-3xl font-semibold text-primary-900 mb-4">Natural Parks</h2>
                    <p className="text-base text-neutral-700">The Sierra de Cazorla, Segura y Las Villas Natural Park is Spain's largest protected area, offering breathtaking mountain scenery, dense forests, rivers, and diverse wildlife including deer and wild boar.</p>
                  </div>
                </div>
              </section>
              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h2 className="text-3xl font-semibold text-primary-900 mb-4">Gastronomy</h2>
                    <p className="text-base text-neutral-700">Jaén's cuisine is centered around olive oil, with traditional dishes like pipirrana (vegetable salad), andrajos (stew with flat noodles), and ochíos (aniseed bread) offering authentic flavors of inland Andalucia.</p>
                  </div>
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image
                      src={Jaen3}
                      alt={`${displayRegionName} City View`}
                      fill
                      className="object-cover"
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