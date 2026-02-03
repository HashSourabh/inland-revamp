/**
 * Server Component for Exclusive Properties Section
 * Fetches data on the server for better performance and SEO
 */

import { getExclusivePropertiesServer } from '@/lib/api/properties-server';
import { transformProperties } from '@/lib/utils/property-transform';
import { getPropertyTypesServer } from '@/lib/api/properties-server';
import ExclusivePropertiesClient from './ExclusivePropertiesClient';
import { getTranslations } from 'next-intl/server';

export default async function ExclusivePropertiesSection() {
  // Fetch data in parallel on the server
  const [exclusiveDb, propertyTypes, t] = await Promise.all([
    getExclusivePropertiesServer(),
    getPropertyTypesServer(),
    getTranslations('home'),
  ]);

  // Create types map
  const typesMap: Record<number, string> = {};
  propertyTypes.forEach((t) => {
    typesMap[t.id] = t.name;
  });

  // Transform properties
  const exclusiveProperties = transformProperties(exclusiveDb, typesMap);

  return (
    <ExclusivePropertiesClient 
      properties={exclusiveProperties}
      translations={{
        title: t('exclusive.title'),
        subtitle: t('exclusive.subtitle'),
        none: t('exclusive.none'),
        moreTitle: t('exclusive.moreTitle'),
        moreSubtitle: t('exclusive.moreSubtitle'),
        viewAllExclusive: t('exclusive.viewAllExclusive'),
      }}
    />
  );
}

