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
        <h1 className="font-playfair text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
          Spanish Mortgages Guide
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          Understanding Spanish mortgages is crucial when buying property. Here's everything you need
          to know about financing your property purchase in Spain.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-playfair text-2xl font-semibold text-slate-900 dark:text-white">
          Mortgage Options in Spain
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
            <h3 className="mb-3 font-playfair text-lg font-semibold text-slate-900 dark:text-white">
              Resident Mortgages
            </h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
              <li>Up to 80% financing for primary residences</li>
              <li>Better interest rates</li>
              <li>Longer repayment terms available</li>
              <li>More flexible conditions</li>
            </ul>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
            <h3 className="mb-3 font-playfair text-lg font-semibold text-slate-900 dark:text-white">
              Non-Resident Mortgages
            </h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
              <li>Up to 70% financing typically available</li>
              <li>Slightly higher interest rates</li>
              <li>Shorter repayment terms</li>
              <li>Additional documentation required</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-playfair text-2xl font-semibold text-slate-900 dark:text-white">
          Requirements for Non-Resident Buyers
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p>To apply for a mortgage in Spain as a non-resident, you'll need:</p>
          <ul>
            <li>NIE (Foreign Identity Number)</li>
            <li>Proof of income (usually last 3-6 months of payslips)</li>
            <li>Tax returns from your home country</li>
            <li>Bank statements (usually last 3-6 months)</li>
            <li>Proof of employment or business ownership</li>
            <li>Credit history documentation</li>
            <li>List of current assets and liabilities</li>
          </ul>
        </div>
      </section>

      <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
        <h2 className="font-playfair text-xl font-semibold text-slate-900 dark:text-white">
          Associated Costs
        </h2>
        <div className="mt-4 space-y-2 text-slate-600 dark:text-slate-300">
          <p>When taking out a mortgage, budget for these additional costs:</p>
          <ul className="ml-6 list-disc space-y-1">
            <li>Property valuation fee (€300-€600)</li>
            <li>Mortgage arrangement fee (1-2% of loan amount)</li>
            <li>Notary fees for mortgage deed</li>
            <li>Property insurance (required by lender)</li>
            <li>Life insurance (may be required)</li>
          </ul>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="font-playfair text-2xl font-semibold text-slate-900 dark:text-white">
          Types of Spanish Mortgages
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
            <h3 className="mb-3 font-playfair text-lg font-semibold text-slate-900 dark:text-white">
              Fixed Rate Mortgages
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Interest rate remains the same throughout the term. Offers security in monthly payments
              but typically starts with a higher rate.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
            <h3 className="mb-3 font-playfair text-lg font-semibold text-slate-900 dark:text-white">
              Variable Rate Mortgages
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Interest rate varies with Euribor. Usually starts lower but payments can change over
              time. Most common in Spain.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-playfair text-2xl font-semibold text-slate-900 dark:text-white">
          The Application Process
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <ol>
            <li>Initial consultation and assessment of options</li>
            <li>Gathering and submitting required documentation</li>
            <li>Property valuation</li>
            <li>Bank's assessment and decision</li>
            <li>Mortgage offer and acceptance</li>
            <li>Signing at the notary</li>
          </ol>
        </div>
      </section>

      <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-playfair text-xl font-semibold text-slate-900 dark:text-white">
              Ready to Explore Your Mortgage Options?
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Our team can connect you with trusted Spanish mortgage advisors who specialize in
              non-resident mortgages.
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="/contact"
              className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Get Mortgage Advice
            </a>
            <a
              href="/properties"
              className="inline-flex items-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              View Properties
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}