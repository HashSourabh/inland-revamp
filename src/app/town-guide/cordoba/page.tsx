'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Area, fetchAreas, fetchRegions } from "@/utils/api";
import { getURL } from "next/dist/shared/lib/utils";
import { TownGuideNav } from '@/components/buyers-guide/TownGuideNav'
import { useState, useEffect } from "react";
import Cordoba from '@/assets/images/cordoba/vistas-cordoba.jpg'
import Cordoba1 from '@/assets/images/cordoba/about.jpg'
import Cordoba2 from '@/assets/images/cordoba/culture-heritage.jpg'
import Cordoba3 from '@/assets/images/cordoba/geography.jpg'
import Cordoba4 from '@/assets/images/cordoba/salmorejo.jpg'
import Cordoba5 from '@/assets/images/cordoba/lunes-Santo-fixed.jpg'
import PageOverlayLoader from '@/components/loader/PageOverlayLoader';


export default function CordobaPage() {
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
                {displayRegionName}
              </h1>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <div className="col-span-3">
            <p className="text-base mb-8 text-neutral-700">
              Inland Andalucia is collaborating with LuvInland.com to give you the best level of Information about Andalucia and its LIFESTYLE. For Each town we have properties for sale, click on the town name to get all the information you need.
              Luvinland will return you to us to view the properties for sale in the town selected.
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
                        {area.count} {area.count === 1 ? 'property' : 'properties'}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No areas found.</p>
            )}



            {/* Content Sections */}
            <div className="space-y-6">
              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h2 className="text-3xl font-semibold text-primary-900 mb-4">
                      About {displayRegionName}
                    </h2>
                    <p className="text-base text-neutral-700">
                      The "Jewish Quarter" or old town, with its small plazas, patios full of colourful flowers and typical bars where tapas are enjoyed,
                      is full of amazing architecture. The Mezquita (or mosque) attracts thousands of visitors each year who flock to admire the magnificent
                      workmanship - it took two centuries to complete and is an amazing jungle of columns, recesses and arches with a church at its centre.
                      Outside the mosque are the beautiful gardens, "the Patio de los Naranjos" and the "Calleja de la Flores".
                    </p>
                  </div>
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image src={Cordoba1} alt={`${displayRegionName} Jewish Quarter`} fill className="object-cover" />
                  </div>
                </div>
              </section>

              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image src={Cordoba2} alt={`${displayRegionName} Alcazar`} fill className="object-cover" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-semibold text-primary-900 mb-4">Culture & Heritage</h2>
                    <p className="text-base text-neutral-700">
                      Across the river from the Mezquita is the Alcázar (or fortress) which was built by the Christians in 1328 as a defence against the Muslims.
                      It offers a lovely respite from the summer heat as you wander through the tree shaded gardens and courtyards.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h2 className="text-3xl font-semibold text-primary-900 mb-4">Geography & Agriculture</h2>
                    <p className="text-base text-neutral-700">
                      As the city is divided, so is the province: The Sierra Morena in the north with its rugged pine and oak covered hills with a few steep
                      villages set into them. The Campiña in the south which are the farmlands covered in wheat, vine and olive trees. The area is famous for
                      its dry white wines, similar to sherry, which are produced from the Pedro Ximenez grape and olive oil, which is the other main produce
                      from the region.
                    </p>
                  </div>
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image src={Cordoba3} alt={`${displayRegionName} Countryside`} fill className="object-cover" />
                  </div>
                </div>
              </section>

              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image src={Cordoba4} alt={`${displayRegionName} Cuisine`} fill className="object-cover" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-semibold text-primary-900 mb-4">Local Cuisine</h2>
                    <p className="text-base text-neutral-700">
                      This is why olive oil is an important ingredient of many typical dishes, Gazpacho and Salmorejo are cold soups made mainly of mashed
                      vegetables and olive oil and are delicious and refreshing in the heat of the summer. Jamon, which is cured ham, Salchichon, a typical
                      sausage, Caña de Lomo and Morcilla, black pudding are also widely enjoyed in the province. Some typical desserts are Alfajores, made of
                      almonds and honey and Pestiños, which is fried in oil and then covered with honey.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-primary-900 mb-4">Festivals & Events</h2>
                    <p className="text-base text-neutral-700">
                      {displayRegionName} enjoys its fiestas and festivals the same as every other town in Spain, and Semana Santa, or Easter week is one of the most
                      important. There are no fewer than 32 processions in total with beautifully decorated and ornate pictures and figures of Saints accompanied
                      by the Nazarenos (men dressed in typical gowns with hoods that cover all the face except the eyes). These processions pass through the town
                      followed by crowds of people. In May there are three festivals; from 5th to 12th there is the Festival of the "Patios Cordobeses", a contest
                      for the most beautifully decorated courtyard; the Cruces de Mayo is when the whole town is decorated with crosses and thousands of flowers;
                      the last week in May is when everyone lets their hair down at the Feria de Cordoba - flamenco music and dance are enjoyed and the whole
                      town revels in the festivities.
                    </p>
                  </div>
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image src={Cordoba5} alt={`${displayRegionName} Festivals`} fill className="object-cover" />
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