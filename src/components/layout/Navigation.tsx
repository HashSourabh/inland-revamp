'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
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

interface NavLinkConfig {
  href: string;
  labelKey: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface NavigationProps {
  isRtl?: boolean;
}

const propertySearchLinks: NavLinkConfig[] = [
  { href: '/properties/advanced-search', labelKey: 'links.advancedSearch', icon: MagnifyingGlassIcon },
  { href: '/properties/map-search', labelKey: 'links.searchByMap', icon: MapIcon },
  { href: '/properties/exclusives', labelKey: 'links.exclusives', icon: StarIcon },
  { href: '/properties/viewing-trip', labelKey: 'links.viewingTrip', icon: CalendarDaysIcon }
];

const townGuideLinks: NavLinkConfig[] = [
  { href: '/town-guide/cordoba', labelKey: 'links.cordoba', icon: BuildingOfficeIcon },
  { href: '/town-guide/granada', labelKey: 'links.granada', icon: BuildingOfficeIcon },
  { href: '/town-guide/jaen', labelKey: 'links.jaen', icon: BuildingOfficeIcon },
  { href: '/town-guide/malaga', labelKey: 'links.malaga', icon: BuildingOfficeIcon },
  { href: '/town-guide/sevilla', labelKey: 'links.seville', icon: BuildingOfficeIcon }
];

const buyersGuideLinks: NavLinkConfig[] = [
  { href: '/buyers-guide/buying-property', labelKey: 'links.buyingProperty', icon: DocumentTextIcon },
  { href: '/buyers-guide/buying-process', labelKey: 'links.buyingProcess', icon: DocumentTextIcon },
  { href: '/buyers-guide/property-taxes', labelKey: 'links.propertyTaxes', icon: CurrencyDollarIcon },
  { href: '/buyers-guide/faqs', labelKey: 'links.faqs', icon: QuestionMarkCircleIcon },
  { href: '/buyers-guide/unpaid-taxes', labelKey: 'links.unpaidTaxes', icon: ExclamationTriangleIcon },
  { href: '/buyers-guide/mortgage', labelKey: 'links.mortgage', icon: BanknotesIcon }
];

const aboutUsLinks: NavLinkConfig[] = [
  { href: '/about/location', labelKey: 'links.location', icon: MapPinIcon },
  { href: '/about/weather', labelKey: 'links.weather', icon: SunIcon },
  { href: '/about/airports', labelKey: 'links.airports', icon: PaperAirplaneIcon }
];

const contactLinks: NavLinkConfig[] = [
  { href: '/contact/our-offices', labelKey: 'links.ourOffices', icon: BuildingOfficeIcon },
  { href: '/contact/newsletter', labelKey: 'links.newsletter', icon: NewspaperIcon },
  { href: '/contact/useful-links', labelKey: 'links.usefulLinks', icon: LinkIcon },
  { href: 'https://inlandandalucia.com/agentlogin.aspx', labelKey: 'links.agentsPrivateArea', icon: UserGroupIcon }
];

export default function Navigation({ isRtl = false }: NavigationProps) {
  const dropdownPositionClass = isRtl ? 'right-0 left-auto' : 'left-0';
  const t = useTranslations('navigation');

  const renderDropdown = (links: NavLinkConfig[]) =>
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
            {t(link.labelKey)}
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
          {t(link.labelKey)}
        </Link>
      );
    });

  return (
    <nav className={`hidden md:flex items-center gap-5 ${isRtl ? 'flex-row-reverse' : ''}`}>
      {/* <Link href="/" className="text-neutral-900 hover:text-primary-600 transition-colors">
        {t('home')}
      </Link> */}

      {/* Property Search Dropdown */}
      <div className="relative group">
        <button className="flex items-center gap-1.5 text-neutral-900 group-hover:text-primary-600 transition-colors text-[15px]">
          {t('properties')}
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
        <button className="flex items-center gap-1.5 text-neutral-900 group-hover:text-primary-600 transition-colors text-[15px]">
          {t('townGuide')}
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
        <button className="flex items-center gap-1.5 text-neutral-900 group-hover:text-primary-600 transition-colors text-[15px]">
          {t('buyersGuide')}
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
        {t('links.blog')}
      </a>

      {/* About Us Dropdown */}
      <div className="relative group">
        <button className="flex items-center gap-1.5 text-neutral-900 group-hover:text-primary-600 transition-colors text-[15px]">
          {t('about')}
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
        <button className="flex items-center gap-1.5 text-neutral-900 group-hover:text-primary-600 transition-colors text-[15px]">
          {t('contact')}
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
