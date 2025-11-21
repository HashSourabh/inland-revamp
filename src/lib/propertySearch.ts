const TYPE_SYNONYMS: Record<string, string> = {
  villa: 'Villa',
  villas: 'Villa',
  house: 'House',
  houses: 'House',
  apartment: 'Apartment',
  apartments: 'Apartment',
  flat: 'Apartment',
  flats: 'Apartment',
  condo: 'Apartment',
  townhouse: 'Town House',
  townhouses: 'Town House',
  cortijo: 'Cortijo',
  cortijos: 'Cortijo',
  plot: 'Land',
  plots: 'Land',
  land: 'Land',
};

const PROPERTY_API_BASE_URL =
  process.env.PROPERTY_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE ||
  'http://localhost:4000/api/v1';

const FRONTEND_BASE_URL =
  process.env.FRONTEND_BASE_URL || 'https://inlandandalucia.com';

function normalizeSpaces(input: string): string {
  return input.replace(/\s+/g, ' ').trim();
}

function parseBedrooms(message: string): number | undefined {
  const lower = message.toLowerCase();
  const bhkMatch = lower.match(/(\d{1,2})\s*bhk/);
  if (bhkMatch) return parseInt(bhkMatch[1], 10);
  const bedMatch = lower.match(/(\d{1,2})\s*(bed|bedroom|bedrooms)/);
  if (bedMatch) return parseInt(bedMatch[1], 10);
  return undefined;
}

function parseType(message: string): string | undefined {
  const lower = message.toLowerCase();
  const words = Array.from(new Set(lower.match(/[a-zA-Z]+/g) || []));
  for (const word of words) {
    if (TYPE_SYNONYMS[word]) return TYPE_SYNONYMS[word];
  }
  return undefined;
}

function parsePrice(message: string): { maxPrice?: number } {
  const lower = message.toLowerCase();

  const maxMatch = lower.match(
    /\b(under|below|less than|upto|up to|max|maximum)\s+(?:€|eur|euro)?\s*(\d{1,3}(?:[,\s]\d{3})*(?:\.\d+)?)\s*(?:k|thousand|000)?/
  );
  if (maxMatch) {
    const amount = parseFloat(maxMatch[2].replace(/[,\s]/g, ''));
    return {
      maxPrice: amount < 1000 ? amount * 1000 : amount,
    };
  }

  return {};
}

function parseCity(message: string): {
  regionId?: number;
  regionName?: string;
  areaName?: string;
} {
  const lower = message.toLowerCase();

  const spanishLocations: Record<string, { regionId: number; regionName: string }> =
    {
      malaga: { regionId: 4, regionName: 'Malaga' },
      málaga: { regionId: 4, regionName: 'Malaga' },
      granada: { regionId: 2, regionName: 'Granada' },
      sevilla: { regionId: 5, regionName: 'Sevilla' },
      seville: { regionId: 5, regionName: 'Sevilla' },
      cordoba: { regionId: 1, regionName: 'Cordoba' },
      córdoba: { regionId: 1, regionName: 'Cordoba' },
      jaen: { regionId: 3, regionName: 'Jaen' },
      jaén: { regionId: 3, regionName: 'Jaen' },
      cadiz: { regionId: 8, regionName: 'Cadiz' },
      cádiz: { regionId: 8, regionName: 'Cadiz' },
    };

  for (const [key, value] of Object.entries(spanishLocations)) {
    if (lower.includes(key)) {
      return value;
    }
  }

  const inMatch = lower.match(/\bin\s+([a-zA-Z][a-zA-Z\s-]{2,})/);
  if (inMatch) {
    const city = normalizeSpaces(inMatch[1]);
    for (const [key, value] of Object.entries(spanishLocations)) {
      if (key.includes(city.toLowerCase())) return value;
    }
  }

  return {};
}

export function extractFilters(message: string) {
  const beds = parseBedrooms(message);
  const propertyType = parseType(message);
  const price = parsePrice(message);
  const location = parseCity(message);

  const filters: Record<string, string | number | boolean> = {};
  if (location.regionId) filters.regionId = location.regionId;
  if (propertyType) filters.propertyType = propertyType;
  if (typeof beds === 'number') filters.bedrooms = beds;
  if (typeof price.maxPrice === 'number') filters.maxPrice = price.maxPrice;

  return {
    filters,
    location,
    parsed: { beds, propertyType, price },
  };
}

export async function fetchProperties(
  filters: Record<string, any>,
  limit = 5
) {
  const params = new URLSearchParams();
  params.set('limit', String(limit));
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  });

  const base = PROPERTY_API_BASE_URL.replace(/\/$/, '');
  const url = `${base}/properties?${params.toString()}`;

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch property data');
  }

  const json = await res.json();
  const data = json?.data || json?.properties || [];
  return Array.isArray(data) ? data.slice(0, limit) : [];
}

export function buildPropertyContext(properties: any[]) {
  if (!properties.length) return 'No property data provided.';

  return properties
    .map((property, index) => {
      const title =
        property.Property_Title ||
        property.Property_Address ||
        property.title ||
        `Property ${property.Property_Ref || property.Property_ID || index + 1}`;
      const price =
        property.Public_Price || property.price || 'Price on request';
      const type =
        property.Property_Type || property.propertyType || 'Unknown type';
      const beds = property.Bedrooms || property.bedrooms || 'N/A';
      const baths = property.Bathrooms || property.bathrooms || 'N/A';
      const location =
        property.Property_Address ||
        property.location ||
        property.area ||
        '';
      const link = `${FRONTEND_BASE_URL.replace(/\/$/, '')}/en/properties/${
        property.Property_ID || property.id
      }`;

      return `Property ${index + 1}: ${title}; Price: €${price}; Type: ${type}; Bedrooms: ${beds}; Bathrooms: ${baths}; Location: ${location}; Link: ${link}`;
    })
    .join('\n');
}

export function buildPropertyCards(properties: any[]) {
  if (!properties.length) {
    return '';
  }

  return properties
    .map((property) => {
      const id = property.Property_ID || property.id;
      const title =
        property.Property_Title ||
        property.Property_Address ||
        property.title ||
        `Property ${property.Property_Ref || id}`;
      const price =
        property.Public_Price || property.price || 'Price on request';
      const type =
        property.Property_Type || property.propertyType || 'Property';
      const beds = property.Bedrooms || property.bedrooms;
      const baths = property.Bathrooms || property.bathrooms;
      const image =
        property.Image_URL ||
        property.imageUrl ||
        property.Images?.[0] ||
        '/images/default-property.jpg';
      const link = `${FRONTEND_BASE_URL.replace(/\/$/, '')}/en/properties/${id}`;

      return `
      <div class="property-card">
        <img src="${image}" alt="${title}" />
        <h3><a href="${link}" target="_blank" rel="noopener">${title}</a></h3>
        <p>€${price} — ${type}</p>
        <p>📍 ${property.Property_Address || property.area || 'Andalucia'}</p>
        <p>${beds ? `${beds} bed(s) ` : ''}${baths ? `• ${baths} bath(s)` : ''}</p>
        <a href="${link}" target="_blank" rel="noopener">View Details</a>
      </div>
      `;
    })
    .join('\n');
}


