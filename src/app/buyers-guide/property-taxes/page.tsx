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
    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Left: Main Content */}
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

          {/* Purchase Taxes */}
          <section className="space-y-4">
            <h2 className="text-xl m-0 bg-primary-600 px-6 py-3 rounded-lg font-semibold text-white dark:text-white">
              {t('purchase-taxes.heading')}
            </h2>

            <div className="prose prose-slate max-w-none dark:prose-invert">
              {/* Transfer Tax */}
              <h3 className='text-2xl mt-5 mb-4 font-semibold text-primary-900 dark:text-white'>
                {t('purchase-taxes.transfer-tax.heading')}
              </h3>
              <p className='text-base text-neutral-600 mb-4'>
                {t('purchase-taxes.transfer-tax.intro')}
              </p>
              <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('purchase-taxes.transfer-tax.items.0')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('purchase-taxes.transfer-tax.items.1')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('purchase-taxes.transfer-tax.items.2')}</li>
              </ul>

              {/* VAT & Stamp Duty */}
              <h3 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
                {t('purchase-taxes.vat-stamp-duty.heading')}
              </h3>
              <p className='text-base text-neutral-600 mb-4'>
                {t('purchase-taxes.vat-stamp-duty.intro')}
              </p>
              <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('purchase-taxes.vat-stamp-duty.items.0')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('purchase-taxes.vat-stamp-duty.items.1')}</li>
              </ul>
            </div>
          </section>

          {/* Important Note */}
          <div className="rounded-lg bg-yellow-50 p-6 dark:bg-yellow-900/20 border border-black/10">
            <h3 className="mb-3 mt-0 text-2xl font-semibold text-primary-900 dark:text-white">
              {t('important-note.heading')}
            </h3>
            <p className="text-neutral-600 text-base dark:text-slate-300">
              {t('important-note.text')}
            </p>
          </div>

          {/* Annual Taxes */}
          <section className="space-y-4">
            <h2 className="text-xl m-0 bg-primary-600 px-6 py-3 rounded-lg font-semibold text-white dark:text-white">
              {t('annual-taxes.heading')}
            </h2>
            <div className="prose prose-slate max-w-none dark:prose-invert">

              {/* IBI */}
              <h3 className='text-2xl mt-5 mb-4 font-semibold text-primary-900 dark:text-white'>
                {t('annual-taxes.ibi.heading')}
              </h3>
              <p className='text-base text-neutral-600 mb-4'>
                {t('annual-taxes.ibi.intro')}
              </p>
              <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('annual-taxes.ibi.items.0')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('annual-taxes.ibi.items.1')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('annual-taxes.ibi.items.2')}</li>
              </ul>

              {/* Basura */}
              <h3 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
                {t('annual-taxes.basura.heading')}
              </h3>
              <p className='text-base text-neutral-600 mb-4'>
                {t('annual-taxes.basura.intro')}
              </p>
              <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('annual-taxes.basura.items.0')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('annual-taxes.basura.items.1')}</li>
              </ul>

            </div>
          </section>

          {/* Non-Resident Taxes */}
          <section className="space-y-4">
            <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
              {t('non-resident-taxes.heading')}
            </h2>
            <p className='text-base text-neutral-600 mb-4'>{t('non-resident-taxes.intro')}</p>
            <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('non-resident-taxes.items.0')}</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('non-resident-taxes.items.1')}</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('non-resident-taxes.items.2')}</li>
            </ul>
          </section>

          {/* Capital Gains Tax */}
          <section className="space-y-4">
            <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
              {t('capital-gains-tax.heading')}
            </h2>
            <p className='text-base text-neutral-600 mb-4'>{t('capital-gains-tax.intro')}</p>
            <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('capital-gains-tax.items.0')}</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('capital-gains-tax.items.1')}</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('capital-gains-tax.items.2')}</li>
            </ul>
          </section>

          {/* CTA */}
          <div className="mt-8 flex items-center justify-between rounded-lg bg-neutral-50 p-6 dark:border-slate-700 dark:bg-slate-800">
            <div className='w-[60%] pr-[20px]'>
              <h3 className="text-2xl font-semibold text-primary-900 mt-0 mb-2 dark:text-white">
                {t('cta.heading')}
              </h3>
              <p className="mt-0 mb-0 text-base text-neutral-600 dark:text-slate-300">
                {t('cta.text')}
              </p>
            </div>
            <div className="w-[40%] flex justify-end">
              <a
                href="/contact"
                className="rounded-md bg-primary-600 px-8 py-2 min-h-[40px] inline-flex items-center no-underline text-base font-semibold text-white transition-colors hover:bg-primary-900 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                {t('cta.button')}
              </a>
            </div>
          </div>

        </article>
      </section>

      <div>
        <BuyersGuideNav />
      </div>
    </div>
  );
}
