"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { HomeIcon, StarIcon } from "@heroicons/react/24/outline";
import PromoSidebar from "@/components/PromoSidebar";
import { useRouter } from 'next/navigation';

export default function AdvancedSearchPage() {
  const router = useRouter();
  const refInput = useRef<HTMLInputElement>(null);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Advanced Search Form */}
      <section className="md:col-span-2 bg-white rounded-xl shadow-lg p-8 border border-neutral-200">
        <h1 className="font-heading text-3xl font-bold text-primary-900 mb-6">Andalucía Property</h1>
        <p className="mb-8 text-neutral-700">
          At Inland Andalucia we have country, rural, inland property ranging from fincas, villas, townhouses to apartments. We specialise in the areas of Antequera, Cordoba, Granada, Jaen, Malaga and Sevilla where, with us you will find your ideal inland property. If you do not find what you are looking for please <Link href="/contact" className="text-primary-600 underline">contact us</Link>, as we probably have it.
        </p>
        <div className="bg-primary-900 rounded-lg mb-6">
          <h2 className="text-lg font-bold text-white px-6 py-3">Property search (advanced)</h2>
        </div>
        <form className="bg-neutral-50 rounded-lg p-6 mb-8" onSubmit={e => { e.preventDefault(); router.push('/properties'); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-neutral-800 mb-1">Area:</label>
              <select className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500">
                <option>All</option>
                <option>Antequera</option>
                <option>Cordoba</option>
                <option>Granada</option>
                <option>Jaen</option>
                <option>Malaga</option>
                <option>Sevilla</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-neutral-800 mb-1">PropertyType:</label>
              <select className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500">
                <option>All</option>
                <option>Villa</option>
                <option>Townhouse</option>
                <option>Finca</option>
                <option>Apartment</option>
                <option>Country House</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-neutral-800 mb-1">Min. Beds:</label>
              <select className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500">
                <option>Any</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5+</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-neutral-800 mb-1">Min. Baths:</label>
              <select className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500">
                <option>Any</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5+</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-neutral-800 mb-1">Price from:</label>
              <select className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500">
                <option>Any</option>
                <option>€50,000</option>
                <option>€100,000</option>
                <option>€150,000</option>
                <option>€200,000</option>
                <option>€300,000</option>
                <option>€500,000</option>
                <option>€1,000,000</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-neutral-800 mb-1">to:</label>
              <select className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500">
                <option>Any</option>
                <option>€100,000</option>
                <option>€150,000</option>
                <option>€200,000</option>
                <option>€300,000</option>
                <option>€500,000</option>
                <option>€1,000,000</option>
                <option>€2,000,000+</option>
              </select>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button type="submit" className="bg-primary-600 text-white font-semibold px-8 py-3 rounded-md shadow hover:bg-primary-700 transition">Search</button>
          </div>
        </form>
        <div className="bg-primary-900 rounded-lg mb-4">
          <h2 className="text-lg font-bold text-white px-6 py-3">Property search by reference</h2>
        </div>
        <form className="bg-neutral-50 rounded-lg p-6 flex flex-col md:flex-row gap-4 items-center" onSubmit={e => {
          e.preventDefault();
          const ref = refInput.current?.value.trim();
          if (ref) router.push(`/properties/${ref.toLowerCase()}`);
        }}>
          <label className="font-medium text-neutral-800">Reference number</label>
          <input ref={refInput} type="text" className="flex-1 rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500 px-4 py-2" placeholder="Enter reference..." />
          <button type="submit" className="bg-primary-600 text-white font-semibold px-8 py-2 rounded-md shadow hover:bg-primary-700 transition">Search</button>
        </form>
      </section>

      {/* Right: Property Details Sidebar (Promos) */}
      <PromoSidebar />
    </div>
  );
} 