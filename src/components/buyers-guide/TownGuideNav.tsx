'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';


export function TownGuideNav() {
  const pathname = usePathname();
  const u = useTranslations('navigation');
  const t = useTranslations('navigation.links');
  const navItems = [
    { title: t('cordoba'), href: '/town-guide/cordoba' },
    { title: t('granada'), href: '/town-guide/granada' },
    { title: t('jaen'), href: '/town-guide/jaen' },
    { title: t('malaga'), href: '/town-guide/malaga' },
    { title: t('seville'), href: '/town-guide/seville' },

  ];

  // Remove locale prefix from pathname for comparison
  const pathWithoutLocale = pathname?.replace(/^\/[a-z]{2}/, '') || '/';

  return (
    <nav className="sticky top-[120px] rounded-xl border border-black/10 bg-white mb-6 p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className='p-2.5 border-b border-black/10 mb-4'>
        <h2 className="text-2xl font-semibold text-primary-900 dark:text-white">
          {u('townGuide')}
        </h2>
      </div>
      <ul className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathWithoutLocale === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`relative block rounded-md px-3 py-2 text-base hover:bg-secondary-500 hover:text-white transition-colors ${isActive
                  ? 'text-white  '
                  : ' text-primary-600 text-base'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-md bg-secondary-500 "
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