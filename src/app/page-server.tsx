/**
 * Server Component Home Page
 * Fetches data on the server for better performance and SEO
 */

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import Hero from "@/sections/Hero";
import ExclusivePropertiesSection from '@/components/properties/ExclusivePropertiesSection';
import FeaturedPropertiesSection from '@/components/properties/FeaturedPropertiesSection';
import PropertyCardSkeleton from '@/components/properties/PropertyCardSkeleton';

// Lazy load heavy components
const AdvancedSearch = dynamic(() => import("@/components/search/AdvancedSearch"), {
  loading: () => <div className="h-64 animate-pulse bg-neutral-100 rounded-lg" />,
  ssr: true, // Enable SSR for SEO
});

const TestimonialsCarousel = dynamic(() => import("@/components/testimonials/TestimonialsCarousel"), {
  loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-pulse text-neutral-400">Loading testimonials...</div></div>,
  ssr: false, // Disable SSR for carousel as it's not critical for SEO
});

// Loading skeleton for exclusive properties
function ExclusivePropertiesSkeleton() {
  return (
    <section className="sm:py-20 xs:py-16 py-12 bg-neutral-50 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center sm:mb-12 xs:mb-8 mb-6">
          <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
        </div>
        <div className="grid gap-5 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <PropertyCardSkeleton key={`exclusive-skeleton-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Loading skeleton for featured properties
function FeaturedPropertiesSkeleton() {
  return (
    <section className="sm:pb-16 xs:pb-10 pb-8 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="h-12 bg-gray-200 rounded w-64 mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-96 animate-pulse"></div>
          </div>
        </div>
        <div className="mt-12">
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={`featured-skeleton-${i}`} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3">
                <PropertyCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function HomePage() {
  const t = await getTranslations('home');
  const tCommon = await getTranslations('common');

  return (
    <div>
      {/* Hero Section - Always visible */}
      <Hero />

      {/* Advanced Search - Always visible */}
      <section className="pt-16 bg-gradient-to-b from-white to-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-xl sm:p-8 p-4 xs:p-6 pt-4 xs:pt-6 -mt-32 relative border border-neutral-100">
            <AdvancedSearch />
          </div>
        </div>
      </section>

      {/* Exclusive Properties - Server Component with Suspense */}
      <Suspense fallback={<ExclusivePropertiesSkeleton />}>
        <ExclusivePropertiesSection />
      </Suspense>

      {/* Featured Properties - Server Component with Suspense */}
      <Suspense fallback={<FeaturedPropertiesSkeleton />}>
        <FeaturedPropertiesSection />
      </Suspense>

      {/* CTA Section - Always visible */}
      <section className="relative py-14 sm:py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1512753360435-329c4535a9a7?auto=format&fit=crop&q=80"
            alt={tCommon('andalucianLandscape')}
            fill
            className="object-cover brightness-50"
            sizes="100vw"
            priority={false}
            loading="lazy"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-white md:text-5xl">
            {t('cta.title')}
          </h2>
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-xl text-white/90">
            {t('cta.subtitle')}
          </p>
          <div className="mt-7 sm:mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-white px-8 py-1 sm:min-h-[50px] min-h-[40px] font-medium text-primary-800 shadow-md hover:bg-secondary-500 hover:text-white transition-colors"
            >
              {t('cta.button')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

