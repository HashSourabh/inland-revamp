import { Metadata } from 'next';
import { allProperties } from '@/data/properties';
import PropertiesLayout from '@/components/properties/PropertiesLayout';

export const metadata: Metadata = {
  title: 'Properties for Sale in Inland Andalucia | Rural Spanish Properties',
  description: 'Browse our selection of properties for sale in inland Andalucia. Find your dream home in rural Spain with our exclusive listings of country houses, villas, and townhouses.',
};

export default function PropertiesPage() {
  return <PropertiesLayout properties={allProperties} />;
} 