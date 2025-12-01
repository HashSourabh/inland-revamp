'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Property } from '@/types/property';
import PropertyCard from '@/components/properties/PropertyCard';
import LayoutSwitcher from '@/components/properties/LayoutSwitcher';
import AreaFilter from '@/components/properties/AreaFilter';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { useTranslations } from 'next-intl';
import { useRegionData } from '@/hooks/useRegionData';
import { useFavouriteIds } from '@/hooks/useFavouriteIds';

const transformPropertyForCard = (property: any) => {
  const propertyType =
    property.propertyTypeName ||
    property.PropertyType ||
    (property.propertyTypeId ? `Type ${property.propertyTypeId}` : "Property");

  const propertyRef = property.propertyRef || property.Property_Ref;

  const title =
    propertyType && propertyRef
      ? `${propertyType} (${propertyRef})`
      : propertyType || propertyRef || "Untitled Property";

  const imageCount =
    property.Num_Photos && property.Num_Photos > 0 ? property.Num_Photos : 1;

  const images = Array.from({ length: imageCount }, (_, i) => ({
    url: `https://www.inlandandalucia.com/images/photos/properties/${propertyRef}/${propertyRef}_${i + 1}.jpg`,
    alt: `${propertyType} (${propertyRef}) image ${i + 1}`,
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
    originalPrice: property.originalPrice ?? property.Original_Price ?? null,
    currency: "EUR",
    shortDescription: property.short_description || property.Property_Notes || "",
    location: {
      province: property.Region_Name || property.province || (addressParts.length > 1 ? addressParts[addressParts.length - 1] : ''),
      town: property.Area_Name || property.town || addressParts[0] || '',
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
    isReduced:
      property.Original_Price && property.Original_Price > property.Public_Price,
    savingsAmount:
      property.Original_Price && property.Public_Price
        ? property.Original_Price - property.Public_Price
        : 0,
  };
};

const PROPERTIES_PER_PAGE = 9;

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

const PageOverlayLoader = () => (
  <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      <p className="text-neutral-600 font-medium">Loading properties...</p>
    </div>
  </div>
);

export default function PropertiesLayout({
  properties: initialProperties = [],
  total: initialTotal = 0,
  totalPages: initialTotalPages = 1,
}: PropertiesLayoutProps) {
  const t = useTranslations('properties');
  const searchParams = useSearchParams();
  const { regionCounts, areasCache, fetchRegionCounts, fetchAreas } = useRegionData();
  
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedTown, setSelectedTown] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [selectedArea, setSelectedArea] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // Total properties count from API (for sidebar/info)
  const [totalPropertiesCount, setTotalPropertiesCount] = useState<number>(0);

  // Get areas for selected region from cache
  const areas = selectedRegion ? areasCache.get(selectedRegion) || [] : [];

  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [totalProperties, setTotalProperties] = useState<number>(initialTotal);
  const [totalPages, setTotalPages] = useState<number>(initialTotalPages);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [firstLoadFromParams, setFirstLoadFromParams] = useState(true);
  const [selectedPropertyType, setSelectedPropertyType] = useState<string | null>(null);
  const [minBeds, setMinBeds] = useState<string | null>(null);
  const [minBaths, setMinBaths] = useState<string | null>(null);
  const [minPrice, setminPrice] = useState<string | null>(null);
  const [maxPrice, setmaxPrice] = useState<string | null>(null);

  // Favourite property IDs for the logged-in user
  const favouriteIds = useFavouriteIds();

  // Ref to prevent race conditions
  const fetchPropertiesRef = useRef(0);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || 'https://inlandandalucia.onrender.com/api/v1';

  // Consolidated useEffect for search parameters
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

    // Set all states in a batch
    setSelectedRegion(regionIdParam ? Number(regionIdParam) : null);
    setSelectedArea(areaIdParam ? Number(areaIdParam) : null);
    setSelectedProvince(provinceParam || null);
    setSelectedTown(townParam || null);
    setSelectedPropertyType(propertyTypeParam || null);
    setMinBeds(minBedsParam || null);
    setMinBaths(minBathsParam || null);
    setminPrice(minPriceParam || null);
    setmaxPrice(maxPriceParam || null);

    // Handle location parameter
    if (locationParam && !provinceParam && !townParam) {
      const property = properties.find(
        (p) => p.location?.town === locationParam,
      );
      if (property) {
        setSelectedProvince(property.location?.province ?? null);
        setSelectedTown(property.location?.town ?? null);
      }
    }

    // Reset to page 1 when filters change
    setCurrentPage(1);
  }, [searchParams]);

  // Fetch region counts using cache (only for sidebar - don't override filtered results)
  useEffect(() => {
    const loadRegionCounts = async () => {
      try {
        const counts = await fetchRegionCounts();
        
        // Calculate total properties count from region counts
        const totalCount = counts.reduce((sum: number, region: any) => sum + region.count, 0);
        setTotalPropertiesCount(totalCount);
      } catch (err) {
        console.error("Error loading region counts:", err);
        setTotalPropertiesCount(0);
      }
    };

    loadRegionCounts();
  }, [fetchRegionCounts]);

  // Fetch areas when a region is selected (using cache)
  useEffect(() => {
    if (!selectedRegion) {
      return;
    }

    const loadAreas = async () => {
      try {
        await fetchAreas(selectedRegion);
      } catch (err) {
        console.error("Error loading areas:", err);
      }
    };

    loadAreas();
  }, [selectedRegion, fetchAreas]);

  // Main properties fetch effect with race condition prevention
  useEffect(() => {
    const fetchProperties = async () => {
      // Increment fetch counter
      const currentFetch = ++fetchPropertiesRef.current;

      setError(null);
      setLoading(true);

      try {
        const queryParams = {
          page: String(currentPage),
          limit: String(PROPERTIES_PER_PAGE),
          ...(selectedProvince ? { province: selectedProvince } : {}),
          ...(selectedTown ? { town: selectedTown } : {}),
          ...(selectedRegion ? { regionId: String(selectedRegion) } : {}),
          ...(selectedArea ? { areaId: String(selectedArea) } : {}),
          ...(selectedPropertyType ? { propertyType: selectedPropertyType } : {}),
          ...(minBeds ? { minBeds } : {}),
          ...(minBaths ? { minBaths } : {}),
          ...(minPrice ? { minPrice } : {}),
          ...(maxPrice ? { maxPrice } : {}),
        };

        const query = new URLSearchParams(queryParams);
        const url = `${API_BASE_URL}/properties?${query.toString()}`;


        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

        const data = await res.json();

        // Check if this is still the latest fetch
        if (currentFetch !== fetchPropertiesRef.current) {
          return;
        }


        if (data.success) {
          const newProperties = data.data ? [...data.data] : [];
          const total = data.pagination?.total ?? data.total ?? (data.data?.length || 0);
          const pages = data.pagination?.totalPages ?? data.totalPages ?? Math.ceil(total / PROPERTIES_PER_PAGE);


          setProperties(newProperties);
          setTotalProperties(total); // This should be the filtered count
          setTotalPages(pages);
        } else {
          setProperties([]);
          setTotalProperties(0);
          setTotalPages(1);
        }
      } catch (err) {
        if (currentFetch === fetchPropertiesRef.current) {
          setError(err instanceof Error ? err.message : 'Failed to load properties');
          setProperties([]);
          setTotalProperties(0);
          setTotalPages(1);
        }
      } finally {
        if (currentFetch === fetchPropertiesRef.current) {
          setLoading(false);
          setPageLoading(false);
        }
      }
    };

    fetchProperties();
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
    API_BASE_URL,
  ]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= displayedTotalPages) {
      setCurrentPage(page);
    }
  };

  const handleRegionChange = (regionId: number | null) => {
    setSelectedRegion(regionId);
    setSelectedArea(null);

    // Clear advanced search filters so only area filter is used
    setSelectedPropertyType(null);
    setMinBeds(null);
    setMinBaths(null);
    setminPrice(null);
    setmaxPrice(null);

    // Optionally clear province/town if you want strict region filtering
    setSelectedProvince(null);
    setSelectedTown(null);
  };

  const handleAreaChange = (areaId: number | null) => {
    setSelectedArea(areaId);

    // Clear advanced search filters
    setSelectedPropertyType(null);
    setMinBeds(null);
    setMinBaths(null);
    setminPrice(null);
    setmaxPrice(null);

    // Optionally clear province/town
    setSelectedProvince(null);
    setSelectedTown(null);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProvince, selectedTown, selectedRegion, selectedArea, selectedPropertyType, minBeds, minBaths, minPrice, maxPrice]);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
    }
  }, [initialLoad]);

  if (initialLoad && initialProperties.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-primary-600">
            {t('properties_for_sale')}
          </h1>
          <p className="mt-2 text-neutral-600 text-xl">Loading properties...</p>
        </header>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: PROPERTIES_PER_PAGE }).map((_, i) => (
            <PropertyCardSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      </div>
    );
  }

  const displayedProperties = properties;
  const displayedTotal = totalProperties;
  const displayedTotalPages = totalPages;

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
    return t("filter_titles.all_properties");
  };

  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxVisiblePages = 7;
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
      {pageLoading && <PageOverlayLoader />}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-primary-600">
            {t('properties_for_sale')}
          </h1>
          <p className="mt-2 text-neutral-600 text-xl">
            {t('sub_text')}
          </p>
        </header>

        {/* Filters - Always visible */}
        <div className="rounded-xl border border-neutral-200 bg-white p-4 mb-6">
          <div className="mb-6 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="space-y-4">
              <h2 className="text-base font-medium text-neutral-700 dark:text-neutral-300">
                {getFilterTitle()}
              </h2>
              <AreaFilter
                properties={displayedProperties}
                selectedProvince={selectedProvince}
                selectedTown={selectedTown}
                selectedRegion={selectedRegion}
                selectedArea={selectedArea}
                regions={regionCounts}
                areas={areas}
                onProvinceChange={setSelectedProvince}
                onTownChange={setSelectedTown}
                onRegionChange={handleRegionChange}
                onAreaChange={handleAreaChange}
                allCount={totalPropertiesCount}
              />
            </div>
          </div>

          {/* Results count + layout switcher - Only show when there are properties */}
          {displayedProperties.length > 0 && (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <p className="text-base text-neutral-600 dark:text-neutral-400">
                  Showing{' '}
                  <span className="font-medium text-neutral-900 dark:text-white">
                    {(currentPage - 1) * PROPERTIES_PER_PAGE + 1}
                  </span>{' '}
                  -{' '}
                  <span className="font-medium text-neutral-900 dark:text-white">
                    {Math.min(currentPage * PROPERTIES_PER_PAGE, displayedTotal)}
                  </span>{' '}
                  of{' '}
                  <span className="font-medium text-neutral-900 dark:text-white">
                    {displayedTotal}
                  </span>{' '}
                  properties
                </p>
                {(loading || pageLoading) && <LoadingSpinner />}
              </div>
              <LayoutSwitcher currentLayout={layout} onLayoutChange={setLayout} />
            </div>
          )}
        </div>

        {/* Error state */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Error loading properties: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* No properties found */}
        {displayedProperties.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <p className="text-neutral-600 text-lg">No properties found for the selected filters</p>
            <p className="text-neutral-500 mt-2">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Property Grid - Only show when there are properties */}
        {displayedProperties.length > 0 && (
          <>
            <div
              className={`grid gap-6 transition-opacity duration-200 ${pageLoading ? 'opacity-50' : 'opacity-100'
                } ${layout === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
                }`}
            >
              {loading
                ? Array.from({ length: PROPERTIES_PER_PAGE }).map((_, i) => (
                  <PropertyCardSkeleton key={`loading-${i}`} />
                ))
                : displayedProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      card={layout === 'list' ? 'list' : 'grid'}
                      property={transformPropertyForCard(property)}
                      favouriteIds={favouriteIds}
                    />
                  ))}
            </div>

            {/* Pagination */}
            {displayedTotalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center gap-1" aria-label="Pagination">
                  {/* Prev */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || pageLoading}
                    className="relative inline-flex items-center rounded-md px-2 py-2 text-neutral-400 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed dark:text-neutral-500 dark:ring-neutral-700 dark:hover:bg-neutral-800 dark:disabled:hover:bg-neutral-900 transition-colors"
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
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed ${currentPage === pageNumber
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
                    className="relative inline-flex items-center rounded-md px-2 py-2 text-neutral-400 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed dark:text-neutral-500 dark:ring-neutral-700 dark:hover:bg-neutral-800 dark:disabled:hover:bg-neutral-900 transition-colors"
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
    </>
  );
}