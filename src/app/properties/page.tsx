import { Metadata } from 'next';
import { Suspense } from 'react';
import { allProperties } from '@/data/properties';
import PropertiesLayout from '@/components/properties/PropertiesLayout';
import Loading from '@/components/shared/Loading';

export const metadata: Metadata = {
  title: 'Properties for Sale in Inland Andalucia | Rural Spanish Properties',
  description: 'Browse our selection of properties for sale in inland Andalucia. Find your dream home in rural Spain with our exclusive listings of country houses, villas, and townhouses.',
  openGraph: {
    title: 'Properties for Sale in Inland Andalucia',
    description: 'Browse our selection of properties for sale in inland Andalucia. Find your dream home in rural Spain.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function PropertiesPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PropertiesLayout properties={allProperties} />
    </Suspense>
  );
} 