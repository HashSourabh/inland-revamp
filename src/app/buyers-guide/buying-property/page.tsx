import { Metadata } from 'next';
import { BuyersGuideNav } from '@/components/buyers-guide/BuyersGuideNav';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Buying a Property in Spain - Guide | Inland Andalucia',
  description:
    'Learn everything about buying property in inland Spain. Discover property types, important considerations, and expert tips for making your Spanish property purchase.',
};

export default function BuyingPropertyPage() {
  const t = useTranslations('buying-property');

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
      <section className="md:col-span-3 bg-white rounded-xl p-8 border border-black/10">
        <article className="space-y-8">
          <header>
            <h1 className="text-3xl font-bold text-primary-600 dark:text-white mb-3">
              {t('title')}
            </h1>
            <p className="mb-8 mt-0 text-base text-neutral-600 dark:text-slate-300">
              {t('description')}
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
              {t('types-of-properties-header')}
            </h2>
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <p className='text-base text-neutral-600 mb-4'>
                {t('types-of-properties-intro')}

              </p>
              <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>
                  <strong className='text-primary-600'>{t('types-of-properties.0.name')}:</strong> {t('types-of-properties.0.description')}
                </li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>
                  <strong className='text-primary-600'>{t('types-of-properties.1.name')}:</strong> {t('types-of-properties.1.description')}
                </li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>
                  <strong className='text-primary-600'>{t('types-of-properties.2.name')}:</strong> {t('types-of-properties.2.description')}
                </li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>
                  <strong className='text-primary-600'>{t('types-of-properties.3.name')}:</strong> {t('types-of-properties.3.description')}
                </li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>
                  <strong className='text-primary-600'>{t('types-of-properties.4.name')}:</strong> {t('types-of-properties.4.description')}
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
              {t('key-considerations-header')}
            </h2>
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <p className='text-base text-neutral-600 mb-4'>{t('key-considerations-intro')}</p>
              <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('key-considerations.0')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('key-considerations.1')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('key-considerations.2')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('key-considerations.3')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('key-considerations.4')}</li>
              </ul>
            </div>
          </section>


          <div className="rounded-lg bg-yellow-50 p-6 dark:bg-yellow-900/20 border border-black/10">
            <h3 className="mb-3 mt-0 text-2xl font-semibold text-primary-900 dark:text-white">
              {t('important-note-header')}
            </h3>
            <p className="text-neutral-600 text-base dark:text-slate-300">
              {t('important-note')}
            </p>
          </div>


          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary-900 mt-10 mb-4 dark:text-white">
              {t('our-services-header')}
            </h2>
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <p className='text-base text-neutral-600 mb-4'>{t('our-services-intro')}</p>
              <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('our-services.0')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('our-services.1')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('our-services.2')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('our-services.3')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('our-services.4')}</li>
              </ul>
            </div>
          </section>


          <div className="mt-8 flex items-center justify-between rounded-lg bg-neutral-50 p-6 dark:border-slate-700 dark:bg-slate-800">
            <div>
              <h3 className="text-2xl font-semibold text-primary-900 mt-0 mb-2 dark:text-white">
                {t('cta.heading')}
              </h3>
              <p className="mt-0 mb-0 text-base text-neutral-600 dark:text-slate-300">
                {t('cta.text')}
              </p>
            </div>
            <a
              href="/properties"
              className="rounded-md bg-primary-600 px-8 py-2 min-h-[40px] inline-flex items-center no-underline text-base font-semibold text-white transition-colors hover:bg-primary-900 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {t('cta.buttons.properties')}
            </a>
          </div>
        </article>
      </section>
      <div>
        <BuyersGuideNav />
      </div>
    </div>
  );
}
