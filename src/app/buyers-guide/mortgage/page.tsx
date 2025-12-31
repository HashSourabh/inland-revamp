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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:px-6 py-10 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 lg:gap-8 gap-4">
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

          <section className="space-y-4">
            <h2 className="lg:text-2xl sm:text-xl text-lg md:mt-10 sm:mt-8 xs:mt-6 mt-4 mb-4 font-semibold text-primary-900 dark:text-white">
              {t('sections.options.title')}
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-lg bg-neutral-50 md:p-6 sm:p-5 xs:p-4 p-3">
                <h3 className="mb-2 mt-0  text-lg font-semibold text-black dark:text-white">
                  {t('sections.options.resident.title')}
                </h3>
                <ul className='pl-[19px] mt-0 marker:text-primary-900/85 text-sm sm:text-base lg:text-lg'>
                  <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.options.resident.point1')}</li>
                  <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.options.resident.point2')}</li>
                  <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.options.resident.point3')}</li>
                  <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.options.resident.point4')}</li>
                </ul>
              </div>
              <div className="rounded-lg  bg-neutral-50 md:p-6 sm:p-5 xs:p-4 p-3">
                <h3 className="mb-2 mt-0  text-lg font-semibold text-black dark:text-white">
                  {t('sections.options.nonResident.title')}
                </h3>
                <ul className='pl-[19px] mt-0 marker:text-primary-900/85 text-sm sm:text-base lg:text-lg'>
                  <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.options.nonResident.point1')}</li>
                  <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.options.nonResident.point2')}</li>
                  <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.options.nonResident.point3')}</li>
                  <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.options.nonResident.point4')}</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-4 md:mt-10 sm:mt-8 xs:mt-6 mt-4">
            <h2 className="lg:text-2xl sm:text-xl text-lg md:mt-10 sm:mt-8 xs:mt-6 mt-4 mb-4 font-semibold text-primary-900 dark:text-white">
              {t('sections.requirements.title')}
            </h2>
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <p className='text-sm sm:text-base lg:text-lg text-neutral-600 mb-4'>{t('sections.requirements.intro')}</p>
              <ul className='pl-[19px] mt-0 marker:text-primary-900/85 text-sm sm:text-base lg:text-lg'>
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

          <div className="md:mt-10 sm:mt-8 xs:mt-6 mt-4">
            <h2 className="lg:text-2xl sm:text-xl text-lg md:mt-10 sm:mt-8 xs:mt-6 mt-4 mb-4 font-semibold text-primary-900 dark:text-white">
              {t('sections.costs.title')}
            </h2>
            <div className="mt-4 space-y-2 text-slate-600 dark:text-slate-300">
              <p className='text-sm sm:text-base lg:text-lg text-neutral-600 mb-4'>{t('sections.costs.intro')}</p>
              <ul className='pl-[19px] mt-0 marker:text-primary-900/85 text-sm sm:text-base lg:text-lg'>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.costs.point1')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.costs.point2')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.costs.point3')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.costs.point4')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.costs.point5')}</li>
              </ul>
            </div>
          </div>

          <section className="space-y-4 md:mt-10 sm:mt-8 xs:mt-6 mt-4">
            <h2 className="lg:text-2xl sm:text-xl text-lg mb-4 font-semibold text-primary-900 dark:text-white">
              {t('sections.types.title')}
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-lg bg-neutral-50 md:p-6 sm:p-5 xs:p-4 p-3">
                <h3 className="mb-2 mt-0  text-lg font-semibold text-black dark:text-white">
                  {t('sections.types.fixed.title')}
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-neutral-600 m-0">{t('sections.types.fixed.description')}</p>
              </div>
              <div className="rounded-lg bg-neutral-50 md:p-6 sm:p-5 xs:p-4 p-3">
                <h3 className="mb-2 mt-0  text-lg font-semibold text-black dark:text-white">
                  {t('sections.types.variable.title')}
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-neutral-600 m-0">{t('sections.types.variable.description')}</p>
              </div>
            </div>
          </section>

          <section className="space-y-4 md:mt-10 sm:mt-8 xs:mt-6 mt-4">
            <h2 className="lg:text-2xl sm:text-xl text-lg mb-4 font-semibold text-primary-900 dark:text-white">
              {t('sections.process.title')}
            </h2>
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <ol className='pl-[19px] mt-0 marker:text-primary-900/85 text-sm sm:text-base lg:text-lg'>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.process.step1')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.process.step2')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.process.step3')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.process.step4')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.process.step5')}</li>
                <li className='p-0 mt-0 mb-2.5 text-neutral-600'>{t('sections.process.step6')}</li>
              </ol>
            </div>
          </section>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg bg-neutral-50 md:p-6 sm:p-5 p-4 dark:border-slate-700 dark:bg-slate-800 sm:gap-4 gap-2">
            <div className="flex flex-col gap-4 lg:flex-row sm:items-center sm:justify-between">
              <div className='xl:flex-1 sm:pr-[20px] pr-[10px]'>
                <h2 className="lg:text-2xl sm:text-xl text-lg font-semibold text-primary-900 mt-0 mb-2 dark:text-white">
                  {t('cta.title')}
                </h2>
                <p className="mt-0 mb-0 text-sm sm:text-base lg:text-lg text-neutral-600 dark:text-slate-300">
                  {t('cta.description')}
                </p>
              </div>
              <div className="flex xl:justify-end gap-4 xl:w-auto w-full flex-col xs:flex-row lg:flex-col">
                <a
                  href="/contact"
                  className="justify-center rounded-md bg-primary-600 lg:px-8 md:px-6 sm:px-4 px-3 md:py-3 py-2 min-h-[40px] inline-flex items-center no-underline text-base font-semibold text-white transition-colors hover:bg-primary-900 dark:bg-blue-500 dark:hover:bg-blue-600 text-sm lg:text-base sm:whitespace-nowrap"
                >
                  {t('cta.buttons.advice')}
                </a>
                <a
                  href="/properties"
                  className="justify-center rounded-md border border-primary-600 bg-whitelg:px-8 md:px-6 sm:px-4 px-3 md:py-3 py-2 min-h-[40px] inline-flex items-center text-base font-semibold no-underline text-primary-600 transition-colors hover:bg-primary-900 hover:text-white dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 text-sm lg:text-base sm:whitespace-nowrap"
                >
                  {t('cta.buttons.properties')}
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
