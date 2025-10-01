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
    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Left: Main Content */}
      <section className="md:col-span-3 bg-white rounded-xl p-8 border border-black/10">
        <article className="space-y-8">
          <header>
            <h1 className="text-3xl font-bold text-primary-600 dark:text-white mb-3">
              {t('header.title')}
            </h1>
            <p className="mb-8 mt-0 text-base text-neutral-600 dark:text-slate-300">
              {t('header.description')}
            </p>
          </header>

          <div className="rounded-lg bg-yellow-50 p-6 dark:bg-yellow-900/20 border border-black/10">
            <h2 className="mb-3 mt-0 text-2xl font-semibold text-primary-900 dark:text-white">
              {t('warning.title')}
            </h2>
            <p className="text-base text-neutral-600 m-0">
              {t('warning.text')}
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
              {t('types.title')}
            </h2>
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <ul className="pl-[19px] mt-0 marker:text-primary-900/85">
                {t.raw('types.items').map((item: any, idx: number) => (
                  <li key={idx} className="p-0 mt-0 mb-2.5 text-neutral-600">
                    <strong className="text-primary-600">{item.label}:</strong> {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
              {t('checks.title')}
            </h2>
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <p className="text-base text-neutral-600 mb-4">{t('checks.intro')}</p>
              <ol className="pl-[19px] mt-0 marker:text-primary-900/85">
                {t.raw('checks.steps').map((step: string, idx: number) => (
                  <li key={idx} className="p-0 mt-0 mb-2.5 text-neutral-600">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
              {t('protection.title')}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {t.raw('protection.cards').map((card: any, idx: number) => (
                <div key={idx} className="rounded-lg bg-neutral-50 p-6">
                  <h3 className="mb-2 mt-0 text-lg font-semibold text-black dark:text-white">
                    {card.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-slate-300 m-0">{card.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
              {t('commitment.title')}
            </h2>
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <p className="text-base text-neutral-600 mb-4">{t('commitment.intro')}</p>
              <ul className="pl-[19px] mt-0 marker:text-primary-900/85">
                {t.raw('commitment.points').map((point: string, idx: number) => (
                  <li key={idx} className="p-0 mt-0 mb-2.5 text-neutral-600">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <div className="mt-8 flex items-center justify-between rounded-lg bg-neutral-50 p-6 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="w-[50%] pr-[20px]">
                <h2 className="text-2xl font-semibold text-primary-900 mt-0 mb-2 dark:text-white">
                  {t('cta.title')}
                </h2>
                <p className="mt-0 mb-0 text-base text-neutral-600 dark:text-slate-300">
                  {t('cta.text')}
                </p>
              </div>
              <div className="w-[50%] justify-end flex gap-4">
                <a
                  href="/contact"
                  className="rounded-md bg-primary-600 px-8 py-2 min-h-[40px] inline-flex items-center no-underline text-base font-semibold text-white transition-colors hover:bg-primary-900 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  {t('cta.buttons.contact')}
                </a>
                <a
                  href="/buyers-guide/buying-process"
                  className="rounded-md border border-primary-600 bg-white px-8 py-2 min-h-[40px] inline-flex items-center text-base font-semibold no-underline text-primary-600 transition-colors hover:bg-primary-900 hover:text-white dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  {t('cta.buttons.process')}
                </a>
              </div>
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
