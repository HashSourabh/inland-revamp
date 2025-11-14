import React, { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';
import { Property } from '@/types/property';
import { useAuth } from '@/context/AuthContext';

interface PropertyGridProps {
  properties: Property[];
  title?: string;
  subtitle?: string;
  featuredProperty?: Property;
  loading?: boolean;
}

// Helper function to transform Property to PropertyCard format
const transformPropertyForCard = (property: Property) => ({
  id: property.id,
  title: property.title,
  price: property.price.current,
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
    type: property.title,
  },
  images: property.images.map((url, index) => ({
    url,
    alt: `${property.title} - Image ${index + 1}`,
    isFeatured: index === 0, // First image is featured
  })),
});

export default function PropertyGrid({
  properties,
  title,
  subtitle,
  featuredProperty,
  loading = false
}: PropertyGridProps) {
  const { user } = useAuth();
  const [favouriteIds, setFavouriteIds] = useState<string[]>([]);

  useEffect(() => {
    const loadFavs = async () => {
      if (!user) {
        setFavouriteIds([]);
        return;
      }

      // Correct base URL resolution
      const isLocalhost =
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1");

      const apiBase =
        process.env.NEXT_PUBLIC_API_BASE ||
        (isLocalhost
          ? `${window.location.protocol}//${window.location.hostname}:4000/api/v1`
          : "https://inlandandalucia.onrender.com/api/v1");

      try {
        const res = await fetch(`${apiBase}/buyers/me/favourites`, {
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok) {
          setFavouriteIds((data.favourites || []).map((f: any) => String(f.Property_Ref)));
        }
      } catch (err) {
        console.error("Failed to load favourites", err);
      }
    };

    loadFavs();
  }, [user]);

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
          <PropertyCard property={transformPropertyForCard(featuredProperty)} featured={true} favouriteIds={favouriteIds} />
        </div>
      )}

      {/* Property grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={transformPropertyForCard(property)} favouriteIds={favouriteIds} />
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