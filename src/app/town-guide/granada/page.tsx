'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { fetchRegions, fetchAreas, Region, Area } from '@/utils/api'
import { getURL } from 'next/dist/shared/lib/utils';
import { TownGuideNav } from '@/components/buyers-guide/TownGuideNav';
import Granada from '@/assets/images/granada/granada.jpg';
import Granada1 from '@/assets/images/granada/about.jpg';
import Granada2 from '@/assets/images/granada/Natural.jpg';
import Granada4 from '@/assets/images/granada/culture-heritage.jpg';
import Granada5 from '@/assets/images/granada/sierra-nevada-espagne.webp';


export default function GranadaPage() {

  const [regionName, setRegionName] = useState<string>('');
  useEffect(() => {
    const params = window.location.pathname;
    const name = params.split('/').filter(Boolean).pop() || '';
    setRegionName(name);
  }, []);
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [regionId, setRegionId] = useState<number | null>(null);

  useEffect(() => {
    async function loadRegionAndAreas() {
      try {
        setLoading(true);
        setError(null);

        const regions = await fetchRegions();
        const matchingRegion = regions.find(
          region => region.region.toLowerCase() === regionName.toLowerCase()
        );

        if (!matchingRegion) {
          throw new Error(`Region "${regionName}" not found`);
        }
        setRegionId(matchingRegion.regionId);
        const { areas: fetchedAreas } = await fetchAreas(matchingRegion.regionId);
        setAreas(fetchedAreas);

      } catch (err) {
        console.error('Error loading region data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    if (regionName) {
      loadRegionAndAreas();
    }
  }, [regionName]);

  const formatRegionName = (name: string) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const displayRegionName = formatRegionName(regionName);

  return (
    <div className="">
      <div className="max-w-none">
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden bg-black">
          <Image src={Granada} alt={`${displayRegionName} Mezquita`} fill className="object-cover mt-0 opacity-45" priority />
          <div className="absolute top-0 left-0 w-full h-full flex items-center">
            <div className="mx-auto max-w-5xl px-5 text-center">
              <h1 className="font-heading text-5xl font-bold text-white mb-2"> {displayRegionName}</h1>
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
            <div className="mb-12">
              {loading && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-900"></div>
                  <p className="mt-2 text-neutral-600">Loading areas...</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-600">Error: {error}</p>
                </div>
              )}

              {!loading && !error && areas.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {areas.map((area) => (
                    <Link
                      key={area.areaId}
                      href={`/properties?location=${encodeURIComponent(area.areaName)}`}
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
              )}

              {!loading && !error && areas.length === 0 && (
                <div className="text-center py-8 text-neutral-600">
                  <p>No areas found for {displayRegionName}</p>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>

                    <h2 className="text-3xl font-semibold text-primary-900 mb-4">About {displayRegionName}</h2>
                    <p className="text-base text-neutral-700">
                      GRANADA Province is situated in the eastern part of the autonomous region of Andalucia, is bordered by the provinces of Málaga,
                      Córdoba, Jaén, Albacete, Murcia, Almería and stretches down to the Mediterranean sea. It's total area is 12,635km2 and contains
                      168 municipalities.
                    </p>
                  </div>
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image
                      src={Granada1}
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
                      src={Granada2}
                      alt="Sierra Nevada Mountains"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>

                    <h2 className="text-3xl font-semibold text-primary-900 mb-4">Natural Beauty</h2>
                    <p className="text-base text-neutral-700">
                      Granada province boasts the tallest mountain in continental Spain, Mulhacén, at 3,481 metres as well as the Sierra Nevada mountain
                      range (the most southerly ski resort in Europe). During the winter months, tourists flock to the Sierra Nevada for the skiing and
                      mountain climbing, but Granada city is popular the year round for its Moorish architecture and the famous Alhambra, with its palaces
                      and gardens. Not forgetting the cave dwellings dotted about the Sacromonte hill to the north of the city which was once the home of
                      Granada's large gypsy community.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>

                    <h2 className="text-3xl font-semibold text-primary-900 mb-4">Cultural Heritage</h2>
                    <p className="text-base text-neutral-700">
                      The hill facing the Alhambra is called the Albaicin and if you wind your way up through the narrow streets, past all the whitewashed
                      houses, you will reach the highest point with amazing views of the Alhambra and the many differing landscapes of Granada province.
                    </p>
                  </div>
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image
                      src={Granada4}
                      alt="Albaicin District"
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
                      src={Granada5}
                      alt="Outdoor Activities in Granada"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>

                    <h2 className="text-3xl font-semibold text-primary-900 mb-4">Outdoor Activities</h2>
                    <p className="text-base text-neutral-700">
                      The province offers numerous opportunities for outdoor activities. The Rio Genil is famous for its trout fishing, and the Sierra Nevada
                      provides excellent hiking and climbing opportunities. The Alpujarras region is particularly popular for walking holidays, with its
                      network of ancient paths connecting the white villages.
                    </p>
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