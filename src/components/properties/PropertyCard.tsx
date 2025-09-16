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
    originalPrice?: number;
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
    isReduced?: boolean;
    savingsAmount?: number;
  };
  card?: 'list' | 'grid';
  featured?: boolean;
}

export default function PropertyCard({ property, card = 'grid', featured = false }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Find the featured image or fallback to the first image
  const mainImage = property.images.find(img => img.isFeatured) || property.images[0];

  // Format price with currency symbol
  const formatPrice = (price: number, currency?: string) => {
    const validCurrency = currency || 'USD';

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: validCurrency,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      className={`group overflow-hidden rounded-property bg-white transition-all duration-300 ${featured
          ? 'shadow-hover-card'
          : 'shadow-property-card hover:shadow-hover-card'
        } 
      ${card === 'list' ? 'grid grid-cols-9' : ''}`}
    >
      <div className={`relative ${card === 'list' ? 'col-span-2' : ''}`}>
        {/* Property image */}
        <Link href={`/properties/${property.id}`}>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={mainImage?.url || '/placeholder-property.jpg'}
              alt={mainImage?.alt || 'Property Image'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority={featured}
            />
          </div>
        </Link>

        {/* Price reduction badge */}
        {property.isReduced &&
          property.originalPrice &&
          property.originalPrice > 0 &&
          property.price > 0 && (
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-block bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md">
                Price Reduced
              </span>
            </div>
          )}

        {/* Favorite button */}
        <button
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="absolute right-3 top-3 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-all hover:bg-white"
          type="button"
        >
          {isFavorite ? (
            <HeartIconSolid className="h-5 w-5 text-secondary-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-neutral-600" />
          )}
        </button>
      </div>

      <div className={`p-4 ${card === 'list' ? 'col-span-7 flex flex-col' : ''}`}>
        {/* Property title */}
        <div className={`flex justify-between items-start mb-4 ${card === 'list' ? 'flex-auto' : ''}`}>
          <div>
            <Link href={`/properties/${property.id}`}>
              <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                {property.title}
              </h3>
            </Link>
            {/* Location */}
            <div className="mt-2 flex items-center text-sm text-neutral-500">
              <MapPinIcon className="mr-1 h-4 w-4" />
              <span>{property.location.town}, {property.location.province}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            {property.originalPrice && property.isReduced && (
              <h6 className="text-sm text-neutral-500 line-through">
                {formatPrice(property.originalPrice, property.currency)}
              </h6>
            )}
            <h4 className={`text-xl font-bold ${property.isReduced ? 'text-red-500' : 'text-neutral-900'}`}>
              {formatPrice(property.price, property.currency)}
            </h4>
            {property.isReduced && property.savingsAmount && (
              <h6 className="text-sm text-green-600 font-medium mt-1">
                Save {formatPrice(property.savingsAmount, property.currency)}
              </h6>
            )}
          </div>
        </div>

        {/* Description - only shown if featured */}
        {featured && property.shortDescription && (
          <div className="border-t border-neutral-100">
            <p className="mb-4 text-sm text-neutral-600 mt-4">
              {property.shortDescription}
            </p>
          </div>
        )}

        {/* Features */}
        <div className={`flex flex-col justify-start ${card === 'list' ? 'items-center' : ''}`}>
          <div className="flex-auto">
            <div className={`flex pt-4 ${card === 'list' ? 'justify-start gap-10' : 'justify-between'}`}>
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
                <span className="font-medium text-neutral-900">
                  {property.features.buildSize > 0 ? `${property.features.buildSize} m²` : 'N/A'}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm text-neutral-500">Type</span>
                <span className="font-medium text-neutral-900">{property.features.type}</span>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="flex-initial mt-4">
            <Link
              href={`/properties/${property.id}`}
              className="inline-block w-full rounded-md bg-secondary-500 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-secondary-600"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}