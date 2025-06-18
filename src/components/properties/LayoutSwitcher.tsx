'use client';

import { Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/outline';

type Layout = 'grid' | 'list';

interface LayoutSwitcherProps {
  currentLayout: Layout;
  onLayoutChange: (layout: Layout) => void;
}

export default function LayoutSwitcher({ currentLayout, onLayoutChange }: LayoutSwitcherProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">View:</span>
      <div className="flex rounded-lg border-2 border-neutral-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
        <button
          onClick={() => onLayoutChange('grid')}
          className={`flex items-center gap-2 rounded-l-md px-4 py-2 text-sm font-medium transition-colors ${
            currentLayout === 'grid'
              ? 'bg-primary-600 text-white'
              : 'text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-700'
          }`}
          aria-label="Grid view"
        >
          <Squares2X2Icon className="h-5 w-5" />
          <span>Grid</span>
        </button>
        <button
          onClick={() => onLayoutChange('list')}
          className={`flex items-center gap-2 rounded-r-md px-4 py-2 text-sm font-medium transition-colors ${
            currentLayout === 'list'
              ? 'bg-primary-600 text-white'
              : 'text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-700'
          }`}
          aria-label="List view"
        >
          <ListBulletIcon className="h-5 w-5" />
          <span>List</span>
        </button>
      </div>
    </div>
  );
} 