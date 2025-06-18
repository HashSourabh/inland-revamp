'use client';

import { useState, useEffect } from 'react';

type Theme = {
  name: string;
  primary: string;
  secondary: string;
};

const themes: Theme[] = [
  {
    name: 'Classic Blue',
    primary: '61, 77, 121',
    secondary: '246, 112, 47'
  },
  {
    name: 'Forest Green',
    primary: '34, 97, 74',
    secondary: '234, 179, 8'
  },
  {
    name: 'Royal Purple',
    primary: '88, 28, 135',
    secondary: '234, 88, 12'
  },
  {
    name: 'Ocean Teal',
    primary: '15, 118, 110',
    secondary: '249, 115, 22'
  },
  {
    name: 'Burgundy',
    primary: '127, 29, 29',
    secondary: '252, 211, 77'
  },
  {
    name: 'Slate Blue',
    primary: '30, 58, 138',
    secondary: '239, 68, 68'
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
        <div className="absolute right-0 top-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-gray-900">Choose Theme</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {themes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => {
                  setCurrentTheme(theme);
                  setIsOpen(false);
                }}
                className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                  currentTheme.name === theme.name
                    ? 'border-gray-900 shadow-md'
                    : 'border-transparent hover:border-gray-200'
                }`}
              >
                <div className="flex gap-2 mb-2">
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: `rgb(${theme.primary})` }}
                  />
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: `rgb(${theme.secondary})` }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-700">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 