export const PROPERTY_TYPES = [
  { value: 'apartment', aliases: ['apartment', 'apartments', 'flat', 'flats'] },
  { value: 'villa', aliases: ['villa', 'villas'] },
  { value: 'townhouse', aliases: ['townhouse', 'town house', 'townhouses', 'town houses'] },
  { value: 'cottage', aliases: ['cottage', 'cottages', 'country house', 'country houses', 'finca', 'farmhouse'] },
  { value: 'property', aliases: ['property', 'properties', 'home', 'homes', 'house', 'houses', 'listing', 'listings'] },
];

export type SearchIntent = 'buy' | 'sell' | 'rent' | 'info' | 'unknown';

export type ParsedFilters = {
  propertyType?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  limit?: number;
  intent?: SearchIntent;
};

const normalizeWhitespace = (value: string) => value.replace(/\s+/g, ' ').trim();

const capitalizeWords = (value: string) =>
  value
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');

const parseLocation = (question: string): string | undefined => {
  const locationMatch = question.match(/\b(?:in|near|around|at)\s+([a-zA-Z\s]+?)(?=(?:\?|\.|,|$|with|under|below|over|price|budget))/i);
  if (locationMatch?.[1]) {
    const value = normalizeWhitespace(locationMatch[1].replace(/[^a-zA-Z\s-]/g, ' '));
    if (value.length >= 3) {
      return capitalizeWords(value);
    }
  }
  return undefined;
};

const parsePropertyType = (question: string): string | undefined => {
  const q = question.toLowerCase();
  for (const type of PROPERTY_TYPES) {
    if (type.aliases.some((alias) => q.includes(alias))) {
      return type.value;
    }
  }
  return undefined;
};

const toNumberWithUnit = (value?: string, unit?: string): number | undefined => {
  if (!value) return undefined;
  const numeric = parseFloat(value.replace(/[,\s]/g, ''));
  if (Number.isNaN(numeric)) return undefined;

  if (!unit) return Math.round(numeric);

  const normalized = unit.toLowerCase();
  if (normalized.startsWith('k') || normalized.includes('thousand')) {
    return Math.round(numeric * 1_000);
  }
  if (normalized.startsWith('m') || normalized.includes('million')) {
    return Math.round(numeric * 1_000_000);
  }
  if (normalized.includes('lakh')) {
    return Math.round(numeric * 100_000);
  }
  return Math.round(numeric);
};

const parsePriceRange = (question: string): Pick<ParsedFilters, 'minPrice' | 'maxPrice'> => {
  const lower = question.toLowerCase();
  const result: Pick<ParsedFilters, 'minPrice' | 'maxPrice'> = {};

  const betweenMatch = lower.match(
    /(between|from)\s+([\d.,]+)\s*(k|m|million|thousand|lakh)?\s+(and|to|-)\s+([\d.,]+)\s*(k|m|million|thousand|lakh)?/
  );
  if (betweenMatch) {
    result.minPrice = toNumberWithUnit(betweenMatch[2], betweenMatch[3]);
    result.maxPrice = toNumberWithUnit(betweenMatch[5], betweenMatch[6]);
    return result;
  }

  const maxMatch = lower.match(/(under|below|less than|upto|up to|max(?:imum)?)\s+([\d.,]+)\s*(k|m|million|thousand|lakh)?/);
  if (maxMatch) {
    result.maxPrice = toNumberWithUnit(maxMatch[2], maxMatch[3]);
  }

  const minMatch = lower.match(/(over|above|more than|min(?:imum)?)\s+([\d.,]+)\s*(k|m|million|thousand|lakh)?/);
  if (minMatch) {
    result.minPrice = toNumberWithUnit(minMatch[2], minMatch[3]);
  }

  if (!result.maxPrice) {
    const lakhMatch = lower.match(/([\d.]+)\s*lakh/);
    if (lakhMatch) {
      result.maxPrice = toNumberWithUnit(lakhMatch[1], 'lakh');
    }
  }

  return result;
};

const parseBedrooms = (question: string): number | undefined => {
  const match = question.match(/(\d+)\s*(?:bed|beds|bedroom|bedrooms|bhk)/i);
  if (match) {
    return Number(match[1]);
  }
  return undefined;
};

