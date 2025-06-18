'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types/property';

interface PropertyCardProps {
  property: Property;
  layout?: 'grid' | 'list';
  featured?: boolean;
}

export default function PropertyCard({ property, layout = 'grid', featured = false }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const isListView = layout === 'list';

  return (
    <Link href={`/properties/${property.id.toLowerCase()}`} className="block">
      <article 
        className={`group relative overflow-hidden rounded-lg border border-neutral-200 bg-white transition-all hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 ${
          isListView ? 'flex' : 'flex-col'
        }`}
      >
        {/* Image container */}
        <div className={`relative overflow-hidden ${
          isListView ? 'h-[300px] w-[400px] flex-shrink-0' : 'aspect-[4/3] w-full'
        }`}>
          <Image
            src={property.images[0]}
            alt={`${property.title} in ${property.location.town}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Badges */}
          <div className="absolute left-3 top-3 flex gap-2">
            {property.isExclusive && (
              <span className="rounded bg-primary-600 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                Exclusive
              </span>
            )}
            {property.isReduced && (
              <span className="rounded bg-secondary-500 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                Reduced
              </span>
            )}
          </div>
          {/* Price badge */}
          <div className="absolute bottom-3 left-3">
            <div className="flex flex-col gap-1">
              {property.price.original && (
                <span className="rounded bg-black/60 px-2 py-1 text-sm line-through text-white">
                  {formatPrice(property.price.original)}
                </span>
              )}
              <span className="rounded bg-primary-600 px-2 py-1 text-sm font-semibold text-white">
                {formatPrice(property.price.current)}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={`flex flex-col ${isListView ? 'flex-1 p-6' : 'p-4'}`}>
          <div className={isListView ? 'flex items-start justify-between' : ''}>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                {property.title} ({property.id})
              </h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                {property.location.town} / {property.location.province}
              </p>
            </div>
          </div>
          
          {/* Specs */}
          <div className={`flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400 ${
            isListView ? 'mt-6' : 'mt-4'
          }`}>
            <div className="flex items-center gap-1">
              <span className="font-semibold">{property.specs.beds}</span>
              <span>Beds</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">{property.specs.baths}</span>
              <span>Baths</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">{property.specs.built}</span>
              <span>m²</span>
            </div>
            {property.specs.plot && (
              <div className="flex items-center gap-1">
                <span className="font-semibold">{property.specs.plot}</span>
                <span>Plot</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className={`text-sm text-neutral-600 dark:text-neutral-400 ${
            isListView ? 'mt-6 line-clamp-3' : 'mt-4 line-clamp-2'
          }`}>
            {property.description}
          </p>
        </div>
      </article>
    </Link>
  );
} 