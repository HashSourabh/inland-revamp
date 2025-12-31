import { Metadata } from 'next';
import { BuyersGuideNav } from '@/components/buyers-guide/BuyersGuideNav';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Spanish Property Taxes Guide | Inland Andalucia',
  description:
    'Complete guide to property taxes in Spain. Learn about purchase taxes, ongoing costs, and annual property taxes for Spanish real estate.',
};

export default function PropertyTaxesPage() {
  const t = useTranslations('property-taxes');

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 lg:gap-8 gap-4">
      {/* Left: Main Content */}
      <section className="md:col-span-3 lg:col-span-4 bg-white rounded-xl md:p-8 sm:p-6 xs:p-5 p-4 border border-black/10">
        <article className="space-y-8">
          <header>
            <h1 className="font-heading lg:text-3xl sm:text-2xl text-xl font-bold text-primary-600 lg:mb-6 sm:mb-4 mb-3">
              {t('title')}
            </h1>
            <p className="md:mb-8 sm:mb-6 xs:mb-4 text-neutral-600 text-sm sm:text-base lg:text-lg">
              {t('description')}
            </p>
          </header>

          {/* Purchase Taxes */}
          <section className="space-y-4">
            <h2 className="lg:text-2xl sm:text-xl text-lg md:mt-10 sm:mt-8 xs:mt-6 mt-4 mb-4 font-semibold text-primary-900 dark:text-white">
              {t('purchase-taxes.heading')}
            </h2>

            <div className="prose prose-slate max-w-none dark:prose-invert">
              {/* Transfer Tax */}
              <h3 className='lg:text-2xl sm:text-xl text-lg md:mt-10 sm:mt-8 xs:mt-6 mt-4 mb-4 font-semibold text-primary-900 dark:text-white'>
                {t('purchase-taxes.transfer-tax.heading')}
              </h3>
              <p className='text-sm sm:text-base lg:text-lg text-neutral-600 mb-4'>
                {t('purchase-taxes.transfer-tax.intro')}
              </p>
              <ul className='pl-[19px] mt-0 marker:text-primary-900/85 text-sm sm:text-base lg:text-lg'>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('purchase-taxes.transfer-tax.items.0')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('purchase-taxes.transfer-tax.items.1')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('purchase-taxes.transfer-tax.items.2')}</li>
              </ul>

              {/* VAT & Stamp Duty */}
              <h3 className="lg:text-2xl sm:text-xl text-lg md:mt-10 sm:mt-8 xs:mt-6 mt-4 mb-4 font-semibold text-primary-900 dark:text-white">
                {t('purchase-taxes.vat-stamp-duty.heading')}
              </h3>
              <p className='text-sm sm:text-base lg:text-lg text-neutral-600 mb-4'>
                {t('purchase-taxes.vat-stamp-duty.intro')}
              </p>
              <ul className='pl-[19px] mt-0 marker:text-primary-900/85 text-sm sm:text-base lg:text-lg'>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('purchase-taxes.vat-stamp-duty.items.0')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('purchase-taxes.vat-stamp-duty.items.1')}</li>
              </ul>
            </div>
          </section>

          {/* Important Note */}
          <div className="rounded-lg bg-yellow-50 md:p-6 sm:p-5 xs:p-4 p-3 dark:bg-yellow-900/20 border border-black/10">
            <h3 className="lg:text-2xl sm:text-xl text-lg mb-4 font-semibold text-primary-900 dark:text-white">
              {t('important-note.heading')}
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-neutral-600 dark:text-slate-300">
              {t('important-note.text')}
            </p>
          </div>

          {/* Annual Taxes */}
          <section className="space-y-4">
            <h2 className="lg:text-2xl sm:text-xl text-lg md:mt-10 sm:mt-8 xs:mt-6 mt-4 mb-4 font-semibold text-primary-900 dark:text-white">
              {t('annual-taxes.heading')}
            </h2>
            <div className="prose prose-slate max-w-none dark:prose-invert">

              {/* IBI */}
              <h3 className='lg:text-2xl sm:text-xl text-lg md:mt-10 sm:mt-8 xs:mt-6 mt-4 mb-4 font-semibold text-primary-900 dark:text-white'>
                {t('annual-taxes.ibi.heading')}
              </h3>
              <p className='text-sm sm:text-base lg:text-lg text-neutral-600 mb-4'>
                {t('annual-taxes.ibi.intro')}
              </p>
              <ul className='pl-[19px] mt-0 marker:text-primary-900/85 text-sm sm:text-base lg:text-lg'>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('annual-taxes.ibi.items.0')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('annual-taxes.ibi.items.1')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('annual-taxes.ibi.items.2')}</li>
              </ul>

              {/* Basura */}
              <h3 className="lg:text-2xl sm:text-xl text-lg md:mt-10 sm:mt-8 xs:mt-6 mt-4 mb-4 font-semibold text-primary-900 dark:text-white">
                {t('annual-taxes.basura.heading')}
              </h3>
              <p className='text-sm sm:text-base lg:text-lg text-neutral-600 mb-4'>
                {t('annual-taxes.basura.intro')}
              </p>
              <ul className='pl-[19px] mt-0 marker:text-primary-900/85 text-sm sm:text-base lg:text-lg'>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('annual-taxes.basura.items.0')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('annual-taxes.basura.items.1')}</li>
              </ul>

            </div>
          </section>

          {/* Non-Resident Taxes */}
          <section className="space-y-4">
            <h2 className="lg:text-2xl sm:text-xl text-lg md:mt-10 sm:mt-8 xs:mt-6 mt-4 mb-4 font-semibold text-primary-900 dark:text-white">
              {t('non-resident-taxes.heading')}
            </h2>
            <p className='text-sm sm:text-base lg:text-lg text-neutral-600 mb-4'>{t('non-resident-taxes.intro')}</p>
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <ul className='pl-[19px] mt-0 marker:text-primary-900/85 text-sm sm:text-base lg:text-lg'>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('non-resident-taxes.items.0')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('non-resident-taxes.items.1')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('non-resident-taxes.items.2')}</li>
              </ul>
            </div>
          </section>

          {/* Capital Gains Tax */}
          <section className="space-y-4">
            <h2 className="lg:text-2xl sm:text-xl text-lg md:mt-10 sm:mt-8 xs:mt-6 mt-4 mb-4 font-semibold text-primary-900 dark:text-white">
              {t('capital-gains-tax.heading')}
            </h2>
            <p className='text-sm sm:text-base lg:text-lg text-neutral-600 mb-4'>{t('capital-gains-tax.intro')}</p>
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <ul className='pl-[19px] mt-0 marker:text-primary-900/85 text-sm sm:text-base lg:text-lg'>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('capital-gains-tax.items.0')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('capital-gains-tax.items.1')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('capital-gains-tax.items.2')}</li>
              </ul>
            </div>
          </section>

          {/* CTA */}
          <div className="mt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between rounded-lg bg-neutral-50 md:p-6 sm:p-5 p-4 dark:border-slate-700 dark:bg-slate-800">
            <div className='lg:flex-1 sm:pr-[20px] pr-[10px] mb-4 lg:mb-0'>
              <h3 className="lg:text-2xl sm:text-xl text-lg font-semibold text-primary-900 mt-0 mb-2 dark:text-white">
                {t('cta.heading')}
              </h3>
              <p className="mt-0 mb-0 text-sm sm:text-base lg:text-lg text-neutral-600 dark:text-slate-300">
                {t('cta.text')}
              </p>
            </div>
            <div className="flex lg:justify-end gap-4 md:w-auto w-full flex-col xs:flex-row lg:flex-col">
              <a
                href="/contact"
                className="justify-center rounded-md bg-primary-600 lg:px-8 md:px-6 sm:px-4 px-3 md:py-3 py-2 min-h-[40px] inline-flex items-center no-underline text-base font-semibold text-white transition-colors hover:bg-primary-900 dark:bg-blue-500 dark:hover:bg-blue-600 text-sm lg:text-base sm:whitespace-nowrap"
              >
                {t('cta.button')}
              </a>
            </div>
          </div>

        </article>
      </section>

      <div className="md:col-span-2 lg:col-span-2">
        <BuyersGuideNav />
      </div>
    </div>
  );
}
