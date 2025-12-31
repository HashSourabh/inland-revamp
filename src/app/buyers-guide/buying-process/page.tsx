import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { BuyersGuideNav } from '@/components/buyers-guide/BuyersGuideNav';

export const metadata: Metadata = {
  title: 'Property Buying Process in Spain - Step by Step Guide | Inland Andalucia',
  description:
    'Understanding the Spanish property buying process. Learn about each step from property viewing to completion, legal requirements, and timelines.',
};

export default function BuyingProcessPage() {
  const t = useTranslations('buyers-guide');
  const steps = t.raw('steps'); // get array directly from JSON

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 lg:gap-8 gap-4">
      <section className="md:col-span-3 lg:col-span-4 bg-white rounded-xl md:p-8 sm:p-6 xs:p-5 p-4 border border-black/10">
        <header>
          <h1 className="font-heading lg:text-3xl sm:text-2xl text-xl font-bold text-primary-600 lg:mb-6 sm:mb-4 mb-3">
            {t('title')}
          </h1>
          <p className="md:mb-8 sm:mb-6 xs:mb-4 text-neutral-600 text-sm sm:text-base lg:text-lg">
            {t('description')}
          </p>
        </header>

        {/* Loop through steps */}
        {steps.map((step: any, index: number) => (
          <section key={index} className="space-y-4 md:mt-10 sm:mt-8 xs:mt-6 mt-4">
            <h2 className="lg:text-2xl sm:text-xl text-lg md:mb-4 sm:mb-3 mb-2 font-semibold text-primary-900 dark:text-white">
              {step.heading}
            </h2>
            <div className="prose prose-slate max-w-none dark:prose-invert">
              {step.intro && (
                <p className="text-sm sm:text-base lg:text-lg text-neutral-600 mb-4">{step.intro}</p>
              )}
              <ul className="pl-[19px] mt-0 marker:text-primary-900/85 text-sm sm:text-base lg:text-lg">
                {step.items.map((item: string, idx: number) => (
                  <li
                    key={idx}
                    className="p-0 mt-0 mb-2.5 text-neutral-600"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        {/* CTA */}
        <div className="mt-8 flex flex-col flex-wrap sm:flex-row items-start sm:items-center justify-between rounded-lg bg-neutral-50 md:p-6 sm:p-5 p-4 dark:border-slate-700 dark:bg-slate-800 sm:gap-4 gap-2">
          <div className="xl:flex-1 sm:pr-[20px] pr-[10px]">
            <h3 className="lg:text-2xl sm:text-xl text-lg font-semibold text-primary-900 mt-0 mb-2 dark:text-white">
              {t('cta.heading')}
            </h3>
            <p className="mt-0 mb-0 text-sm sm:text-base lg:text-lg text-neutral-600 dark:text-slate-300">
              {t('cta.text')}
            </p>
          </div>
          <div className="flex xl:justify-end gap-4 xl:w-[50%] w-full">
            <a
              href="/contact"
              className="rounded-md bg-primary-600 md:px-8 px-6 md:py-3 py-2 min-h-[40px] inline-flex items-center no-underline text-base font-semibold text-white transition-colors hover:bg-primary-900 dark:bg-blue-500 dark:hover:bg-blue-600 text-sm sm:text-base sm:whitespace-nowrap"
            >
              {t('cta.buttons.contact')}
            </a>
            <a
              href="/properties"
              className="rounded-md border border-primary-600 bg-white md:px-8 px-6 md:py-3 py-2 min-h-[40px] inline-flex items-center text-base font-semibold no-underline text-primary-600 transition-colors hover:bg-primary-900 hover:text-white dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 text-sm sm:text-base sm:whitespace-nowrap"
            >
              {t('cta.buttons.properties')}
            </a>
          </div>
        </div>
      </section>

      {/* Sidebar Nav */}
      <div className="md:col-span-2 lg:col-span-2">
        <BuyersGuideNav />
      </div>
    </div>
  );
}
