'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import PropertyCard from "@/components/properties/PropertyCard";
import {
  MagnifyingGlassIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import TestimonialsCarousel from "@/components/testimonials/TestimonialsCarousel";
import AdvancedSearch from "@/components/search/AdvancedSearch";
import Hero from "@/sections/Hero";
import { Property } from "@/types/property";
import { useKeenSlider } from "keen-slider/react";

// API base
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

// --- TYPES ---
interface DatabaseProperty {
  Property_ID: number;
  Property_Ref: string | string[];
  Property_Address: string;
  Public_Price: number;
  Bedrooms: number;
  Bathrooms: number;
  Property_Type_ID: number;
  Area_ID: number;
  SubArea_ID: number;
  GPS_Latitude?: number;
  GPS_Longitude?: number;
  Property_Notes?: string;
  Display: number;
  Build_Size?: number;
  Plot_Size?: number;
  Year_Built?: number;
  Featured?: boolean;
  Exclusive?: boolean;
  Original_Price?: number;
  Num_Photos?: number;
  SQM_Built?: number;
}

interface RegionCount {
  regionId: number;
  region: string;
  count: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  total?: number;
  page?: number;
  pageSize?: number;
}

interface PropertyType {
  id: number;
  name: string;
  code: string;
}

// --- API SERVICE ---
const propertyService = {
  async getFeaturedProperties(page = 1, pageSize = 9): Promise<DatabaseProperty[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/properties/featured?page=${page}&pageSize=${pageSize}`);
      const data: ApiResponse<DatabaseProperty[]> = await res.json();
      return data.success ? data.data : [];
    } catch (err) {
      console.error("Error fetching featured properties:", err);
      return [];
    }
  },

  async getExclusiveProperties(): Promise<DatabaseProperty[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/properties?pageSize=3&includeHidden=false`);
      const data: ApiResponse<DatabaseProperty[]> = await res.json();
      return data.success ? data.data : [];
    } catch (err) {
      console.error("Error fetching exclusive properties:", err);
      return [];
    }
  },

  async getRegionCounts(): Promise<RegionCount[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/properties/regions/counts`);
      const data: ApiResponse<{ regions: RegionCount[] }> = await res.json();
      return data.success ? data.data.regions : [];
    } catch (err) {
      console.error("Error fetching region counts:", err);
      return [];
    }
  },

  async searchByReference(ref: string): Promise<DatabaseProperty | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/properties?ref=${encodeURIComponent(ref)}`);
      const data: ApiResponse<DatabaseProperty> = await res.json();
      return data.success ? data.data : null;
    } catch (err) {
      console.error("Error searching property:", err);
      return null;
    }
  },

  async getPropertyTypes(): Promise<PropertyType[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/properties/types`);
      const data: ApiResponse<PropertyType[]> = await res.json();
      return data.success ? data.data : [];
    } catch (err) {
      console.error("Error fetching property types:", err);
      return [];
    }
  }
};

// --- PROPERTY CARD TRANSFORM ---
interface PropertyForCard {
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
}

const transformPropertyForCard = (
  db: DatabaseProperty,
  typesMap: Record<number, string>
): PropertyForCard => {
  const isReduced = Boolean(db.Original_Price && db.Original_Price > db.Public_Price);
  const savingsAmount = isReduced ? db.Original_Price! - db.Public_Price : 0;

  const refArray = Array.isArray(db.Property_Ref) ? db.Property_Ref : [db.Property_Ref];
  const uniqueRef = Array.from(new Set(refArray));
  const propertyRef = uniqueRef[0];

  const propertyType = typesMap[db.Property_Type_ID] || "Property";

  // Generate image URLs dynamically based on Num_Photos
  const imageCount = db.Num_Photos && db.Num_Photos > 0 ? db.Num_Photos : 1;
  const images = Array.from({ length: imageCount }, (_, i) => ({
    url: `https://www.inlandandalucia.com/images/photos/properties/${propertyRef}/${propertyRef}_${i + 1}.jpg`,
    alt: `${propertyType} (${propertyRef}) image ${i + 1}`,
    isFeatured: i === 0, // first image is featured
  }));

  return {
    id: db.Property_ID.toString(),
    title: `${propertyType} (${propertyRef})`,
    price: db.Public_Price,
    originalPrice: db.Original_Price,
    currency: 'EUR',
    shortDescription: db.Property_Notes || '',
    location: {
      town: db.Property_Address?.split(',')[0]?.trim() || 'Unknown',
      province: db.Property_Address?.split(',')[1]?.trim() || 'Andalucia',
    },
    features: {
      bedrooms: db.Bedrooms || 0,
      bathrooms: db.Bathrooms || 0,
      buildSize: db.SQM_Built || db.Build_Size || 0,
      type: propertyType,
    },
    images,
    isReduced,
    savingsAmount,
  };
};

