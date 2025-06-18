'use client';

import { useState } from 'react';
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
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedTown, setSelectedTown] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

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
            {selectedProvince ? 'Areas in ' + selectedProvince : 'Filter by Province'}
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
          <nav className="flex items-center gap-2" aria-label="Pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-md border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {getPageNumbers().map((pageNum, index) => (
                pageNum === 'ellipsis1' || pageNum === 'ellipsis2' ? (
                  <div
                    key={pageNum}
                    className="flex h-8 w-8 items-center justify-center text-neutral-600 dark:text-neutral-400"
                  >
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                  </div>
                ) : (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(pageNum as number)}
                    className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors ${
                      currentPage === pageNum
                        ? 'bg-primary-600 text-white'
                        : 'text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              ))}
            </div>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="rounded-md border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
} 