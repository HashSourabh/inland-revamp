import { useMemo } from 'react';
import { Property } from '@/types/property';
import TownFilter from './TownFilter';

interface RegionCount {
  regionId: number;
  regionName: string;
  count: number;
}

interface AreaFilterProps {
  properties: Property[];
  selectedProvince: string | null;
  selectedTown: string | null;
  selectedRegion?: number | null;
  regions?: RegionCount[];
  allCount?: number; // 👈 total from API
  onProvinceChange: (province: string | null) => void;
  onTownChange: (town: string | null) => void;
  onRegionChange?: (regionId: number | null) => void;
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
  Huelva: { bg: 'bg-indigo-500', hover: 'hover:bg-indigo-600', hex: '#6366F1' }, // 👈 added
};

export default function AreaFilter({
  properties,
  selectedProvince,
  selectedTown,
  selectedRegion,
  regions = [],
  allCount = 0,
  onProvinceChange,
  onTownChange,
  onRegionChange,
}: AreaFilterProps) {
  // Province stats (excluding ALL, that comes from API total)
  const provinceStats = useMemo(() => {
    const stats = properties.reduce((acc, property) => {
      const province = property.location?.province ?? 'Unknown';
      acc[province] = (acc[province] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(stats).sort((a, b) => b[1] - a[1]);
  }, [properties]);

  return (
    <div className="space-y-4">
      {/* ALL Button */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => {
            onProvinceChange(null);
            onTownChange(null);
            onRegionChange?.(null);
          }}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors
            ${!selectedProvince && !selectedRegion
              ? 'bg-primary-600 text-white'
              : 'bg-gray-500 hover:bg-gray-600 text-white'
            } border border-transparent shadow-sm`}
        >
          <span>ALL</span>
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold text-white">
            {allCount}
          </span>
        </button>

        {/* Province Buttons */}
        {provinceStats.map(([province, count]) => {
          const colors = regionColors[province] || {
            bg: 'bg-gray-500',
            hover: 'hover:bg-gray-600',
            hex: '#6B7280',
          };

          const isActive = selectedProvince === province;

          return (
            <button
              key={province}
              onClick={() => {
                if (isActive) {
                  onProvinceChange(null);
                  onTownChange(null);
                  onRegionChange?.(null);
                } else {
                  onProvinceChange(province);
                  onTownChange(null);
                  onRegionChange?.(null);
                }
              }}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-primary-600 text-white'
                  : `${colors.bg} ${colors.hover} text-white`
                } border border-transparent shadow-sm`}
            >
              <span>{province}</span>
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold text-white">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Town Filter */}
      {selectedProvince && selectedProvince !== 'ALL' && (
        <TownFilter
          properties={properties}
          province={selectedProvince}
          selectedTown={selectedTown}
          onTownChange={onTownChange}
        />
      )}

      {/* Region Buttons (dynamic from API) */}
      {regions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {regions.map((region) => {
            const isActive = selectedRegion === region.regionId;

            const colors = regionColors[region.regionName] || {
              bg: 'bg-blue-500',
              hover: 'hover:bg-blue-600',
              hex: '#3B82F6',
            };

            return (
              <button
                key={region.regionId}
                onClick={() =>
                  onRegionChange?.(isActive ? null : region.regionId)
                }
                className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium transition-colors
                  ${isActive
                    ? 'bg-primary-600 text-white'
                    : `${colors.bg} ${colors.hover} text-white`
                  }`}
              >
                <span>{region.regionName}</span>
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold text-white">
                  {region.count}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
