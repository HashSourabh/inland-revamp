'use client';

/**
 * Client Component for Featured Properties Carousel
 * Handles interactivity (carousel, favorites)
 */

import Link from 'next/link';
import PropertyCard from './PropertyCard';
import PropertyCardSkeleton from './PropertyCardSkeleton';
import { useFavouriteIds } from '@/hooks/useFavouriteIds';
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from 'react';
import type { PropertyForCard } from '@/context/PropertyCacheContext';

interface FeaturedPropertiesClientProps {
  properties: PropertyForCard[];
  translations: {
    title: string;
    subtitle: string;
    loading: string;
    viewAllLink: string;
    viewAllButton: string;
  };
}

function Autoplay(slider: any) {
  let timeout: ReturnType<typeof setTimeout>;
  let mouseOver = false;

  function clearNextTimeout() {
    clearTimeout(timeout);
  }

  function nextTimeout() {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => {
      slider.next();
    }, 2000); // autoplay every 2s
  }

  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true;
      clearNextTimeout();
    });
    slider.container.addEventListener("mouseout", () => {
      mouseOver = false;
      nextTimeout();
    });
    nextTimeout();
  });
  slider.on("dragStarted", clearNextTimeout);
  slider.on("animationEnded", nextTimeout);
  slider.on("updated", nextTimeout);
}

export default function FeaturedPropertiesClient({ 
  properties, 
  translations 
}: FeaturedPropertiesClientProps) {
  const favouriteIds = useFavouriteIds();
  const [mounted, setMounted] = useState(false);
  
  // Ensure component is mounted before initializing slider to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize slider - always initialize with plugins, but control visibility
  const [sliderRef, sliderInstanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: {
        perView: 3,
        spacing: 16,
      },
      breakpoints: {
        "(max-width: 1024px)": { slides: { perView: 2, spacing: 12 } },
        "(max-width: 640px)": { slides: { perView: 1, spacing: 8 } },
      },
    },
    [Autoplay] // Always include Autoplay
  );

  // Update slider when mounted and ensure it's properly initialized
  useEffect(() => {
    if (mounted && sliderInstanceRef.current) {
      // Use requestAnimationFrame to ensure DOM is ready and visible
      requestAnimationFrame(() => {
        if (sliderInstanceRef.current) {
          sliderInstanceRef.current.update();
        }
      });
    }
  }, [mounted, sliderInstanceRef]);

  return (
    <section className="sm:pb-16 xs:pb-10 pb-8 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with title and link */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h2 className="font-heading text-2xl xs:text-3xl md:text-4xl font-bold text-primary-600 lg:text-5xl">
              {translations.title}
            </h2>
            <p className="xs:mt-4 mt-2 text-neutral-600 text-sm xs:text-base sm:text-lg">
              {translations.subtitle}
            </p>
          </div>

          {/* Desktop link */}
          <div className="hidden sm:block mt-4 sm:mt-0">
            <Link
              href="/properties"
              className="inline-flex items-center text-primary-600 font-medium hover:underline text-sm xs:text-base whitespace-nowrap"
            >
              {translations.viewAllLink}
            </Link>
          </div>
        </div>

        {/* Mobile button */}
        <div className="xs:mt-6 mt-4 sm:hidden">
          <Link
            href="/properties"
            className="inline-block w-full rounded-md border border-primary-600 px-4 sm:px-6 py-2 sm:py-3 text-center font-medium text-primary-600 hover:bg-primary-50 transition-colors text-sm xs:text-base"
          >
            {translations.viewAllButton}
          </Link>
        </div>

        {/* Carousel */}
        {properties.length > 0 ? (
          <div className="sm:mt-12 xs:mt-8 mt-5 relative">
            {/* Skeleton loading - shown until carousel is ready */}
            {!mounted && (
              <div className="py-[20px]">
                <div className="flex gap-4 overflow-hidden">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={`skeleton-${i}`} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3">
                      <PropertyCardSkeleton />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Carousel - only shown when mounted and ready */}
            {mounted && (
              <div 
                ref={sliderRef} 
                className="keen-slider flex py-[20px] overflow-hidden"
              >
                {properties.slice(0, 9).map((p) => (
                  <div key={p.id} className="keen-slider__slide">
                    <PropertyCard property={p} favouriteIds={favouriteIds} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 mt-12">
            <p className="text-neutral-500">No featured properties available</p>
          </div>
        )}
      </div>
    </section>
  );
}

