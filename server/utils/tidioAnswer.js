const PROPERTY_TYPES = [
  { value: 'apartment', aliases: ['apartment', 'apartments', 'flat', 'flats'] },
  { value: 'villa', aliases: ['villa', 'villas'] },
  { value: 'townhouse', aliases: ['townhouse', 'town house', 'townhouses', 'town houses'] },
  { value: 'cottage', aliases: ['cottage', 'cottages', 'country house', 'country houses', 'finca', 'farmhouse'] },
  { value: 'property', aliases: ['property', 'properties', 'home', 'homes', 'house', 'houses', 'listing', 'listings'] },
];

const normalizeWhitespace = (value = '') => value.replace(/\s+/g, ' ').trim();

const capitalizeWords = (value = '') =>
  value
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');

const parseLocation = (question = '') => {
  const match = question.match(/\b(?:in|near|around|at)\s+([a-zA-Z\s]+?)(?=(?:\?|\.|,|$|with|under|below|over|price|budget))/i);
  if (match && match[1]) {
    const cleaned = normalizeWhitespace(match[1].replace(/[^a-zA-Z\s-]/g, ' '));
    if (cleaned.length >= 3) {
      return capitalizeWords(cleaned);
    }
  }
  return undefined;
};

const parsePropertyType = (question = '') => {
  const lower = question.toLowerCase();
  for (const type of PROPERTY_TYPES) {
    if (type.aliases.some((alias) => lower.includes(alias))) {
      return type.value;
    }
  }
  return undefined;
};

const toNumberWithUnit = (value, unit) => {
  if (!value) return undefined;
  const numeric = parseFloat(String(value).replace(/[,\s]/g, ''));
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

const parsePriceRange = (question = '') => {
  const lower = question.toLowerCase();
  const result = {};

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

const parseBedrooms = (question = '') => {
  const match = question.match(/(\d+)\s*(?:bed|beds|bedroom|bedrooms|bhk)/i);
  return match ? Number(match[1]) : undefined;
};

const parseBathrooms = (question = '') => {
  const match = question.match(/(\d+)\s*(?:bath|baths|bathroom|bathrooms|toilet|toilets)/i);
  return match ? Number(match[1]) : undefined;
};

const parseTopLimit = (question = '') => {
  const match = question.match(/(?:top|best)\s+(\d+)/i);
  return match ? Number(match[1]) : undefined;
};

const parseQuestion = (question = '') => {
  const location = parseLocation(question);
  const propertyType = parsePropertyType(question);
  const { minPrice, maxPrice } = parsePriceRange(question);
  const minBedrooms = parseBedrooms(question);
  const minBathrooms = parseBathrooms(question);
  const limit = parseTopLimit(question);
  return {
    location,
    propertyType,
    minPrice,
    maxPrice,
    minBedrooms,
    minBathrooms,
    limit,
  };
};

const buildLink = (filters, locale = 'en') => {
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

const formatPrice = (value) => {
  if (!value) return '';
  return `€${Number(value).toLocaleString('en-US')}`;
};

const buildSummary = (filters) => {
  const segments = [];
  if (filters.limit) {
    segments.push(`Top ${filters.limit}`);
  }
  if (filters.propertyType) {
    segments.push(`${filters.propertyType}${filters.propertyType.endsWith('s') ? '' : 's'}`);
  } else {
    segments.push('properties');
  }
  if (filters.location) {
    segments.push(`in ${filters.location}`);
  }
  if (filters.minPrice && filters.maxPrice) {
    segments.push(`between ${formatPrice(filters.minPrice)} and ${formatPrice(filters.maxPrice)}`);
  } else if (filters.maxPrice) {
    segments.push(`under ${formatPrice(filters.maxPrice)}`);
  } else if (filters.minPrice) {
    segments.push(`above ${formatPrice(filters.minPrice)}`);
  }
  if (filters.minBedrooms) {
    segments.push(`with at least ${filters.minBedrooms} bedrooms`);
  }
  if (filters.minBathrooms) {
    segments.push(`and ${filters.minBathrooms}+ bathrooms`);
  }
  return segments.join(' ');
};

const buildCorrectedAnswer = (question = '', locale = 'en', presetFilters) => {
  const filters = presetFilters || parseQuestion(question);
  const link = buildLink(filters, locale);
  const summary = buildSummary(filters) || 'properties';
  const answer = `I found ${summary} that match your request. Tap here to view them: ${link}`;
  return { answer, link, filters };
};

module.exports = {
  buildCorrectedAnswer,
};

