import { useMemo } from 'react';
import { Property } from '@/types/property';

interface TownFilterProps {
  properties: Property[];
  province: string;
  selectedTown: string | null;
  onTownChange: (town: string | null) => void;
}

export default function TownFilter({ properties, province, selectedTown, onTownChange }: TownFilterProps) {
  const townStats = useMemo(() => {
    const stats = properties
      .filter(property => property.location.province === province)
      .reduce((acc, property) => {
        const town = property.location.town;
        acc[town] = (acc[town] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(stats).sort((a, b) => a[0].localeCompare(b[0]));
  }, [properties, province]);

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {townStats.map(([town, count]) => (
        <button
          key={town}
          onClick={() => onTownChange(selectedTown === town ? null : town)}
          className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium transition-colors
            ${
              selectedTown === town
                ? 'bg-secondary-500 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600'
            } border border-transparent`}
        >
          <span>{town}</span>
          <span className={`rounded-full px-1.5 py-0.5 text-xs font-semibold
            ${
              selectedTown === town
                ? 'bg-white/20 text-white'
                : 'bg-white/60 text-neutral-600 dark:bg-black/30 dark:text-neutral-300'
            }`}
          >
            {count}
          </span>
        </button>
      ))}
    </div>
  );
} 