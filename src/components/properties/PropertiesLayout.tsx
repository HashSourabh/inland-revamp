'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Property } from '@/types/property';
import PropertyCard from '@/components/properties/PropertyCard';
import LayoutSwitcher from '@/components/properties/LayoutSwitcher';
import AreaFilter from '@/components/properties/AreaFilter';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';

const PROPERTIES_PER_PAGE = 9;

interface PropertiesLayoutProps {
  properties: Property[];
}

export default function PropertiesLayout({ properties }: PropertiesLayoutProps) {
  const searchParams = useSearchParams();
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedTown, setSelectedTown] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Handle URL parameters for pre-selecting filters
  useEffect(() => {
    if (!searchParams) return;
    const locationParam = searchParams.get('location');
    if (locationParam) {
      // Find the property with matching town name
      const property = properties.find(p => p.location.town === locationParam);
      if (property) {
        setSelectedProvince(property.location.province);
        setSelectedTown(property.location.town);
      }
    }
  }, [searchParams, properties]);

  // Filter properties by selected province and town
  const filteredProperties = properties.filter(property => {
    if (selectedProvince && property.location.province !== selectedProvince) {
      return false;
    }
    if (selectedTown && property.location.town !== selectedTown) {
      return false;
    }
    return true;
  });

  // Calculate pagination
  const totalProperties = filteredProperties.length;
  const totalPages = Math.ceil(totalProperties / PROPERTIES_PER_PAGE);
  const startIndex = (currentPage - 1) * PROPERTIES_PER_PAGE;
  const endIndex = startIndex + PROPERTIES_PER_PAGE;
  const currentProperties = filteredProperties.slice(startIndex, endIndex);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 7; // Total number of page buttons to show
    const sidePages = 2; // Number of pages to show on each side of current page

    if (totalPages <= maxVisiblePages) {
      // If total pages is less than max visible, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      // Calculate start and end of middle section
      let middleStart = Math.max(2, currentPage - sidePages);
      let middleEnd = Math.min(totalPages - 1, currentPage + sidePages);

      // Adjust if current page is near the start
      if (currentPage <= sidePages + 2) {
        middleEnd = maxVisiblePages - 2;
        if (middleEnd >= totalPages - 1) middleEnd = totalPages - 1;
      }

      // Adjust if current page is near the end
      if (currentPage >= totalPages - (sidePages + 1)) {
        middleStart = totalPages - (maxVisiblePages - 1);
        if (middleStart <= 2) middleStart = 2;
      }

      // Add ellipsis after first page if needed
      if (middleStart > 2) {
        pageNumbers.push('ellipsis1');
      }

      // Add middle pages
      for (let i = middleStart; i <= middleEnd; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis before last page if needed
      if (middleEnd < totalPages - 1) {
        pageNumbers.push('ellipsis2');
      }

      // Always show last page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  // Reset to first page when filters change
  const handleProvinceChange = (province: string | null) => {
    setSelectedProvince(province);
    setSelectedTown(null);
    setCurrentPage(1);
  };

  const handleTownChange = (town: string | null) => {
    setSelectedTown(town);
    setCurrentPage(1);
  };

  // Get the filter heading text
  const getFilterHeading = () => {
    if (selectedTown) {
      return `Properties in ${selectedTown}`;
    }
    if (selectedProvince) {
      return `Areas in ${selectedProvince}`;
    }
    return 'All Properties';
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white md:text-4xl">
          Properties for Sale
        </h1>
        <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">
          Discover our exclusive selection of properties across inland Andalucia
        </p>
      </header>

      {/* Filters */}
      <div className="mb-8 rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {getFilterHeading()}
          </h2>
          <AreaFilter
            properties={properties}
            selectedProvince={selectedProvince}
            selectedTown={selectedTown}
            onProvinceChange={handleProvinceChange}
            onTownChange={handleTownChange}
          />
        </div>
      </div>

      {/* Results count and layout switcher */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Showing <span className="font-medium text-neutral-900 dark:text-white">{startIndex + 1}</span>
          {' - '}
          <span className="font-medium text-neutral-900 dark:text-white">
            {Math.min(endIndex, totalProperties)}
          </span>{' '}
          of <span className="font-medium text-neutral-900 dark:text-white">{totalProperties}</span> properties
          {selectedProvince && (
            <> in <span className="font-medium text-neutral-900 dark:text-white">{selectedProvince}</span>
              {selectedTown && (
                <> - <span className="font-medium text-neutral-900 dark:text-white">{selectedTown}</span></>
              )}
            </>
          )}
        </p>
        <LayoutSwitcher currentLayout={layout} onLayoutChange={setLayout} />
      </div>

      {/* Property Grid */}
      <div 
        className={`grid gap-6 ${
          layout === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}
      >
        {currentProperties.map((property) => (
          <PropertyCard 
            key={property.id} 
            property={property} 
            layout={layout}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center gap-1" aria-label="Pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-md px-2 py-2 text-neutral-400 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:hover:bg-white dark:text-neutral-500 dark:ring-neutral-700 dark:hover:bg-neutral-800 dark:disabled:hover:bg-neutral-900"
            >
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
              </svg>
            </button>
            {getPageNumbers().map((pageNumber, index) => (
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
                  onClick={() => setCurrentPage(pageNumber as number)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    currentPage === pageNumber
                      ? 'z-10 bg-primary-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
                      : 'text-neutral-900 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 focus:z-20 focus:outline-offset-0 dark:text-neutral-100 dark:ring-neutral-700 dark:hover:bg-neutral-800'
                  }`}
                >
                  {pageNumber}
                </button>
              )
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-md px-2 py-2 text-neutral-400 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:hover:bg-white dark:text-neutral-500 dark:ring-neutral-700 dark:hover:bg-neutral-800 dark:disabled:hover:bg-neutral-900"
            >
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
} 