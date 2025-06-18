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

// Define province colors
const provinceColors: Record<string, { bg: string; hover: string }> = {
  'Malaga': { bg: 'bg-blue-500', hover: 'hover:bg-blue-600' },
  'Cordoba': { bg: 'bg-green-500', hover: 'hover:bg-green-600' },
  'Granada': { bg: 'bg-purple-500', hover: 'hover:bg-purple-600' },
  'Jaen': { bg: 'bg-orange-500', hover: 'hover:bg-orange-600' },
  'Sevilla': { bg: 'bg-red-500', hover: 'hover:bg-red-600' },
  'Cadiz': { bg: 'bg-teal-500', hover: 'hover:bg-teal-600' },
  'Almeria': { bg: 'bg-pink-500', hover: 'hover:bg-pink-600' }
};

export default function AreaFilter({ 
  properties, 
  selectedProvince, 
  selectedTown,
  onProvinceChange,
  onTownChange 
}: AreaFilterProps) {
  const provinceStats = useMemo(() => {
    const stats = properties.reduce((acc, property) => {
      const province = property.location.province;
      acc[province] = (acc[province] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(stats).sort((a, b) => a[0].localeCompare(b[0]));
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
                  onProvinceChange(province);
                  onTownChange(null);
                }
              }}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors
                ${
                  selectedProvince === province
                    ? 'bg-primary-600 text-white'
                    : `${colors.bg} ${colors.hover} text-white`
                } border border-transparent shadow-sm`}
            >
              <span>{province}</span>
              <span className={`rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold text-white`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Show town filter when a province is selected */}
      {selectedProvince && (
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