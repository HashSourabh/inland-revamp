import React from 'react';
import { MapPinIcon, GlobeAltIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

export default function LocationPage() {
  const regions = [
    {
      name: 'Málaga Province',
      description: 'Home to the Costa del Sol and beautiful inland villages',
      highlights: ['Antequera', 'Ronda', 'Ardales', 'Álora']
    },
    {
      name: 'Granada Province',
      description: 'Famous for the Alhambra and Sierra Nevada mountains',
      highlights: ['Granada City', 'Sierra Nevada', 'Las Alpujarras', 'Montefrío']
    },
    {
      name: 'Córdoba Province',
      description: 'Rich in history with its famous Mezquita',
      highlights: ['Córdoba City', 'Priego de Córdoba', 'Lucena', 'Iznájar']
    },
    {
      name: 'Sevilla Province',
      description: 'The heart of Andalucia with its capital city',
      highlights: ['Sevilla City', 'Écija', 'Osuna', 'Carmona']
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="font-heading text-4xl font-bold text-neutral-900 md:text-5xl">
          Discover Inland Andalucia
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-700">
          Explore the diverse regions and beautiful landscapes of Southern Spain
        </p>
      </div>

      {/* Overview Section */}
      <div className="mb-16 rounded-2xl bg-white p-8 shadow-lg">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold text-neutral-900">
              About the Region
            </h2>
            <p className="mt-4 text-neutral-700">
              Andalucia is Spain's second largest autonomous community, located in the southern 
              part of the Iberian Peninsula. It's known for its diverse landscape, from the 
              Sierra Nevada mountains to the coastal regions, and its rich cultural heritage 
              influenced by various civilizations throughout history.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <MapPinIcon className="h-6 w-6 text-primary-600" />
                <div>
                  <h3 className="font-medium text-neutral-900">Location</h3>
                  <p className="text-sm text-neutral-600">Southern Spain</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <GlobeAltIcon className="h-6 w-6 text-primary-600" />
                <div>
                  <h3 className="font-medium text-neutral-900">Area</h3>
                  <p className="text-sm text-neutral-600">87,268 km²</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <BuildingOfficeIcon className="h-6 w-6 text-primary-600" />
                <div>
                  <h3 className="font-medium text-neutral-900">Capital</h3>
                  <p className="text-sm text-neutral-600">Sevilla</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <img
              src="/images/andalucia-map.jpg"
              alt="Map of Andalucia"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Regions Grid */}
      <div>
        <h2 className="mb-8 font-heading text-2xl font-bold text-neutral-900">
          Provinces of Inland Andalucia
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {regions.map((region, index) => (
            <div key={index} className="rounded-xl bg-white p-6 shadow-lg">
              <h3 className="text-xl font-bold text-neutral-900">{region.name}</h3>
              <p className="mt-2 text-neutral-700">{region.description}</p>
              <div className="mt-4">
                <h4 className="font-medium text-neutral-900">Key Locations:</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {region.highlights.map((highlight, highlightIndex) => (
                    <span
                      key={highlightIndex}
                      className="rounded-full bg-primary-100 px-3 py-1 text-sm text-primary-700"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 