'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
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
  const [mainImage, setMainImage] = useState(() => images[0]?.url || '');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Check scrollability and scroll position
  const checkScrollability = useCallback(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const isScrollable = container.scrollWidth > container.clientWidth;
      setIsScrollable(isScrollable);
      
      if (isScrollable) {
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
          container.scrollLeft < container.scrollWidth - container.clientWidth - 1
        );
      } else {
        setCanScrollLeft(false);
        setCanScrollRight(false);
      }
    }
  }, []);

  // Scroll handler
  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.6;
      const newScrollLeft = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  }, []);

  // Scroll thumbnail into view
  const scrollThumbnailIntoView = useCallback((index: number) => {
    if (thumbnailRefs.current[index] && scrollContainerRef.current) {
      const thumbnail = thumbnailRefs.current[index];
      const container = scrollContainerRef.current;
      const thumbnailRect = thumbnail.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      const thumbnailLeft = thumbnailRect.left - containerRect.left + container.scrollLeft;
      const thumbnailRight = thumbnailLeft + thumbnailRect.width;
      const containerWidth = container.clientWidth;
      const scrollLeft = container.scrollLeft;
      
      if (thumbnailLeft < scrollLeft) {
        // Thumbnail is to the left, scroll it into view
        container.scrollTo({
          left: thumbnailLeft - 16,
          behavior: 'smooth',
        });
      } else if (thumbnailRight > scrollLeft + containerWidth) {
        // Thumbnail is to the right, scroll it into view
        container.scrollTo({
          left: thumbnailRight - containerWidth + 16,
          behavior: 'smooth',
        });
      }
    }
  }, []);

  // Handle thumbnail click
  const handleThumbnailClick = useCallback((imageUrl: string, index: number) => {
    setMainImage(imageUrl);
    setCurrentIndex(index);
    scrollThumbnailIntoView(index);
  }, [scrollThumbnailIntoView]);

  // Navigate to previous image
  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setCurrentIndex(newIndex);
    setMainImage(images[newIndex].url);
    scrollThumbnailIntoView(newIndex);
  }, [currentIndex, images, scrollThumbnailIntoView]);

  // Navigate to next image
  const goToNext = useCallback(() => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setMainImage(images[newIndex].url);
    scrollThumbnailIntoView(newIndex);
  }, [currentIndex, images, scrollThumbnailIntoView]);

  // Handle scroll events
  const handleScroll = useCallback(() => {
    checkScrollability();
  }, [checkScrollability]);

  // Initialize and set up event listeners
  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      window.removeEventListener('resize', checkScrollability);
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [checkScrollability, handleScroll, images.length]);

  // Update current index when main image changes
  useEffect(() => {
    const index = images.findIndex(img => img.url === mainImage);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [mainImage, images]);

  return (
    <div className="relative w-full">
      {/* Main Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-800 shadow-lg group">
        <Image
          key={mainImage}
          src={mainImage}
          alt={`Main view of ${title}`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
        
        {/* Navigation Arrows on Main Image */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:bg-neutral-800/90 dark:hover:bg-neutral-700 transition-all"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:bg-neutral-800/90 dark:hover:bg-neutral-700 transition-all"
              aria-label="Next image"
            >
              <ChevronRightIcon className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Slider */}
      <div className="relative mt-4 group">
        {/* Left Scroll Button */}
        {isScrollable && canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-x-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:bg-neutral-800/90 dark:hover:bg-neutral-700 transition-opacity group-hover:opacity-100 opacity-0 group-hover:opacity-100"
            aria-label="Scroll thumbnails left"
          >
            <ChevronLeftIcon className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
          </button>
        )}

        {/* Thumbnail Container */}
        <div
          ref={scrollContainerRef}
          className="no-scrollbar flex gap-3 overflow-x-auto px-2 py-2 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((image, index) => (
            <button
              key={index}
              ref={(el) => { thumbnailRefs.current[index] = el; }}
              onClick={() => handleThumbnailClick(image.url, index)}
              className={`relative flex-shrink-0 overflow-hidden rounded-lg transition-all duration-200 ${
                currentIndex === index
                  ? 'ring-2 ring-primary-600 ring-offset-2 scale-105 shadow-lg'
                  : 'ring-1 ring-neutral-200 hover:ring-primary-400 hover:scale-102 dark:ring-neutral-700 opacity-75 hover:opacity-100'
              }`}
              aria-label={`View image ${index + 1}: ${image.alt}`}
              aria-current={currentIndex === index ? 'true' : 'false'}
            >
              <div className="relative aspect-[4/3] w-24 sm:w-28 md:w-32 bg-neutral-200 dark:bg-neutral-800">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
                  quality={75}
                />
              </div>
              {currentIndex === index && (
                <div className="absolute inset-0 bg-primary-600/20 pointer-events-none" />
              )}
            </button>
          ))}
        </div>

        {/* Right Scroll Button */}
        {isScrollable && canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 translate-x-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:bg-neutral-800/90 dark:hover:bg-neutral-700 transition-opacity opacity-0 group-hover:opacity-100"
            aria-label="Scroll thumbnails right"
          >
            <ChevronRightIcon className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
          </button>
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
