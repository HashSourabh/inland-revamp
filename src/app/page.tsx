'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from 'next-intl';
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
import PageOverlayLoader from '@/components/loader/PageOverlayLoader';
import { usePropertyData } from '@/hooks/usePropertyData';
import { useRegionData } from '@/hooks/useRegionData';
import { useFavouriteIds } from '@/hooks/useFavouriteIds';

// API base
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://inlandandalucia.onrender.com/api/v1';

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

// --- REQUEST DEDUPLICATION ---
const pendingRequests = new Map<string, Promise<any>>();

function dedupeRequest<T>(key: string, fn: () => Promise<T>): Promise<T> {
  if (pendingRequests.has(key)) {
    return pendingRequests.get(key)!;
  }
  const promise = fn().finally(() => {
    pendingRequests.delete(key);
  });
  pendingRequests.set(key, promise);
  return promise;
}

// --- COMPONENT ---
export default function Home() {
  const t = useTranslations('home');
  // Use cached property data
  const {
    featuredProperties,
    exclusiveProperties,
    propertyTypesMap,
    setFeaturedProperties,
    setExclusiveProperties,
    setPropertyTypesMap,
    updateLastFetchTime,
    needsRefresh,
    hasData,
    clearCache
  } = usePropertyData();
  const {
    regionCounts,
    fetchRegionCounts,
    isRegionCountsStale,
  } = useRegionData();

  // Local state for non-cached data
  const [featuredLoading, setFeaturedLoading] = useState(() => !hasData || needsRefresh);
  const [exclusiveLoading, setExclusiveLoading] = useState(() => !hasData || needsRefresh);
  const [regionsLoading, setRegionsLoading] = useState(false); // Defer regions loading
  const [typesLoading, setTypesLoading] = useState(() => Object.keys(propertyTypesMap).length === 0);
  const [searchRef, setSearchRef] = useState('');
  const [searching, setSearching] = useState(false);
  const [featuredPage, setFeaturedPage] = useState(1);

  // Track if initial load is complete
  const initialLoadComplete = useRef(false);
  const loadingStarted = useRef(false);

  // Favourite property IDs for the logged-in user (defer if not logged in)
  const favouriteIds = useFavouriteIds();

  // Add timeout to prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (featuredLoading) {
        console.warn('Featured properties loading timeout - setting to false');
        setFeaturedLoading(false);
      }
      if (exclusiveLoading) {
        console.warn('Exclusive properties loading timeout - setting to false');
        setExclusiveLoading(false);
      }
      if (typesLoading) {
        console.warn('Property types loading timeout - setting to false');
        setTypesLoading(false);
      }
    }, 8000); // Reduced to 8 seconds

    return () => clearTimeout(timeout);
  }, [featuredLoading, exclusiveLoading, typesLoading]);

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

  // Load property types first (only if not cached) - CRITICAL: needed for property transformation
  useEffect(() => {
    // Skip if already loaded
    if (Object.keys(propertyTypesMap).length > 0 && !needsRefresh) {
      setTypesLoading(false);
      return;
    }

    let mounted = true;
    const loadPropertyTypes = async () => {
      if (loadingStarted.current) return;
      loadingStarted.current = true;

      try {
        setTypesLoading(true);
        const typesList = await dedupeRequest('propertyTypes', () => propertyService.getPropertyTypes());
        
        if (!mounted) return;
        
        const typesMap: Record<number, string> = {};
        typesList.forEach((t) => {
          typesMap[t.id] = t.name;
        });
        setPropertyTypesMap(typesMap);
        updateLastFetchTime();
      } catch (err) {
        console.error("Error loading property types:", err);
      } finally {
        if (mounted) {
          setTypesLoading(false);
        }
        loadingStarted.current = false;
      }
    };

    loadPropertyTypes();
    
    return () => {
      mounted = false;
    };
  }, [propertyTypesMap, needsRefresh, setPropertyTypesMap, updateLastFetchTime]);

  // Load featured properties FIRST (critical - above the fold)
  useEffect(() => {
    // Skip if already loaded and not stale
    if (hasData && featuredProperties.length > 0 && !needsRefresh) {
      setFeaturedLoading(false);
      return;
    }

    let mounted = true;
    const loadFeatured = async () => {
      try {
        setFeaturedLoading(true);
        
        // Priority: Load featured properties first (most important)
        const featuredDb = await dedupeRequest(`featured-${featuredPage}`, () => 
          propertyService.getFeaturedProperties(featuredPage)
        );
        
        if (!mounted) return;
        
        // Transform with current types map (will re-transform when types load if needed)
        setFeaturedProperties(featuredDb.map(p => transformPropertyForCard(p, propertyTypesMap)));
        updateLastFetchTime();
        initialLoadComplete.current = true;
      } catch (err) {
        console.error("Error loading featured properties:", err);
      } finally {
        if (mounted) {
          setFeaturedLoading(false);
        }
      }
    };

    loadFeatured();
    
    return () => {
      mounted = false;
    };
  }, [featuredPage, hasData, needsRefresh, featuredProperties.length, propertyTypesMap, setFeaturedProperties, updateLastFetchTime]);

  // Note: Properties are transformed with types map when loaded
  // If types load after properties, they'll use "Property" as fallback
  // This is acceptable for performance - types are usually cached

  // Load exclusive properties AFTER featured (lower priority)
  useEffect(() => {
    // Skip if already loaded and not stale
    if (hasData && exclusiveProperties.length > 0 && !needsRefresh) {
      setExclusiveLoading(false);
      return;
    }

    let mounted = true;
    // Defer exclusive properties slightly to prioritize featured
    const timer = setTimeout(() => {
      const loadExclusive = async () => {
        try {
          setExclusiveLoading(true);
          
          const exclusiveDb = await dedupeRequest('exclusive', () => 
            propertyService.getExclusiveProperties()
          );
          
          if (!mounted) return;
          
          setExclusiveProperties(exclusiveDb.map(p => transformPropertyForCard(p, propertyTypesMap)));
          updateLastFetchTime();
        } catch (err) {
          console.error("Error loading exclusive properties:", err);
        } finally {
          if (mounted) {
            setExclusiveLoading(false);
          }
        }
      };

      loadExclusive();
    }, 200); // Small delay to prioritize featured properties

    return () => {
      clearTimeout(timer);
      mounted = false;
    };
  }, [hasData, needsRefresh, exclusiveProperties.length, propertyTypesMap, setExclusiveProperties, updateLastFetchTime]);

  // Load regions AFTER initial page load (deferred - not critical for first paint)
  useEffect(() => {
    // Skip if already loaded
    if (regionCounts.length > 0 && !isRegionCountsStale()) {
      return;
    }

    let mounted = true;
    // Defer regions loading until after critical content is loaded
    const timer = setTimeout(() => {
      const loadRegions = async () => {
        if (!mounted) return;
        setRegionsLoading(true);
        try {
          await fetchRegionCounts();
        } catch (err) {
          console.error("Error loading regions:", err);
        } finally {
          if (mounted) {
            setRegionsLoading(false);
          }
        }
      };

      loadRegions();
    }, 2000); // Load regions 2 seconds after page load (non-blocking)

    return () => {
      clearTimeout(timer);
      mounted = false;
    };
  }, [regionCounts.length, isRegionCountsStale, fetchRegionCounts]);

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

  const handleRefresh = () => {
    console.log('Manual refresh triggered');
    setFeaturedLoading(true);
    setExclusiveLoading(true);
    setTypesLoading(true);
    setRegionsLoading(true);
    setFeaturedPage(1);
    clearCache();
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
              {t('exclusive.title')}
            </h2>
            <p className="mt-4 text-neutral-600 text-lg">
              {t('exclusive.subtitle')}
            </p>
          </div>

          {exclusiveLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-neutral-600 font-medium mb-4">Loading Properties...</p>
              <button
                onClick={handleRefresh}
                className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
              >
                Refresh
              </button>
            </div>
          ) : exclusiveProperties.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {exclusiveProperties.slice(0, 3).map((property) => (
                <PropertyCard key={property.id} property={property} favouriteIds={favouriteIds} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-500">{t('exclusive.none')}</p>
              <p className="text-neutral-400 text-sm mt-2">
                Unable to load exclusive properties at this time. Please try refreshing the page.
              </p>
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
                {t('exclusive.moreTitle')}
              </h3>
              <p className="text-white/80 mb-8">
                {t('exclusive.moreSubtitle')}
              </p>
              <Link
                href="/properties?exclusive=true"
                className="inline-flex items-center bg-white hover:bg-gray-100 text-[#1d3557] px-10 py-1 min-h-[56px] hover:bg-secondary-600 hover:text-white rounded-lg font-medium transition-colors shadow-md text-lg"
              >
                {t('exclusive.viewAllExclusive')}
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
                <h2 className="text-3xl font-bold text-primary-600">{t('featured.title')}</h2>
                <p className="mt-2 text-neutral-600 max-w-2xl">
                  {t('featured.loading')}
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
                <h2 className="text-3xl font-bold text-primary-600">{t('featured.title')}</h2>
                <p className="mt-2 text-neutral-600 max-w-2xl">
                  {t('featured.subtitle')}
                </p>
              </div>

              {/* Desktop link */}
              <div className="hidden sm:block mt-4 sm:mt-0">
                <Link
                  href="/properties"
                  className="inline-flex items-center text-primary-600 font-medium hover:underline"
                >
                  {t('featured.viewAllLink')}
                </Link>
              </div>
            </div>

            {/* Mobile button */}
            <div className="mt-6 sm:hidden">
              <Link
                href="/properties"
                className="inline-block w-full rounded-md border border-primary-600 px-6 py-3 text-center font-medium text-primary-600 hover:bg-primary-50 transition-colors"
              >
                {t('featured.viewAllButton')}
              </Link>
            </div>

            {/* Carousel */}
            {featuredProperties.length > 0 && (
              <div ref={sliderRef} className="keen-slider flex py-[20px] overflow-hidden mt-12">
                {featuredProperties.slice(0, 9).map((p) => (
                  <div key={p.id} className="keen-slider__slide">
                    <PropertyCard property={p} favouriteIds={favouriteIds} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Regions */}
      {/* <section className="py-16 bg-white">
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
                  <h3 className="text-xl font-semibold mb-2">{r.regionName}</h3>
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
      </section> */}

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
            {t('cta.title')}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            {t('cta.subtitle')}
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-white px-8 py-1 min-h-[50px] font-medium text-primary-800 shadow-md hover:bg-secondary-500 hover:text-white transition-colors"
            >
              {t('cta.button')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}