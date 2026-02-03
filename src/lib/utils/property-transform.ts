/**
 * Property transformation utilities
 * Shared between server and client components
 */

import type { PropertyForCard } from '@/context/PropertyCacheContext';

export interface DatabaseProperty {
  Property_ID: number;
  Property_Ref: string | string[];
  Property_Address?: string;
  Public_Price: number;
  Bedrooms: number;
  Bathrooms: number;
  Property_Type_ID: number;
  PropertyType?: string;
  Area_ID: number;
  SubArea_ID: number;
  GPS_Latitude?: number;
  GPS_Longitude?: number;
  Property_Notes?: string;
  Display: number;
  Build_Size?: number;
  Plot_Size?: number;
  Year_Built?: number;
  Featured?: boolean;
  Exclusive?: boolean;
  Original_Price?: number;
  Num_Photos?: number;
  SQM_Built?: number;
  Area_Name?: string;
  Region_Name?: string;
  PropertyAddress?: string;
}

/**
 * Transform database property to card format
 */
export function transformPropertyForCard(
  db: DatabaseProperty,
  typesMap: Record<number, string> = {},
  tCommon?: any
): PropertyForCard {
  // Only consider reduced if Original_Price exists, is greater than 0, and is greater than Public_Price
  const hasValidOriginalPrice = db.Original_Price && db.Original_Price > 0;
  const isReduced = Boolean(hasValidOriginalPrice && db.Original_Price && db.Original_Price > db.Public_Price);
  const savingsAmount = isReduced && db.Original_Price ? db.Original_Price - db.Public_Price : 0;

  const refArray = Array.isArray(db.Property_Ref) ? db.Property_Ref : [db.Property_Ref];
  const uniqueRef = Array.from(new Set(refArray));
  const propertyRef = uniqueRef[0];

  // Get property type with priority:
  // 1. Look up by Property_Type_ID in types map (translated to current language)
  // 2. Use PropertyType from API (may be in different language, but better than generic)
  // 3. Fallback to generic "Property" only if nothing else available
  let propertyType: string;
  if (db.Property_Type_ID && typesMap && typesMap[db.Property_Type_ID]) {
    propertyType = typesMap[db.Property_Type_ID];
  } else if (db.PropertyType && db.PropertyType.trim() !== '') {
    propertyType = db.PropertyType;
  } else {
    propertyType = tCommon?.('property') || 'Property';
  }

  // Generate image URLs dynamically based on Num_Photos
  const imageCount = db.Num_Photos && db.Num_Photos > 0 ? db.Num_Photos : 1;
  const images = Array.from({ length: imageCount }, (_, i) => ({
    url: `https://www.inlandandalucia.com/images/photos/properties/${propertyRef}/${propertyRef}_${i + 1}.jpg`,
    alt: `${propertyType} (${propertyRef}) ${tCommon?.('image') || 'image'} ${i + 1}`,
    isFeatured: i === 0, // first image is featured
  }));

  return {
    id: db.Property_ID.toString(),
    title: `${propertyType} (${propertyRef})`,
    price: db.Public_Price,
    // Only set originalPrice if it exists and is greater than 0
    originalPrice: (db.Original_Price && db.Original_Price > 0) ? db.Original_Price : undefined,
    currency: 'EUR',
    shortDescription: db.Property_Notes || '',
    location: {
      // Priority 1: If Property_Address exists, use it (split by comma)
      // Priority 2: Otherwise use Area_Name and Region_Name
      // Priority 3: If neither exists, return null (don't display location)
      town: db.Property_Address?.trim() 
            ? db.Property_Address.split(',')[0]?.trim() || null
            : (db.Area_Name?.trim() || null),
      province: db.Property_Address?.trim()
                ? db.Property_Address.split(',')[1]?.trim() || null
                : (db.Region_Name?.trim() || null),
    },
    features: {
      bedrooms: db.Bedrooms || 0,
      bathrooms: db.Bathrooms || 0,
      buildSize: db.SQM_Built || db.Build_Size || 0,
      type: propertyType,
    },
    images,
    isReduced,
    savingsAmount,
  };
}

/**
 * Transform multiple properties
 */
export function transformProperties(
  properties: DatabaseProperty[],
  typesMap: Record<number, string> = {},
  tCommon?: any
): PropertyForCard[] {
  return properties.map(p => transformPropertyForCard(p, typesMap, tCommon));
}

