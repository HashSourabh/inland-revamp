'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeModernIcon,
  BeakerIcon,
  EyeIcon,
  BuildingOfficeIcon,
  MapIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

interface PropertyGalleryProps {
  images: { url: string; alt: string; isFeatured: boolean }[];
  title: string;
  location?: string;
  beds?: number;
  baths?: number;
  views?: number;
  built?: number;
  plot?: number;
  features?: string[];
  description?: string;
  lat?: number;
  lng?: number;
}

export default function PropertyGallery({
  images,
  title,
  location = '',
  beds = 0,
  baths = 0,
  views = 0,
  built = 0,
  plot = 0,
  features = [],
  description = ''
  , lat, lng
}: PropertyGalleryProps) {
  const t = useTranslations('properties')
  const [mainImage, setMainImage] = useState(images[0]?.url || '');
  const [isScrollable, setIsScrollable] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth / 2;
      container.scrollTo({
        left: direction === 'left' ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const checkScrollable = () => {
    if (scrollContainerRef.current) {
      setIsScrollable(scrollContainerRef.current.scrollWidth > scrollContainerRef.current.clientWidth);
    }
  };
  console.log('coordinates', lat, lng);

  useEffect(() => {
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, []);

  return (
    <div className="relative w-full">
      {/* Main Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-800">
        <Image
          src={mainImage}
          alt={`Main view of ${title}`}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="relative mt-4">
        <div ref={scrollContainerRef} className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setMainImage(image.url)}
              className={`relative flex-shrink-0 overflow-hidden rounded-lg transition-all ${mainImage === image.url
                ? 'ring-2 ring-primary-600 ring-offset-2'
                : 'ring-1 ring-neutral-200 hover:ring-primary-400 dark:ring-neutral-700'
                }`}
            >
              <div className="relative aspect-[4/3] w-20 sm:w-24">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </div>
            </button>
          ))}
        </div>

        {/* Scroll Buttons */}
        {isScrollable && (
          <>
            <button onClick={() => scroll('left')} className="absolute -left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:bg-neutral-800 dark:hover:bg-neutral-700">
              <ChevronLeftIcon className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
            </button>
            <button onClick={() => scroll('right')} className="absolute -right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:bg-neutral-800 dark:hover:bg-neutral-700">
              <ChevronRightIcon className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
            </button>
          </>
        )}
      </div>
      <style jsx global>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .font-script {
          font-family: 'Dancing Script', cursive;
        }
      `}</style>
    </div>
  );
}
