'use client';

import { Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

type Layout = 'grid' | 'list';

interface LayoutSwitcherProps {
  currentLayout: Layout;
  onLayoutChange: (layout: Layout) => void;
}

export default function LayoutSwitcher({ currentLayout, onLayoutChange }: LayoutSwitcherProps) {
  const t = useTranslations('common');
  return (
    <div className="flex items-center gap-3">
      <div className="flex  bg-white dark:border-neutral-700 dark:bg-neutral-800">
        <button
          onClick={() => onLayoutChange('grid')}
          className={`flex items-center rounded-lg gap-2 px-3 py-2 text-sm font-medium transition-colors ${
            currentLayout === 'grid'
              ? 'bg-primary-600 text-white'
              : 'text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-700'
          }`}
          aria-label={t('gridView')}
        >
          <Squares2X2Icon className="h-6 w-6" />
        </button>
        <button
          onClick={() => onLayoutChange('list')}
          className={`flex items-center rounded-lg gap-2 px-3 py-2 text-sm font-medium transition-colors ${
            currentLayout === 'list'
              ? 'bg-primary-600 text-white'
              : 'text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-700'
          }`}
          aria-label={t('listView')}
        >
          <ListBulletIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
} 