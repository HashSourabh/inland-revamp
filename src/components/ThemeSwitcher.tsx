'use client';

import { useState, useEffect } from 'react';

type Theme = {
  name: string;
  primary: string;
  secondary: string;
};

const themes: Theme[] = [
  {
    name: 'Option 1',
    primary: '61, 77, 121',
    secondary: '246, 112, 47'
  },
  {
    name: 'Option 2',
    primary: '46, 48, 145',
    secondary: '217, 185, 36'
  }
];

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Apply theme
    document.documentElement.style.setProperty('--color-primary', currentTheme.primary);
    document.documentElement.style.setProperty('--color-secondary', currentTheme.secondary);
  }, [currentTheme]);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white p-3 rounded-l-lg shadow-lg hover:bg-gray-50 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Choose Theme</h3>
          <div className="space-y-2">
            {themes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => {
                  setCurrentTheme(theme);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm ${
                  currentTheme.name === theme.name
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="capitalize">{theme.name}</span>
                <div className="flex gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: `rgb(${theme.primary})` }}
                  />
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: `rgb(${theme.secondary})` }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 