const parseBathrooms = (question: string): number | undefined => {
  const match = question.match(/(\d+)\s*(?:bath|baths|bathroom|bathrooms|toilet|toilets)/i);
  if (match) {
    return Number(match[1]);
  }
  return undefined;
};

const parseTopLimit = (question: string): number | undefined => {
  const match = question.match(/(?:top|best)\s+(\d+)/i);
  if (match) {
    return Number(match[1]);
  }
  return undefined;
};

const parseIntent = (question: string): SearchIntent => {
  const lower = question.toLowerCase();
  if (/(buy|purchase|looking for)/i.test(lower)) {
    return 'buy';
  }
  if (/(sell|list my property|valuation)/i.test(lower)) {
    return 'sell';
  }
  if (/(rent|rental|tenant)/i.test(lower)) {
    return 'rent';
  }
  if (/(information|info|details|process|guide)/i.test(lower)) {
    return 'info';
  }
  return 'unknown';
};

export const parseQuestion = (question: string): ParsedFilters => {
  const location = parseLocation(question);
  const propertyType = parsePropertyType(question);
  const { minPrice, maxPrice } = parsePriceRange(question);
  const minBedrooms = parseBedrooms(question);
  const minBathrooms = parseBathrooms(question);
  const limit = parseTopLimit(question);
  const intent = parseIntent(question);
  return {
    location,
    propertyType,
    minPrice,
    maxPrice,
    minBedrooms,
    minBathrooms,
    limit,
    intent,
  };
};

export const buildLink = (filters: ParsedFilters, locale = 'en'): string => {
  const params = new URLSearchParams();
  if (filters.propertyType) {
    params.set('propertyType', filters.propertyType);
  }
  if (filters.location) {
    params.set('location', filters.location);
    params.set('town', filters.location);
  }
  if (filters.minPrice) {
    params.set('minPrice', String(filters.minPrice));
  }
  if (filters.maxPrice) {
    params.set('maxPrice', String(filters.maxPrice));
  }
  if (filters.minBedrooms) {
    params.set('minBeds', String(filters.minBedrooms));
  }
  if (filters.minBathrooms) {
    params.set('minBaths', String(filters.minBathrooms));
  }
  if (filters.limit) {
    params.set('limit', String(filters.limit));
  }

  const query = params.toString();
  return `/${locale || 'en'}/properties${query ? `?${query}` : ''}`;
};

const formatPrice = (value?: number) => {
  if (!value) return '';
  return `€${value.toLocaleString('en-US')}`;
};

const buildSummary = (filters: ParsedFilters): string => {
  const parts: string[] = [];
  if (filters.propertyType) {
    parts.push(`${filters.propertyType}${filters.propertyType.endsWith('s') ? '' : 's'}`);
  } else {
    parts.push('properties');
  }
  if (filters.limit) {
    parts.unshift(`Top ${filters.limit}`);
  }
  if (filters.location) {
    parts.push(`in ${filters.location}`);
  }
  if (filters.minPrice && filters.maxPrice) {
    parts.push(`between ${formatPrice(filters.minPrice)} and ${formatPrice(filters.maxPrice)}`);
  } else if (filters.maxPrice) {
    parts.push(`under ${formatPrice(filters.maxPrice)}`);
  } else if (filters.minPrice) {
    parts.push(`above ${formatPrice(filters.minPrice)}`);
  }
  if (filters.minBedrooms) {
    parts.push(`with at least ${filters.minBedrooms} bedrooms`);
  }
  if (filters.minBathrooms) {
    parts.push(`and ${filters.minBathrooms}+ bathrooms`);
  }
  return parts.join(' ');
};

export const buildCorrectedAnswer = (question: string, locale = 'en', presetFilters?: ParsedFilters) => {
  const filters = presetFilters ?? parseQuestion(question);
  const link = buildLink(filters, locale);
  const summary = buildSummary(filters);

  const answer = `I found ${summary || 'properties'} that match your request. Tap here to view them: ${link}`;

  return {
    answer,
    link,
    filters,
  };
};

