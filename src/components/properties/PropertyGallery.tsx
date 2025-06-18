'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  ArrowLeftIcon,
  PrinterIcon,
  EnvelopeIcon,
  UserGroupIcon,
  PlayIcon,
  CalendarIcon,
  MapPinIcon, 
  HomeIcon, 
  StarIcon,
  HomeModernIcon,
  BeakerIcon,
  EyeIcon,
  MapIcon,
  BuildingOfficeIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import PromoSidebar from '@/components/PromoSidebar';

interface PropertyGalleryProps {
  images: string[];
  title: string;
  propertyRef?: string;
  price?: number;
  originalPrice?: number;
  location?: string;
  beds?: number;
  baths?: number;
  views?: string;
  built?: string;
  plot?: string;
  features?: string[];
  description?: string;
}

export default function PropertyGallery({ 
  images, 
  title,
  propertyRef = '',
  price = 0,
  originalPrice,
  location = '',
  beds = 0,
  baths = 0,
  views = '',
  built = '',
  plot = '',
  features = [],
  description = ''
}: PropertyGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);
  const [isScrollable, setIsScrollable] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Generate more images for testing (10 minimum)
  const allImages = [
    ...images,
    ...Array(Math.max(0, 10 - images.length)).fill(images[0])
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth / 2;
      const newScrollLeft = direction === 'left' 
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const checkScrollable = () => {
    if (scrollContainerRef.current) {
      setIsScrollable(
        scrollContainerRef.current.scrollWidth > scrollContainerRef.current.clientWidth
      );
    }
  };

  useEffect(() => {
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, []);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="relative w-full">
      {/* Property Header */}
      <div className="mb-6 rounded-lg bg-primary-700 p-4 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <TagIcon className="h-6 w-6" />
            <h1 className="text-2xl font-semibold">{title}</h1>
            {propertyRef && <span className="text-lg">({propertyRef})</span>}
          </div>
          <div className="flex items-center gap-4">
            {originalPrice && originalPrice > 0 && (
              <span className="text-2xl font-bold text-red-500 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
            {price > 0 && (
              <span className="text-3xl font-bold">
                {formatPrice(price)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Link 
          href="/properties"
          className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back
        </Link>
        <button className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700">
          <PrinterIcon className="h-4 w-4" />
          Print Preview
        </button>
        <button className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700">
          <EnvelopeIcon className="h-4 w-4" />
          E-mail
        </button>
        <button className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700">
          <UserGroupIcon className="h-4 w-4" />
          Contact us
        </button>
        <button className="inline-flex items-center gap-2 rounded-md bg-yellow-400 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-yellow-500">
          <PlayIcon className="h-4 w-4" />
          Watch video
        </button>
        <button className="inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700">
          <CalendarIcon className="h-4 w-4" />
          Reserve For Viewing
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column - Property Images and Details */}
        <div className="lg:col-span-8">
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

          {/* Thumbnails Slider */}
          <div className="relative mt-4">
            <div 
              ref={scrollContainerRef}
              className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-2"
              onScroll={checkScrollable}
            >
              {allImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  onClick={() => setMainImage(image)}
                  className={`relative flex-shrink-0 overflow-hidden rounded-lg transition-all ${
                    mainImage === image 
                      ? 'ring-2 ring-primary-600 ring-offset-2'
                      : 'ring-1 ring-neutral-200 hover:ring-primary-400 dark:ring-neutral-700'
                  }`}
                >
                  <div className="relative aspect-[4/3] w-20 sm:w-24">
                    <Image
                      src={image}
                      alt={`View ${index + 1} of ${title}`}
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
                <button
                  onClick={() => scroll('left')}
                  className="absolute -left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                >
                  <ChevronLeftIcon className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="absolute -right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                >
                  <ChevronRightIcon className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                </button>
              </>
            )}
          </div>

          {/* Property Details */}
          <div className="mt-8 space-y-6">
            {/* Key Features Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-2 rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                <HomeModernIcon className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Beds</p>
                  <p className="font-semibold">{beds}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                <BeakerIcon className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Baths</p>
                  <p className="font-semibold">{baths}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                <EyeIcon className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Views</p>
                  <p className="font-semibold">{views}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                <BuildingOfficeIcon className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Built</p>
                  <p className="font-semibold">{built}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                <MapIcon className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Plot</p>
                  <p className="font-semibold">{plot}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                <MapPinIcon className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Location</p>
                  <p className="font-semibold">{location}</p>
                </div>
              </div>
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div>
                <h2 className="mb-4 text-xl font-semibold">Features:</h2>
                <div className="flex flex-wrap gap-2">
                  {features.map((feature, index) => (
                    <span 
                      key={index}
                      className="rounded-full bg-primary-50 px-4 py-1 text-sm text-primary-700 dark:bg-primary-900/10 dark:text-primary-400"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {description && (
              <div>
                <h2 className="mb-4 text-xl font-semibold">Description:</h2>
                <p className="text-neutral-700 dark:text-neutral-300">
                  {description}
                </p>
              </div>
            )}

            {/* Google Map */}
            <div>
              <h2 className="mb-4 text-xl font-semibold">Location:</h2>
              <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12614.440973994461!2d-4.598844!3d37.559482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDMzJzM0LjEiTiA0wrAzNSc1NS44Ilc!5e0!3m2!1sen!2ses!4v1620000000000!5m2!1sen!2ses"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Promotional Sections */}
        <PromoSidebar />
      </div>

      {/* Add custom scrollbar styles */}
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