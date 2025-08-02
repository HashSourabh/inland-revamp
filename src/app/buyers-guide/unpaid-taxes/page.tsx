import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Understanding Unpaid Taxes on Spanish Property | Inland Andalucia',
  description:
    'Learn about the implications of unpaid taxes when buying property in Spain, how to check for tax debts, and protect yourself during property purchase.',
};

export default function UnpaidTaxesPage() {
  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-primary-600 dark:text-white mb-6">
          Understanding Unpaid Taxes
        </h1>
        <p className="mb-8 mt-0 text-base text-neutral-600 dark:text-slate-300">
          When buying property in Spain, it's crucial to understand the implications of any unpaid
          taxes associated with the property. Here's what you need to know to protect yourself.
        </p>
      </header>

      <div className="rounded-lg bg-yellow-50 p-6 dark:bg-yellow-900/20 border border-black/10">
        <h2 className="mb-3 mt-0 text-2xl font-semibold text-primary-900 dark:text-white">
          Important Warning
        </h2>
        <p className="text-base text-neutral-600 m-0">
          In Spain, unpaid taxes associated with a property become the responsibility of the new owner.
          This makes it essential to conduct proper checks before completing any purchase.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
          Types of Tax Debts to Check
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>
              <strong className='text-primary-600'>IBI (Council Tax):</strong> Annual property tax paid to the local town hall
            </li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>
              <strong className='text-primary-600'>Community Fees:</strong> For properties within a community or urbanization
            </li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>
              <strong className='text-primary-600'>Plusvalía:</strong> Tax on the increase in land value
            </li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>
              <strong className='text-primary-600'>Wealth Tax:</strong> For high-value properties
            </li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>
              <strong className='text-primary-600'>Income Tax:</strong> If the property has been rented
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
          How to Check for Unpaid Taxes
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p className='text-base text-neutral-600 mb-4'>
            Several checks should be conducted before purchasing a property:
          </p>
          <ol className='pl-[19px] mt-0 marker:text-primary-900/85'>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>
              Request a certificate from the town hall showing any outstanding IBI payments
            </li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>
              If applicable, obtain confirmation from the community administrator that all fees are
              up to date
            </li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>
              Check with the Land Registry for any registered debts or charges
            </li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>
              Verify with the tax office that there are no outstanding tax obligations
            </li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
          Protecting Yourself
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg  bg-neutral-50 p-6">
            <h3 className="mb-2 mt-0  text-lg font-semibold text-black dark:text-white">
              Legal Representation
            </h3>
            <p className="text-neutral-600 dark:text-slate-300 m-0">
              Always use a qualified lawyer who can conduct proper due diligence and verify there are
              no outstanding debts before proceeding with the purchase.
            </p>
          </div>
          <div className="rounded-lg bg-neutral-50  p-6">
            <h3 className="mb-2 mt-0 text-lg font-semibold text-black dark:text-white">
              Documentation
            </h3>
            <p className="text-neutral-600 dark:text-slate-300 m-0">
              Ensure all certificates and clearance documents are obtained and verified before signing
              the final purchase contract.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
          Our Commitment
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p className='text-base text-neutral-600 mb-4'>
            At Inland Andalucia, we ensure that:
          </p>
          <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>All properties listed have been checked for outstanding debts</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Necessary documentation is available for review</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Our legal partners can conduct additional checks if required</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>You're protected throughout the buying process</li>
          </ul>
        </div>
      </section>

      <div className="mt-8 flex items-center justify-between rounded-lg  bg-neutral-50 p-6 dark:border-slate-700 dark:bg-slate-800">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className='w-[50%] pr-[20px]'>
            <h2 className="text-2xl font-semibold text-primary-900 mt-0 mb-2 dark:text-white">
              Need Professional Assistance?
            </h2>
            <p className="mt-0 mb-0 text-base text-neutral-600 dark:text-slate-300">
              Our team can help you verify any property's tax status and connect you with trusted legal experts.
            </p>
          </div>
          <div className="w-[50%] justify-end flex gap-4">
            <a
              href="/contact"
              className="rounded-md bg-primary-600 px-8 py-2 min-h-[40px] inline-flex items-center no-underline text-base font-semibold text-white transition-colors hover:bg-primary-900 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Contact Us
            </a>
            <a
              href="/buyers-guide/buying-process"
              className="rounded-md border border-primary-600 bg-white px-8 py-2 min-h-[40px] inline-flex items-center text-base font-semibold no-underline text-primary-600 transition-colors hover:bg-primary-900 hover:text-white dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Buying Process
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}