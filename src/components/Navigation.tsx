'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface MenuItem {
  label: string;
  href: string;
  submenu?: {
    label: string;
    href: string;
  }[];
}

const menuItems: MenuItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Properties', href: '/properties' },
  { label: 'Blog', href: '/blog' },
  {
    label: 'About Andalucia',
    href: '/about-andalucia',
    submenu: [
      { label: 'Location', href: '/about-andalucia/location' },
      { label: 'Weather', href: '/about-andalucia/weather' },
      { label: 'Airports', href: '/about-andalucia/airports' }
    ]
  },
  {
    label: 'Contact Us',
    href: '/contact',
    submenu: [
      { label: 'Our Offices', href: '/contact/our-offices' },
      { label: 'Newsletter', href: '/contact/newsletter' },
      { label: 'Useful Links', href: '/contact/useful-links' },
      { label: 'Agents Private Area', href: 'https://inlandandalucia.com/agentlogin.aspx' } // ✅ fixed
    ]
  }
];

export default function Navigation() {
  const pathname = usePathname();
  const locale = useLocale();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isActive = (href: string) => {
    // Remove locale prefix from pathname for comparison
    const pathWithoutLocale = pathname?.replace(/^\/[a-z]{2}/, '') || '/';
    return pathWithoutLocale === href || pathname === `/${locale}${href}`;
  };
  const isActiveParent = (item: MenuItem) => {
    const pathWithoutLocale = pathname?.replace(/^\/[a-z]{2}/, '') || '/';
    if (pathWithoutLocale === item.href || pathname === `/${locale}${item.href}`) return true;
    if (item.submenu?.some((sub) => {
      const subPathWithoutLocale = pathname?.replace(/^\/[a-z]{2}/, '') || '/';
      return subPathWithoutLocale === sub.href || pathname === `/${locale}${sub.href}`;
    })) return true;
    return false;
  };

  const renderLink = (href: string, label: string, className: string) => {
    const isExternal = href.startsWith('http');
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {label}
        </a>
      );
    }
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  };

  return (
    <nav className="relative z-50 bg-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          {/* Logo */}
          <div className="flex flex-shrink-0 items-center">
            <Link href="/" className="text-xl font-bold text-primary-600">
              Inland Andalucia
            </Link>
          </div>

          {/* Main Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.submenu ? (
                  <button
                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                      isActiveParent(item)
                        ? 'border-primary-500 text-neutral-900'
                        : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700'
                    }`}
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.label ? null : item.label)
                    }
                  >
                    {item.label}
                    <ChevronDownIcon
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                        openDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={`/${locale}${item.href}`}
                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                      isActive(item.href)
                        ? 'border-primary-500 text-neutral-900'
                        : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.submenu && openDropdown === item.label && (
                  <div
                    className="absolute left-0 z-50 mt-1 min-w-[200px] rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {item.submenu.map((subItem) => {
                      const href = subItem.href.startsWith('http') 
                        ? subItem.href 
                        : `/${locale}${subItem.href}`;
                      return renderLink(
                        href,
                        subItem.label,
                        `block px-4 py-2 text-sm transition-colors duration-150 ${
                          isActive(subItem.href)
                            ? 'bg-primary-50 text-primary-600'
                            : 'text-neutral-700 hover:bg-neutral-50 hover:text-primary-600'
                        }`
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-500"
              onClick={() => setOpenDropdown(openDropdown ? null : 'mobile')}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {openDropdown === 'mobile' && (
        <div className="absolute inset-x-0 top-16 z-50 bg-white shadow-lg sm:hidden">
          <div className="space-y-1 pb-3 pt-2">
            {menuItems.map((item) => (
              <div key={item.label}>
                {item.submenu ? (
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.label ? 'mobile' : item.label)
                    }
                    className={`flex w-full items-center justify-between border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                      isActiveParent(item)
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-700'
                    }`}
                  >
                    {item.label}
                    <ChevronDownIcon
                      className={`h-5 w-5 transition-transform duration-200 ${
                        openDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={`/${locale}${item.href}`}
                    onClick={() => setOpenDropdown(null)}
                    className={`flex w-full items-center border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                      isActive(item.href)
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-700'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
                {item.submenu && openDropdown === item.label && (
                  <div className="bg-neutral-50 py-2">
                    {item.submenu.map((subItem) => {
                      const href = subItem.href.startsWith('http') 
                        ? subItem.href 
                        : `/${locale}${subItem.href}`;
                      return renderLink(
                        href,
                        subItem.label,
                        `block py-2 pl-8 pr-4 text-sm ${
                          isActive(subItem.href)
                            ? 'text-primary-700'
                            : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700'
                        }`
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
