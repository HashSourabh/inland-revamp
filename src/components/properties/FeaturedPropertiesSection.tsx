/**
 * Server Component for Featured Properties Section
 * Fetches data on the server for better performance and SEO
 */

import { getFeaturedPropertiesServer } from '@/lib/api/properties-server';
import { transformProperties } from '@/lib/utils/property-transform';
import { getPropertyTypesServer } from '@/lib/api/properties-server';
import FeaturedPropertiesClient from './FeaturedPropertiesClient';
import { getTranslations } from 'next-intl/server';

export default async function FeaturedPropertiesSection() {
  // Fetch data in parallel on the server
  const [featuredDb, propertyTypes, t] = await Promise.all([
    getFeaturedPropertiesServer(1, 9),
    getPropertyTypesServer(),
    getTranslations('home'),
  ]);

  // Create types map
  const typesMap: Record<number, string> = {};
  propertyTypes.forEach((t) => {
    typesMap[t.id] = t.name;
  });

  // Transform properties
  const featuredProperties = transformProperties(featuredDb, typesMap);

  return (
    <FeaturedPropertiesClient 
      properties={featuredProperties}
      translations={{
        title: t('featured.title'),
        subtitle: t('featured.subtitle'),
        loading: t('featured.loading'),
        viewAllLink: t('featured.viewAllLink'),
        viewAllButton: t('featured.viewAllButton'),
      }}
    />
  );
}

