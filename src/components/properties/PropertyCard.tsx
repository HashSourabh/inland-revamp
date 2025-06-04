import Image from 'next/image';
import Link from 'next/link';
import { HeartIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useState } from 'react';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    price: number;
    currency: string;
    shortDescription: string;
    location: {
      province: string;
      town: string;
    };
    features: {
      bedrooms: number;
      bathrooms: number;
      buildSize: number;
      type: string;
    };
    images: {
      url: string;
      alt: string;
      isFeatured: boolean;
    }[];
  };
  featured?: boolean;
}

export default function PropertyCard({ property, featured = false }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Find the featured image or fallback to the first image
  const mainImage = property.images.find(img => img.isFeatured) || property.images[0];
  
  // Format price with currency symbol
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div 
      className={`group overflow-hidden rounded-property bg-white transition-all duration-300 ${
        featured 
          ? 'shadow-hover-card' 
          : 'shadow-property-card hover:shadow-hover-card'
      }`}
    >
      <div className="relative">
        {/* Property image */}
        <Link href={`/properties/${property.id}`}>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image 
              src={mainImage.url}
              alt={mainImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority={featured}
            />
          </div>
        </Link>
        
        {/* Favorite button */}
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="absolute right-3 top-3 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-all hover:bg-white"
        >
          {isFavorite ? (
            <HeartIconSolid className="h-5 w-5 text-secondary-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-neutral-600" />
          )}
        </button>
        
        {/* Price tag */}
        <div className="absolute bottom-0 left-0 bg-primary-600 px-4 py-2 text-white">
          <span className="font-serif text-xl font-bold">
            {formatPrice(property.price, property.currency)}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        {/* Property title */}
        <Link href={`/properties/${property.id}`}>
          <h3 className="mb-2 font-serif text-lg font-semibold text-neutral-900 group-hover:text-primary-600">
            {property.title}
          </h3>
        </Link>
        
        {/* Location */}
        <div className="mb-3 flex items-center text-sm text-neutral-500">
          <MapPinIcon className="mr-1 h-4 w-4" />
          <span>{property.location.town}, {property.location.province}</span>
        </div>
        
        {/* Features */}
        <div className="mb-4 flex justify-between border-b border-neutral-200 pb-4">
          <div className="flex flex-col items-center">
            <span className="text-sm text-neutral-500">Beds</span>
            <span className="font-medium text-neutral-900">{property.features.bedrooms}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm text-neutral-500">Baths</span>
            <span className="font-medium text-neutral-900">{property.features.bathrooms}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm text-neutral-500">Size</span>
            <span className="font-medium text-neutral-900">{property.features.buildSize} m²</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm text-neutral-500">Type</span>
            <span className="font-medium text-neutral-900">{property.features.type}</span>
          </div>
        </div>
        
        {/* Description - only shown if featured */}
        {featured && (
          <p className="mb-4 text-sm text-neutral-600">
            {property.shortDescription}
          </p>
        )}
        
        {/* Call to action */}
        <Link 
          href={`/properties/${property.id}`}
          className="inline-block w-full rounded-md bg-secondary-500 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-secondary-600"
        >
          View Details
        </Link>
      </div>
    </div>
  );
} 