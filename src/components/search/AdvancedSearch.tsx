'use client';

import { useState, useEffect } from 'react';
import { AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { fetchPropertyTypes, fetchRegions } from '@/utils/api';
import { Region } from '@/utils/api';
import { useTranslations } from 'next-intl';

interface PropertyType {
  id: number;
  name: string;
  code: string;
}

interface Filters {
  regionId: string;
  propertyType: string;
  priceRange: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  pool: boolean;
}

export default function AdvancedSearch() {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [regions, setRegions] = useState<Region[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState(false); // ✅ loader state

  const [filters, setFilters] = useState<Filters>({
    regionId: "",
    propertyType: "",
    priceRange: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    pool: false,
  });

  const router = useRouter();

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const regionsData = await fetchRegions();
        setRegions(regionsData);

        const propertyTypesData = await fetchPropertyTypes();
        setPropertyTypes(propertyTypesData);
      } catch (err) {
        console.error("Error loading filters:", err);
      }
    };

    loadFilters();
  }, []);
  useEffect(() => {
    if (showAdvancedSearch) { 
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showAdvancedSearch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value, type } = e.currentTarget;

    setFilters((prev: Filters) => ({
      ...prev,
      [id]: type === "checkbox"
        ? (e.currentTarget as HTMLInputElement).checked
        : value,
    }));
  };

  const buildQueryString = () => {
    const params = new URLSearchParams();

    (Object.keys(filters) as (keyof Filters)[]).forEach((key) => {
      const val = filters[key];
      if (val !== "" && val !== false) {
        if (key === "priceRange" && typeof val === "string") {
          const [from, to] = val.split("-");
          if (from) params.append("minPrice", from);
          if (to) params.append("maxPrice", to);
        } else if (typeof val === "boolean") {
          params.append(key, val ? "1" : "0");
        } else {
          params.append(key, val as string);
        }
      }
    });

    return params.toString();
  };

  const handleSearch = async () => {
    setLoading(true); // ✅ start loader
    const query = buildQueryString();
    router.push(`/properties${query ? `?${query}` : ""}`);
    setTimeout(() => setLoading(false), 1000); // ✅ stop loader after short delay
  };

  return (
    <>
      <div className="flex gap-4 flex-col md:flex-row">
        {/* Regions */}
        <div className="flex-1">
          <label htmlFor="regionId" className="block text-sm font-medium text-neutral-700 mb-1">
            {t('filters.region')}
          </label>
          <select
            id="regionId"
            value={filters.regionId}
            onChange={handleChange}
            className="w-full rounded-md border-neutral-300 py-3 focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">{t('filters.allLocations')}</option>
            {regions.map((region) => (
              <option key={region.regionId} value={region.regionId}>
                {region.region} ({region.count})
              </option>
            ))}
          </select>
        </div>

        {/* Property Type */}
        <div className="flex-1">
          <label htmlFor="propertyType" className="block text-sm font-medium text-neutral-700 mb-1">
            {t('filters.property_type')}
          </label>
          <select
            id="propertyType"
            value={filters.propertyType}
            onChange={handleChange}
            className="w-full rounded-md border-neutral-300 py-3 focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">{t('filters.allTypes')}</option>
            {propertyTypes.map((type) => (
              <option key={type.id} value={type.code}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="flex-1">
          <label htmlFor="priceRange" className="block text-sm font-medium text-neutral-700 mb-1">
            {t('filters.price_range')}
          </label>
          <select
            id="priceRange"
            value={filters.priceRange}
            onChange={handleChange}
            className="w-full rounded-md border-neutral-300 py-3 focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">{t('filters.anyPrice')}</option>
            <option value="0-100000">Up to €100,000</option>
            <option value="100000-200000">€100,000 - €200,000</option>
            <option value="200000-300000">€200,000 - €300,000</option>
            <option value="300000-500000">€300,000 - €500,000</option>
            <option value="500000-">€500,000+</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex items-end gap-2 flex-initial">
          <button
            type="button"
            disabled={loading}
            className="flex-1 bg-primary-600 rounded-md py-3 px-4 min-h-[50px] text-white font-medium hover:bg-secondary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSearch}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                {tCommon('searching')}
              </span>
            ) : (
              t('filters.search')
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowAdvancedSearch(true)}
            className="flex items-center justify-center w-12 min-w-[50px] min-h-[50px] bg-secondary-500 rounded-md hover:bg-primary-600 transition-colors "
            aria-label={t('filters.advance_search')}
          >
            <AdjustmentsHorizontalIcon className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
      {showAdvancedSearch && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto h-full">
          <div className="flex items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowAdvancedSearch(false)}>
              <div className="absolute inset-0 bg-neutral-900 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle xs:max-w-md md:max-w-5xl w-[95%] relative">
              <div className="bg-white p-4 xs:p-6 sm:p-8">
                <div className="flex items-center justify-between xs:mb-6 mb-4">
                  <h3 className="md:text-2xl sm:text-xl text-lg font-bold text-neutral-900" id="modal-headline">
                    {t('filters.advance_search')}
                  </h3>
                  <button
                    type="button"
                    className="text-neutral-500 hover:text-neutral-700 transition-colors"
                    onClick={() => setShowAdvancedSearch(false)}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* Advanced form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                  }}
                >
                  <div className="grid xs:gap-6 gap-4 md:grid-cols-3">
                    {/* Province / Region */}
                    <div>
                      <label htmlFor="regionId" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t('filters.region')}
                      </label>
                      <select
                        id="regionId"
                        className="w-full rounded-md border-neutral-300 sm:py-3 py-2 focus:border-primary-500 focus:ring-primary-500"
                        onChange={handleChange}
                      >
                        <option value="">{t('filters.anyRegion')}</option>
                        {regions.map((region) => (
                          <option key={region.regionId} value={region.regionId}>
                            {region.region}
                          </option>
                        ))}
                      </select>
                    </div>


                    {/* Property Types */}
                    <div>
                      <label htmlFor="propertyType" className="block text-sm font-medium text-neutral-700 mb-1">
                      {t('filters.property_type')}
                      </label>
                      <select
                        id="propertyType"
                        className="w-full rounded-md border-neutral-300 sm:py-3 py-2 focus:border-primary-500 focus:ring-primary-500"
                        onChange={handleChange}
                      >
                        <option value="">Any Type</option>
                        {propertyTypes.map((type) => (
                          <option key={type.id} value={type.code}>
                            {type.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Min Beds */}
                    <div>
                      <label htmlFor="minBeds" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t('filters.min_bed')}
                      </label>
                      <select
                        id="minBeds"
                        className="w-full rounded-md border-neutral-300 sm:py-3 py-2 focus:border-primary-500 focus:ring-primary-500"
                        onChange={handleChange}
                      >
                        <option value="">Any</option>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n}+
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Min Baths */}
                    <div>
                      <label htmlFor="minBaths" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t('filters.min_bathrooms')}
                      </label>
                      <select
                        id="minBaths"
                        className="w-full rounded-md border-neutral-300 sm:py-3 py-2 focus:border-primary-500 focus:ring-primary-500"
                        onChange={handleChange}
                      >
                        <option value="">Any</option>
                        {[1, 2, 3, 4].map((n) => (
                          <option key={n} value={n}>
                            {n}+
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Example: Min Price */}
                    <div>
                      <label htmlFor="minPrice" className="block text-sm font-medium text-neutral-700 mb-1">
                        {t('filters.min_price')}
                      </label>
                      <select
                        id="minPrice"
                        value={filters.minPrice}
                        onChange={handleChange}
                        className="w-full rounded-md border-neutral-300 sm:py-3 py-2 focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="">No Min</option>
                        <option value="50000">€50,000</option>
                        <option value="100000">€100,000</option>
                        <option value="200000">€200,000</option>
                      </select>
                    </div>

                    {/* Example: Max Price */}
                    <div>
                      <label htmlFor="maxPrice" className="block text-sm font-medium text-neutral-700 mb-1">
                      {t('filters.max_price')}
                      </label>
                      <select
                        id="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleChange}
                        className="w-full rounded-md border-neutral-300 sm:py-3 py-2 focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="">No Max</option>
                        <option value="200000">€200,000</option>
                        <option value="400000">€400,000</option>
                        <option value="600000">€600,000</option>
                      </select>
                    </div>
                  </div>

                  <div className="xs:mt-8 mt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSearch();
                      }}
                      className="w-full bg-primary-600 text-white xs:py-4 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-md disabled:opacity-50 text-sm xs:text-base"
                    >
                      {loading ? tCommon('searching') : t('filters.button')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Search Modal */}

    </>
  );
}
