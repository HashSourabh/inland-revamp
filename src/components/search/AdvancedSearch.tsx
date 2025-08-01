'use client';

import { useState } from 'react';
import { AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdvancedSearch() {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-7">
        <div className="col-span-2">
          <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-1">
            Location
          </label>
          <select
            id="location"
            className="w-full rounded-md border-neutral-300 py-3 focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">All Locations</option>
            <option value="cordoba">Cordoba</option>
            <option value="granada">Granada</option>
            <option value="jaen">Jaen</option>
            <option value="malaga">Malaga</option>
            <option value="sevilla">Sevilla</option>
          </select>
        </div>

        <div className="col-span-2">
          <label htmlFor="property-type" className="block text-sm font-medium text-neutral-700 mb-1">
            Property Type
          </label>
          <select
            id="property-type"
            className="w-full rounded-md border-neutral-300 py-3 focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">All Types</option>
            <option value="villa">Villa</option>
            <option value="cortijo">Cortijo</option>
            <option value="townhouse">Townhouse</option>
            <option value="finca">Finca</option>
            <option value="apartment">Apartment</option>
          </select>
        </div>

        <div className="col-span-2">
          <label htmlFor="price-range" className="block text-sm font-medium text-neutral-700 mb-1">
            Price Range
          </label>
          <select
            id="price-range"
            className="w-full rounded-md border-neutral-300 py-3 focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">Any Price</option>
            <option value="0-100000">Up to €100,000</option>
            <option value="100000-200000">€100,000 - €200,000</option>
            <option value="200000-300000">€200,000 - €300,000</option>
            <option value="300000-500000">€300,000 - €500,000</option>
            <option value="500000+">€500,000+</option>
          </select>
        </div>

        <div className="flex items-end gap-2">
          <button
            type="button"
            className="flex-1 bg-primary-600 rounded-md py-3 px-4 min-h-[50px] text-white font-medium hover:bg-secondary-500 transition-colors"
            onClick={() => router.push('/properties')}
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => setShowAdvancedSearch(true)}
            className="flex items-center justify-center w-12 min-h-[50px] bg-secondary-500 rounded-md hover:bg-primary-600 transition-colors "
            aria-label="Advanced Search"
          >
            <AdjustmentsHorizontalIcon className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
      
      {/* Advanced Search Modal */}
      {showAdvancedSearch && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowAdvancedSearch(false)}>
              <div className="absolute inset-0 bg-neutral-900 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div 
              className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full relative"
              role="dialog" 
              aria-modal="true" 
              aria-labelledby="modal-headline"
            >
              <div className="bg-white p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-neutral-900" id="modal-headline">Advanced Search</h3>
                  <button
                    type="button"
                    className="text-neutral-500 hover:text-neutral-700 transition-colors"
                    onClick={() => setShowAdvancedSearch(false)}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={e => { e.preventDefault(); router.push('/properties'); }}>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div>
                      <label htmlFor="advanced-province" className="block text-sm font-medium text-neutral-700 mb-1">
                        Province
                      </label>
                      <select
                        id="advanced-province"
                        className="w-full rounded-md border-neutral-300 py-3 focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="">Any Province</option>
                        <option value="cordoba">Cordoba</option>
                        <option value="granada">Granada</option>
                        <option value="jaen">Jaen</option>
                        <option value="malaga">Malaga</option>
                        <option value="sevilla">Sevilla</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="advanced-area" className="block text-sm font-medium text-neutral-700 mb-1">
                        Area
                      </label>
                      <select
                        id="advanced-area"
                        className="w-full rounded-md border-neutral-300 py-3 focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="">Any Area</option>
                        <option value="antequera">Antequera</option>
                        <option value="ronda">Ronda</option>
                        <option value="priego-de-cordoba">Priego de Córdoba</option>
                        <option value="alcala-la-real">Alcalá la Real</option>
                        <option value="estepa">Estepa</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="advanced-property-type" className="block text-sm font-medium text-neutral-700 mb-1">
                        Property Type
                      </label>
                      <select
                        id="advanced-property-type"
                        className="w-full rounded-md border-neutral-300 py-3 focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="">Any Type</option>
                        <option value="villa">Villa</option>
                        <option value="cortijo">Cortijo</option>
                        <option value="townhouse">Townhouse</option>
                        <option value="finca">Finca</option>
                        <option value="apartment">Apartment</option>
                        <option value="country-house">Country House</option>
                        <option value="cave-house">Cave House</option>
                        <option value="land">Land</option>
                        <option value="business">Business</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="advanced-min-beds" className="block text-sm font-medium text-neutral-700 mb-1">
                        Min. Bedrooms
                      </label>
                      <select
                        id="advanced-min-beds"
                        className="w-full rounded-md border-neutral-300 py-3 focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="">Any</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                        <option value="5">5+</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="advanced-min-baths" className="block text-sm font-medium text-neutral-700 mb-1">
                        Min. Bathrooms
                      </label>
                      <select
                        id="advanced-min-baths"
                        className="w-full rounded-md border-neutral-300 py-3 focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="">Any</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="advanced-pool" className="block text-sm font-medium text-neutral-700 mb-1">
                        Pool
                      </label>
                      <select
                        id="advanced-pool"
                        className="w-full rounded-md border-neutral-300 py-3 focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="">Any</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="min-price" className="block text-sm font-medium text-neutral-700 mb-1">
                        Min. Price
                      </label>
                      <select
                        id="min-price"
                        className="w-full rounded-md border-neutral-300 py-3 focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="">No Min</option>
                        <option value="50000">€50,000</option>
                        <option value="100000">€100,000</option>
                        <option value="150000">€150,000</option>
                        <option value="200000">€200,000</option>
                        <option value="300000">€300,000</option>
                        <option value="500000">€500,000</option>
                        <option value="750000">€750,000</option>
                        <option value="1000000">€1,000,000</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="max-price" className="block text-sm font-medium text-neutral-700 mb-1">
                        Max. Price
                      </label>
                      <select
                        id="max-price"
                        className="w-full rounded-md border-neutral-300 py-3 focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="">No Max</option>
                        <option value="100000">€100,000</option>
                        <option value="150000">€150,000</option>
                        <option value="200000">€200,000</option>
                        <option value="300000">€300,000</option>
                        <option value="500000">€500,000</option>
                        <option value="750000">€750,000</option>
                        <option value="1000000">€1,000,000</option>
                        <option value="1500000">€1,500,000</option>
                        <option value="2000000">€2,000,000+</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="advanced-plot-size" className="block text-sm font-medium text-neutral-700 mb-1">
                        Min. Plot Size
                      </label>
                      <select
                        id="advanced-plot-size"
                        className="w-full rounded-md border-neutral-300 py-3 focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="">Any</option>
                        <option value="500">500+ m²</option>
                        <option value="1000">1,000+ m²</option>
                        <option value="5000">5,000+ m²</option>
                        <option value="10000">10,000+ m²</option>
                        <option value="50000">50,000+ m²</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3 mt-6">
                    <div>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 h-5 w-5" />
                        <span className="ml-2 text-sm text-neutral-700">Price Reduced</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 h-5 w-5" />
                        <span className="ml-2 text-sm text-neutral-700">Recent Listings</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 h-5 w-5" />
                        <span className="ml-2 text-sm text-neutral-700">With Garden</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 h-5 w-5" />
                        <span className="ml-2 text-sm text-neutral-700">Mountain Views</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 h-5 w-5" />
                        <span className="ml-2 text-sm text-neutral-700">With Garage/Parking</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 h-5 w-5" />
                        <span className="ml-2 text-sm text-neutral-700">Olive Grove</span>
                      </label>
                    </div>
                  </div>

                  <div className="mt-8">
                    <button
                      type="submit"
                      className="w-full bg-primary-600 text-white py-4 rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-md"
                    >
                      Search Properties
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 