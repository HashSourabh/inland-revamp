import { useMemo } from 'react';
import { Property } from '@/types/property';
import TownFilter from './TownFilter';
import { useTranslations } from 'next-intl';

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
  // Get the current region name for styling areas
  const currentRegionName = useMemo(() => {
    if (selectedRegion) {
      const region = regions.find(r => r.regionId === selectedRegion);
      return region?.regionName || '';
    }
    return '';
  }, [selectedRegion, regions]);

  return (
    <div className="space-y-4">
      {/* ALL Button - Single source of truth */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => {
            onProvinceChange(null);
            onTownChange(null);
            onRegionChange?.(null);
            onAreaChange?.(null);
          }}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors
            ${!selectedProvince && !selectedRegion && !selectedArea
              ? 'bg-primary-600 text-white'
              : 'bg-gray-500 hover:bg-gray-600 text-white'
            } border border-transparent shadow-sm`}
        >
          <span>ALL</span>
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold text-white">
            {allCount}
          </span>
        </button>

        {/* Dynamic Region/Province Buttons from API */}
        {regions.map((region) => {
          const colors = regionColors[region.regionName] || {
            bg: 'bg-gray-500',
            hover: 'hover:bg-gray-600',
            hex: '#6B7280',
          };

          const isActive = selectedRegion === region.regionId;

          return (
            <button
              key={region.regionId}
              onClick={() => {
                if (isActive) {
                  onRegionChange?.(null);
                  onProvinceChange(null);
                  onTownChange(null);
                  onAreaChange?.(null);
                } else {
                  onRegionChange?.(region.regionId);
                  onProvinceChange(region.regionName);
                  onTownChange(null);
                  onAreaChange?.(null);
                }
              }}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-primary-600 text-white'
                  : `${colors.bg} ${colors.hover} text-white`
                } border border-transparent shadow-sm`}
            >
              <span>{region.regionName}</span>
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold text-white">
                {region.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Area Filter - Show when a region is selected */}
      {selectedRegion && areas.length > 0 && (
        <div className="flex flex-wrap gap-2 pl-4 border-l-2 border-gray-200">
          <div className="w-full mb-2">
            <span className="text-sm font-medium text-gray-600">
              {t('filter_titles.areas_in_region', { region: currentRegionName })}:
            </span>
          </div>
          {areas.map((area) => {
            const colors = areaColors[currentRegionName] || {
              bg: 'bg-gray-300',
              hover: 'hover:bg-gray-400',
              hex: '#D1D5DB',
            };

            const isActive = selectedArea === area.areaId;

            return (
              <button
                key={area.areaId}
                onClick={() => {
                  if (isActive) {
                    onAreaChange?.(null);
                  } else {
                    onAreaChange?.(area.areaId);
                  }
                }}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors
                  ${isActive
                    ? 'bg-primary-500 text-white'
                    : `${colors.bg} ${colors.hover} text-gray-700`
                  } border border-transparent shadow-sm`}
              >
                <span>{area.areaName}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold
                  ${isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-500/20 text-gray-600'
                  }`}
                >
                  {area.count}
                </span>
              </button>
            );
          })}
        </div>
      )}

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