import React from 'react';
import { HomeIcon, StarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function PromoSidebar() {
  return (
    <aside className="flex flex-col bg-white rounded-xl border border-black/10 p-3">
      <div className="p-2.5 border-b border-black/10 text-center py-6">
        <h3 className="text-2xl font-semibold mb-2 text-gray-700 text-gray-600">Exclusive Properties</h3>
        <p className="mb-4 text-base font-medium text-gray-500 ">CLICK here for latest listings with more fantastic price reductions</p>
        
        <Link href="/properties/exclusives" className="inline-block bg-secondary-500 text-white font-medium px-8 py-2 rounded-md shadow hover:bg-primary-600 transition">View All Properties</Link>
      </div>
      <div className="p-2.5 border-b border-black/10 text-center py-6">
        <div className="w-12 min-w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto">
          <HomeIcon className="h-8 w-8 text-white" />
        </div>
        <div className="mt-2.5 mb-4">
          <h3 className="text-2xl font-semibold text-gray-700 text-gray-600">Are you looking to sell your house?</h3>
        </div>
        <Link href="/sell-your-property" className="inline-block bg-secondary-500 text-white font-medium px-8 py-2 rounded-md shadow hover:bg-primary-600 transition">Sell With Us
        </Link>
      </div>
      <div className="p-2.5 border-b border-black/10 text-center py-6">
        <div className="w-12 min-w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto">
          <StarIcon className="h-8 w-8 text-white"  />
        </div>
        <div className="mt-2.5 mb-4">
          <h3 className="text-2xl font-semibold text-gray-700 text-gray-600">Franchise Opportunities</h3>
          <p className="mb-4 text-base font-medium text-gray-500 mt-2">Start your journey as a franchise owner with a trusted brand. Low risk, high support, and unlimited growth potential.</p>
        </div>
        <Link href="/franchise" className="inline-block bg-secondary-500 text-white font-medium px-8 py-2 rounded-md shadow hover:bg-primary-600 transition">Franchise Opportunities</Link>
      </div>
      <div className="p-2.5 text-center py-6">
        <h3 className="text-2xl font-semibold text-gray-700 text-gray-600">You're in Safe Hands</h3>
        <p className="mb-4 text-base font-medium text-gray-500 mt-2">Trusted by thousands, we prioritize your safety and satisfaction at every step.</p>
        <Link href="/sell-your-property" className="inline-block bg-secondary-500 text-white font-medium px-8 py-2 rounded-md shadow hover:bg-primary-600 transition">Learn More</Link>
      </div>
    </aside>
  );
} 