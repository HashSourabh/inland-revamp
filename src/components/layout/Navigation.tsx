'use client';

import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { 
  MagnifyingGlassIcon,
  MapIcon,
  StarIcon,
  CalendarDaysIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  QuestionMarkCircleIcon,
  ExclamationTriangleIcon,
  BanknotesIcon,
  MapPinIcon,
  SunIcon,
  PaperAirplaneIcon,
  NewspaperIcon,
  LinkIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const propertySearchLinks = [
  { href: '/properties/advanced-search', label: 'Advanced Search', icon: MagnifyingGlassIcon },
  { href: '/properties/map-search', label: 'Search by Google Map', icon: MapIcon },
  { href: '/properties/exclusives', label: 'Exclusives', icon: StarIcon },
  { href: '/properties/viewing-trip', label: 'Viewing Trip', icon: CalendarDaysIcon }
];

const townGuideLinks = [
  { href: '/town-guide/cordoba', label: 'Cordoba Province', icon: BuildingOfficeIcon },
  { href: '/town-guide/granada', label: 'Granada Province', icon: BuildingOfficeIcon },
  { href: '/town-guide/jaen', label: 'Jaen Province', icon: BuildingOfficeIcon },
  { href: '/town-guide/malaga', label: 'Malaga Province', icon: BuildingOfficeIcon },
  { href: '/town-guide/sevilla', label: 'Seville Province', icon: BuildingOfficeIcon }
];

const buyersGuideLinks = [
  { href: '/buyers-guide/buying-property', label: 'Buying a Property', icon: DocumentTextIcon },
  { href: '/buyers-guide/process', label: 'Buying Process', icon: DocumentTextIcon },
  { href: '/buyers-guide/taxes', label: 'Property Taxes', icon: CurrencyDollarIcon },
  { href: '/buyers-guide/faqs', label: 'FAQs', icon: QuestionMarkCircleIcon },
  { href: '/buyers-guide/unpaid-taxes', label: 'Unpaid Taxes', icon: ExclamationTriangleIcon },
  { href: '/buyers-guide/mortgage', label: 'Mortgage', icon: BanknotesIcon }
];

const aboutUsLinks = [
  { href: '/about/location', label: 'Location', icon: MapPinIcon },
  { href: '/about/weather', label: 'Weather', icon: SunIcon },
  { href: '/about/airports', label: 'Airports', icon: PaperAirplaneIcon }
];

const contactLinks = [
  { href: '/contact/our-offices', label: 'Our Offices', icon: BuildingOfficeIcon },
  { href: '/contact/newsletter', label: 'Newsletter', icon: NewspaperIcon },
  { href: '/contact/useful-links', label: 'Useful Links', icon: LinkIcon },
  { href: '/contact/agents-private-area', label: 'Agents Private Area', icon: UserGroupIcon },
];

export default function Navigation() {
  return (
    <nav className="hidden md:flex items-center gap-8">
      <Link href="/" className="text-neutral-900 hover:text-primary-600 transition-colors">
        Home
      </Link>
      
      {/* Property Search Dropdown */}
      <div className="relative group">
        <button className="flex items-center gap-1.5 text-neutral-900 group-hover:text-primary-600 transition-colors">
          Property Search
          <ChevronDownIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
        </button>
        <div className="absolute top-full left-0 pt-2 opacity-0 -translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
          <div className="bg-primary-900 rounded-lg shadow-lg py-3 w-72 border border-primary-800">
            {propertySearchLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-6 py-2.5 text-sm text-white hover:text-secondary-300 hover:bg-primary-800 transition-colors"
                >
                  <Icon className="h-5 w-5 text-secondary-400" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Town Guide Dropdown */}
      <div className="relative group">
        <button className="flex items-center gap-1.5 text-neutral-900 group-hover:text-primary-600 transition-colors">
          Town Guide
          <ChevronDownIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
        </button>
        <div className="absolute top-full left-0 pt-2 opacity-0 -translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
          <div className="bg-primary-900 rounded-lg shadow-lg py-3 w-72 border border-primary-800">
            {townGuideLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-6 py-2.5 text-sm text-white hover:text-secondary-300 hover:bg-primary-800 transition-colors"
                >
                  <Icon className="h-5 w-5 text-secondary-400" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Buyer's Guide Dropdown */}
      <div className="relative group">
        <button className="flex items-center gap-1.5 text-neutral-900 group-hover:text-primary-600 transition-colors">
          Buyer's Guide
          <ChevronDownIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
        </button>
        <div className="absolute top-full left-0 pt-2 opacity-0 -translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
          <div className="bg-primary-900 rounded-lg shadow-lg py-3 w-72 border border-primary-800">
            {buyersGuideLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-6 py-2.5 text-sm text-white hover:text-secondary-300 hover:bg-primary-800 transition-colors"
                >
                  <Icon className="h-5 w-5 text-secondary-400" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <a href="https://luvinland.com" target="_blank" rel="nofollow noreferrer" className="text-neutral-900 hover:text-primary-600 transition-colors">
        Blog
      </a>
      
      {/* About Us Dropdown */}
      <div className="relative group">
        <button className="flex items-center gap-1.5 text-neutral-900 group-hover:text-primary-600 transition-colors">
          About Us
          <ChevronDownIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
        </button>
        <div className="absolute top-full left-0 pt-2 opacity-0 -translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
          <div className="bg-primary-900 rounded-lg shadow-lg py-3 w-72 border border-primary-800">
            {aboutUsLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-6 py-2.5 text-sm text-white hover:text-secondary-300 hover:bg-primary-800 transition-colors"
                >
                  <Icon className="h-5 w-5 text-secondary-400" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Contact Us Dropdown */}
      <div className="relative group">
        <button className="flex items-center gap-1.5 text-neutral-900 group-hover:text-primary-600 transition-colors">
          Contact Us
          <ChevronDownIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
        </button>
        <div className="absolute top-full left-0 pt-2 opacity-0 -translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
          <div className="bg-primary-900 rounded-lg shadow-lg py-3 w-72 border border-primary-800">
            {contactLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-6 py-2.5 text-sm text-white hover:text-secondary-300 hover:bg-primary-800 transition-colors"
                >
                  <Icon className="h-5 w-5 text-secondary-400" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}