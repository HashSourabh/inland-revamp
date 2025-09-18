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

export default function MalagaPage() {
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
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden bg-black">
        <Image src={Malaga} alt={`${displayRegionName} Mezquita`} fill className="object-cover mt-0 opacity-45" priority />
        <div className="absolute top-0 left-0 w-full h-full flex items-center">
          <div className="mx-auto max-w-5xl px-5 text-center">
            <h1 className="font-heading text-5xl font-bold text-white mb-2">{displayRegionName}</h1>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="mx-auto max-w-7xl px-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
        <div className="col-span-3">
          <p className="text-base mb-8 text-neutral-700">
            Inland Andalucia is collaborating with LuvInland.com to give you the best level of Information about Andalucia and its LIFESTYLE.
            For Each town we have properties for sale, click on the town name to get all the information you need.
            Luvinland will return you to us to view the properties for sale in the town selected.
          </p>
          {/* Towns Grid */}
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

          {/* About Section */}
          <div className="space-y-6">
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h2 className="text-3xl font-semibold text-primary-900 mb-4">About {displayRegionName}</h2>
                  <p className="text-base text-neutral-700">Málaga Province is located in the southern part of Andalucia, along the Mediterranean coast. It's known for its beautiful beaches, stunning mountain ranges, and rich cultural heritage.</p>
                  <p className="text-base text-neutral-700">The province offers a perfect blend of coastal and inland living, with the Sierra de las Nieves Natural Park and the famous El Torcal de Antequera providing spectacular natural landscapes.</p>
                </div>
                <div className="relative h-[300px] overflow-hidden">
                  <Image
                    src={Malaga1}
                    alt={`${displayRegionName} City View`}

                    className="rounded-lg   object-cover"
                  />
                </div>
              </div>
            </section>
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="relative h-[300px] overflow-hidden">
                  <Image
                    src={Malaga2}
                    alt={`${displayRegionName} City View`}

                    className="rounded-lg object-cover w-full"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-primary-900 mb-4">Natural Beauty</h2>
                  <p className="text-base text-neutral-700">The province boasts diverse natural landscapes, from the dramatic limestone formations of El Torcal de Antequera to the pristine beaches of the Costa del Sol. The Sierra de las Nieves Natural Park is a UNESCO Biosphere Reserve.</p>
                </div>
              </div>
            </section>
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h2 className="text-3xl font-semibold text-primary-900 mb-4">Cultural Heritage</h2>
                  <p className="text-base text-neutral-700">Málaga's cultural heritage spans thousands of years. The city of Málaga features the impressive Alcazaba fortress and Roman Theatre. Antequera is known for its dolmens, prehistoric burial mounds that are UNESCO World Heritage sites.</p>
                </div>
                <div className="relative h-[300px] overflow-hidden">
                  <Image
                    src={Malaga3}
                    alt={`${displayRegionName} City View`}

                    className="rounded-lg object-cover w-full"
                  />
                </div>
              </div>
            </section>
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src={Malaga4}
                    alt={`${displayRegionName} City View`}
                    className="rounded-lg object-cover w-full"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-primary-900 mb-4">Local Cuisine</h2>
                  <p className="text-base text-neutral-700">Málaga's cuisine reflects its coastal and inland influences. Fresh seafood, particularly fried fish (pescaíto frito), is a local specialty. The province is also known for its sweet wines, particularly Málaga wine.</p>
                </div>
              </div>
            </section>
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h2 className="text-3xl font-semibold text-primary-900 mb-4">Festivals & Events</h2>
                  <p className="text-base text-neutral-700">The province hosts numerous festivals throughout the year. The Málaga Film Festival attracts international attention, while the Feria de Málaga in August is one of the biggest celebrations in Andalucia.</p>
                </div>
                <div className="relative h-[300px] overflow-hidden">
                  <Image
                    src={Malaga5}
                    alt={`${displayRegionName} City View`}

                    className="rounded-lg object-cover w-full "
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

  )
};