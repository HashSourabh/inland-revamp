import { Metadata } from 'next';
import { BuyersGuideNav } from '@/components/buyers-guide/BuyersGuideNav';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'mortgage-guide.metadata.title',
  description: 'mortgage-guide.metadata.description',
};

export default function MortgagePage() {
  const t = useTranslations('mortgage-guide');

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

          <section className="space-y-4">
            <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
              {t('sections.options.title')}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg bg-neutral-50 p-6">
                <h3 className="mb-2 mt-0  text-lg font-semibold text-black dark:text-white">
                  {t('sections.options.resident.title')}
                </h3>
                <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
                  <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.options.resident.point1')}</li>
                  <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.options.resident.point2')}</li>
                  <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.options.resident.point3')}</li>
                  <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.options.resident.point4')}</li>
                </ul>
              </div>
              <div className="rounded-lg  bg-neutral-50 p-6">
                <h3 className="mb-2 mt-0  text-lg font-semibold text-black dark:text-white">
                  {t('sections.options.nonResident.title')}
                </h3>
                <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
                  <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.options.nonResident.point1')}</li>
                  <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.options.nonResident.point2')}</li>
                  <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.options.nonResident.point3')}</li>
                  <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.options.nonResident.point4')}</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
              {t('sections.requirements.title')}
            </h2>
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <p className='text-base text-neutral-600 mb-4'>{t('sections.requirements.intro')}</p>
              <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.requirements.point1')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.requirements.point2')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.requirements.point3')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.requirements.point4')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.requirements.point5')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.requirements.point6')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.requirements.point7')}</li>
              </ul>
            </div>
          </section>

          <div className="">
            <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
              {t('sections.costs.title')}
            </h2>
            <div className="mt-4 space-y-2 text-slate-600 dark:text-slate-300">
              <p className='text-base text-neutral-600 mb-4'>{t('sections.costs.intro')}</p>
              <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.costs.point1')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.costs.point2')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.costs.point3')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.costs.point4')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.costs.point5')}</li>
              </ul>
            </div>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
              {t('sections.types.title')}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg bg-neutral-50 p-6">
                <h3 className="mb-2 mt-0  text-lg font-semibold text-black dark:text-white">
                  {t('sections.types.fixed.title')}
                </h3>
                <p className="text-base text-neutral-600 m-0">{t('sections.types.fixed.description')}</p>
              </div>
              <div className="rounded-lg bg-neutral-50 p-6">
                <h3 className="mb-2 mt-0  text-lg font-semibold text-black dark:text-white">
                  {t('sections.types.variable.title')}
                </h3>
                <p className="text-base text-neutral-600 m-0">{t('sections.types.variable.description')}</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
              {t('sections.process.title')}
            </h2>
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <ol className='pl-[19px] mt-0 marker:text-primary-900/85'>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.process.step1')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.process.step2')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.process.step3')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.process.step4')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.process.step5')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.process.step6')}</li>
              </ol>
            </div>
          </section>

          <div className="mt-8 flex items-center justify-between rounded-lg  bg-neutral-50 p-6 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className='w-[50%]'>
                <h2 className="text-2xl font-semibold text-primary-900 mt-0 mb-2 dark:text-white">
                  {t('cta.title')}
                </h2>
                <p className="mt-0 mb-0 text-base text-neutral-600 dark:text-slate-300">
                  {t('cta.description')}
                </p>
              </div>
              <div className="flex gap-4 justify-end w-[50%]">
                <a
                  href="/contact"
                  className="rounded-md bg-primary-600 px-5 py-2 min-h-[40px] inline-flex items-center no-underline text-base font-semibold text-white transition-colors hover:bg-primary-900 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  {t('cta.buttons.advice')}
                </a>
                <a
                  href="/properties"
                  className="rounded-md border border-primary-600 bg-white px-5 py-2 min-h-[40px] inline-flex items-center text-base font-semibold no-underline text-primary-600 transition-colors hover:bg-primary-900 hover:text-white dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  {t('cta.buttons.properties')}
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
