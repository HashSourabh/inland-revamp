'use client';

/**
 * Client Component for Exclusive Properties
 * Handles interactivity (favorites, etc.)
 */

import Link from 'next/link';
import PropertyCard from './PropertyCard';
import { useFavouriteIds } from '@/hooks/useFavouriteIds';
import { useTranslations } from 'next-intl';
import type { PropertyForCard } from '@/context/PropertyCacheContext';

interface ExclusivePropertiesClientProps {
  properties: PropertyForCard[];
  translations: {
    title: string;
    subtitle: string;
    none: string;
    moreTitle: string;
    moreSubtitle: string;
    viewAllExclusive: string;
  };
}

export default function ExclusivePropertiesClient({ 
  properties, 
  translations 
}: ExclusivePropertiesClientProps) {
  const favouriteIds = useFavouriteIds();
  const tCommon = useTranslations('common');

  return (
    <section className="sm:py-20 xs:py-16 py-12 bg-neutral-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 pattern-dots pattern-neutral-800 pattern-bg-transparent pattern-size-4 pattern-opacity-10"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center sm:mb-12 xs:mb-8 mb-6">
          <h2 className="font-heading text-2xl xs:text-3xl md:text-4xl font-bold text-primary-600 lg:text-5xl">
            {translations.title}
          </h2>
          <p className="xs:mt-4 mt-2 text-neutral-600 text-sm xs:text-base sm:text-lg">
            {translations.subtitle}
          </p>
        </div>

        {properties.length > 0 ? (
          <>
            <div className="grid gap-5 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {properties.slice(0, 3).map((property) => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  favouriteIds={favouriteIds} 
                />
              ))}
            </div>

            {/* View All Button */}
            <div className="sm:mt-16 xs:mt-14 mt-12 relative overflow-hidden bg-gradient-to-br from-[#1d3557] to-[#457b9d] rounded-xl shadow-xl mx-auto">
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/30 blur-3xl"></div>
                <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-white/20 blur-3xl"></div>
              </div>
              <div className="relative z-10 sm:px-8 xs:px-6 px-4 sm:py-16 xs:py-10 py-8 text-center">
                <h3 className="xs:mt-4 mt-2 text-white font-bold text-2xl xs:text-3xl md:text-4xl text-primary-600 lg:text-5xl mb-4">
                  {translations.moreTitle}
                </h3>
                <p className="text-white/80 sm:mb-8 mb-6 text-sm xs:text-base sm:text-lg">
                  {translations.moreSubtitle}
                </p>
                <Link
                  href="/properties?exclusive=true"
                  className="inline-flex items-center bg-white hover:bg-gray-100 text-[#1d3557] xs:px-6 px-4 sm:px-10 py-1 sm:min-h-[56px] min-h-[42px] hover:bg-secondary-600 hover:text-white rounded-lg font-medium transition-colors shadow-md sm:text-lg xs:text-base text-sm"
                >
                  {translations.viewAllExclusive}
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-500">{translations.none}</p>
            <p className="text-neutral-400 text-sm mt-2">
              {tCommon('unableToLoadExclusive')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

