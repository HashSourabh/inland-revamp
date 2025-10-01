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
    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
      <section className="md:col-span-3 bg-white rounded-xl p-8 border border-black/10">
        <header>
          <h1 className="text-3xl font-bold text-primary-600 dark:text-white mb-3">
            {t('title')}
          </h1>
          <p className="mb-8 mt-0 text-base text-neutral-600 dark:text-slate-300">
            {t('description')}
          </p>
        </header>

        {/* Loop through steps */}
        {steps.map((step: any, index: number) => (
          <section key={index} className="space-y-4">
            <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
              {step.heading}
            </h2>
            <div className="prose prose-slate max-w-none dark:prose-invert">
              {step.intro && (
                <p className="text-base text-neutral-600 mb-4">{step.intro}</p>
              )}
              <ul className="pl-[19px] mt-0 marker:text-primary-900/85">
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
        <div className="mt-8 flex items-center justify-between rounded-lg bg-neutral-50 p-6 dark:border-slate-700 dark:bg-slate-800">
          <div className="w-[50%] pr-[20px]">
            <h3 className="text-2xl font-semibold text-primary-900 mt-0 mb-2 dark:text-white">
              {t('cta.heading')}
            </h3>
            <p className="mt-0 mb-0 text-base text-neutral-600 dark:text-slate-300">
              {t('cta.text')}
            </p>
          </div>
          <div className="flex justify-end gap-4 w-[50%]">
            <a
              href="/contact"
              className="rounded-md bg-primary-600 px-8 py-2 min-h-[40px] inline-flex items-center no-underline text-base font-semibold text-white transition-colors hover:bg-primary-900 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {t('cta.buttons.contact')}
            </a>
            <a
              href="/properties"
              className="rounded-md border border-primary-600 bg-white px-8 py-2 min-h-[40px] inline-flex items-center text-base font-semibold no-underline text-primary-600 transition-colors hover:bg-primary-900 hover:text-white dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              {t('cta.buttons.properties')}
            </a>
          </div>
        </div>
      </section>

      {/* Sidebar Nav */}
      <div>
        <BuyersGuideNav />
      </div>
    </div>
  );
}
