'use client';

import Image from 'next/image';
import Cookies from 'js-cookie';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import EnFlag from '@/../public/flags/en.svg';
import EsFlag from '@/../public/flags/es.svg';
import FrFlag from '@/../public/flags/fr.svg';
import PtFlag from '@/../public/flags/pt.svg';
import DeFlag from '@/../public/flags/de.svg';

const languages = [
  { code: 'en', name: 'English', flag: EnFlag, id: 1 },
  { code: 'es', name: 'Español', flag: EsFlag, id: 2 },
  { code: 'fr', name: 'Français', flag: FrFlag, id: 3 },
  { code: 'pt', name: 'Português', flag: PtFlag, id: 8 },
  { code: 'de', name: 'German', flag: DeFlag, id: 4 },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // On mount, restore language from storage if available
  useEffect(() => {
    const storedLangId = localStorage.getItem('LanguageId') || Cookies.get('LanguageId');
    if (storedLangId) {
      const lang = languages.find((l) => l.id.toString() === storedLangId);
      if (lang && lang.code !== locale) {
        router.push(`/${lang.code}${pathname?.replace(`/${locale}`, '') || '/'}`);
      }
    }
  }, []);

  const handleLanguageChange = (newLocale: string, langId: number) => {
    const safePathname = pathname ?? '/';
    const pathWithoutLocale = safePathname.replace(`/${locale}`, '') || '/';

    // ✅ Save language ID to localStorage and Cookies
    localStorage.setItem('LanguageId', langId.toString());
    Cookies.set('LanguageId', langId.toString(), { expires: 7 });

    // Navigate with new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      {languages.map((l) => (
        <button
          key={l.code}
          onClick={() => handleLanguageChange(l.code, l.id)}
          className={`w-6 h-6 rounded-full border overflow-hidden flex items-center justify-center bg-white/90 dark:bg-gray-800 ${
            locale === l.code ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-300'
          }`}
          aria-label={l.name}
          title={l.name}
        >
          <Image
            src={l.flag}
            alt={l.name}
            width={16}
            height={16}
            className="object-contain"
          />
        </button>
      ))}
    </div>
  );
}
