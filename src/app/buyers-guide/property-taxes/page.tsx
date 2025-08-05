import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spanish Property Taxes Guide | Inland Andalucia',
  description:
    'Complete guide to property taxes in Spain. Learn about purchase taxes, ongoing costs, and annual property taxes for Spanish real estate.',
};

export default function PropertyTaxesPage() {
  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-primary-600 dark:text-white mb3">
          Property Taxes in Spain
        </h1>
        <p className="mb-8 mt-0 text-base text-neutral-600 dark:text-slate-300">
          Understanding the tax implications of buying and owning property in Spain is crucial for making
          informed decisions. Here's a comprehensive overview of all the taxes involved.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl m-0 bg-primary-600 px-6 py-3 rounded-lg font-semibold text-white dark:text-white">
          Purchase Taxes
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <h3 className='text-2xl mt-5 mb-4 font-semibold text-primary-900 dark:text-white'>Transfer Tax (ITP)</h3>
          <p className='text-base text-neutral-600 mb-4'>
            When buying a resale property, you'll need to pay the Property Transfer Tax (ITP):
          </p>
          <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>8% for properties up to €400,000</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>9% for properties between €400,000 and €700,000</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>10% for properties over €700,000</li>
          </ul>

          <h3 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">VAT (IVA) and Stamp Duty</h3>
          <p className='text-base text-neutral-600 mb-4'>
            For new properties, instead of ITP, you'll pay:
          </p>
          <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>10% VAT (IVA)</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>1.5% Stamp Duty (AJD)</li>
          </ul>
        </div>
      </section>

      <div className="rounded-lg bg-yellow-50 p-6 dark:bg-yellow-900/20 border border-black/10">
        <h3 className="mb-3 mt-0 text-2xl font-semibold text-primary-900 dark:text-white">
          Important Note
        </h3>
        <p className="text-neutral-600 text-base dark:text-slate-300">
          Tax rates can vary between regions in Spain and may change over time. Always consult with a
          legal professional for the most current rates and regulations.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl m-0 bg-primary-600 px-6 py-3 rounded-lg font-semibold text-white dark:text-white">
          Annual Property Taxes
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <h3 className='text-2xl mt-5 mb-4 font-semibold text-primary-900 dark:text-white'>IBI (Council Tax)</h3>
          <p className='text-base text-neutral-600 mb-4'>
            The main annual property tax in Spain, based on the cadastral value of your property:
          </p>
          <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Paid annually to the local town hall</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Rates vary by municipality</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Usually between 0.4% and 1.1% of cadastral value</li>
          </ul>

          <h3 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">Basura (Rubbish Collection)</h3>
          <p className='text-base text-neutral-600 mb-4'>
            Annual fee for waste collection services:
          </p>
          <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Varies by location and property size</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Typically paid annually</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
          Non-Resident Taxes
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p className='text-base text-neutral-600 mb-4'>If you're a non-resident property owner, you'll need to:</p>
          <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>File an annual income tax return</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Pay tax on rental income (if applicable)</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Submit Form 210 for imputed income tax</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
          Capital Gains Tax
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p className='text-base text-neutral-600 mb-4'>When selling your property, you'll need to consider:</p>
          <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>19-23% tax on the profit made (for non-residents)</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Possible exemptions for primary residences</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Deductions for improvements and buying costs</li>
          </ul>
        </div>
      </section>

      <div className="mt-8 flex items-center justify-between rounded-lg  bg-neutral-50 p-6 dark:border-slate-700 dark:bg-slate-800">
        <div className='w-[60%] pr-[20px]'>
        <h3 className="text-2xl font-semibold text-primary-900 mt-0 mb-2 dark:text-white">
          Need Tax Advice?
        </h3>
        <p className="mt-0 mb-0 text-base text-neutral-600 dark:text-slate-300">
          Our team can connect you with experienced tax advisors who specialize in Spanish property taxation.
        </p>
        </div>
        <div className="w-[40%] flex justify-end">
          <a
            href="/contact"
            className="rounded-md bg-primary-600 px-8 py-2 min-h-[40px] inline-flex items-center no-underline text-base font-semibold text-white transition-colors hover:bg-primary-900 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Contact Our Team
          </a>
        </div>
      </div>
    </article>
  );
} 