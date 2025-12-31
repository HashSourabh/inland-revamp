import { Metadata } from 'next';
import { BuyersGuideNav } from '@/components/buyers-guide/BuyersGuideNav';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Understanding Unpaid Taxes on Spanish Property | Inland Andalucia',
  description:
    'Learn about the implications of unpaid taxes when buying property in Spain, how to check for tax debts, and protect yourself during property purchase.',
};

export default function UnpaidTaxesPage() {
  const t = useTranslations('unpaid-taxes');

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 lg:gap-8 gap-4">
      {/* Left: Main Content */}
      <section className="md:col-span-3 lg:col-span-4 bg-white rounded-xl md:p-8 sm:p-6 xs:p-5 p-4 border border-black/10">
        <article className="space-y-8">
          <header>
            <h1 className="font-heading lg:text-3xl sm:text-2xl text-xl font-bold text-primary-600 lg:mb-6 sm:mb-4 mb-3">
              {t('header.title')}
            </h1>
            <p className="md:mb-8 sm:mb-6 xs:mb-4 text-neutral-600 text-sm sm:text-base lg:text-lg">
              {t('header.description')}
            </p>
          </header>

          <div className="rounded-lg bg-yellow-50 md:p-6 sm:p-5 xs:p-4 p-3 dark:bg-yellow-900/20 border border-black/10">
            <h2 className="lg:text-2xl sm:text-xl text-lg mb-4 font-semibold text-primary-900 dark:text-white">
              {t('warning.title')}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-neutral-600 m-0">
              {t('warning.text')}
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="lg:text-2xl sm:text-xl text-lg md:mt-10 sm:mt-8 xs:mt-6 mt-4 mb-4 font-semibold text-primary-900 dark:text-white">
              {t('types.title')}
            </h2>
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <ul className="pl-[19px] mt-0 marker:text-primary-900/85 text-sm sm:text-base lg:text-lg">
                {t.raw('types.items').map((item: any, idx: number) => (
                  <li key={idx} className="p-0 mt-0 mb-2.5 text-neutral-600">
                    <strong className="text-primary-600">{item.label}:</strong> {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="lg:text-2xl sm:text-xl text-lg md:mt-10 sm:mt-8 xs:mt-6 mt-4 mb-4 font-semibold text-primary-900 dark:text-white">
              {t('checks.title')}
            </h2>
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <p className="text-sm sm:text-base lg:text-lg text-neutral-600 mb-4">{t('checks.intro')}</p>
              <ol className="pl-[19px] mt-0 marker:text-primary-900/85 text-sm sm:text-base lg:text-lg">
                {t.raw('checks.steps').map((step: string, idx: number) => (
                  <li key={idx} className="p-0 mt-0 mb-2.5 text-neutral-600">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="lg:text-2xl sm:text-xl text-lg md:mt-10 sm:mt-8 xs:mt-6 mt-4 mb-4 font-semibold text-primary-900 dark:text-white">
              {t('protection.title')}
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {t.raw('protection.cards').map((card: any, idx: number) => (
                <div key={idx} className="rounded-lg bg-neutral-50 md:p-6 sm:p-5 xs:p-4 p-3">
                  <h3 className="mb-2 mt-0 text-lg font-semibold text-black dark:text-white">
                    {card.title}
                  </h3>
                  <p className="text-sm sm:text-base lg:text-lg text-neutral-600 dark:text-slate-300 m-0">{card.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="lg:text-2xl sm:text-xl text-lg md:mt-10 sm:mt-8 xs:mt-6 mt-4 mb-4 font-semibold text-primary-900 dark:text-white">
              {t('commitment.title')}
            </h2>
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <p className="text-sm sm:text-base lg:text-lg text-neutral-600 mb-4">{t('commitment.intro')}</p>
              <ul className="pl-[19px] mt-0 marker:text-primary-900/85 text-sm sm:text-base lg:text-lg">
                {t.raw('commitment.points').map((point: string, idx: number) => (
                  <li key={idx} className="p-0 mt-0 mb-2.5 text-neutral-600">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <div className="mt-8 flex items-center justify-between rounded-lg bg-neutral-50 p-6 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex flex-col gap-4 lg:flex-row sm:items-center sm:justify-between">
              <div className="xl:flex-1 sm:pr-[20px] pr-[10px]">
                <h2 className="lg:text-2xl sm:text-xl text-lg font-semibold text-primary-900 mt-0 mb-2 dark:text-white">
                  {t('cta.title')}
                </h2>
                <p className="mt-0 mb-0 text-sm sm:text-base lg:text-lg text-neutral-600 dark:text-slate-300">
                  {t('cta.text')}
                </p>
              </div>
              <div className="flex xl:justify-end gap-4 xl:w-auto w-full flex-col xs:flex-row lg:flex-col">
                <a
                  href="/contact"
                  className="justify-center rounded-md bg-primary-600 lg:px-8 md:px-6 sm:px-4 px-3 md:py-3 py-2 min-h-[40px] inline-flex items-center no-underline text-base font-semibold text-white transition-colors hover:bg-primary-900 dark:bg-blue-500 dark:hover:bg-blue-600 text-sm lg:text-base sm:whitespace-nowrap"
                >
                  {t('cta.buttons.contact')}
                </a>
                <a
                  href="/buyers-guide/buying-process"
                  className="justify-center rounded-md border border-primary-600 bg-whitelg:px-8 md:px-6 sm:px-4 px-3 md:py-3 py-2 min-h-[40px] inline-flex items-center text-base font-semibold no-underline text-primary-600 transition-colors hover:bg-primary-900 hover:text-white dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 text-sm lg:text-base sm:whitespace-nowrap"
                >
                  {t('cta.buttons.process')}
                </a>
              </div>
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
