import React from 'react';
import { HomeIcon, StarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function PromoSidebar() {
  return (
    <aside className="flex flex-col gap-6">
      <Link href="/properties/exclusives" className="rounded-xl bg-secondary-600/10 p-6 border border-secondary-600/20 text-center transition-transform">
        <h3 className="text-xl font-semibold text-primary-600 mb-2">EXCLUSIVE PROPERTIES</h3>
        <p style={{ color: 'rgb(var(--color-primary))' }}>CLICK here for latest listings with more fantastic price reductions</p>
      </Link>
      <Link href="/sell-your-property" className="rounded-xl bg-secondary-600/10 p-6 border border-secondary-600/20 text-center text-white flex flex-col items-center transition-transform">
        <h3 className="text-xl uppercase font-semibold text-primary-600 mb-2">Are you looking to sell your house?</h3>
        <HomeIcon className="h-10 w-10 mb-2 text-primary-600" />
      </Link>
      <Link href="/franchise" className="rounded-xl p-6 border border-secondary-600/20 text-center flex flex-col items-center transition-transform bg-secondary-600/10">
        <h3 className="text-xl uppercase font-semibold text-primary-600 mb-2">FRANCHISE OPPORTUNITIES</h3>
        <StarIcon className="h-10 w-10 text-primary-600"  />
      </Link>
      <div className="rounded-xl p-6 border border-secondary-600/20 text-center bg-secondary-600/10">
        <h3 className="text-xl uppercase font-semibold text-primary-600 mb-2">You're in Safe Hands</h3>
        <Link href="/sell-your-property" className="mt-2 bg-primary-600 text-white px-4 py-2 rounded font-semibold hover:bg-secondary-500 transition inline-block">Sell With Us</Link>
      </div>
    </aside>
  );
} 