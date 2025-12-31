import Image from "next/image";
import Link from "next/link";
import { useTranslations } from 'next-intl';

export default function Home() {
 const t = useTranslations('banner');
 const tCommon = useTranslations('common');

  return (
    <section className="relative z-0">
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

      <div className="relative flex items-center z-20 mx-auto md:max-w-7xl max-w-4xl px-4 sm:px-6 lg:px-8 pb-20 md:pb-32 lg:pb-40 min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[650px] h-[40vh] sm:h-[40vh]">
        <div className="w-full md:max-w-2xl sm:max-w-xl max-w-md">
          <h1 className="font-heading font-bold leading-tight text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
             {t('title')}
          </h1>
          <div className="sm:mt-10 mt-6 flex flex-wrap gap-4">
            <Link
              href="/properties"
              className="rounded-md bg-secondary-500 px-4 sm:px-8 inline-flex items-center py-1 xs:min-h-[50px] min-h-[40px] font-medium text-white shadow-md hover:bg-primary-600 transition-colors text-sm sm:text-base"
            >
              {t('button')}
            </Link>
            <Link
              href="/contact"
              className="rounded-md border-2 border-white bg-transparent inline-flex items-center sm:px-8 px-4 py-1 xs:min-h-[50px] min-h-[40px] font-medium text-white shadow-md hover:bg-primary-600 hover:border-primary-600 transition-colors text-sm sm:text-base"
            >
              {t('contact_us')}
            </Link>
          </div>
        </div>
      </div>
    </section>
    )
};