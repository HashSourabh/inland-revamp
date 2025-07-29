import React from 'react';
import PropertyCard from './PropertyCard';
import { Property } from '@/types/property';

interface PropertyGridProps {
  properties: Property[];
  title?: string;
  subtitle?: string;
  featuredProperty?: Property;
  loading?: boolean;
}

export default function PropertyGrid({ 
  properties, 
  title, 
  subtitle, 
  featuredProperty, 
  loading = false 
}: PropertyGridProps) {
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
      {featuredProperty && (
        <div className="mb-8">
          <PropertyCard property={featuredProperty} featured={true} />
        </div>
      )}
      
      {/* Property grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      
      {/* No results message */}
      {properties.length === 0 && (
        <div className="my-16 text-center">
          <h3 className="mb-2 text-xl font-semibold text-neutral-900">No properties found</h3>
          <p className="text-neutral-600">
            Try adjusting your search criteria to find more properties.
          </p>
        </div>
      )}
    </div>
  );
} 