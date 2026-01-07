import { useMemo, useState, useEffect } from 'react';
import { Property } from '@/types/property';
import TownFilter from './TownFilter';
import { useTranslations } from 'next-intl';
import { CheckIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface RegionCount {
  regionId: number;
  regionName: string;
  count: number;
}

interface AreaCount {
  areaId: number;
  areaName: string;
  count: number;
}

interface AreaFilterProps {
  properties: Property[];
  selectedProvince: string | null;
  selectedTown: string | null;
  selectedRegion?: number | null;
  selectedArea?: number | null;
  regions?: RegionCount[];
  areas?: AreaCount[];
  allCount?: number;
  onProvinceChange: (province: string | null) => void;
  onTownChange: (town: string | null) => void;
  onRegionChange?: (regionId: number | null) => void;
  onAreaChange?: (areaId: number | null) => void;
}

// Province / Region colors
const regionColors: Record<string, { bg: string; hover: string; hex: string }> = {
  Malaga: { bg: 'bg-blue-500', hover: 'hover:bg-blue-600', hex: '#3B82F6' },
  Cordoba: { bg: 'bg-green-500', hover: 'hover:bg-green-600', hex: '#22C55E' },
  Granada: { bg: 'bg-purple-500', hover: 'hover:bg-purple-600', hex: '#A855F7' },
  Jaen: { bg: 'bg-orange-500', hover: 'hover:bg-orange-600', hex: '#F97316' },
  Sevilla: { bg: 'bg-red-500', hover: 'hover:bg-red-600', hex: '#EF4444' },
  Cadiz: { bg: 'bg-teal-500', hover: 'hover:bg-teal-600', hex: '#14B8A6' },
  Almeria: { bg: 'bg-pink-500', hover: 'hover:bg-pink-600', hex: '#EC4899' },
  Huelva: { bg: 'bg-indigo-500', hover: 'hover:bg-indigo-600', hex: '#6366F1' },
};

// Area colors (lighter variations)
const areaColors: Record<string, { bg: string; hover: string; hex: string }> = {
  Malaga: { bg: 'bg-blue-300', hover: 'hover:bg-blue-400', hex: '#93C5FD' },
  Cordoba: { bg: 'bg-green-300', hover: 'hover:bg-green-400', hex: '#86EFAC' },
  Granada: { bg: 'bg-purple-300', hover: 'hover:bg-purple-400', hex: '#C4B5FD' },
  Jaen: { bg: 'bg-orange-300', hover: 'hover:bg-orange-400', hex: '#FDBA74' },
  Sevilla: { bg: 'bg-red-300', hover: 'hover:bg-red-400', hex: '#FCA5A5' },
  Cadiz: { bg: 'bg-teal-300', hover: 'hover:bg-teal-400', hex: '#5EEAD4' },
  Almeria: { bg: 'bg-pink-300', hover: 'hover:bg-pink-400', hex: '#F9A8D4' },
  Huelva: { bg: 'bg-indigo-300', hover: 'hover:bg-indigo-400', hex: '#A5B4FC' },
};

export default function AreaFilter({
  properties,
  selectedProvince,
  selectedTown,
  selectedRegion,
  selectedArea,
  regions = [],
  areas = [],
  allCount = 0,
  onProvinceChange,
  onTownChange,
  onRegionChange,
  onAreaChange,
}: AreaFilterProps) {
  const t=useTranslations('properties');
  const [expandedRegions, setExpandedRegions] = useState<Set<number>>(new Set());
  
  // Get the current region name for styling areas
  const currentRegionName = useMemo(() => {
    if (selectedRegion) {
      const region = regions.find(r => r.regionId === selectedRegion);
      return region?.regionName || '';
    }
    return '';
  }, [selectedRegion, regions]);

  const isAllSelected = !selectedProvince && !selectedRegion && !selectedArea;

  const toggleRegion = (regionId: number) => {
    setExpandedRegions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(regionId)) {
        newSet.delete(regionId);
      } else {
        newSet.add(regionId);
      }
      return newSet;
    });
  };

  // Auto-expand when a region is selected
  useEffect(() => {
    if (selectedRegion) {
      setExpandedRegions(prev => {
        const newSet = new Set(prev);
        newSet.add(selectedRegion);
        return newSet;
      });
    }
  }, [selectedRegion]);

  return (
    <div className="space-y-1">
      {/* All Regions Button */}
      <button
        onClick={() => {
          onProvinceChange(null);
          onTownChange(null);
          onRegionChange?.(null);
          onAreaChange?.(null);
        }}
        className={`w-full flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors
          ${isAllSelected
            ? 'bg-primary-600 text-white'
            : 'bg-white text-neutral-700 hover:bg-neutral-50 border border-neutral-200'
          }`}
      >
        <div className="flex items-center gap-2">
          {isAllSelected && <CheckIcon className="h-5 w-5 text-white flex-shrink-0" />}
          <span>All Regions</span>
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-sm font-semibold
          ${isAllSelected
            ? 'bg-white/20 text-white'
            : 'bg-neutral-100 text-neutral-600'
          }`}>
          {allCount}
        </span>
      </button>

      {/* Region List */}
      {regions.map((region) => {
        const isActive = selectedRegion === region.regionId;
        const isExpanded = expandedRegions.has(region.regionId);

        return (
          <div key={region.regionId} className="border border-neutral-200 rounded-lg overflow-hidden">
            {/* Region Header */}
            <button
              onClick={() => {
                if (isActive) {
                  // If already active, deselect and collapse
                  onRegionChange?.(null);
                  onProvinceChange(null);
                  onTownChange(null);
                  onAreaChange?.(null);
                  setExpandedRegions(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(region.regionId);
                    return newSet;
                  });
                } else {
                  // Select the region and expand it
                  onRegionChange?.(region.regionId);
                  onTownChange(null);
                  onAreaChange?.(null);
                  // Ensure it's expanded when selected
                  setExpandedRegions(prev => {
                    const newSet = new Set(prev);
                    newSet.add(region.regionId);
                    return newSet;
                  });
                }
              }}
              className={`w-full flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors
                ${isActive
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-neutral-700 hover:bg-neutral-50'
                }`}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {isActive && <CheckIcon className="h-5 w-5 text-white flex-shrink-0" />}
                <span className="truncate">{region.regionName}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`rounded-full px-2.5 py-0.5 text-sm font-semibold
                  ${isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-neutral-100 text-neutral-600'
                  }`}>
                  {region.count}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleRegion(region.regionId);
                  }}
                  className={`p-1 rounded transition-colors ${
                    isActive 
                      ? "hover:bg-white/20" 
                      : "hover:bg-neutral-200"
                  }`}
                >
                  {isExpanded ? (
                    <ChevronDownIcon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-neutral-600'}`} />
                  ) : (
                    <ChevronRightIcon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-neutral-600'}`} />
                  )}
                </button>
              </div>
            </button>

          {/* Areas List (Accordion Content) */}
          <div 
            className={`overflow-hidden transition-all duration-200 ease-in-out ${
              isExpanded && selectedRegion === region.regionId ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {selectedRegion === region.regionId ? (
              areas.length > 0 ? (
                <div>
                  {areas.map((area) => {
                    const isAreaActive = selectedArea === area.areaId;

                    return (
                      <button
                        key={area.areaId}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isAreaActive) {
                            onAreaChange?.(null);
                          } else {
                            onAreaChange?.(area.areaId);
                          }
                        }}
                        className={`w-full flex items-center justify-between px-6 py-2.5 text-sm font-medium transition-colors
                          ${isAreaActive
                            ? 'bg-primary-500 text-white'
                            : 'text-neutral-700 hover:bg-neutral-100'
                          }`}
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          {isAreaActive && <CheckIcon className="h-4 w-4 text-white flex-shrink-0" />}
                          <span className="truncate">{area.areaName}</span>
                        </div>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold flex-shrink-0
                          ${isAreaActive
                            ? 'bg-white/20 text-white'
                            : 'bg-white text-neutral-600'
                          }`}>
                          {area.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="px-6 py-4 text-sm text-neutral-500">
                  Loading areas...
                </div>
              )
            ) : null}
          </div>
          </div>
        );
      })}


      {/* Town Filter - Only show when a specific province is selected (not region) */}
      {selectedProvince && !selectedRegion && selectedProvince !== 'ALL' && properties && properties.length > 0 && (
        <TownFilter
          properties={properties.filter(p => p.location?.province === selectedProvince)}
          province={selectedProvince}
          selectedTown={selectedTown}
          onTownChange={onTownChange}
        />
      )}
    </div>
  );
}