// --- LOADING COMPONENTS ---
const PropertyCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="flex justify-between">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  </div>
);

const SectionLoader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-3xl font-bold text-primary-600">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-neutral-600 max-w-2xl">{subtitle}</p>
        )}
      </div>
    </div>
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12">
      {Array.from({ length: 3 }).map((_, i) => (
        <PropertyCardSkeleton key={`skeleton-${i}`} />
      ))}
    </div>
  </div>
);

// --- COMPONENT ---
export default function Home() {
  const [featuredProperties, setFeaturedProperties] = useState<PropertyForCard[]>([]);
  const [exclusiveProperties, setExclusiveProperties] = useState<PropertyForCard[]>([]);
  const [regionCounts, setRegionCounts] = useState<RegionCount[]>([]);

  // Separate loading states for each section
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [exclusiveLoading, setExclusiveLoading] = useState(true);
  const [regionsLoading, setRegionsLoading] = useState(true);
  const [typesLoading, setTypesLoading] = useState(true);

  const [searchRef, setSearchRef] = useState('');
  const [searching, setSearching] = useState(false);
  const [featuredPage, setFeaturedPage] = useState(1);
  const [propertyTypesMap, setPropertyTypesMap] = useState<Record<number, string>>({});

  function Autoplay(slider: any) {
    let timeout: ReturnType<typeof setTimeout>
    let mouseOver = false

    function clearNextTimeout() {
      clearTimeout(timeout)
    }

    function nextTimeout() {
      clearTimeout(timeout)
      if (mouseOver) return
      timeout = setTimeout(() => {
        slider.next()
      }, 2000) // autoplay every 2s
    }

    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => {
        mouseOver = true
        clearNextTimeout()
      })
      slider.container.addEventListener("mouseout", () => {
        mouseOver = false
        nextTimeout()
      })
      nextTimeout()
    })
    slider.on("dragStarted", clearNextTimeout)
    slider.on("animationEnded", nextTimeout)
    slider.on("updated", nextTimeout)
  }

  const [sliderRef] = useKeenSlider<HTMLDivElement>(
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
    [Autoplay]
  )

  // Load property types first
  useEffect(() => {
    const loadPropertyTypes = async () => {
      try {
        const typesList = await propertyService.getPropertyTypes();
        const typesMap: Record<number, string> = {};
        typesList.forEach((t) => {
          typesMap[t.id] = t.name;
        });
        setPropertyTypesMap(typesMap);
      } catch (err) {
        console.error("Error loading property types:", err);
      } finally {
        setTypesLoading(false);
      }
    };

    loadPropertyTypes();
  }, []);

  // Load featured properties
  useEffect(() => {
    const loadFeaturedProperties = async () => {
      if (typesLoading) return; // Wait for types to load first

      try {
        setFeaturedLoading(true);
        const featuredDb = await propertyService.getFeaturedProperties(featuredPage);
        setFeaturedProperties(featuredDb.map(p => transformPropertyForCard(p, propertyTypesMap)));
      } catch (err) {
        console.error("Error loading featured properties:", err);
      } finally {
        setFeaturedLoading(false);
      }
    };

    loadFeaturedProperties();
  }, [featuredPage, propertyTypesMap, typesLoading]);

  // Load exclusive properties
  useEffect(() => {
    const loadExclusiveProperties = async () => {
      if (typesLoading) return; // Wait for types to load first

      try {
        setExclusiveLoading(true);
        const exclusiveDb = await propertyService.getExclusiveProperties();
        setExclusiveProperties(exclusiveDb.map(p => transformPropertyForCard(p, propertyTypesMap)));
      } catch (err) {
        console.error("Error loading exclusive properties:", err);
      } finally {
        setExclusiveLoading(false);
      }
    };

    loadExclusiveProperties();
  }, [propertyTypesMap, typesLoading]);

  // Load regions
  useEffect(() => {
    const loadRegions = async () => {
      try {
        setRegionsLoading(true);
        const regionsDb = await propertyService.getRegionCounts();
        setRegionCounts(regionsDb);
      } catch (err) {
        console.error("Error loading regions:", err);
      } finally {
        setRegionsLoading(false);
      }
    };

    loadRegions();
  }, []);

  // --- QUICK SEARCH ---
  const handleQuickSearch = async () => {
    if (!searchRef.trim()) return;
    setSearching(true);

    const property = await propertyService.searchByReference(searchRef.trim());
    setSearching(false);

    if (property) {
      window.location.href = `/properties/${property.Property_ID}`;
    } else {
      alert("Property not found. Check the reference.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleQuickSearch();
    }
  };

  return (
    <div>
      {/* Hero Section - Always visible */}
      <Hero />

      {/* Advanced Search - Always visible */}
      <section className="pt-16 bg-gradient-to-b from-white to-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-xl p-8 pt-6 -mt-32 relative z-30 border border-neutral-100">
            <AdvancedSearch />
          </div>
        </div>
      </section>

      {/* Exclusive Properties */}
      {/* <section className="py-20 bg-neutral-50">
        {exclusiveLoading ? (
          <SectionLoader 
            title="Exclusive Properties" 
            subtitle="Loading our handpicked exclusive properties..."
          />
        ) : (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-primary-600 mb-8">Exclusive Properties</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {exclusiveProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </section> */}
      <section className="py-20 bg-neutral-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 pattern-dots pattern-neutral-800 pattern-bg-transparent pattern-size-4 pattern-opacity-10"></div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold text-primary-600 md:text-5xl">
              Exclusive Properties
            </h2>
            <p className="mt-4 text-neutral-600 text-lg">
              Special offers and recent price reductions on selected properties
            </p>
          </div>

          {exclusiveProperties.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {exclusiveProperties.slice(0, 3).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-500">No exclusive properties available at the moment.</p>
            </div>
          )}

          {/* View All Button */}
          <div className="mt-16 relative overflow-hidden bg-gradient-to-br from-[#1d3557] to-[#457b9d] rounded-xl shadow-xl mx-auto">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/30 blur-3xl"></div>
              <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-white/20 blur-3xl"></div>
            </div>
            <div className="relative z-10 px-8 py-16 text-center">
              <h3 className="text-4xl font-bold text-white mb-3">
                Looking for more exclusive offers?
              </h3>
              <p className="text-white/80 mb-8">
                We have additional properties with special price reductions
              </p>
              <Link
                href="/properties?exclusive=true"
                className="inline-flex items-center bg-white hover:bg-gray-100 text-[#1d3557] px-10 py-1 min-h-[56px] hover:bg-secondary-600 hover:text-white rounded-lg font-medium transition-colors shadow-md text-lg"
              >
                View All Exclusive Properties
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* Featured Properties */}
      <section className="pb-16 bg-neutral-50">
        {featuredLoading ? (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-primary-600">Featured Properties</h2>
                <p className="mt-2 text-neutral-600 max-w-2xl">
                  Loading our featured selection...
                </p>
              </div>
            </div>

            {/* Skeleton carousel */}
            <div className="mt-12 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <PropertyCardSkeleton key={`featured-skeleton-${i}`} />
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header with title and link */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-primary-600">Featured Properties</h2>
                <p className="mt-2 text-neutral-600 max-w-2xl">
                  Explore our handpicked selection of stunning properties across Inland Andalucia
                </p>
              </div>

              {/* Desktop link */}
              <div className="hidden sm:block mt-4 sm:mt-0">
                <Link
                  href="/properties"
                  className="inline-flex items-center text-primary-600 font-medium hover:underline"
                >
                  View all properties →
                </Link>
              </div>
            </div>

            {/* Mobile button */}
            <div className="mt-6 sm:hidden">
              <Link
                href="/properties"
                className="inline-block w-full rounded-md border border-primary-600 px-6 py-3 text-center font-medium text-primary-600 hover:bg-primary-50 transition-colors"
              >
                View All Properties
              </Link>
            </div>

            {/* Carousel */}
            {featuredProperties.length > 0 && (
              <div ref={sliderRef} className="keen-slider flex py-[20px] overflow-hidden mt-12">
                {featuredProperties.slice(0, 9).map((p) => (
                  <div key={p.id} className="keen-slider__slide">
                    <PropertyCard property={p} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Regions */}
      <section className="py-16 bg-white">
        {regionsLoading ? (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-8">Properties by Region</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={`region-skeleton-${i}`} className="bg-neutral-50 rounded-lg p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        ) : regionCounts.length > 0 ? (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-8">Properties by Region</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {regionCounts.map((r) => (
                <div key={r.regionId} className="bg-neutral-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">{r.region}</h3>
                  <p className="text-3xl font-bold text-primary-600 mb-2">{r.count}</p>
                  <p>Available Properties</p>
                  <Link
                    href={`/properties?regionId=${r.regionId}`}
                    className="mt-4 inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                  >
                    View Properties <ArrowRightIcon className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      {/* CTA Section - Always visible */}
      <section className="relative py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1512753360435-329c4535a9a7?auto=format&fit=crop&q=80"
            alt="Andalucian landscape"
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
            Ready to Find Your Spanish Paradise?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            Contact our team of local experts today to start your property journey in Inland Andalucia.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-white px-8 py-1 min-h-[50px] font-medium text-primary-800 shadow-md hover:bg-secondary-500 hover:text-white transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}