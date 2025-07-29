import { useMemo } from 'react';
import { Property } from '@/types/property';
import TownFilter from './TownFilter';

interface AreaFilterProps {
  properties: Property[];
  selectedProvince: string | null;
  selectedTown: string | null;
  onProvinceChange: (province: string | null) => void;
  onTownChange: (town: string | null) => void;
}

// Define province colors with hex values instead of Tailwind classes
const provinceColors: Record<string, { bg: string; hover: string; hex: string }> = {
  'ALL': { bg: 'bg-neutral-500', hover: 'hover:bg-neutral-600', hex: '#6B7280' },
  'Malaga': { bg: 'bg-blue-500', hover: 'hover:bg-blue-600', hex: '#3B82F6' },
  'Cordoba': { bg: 'bg-green-500', hover: 'hover:bg-green-600', hex: '#22C55E' },
  'Granada': { bg: 'bg-purple-500', hover: 'hover:bg-purple-600', hex: '#A855F7' },
  'Jaen': { bg: 'bg-orange-500', hover: 'hover:bg-orange-600', hex: '#F97316' },
  'Sevilla': { bg: 'bg-red-500', hover: 'hover:bg-red-600', hex: '#EF4444' },
  'Cadiz': { bg: 'bg-teal-500', hover: 'hover:bg-teal-600', hex: '#14B8A6' },
  'Almeria': { bg: 'bg-pink-500', hover: 'hover:bg-pink-600', hex: '#EC4899' }
};

export default function AreaFilter({ 
  properties, 
  selectedProvince, 
  selectedTown,
  onProvinceChange,
  onTownChange 
}: AreaFilterProps) {
  const provinceStats = useMemo(() => {
    // Calculate individual province stats
    const stats = properties.reduce((acc, property) => {
      const province = property.location.province;
      acc[province] = (acc[province] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Calculate total count for ALL option
    const totalCount = Object.values(stats).reduce((sum, count) => sum + count, 0);

    // Add ALL option with total count and ensure proper typing
    const allStats: [string, number][] = [
      ['ALL', totalCount],
      ...Object.entries(stats).sort((a, b) => b[1] - a[1])
    ];

    return allStats;
  }, [properties]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {provinceStats.map(([province, count]) => {
          const colors = provinceColors[province] || { bg: 'bg-gray-500', hover: 'hover:bg-gray-600' };
          return (
            <button
              key={province}
              onClick={() => {
                if (selectedProvince === province) {
                  onProvinceChange(null);
                  onTownChange(null);
                } else {
                  onProvinceChange(province === 'ALL' ? null : province);
                  onTownChange(null);
                }
              }}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors
                ${
                  selectedProvince === province || (province === 'ALL' && !selectedProvince)
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

      {/* Show town filter when a province is selected */}
      {selectedProvince && selectedProvince !== 'ALL' && (
        <TownFilter
          properties={properties}
          province={selectedProvince}
          selectedTown={selectedTown}
          onTownChange={onTownChange}
        />
      )}
    </div>
  );
} 