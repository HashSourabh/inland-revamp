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

interface NavLink {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface NavigationProps {
  isRtl?: boolean;
}

const propertySearchLinks: NavLink[] = [
  { href: '/properties/advanced-search', label: 'Advanced Search', icon: MagnifyingGlassIcon },
  { href: '/properties/map-search', label: 'Search by Google Map', icon: MapIcon },
  { href: '/properties/exclusives', label: 'Exclusives', icon: StarIcon },
  { href: '/properties/viewing-trip', label: 'Viewing Trip', icon: CalendarDaysIcon }
];

const townGuideLinks: NavLink[] = [
  { href: '/town-guide/cordoba', label: 'Cordoba Province', icon: BuildingOfficeIcon },
  { href: '/town-guide/granada', label: 'Granada Province', icon: BuildingOfficeIcon },
  { href: '/town-guide/jaen', label: 'Jaen Province', icon: BuildingOfficeIcon },
  { href: '/town-guide/malaga', label: 'Malaga Province', icon: BuildingOfficeIcon },
  { href: '/town-guide/sevilla', label: 'Seville Province', icon: BuildingOfficeIcon }
];

const buyersGuideLinks: NavLink[] = [
  { href: '/buyers-guide/buying-property', label: 'Buying a Property', icon: DocumentTextIcon },
  { href: '/buyers-guide/buying-process', label: 'Buying Process', icon: DocumentTextIcon },
  { href: '/buyers-guide/property-taxes', label: 'Property Taxes', icon: CurrencyDollarIcon },
  { href: '/buyers-guide/faqs', label: 'FAQs', icon: QuestionMarkCircleIcon },
  { href: '/buyers-guide/unpaid-taxes', label: 'Unpaid Taxes', icon: ExclamationTriangleIcon },
  { href: '/buyers-guide/mortgage', label: 'Mortgage', icon: BanknotesIcon }
];

const aboutUsLinks: NavLink[] = [
  { href: '/about/location', label: 'Location', icon: MapPinIcon },
  { href: '/about/weather', label: 'Weather', icon: SunIcon },
  { href: '/about/airports', label: 'Airports', icon: PaperAirplaneIcon }
];

const contactLinks: NavLink[] = [
  { href: '/contact/our-offices', label: 'Our Offices', icon: BuildingOfficeIcon },
  { href: '/contact/newsletter', label: 'Newsletter', icon: NewspaperIcon },
  { href: '/contact/useful-links', label: 'Useful Links', icon: LinkIcon },
  { href: 'https://inlandandalucia.com/agentlogin.aspx', label: 'Agents Private Area', icon: UserGroupIcon }
];

export default function Navigation({ isRtl = false }: NavigationProps) {
  const dropdownPositionClass = isRtl ? 'right-0 left-auto' : 'left-0';

  const renderDropdown = (links: NavLink[]) =>
    links.map((link) => {
      const Icon = link.icon;
      const isExternal = link.href.startsWith('http');

      if (isExternal) {
        return (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-2.5 text-sm text-white hover:text-secondary-300 hover:bg-primary-800 transition-colors"
          >
            <Icon className="h-5 w-5 text-secondary-400" />
            {link.label}
          </a>
        );
      }

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
    });

  return (
    <nav className={`hidden md:flex items-center gap-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
      <Link href="/" className="text-neutral-900 hover:text-primary-600 transition-colors">
        Home
      </Link>

      {/* Property Search Dropdown */}
      <div className="relative group">
        <button className="flex items-center gap-1.5 text-neutral-900 group-hover:text-primary-600 transition-colors">
          Property Search
          <ChevronDownIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
        </button>
        <div
          className={`absolute top-full pt-2 opacity-0 -translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 ${dropdownPositionClass}`}
        >
          <div className="bg-primary-900 rounded-lg shadow-lg py-3 w-72 border border-primary-800">
            {renderDropdown(propertySearchLinks)}
          </div>
        </div>
      </div>

      {/* Town Guide Dropdown */}
      <div className="relative group">
        <button className="flex items-center gap-1.5 text-neutral-900 group-hover:text-primary-600 transition-colors">
          Town Guide
          <ChevronDownIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
        </button>
        <div
          className={`absolute top-full pt-2 opacity-0 -translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 ${dropdownPositionClass}`}
        >
          <div className="bg-primary-900 rounded-lg shadow-lg py-3 w-72 border border-primary-800">
            {renderDropdown(townGuideLinks)}
          </div>
        </div>
      </div>

      {/* Buyer's Guide Dropdown */}
      <div className="relative group">
        <button className="flex items-center gap-1.5 text-neutral-900 group-hover:text-primary-600 transition-colors">
          Buyer's Guide
          <ChevronDownIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
        </button>
        <div
          className={`absolute top-full pt-2 opacity-0 -translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 ${dropdownPositionClass}`}
        >
          <div className="bg-primary-900 rounded-lg shadow-lg py-3 w-72 border border-primary-800">
            {renderDropdown(buyersGuideLinks)}
          </div>
        </div>
      </div>

      <a
        href="https://luvinland.com"
        target="_blank"
        rel="nofollow noreferrer"
        className="text-neutral-900 hover:text-primary-600 transition-colors"
      >
        Blog
      </a>

      {/* About Us Dropdown */}
      <div className="relative group">
        <button className="flex items-center gap-1.5 text-neutral-900 group-hover:text-primary-600 transition-colors">
          About Us
          <ChevronDownIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
        </button>
        <div
          className={`absolute top-full pt-2 opacity-0 -translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 ${dropdownPositionClass}`}
        >
          <div className="bg-primary-900 rounded-lg shadow-lg py-3 w-72 border border-primary-800">
            {renderDropdown(aboutUsLinks)}
          </div>
        </div>
      </div>

      {/* Contact Us Dropdown */}
      <div className="relative group">
        <button className="flex items-center gap-1.5 text-neutral-900 group-hover:text-primary-600 transition-colors">
          Contact Us
          <ChevronDownIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
        </button>
        <div
          className={`absolute top-full pt-2 opacity-0 -translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 ${dropdownPositionClass}`}
        >
          <div className="bg-primary-900 rounded-lg shadow-lg py-3 w-72 border border-primary-800">
            {renderDropdown(contactLinks)}
          </div>
        </div>
      </div>
    </nav>
  );
}
