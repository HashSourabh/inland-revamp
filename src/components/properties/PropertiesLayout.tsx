'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Property } from '@/types/property';
import PropertyCard from '@/components/properties/PropertyCard';
import LayoutSwitcher from '@/components/properties/LayoutSwitcher';
import AreaFilter from '@/components/properties/AreaFilter';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useRegionData } from '@/hooks/useRegionData';
import { useFavouriteIds } from '@/hooks/useFavouriteIds';
import { usePropertyCache } from '@/context/PropertyCacheContext';
import { fetchPropertyTypes, PropertyType } from '@/utils/api';
import { useLocale } from 'next-intl';

const transformPropertyForCard = (property: any, propertyTypesMap: Record<number, string>, tCommon?: any) => {
  // Try to get property type from various sources, with priority order:
  // 1. Look up by Property_Type_ID using the types map (this has the correct language)
  // 2. PropertyType from API (always use this if available, even if map lookup fails)
  // 3. Only use generic "Property" as last resort if nothing else is available
  // Ensure propertyType is always a string (never undefined)
  let propertyType: string = tCommon?.('property') || 'Property'; // Default fallback
  
  // First priority: Look up by Property_Type_ID in the types map (translated to current language)
  if (property.Property_Type_ID && propertyTypesMap && propertyTypesMap[property.Property_Type_ID]) {
    propertyType = propertyTypesMap[property.Property_Type_ID];
  }
  // Second priority: Use PropertyType from API (always prefer this over generic "Property")
  // This ensures we show "Apartment" instead of "Propriété" if map lookup fails
  else if (property.PropertyType && property.PropertyType.trim() !== '') {
    propertyType = property.PropertyType;
  }
  // Third priority: Try propertyTypeName
  else if (property.propertyTypeName && property.propertyTypeName.trim() !== '') {
    propertyType = property.propertyTypeName;
  }

  const propertyRef = property.propertyRef || property.Property_Ref;

  const title =
    propertyType && propertyRef
      ? `${propertyType} (${propertyRef})`
      : propertyType || propertyRef || (tCommon?.('untitledProperty') || 'Untitled Property');

  const imageCount =
    property.Num_Photos && property.Num_Photos > 0 ? property.Num_Photos : 1;

  const images = Array.from({ length: imageCount }, (_, i) => ({
    url: `https://www.inlandandalucia.com/images/photos/properties/${propertyRef}/${propertyRef}_${i + 1}.jpg`,
    alt: `${propertyType} (${propertyRef}) ${tCommon?.('image') || 'image'} ${i + 1}`,
    isFeatured: i === 0,
  }));

  const address = property.Property_Address || property.address || '';
  const addressParts = address
    .split(',')
    .map((part: string) => part.trim())
    .filter(Boolean);

  return {
    id: property.id?.toString() || property.Property_ID?.toString() || "",
    title,
    price: property.price ?? property.Public_Price ?? 0,
    // Only set originalPrice if it exists and is greater than 0
    originalPrice: (property.originalPrice && property.originalPrice > 0) 
      ? property.originalPrice 
      : ((property.Original_Price && property.Original_Price > 0) ? property.Original_Price : undefined),
    currency: "EUR",
    shortDescription: property.short_description || property.Property_Notes || "",
    location: {
      // Priority 1: If Property_Address exists, use it (split by comma)
      // Priority 2: Otherwise use Area_Name and Region_Name
      // Priority 3: If neither exists, return null (don't display location)
      town: property.Property_Address?.trim()
            ? property.Property_Address.split(',')[0]?.trim() || null
            : (property.Area_Name?.trim() || property.town?.trim() || (addressParts.length > 0 ? addressParts[0] : null)),
      province: property.Property_Address?.trim()
                ? property.Property_Address.split(',')[1]?.trim() || null
                : (property.Region_Name?.trim() || property.province?.trim() || (addressParts.length > 1 ? addressParts[addressParts.length - 1] : null)),
    },
    features: {
      bedrooms: property.Bedrooms ?? property.bedrooms ?? 0,
      bathrooms: property.Bathrooms ?? property.bathrooms ?? 0,
      buildSize:
        property.squareMeters ??
        property.SQM_Built ??
        property.Build_Size ??
        0,
      type: propertyType,
    },
    images,
    // Only consider reduced if Original_Price exists, is greater than 0, and is greater than Public_Price
    isReduced:
      property.Original_Price && 
      property.Original_Price > 0 && 
      property.Original_Price > (property.Public_Price || property.price || 0),
    savingsAmount:
      property.Original_Price && 
      property.Original_Price > 0 && 
      property.Public_Price
        ? property.Original_Price - (property.Public_Price || property.price || 0)
        : 0,
  };
};

const PROPERTIES_PER_PAGE = 10;

interface PropertiesLayoutProps {
  properties?: Property[];
  total?: number;
  totalPages?: number;
}

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

const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
  </div>
);

const PageOverlayLoader = ({ tCommon }: { tCommon: any }) => (
  <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      <p className="text-neutral-600 font-medium">{tCommon('loadingProperties')}</p>
    </div>
  </div>
);

