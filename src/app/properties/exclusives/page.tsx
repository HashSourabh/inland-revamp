import { Metadata } from 'next';
import { allProperties } from '@/data/properties';
import PropertiesLayout from '@/components/properties/PropertiesLayout';

export const metadata: Metadata = {
  title: 'Exclusive Properties | Inland Andalucia',
  description: 'Browse our exclusive selection of properties for sale in inland Andalucia. Find your dream home with special offers and price reductions.',
};

export default function ExclusivesPage() {
  const exclusiveProperties = allProperties.filter(p => p.isExclusive);
  return <PropertiesLayout properties={exclusiveProperties} />;
} 