import Image from "next/image";
import Link from "next/link";
import { useTranslations } from 'next-intl';

export default function Home() {
 const t = useTranslations('banner');
 const tCommon = useTranslations('common');

  return (
    <section className="relative min-h-[650px] h-[75vh]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_bg.jpg"
          alt={tCommon('andalucianCountryside')}
          fill
          className="object-cover brightness-75"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--color-primary))] filter brightness-50 to-transparent z-10"></div>

      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-2xl">
          <h1 className="font-heading text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
             {t('title')}
          </h1>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/properties"
              className="rounded-md bg-secondary-500 px-8 inline-flex items-center py-1 min-h-[50px] font-medium text-white shadow-md hover:bg-primary-600 transition-colors"
            >
              {t('button')}
            </Link>
            <Link
              href="/contact"
              className="rounded-md border-2 border-white bg-transparent inline-flex items-center px-8 py-1 min-h-[50px] font-medium text-white shadow-md hover:bg-primary-600 hover:border-primary-600 transition-colors"
            >
              {t('contact_us')}
            </Link>
          </div>
        </div>
      </div>
    </section>
    )
};