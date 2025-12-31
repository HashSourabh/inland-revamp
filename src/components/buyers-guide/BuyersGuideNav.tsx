'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function BuyersGuideNav() {
  const pathname = usePathname();
  const u=useTranslations('navigation');
  const t = useTranslations('navigation.links'); // reference your JSON path

  // Remove locale prefix from pathname for comparison
  const pathWithoutLocale = pathname?.replace(/^\/[a-z]{2}/, '') || '/';

  const navItems = [
    { title: t('buyingProperty'), href: '/buyers-guide/buying-property' },
    { title: t('buyingProcess'), href: '/buyers-guide/buying-process' },
    { title: t('propertyTaxes'), href: '/buyers-guide/property-taxes' },
    { title: t('faqs'), href: '/buyers-guide/faqs' },
    { title: t('unpaidTaxes'), href: '/buyers-guide/unpaid-taxes' },
    { title: t('mortgage'), href: '/buyers-guide/mortgage' },
  ];

  return (
    <nav className="sticky top-[120px] rounded-xl border border-black/10 bg-white mb-6 p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="p-2.5 border-b border-black/10 mb-4">
        <h2 className="lg:text-2xl sm:text-xl text-lg font-semibold text-primary-900 dark:text-white">
          {u('buyersGuide')}
        </h2>
      </div>
      <ul className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathWithoutLocale === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`relative block rounded-md px-3 py-2 xs:text-base text-sm hover:bg-secondary-500 hover:text-white transition-colors ${
                  isActive ? 'text-white' : 'text-primary-600 text-base'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-md bg-secondary-500"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
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
