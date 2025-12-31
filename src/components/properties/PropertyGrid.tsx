import React, { useMemo, memo } from 'react';
import PropertyCard from './PropertyCard';
import { Property } from '@/types/property';
import { useFavouriteIds } from '@/hooks/useFavouriteIds';
import { useTranslations } from 'next-intl';

interface PropertyGridProps {
  properties: Property[];
  title?: string;
  subtitle?: string;
  featuredProperty?: Property;
  loading?: boolean;
}

// Performance: Memoized helper function to transform Property to PropertyCard format
// Prevents unnecessary recalculations when rendering property lists
const transformPropertyForCard = (property: Property) => {
  // Extract property type from title (format: "PropertyType (Ref)")
  // If title is "Property (TH1234)", extract "Property"
  // If title is "Apartment (AP1234)", extract "Apartment"
  let propertyType = 'Property';
  if (property.title) {
    const match = property.title.match(/^([^(]+)\s*\(/);
    if (match && match[1]) {
      propertyType = match[1].trim();
    } else {
      // If no parentheses, try to extract from title or use location_type
      propertyType = property.location_type || property.title.split(' ')[0] || 'Property';
    }
  }

  return {
    id: property.id,
    title: property.title,
    price: property.price.current,
    originalPrice: property.price.original,
    currency: 'EUR', // Default currency for the region
    shortDescription: property.description,
    location: {
      province: property.location.province,
      town: property.location.town,
    },
    features: {
      bedrooms: property.specs.beds,
      bathrooms: property.specs.baths,
      buildSize: property.specs.built,
      type: propertyType, // Use extracted type instead of full title
    },
    images: property.images.map((url, index) => ({
      url,
      alt: `${property.title} - Image ${index + 1}`,
      isFeatured: index === 0, // First image is featured
    })),
    isReduced: property.isReduced,
  };
};

// Performance: Memoized component to prevent unnecessary re-renders
function PropertyGrid({
  properties,
  title,
  subtitle,
  featuredProperty,
  loading = false
}: PropertyGridProps) {
  const favouriteIds = useFavouriteIds();
  const tCommon = useTranslations('common');

  // Performance: Memoize transformed featured property to avoid recalculation
  const transformedFeaturedProperty = useMemo(() => 
    featuredProperty ? transformPropertyForCard(featuredProperty) : null,
    [featuredProperty]
  );

  // Performance: Memoize transformed properties list to avoid recalculation on every render
  const transformedProperties = useMemo(() => 
    properties.map(transformPropertyForCard),
    [properties]
  );

  if (loading) {
    return (
      <div className="w-full">
        {title && (
          <div className="mb-8 text-center">
            <h2 className="font-heading text-3xl font-bold text-primary-900">{title}</h2>
            {subtitle && <p className="mt-2 text-lg text-neutral-600">{subtitle}</p>}
          </div>
        )}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse rounded-property bg-white shadow-property-card">
              <div className="aspect-[4/3] w-full rounded-t-property bg-neutral-200"></div>
              <div className="p-4">
                <div className="mb-2 h-6 w-3/4 rounded bg-neutral-200"></div>
                <div className="mb-3 h-4 w-1/2 rounded bg-neutral-200"></div>
                <div className="mb-4 flex justify-between border-b border-neutral-200 pb-4">
                  <div className="h-8 w-12 rounded bg-neutral-200"></div>
                  <div className="h-8 w-12 rounded bg-neutral-200"></div>
                  <div className="h-8 w-12 rounded bg-neutral-200"></div>
                  <div className="h-8 w-12 rounded bg-neutral-200"></div>
                </div>
                <div className="h-10 w-full rounded bg-neutral-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && (
        <div className="mb-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-primary-900">{title}</h2>
          {subtitle && <p className="mt-2 text-lg text-neutral-600">{subtitle}</p>}
        </div>
      )}

      {/* Featured property */}
      {transformedFeaturedProperty && (
        <div className="mb-8">
          <PropertyCard property={transformedFeaturedProperty} featured={true} favouriteIds={favouriteIds} />
        </div>
      )}

      {/* Property grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {transformedProperties.map((property) => (
          <PropertyCard key={property.id} property={property} favouriteIds={favouriteIds} />
        ))}
      </div>

      {/* No results message */}
      {properties.length === 0 && (
        <div className="my-16 text-center">
          <h3 className="mb-2 text-xl font-semibold text-neutral-900">{tCommon('noPropertiesFound')}</h3>
          <p className="text-neutral-600">
            {tCommon('tryAdjustingSearchCriteriaToFindMore')}
          </p>
        </div>
      )}
    </div>
  );
}

// Performance: Export memoized component
export default memo(PropertyGrid); 