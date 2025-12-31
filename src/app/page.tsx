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
import { usePropertyData } from '@/hooks/usePropertyData';
import { useRegionData } from '@/hooks/useRegionData';
import { useFavouriteIds } from '@/hooks/useFavouriteIds';
import type { PropertyForCard } from '@/context/PropertyCacheContext';

// API base
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://inlandandalucia.onrender.com/api/v1';

// --- TYPES ---
interface DatabaseProperty {
  Property_ID: number;
  Property_Ref: string | string[];
  Property_Address?: string;
  Public_Price: number;
  Bedrooms: number;
  Bathrooms: number;
  Property_Type_ID: number;
  PropertyType?: string; // Property type name from API (may be in different language)
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
  Area_Name?: string;
  Region_Name?: string;
  PropertyAddress?: string; // Backend may provide merged address
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
      if (!res.ok) {
        console.error(`Featured properties API error: ${res.status} ${res.statusText}`);
        return [];
      }
      const data: ApiResponse<DatabaseProperty[]> = await res.json();
      if (!data.success) {
        console.error("Featured properties API returned success: false", data);
        return [];
      }
      if (!data.data || !Array.isArray(data.data)) {
        console.error("Featured properties API returned invalid data format", data);
        return [];
      }
      console.log(`Loaded ${data.data.length} featured properties`);
      return data.data;
    } catch (err) {
      console.error("Error fetching featured properties:", err);
      return [];
    }
  },

  async getExclusiveProperties(): Promise<DatabaseProperty[]> {
    try {
      // Try to fetch exclusive properties - use a larger page size to get more options
      const res = await fetch(`${API_BASE_URL}/properties?pageSize=100&includeHidden=false`);
      if (!res.ok) {
        console.error(`Exclusive properties API error: ${res.status} ${res.statusText}`);
        return [];
      }
      const data: ApiResponse<DatabaseProperty[]> = await res.json();
      if (!data.success) {
        console.error("Exclusive properties API returned success: false", data);
        return [];
      }
      if (!data.data || !Array.isArray(data.data)) {
        console.error("Exclusive properties API returned invalid data format", data);
        return [];
      }
      
      console.log(`Total properties from API: ${data.data.length}`);
      console.log('Sample property:', data.data[0]);
      
      // Filter for exclusive properties - check multiple conditions
      // 1. Explicit Exclusive field
      // 2. Properties with price reductions (Original_Price > Public_Price)
      // 3. If no exclusive found, use first 3 properties as fallback
      let exclusive = data.data.filter(p => {
        const hasExclusiveFlag = p.Exclusive === true || 
                                 (typeof p.Exclusive === 'number' && p.Exclusive === 1) ||
                                 (typeof p.Exclusive === 'string' && p.Exclusive === '1');
        const hasPriceReduction = p.Original_Price && 
                                  p.Public_Price && 
                                  p.Original_Price > p.Public_Price;
        return hasExclusiveFlag || hasPriceReduction;
      });
      
      console.log(`Found ${exclusive.length} exclusive properties (filtered)`);
      
      // If no exclusive properties found by filter, use first 3 properties as fallback
      if (exclusive.length === 0) {
        console.log('No exclusive properties found by filter, using first 3 properties as fallback');
        exclusive = data.data.slice(0, 3);
      } else {
        // Take first 3 exclusive properties
        exclusive = exclusive.slice(0, 3);
      }
      
      console.log(`Returning ${exclusive.length} exclusive properties`);
      return exclusive;
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
// PropertyForCard is imported from context

const transformPropertyForCard = (
  db: DatabaseProperty,
  typesMap: Record<number, string>,
  tCommon?: any
): PropertyForCard => {
  // Only consider reduced if Original_Price exists, is greater than 0, and is greater than Public_Price
  const hasValidOriginalPrice = db.Original_Price && db.Original_Price > 0;
  const isReduced = Boolean(hasValidOriginalPrice && db.Original_Price && db.Original_Price > db.Public_Price);
  const savingsAmount = isReduced && db.Original_Price ? db.Original_Price - db.Public_Price : 0;

  const refArray = Array.isArray(db.Property_Ref) ? db.Property_Ref : [db.Property_Ref];
  const uniqueRef = Array.from(new Set(refArray));
  const propertyRef = uniqueRef[0];

  // Get property type with priority:
  // 1. Look up by Property_Type_ID in types map (translated to current language)
  // 2. Use PropertyType from API (may be in different language, but better than generic)
  // 3. Fallback to generic "Property" only if nothing else available
  let propertyType: string;
  if (db.Property_Type_ID && typesMap && typesMap[db.Property_Type_ID]) {
    propertyType = typesMap[db.Property_Type_ID];
  } else if (db.PropertyType && db.PropertyType.trim() !== '') {
    propertyType = db.PropertyType;
  } else {
    propertyType = tCommon?.('property') || 'Property';
  }

  // Generate image URLs dynamically based on Num_Photos
  const imageCount = db.Num_Photos && db.Num_Photos > 0 ? db.Num_Photos : 1;
  const images = Array.from({ length: imageCount }, (_, i) => ({
    url: `https://www.inlandandalucia.com/images/photos/properties/${propertyRef}/${propertyRef}_${i + 1}.jpg`,
    alt: `${propertyType} (${propertyRef}) ${tCommon?.('image') || 'image'} ${i + 1}`,
    isFeatured: i === 0, // first image is featured
  }));

  return {
    id: db.Property_ID.toString(),
    title: `${propertyType} (${propertyRef})`,
    price: db.Public_Price,
    // Only set originalPrice if it exists and is greater than 0
    originalPrice: (db.Original_Price && db.Original_Price > 0) ? db.Original_Price : undefined,
    currency: 'EUR',
    shortDescription: db.Property_Notes || '',
    location: {
      // Priority 1: If Property_Address exists, use it (split by comma)
      // Priority 2: Otherwise use Area_Name and Region_Name
      // Priority 3: If neither exists, return null (don't display location)
      town: db.Property_Address?.trim() 
            ? db.Property_Address.split(',')[0]?.trim() || null
            : (db.Area_Name?.trim() || null),
      province: db.Property_Address?.trim()
                ? db.Property_Address.split(',')[1]?.trim() || null
                : (db.Region_Name?.trim() || null),
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
    <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300"></div>
    <div className="p-4 space-y-3">
      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div className="flex gap-2 mt-2">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
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
  const tCommon = useTranslations('common');
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
  // Always start with loading true on mount - will be set to false when data loads or if cached
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [exclusiveLoading, setExclusiveLoading] = useState(true);
  const [regionsLoading, setRegionsLoading] = useState(false); // Defer regions loading
  const [typesLoading, setTypesLoading] = useState(true);
  const [searchRef, setSearchRef] = useState('');
  const [searching, setSearching] = useState(false);
  const [featuredPage, setFeaturedPage] = useState(1);

  // Track if initial load is complete
  const initialLoadComplete = useRef(false);
  const loadingStarted = useRef(false);
  const hasLoadedOnce = useRef(false);

  // Favourite property IDs for the logged-in user (defer if not logged in)
  const favouriteIds = useFavouriteIds();

  // Initial check: If we have cached data, use it immediately
  // Priority: Exclusive first, then Featured
  useEffect(() => {
    // Check exclusive properties first (priority)
    if (exclusiveProperties.length > 0 && !needsRefresh) {
      setExclusiveLoading(false);
      hasLoadedOnce.current = true;
    } else {
      // If no cache or stale, ensure we load exclusive first
      setExclusiveLoading(true);
    }
    
    // Check featured properties second (loads after exclusive)
    if (featuredProperties.length > 0 && !needsRefresh) {
      setFeaturedLoading(false);
      hasLoadedOnce.current = true;
    } else {
      // If no cache or stale, will load after exclusive
      setFeaturedLoading(true);
    }
    
    // Property types can load in parallel
    if (Object.keys(propertyTypesMap).length > 0 && !needsRefresh) {
      setTypesLoading(false);
    } else {
      // If no cache or stale, ensure we load
      setTypesLoading(true);
    }
  }, []); // Run once on mount to check cache

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
  const [exclusiveSliderRef] = useKeenSlider<HTMLDivElement>(
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
    // If we have cached types and they're not stale, use them
    if (Object.keys(propertyTypesMap).length > 0 && !needsRefresh) {
      setTypesLoading(false);
      return;
    }

    // Prevent multiple simultaneous loads
    if (loadingStarted.current) return;
    loadingStarted.current = true;

    let mounted = true;
    const loadPropertyTypes = async () => {
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
  }, []); // Run once on mount

  // Load exclusive properties FIRST (priority)
  useEffect(() => {
    // If we have cached exclusive properties and they're not stale, skip loading
    if (exclusiveProperties.length > 0 && !needsRefresh) {
      setExclusiveLoading(false);
      return;
    }

    let mounted = true;
    const loadExclusive = async () => {
      try {
        console.log('Loading exclusive properties (priority)...');
        setExclusiveLoading(true);
        
        const exclusiveDb = await dedupeRequest('exclusive', () => 
          propertyService.getExclusiveProperties()
        );
        
        if (!mounted) return;
        
        console.log(`Loaded ${exclusiveDb.length} exclusive properties from API`);
        console.log('Exclusive DB data sample:', exclusiveDb[0]);
        
        if (exclusiveDb.length === 0) {
          console.warn('No exclusive properties returned from API - check filter logic');
          setExclusiveLoading(false);
          return;
        }
        
        // Transform with types map (use empty map if types not loaded yet, will retransform later)
        const transformed = exclusiveDb.map(p => transformPropertyForCard(p, propertyTypesMap, tCommon));
        console.log(`Transformed ${transformed.length} exclusive properties`);
        console.log('Transformed exclusive properties sample:', transformed[0]);
        
        setExclusiveProperties(transformed);
        updateLastFetchTime();
        hasLoadedOnce.current = true;
      } catch (err) {
        console.error("Error loading exclusive properties:", err);
      } finally {
        if (mounted) {
          setExclusiveLoading(false);
        }
      }
    };

    // Load exclusive properties immediately
    loadExclusive();
    
    return () => {
      mounted = false;
    };
  }, [needsRefresh]); // Depend on needsRefresh to retrigger when cache is stale

  // Re-transform properties when types map becomes available (if properties loaded first)
  // Note: This would require storing original DB data, so we'll reload if types change
  useEffect(() => {
    // If types just loaded and we have properties with generic types, trigger a reload
    if (!typesLoading && Object.keys(propertyTypesMap).length > 0) {
      const hasGenericTypes = featuredProperties.some(p => 
        !p.features.type || p.features.type === 'Property' || p.features.type === tCommon('property')
      );
      
      if (hasGenericTypes && featuredProperties.length > 0 && !featuredLoading) {
        console.log('Types loaded, retriggering featured properties load for proper types');
        setFeaturedPage(prev => prev); // Trigger reload by updating page
      }
    }
  }, [typesLoading, propertyTypesMap]); // Re-check when types are available

  // Load featured properties AFTER exclusive properties are loaded
  useEffect(() => {
    // If we have cached featured properties and they're not stale, skip loading
    if (featuredProperties.length > 0 && !needsRefresh) {
      setFeaturedLoading(false);
      return;
    }

    // Wait for exclusive properties to finish loading first
    // This ensures exclusive loads first, then featured
    // Check: if exclusive is still loading OR if exclusive hasn't loaded yet (and we're not using cache)
    const exclusiveIsReady = exclusiveProperties.length > 0 || (!exclusiveLoading && !needsRefresh);
    
    if (!exclusiveIsReady && exclusiveLoading) {
      console.log('Waiting for exclusive properties to load before loading featured...');
      return; // Wait for exclusive to finish
    }

    let mounted = true;
    const loadFeatured = async () => {
      try {
        console.log('Loading featured properties (after exclusive)...');
        setFeaturedLoading(true);
        
        const featuredDb = await dedupeRequest(`featured-${featuredPage}`, () => 
          propertyService.getFeaturedProperties(featuredPage)
        );
        
        if (!mounted) return;
        
        console.log(`Loaded ${featuredDb.length} featured properties from API`);
        
        // Transform with types map (use empty map if types not loaded yet, will retransform later)
        const transformed = featuredDb.map(p => transformPropertyForCard(p, propertyTypesMap, tCommon));
        setFeaturedProperties(transformed);
        updateLastFetchTime();
        initialLoadComplete.current = true;
        hasLoadedOnce.current = true;
        console.log(`Transformed ${transformed.length} featured properties`);
      } catch (err) {
        console.error("Error loading featured properties:", err);
      } finally {
        if (mounted) {
          setFeaturedLoading(false);
        }
      }
    };

    // Small delay to ensure exclusive properties are processed first
    const timer = setTimeout(() => {
      loadFeatured();
    }, 150); // Slightly longer delay to ensure exclusive is fully processed

    return () => {
      clearTimeout(timer);
      mounted = false;
    };
  }, [featuredPage, needsRefresh, exclusiveLoading, exclusiveProperties.length]); // Depend on exclusive loading state

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
      alert(tCommon('propertyNotFoundCheckRef'));
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
          <div className="bg-white rounded-xl shadow-xl sm:p-8 p-4 xs:p-6 pt-4 xs:pt-6 -mt-32 relative border border-neutral-100">
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
      <section className="sm:py-20 xs:py-16 py-12 bg-neutral-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 pattern-dots pattern-neutral-800 pattern-bg-transparent pattern-size-4 pattern-opacity-10"></div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center sm:mb-12 xs:mb-8 mb-6">
            <h2 className="font-heading text-2xl xs:text-3xl md:text-4xl font-bold text-primary-600 lg:text-5xl">
              {t('exclusive.title')}
            </h2>
            <p className="xs:mt-4 mt-2 text-neutral-600 text-sm xs:text-base sm:text-lg">
              {t('exclusive.subtitle')}
            </p>
          </div>

          {exclusiveLoading ? (
            <div className="grid gap-5 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <PropertyCardSkeleton key={`exclusive-skeleton-${i}`} />
              ))}
            </div>
          ) : exclusiveProperties.length > 0 ? (
            <>
              <div className="grid gap-5 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {exclusiveProperties.slice(0, 3).map((property) => (
                  <PropertyCard key={property.id} property={property} favouriteIds={favouriteIds} />
                ))}
              </div>
            
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-500">{t('exclusive.none')}</p>
              <p className="text-neutral-400 text-sm mt-2">
                {tCommon('unableToLoadExclusive')}
              </p>
            </div>
          )}



          {/* View All Button */}
          <div className="sm:mt-16 xs:mt-14 mt-12 relative overflow-hidden bg-gradient-to-br from-[#1d3557] to-[#457b9d] rounded-xl shadow-xl mx-auto">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/30 blur-3xl"></div>
              <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-white/20 blur-3xl"></div>
            </div>
            <div className="relative z-10 sm:px-8 xs:px-6 px-4 sm:py-16 xs:py-10 py-8 text-center">
              <h3 className="xs:mt-4 mt-2 text-white font-bold text-2xl xs:text-3xl md:text-4xl text-primary-600 lg:text-5xl mb-4">
                {t('exclusive.moreTitle')}
              </h3>
              <p className="text-white/80 sm:mb-8 mb-6 text-sm xs:text-base sm:text-lg">
                {t('exclusive.moreSubtitle')}
              </p>
              <Link
                href="/properties?exclusive=true"
                className="inline-flex items-center bg-white hover:bg-gray-100 text-[#1d3557] xs:px-6 px-4 sm:px-10 py-1 sm:min-h-[56px] min-h-[42px] hover:bg-secondary-600 hover:text-white rounded-lg font-medium transition-colors shadow-md sm:text-lg xs:text-base text-sm"
              >
                {t('exclusive.viewAllExclusive')}
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* Featured Properties */}
      <section className="sm:pb-16 xs:pb-10 pb-8 bg-neutral-50">
        {featuredLoading ? (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-heading text-2xl xs:text-3xl md:text-4xl font-bold text-primary-600 lg:text-5xl">{t('featured.title')}</h2>
                <p className="xs:mt-4 mt-2 text-neutral-600 text-sm xs:text-base sm:text-lg">
                  {t('featured.loading')}
                </p>
              </div>
            </div>

            {/* Skeleton carousel - show more skeletons for carousel */}
            <div className="mt-12">
              <div className="flex gap-4 overflow-hidden">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={`featured-skeleton-${i}`} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3">
                    <PropertyCardSkeleton />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header with title and link */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <h2 className="font-heading text-2xl xs:text-3xl md:text-4xl font-bold text-primary-600 lg:text-5xl">{t('featured.title')}</h2>
                <p className="xs:mt-4 mt-2 text-neutral-600 text-sm xs:text-base sm:text-lg">
                  {t('featured.subtitle')}
                </p>
              </div>

              {/* Desktop link */}
              <div className="hidden sm:block mt-4 sm:mt-0">
                <Link
                  href="/properties"
                  className="inline-flex items-center text-primary-600 font-medium hover:underline text-sm xs:text-base whitespace-nowrap "
                >
                  {t('featured.viewAllLink')}
                </Link>
              </div>
            </div>

            {/* Mobile button */}
            <div className="xs:mt-6 mt-4 sm:hidden">
              <Link
                href="/properties"
                className="inline-block w-full rounded-md border border-primary-600 px-4 sm:px-6 py-2 sm:py-3 text-center font-medium text-primary-600 hover:bg-primary-50 transition-colors text-sm xs:text-base"
              >
                {t('featured.viewAllButton')}
              </Link>
            </div>

            {/* Carousel */}
            {featuredProperties.length > 0 ? (
              <div ref={sliderRef} className="keen-slider flex py-[20px] overflow-hidden sm:mt-12 xs:mt-8 mt-5">
                {featuredProperties.slice(0, 9).map((p) => (
                  <div key={p.id} className="keen-slider__slide">
                    <PropertyCard property={p} favouriteIds={favouriteIds} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 mt-12">
                <p className="text-neutral-500">{tCommon('noFeaturedProperties')}</p>
                <p className="text-neutral-400 text-sm mt-2">
                  {tCommon('pleaseCheckBackLater')}
                </p>
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
      <section className="relative py-14 sm:py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1512753360435-329c4535a9a7?auto=format&fit=crop&q=80"
            alt={tCommon('andalucianLandscape')}
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-white md:text-5xl">
            {t('cta.title')}
          </h2>
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-basesm:text-xl text-white/90">
            {t('cta.subtitle')}
          </p>
          <div className="mt-7 sm:mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-white px-8 py-1 sm:min-h-[50px] min-h-[40px] font-medium text-primary-800 shadow-md hover:bg-secondary-500 hover:text-white transition-colors"
            >
              {t('cta.button')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}