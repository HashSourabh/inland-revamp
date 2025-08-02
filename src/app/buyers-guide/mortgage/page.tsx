import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spanish Mortgages Guide | Inland Andalucia',
  description:
    'Complete guide to getting a mortgage in Spain. Learn about Spanish mortgage options, requirements, costs, and how to apply as a foreign buyer.',
};

export default function MortgagePage() {
  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-primary-600 dark:text-white mb-6">
          Spanish Mortgages Guide
        </h1>
        <p className="mb-8 mt-0 text-base text-neutral-600 dark:text-slate-300">
          Understanding Spanish mortgages is crucial when buying property. Here's everything you need
          to know about financing your property purchase in Spain.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
          Mortgage Options in Spain
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg bg-neutral-50 p-6">
            <h3 className="mb-2 mt-0  text-lg font-semibold text-black dark:text-white">
              Resident Mortgages
            </h3>
            <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Up to 80% financing for primary residences</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Better interest rates</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Longer repayment terms available</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>More flexible conditions</li>
            </ul>
          </div>
          <div className="rounded-lg  bg-neutral-50 p-6">
            <h3 className="mb-2 mt-0  text-lg font-semibold text-black dark:text-white">
              Non-Resident Mortgages
            </h3>
            <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Up to 70% financing typically available</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Slightly higher interest rates</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Shorter repayment terms</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Additional documentation required</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
          Requirements for Non-Resident Buyers
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p className='text-base text-neutral-600 mb-4'>To apply for a mortgage in Spain as a non-resident, you'll need:</p>
          <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>NIE (Foreign Identity Number)</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Proof of income (usually last 3-6 months of payslips)</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Tax returns from your home country</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Bank statements (usually last 3-6 months)</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Proof of employment or business ownership</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Credit history documentation</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>List of current assets and liabilities</li>
          </ul>
        </div>
      </section>

      <div className="">
        <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
          Associated Costs
        </h2>
        <div className="mt-4 space-y-2 text-slate-600 dark:text-slate-300">
          <p className='text-base text-neutral-600 mb-4'>When taking out a mortgage, budget for these additional costs:</p>
          <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Property valuation fee (€300-€600)</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Mortgage arrangement fee (1-2% of loan amount)</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Notary fees for mortgage deed</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Property insurance (required by lender)</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Life insurance (may be required)</li>
          </ul>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
          Types of Spanish Mortgages
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg bg-neutral-50 p-6">
            <h3 className="mb-2 mt-0  text-lg font-semibold text-black dark:text-white">
              Fixed Rate Mortgages
            </h3>
            <p className="text-base text-neutral-600 m-0">
              Interest rate remains the same throughout the term. Offers security in monthly payments
              but typically starts with a higher rate.
            </p>
          </div>
          <div className="rounded-lg bg-neutral-50 p-6">
            <h3 className="mb-2 mt-0  text-lg font-semibold text-black dark:text-white">
              Variable Rate Mortgages
            </h3>
            <p className="text-base text-neutral-600 m-0">
              Interest rate varies with Euribor. Usually starts lower but payments can change over
              time. Most common in Spain.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
          The Application Process
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <ol className='pl-[19px] mt-0 marker:text-primary-900/85'>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Initial consultation and assessment of options</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Gathering and submitting required documentation</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Property valuation</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Bank's assessment and decision</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Mortgage offer and acceptance</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Signing at the notary</li>
          </ol>
        </div>
      </section>

      <div className="mt-8 flex items-center justify-between rounded-lg  bg-neutral-50 p-6 dark:border-slate-700 dark:bg-slate-800">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className='w-[50%]'>
            <h2 className="text-2xl font-semibold text-primary-900 mt-0 mb-2 dark:text-white">
              Ready to Explore Your Mortgage Options?
            </h2>
            <p className="mt-0 mb-0 text-base text-neutral-600 dark:text-slate-300">
              Our team can connect you with trusted Spanish mortgage advisors who specialize in
              non-resident mortgages.
            </p>
          </div>
          <div className="flex gap-4 justify-end w-[50%]">
            <a
              href="/contact"
              className="rounded-md bg-primary-600 px-5 py-2 min-h-[40px] inline-flex items-center no-underline text-base font-semibold text-white transition-colors hover:bg-primary-900 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Get Mortgage Advice
            </a>
            <a
              href="/properties"
              className="rounded-md border border-primary-600 bg-white px-5 py-2 min-h-[40px] inline-flex items-center text-base font-semibold no-underline text-primary-600 transition-colors hover:bg-primary-900 hover:text-white dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              View Properties
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}