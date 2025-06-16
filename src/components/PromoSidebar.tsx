import React from 'react';
import { HomeIcon, StarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function PromoSidebar() {
  return (
    <aside className="flex flex-col gap-6">
      <Link href="/properties/exclusives" className="rounded-xl p-6 shadow-lg text-center transition-transform hover:scale-[1.02]" style={{ backgroundColor: 'rgb(var(--color-secondary))' }}>
        <h3 className="text-2xl font-bold mb-2" style={{ color: 'rgb(var(--color-primary))' }}>EXCLUSIVE PROPERTIES</h3>
        <p style={{ color: 'rgb(var(--color-primary))' }}>CLICK here for latest listings with more fantastic price reductions</p>
      </Link>
      <Link href="/sell-your-property" className="rounded-xl p-6 shadow-lg text-center text-white flex flex-col items-center transition-transform hover:scale-[1.02]" style={{ backgroundColor: 'rgb(var(--color-primary))' }}>
        <h3 className="text-2xl font-bold mb-2">Are you looking to sell your house?</h3>
        <HomeIcon className="h-10 w-10 mb-2 text-white" />
      </Link>
      <Link href="/franchise" className="rounded-xl p-6 shadow-lg text-center flex flex-col items-center transition-transform hover:scale-[1.02]" style={{ backgroundColor: 'rgb(var(--color-secondary))' }}>
        <h3 className="text-2xl font-bold mb-2" style={{ color: 'rgb(var(--color-primary))' }}>FRANCHISE OPPORTUNITIES</h3>
        <StarIcon className="h-10 w-10" style={{ color: 'rgb(var(--color-primary))' }} />
      </Link>
      <div className="rounded-xl p-6 shadow-lg text-center" style={{ backgroundColor: 'rgb(var(--color-secondary))' }}>
        <h3 className="text-2xl font-bold mb-2" style={{ color: 'rgb(var(--color-primary))' }}>You're in Safe Hands</h3>
        <Link href="/sell-your-property" className="mt-2 bg-primary-900 text-white px-4 py-2 rounded font-semibold hover:bg-primary-800 transition inline-block">Sell With Us</Link>
      </div>
    </aside>
  );
} 