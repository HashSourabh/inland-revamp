'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ChevronDownIcon, HomeIcon } from '@heroicons/react/24/outline';
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
  onLinkClick?: () => void;
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

export default function Navigation({ isRtl = false, onLinkClick }: NavigationProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownPositionClass = isRtl ? 'right-0 left-auto' : 'left-0';
  const t = useTranslations('navigation');

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

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
            className="flex items-center gap-3 px-6 py-2.5 text-sm text-neutral-900 lg:text-white hover:text-secondary-300 hover:bg-primary-800 transition-colors"
            onClick={onLinkClick}
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
          className="flex items-center gap-3 px-6 py-2.5 text-sm text-neutral-900 lg:text-white hover:text-secondary-300 hover:bg-primary-800 transition-colors"
          onClick={onLinkClick}
        >
          <Icon className="h-5 w-5 text-secondary-400" />
          {t(link.labelKey)}
        </Link>
      );
    });

  return (
    <nav className={`flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-3 xl:gap-5   ${isRtl ? 'flex-row-reverse' : ''}`}>
      <Link href="/" className="flex px-2 lg:px-0 py-2 lg:py-0 items-center justify-between lg:justify-start gap-1.5 text-neutral-900 hover:text-primary-600 transition-colors text-[15px] w-full lg:w-auto" onClick={onLinkClick}>
        <HomeIcon className="h-5 w-5 text-secondary-400 hidden lg:inline-block" /> <span className="text-[15px] inline-block lg:hidden font-medium">Home</span>
      </Link>

      {/* Property Search Dropdown */}
      <div className="relative group w-full lg:w-auto">
        <button 
          onClick={() => toggleDropdown('properties')}
          className="flex px-2 lg:px-0 py-2 lg:py-0 items-center justify-between lg:justify-start gap-1.5 text-neutral-900 group-hover:text-primary-600 transition-colors text-[15px] w-full lg:w-auto font-medium"
        >
          {t('properties')}
          <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${openDropdown === 'properties' ? 'rotate-180' : ''} lg:group-hover:rotate-180`} />
        </button>
        <div
          className={`lg:absolute lg:top-full pt-2 ${openDropdown === 'properties' ? 'block' : 'hidden'} lg:opacity-0 -translate-y-1 lg:pointer-events-none lg:group-hover:block group-hover:opacity-100 group-hover:translate-y-0 lg:group-hover:pointer-events-auto lg:group-hover:translate-y-0 transition-all duration-200 ${dropdownPositionClass}`}
        >
          <div className="bg-gray-100 lg:bg-primary-900 rounded-lg lg:shadow-lg py-3 w-full lg:w-72 lg:border lg:border-primary-800">
            {renderDropdown(propertySearchLinks)}
          </div>
        </div>
      </div>

      {/* Town Guide Dropdown */}
      <div className="relative group w-full lg:w-auto">
        <button 
          onClick={() => toggleDropdown('townGuide')}
          className="flex px-2 lg:px-0 py-2 lg:py-0 items-center justify-between lg:justify-start gap-1.5 text-neutral-900 group-hover:text-primary-600 transition-colors text-[15px] w-full lg:w-auto font-medium"
        >
          {t('townGuide')}
          <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${openDropdown === 'townGuide' ? 'rotate-180' : ''} lg:group-hover:rotate-180`} />
        </button>
        <div
          className={`lg:absolute lg:top-full pt-2 ${openDropdown === 'townGuide' ? 'block' : 'hidden'} lg:opacity-0 -translate-y-1 lg:pointer-events-none lg:group-hover:block group-hover:opacity-100 group-hover:translate-y-0 lg:group-hover:pointer-events-auto lg:group-hover:translate-y-0 transition-all duration-200 ${dropdownPositionClass}`}
        >
          <div className="bg-gray-100 lg:bg-primary-900 rounded-lg lg:shadow-lg py-3 w-full lg:w-72 lg:border lg:border-primary-800">
            {renderDropdown(townGuideLinks)}
          </div>
        </div>
      </div>

      {/* Buyer's Guide Dropdown */}
      <div className="relative group w-full lg:w-auto">
        <button 
          onClick={() => toggleDropdown('buyersGuide')}
          className="flex px-2 lg:px-0 py-2 lg:py-0 items-center justify-between lg:justify-start gap-1.5 text-neutral-900 group-hover:text-primary-600 transition-colors text-[15px] w-full lg:w-auto font-medium"
        >
          {t('buyersGuide')}
          <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${openDropdown === 'buyersGuide' ? 'rotate-180' : ''} lg:group-hover:rotate-180`} />
        </button>
        <div
          className={`lg:absolute lg:top-full pt-2 ${openDropdown === 'buyersGuide' ? 'block' : 'hidden'} lg:opacity-0 -translate-y-1 lg:pointer-events-none lg:group-hover:block group-hover:opacity-100 group-hover:translate-y-0 lg:group-hover:pointer-events-auto lg:group-hover:translate-y-0 transition-all duration-200 ${dropdownPositionClass}`}
        >
          <div className="bg-gray-100 lg:bg-primary-900 rounded-lg lg:shadow-lg py-3 w-full lg:w-72 lg:border lg:border-primary-800">
            {renderDropdown(buyersGuideLinks)}
          </div>
        </div>
      </div>

      <a
        href="https://luvinland.com"
        target="_blank"
        rel="nofollow noreferrer"
        className="flex px-2 lg:px-0 py-2 lg:py-0 items-center justify-between lg:justify-start gap-1.5 text-neutral-900 hover:text-primary-600 transition-colors text-[15px] w-full lg:w-auto"
        onClick={onLinkClick}
      >
        {t('links.blog')}
      </a>

      {/* About Us Dropdown */}
      <div className="relative group w-full lg:w-auto">
        <button 
          onClick={() => toggleDropdown('about')}
          className="flex px-2 lg:px-0 py-2 lg:py-0 items-center justify-between lg:justify-start gap-1.5 text-neutral-900 group-hover:text-primary-600 transition-colors text-[15px] w-full lg:w-auto font-medium"
        >
          {t('about')}
          <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${openDropdown === 'about' ? 'rotate-180' : ''} lg:group-hover:rotate-180`} />
        </button>
        <div
          className={`lg:absolute lg:top-full pt-2 ${openDropdown === 'about' ? 'block' : 'hidden'} lg:opacity-0 -translate-y-1 lg:pointer-events-none lg:group-hover:block group-hover:opacity-100 group-hover:translate-y-0 lg:group-hover:pointer-events-auto lg:group-hover:translate-y-0 transition-all duration-200 ${dropdownPositionClass}`}
        >
          <div className="bg-gray-100 lg:bg-primary-900 rounded-lg lg:shadow-lg py-3 w-full lg:w-72 lg:border lg:border-primary-800">
            {renderDropdown(aboutUsLinks)}
          </div>
        </div>
      </div>

      {/* Contact Us Dropdown */}
      <div className="relative group w-full lg:w-auto">
        <button 
          onClick={() => toggleDropdown('contact')}
          className="flex px-2 lg:px-0 py-2 lg:py-0 items-center justify-between lg:justify-start gap-1.5 text-neutral-900 group-hover:text-primary-600 transition-colors text-[15px] w-full lg:w-auto font-medium"
        >
          {t('contact')}
          <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${openDropdown === 'contact' ? 'rotate-180' : ''} lg:group-hover:rotate-180`} />
        </button>
        <div
          className={`lg:absolute lg:top-full pt-2 ${openDropdown === 'contact' ? 'block' : 'hidden'} lg:opacity-0 -translate-y-1 lg:pointer-events-none lg:group-hover:block group-hover:opacity-100 group-hover:translate-y-0 lg:group-hover:pointer-events-auto lg:group-hover:translate-y-0 transition-all duration-200 ${dropdownPositionClass}`}
        >
          <div className="bg-gray-100 lg:bg-primary-900 rounded-lg lg:shadow-lg py-3 w-full lg:w-72 lg:border lg:border-primary-800">
            {renderDropdown(contactLinks)}
          </div>
        </div>
      </div>
    </nav>
  );
}
