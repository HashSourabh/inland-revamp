// utils/colorUtils.ts
export interface ColorScheme {
  bg: string;
  hover: string;
  hex: string;
  light?: string;
  lightHover?: string;
}

// Region/Province colors (main colors)
export const regionColors: Record<string, ColorScheme> = {
  Malaga: { 
    bg: 'bg-blue-500', 
    hover: 'hover:bg-blue-600', 
    hex: '#3B82F6',
    light: 'bg-blue-100',
    lightHover: 'hover:bg-blue-200'
  },
  Cordoba: { 
    bg: 'bg-green-500', 
    hover: 'hover:bg-green-600', 
    hex: '#22C55E',
    light: 'bg-green-100',
    lightHover: 'hover:bg-green-200'
  },
  Granada: { 
    bg: 'bg-purple-500', 
    hover: 'hover:bg-purple-600', 
    hex: '#A855F7',
    light: 'bg-purple-100',
    lightHover: 'hover:bg-purple-200'
  },
  Jaen: { 
    bg: 'bg-orange-500', 
    hover: 'hover:bg-orange-600', 
    hex: '#F97316',
    light: 'bg-orange-100',
    lightHover: 'hover:bg-orange-200'
  },
  Sevilla: { 
    bg: 'bg-red-500', 
    hover: 'hover:bg-red-600', 
    hex: '#EF4444',
    light: 'bg-red-100',
    lightHover: 'hover:bg-red-200'
  },
  Cadiz: { 
    bg: 'bg-teal-500', 
    hover: 'hover:bg-teal-600', 
    hex: '#14B8A6',
    light: 'bg-teal-100',
    lightHover: 'hover:bg-teal-200'
  },
  Almeria: { 
    bg: 'bg-pink-500', 
    hover: 'hover:bg-pink-600', 
    hex: '#EC4899',
    light: 'bg-pink-100',
    lightHover: 'hover:bg-pink-200'
  },
  Huelva: { 
    bg: 'bg-indigo-500', 
    hover: 'hover:bg-indigo-600', 
    hex: '#6366F1',
    light: 'bg-indigo-100',
    lightHover: 'hover:bg-indigo-200'
  },
  ALL: { 
    bg: 'bg-gray-500', 
    hover: 'hover:bg-gray-600', 
    hex: '#6B7280',
    light: 'bg-gray-100',
    lightHover: 'hover:bg-gray-200'
  },
  default: { 
    bg: 'bg-gray-500', 
    hover: 'hover:bg-gray-600', 
    hex: '#6B7280',
    light: 'bg-gray-100',
    lightHover: 'hover:bg-gray-200'
  }
};

// Area colors (lighter variations of region colors)
export const areaColors: Record<string, ColorScheme> = {
  Malaga: { 
    bg: 'bg-blue-300', 
    hover: 'hover:bg-blue-400', 
    hex: '#93C5FD',
    light: 'bg-blue-50',
    lightHover: 'hover:bg-blue-100'
  },
  Cordoba: { 
    bg: 'bg-green-300', 
    hover: 'hover:bg-green-400', 
    hex: '#86EFAC',
    light: 'bg-green-50',
    lightHover: 'hover:bg-green-100'
  },
  Granada: { 
    bg: 'bg-purple-300', 
    hover: 'hover:bg-purple-400', 
    hex: '#C4B5FD',
    light: 'bg-purple-50',
    lightHover: 'hover:bg-purple-100'
  },
  Jaen: { 
    bg: 'bg-orange-300', 
    hover: 'hover:bg-orange-400', 
    hex: '#FDBA74',
    light: 'bg-orange-50',
    lightHover: 'hover:bg-orange-100'
  },
  Sevilla: { 
    bg: 'bg-red-300', 
    hover: 'hover:bg-red-400', 
    hex: '#FCA5A5',
    light: 'bg-red-50',
    lightHover: 'hover:bg-red-100'
  },
  Cadiz: { 
    bg: 'bg-teal-300', 
    hover: 'hover:bg-teal-400', 
    hex: '#5EEAD4',
    light: 'bg-teal-50',
    lightHover: 'hover:bg-teal-100'
  },
  Almeria: { 
    bg: 'bg-pink-300', 
    hover: 'hover:bg-pink-400', 
    hex: '#F9A8D4',
    light: 'bg-pink-50',
    lightHover: 'hover:bg-pink-100'
  },
  Huelva: { 
    bg: 'bg-indigo-300', 
    hover: 'hover:bg-indigo-400', 
    hex: '#A5B4FC',
    light: 'bg-indigo-50',
    lightHover: 'hover:bg-indigo-100'
  },
  default: { 
    bg: 'bg-gray-300', 
    hover: 'hover:bg-gray-400', 
    hex: '#D1D5DB',
    light: 'bg-gray-50',
    lightHover: 'hover:bg-gray-100'
  }
};

// Helper functions to get colors
export const getRegionColors = (regionName: string): ColorScheme => {
  return regionColors[regionName] || regionColors.default;
};

export const getAreaColors = (regionName: string): ColorScheme => {
  return areaColors[regionName] || areaColors.default;
};

// Generate dynamic styles (for cases where you need inline styles)
export const getRegionStyle = (regionName: string, isActive: boolean = false) => {
  const colors = getRegionColors(regionName);
  return {
    backgroundColor: colors.hex,
    borderColor: isActive ? '#1E40AF' : 'transparent', // primary-700
  };
};

export const getAreaStyle = (regionName: string, isActive: boolean = false) => {
  const colors = getAreaColors(regionName);
  return {
    backgroundColor: colors.hex,
    borderColor: isActive ? '#3B82F6' : 'transparent', // primary-600
  };
};