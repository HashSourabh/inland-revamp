'use client'

import Image from 'next/image';
import Link from 'next/link';
import { TownGuideNav } from '@/components/buyers-guide/TownGuideNav';
import Sevilla from '@/assets/images/sevilla/vista-sevilla.jpg';
import Sevilla1 from '@/assets/images/sevilla/about.jpg';
import Sevilla2 from '@/assets/images/sevilla/historic-towns.jpg'; 
import Sevilla3 from '@/assets/images/sevilla/natural.jpg'; 
import Sevilla4 from '@/assets/images/sevilla/festivals.jpg'; 
import Sevilla5 from '@/assets/images/sevilla/garbanzos-scaled.jpg'; 
import { useEffect, useState } from 'react';
import { Area, fetchAreas, fetchRegions } from '@/utils/api';

export default function SevillaPage() {
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
      {/* Hero Section */}
      <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden bg-black">
          <Image src={Sevilla} alt={`${displayRegionName} Mezquita`} fill className="object-cover mt-0 opacity-45" priority />
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
              <p className="text-base text-neutral-700">Sevilla province is a treasure trove of history, culture, and natural beauty. While famous for its capital city with 
              iconic landmarks like the Giralda and Plaza de España, the inland areas offer a different, more authentic experience.</p>
              <p className="text-base text-neutral-700">The province features picturesque white towns, rolling olive groves, and historical sites from various civilizations 
              that have called this region home, from the Romans and Moors to Renaissance and Baroque influences.</p>
            </div>
            <div className="relative h-[300px] overflow-hidden">
              <Image
                src={Sevilla1}
                  alt={`${displayRegionName} City View`}
                
                className="rounded-lg object-cover w-full"
              />
            </div>
          </div>
        </section>
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="relative h-[300px] overflow-hidden">
              <Image
                src={Sevilla2}
                  alt={`${displayRegionName} City View`}
                
                className="rounded-lg object-cover w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-primary-900 mb-4">Historic Towns</h2>
              <p className="text-base text-neutral-700">Inland Sevilla is home to charming historic towns like Osuna, Écija, Carmona, and Marchena, each with unique architecture and 
                rich heritage. Osuna's Renaissance palaces and Écija's Baroque church towers have earned it the nickname "City of Towers."</p>
            </div>
          </div>
        </section>
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <h2 className="text-3xl font-semibold text-primary-900 mb-4">Natural Landscapes</h2>
              <p className="text-base text-neutral-700">The province boasts diverse natural landscapes, from the Sierra Norte Natural Park with its dense forests and granite formations, 
                to the fertile Guadalquivir Valley with endless fields of sunflowers, wheat, and olive groves.</p>
            </div>
            <div className="relative h-[300px] overflow-hidden">
              <Image
                src={Sevilla3}
                  alt={`${displayRegionName} City View`}
                
                className="rounded-lg object-cover w-full"
              />
            </div>
          </div>
        </section>
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="relative h-[300px] overflow-hidden">
              <Image
                src={Sevilla5}
                  alt={`${displayRegionName} City View`}
                
                className="rounded-lg object-cover w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-primary-900 mb-4">Culinary Traditions</h2>
              <p className="text-base text-neutral-700">Sevillian cuisine is a delight for food lovers, featuring specialties like gazpacho, spinach with chickpeas, and Iberian ham. 
                The inland areas are particularly renowned for olive oils, artisanal cheeses, and traditional sweets.</p>
            </div>
          </div>
        </section>
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <h2 className="text-3xl font-semibold text-primary-900 mb-4">Festivals & Traditions</h2>
              <p className="text-base text-neutral-700">Inland Sevilla comes alive during its traditional festivals. Each town has its own unique celebration, from the elaborate 
                Holy Week processions to vibrant summer ferias, flamenco performances, and agricultural harvesting festivals.</p>
            </div>
            <div className="relative h-[300px] overflow-hidden">
              <Image
                src={Sevilla4}
                  alt={`${displayRegionName} City View`}
                
                className="rounded-lg object-cover w-full"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
    <div>
      <TownGuideNav/>
    </div>
    </div>
    </div>
  )
} 