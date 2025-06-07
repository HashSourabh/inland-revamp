'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
  { title: 'Buying a Property', href: '/buyers-guide/buying-property' },
  { title: 'Buying Process', href: '/buyers-guide/buying-process' },
  { title: 'Property Taxes', href: '/buyers-guide/property-taxes' },
  { title: 'FAQs', href: '/buyers-guide/faqs' },
  { title: 'Unpaid Taxes', href: '/buyers-guide/unpaid-taxes' },
  { title: 'Mortgage', href: '/buyers-guide/mortgage' },
];

export function BuyersGuideNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-24 rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h2 className="mb-4 font-playfair text-xl font-semibold text-slate-900 dark:text-white">
        Buyer&apos;s Guide
      </h2>
      <ul className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`relative block rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-md bg-blue-50 dark:bg-blue-900/20"
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative">{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}