export default function PropertiesLayout({
  properties: initialProperties = [],
  total: initialTotal = 0,
  totalPages: initialTotalPages = 1,
}: PropertiesLayoutProps) {
  const t = useTranslations('properties');
  const tCommon = useTranslations('common');
  const tFilters = useTranslations('home.filters');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { regionCounts: cachedRegionCounts, areasCache, fetchRegionCounts, fetchAreas } = useRegionData();
  const [regionCounts, setRegionCounts] = useState<Array<{ regionId: number; regionName: string; count: number }>>([]);
  const { propertyTypesMap, setPropertyTypesMap } = usePropertyCache();

  // Map locale to language ID
  const localeToLanguageId: Record<string, number> = {
    'en': 1,
    'es': 2,
    'fr': 3,
    'pt': 8,
    'de': 4,
  };
  const languageId = localeToLanguageId[locale] || 1;
  
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedTown, setSelectedTown] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Track mobile state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Wrapper for setLayout that prevents list view on mobile
  const handleLayoutChange = (newLayout: 'grid' | 'list') => {
    // Force grid layout on screens below 768px
    if (isMobile) {
      setLayout('grid');
    } else {
      setLayout(newLayout);
    }
  };

  // Force grid layout on mobile (below 768px) when window resizes
  useEffect(() => {
    if (isMobile && layout === 'list') {
      setLayout('grid');
    }
  }, [isMobile, layout]);

  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [selectedArea, setSelectedArea] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // Total properties count from API (for sidebar/info)
  const [totalPropertiesCount, setTotalPropertiesCount] = useState<number>(0);

  // Get areas for selected region from cache
  const areas = selectedRegion ? areasCache.get(selectedRegion) || [] : [];

  const [properties, setProperties] = useState<Property[]>([]);
  const [totalProperties, setTotalProperties] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [pageLoading, setPageLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [firstLoadFromParams, setFirstLoadFromParams] = useState(true);
  const [selectedPropertyType, setSelectedPropertyType] = useState<string | null>(null);
  const [minBeds, setMinBeds] = useState<string | null>(null);
  const [minBaths, setMinBaths] = useState<string | null>(null);
  const [minPrice, setminPrice] = useState<string | null>(null);
  const [maxPrice, setmaxPrice] = useState<string | null>(null);
  const [propertyTypesList, setPropertyTypesList] = useState<PropertyType[]>([]);
  const [sortBy, setSortBy] = useState<string>('id');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');

  // Favourite property IDs for the logged-in user
  const favouriteIds = useFavouriteIds();

  // Refs to prevent race conditions and manage API calls
  const fetchPropertiesRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const propertyTypesLoadedRef = useRef(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastFetchParamsRef = useRef<string>(''); // Track last fetch params to prevent duplicate calls

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || 'https://inlandandalucia.onrender.com/api/v1';

  // Load property types FIRST (priority) - must complete before properties load
  useEffect(() => {
    let mounted = true;
    const loadPropertyTypes = async () => {
      try {
        // Check cache first - if we already have types for this language, skip
        if (Object.keys(propertyTypesMap).length > 0) {
          propertyTypesLoadedRef.current = true;
          return;
        }

        // Fetch property types with current language ID
        const res = await fetch(`${API_BASE_URL}/properties/types?languageId=${languageId}`);
        if (!res.ok) throw new Error(`Failed: ${res.status}`);

        const data = await res.json();
        if (data?.success && data.data && mounted) {
          const typesMap: Record<number, string> = {};
          const typesList: PropertyType[] = [];
          data.data.forEach((type: any) => {
            typesMap[type.id] = type.name;
            typesList.push({
              id: type.id,
              name: type.name,
              code: type.code || String(type.id)
            });
          });
          // Always update the map when language changes to ensure correct translations
          setPropertyTypesMap(typesMap);
          setPropertyTypesList(typesList);
          propertyTypesLoadedRef.current = true;
        }
      } catch (err) {
        console.error("Error loading property types:", err);
        // Even on error, mark as loaded to prevent blocking
        propertyTypesLoadedRef.current = true;
      }
    };

    // Always try to load (will check cache inside)
    // If cache exists, mark as loaded immediately
    if (Object.keys(propertyTypesMap).length > 0) {
      propertyTypesLoadedRef.current = true;
    } else {
      loadPropertyTypes();
    }
    
    return () => {
      mounted = false;
    };
  }, [languageId, setPropertyTypesMap, API_BASE_URL]); // Removed propertyTypesMap to prevent loops

  // Consolidated useEffect for search parameters - only on mount or when searchParams change
  useEffect(() => {
    if (!searchParams) return;

    // Extract all parameters at once
    const regionIdParam = searchParams.get('regionId');
    const areaIdParam = searchParams.get('areaId');
    const provinceParam = searchParams.get('province');
    const townParam = searchParams.get('town');
    const propertyTypeParam = searchParams.get('propertyType');
    const minBedsParam = searchParams.get('minBeds');
    const minBathsParam = searchParams.get('minBaths');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const locationParam = searchParams.get('location');

    // Only update state if params exist in URL (don't reset user selections)
    if (regionIdParam !== null) {
      setSelectedRegion(regionIdParam ? Number(regionIdParam) : null);
    }
    if (areaIdParam !== null) {
      setSelectedArea(areaIdParam ? Number(areaIdParam) : null);
    }
    if (provinceParam !== null) {
      setSelectedProvince(provinceParam || null);
    }
    if (townParam !== null) {
      setSelectedTown(townParam || null);
    }
    if (propertyTypeParam !== null) {
      setSelectedPropertyType(propertyTypeParam || null);
    }
    if (minBedsParam !== null) {
      setMinBeds(minBedsParam || null);
    }
    if (minBathsParam !== null) {
      setMinBaths(minBathsParam || null);
    }
    if (minPriceParam !== null) {
      setminPrice(minPriceParam || null);
    }
    if (maxPriceParam !== null) {
      setmaxPrice(maxPriceParam || null);
    }

    // Handle location parameter
    if (locationParam && !provinceParam && !townParam) {
      // Only use location if we have properties loaded
      if (properties.length > 0) {
        const property = properties.find(
          (p) => p.location?.town === locationParam,
        );
        if (property) {
          setSelectedProvince(property.location?.province ?? null);
          setSelectedTown(property.location?.town ?? null);
        }
      }
    }

    // Reset to page 1 when filters change
    setCurrentPage(1);
  }, [searchParams]); // Only depend on searchParams, not properties

  // Initialize region counts from cache on mount
  useEffect(() => {
    if (cachedRegionCounts.length > 0 && regionCounts.length === 0) {
      setRegionCounts(cachedRegionCounts);
      const totalCount = cachedRegionCounts.reduce((sum: number, region: any) => sum + region.count, 0);
      setTotalPropertiesCount(totalCount);
    }
  }, [cachedRegionCounts]);

  // Fetch region counts with current filters applied
  // This updates whenever filters change to show accurate counts
  useEffect(() => {
    const loadRegionCounts = async () => {
      try {
        // Build filter object from current filter state
        const filters = {
          propertyType: selectedPropertyType || undefined,
          minBeds: minBeds || undefined,
          minBaths: minBaths || undefined,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
        };

        console.log('[PROPERTIES LAYOUT] Fetching region counts with filters:', filters);
        
        const counts = await fetchRegionCounts(filters);
        
        // Update region counts state
        setRegionCounts(counts);
        
        // Calculate total properties count from region counts
        const totalCount = counts.reduce((sum: number, region: any) => sum + region.count, 0);
        setTotalPropertiesCount(totalCount);
        
        console.log('[PROPERTIES LAYOUT] Region counts updated:', {
          totalCount,
          regionCounts: counts.length,
          counts
        });
      } catch (err) {
        console.error("Error loading region counts:", err);
        setTotalPropertiesCount(0);
      }
    };

    // Debounce region counts fetch to avoid too many requests
    const timeoutId = setTimeout(() => {
      loadRegionCounts();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [fetchRegionCounts, selectedPropertyType, minBeds, minBaths, minPrice, maxPrice]);

  // Fetch areas when a region is selected (using cache)
  // This is non-blocking and can run in parallel with properties fetch
  useEffect(() => {
    if (!selectedRegion) {
      return;
    }

    let mounted = true;
    const loadAreas = async () => {
      try {
        await fetchAreas(selectedRegion);
      } catch (err) {
        if (mounted) {
          console.error("Error loading areas:", err);
        }
      }
    };

    loadAreas();
    
    return () => {
      mounted = false;
    };
  }, [selectedRegion, fetchAreas]);

  // Main properties fetch effect with race condition prevention, debouncing, and sequencing
  useEffect(() => {
    console.log('[PROPERTIES FETCH] useEffect triggered');
    console.log('[PROPERTIES FETCH] Dependencies:', {
      currentPage,
      selectedProvince,
      selectedTown,
      selectedRegion,
      selectedArea,
      selectedPropertyType,
      minBeds,
      minBaths,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder,
      initialLoad
    });

    // Don't block properties fetch - it can load independently
    // Property types are used for transformation, not blocking

    // Cancel any pending debounce timer
    if (debounceTimerRef.current) {
      console.log('[PROPERTIES FETCH] Clearing debounce timer');
      clearTimeout(debounceTimerRef.current);
    }

    // Cancel any in-flight request
    if (abortControllerRef.current) {
      console.log('[PROPERTIES FETCH] Aborting previous request');
      abortControllerRef.current.abort();
    }

    // Clear old properties and show loading immediately when filters change
    // This prevents showing stale data (glitch) before new data loads
    if (!initialLoad) {
      console.log('[PROPERTIES FETCH] Clearing properties and showing loading (not initial load)');
      setProperties([]);
      setLoading(true);
      setError(null);
      // Reset last fetch params to allow new fetch (prevents duplicate detection)
      lastFetchParamsRef.current = '';
    }

    // Create new AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    // Debounce filter changes (but not page changes or initial load)
    const shouldDebounce = initialLoad === false;
    const delay = shouldDebounce ? 300 : 0;
    console.log('[PROPERTIES FETCH] Debounce settings - shouldDebounce:', shouldDebounce, 'delay:', delay);

    debounceTimerRef.current = setTimeout(() => {
      const fetchProperties = async () => {
        console.log('[PROPERTIES FETCH] fetchProperties function called');
        console.log('[PROPERTIES FETCH] Current sort state - sortBy:', sortBy, 'sortOrder:', sortOrder);
        
        // Build query params - always include sort parameters
        const queryParams: Record<string, string> = {
          page: String(currentPage),
          limit: String(PROPERTIES_PER_PAGE),
          sortBy: sortBy || 'id',
          sortOrder: sortOrder || 'DESC',
        };
        
        console.log('[PROPERTIES FETCH] Sort parameters being sent:', {
          sortBy: queryParams.sortBy,
          sortOrder: queryParams.sortOrder
        });
        
        console.log('[PROPERTIES FETCH] Base query params:', queryParams);
        
        // Add optional filters
        if (selectedProvince) queryParams.province = selectedProvince;
        if (selectedTown) queryParams.town = selectedTown;
        if (selectedRegion) queryParams.regionId = String(selectedRegion);
        if (selectedArea) queryParams.areaId = String(selectedArea);
        if (selectedPropertyType) queryParams.propertyType = selectedPropertyType;
        if (minBeds) queryParams.minBeds = minBeds;
        if (minBaths) queryParams.minBaths = minBaths;
        if (minPrice) queryParams.minPrice = minPrice;
        if (maxPrice) queryParams.maxPrice = maxPrice;

        const query = new URLSearchParams(queryParams);
        const queryString = query.toString();
        
        console.log('[PROPERTIES FETCH] Final query params:', queryParams);
        console.log('[PROPERTIES FETCH] Query string:', queryString);
        console.log('[PROPERTIES FETCH] Last fetch params:', lastFetchParamsRef.current);
        
        // Prevent duplicate fetches with the same parameters (only for subsequent loads)
        // Allow initial load and page changes even if params are the same
        const isPageChange = lastFetchParamsRef.current !== '' && 
                            lastFetchParamsRef.current.split('&').find(p => p.startsWith('page=')) !== 
                            queryString.split('&').find(p => p.startsWith('page='));
        
        console.log('[PROPERTIES FETCH] isPageChange:', isPageChange);
        console.log('[PROPERTIES FETCH] Will skip duplicate?', lastFetchParamsRef.current === queryString && !initialLoad && !isPageChange);
        
        // Only skip if it's the exact same query AND not initial load AND not a page change
        if (lastFetchParamsRef.current === queryString && !initialLoad && !isPageChange) {
          console.log('[PROPERTIES FETCH] ⚠️ SKIPPING duplicate properties fetch:', queryString);
          return; // Skip duplicate fetch
        }
        
        console.log('[PROPERTIES FETCH] ✅ Fetching properties with params:', queryString);
        // Update last fetch params before making the request
        lastFetchParamsRef.current = queryString;

        // Increment fetch counter
        const currentFetch = ++fetchPropertiesRef.current;

        // Check if request was aborted
        if (abortController.signal.aborted) {
          return;
        }

        // Loading state is already set above for filter changes
        // Only set it here for initial load
        if (initialLoad) {
          setError(null);
          setLoading(true);
        } else {
          setError(null);
          // Loading already set when filters changed
        }

        try {
          const url = `${API_BASE_URL}/properties?${queryString}`;
          console.log('[PROPERTIES FETCH] 🌐 Making API request to:', url);

          const res = await fetch(url, {
            signal: abortController.signal,
          });

          console.log('[PROPERTIES FETCH] 📡 API response status:', res.status, res.statusText);

          if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

          const data = await res.json();
          console.log('[PROPERTIES FETCH] 📦 API response data:', {
            success: data.success,
            propertiesCount: data.data?.length || 0,
            total: data.pagination?.total || data.total,
            sortBy: queryParams.sortBy,
            sortOrder: queryParams.sortOrder
          });

          // Check if this is still the latest fetch and not aborted
          if (currentFetch !== fetchPropertiesRef.current || abortController.signal.aborted) {
            return;
          }

          if (data.success) {
            const newProperties = data.data ? [...data.data] : [];
            const total = data.pagination?.total ?? data.total ?? (data.data?.length || 0);
            const pages = data.pagination?.totalPages ?? data.totalPages ?? Math.ceil(total / PROPERTIES_PER_PAGE);

            console.log('[PROPERTIES FETCH] ✅ Success! Setting properties:', {
              propertiesCount: newProperties.length,
              total,
              pages,
              firstPropertyTitle: newProperties[0]?.title || newProperties[0]?.Property_Ref || 'N/A'
            });

            setProperties(newProperties);
            setTotalProperties(total); // This should be the filtered count
            setTotalPages(pages);
          } else {
            console.error('[PROPERTIES FETCH] ❌ API returned success: false');
            setProperties([]);
            setTotalProperties(0);
            setTotalPages(1);
          }
        } catch (err) {
          // Ignore abort errors
          if (err instanceof Error && err.name === 'AbortError') {
            console.log('[PROPERTIES FETCH] ⏹️ Request was aborted');
            return;
          }

          console.error('[PROPERTIES FETCH] ❌ Error fetching properties:', err);
          console.error('[PROPERTIES FETCH] Error details:', {
            name: err instanceof Error ? err.name : 'Unknown',
            message: err instanceof Error ? err.message : String(err),
            currentFetch,
            fetchPropertiesRef: fetchPropertiesRef.current,
            aborted: abortController.signal.aborted
          });

          if (currentFetch === fetchPropertiesRef.current && !abortController.signal.aborted) {
            setError(err instanceof Error ? err.message : tCommon('failedToLoadProperties'));
            setProperties([]);
            setTotalProperties(0);
            setTotalPages(1);
          }
        } finally {
          if (currentFetch === fetchPropertiesRef.current && !abortController.signal.aborted) {
            console.log('[PROPERTIES FETCH] 🏁 Fetch completed, setting loading to false');
            setLoading(false);
            setPageLoading(false);
            // Mark initial load as complete after first fetch
            if (initialLoad) {
              console.log('[PROPERTIES FETCH] Marking initial load as complete');
              setInitialLoad(false);
            }
          }
        }
      };

      // Always call fetchProperties - don't skip
      fetchProperties();
    }, delay);

    // Cleanup function
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [
    currentPage,
    selectedProvince,
    selectedTown,
    selectedRegion,
    selectedArea,
    selectedPropertyType,
    minBeds,
    minBaths,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
    API_BASE_URL,
    initialLoad,
    tCommon,
  ]); // Removed propertyTypesMap from deps - we only check the ref

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= displayedTotalPages) {
      setCurrentPage(page);
    }
  };

  // Helper function to update URL with current filter state
  const updateURL = (updates: {
    propertyType?: string | null;
    minBeds?: string | null;
    minBaths?: string | null;
    minPrice?: string | null;
    maxPrice?: string | null;
    regionId?: number | null;
    areaId?: number | null;
  }) => {
    if (!searchParams) return;
    const params = new URLSearchParams(searchParams.toString());
    
    // Update or remove filter parameters
    if (updates.propertyType !== undefined) {
      if (updates.propertyType) {
        params.set('propertyType', updates.propertyType);
      } else {
        params.delete('propertyType');
      }
    }
    if (updates.minBeds !== undefined) {
      if (updates.minBeds) {
        params.set('minBeds', updates.minBeds);
      } else {
        params.delete('minBeds');
      }
    }
    if (updates.minBaths !== undefined) {
      if (updates.minBaths) {
        params.set('minBaths', updates.minBaths);
      } else {
        params.delete('minBaths');
      }
    }
    if (updates.minPrice !== undefined) {
      if (updates.minPrice) {
        params.set('minPrice', updates.minPrice);
      } else {
        params.delete('minPrice');
      }
    }
    if (updates.maxPrice !== undefined) {
      if (updates.maxPrice) {
        params.set('maxPrice', updates.maxPrice);
      } else {
        params.delete('maxPrice');
      }
    }
    if (updates.regionId !== undefined) {
      if (updates.regionId) {
        params.set('regionId', String(updates.regionId));
      } else {
        params.delete('regionId');
      }
    }
    if (updates.areaId !== undefined) {
      if (updates.areaId) {
        params.set('areaId', String(updates.areaId));
      } else {
        params.delete('areaId');
      }
    }

    // Reset to page 1 when filters change
    params.set('page', '1');
    
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleRegionChange = (regionId: number | null) => {
    // Clear old properties and show loading immediately to prevent glitch
    setProperties([]);
    setLoading(true);
    setError(null);
    lastFetchParamsRef.current = ''; // Reset to allow new fetch
    
    setSelectedRegion(regionId);
    setSelectedArea(null);

    // Set province name if region is selected
    if (regionId) {
      const region = regionCounts.find(r => r.regionId === regionId);
      setSelectedProvince(region?.regionName || null);
    } else {
      setSelectedProvince(null);
    }
    setSelectedTown(null);

    // Clear advanced search filters so only area filter is used
    setSelectedPropertyType(null);
    setMinBeds(null);
    setMinBaths(null);
    setminPrice(null);
    setmaxPrice(null);
  };

  const handleAreaChange = (areaId: number | null) => {
    // Clear old properties and show loading immediately to prevent glitch
    setProperties([]);
    setLoading(true);
    setError(null);
    lastFetchParamsRef.current = ''; // Reset to allow new fetch
    
    setSelectedArea(areaId);

    // Preserve region and province when selecting an area
    // Don't clear them - areas belong to regions
    if (!areaId) {
      // Only clear province/town if deselecting area
      setSelectedProvince(null);
      setSelectedTown(null);
    }

    // Clear advanced search filters
    setSelectedPropertyType(null);
    setMinBeds(null);
    setMinBaths(null);
    setminPrice(null);
    setmaxPrice(null);
  };

  // Reset page to 1 when filters change (but don't trigger fetch here - the main useEffect will handle it)
  useEffect(() => {
    // Only reset if we're not on page 1 already to avoid unnecessary state updates
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [selectedProvince, selectedTown, selectedRegion, selectedArea, selectedPropertyType, minBeds, minBaths, minPrice, maxPrice, sortBy, sortOrder]); // currentPage removed from deps to prevent loop

  // Handle body scroll lock when sidebar is open on mobile
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  // Close sidebar when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sort properties based on selected sort option
  const sortedProperties = useMemo(() => {
    if (sortBy === 'default') {
      return properties;
    }

    const sorted = [...properties];
    
    switch (sortBy) {
      case 'price-low-high':
        return sorted.sort((a, b) => (a.price?.current || 0) - (b.price?.current || 0));
      case 'price-high-low':
        return sorted.sort((a, b) => (b.price?.current || 0) - (a.price?.current || 0));
      case 'title-a-z':
        return sorted.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
      case 'title-z-a':
        return sorted.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
      default:
        return properties;
    }
  }, [properties, sortBy]);

  const displayedProperties = sortedProperties;
  const displayedTotal = totalProperties;
  const displayedTotalPages = totalPages;

  // Force grid layout on mobile (below 768px)
  const effectiveLayout = isMobile ? 'grid' : layout;

  // Pre-compute translated strings for sort dropdown options
  // This ensures translations work properly in <option> elements
  // Use try-catch and fallbacks to ensure translations always work
  const getTranslation = (key: string, fallback: string) => {
    try {
      const translated = tCommon(key);
      // Check if translation is missing (next-intl returns "common.key" or "namespace.key" when missing)
      if (!translated || 
          translated === `common.${key}` || 
          translated === key || 
          translated.startsWith('common.')) {
        return fallback;
      }
      return translated;
    } catch (e) {
      return fallback;
    }
  };

  const sortOptions = {
    default: getTranslation('default', 'Default'),
    titleAsc: `${getTranslation('title', 'Title')}: A-Z`,
    titleDesc: `${getTranslation('title', 'Title')}: Z-A`,
    priceAsc: `${getTranslation('price', 'Price')}: ${getTranslation('lowToHigh', 'Low to High')}`,
    priceDesc: `${getTranslation('price', 'Price')}: ${getTranslation('highToLow', 'High to Low')}`,
  };

  // Get display title for filter header
  const getFilterTitle = () => {
    if (selectedArea && areas.length > 0) {
      const area = areas.find(a => a.areaId === selectedArea);
      const region = regionCounts.find(r => r.regionId === selectedRegion);
      return t("filter_titles.in_area_region", {
        area: area?.areaName,
        region: region?.regionName
      });
    }
    if (selectedTown) {
      return t("filter_titles.in_town", { town: selectedTown });
    }
    if (selectedRegion && regionCounts.find(r => r.regionId === selectedRegion)) {
      return t("filter_titles.in_region", {
        region: regionCounts.find(r => r.regionId === selectedRegion)?.regionName
      });
    }
    if (selectedProvince) {
      return t("filter_titles.in_province", { province: selectedProvince });
    }
    return tFilters('region');
  };

  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxVisiblePages = 5;
    const sidePages = 2;
    const total = displayedTotalPages;

    if (total <= maxVisiblePages) {
      for (let i = 1; i <= total; i++) pageNumbers.push(i);
    } else {
      pageNumbers.push(1);
      let middleStart = Math.max(2, currentPage - sidePages);
      let middleEnd = Math.min(total - 1, currentPage + sidePages);

      if (currentPage <= sidePages + 2) {
        middleEnd = maxVisiblePages - 2;
        if (middleEnd >= total - 1) middleEnd = total - 1;
      }
      if (currentPage >= total - (sidePages + 1)) {
        middleStart = total - (maxVisiblePages - 1);
        if (middleStart <= 2) middleStart = 2;
      }

      if (middleStart > 2) pageNumbers.push('ellipsis1');
      for (let i = middleStart; i <= middleEnd; i++) pageNumbers.push(i);
      if (middleEnd < total - 1) pageNumbers.push('ellipsis2');
      if (total > 1) pageNumbers.push(total);
    }

    return pageNumbers;
  };

  return (
    <>
      {/* Page overlay loader */}
      {pageLoading && <PageOverlayLoader tCommon={tCommon} />}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading lg:text-3xl md:text-2xl text-xl font-bold text-primary-600">
                {t('properties_for_sale')}
              </h1>
              <p className="mt-2 text-neutral-600 lg:text-xl md:text-lg sm:text-base text-sm">
                {t('sub_text')}
              </p>
            </div>
            {/* Mobile Toggle Button */}
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-6 relative">
          {/* Mobile Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar Filters */}
          <aside
            className={`fixed lg:static inset-y-0 left-0 z-50 lg:z-auto w-80 lg:w-80 flex-shrink-0 transform transition-transform duration-300 ease-in-out ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}
          >
            
            <div className="bg-white lg:rounded-xl lg:border lg:border-neutral-200 p-4 overflow-y-auto shadow-xl lg:shadow-none">
              {/* Advanced Search Filters */}
              <div className="pb-6 mb-6 border-b border-neutral-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-primary-900">
                    {tFilters('advance_search')}
                  </h2>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
                    aria-label={tCommon("closeFilters")}
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  {/* Property Type */}
                  <div>
                    <label htmlFor="propertyType" className="block text-sm font-medium text-neutral-700 mb-1">
                      {tFilters('propertyTypeLabel')}
                    </label>
                    <select
                      id="propertyType"
                      value={selectedPropertyType || ''}
                      onChange={(e) => {
                        const value = e.target.value || null;
                        setProperties([]);
                        setLoading(true);
                        setError(null);
                        lastFetchParamsRef.current = '';
                        setSelectedPropertyType(value);
                        updateURL({ propertyType: value });
                      }}
                      className="w-full rounded-md border-neutral-300 py-2.5 text-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="">{tFilters('allTypes')}</option>
                      {propertyTypesList.map((type) => (
                        <option key={type.id} value={type.code}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Min. Bedrooms */}
                  <div>
                    <label htmlFor="minBeds" className="block text-sm font-medium text-neutral-700 mb-1">
                      {tFilters('min_bed')}
                    </label>
                    <select
                      id="minBeds"
                      value={minBeds || ''}
                      onChange={(e) => {
                        const value = e.target.value || null;
                        setProperties([]);
                        setLoading(true);
                        setError(null);
                        lastFetchParamsRef.current = '';
                        setMinBeds(value);
                        updateURL({ minBeds: value });
                      }}
                      className="w-full rounded-md border-neutral-300 py-2.5 text-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="">{tFilters('any')}</option>
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n}+
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Min. Bathrooms */}
                  <div>
                    <label htmlFor="minBaths" className="block text-sm font-medium text-neutral-700 mb-1">
                      {tFilters('min_bathrooms')}
                    </label>
                    <select
                      id="minBaths"
                      value={minBaths || ''}
                      onChange={(e) => {
                        const value = e.target.value || null;
                        setProperties([]);
                        setLoading(true);
                        setError(null);
                        lastFetchParamsRef.current = '';
                        setMinBaths(value);
                        updateURL({ minBaths: value });
                      }}
                      className="w-full rounded-md border-neutral-300 py-2.5 text-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="">{tFilters('any')}</option>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n}+
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Min. Price */}
                  <div>
                    <label htmlFor="minPrice" className="block text-sm font-medium text-neutral-700 mb-1">
                      {tFilters('min_price')}
                    </label>
                    <select
                      id="minPrice"
                      value={minPrice || ''}
                      onChange={(e) => {
                        const value = e.target.value || null;
                        setProperties([]);
                        setLoading(true);
                        setError(null);
                        lastFetchParamsRef.current = '';
                        setminPrice(value);
                        updateURL({ minPrice: value });
                      }}
                      className="w-full rounded-md border-neutral-300 py-2.5 text-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="">{tFilters('noMin') || 'No Min'}</option>
                      <option value="50000">€50,000</option>
                      <option value="100000">€100,000</option>
                      <option value="150000">€150,000</option>
                      <option value="200000">€200,000</option>
                      <option value="250000">€250,000</option>
                      <option value="300000">€300,000</option>
                      <option value="400000">€400,000</option>
                      <option value="500000">€500,000</option>
                    </select>
                  </div>

                  {/* Max. Price */}
                  <div>
                    <label htmlFor="maxPrice" className="block text-sm font-medium text-neutral-700 mb-1">
                      {tFilters('max_price')}
                    </label>
                    <select
                      id="maxPrice"
                      value={maxPrice || ''}
                      onChange={(e) => {
                        const value = e.target.value || null;
                        setProperties([]);
                        setLoading(true);
                        setError(null);
                        lastFetchParamsRef.current = '';
                        setmaxPrice(value);
                        updateURL({ maxPrice: value });
                      }}
                      className="w-full rounded-md border-neutral-300 py-2.5 text-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="">{tFilters('noMax') || 'No Max'}</option>
                      <option value="200000">€200,000</option>
                      <option value="300000">€300,000</option>
                      <option value="400000">€400,000</option>
                      <option value="500000">€500,000</option>
                      <option value="600000">€600,000</option>
                      <option value="750000">€750,000</option>
                      <option value="1000000">€1,000,000</option>
                      <option value="1500000">€1,500,000</option>
                      <option value="2000000">€2,000,000+</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-primary-900">
                  {getFilterTitle()}
                </h2>
              </div>
              <div className="space-y-4">
                <AreaFilter
                  properties={displayedProperties}
                  selectedProvince={selectedProvince}
                  selectedTown={selectedTown}
                  selectedRegion={selectedRegion}
                  selectedArea={selectedArea}
                  regions={regionCounts}
                  areas={areas}
                  onProvinceChange={(province) => {
                    setProperties([]);
                    setLoading(true);
                    setError(null);
                    lastFetchParamsRef.current = '';
                    setSelectedProvince(province);
                  }}
                  onTownChange={(town) => {
                    setProperties([]);
                    setLoading(true);
                    setError(null);
                    lastFetchParamsRef.current = '';
                    setSelectedTown(town);
                  }}
                  onRegionChange={handleRegionChange}
                  onAreaChange={handleAreaChange}
                  allCount={totalPropertiesCount}
                />
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Results count + layout switcher - Show during loading or when there are properties */}
            {(loading || displayedProperties.length > 0) && (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="lg:hidden flex items-center justify-center min-w-10 w-10 h-10 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                    aria-label={tCommon("toggleFilters")}
                  >
                    <FunnelIcon className="h-6 w-6" />
                  </button>
                  <div className="flex items-center gap-2">
                    {loading ? (
                      <p className="text-base text-neutral-600 dark:text-neutral-400">
                        {tCommon('loadingProperties')}
                      </p>
                    ) : (
                      <p className="text-base text-neutral-600 dark:text-neutral-400">
                        {tCommon('showing')}{' '}
                        <span className="font-medium text-neutral-900 dark:text-white">
                          {(currentPage - 1) * PROPERTIES_PER_PAGE + 1}
                        </span>{' '}
                        -{' '}
                        <span className="font-medium text-neutral-900 dark:text-white">
                          {Math.min(currentPage * PROPERTIES_PER_PAGE, displayedTotal)}
                        </span>{' '}
                        {tCommon('of')}{' '}
                        <span className="font-medium text-neutral-900 dark:text-white">
                          {displayedTotal}
                        </span>{' '}
                        {displayedTotal === 1 ? tCommon('property') : tCommon('properties')}
                      </p>
                    )}
                    {(loading || pageLoading) && <LoadingSpinner />}
                  </div>

                </div>

                {/* Sort Dropdown and Layout Switcher */}
                {!loading && (
                  <div className="flex items-center gap-4">
                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-2">
                      <label htmlFor="sortBy" className="text-sm font-medium text-neutral-700 dark:text-neutral-300 whitespace-nowrap">
                        {getTranslation('sortBy', 'Sort By')}:
                      </label>
                      <select
                        id="sortBy"
                        value={`${sortBy}:${sortOrder}`}
                        onChange={(e) => {
                          console.log('[SORT DROPDOWN] onChange triggered, value:', e.target.value);
                          const [newSortBy, newSortOrder] = e.target.value.split(':');
                          console.log('[SORT DROPDOWN] Parsed values - sortBy:', newSortBy, 'sortOrder:', newSortOrder);
                          console.log('[SORT DROPDOWN] Current state - sortBy:', sortBy, 'sortOrder:', sortOrder);
                          
                          if (newSortBy && newSortOrder) {
                            console.log('[SORT DROPDOWN] Setting new sort values...');
                            setSortBy(newSortBy);
                            setSortOrder(newSortOrder as 'ASC' | 'DESC');
                            setCurrentPage(1); // Reset to first page when sorting changes
                            console.log('[SORT DROPDOWN] State updated - new sortBy:', newSortBy, 'new sortOrder:', newSortOrder);
                          } else {
                            console.error('[SORT DROPDOWN] ERROR: Failed to parse sort values from:', e.target.value);
                          }
                        }}
                        className="rounded-md border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="id:DESC">{sortOptions.default}</option>
                        <option value="title:ASC">{sortOptions.titleAsc}</option>
                        <option value="title:DESC">{sortOptions.titleDesc}</option>
                        <option value="price:ASC">{sortOptions.priceAsc}</option>
                        <option value="price:DESC">{sortOptions.priceDesc}</option>
                      </select>
                    </div>
                    {/* Layout Switcher */}
                    <LayoutSwitcher currentLayout={layout} onLayoutChange={handleLayoutChange} />
                  </div>
                )}
              </div>
            )}

        {/* Error state - Only show when not loading */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{tCommon('errorLoadingProperties')}: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
            >
              {tCommon('retry')}
            </button>
          </div>
        )}

        {/* Loading state - Show skeleton cards */}
        {loading && !error && (
          <div
            className={`grid gap-6 ${
              effectiveLayout === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2'
                : 'grid-cols-1'
            }`}
          >
            {Array.from({ length: PROPERTIES_PER_PAGE }).map((_, i) => (
              <PropertyCardSkeleton key={`loading-${i}`} />
            ))}
          </div>
        )}

        {/* No properties found - Only show after loading is complete and initial load is done */}
        {displayedProperties.length === 0 && !loading && !error && !initialLoad && (
          <div className="text-center py-12">
            <p className="text-neutral-600 text-lg">{tCommon('noPropertiesFoundForFilters')}</p>
            <p className="text-neutral-500 mt-2">{tCommon('tryAdjustingSearchCriteria')}</p>
          </div>
        )}

        {/* Property Grid - Only show when there are properties and not loading */}
        {displayedProperties.length > 0 && !loading && (
          <>
            <div
              className={`grid gap-6 transition-opacity duration-200 ${pageLoading ? 'opacity-50' : 'opacity-100'
                } ${effectiveLayout === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2'
                  : 'grid-cols-1'
                }`}
            >
              {displayedProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  card={effectiveLayout === 'list' ? 'list' : 'grid'}
                  property={transformPropertyForCard(property, propertyTypesMap, tCommon)}
                  favouriteIds={favouriteIds}
                />
              ))}
            </div>

            {/* Pagination */}
            {displayedTotalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center gap-1" aria-label={tCommon('pagination')}>
                  {/* Prev */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || pageLoading}
                    className="relative inline-flex items-center sm:px-2 px-1.5 sm:py-2 py-1.5 text-neutral-400 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed dark:text-neutral-500 dark:ring-neutral-700 dark:hover:bg-neutral-800 dark:disabled:hover:bg-neutral-900 transition-colors"
                  >
                    <span className="sr-only">Previous</span>
                    {pageLoading && currentPage > 1 ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-b border-current"></div>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>

                  {/* Page numbers */}
                  {getPageNumbers().map((pageNumber, index) =>
                    pageNumber === 'ellipsis1' || pageNumber === 'ellipsis2' ? (
                      <span
                        key={`${pageNumber}-${index}`}
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300"
                      >
                        <EllipsisHorizontalIcon className="h-5 w-5" />
                      </span>
                    ) : (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber as number)}
                        disabled={pageLoading}
                        className={`relative inline-flex items-center sm:px-4 px-3 sm:py-2 py-1.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed ${currentPage === pageNumber
                          ? 'z-10 bg-primary-600 text-white'
                          : pageLoading
                            ? 'text-neutral-400 ring-1 ring-inset ring-neutral-300 dark:text-neutral-500 dark:ring-neutral-700'
                            : 'text-neutral-900 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 dark:text-neutral-100 dark:ring-neutral-700 dark:hover:bg-neutral-800'
                          }`}
                      >
                        {pageLoading && currentPage === pageNumber ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-b border-current"></div>
                        ) : (
                          pageNumber
                        )}
                      </button>
                    ),
                  )}

                  {/* Next */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === displayedTotalPages || pageLoading}
                    className="relative inline-flex items-center sm:px-2 px-1.5 sm:py-2 py-1.5 text-neutral-400 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed dark:text-neutral-500 dark:ring-neutral-700 dark:hover:bg-neutral-800 dark:disabled:hover:bg-neutral-900 transition-colors"
                  >
                    <span className="sr-only">Next</span>
                    {pageLoading && currentPage < displayedTotalPages ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-b border-current"></div>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5-4.25a.75.75 0 01-1.06-.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
          </div>
        </div>
      </div>
    </>
  );
}