'use client';

import Image from 'next/image';
import Cookies from 'js-cookie';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import EnFlag from '@/../public/flags/en.svg';
import EsFlag from '@/../public/flags/es.svg';
import FrFlag from '@/../public/flags/fr.svg';
import PtFlag from '@/../public/flags/pt.svg';
import DeFlag from '@/../public/flags/de.svg';

const languageCodes = [
  { code: 'en', flag: EnFlag, id: 1 },
  { code: 'es', flag: EsFlag, id: 2 },
  { code: 'fr', flag: FrFlag, id: 3 },
  { code: 'pt', flag: PtFlag, id: 8 },
  { code: 'de', flag: DeFlag, id: 4 },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('languages');
  const [isOpen, setIsOpen] = useState(false);
  const [isFlag, setIsFlag] = useState(() => {
    // Initialize with the current locale's index
    const currentLangIndex = languageCodes.findIndex(lang => lang.code === locale);
    return currentLangIndex !== -1 ? currentLangIndex : 0;
  });

  // Get language names from translations
  const getLanguageName = (code: string) => {
    const names: { [key: string]: string } = {
      'en': t('english'),
      'es': t('spanish'),
      'fr': t('french'),
      'pt': t('portuguese'),
      'de': t('german'),
    };
    return names[code] || code.toUpperCase();
  };

  const languages = languageCodes.map(lang => ({
    ...lang,
    name: getLanguageName(lang.code)
  }));

  // On mount, restore language from storage if available
  useEffect(() => {
    const storedLangId = localStorage.getItem('LanguageId') || Cookies.get('LanguageId');
    if (storedLangId) {
      const lang = languageCodes.find((l) => l.id.toString() === storedLangId);
      if (lang && lang.code !== locale) {
        router.push(`/${lang.code}${pathname?.replace(`/${locale}`, '') || '/'}`);
      }
      const langIndex = languageCodes.findIndex(lang => lang.id.toString() === storedLangId);
       if (langIndex !== -1) {
        setIsFlag(langIndex);
      }
    } else {
      // If no stored language, set flag to match current locale
      const currentLangIndex = languageCodes.findIndex(lang => lang.code === locale);
      if (currentLangIndex !== -1) {
        setIsFlag(currentLangIndex);
      }
    }
  }, [locale, pathname, router]);

  const handleLanguageChange = (newLocale: string, langId: number) => {
    const safePathname = pathname ?? '/';
    const pathWithoutLocale = safePathname.replace(`/${locale}`, '') || '/';

    // ✅ Save language ID to localStorage and Cookies
    localStorage.setItem('LanguageId', langId.toString());
    Cookies.set('LanguageId', langId.toString(), { expires: 7 });

    // Clear any cached data to ensure clean transition
    // Force a full page refresh to clear previous language data
    window.location.href = `/${newLocale}${pathWithoutLocale}`;
  };

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isOpen && !target.closest('.language-switcher')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative flex items-center gap-2">
      <button
        onClick={handleDropdown}
        className={`border rounded-lg border-gray-500 px-3 py-1.5 flex items-center justify-center bg-white/0 dark:bg-gray-800 gap-2 ${
          locale === languages[isFlag].code ? '' : ''
        }`}
            aria-label={languages[isFlag]?.name || languageCodes[isFlag].code}
        title={languages[isFlag]?.name || languageCodes[isFlag].code}
      >
        <div className="flex items-center justify-center">
        <Image
          src={languageCodes[isFlag].flag}
          alt={languages[isFlag]?.name || languageCodes[isFlag].code}
          width={24}
          height={24}
          className=" rounded-sm object-contain"
          />
        </div>
        <span className="text-base font-normal text-gray-700 text-white ">{languageCodes[isFlag].code.toUpperCase()}</span>
      </button>
      {isOpen && (
        <div className='language-switcher absolute top-full mt-1 right-0 bg-white rounded-lg shadow-lg p-3 space-y-2 z-[9999]'>
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => handleLanguageChange(l.code, l.id)}
            className={`px-3 py-1.5 flex items-center justify-start bg-white/0 dark:bg-gray-800 gap-2 w-full  rounded-lg ${
              locale === l.code ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-300'
            }`}
            aria-label={l.name}
            title={l.name}
          >
            <div className="flex items-center justify-center">
            <Image
              src={l.flag}
              alt={l.name}
              width={20}
              height={20}
              className="min-w-5 min-h-5 rounded-sm object-contain"
            />
            </div>
            <span className="text-base font-normal text-gray-700">{l.name}</span>
          </button>
        ))}
        </div>
      )}
    </div>
  );
}
