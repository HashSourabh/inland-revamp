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

  // State to store areas for the selected region (handles both cached and filtered areas)
  const [areas, setAreas] = useState<Array<{ areaId: number; areaName: string; count: number }>>([]);

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
  
  // Track if we have any active filters - must be defined before useEffects that use it
  const hasActiveFilters = useMemo(() => {
    return !!(selectedPropertyType || minBeds || minBaths || minPrice || maxPrice);
  }, [selectedPropertyType, minBeds, minBaths, minPrice, maxPrice]);
  
  // Initialize areas from cache if available and no filters are active
  // This must come AFTER hasActiveFilters is defined
  useEffect(() => {
    if (selectedRegion && !hasActiveFilters && areas.length === 0) {
      const cachedAreas = areasCache.get(selectedRegion);
      if (cachedAreas && cachedAreas.length > 0) {
        setAreas(cachedAreas);
      }
    }
  }, [selectedRegion, hasActiveFilters, areasCache, areas.length]);
  
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
  const isUpdatingURLRef = useRef(false); // Track when we're programmatically updating URL to prevent useEffect interference
  const pendingRegionUpdateRef = useRef<number | null>(null); // Track pending region updates

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || 'https://inlandandalucia.onrender.com/api/v1';

  // Load property types FIRST (priority) - must complete before properties load
  useEffect(() => {
    let mounted = true;
    const loadPropertyTypes = async () => {
      try {
        // Always fetch to ensure we have both map and list with codes
        // The cache might have map but not list, or codes might be missing
        const res = await fetch(`${API_BASE_URL}/properties/types?languageId=${languageId}`);
        if (!res.ok) throw new Error(`Failed: ${res.status}`);

        const data = await res.json();
        if (data?.success && data.data && mounted) {
          const typesMap: Record<number, string> = {};
          const typesList: PropertyType[] = [];
          data.data.forEach((type: any) => {
            typesMap[type.id] = type.name;
            // CRITICAL: Use the actual Property_Code from database (AP, BA, etc.)
            // Do NOT generate codes from names - always use type.code from API
            const actualCode = type.code || String(type.id);
            typesList.push({
              id: type.id,
              name: type.name,
              code: actualCode // This should be the Property_Code from database (AP, BA, CH, etc.)
            });
          });
          // Always update both map and list to ensure consistency
          setPropertyTypesMap(typesMap);
          setPropertyTypesList(typesList);
          propertyTypesLoadedRef.current = true;
          
          console.log('[PROPERTY TYPES] ✅ Loaded types from API:', typesList.map(t => ({ code: t.code, name: t.name })));
          console.log('[PROPERTY TYPES] Raw API response:', data.data.map((t: any) => ({ id: t.id, code: t.code, name: t.name })));
          
          // After property types load, re-apply URL params to ensure dropdowns are synced
          // This handles the case where URL params were read before property types loaded
          if (searchParams && mounted) {
            const propertyTypeParam = searchParams.get('propertyType');
            console.log('[PROPERTY TYPES] Checking URL param after types loaded:', propertyTypeParam);
            if (propertyTypeParam !== null && propertyTypeParam !== '') {
              // Verify the code exists in the loaded types (case-insensitive match)
              const normalizedParam = propertyTypeParam.trim().toLowerCase();
              const matchingType = typesList.find(t => 
                t.code.toLowerCase() === normalizedParam
              );
              if (matchingType) {
                // Use the exact code from the loaded type (preserves case)
                const exactCode = matchingType.code;
                console.log('[PROPERTY TYPES] ✅ Re-applying propertyType from URL:', propertyTypeParam, '->', exactCode);
                setSelectedPropertyType(exactCode);
              } else {
                console.warn('[PROPERTY TYPES] ❌ Property type code from URL not found in loaded types:', propertyTypeParam);
                console.warn('[PROPERTY TYPES] Available codes:', typesList.map(t => t.code));
                // Try matching by name
                const matchingByName = typesList.find(t => 
                  t.name.toLowerCase() === propertyTypeParam.toLowerCase()
                );
                if (matchingByName) {
                  console.log('[PROPERTY TYPES] Found by name, using code:', matchingByName.code);
                  setSelectedPropertyType(matchingByName.code);
                }
              }
            }
          }
        }
      } catch (err) {
        console.error("Error loading property types:", err);
        // On error, we cannot generate codes from names - we MUST have the actual Property_Code from database
        // So we don't build from cache - we need to fetch from API to get the codes
        // The cache only has names, not codes, so we can't use it
        console.warn('[PROPERTY TYPES] Error loading types - cannot use cache because codes are required');
        // Even on error, mark as loaded to prevent blocking
        propertyTypesLoadedRef.current = true;
      }
    };

    // Check if we have both map and list - if not, fetch or initialize from cache
    const hasMap = Object.keys(propertyTypesMap).length > 0;
    const hasList = propertyTypesList.length > 0;
    
    if (hasMap && hasList) {
      // Both are available, mark as loaded
      propertyTypesLoadedRef.current = true;
      
      // Re-apply URL params if property types are already loaded
      // This ensures dropdowns are synced when component mounts with URL params
      if (searchParams && mounted) {
        const propertyTypeParam = searchParams.get('propertyType');
        if (propertyTypeParam !== null && propertyTypeParam !== '') {
          // Use case-insensitive matching to find the type
          const matchingType = propertyTypesList.find(t => 
            t.code.toLowerCase() === propertyTypeParam.toLowerCase()
          );
          if (matchingType) {
            // Use the exact code from the loaded type (preserves case)
            const exactCode = matchingType.code;
            if (selectedPropertyType !== exactCode) {
              console.log('[PROPERTY TYPES] Re-applying propertyType from URL (already loaded):', propertyTypeParam, '->', exactCode);
              setSelectedPropertyType(exactCode);
            }
          } else {
            console.warn('[PROPERTY TYPES] Property type code from URL not found in loaded types:', propertyTypeParam, 'Available codes:', propertyTypesList.map(t => t.code));
          }
        }
      }
    } else if (hasMap && !hasList) {
      // Map exists but list is missing - we CANNOT generate codes from names
      // We MUST fetch from API to get the actual Property_Code from database
      // The cache only has names, not codes, so we need to fetch fresh data
      console.log('[PROPERTY TYPES] Map exists but list missing - fetching from API to get codes');
      loadPropertyTypes();
    } else {
      // Either missing or incomplete, fetch fresh data
      loadPropertyTypes();
    }
    
    return () => {
      mounted = false;
    };
  }, [languageId, setPropertyTypesMap, API_BASE_URL, propertyTypesMap, propertyTypesList.length]); // Removed searchParams and selectedPropertyType from deps to avoid loops

  // Separate effect to sync propertyType from URL after property types are loaded
  // This ensures the dropdown shows the correct value even if URL params were read before types loaded
  useEffect(() => {
    if (!searchParams) {
      console.log('[PROPERTY TYPE SYNC] No searchParams, skipping');
      return;
    }
    
    const propertyTypeParam = searchParams.get('propertyType');
    console.log('[PROPERTY TYPE SYNC] ===== START =====');
    console.log('[PROPERTY TYPE SYNC] URL param:', propertyTypeParam);
    console.log('[PROPERTY TYPE SYNC] Current state:', selectedPropertyType);
    console.log('[PROPERTY TYPE SYNC] Property types loaded:', propertyTypesList.length > 0);
    console.log('[PROPERTY TYPE SYNC] Available property types:', propertyTypesList.map(t => ({ code: t.code, name: t.name })));
    
    // If property types aren't loaded yet, set the value directly from URL (will be updated once types load)
    if (propertyTypesList.length === 0) {
      if (propertyTypeParam !== null && propertyTypeParam !== '') {
        // Set it directly so the dropdown shows something, even if not the exact code
        // Always set it, don't check if different - ensures it's set on initial load
        console.log('[PROPERTY TYPE SYNC] Property types not loaded yet, setting propertyType directly from URL:', propertyTypeParam);
        // Use the param value as-is (case-sensitive) - will be corrected once types load
        setSelectedPropertyType(propertyTypeParam);
      } else if (propertyTypeParam === null && selectedPropertyType !== null) {
        // Clear if URL doesn't have it
        console.log('[PROPERTY TYPE SYNC] Clearing propertyType (not in URL, types not loaded)');
        setSelectedPropertyType(null);
      }
      console.log('[PROPERTY TYPE SYNC] ===== END (types not loaded) =====');
      return;
    }
    
    // Property types are loaded - now match and set the exact code
    if (propertyTypeParam !== null && propertyTypeParam !== '') {
      // Check if the code exists in loaded types (case-insensitive match)
      const normalizedParam = propertyTypeParam.trim().toLowerCase();
      const matchingType = propertyTypesList.find(t => 
        t.code.toLowerCase() === normalizedParam
      );
      
      if (matchingType) {
        // Use the exact code from the loaded type (preserves case from API)
        const exactCode = matchingType.code;
        // CRITICAL: Always update, even if it seems the same - this ensures React re-renders the dropdown
        // The issue might be that selectedPropertyType is "AP" but the API code is "ap", so we need to update it
        console.log('[PROPERTY TYPE SYNC] ✅ Setting propertyType from URL:', propertyTypeParam, '->', exactCode, '(current:', selectedPropertyType, ')');
        // Always set it - don't check if different, because case might differ and React needs the exact match
        setSelectedPropertyType(exactCode);
      } else {
        console.warn('[PROPERTY TYPE SYNC] ❌ Property type code from URL not found:', propertyTypeParam);
        console.warn('[PROPERTY TYPE SYNC] Available codes:', propertyTypesList.map(t => t.code));
        // Try to find by name as fallback (case-insensitive)
        const matchingByName = propertyTypesList.find(t => 
          t.name.toLowerCase() === propertyTypeParam.toLowerCase()
        );
        if (matchingByName) {
          console.log('[PROPERTY TYPE SYNC] Found by name, using code:', matchingByName.code);
          setSelectedPropertyType(matchingByName.code);
        } else {
          // Even if not found, set it so the dropdown shows the value from URL
          console.log('[PROPERTY TYPE SYNC] Setting propertyType to URL value even though not found in types:', propertyTypeParam);
          setSelectedPropertyType(propertyTypeParam);
        }
      }
    } else {
      // URL doesn't have propertyType - clear it
      if (selectedPropertyType !== null) {
        console.log('[PROPERTY TYPE SYNC] Clearing propertyType (not in URL)');
        setSelectedPropertyType(null);
      }
    }
    console.log('[PROPERTY TYPE SYNC] ===== END =====');
  }, [searchParams, propertyTypesList.length]); // Use length to trigger when list is populated, avoid loops

  // Consolidated useEffect for search parameters - only on mount or when searchParams change
  useEffect(() => {
    if (!searchParams) return;

    // Skip updating state if we're programmatically updating the URL (but allow on initial mount)
    // This prevents race conditions where our manual update gets overwritten
    // However, on initial mount (firstLoadFromParams), we MUST read URL params to populate filters
    if (isUpdatingURLRef.current && !firstLoadFromParams) {
      console.log('[SEARCH PARAMS EFFECT] Skipping update - URL is being updated programmatically');
      console.log('[SEARCH PARAMS EFFECT] Pending region update:', pendingRegionUpdateRef.current);
      return;
    }
    
    console.log('[SEARCH PARAMS EFFECT] ===== START =====');
    console.log('[SEARCH PARAMS EFFECT] Property types loaded:', propertyTypesList.length > 0);
    console.log('[SEARCH PARAMS EFFECT] searchParams changed, current URL:', searchParams.toString());
    console.log('[SEARCH PARAMS EFFECT] First load from params:', firstLoadFromParams);

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

    console.log('[SEARCH PARAMS EFFECT] Extracted params:', {
      regionId: regionIdParam,
      areaId: areaIdParam,
      propertyType: propertyTypeParam,
      minBeds: minBedsParam,
      minBaths: minBathsParam,
      minPrice: minPriceParam,
      maxPrice: maxPriceParam
    });
    console.log('[SEARCH PARAMS EFFECT] Current state:', {
      selectedRegion,
      selectedPropertyType,
      minBeds,
      minBaths,
      minPrice,
      maxPrice
    });

    // Always update state from URL params when they exist
    // Use !== null check to distinguish between "not in URL" vs "empty value in URL"
    // IMPORTANT: Update regionId and areaId FIRST to ensure they're available for properties fetch
    if (regionIdParam !== null) {
      const newRegionId = regionIdParam ? Number(regionIdParam) : null;
      console.log('[SEARCH PARAMS EFFECT] Updating selectedRegion from URL:', newRegionId);
      if (newRegionId !== selectedRegion) {
        setSelectedRegion(newRegionId);
        console.log('[SEARCH PARAMS EFFECT] State updated - selectedRegion:', newRegionId);
      } else {
        console.log('[SEARCH PARAMS EFFECT] State already matches URL, skipping update');
      }
    } else {
      console.log('[SEARCH PARAMS EFFECT] No regionId in URL, clearing selectedRegion');
      if (selectedRegion !== null) {
        setSelectedRegion(null);
      }
    }
    
    if (areaIdParam !== null) {
      const newAreaId = areaIdParam ? Number(areaIdParam) : null;
      if (newAreaId !== selectedArea) {
        setSelectedArea(newAreaId);
      }
    } else {
      // Clear areaId if not in URL
      if (selectedArea !== null) {
        setSelectedArea(null);
      }
    }
    
    if (provinceParam !== null) {
      setSelectedProvince(provinceParam || null);
    } else {
      // Clear province if not in URL
      if (selectedProvince !== null) {
        setSelectedProvince(null);
      }
    }
    
    if (townParam !== null) {
      setSelectedTown(townParam || null);
    } else {
      // Clear town if not in URL
      if (selectedTown !== null) {
        setSelectedTown(null);
      }
    }
    
    // Handle propertyType - always sync with URL
    if (propertyTypeParam !== null && propertyTypeParam !== '') {
      // Use the param value, but try to match with loaded property types first
      // This ensures we use the exact code from the loaded types (preserves case)
      const normalizedParam = propertyTypeParam.trim();
      
      if (propertyTypesList.length > 0) {
        // Property types are loaded - find matching type and use exact code
        const normalizedParamLower = normalizedParam.toLowerCase();
        const matchingType = propertyTypesList.find(t => 
          t.code.toLowerCase() === normalizedParamLower
        );
        
        if (matchingType) {
          const exactCode = matchingType.code;
          // Always set it, don't check if different - ensures dropdown is updated
          console.log('[SEARCH PARAMS EFFECT] Setting propertyType from URL (with type match):', normalizedParam, '->', exactCode);
          setSelectedPropertyType(exactCode);
        } else {
          // Code not found in loaded types - try matching by name
          const matchingByName = propertyTypesList.find(t => 
            t.name.toLowerCase() === normalizedParamLower
          );
          if (matchingByName) {
            console.log('[SEARCH PARAMS EFFECT] Found by name, using code:', matchingByName.code);
            setSelectedPropertyType(matchingByName.code);
          } else {
            // Code not found in loaded types, but set it anyway (might be valid but not loaded yet)
            console.warn('[SEARCH PARAMS EFFECT] Property type code not found in loaded types:', normalizedParam);
            console.warn('[SEARCH PARAMS EFFECT] Available codes:', propertyTypesList.map(t => t.code));
            console.log('[SEARCH PARAMS EFFECT] Setting propertyType from URL (no match):', normalizedParam);
            setSelectedPropertyType(normalizedParam);
          }
        }
      } else {
        // Property types not loaded yet - ALWAYS set the param value directly
        // The sync effect will update it with the exact code once types load
        // Don't check if different - always set to ensure it's populated from URL
        console.log('[SEARCH PARAMS EFFECT] Setting propertyType from URL (types not loaded yet):', normalizedParam);
        setSelectedPropertyType(normalizedParam);
      }
    } else {
      // If URL doesn't have propertyType param, clear it
      // Only clear if property types are loaded to avoid clearing during initial load
      if (selectedPropertyType !== null && propertyTypesList.length > 0) {
        console.log('[SEARCH PARAMS EFFECT] Clearing propertyType (not in URL and types loaded)');
        setSelectedPropertyType(null);
      } else if (selectedPropertyType !== null && firstLoadFromParams) {
        // On initial load, if URL doesn't have propertyType, clear it even if types aren't loaded yet
        console.log('[SEARCH PARAMS EFFECT] Clearing propertyType on initial load (not in URL)');
        setSelectedPropertyType(null);
      }
    }
    
    // Handle minBeds - always sync with URL
    if (minBedsParam !== null && minBedsParam !== '') {
      if (minBeds !== minBedsParam) {
        console.log('[SEARCH PARAMS EFFECT] Setting minBeds from URL:', minBedsParam);
        setMinBeds(minBedsParam);
      }
    } else {
      // Clear minBeds if not in URL
      if (minBeds !== null) {
        console.log('[SEARCH PARAMS EFFECT] Clearing minBeds (not in URL)');
        setMinBeds(null);
      }
    }
    
    // Handle minBaths - always sync with URL
    if (minBathsParam !== null && minBathsParam !== '') {
      if (minBaths !== minBathsParam) {
        console.log('[SEARCH PARAMS EFFECT] Setting minBaths from URL:', minBathsParam);
        setMinBaths(minBathsParam);
      }
    } else {
      // Clear minBaths if not in URL
      if (minBaths !== null) {
        console.log('[SEARCH PARAMS EFFECT] Clearing minBaths (not in URL)');
        setMinBaths(null);
      }
    }
    
    // Handle minPrice - always sync with URL
    if (minPriceParam !== null && minPriceParam !== '') {
      // minPriceParam can be "0" which means "No Min" - normalize it to empty string for dropdown
      // The dropdown uses empty string for "No Min" option
      if (minPriceParam === '0' || minPriceParam === '') {
        // minPrice=0 means no minimum, so set to null/empty to show "No Min" in dropdown
        if (minPrice !== null && minPrice !== '') {
          console.log('[SEARCH PARAMS EFFECT] Setting minPrice to empty (0 means No Min):', minPriceParam);
          setminPrice(null);
        }
      } else {
        // Valid minPrice value (not 0)
        if (minPrice !== minPriceParam) {
          console.log('[SEARCH PARAMS EFFECT] Setting minPrice from URL:', minPriceParam);
          setminPrice(minPriceParam);
        }
      }
    } else {
      // Clear minPrice if not in URL
      if (minPrice !== null) {
        console.log('[SEARCH PARAMS EFFECT] Clearing minPrice (not in URL)');
        setminPrice(null);
      }
    }
    
    // Handle maxPrice - always sync with URL
    if (maxPriceParam !== null && maxPriceParam !== '') {
      // maxPriceParam can be "0" which is falsy, so we need to check for null specifically
      // If param exists in URL (even if "0"), use it; only use null if param doesn't exist
      if (maxPrice !== maxPriceParam) {
        console.log('[SEARCH PARAMS EFFECT] Setting maxPrice from URL:', maxPriceParam);
        setmaxPrice(maxPriceParam);
      }
    } else {
      // Clear maxPrice if not in URL
      if (maxPrice !== null) {
        console.log('[SEARCH PARAMS EFFECT] Clearing maxPrice (not in URL)');
        setmaxPrice(null);
      }
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
    
    // Mark that URL params have been processed (for initial load)
    if (firstLoadFromParams) {
      setFirstLoadFromParams(false);
    }
    
    console.log('[SEARCH PARAMS EFFECT] ===== END =====');
  }, [searchParams, firstLoadFromParams, properties.length, selectedRegion, propertyTypesList.length]); // Include propertyTypesList.length to know when types are loaded

  // Fetch region counts with current filters applied
  // This ALWAYS runs to ensure counts reflect current filters
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
        
        // Always update region counts state with filtered results
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
        // On error, only use cache if no filters are active
        if (!hasActiveFilters && cachedRegionCounts.length > 0) {
          setRegionCounts(cachedRegionCounts);
          const totalCount = cachedRegionCounts.reduce((sum: number, region: any) => sum + region.count, 0);
          setTotalPropertiesCount(totalCount);
        } else {
          setTotalPropertiesCount(0);
        }
      }
    };

    // Always fetch region counts (with or without filters) to ensure accuracy
    // Debounce to avoid too many requests
    const timeoutId = setTimeout(() => {
      loadRegionCounts();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [fetchRegionCounts, selectedPropertyType, minBeds, minBaths, minPrice, maxPrice, hasActiveFilters, cachedRegionCounts]);

  // Fetch areas when a region is selected (using cache)
  // This updates whenever filters change to show accurate counts
  useEffect(() => {
    if (!selectedRegion) {
      setAreas([]);
      return;
    }

    // Clear areas immediately when region changes to prevent showing wrong areas
    setAreas([]);

    let mounted = true;
    const loadAreas = async () => {
      try {
        // Build filter object from current filter state
        const filters = {
          propertyType: selectedPropertyType || undefined,
          minBeds: minBeds || undefined,
          minBaths: minBaths || undefined,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
        };
        
        const fetchedAreas = await fetchAreas(selectedRegion, filters);
        
        // Update areas state with fetched data - only if still mounted and region hasn't changed
        if (mounted && selectedRegion) {
          setAreas(fetchedAreas || []);
        }
      } catch (err) {
        if (mounted) {
          console.error("Error loading areas:", err);
          setAreas([]);
        }
      }
    };

    // Debounce areas fetch to avoid too many requests
    const timeoutId = setTimeout(() => {
      loadAreas();
    }, 300);
    
    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, [selectedRegion, fetchAreas, selectedPropertyType, minBeds, minBaths, minPrice, maxPrice]);

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
      initialLoad,
      firstLoadFromParams
    });

    // Don't block properties fetch - it can load independently
    // Property types are used for transformation, not blocking
    // Note: On initial load, we read from URL params directly as fallback, so we don't need to wait

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
        
        // Get current state values - prioritize state over URL to avoid race conditions
        // When filters change, state updates immediately but URL update via router.replace is async
        // So we check state first (most up-to-date), then URL as fallback
        const getFromURL = (key: string) => {
          const value = searchParams?.get(key);
          // Return null only if param doesn't exist, not if it's "0" or empty string
          return value !== null ? value : null;
        };
        const getFromStateOrURL = (stateValue: string | number | null, urlKey: string, isNumber = false) => {
          // On initial load from URL params, state might not be set yet, so prioritize URL
          // After initial load, state is the source of truth
          if (firstLoadFromParams) {
            // On initial load, read from URL first (most reliable)
            const urlValue = getFromURL(urlKey);
            if (urlValue !== null) {
              // Even if urlValue is "0" or empty string, use it
              // Empty string means "no filter", "0" means actual value 0
              if (urlValue === '') {
                return null;
              }
              return isNumber ? Number(urlValue) : urlValue;
            }
            // Fallback to state if URL doesn't have it
            if (stateValue !== null && stateValue !== '') {
              return stateValue;
            }
            return null;
          } else {
            // After initial load, prioritize state (updates immediately when filters change)
            if (stateValue !== null && stateValue !== '') {
              return stateValue;
            }
            // Fallback to URL if state is not set
            const urlValue = getFromURL(urlKey);
            if (urlValue !== null && urlValue !== '') {
              return isNumber ? Number(urlValue) : urlValue;
            }
            return null;
          }
        };
        
        // Resolve parameters - prioritize state (updates immediately) over URL (async update)
        // This prevents race conditions where URL hasn't updated yet after filter changes
        const currentAreaId = getFromStateOrURL(selectedArea, 'areaId', true);
        const currentRegionId = getFromStateOrURL(selectedRegion, 'regionId', true);
        const currentPropertyType = getFromStateOrURL(selectedPropertyType, 'propertyType');
        const currentMinBeds = getFromStateOrURL(minBeds, 'minBeds');
        const currentMinBaths = getFromStateOrURL(minBaths, 'minBaths');
        const currentMinPrice = getFromStateOrURL(minPrice, 'minPrice');
        const currentMaxPrice = getFromStateOrURL(maxPrice, 'maxPrice');
        
        console.log('[PROPERTIES FETCH] Parameter resolution (state prioritized):', {
          initialLoad,
          'selectedArea (state)': selectedArea,
          'areaId (URL)': getFromURL('areaId'),
          'currentAreaId (resolved)': currentAreaId,
          'selectedRegion (state)': selectedRegion,
          'regionId (URL)': getFromURL('regionId'),
          'currentRegionId (resolved)': currentRegionId,
          'selectedPropertyType (state)': selectedPropertyType,
          'propertyType (URL)': getFromURL('propertyType'),
          'currentPropertyType (resolved)': currentPropertyType,
          'minBeds (state)': minBeds,
          'minBaths (state)': minBaths,
          'minPrice (state)': minPrice,
          'maxPrice (state)': maxPrice,
        });
        
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
        
        // Add optional filters - use current values (state with URL fallback)
        if (selectedProvince) queryParams.province = selectedProvince;
        if (selectedTown) queryParams.town = selectedTown;
        if (currentRegionId) queryParams.regionId = String(currentRegionId);
        if (currentAreaId) {
          queryParams.areaId = String(currentAreaId);
          console.log('[PROPERTIES FETCH] ✅ Including areaId in query:', currentAreaId);
        } else {
          console.log('[PROPERTIES FETCH] ⚠️ currentAreaId is null/undefined, not including in query');
        }
        // Add filter params - check for null/undefined, not truthiness (to handle "0" correctly)
        if (currentPropertyType !== null && currentPropertyType !== undefined && currentPropertyType !== '') {
          queryParams.propertyType = String(currentPropertyType);
        }
        if (currentMinBeds !== null && currentMinBeds !== undefined && currentMinBeds !== '') {
          queryParams.minBeds = String(currentMinBeds);
        }
        if (currentMinBaths !== null && currentMinBaths !== undefined && currentMinBaths !== '') {
          queryParams.minBaths = String(currentMinBaths);
        }
        // Handle minPrice: if state is null/empty (No Min), check URL for minPrice=0
        // If URL has minPrice=0, use it; otherwise omit it
        if (currentMinPrice !== null && currentMinPrice !== undefined && currentMinPrice !== '') {
          queryParams.minPrice = String(currentMinPrice);
        } else if (searchParams && searchParams.get('minPrice') === '0') {
          // State is empty (No Min selected), but URL has minPrice=0, so use it
          queryParams.minPrice = '0';
        }
        if (currentMaxPrice !== null && currentMaxPrice !== undefined && currentMaxPrice !== '') {
          queryParams.maxPrice = String(currentMaxPrice);
        }

        const query = new URLSearchParams(queryParams);
        const queryString = query.toString();
        
        console.log('[PROPERTIES FETCH] Final query params:', queryParams);
        console.log('[PROPERTIES FETCH] Query string:', queryString);
        console.log('[PROPERTIES FETCH] Current state - selectedArea:', selectedArea, 'selectedRegion:', selectedRegion);
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
    searchParams, // Include searchParams to refetch when URL updates (e.g., browser navigation)
    firstLoadFromParams,
    searchParams, // Add searchParams to trigger fetch when URL changes
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
    
    // Get current regionId and areaId from updates, state, or URL (in that priority order)
    // Priority: updates > state > URL (state is most reliable as it updates immediately)
    const currentRegionId = updates.regionId !== undefined 
      ? updates.regionId 
      : (selectedRegion !== null && selectedRegion !== undefined
          ? selectedRegion 
          : (searchParams.get('regionId') ? Number(searchParams.get('regionId')) : null));
    const currentAreaId = updates.areaId !== undefined 
      ? updates.areaId 
      : (selectedArea !== null && selectedArea !== undefined
          ? selectedArea 
          : (searchParams.get('areaId') ? Number(searchParams.get('areaId')) : null));
    
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
      if (updates.minPrice && updates.minPrice !== '0') {
        // Valid minPrice value (not empty and not 0)
        params.set('minPrice', updates.minPrice);
      } else if (updates.minPrice === '0' || updates.minPrice === null || updates.minPrice === '') {
        // minPrice=0 means "No Min" - set it to "0" in URL to match API expectations
        params.set('minPrice', '0');
      } else {
        // Remove if explicitly set to null/undefined
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
    
    // Always preserve regionId and areaId if they exist (from updates, state, or URL)
    if (currentRegionId) {
      params.set('regionId', String(currentRegionId));
    } else {
      params.delete('regionId');
    }
    
    if (currentAreaId) {
      params.set('areaId', String(currentAreaId));
    } else {
      params.delete('areaId');
    }

    // Reset to page 1 when filters change
    params.set('page', '1');
    
    console.log('[UPDATE URL] Preserving regionId:', currentRegionId, 'areaId:', currentAreaId);
    console.log('[UPDATE URL] Final URL params:', params.toString());
    
    // Use replace instead of push to avoid adding to history, and ensure it updates immediately
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleRegionChange = (regionId: number | null) => {
    console.log('[HANDLE REGION CHANGE] ===== START =====');
    console.log('[HANDLE REGION CHANGE] Called with regionId:', regionId);
    console.log('[HANDLE REGION CHANGE] Current selectedRegion state:', selectedRegion);
    console.log('[HANDLE REGION CHANGE] Current URL regionId:', searchParams?.get('regionId'));
    console.log('[HANDLE REGION CHANGE] window.location.search:', window.location.search);
    
    // Check if this is actually a different region
    if (regionId === selectedRegion) {
      console.log('[HANDLE REGION CHANGE] WARNING: Same region clicked, but handler was called anyway');
      console.log('[HANDLE REGION CHANGE] This might indicate a state sync issue');
    }
    
    // Track that we're updating URL programmatically
    isUpdatingURLRef.current = true;
    pendingRegionUpdateRef.current = regionId;
    
    // Clear old properties and show loading immediately to prevent glitch
    setProperties([]);
    setLoading(true);
    setError(null);
    lastFetchParamsRef.current = ''; // Reset to allow new fetch
    
    // Update state first
    console.log('[HANDLE REGION CHANGE] Setting selectedRegion state to:', regionId);
    setSelectedRegion(regionId);
    setSelectedArea(null);

    // Set province name if region is selected
    if (regionId) {
      const region = regionCounts.find(r => r.regionId === regionId);
      setSelectedProvince(region?.regionName || null);
      console.log('[HANDLE REGION CHANGE] Found region:', region?.regionName);
    } else {
      setSelectedProvince(null);
    }
    setSelectedTown(null);

    // Update URL IMMEDIATELY with the new regionId to ensure URL reflects the change
    // This must happen synchronously before any other operations
    if (!searchParams) {
      console.error('[HANDLE REGION CHANGE] ERROR: searchParams is null!');
      isUpdatingURLRef.current = false;
      return;
    }
    
    const params = new URLSearchParams(searchParams.toString());
    console.log('[HANDLE REGION CHANGE] Current URL params before update:', params.toString());
    
    // Update regionId in URL immediately
    if (regionId !== null && regionId !== undefined) {
      params.set('regionId', String(regionId));
      console.log('[HANDLE REGION CHANGE] Setting regionId in URL to:', regionId);
    } else {
      params.delete('regionId');
      console.log('[HANDLE REGION CHANGE] Removing regionId from URL');
    }
    
    // Clear areaId when region changes
    params.delete('areaId');
    console.log('[HANDLE REGION CHANGE] Cleared areaId from URL');
    
    // Reset to page 1
    params.set('page', '1');
    
    const newURL = `?${params.toString()}`;
    console.log('[HANDLE REGION CHANGE] New URL will be:', newURL);
    console.log('[HANDLE REGION CHANGE] Calling router.replace...');
    
    // Update URL immediately - use window.history FIRST for immediate update, then router for Next.js
    try {
      // Update window.history FIRST for immediate visual update
      const fullURL = `${window.location.pathname}${newURL}`;
      console.log('[HANDLE REGION CHANGE] Calling window.history.replaceState FIRST with:', fullURL);
      window.history.replaceState({ ...window.history.state, as: fullURL, url: fullURL }, '', fullURL);
      console.log('[HANDLE REGION CHANGE] window.history.replaceState called, current search:', window.location.search);
      
      // Then update Next.js router (this might be async, but window.history already updated)
      console.log('[HANDLE REGION CHANGE] Calling router.replace with:', newURL);
      router.replace(newURL, { scroll: false });
      console.log('[HANDLE REGION CHANGE] router.replace called successfully');
      
      // Verify the URL was updated after a short delay
      setTimeout(() => {
        const currentSearch = window.location.search;
        const currentParams = new URLSearchParams(currentSearch);
        const urlRegionId = currentParams.get('regionId');
        console.log('[HANDLE REGION CHANGE] URL verification after 50ms:');
        console.log('[HANDLE REGION CHANGE] - window.location.search:', currentSearch);
        console.log('[HANDLE REGION CHANGE] - URL regionId:', urlRegionId);
        console.log('[HANDLE REGION CHANGE] - Expected regionId:', regionId);
        if (String(urlRegionId) !== String(regionId)) {
          console.error('[HANDLE REGION CHANGE] ❌ URL MISMATCH! URL has regionId:', urlRegionId, 'but expected:', regionId);
          // Force update if mismatch detected
          const forceParams = new URLSearchParams(currentSearch);
          if (regionId !== null && regionId !== undefined) {
            forceParams.set('regionId', String(regionId));
          } else {
            forceParams.delete('regionId');
          }
          forceParams.delete('areaId');
          forceParams.set('page', '1');
          const forceURL = `?${forceParams.toString()}`;
          window.history.replaceState({}, '', `${window.location.pathname}${forceURL}`);
          console.log('[HANDLE REGION CHANGE] 🔧 Force updated URL to:', forceURL);
        } else {
          console.log('[HANDLE REGION CHANGE] ✅ URL matches expected regionId');
        }
      }, 50);
    } catch (error) {
      console.error('[HANDLE REGION CHANGE] ERROR updating URL:', error);
    }
    
    // Reset the flag after a delay to allow URL to update
    setTimeout(() => {
      isUpdatingURLRef.current = false;
      pendingRegionUpdateRef.current = null;
      console.log('[HANDLE REGION CHANGE] Reset isUpdatingURLRef flag');
      console.log('[HANDLE REGION CHANGE] ===== END =====');
    }, 200);
  };

  const handleAreaChange = (areaId: number | null) => {
    console.log('[HANDLE AREA CHANGE] ===== START =====');
    console.log('[HANDLE AREA CHANGE] Called with areaId:', areaId);
    console.log('[HANDLE AREA CHANGE] Current selectedArea state:', selectedArea);
    console.log('[HANDLE AREA CHANGE] Current URL areaId:', searchParams?.get('areaId'));
    
    // Track that we're updating URL programmatically
    isUpdatingURLRef.current = true;
    
    // Clear old properties and show loading immediately to prevent glitch
    setProperties([]);
    setLoading(true);
    setError(null);
    lastFetchParamsRef.current = ''; // Reset to allow new fetch
    
    // Update state first
    console.log('[HANDLE AREA CHANGE] Setting selectedArea state to:', areaId);
    setSelectedArea(areaId);

    // Preserve region and province when selecting an area
    // Don't clear them - areas belong to regions
    if (!areaId) {
      // Only clear province/town if deselecting area
      setSelectedProvince(null);
      setSelectedTown(null);
    }

    // Update URL IMMEDIATELY with the new areaId to ensure URL reflects the change
    // This must happen synchronously before any other operations
    if (!searchParams) {
      console.error('[HANDLE AREA CHANGE] ERROR: searchParams is null!');
      isUpdatingURLRef.current = false;
      return;
    }
    
    const params = new URLSearchParams(searchParams.toString());
    console.log('[HANDLE AREA CHANGE] Current URL params before update:', params.toString());
    
    // Preserve regionId if it exists
    const currentRegionId = selectedRegion || (searchParams.get('regionId') ? Number(searchParams.get('regionId')) : null);
    console.log('[HANDLE AREA CHANGE] Preserving regionId:', currentRegionId);
    if (currentRegionId) {
      params.set('regionId', String(currentRegionId));
    }
    
    // Update areaId in URL immediately
    if (areaId !== null && areaId !== undefined) {
      params.set('areaId', String(areaId));
      console.log('[HANDLE AREA CHANGE] Setting areaId in URL to:', areaId);
    } else {
      params.delete('areaId');
      console.log('[HANDLE AREA CHANGE] Removing areaId from URL');
    }
    
    // Reset to page 1
    params.set('page', '1');
    
    const newURL = `?${params.toString()}`;
    console.log('[HANDLE AREA CHANGE] New URL will be:', newURL);
    console.log('[HANDLE AREA CHANGE] Calling router.replace...');
    
    // Update URL immediately using router.replace
    try {
      router.replace(newURL, { scroll: false });
      console.log('[HANDLE AREA CHANGE] router.replace called successfully');
      
      // Also update window.location directly as a backup to ensure URL updates immediately
      const fullURL = `${window.location.pathname}${newURL}`;
      window.history.replaceState({ ...window.history.state, as: fullURL, url: fullURL }, '', fullURL);
      console.log('[HANDLE AREA CHANGE] window.history.replaceState called as backup');
      console.log('[HANDLE AREA CHANGE] Current window.location.search:', window.location.search);
    } catch (error) {
      console.error('[HANDLE AREA CHANGE] ERROR updating URL:', error);
    }
    
    // Reset the flag after a short delay to allow URL to update
    setTimeout(() => {
      isUpdatingURLRef.current = false;
      console.log('[HANDLE AREA CHANGE] Reset isUpdatingURLRef flag');
      console.log('[HANDLE AREA CHANGE] ===== END =====');
    }, 100);
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
    viewedDesc: getTranslation('mostViewed', 'Most Viewed'),
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
              <div className="pb-4 mb-4 border-b border-neutral-200">
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
                        console.log('[PROPERTY TYPE DROPDOWN] onChange - value:', value);
                        console.log('[PROPERTY TYPE DROPDOWN] Available types:', propertyTypesList.map(t => ({ code: t.code, name: t.name })));
                        setProperties([]);
                        setLoading(true);
                        setError(null);
                        lastFetchParamsRef.current = '';
                        setSelectedPropertyType(value);
                        updateURL({ 
                          propertyType: value,
                          regionId: selectedRegion || null,
                          areaId: selectedArea || null
                        });
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
                        updateURL({ 
                          minBeds: value,
                          regionId: selectedRegion || null,
                          areaId: selectedArea || null
                        });
                      }}
                      className="w-full rounded-md border-neutral-300 py-2.5 text-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="">{tFilters('any')}</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5+</option>
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
                        updateURL({ 
                          minBaths: value,
                          regionId: selectedRegion || null,
                          areaId: selectedArea || null
                        });
                      }}
                      className="w-full rounded-md border-neutral-300 py-2.5 text-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="">{tFilters('any')}</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5+</option>
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
                        // Store empty string in state for "No Min" (so dropdown shows correctly)
                        setminPrice(value);
                        // But in URL, use "0" for "No Min" to match API expectations
                        const urlValue = value === null || value === '' ? '0' : value;
                        updateURL({ 
                          minPrice: urlValue,
                          regionId: selectedRegion || null,
                          areaId: selectedArea || null
                        });
                      }}
                      className="w-full rounded-md border-neutral-300 py-2.5 text-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="">{tFilters('any')}</option>
                      <option value="50000">€50,000</option>
                      <option value="100000">€100,000</option>
                      <option value="150000">€150,000</option>
                      <option value="200000">€200,000</option>
                      <option value="300000">€300,000</option>
                      <option value="500000">€500,000</option>
                      <option value="1000000">€1,000,000</option>
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
                        updateURL({ 
                          maxPrice: value,
                          regionId: selectedRegion || null,
                          areaId: selectedArea || null
                        });
                      }}
                      className="w-full rounded-md border-neutral-300 py-2.5 text-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="">{tFilters('any')}</option>
                      <option value="100000">€100,000</option>
                      <option value="150000">€150,000</option>
                      <option value="200000">€200,000</option>
                      <option value="300000">€300,000</option>
                      <option value="500000">€500,000</option>
                      <option value="1000000">€1,000,000</option>
                      <option value="2000000">€2,000,000+</option>
                    </select>
                  </div>
                </div>
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
                        className="min-w-[150px] rounded-md border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 px-3 py-2 pr-8 text-sm focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="id:DESC">{sortOptions.default}</option>
                        <option value="title:ASC">{sortOptions.titleAsc}</option>
                        <option value="title:DESC">{sortOptions.titleDesc}</option>
                        <option value="price:ASC">{sortOptions.priceAsc}</option>
                        <option value="price:DESC">{sortOptions.priceDesc}</option>
                        <option value="viewed:DESC">{sortOptions.viewedDesc}</option>
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