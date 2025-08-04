import React from 'react';
import { 
  HomeIcon, 
  BuildingOfficeIcon, 
  GlobeAltIcon,
  AcademicCapIcon,
  TruckIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface LinkCategory {
  title: string;
  icon: React.ReactNode;
  links: {
    title: string;
    url: string;
    description: string;
  }[];
}

export default function UsefulLinksPage() {
  const categories: LinkCategory[] = [
    {
      title: 'Property & Legal',
      icon: <HomeIcon className="h-6 w-6" />,
      links: [
        {
          title: 'Spanish Land Registry',
          url: 'https://www.registradores.org',
          description: 'Official property registration information'
        },
        {
          title: 'Spanish Notary Council',
          url: 'https://www.notariado.org',
          description: 'Information about the Spanish notary system'
        }
      ]
    },
    {
      title: 'Government & Administration',
      icon: <BuildingOfficeIcon className="h-6 w-6" />,
      links: [
        {
          title: 'Junta de Andalucía',
          url: 'https://www.juntadeandalucia.es',
          description: 'Regional government of Andalusia'
        },
        {
          title: 'Spanish Tax Agency',
          url: 'https://www.agenciatributaria.es',
          description: 'Tax information and procedures'
        }
      ]
    },
    {
      title: 'Tourism & Culture',
      icon: <GlobeAltIcon className="h-6 w-6" />,
      links: [
        {
          title: 'Andalucia Tourism',
          url: 'https://www.andalucia.org',
          description: 'Official tourism portal of Andalusia'
        },
        {
          title: 'Spanish Tourism',
          url: 'https://www.spain.info',
          description: 'Official tourism website of Spain'
        }
      ]
    },
    {
      title: 'Education',
      icon: <AcademicCapIcon className="h-6 w-6" />,
      links: [
        {
          title: 'Spanish Language Schools',
          url: '#',
          description: 'Learn Spanish in Andalucia'
        },
        {
          title: 'International Schools',
          url: '#',
          description: 'Education options for expatriates'
        }
      ]
    },
    {
      title: 'Moving & Relocation',
      icon: <TruckIcon className="h-6 w-6" />,
      links: [
        {
          title: 'Removal Companies',
          url: '#',
          description: 'International moving services'
        },
        {
          title: 'NIE Number Information',
          url: '#',
          description: 'Guide to obtaining your NIE'
        }
      ]
    },
    {
      title: 'Healthcare',
      icon: <HeartIcon className="h-6 w-6" />,
      links: [
        {
          title: 'Spanish Healthcare System',
          url: '#',
          description: 'Information about healthcare in Spain'
        },
        {
          title: 'Private Medical Insurance',
          url: '#',
          description: 'Healthcare options for residents'
        }
      ]
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 my-10">
      {/* Hero Section */}
      <div className="mb-8 bg-white rounded-xl border border-black/10 p-6">
        <h1 className="text-3xl font-bold text-primary-600 dark:text-white mb-5">
          Useful Links
        </h1>
        <p className="text-base text-neutral-600 m-0">
          Essential resources and information for living and buying property in Inland Andalucia
        </p>
      </div>

      {/* Links Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {categories.map((category, index) => (
          <div key={index} className="rounded-xl bg-white p-6 border border-black/10">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                {category.icon}
              </div>
              <h2 className="text-xl font-semibold text-primary-900">
                {category.title}
              </h2>
            </div>
            <div className="space-y-4">
              {category.links.map((link, linkIndex) => (
                <Link
                  key={linkIndex}
                  href={link.url}
                  className="block rounded-lg border border-black/10 p-4 transition-colors hover:border-primary-500 hover:bg-primary-50"
                >
                  <h3 className="font-semibold text-neutral-900">
                    {link.title}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600">
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 