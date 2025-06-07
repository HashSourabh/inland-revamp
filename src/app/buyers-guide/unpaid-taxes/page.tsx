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
        <h1 className="font-playfair text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
          Understanding Unpaid Taxes
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          When buying property in Spain, it's crucial to understand the implications of any unpaid
          taxes associated with the property. Here's what you need to know to protect yourself.
        </p>
      </header>

      <div className="rounded-lg bg-yellow-50 p-6 dark:bg-yellow-900/20">
        <h2 className="font-playfair text-xl font-semibold text-slate-900 dark:text-white">
          Important Warning
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          In Spain, unpaid taxes associated with a property become the responsibility of the new owner.
          This makes it essential to conduct proper checks before completing any purchase.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-playfair text-2xl font-semibold text-slate-900 dark:text-white">
          Types of Tax Debts to Check
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <ul>
            <li>
              <strong>IBI (Council Tax):</strong> Annual property tax paid to the local town hall
            </li>
            <li>
              <strong>Community Fees:</strong> For properties within a community or urbanization
            </li>
            <li>
              <strong>Plusvalía:</strong> Tax on the increase in land value
            </li>
            <li>
              <strong>Wealth Tax:</strong> For high-value properties
            </li>
            <li>
              <strong>Income Tax:</strong> If the property has been rented
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-playfair text-2xl font-semibold text-slate-900 dark:text-white">
          How to Check for Unpaid Taxes
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p>
            Several checks should be conducted before purchasing a property:
          </p>
          <ol>
            <li>
              Request a certificate from the town hall showing any outstanding IBI payments
            </li>
            <li>
              If applicable, obtain confirmation from the community administrator that all fees are
              up to date
            </li>
            <li>
              Check with the Land Registry for any registered debts or charges
            </li>
            <li>
              Verify with the tax office that there are no outstanding tax obligations
            </li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-playfair text-2xl font-semibold text-slate-900 dark:text-white">
          Protecting Yourself
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
            <h3 className="mb-3 font-playfair text-lg font-semibold text-slate-900 dark:text-white">
              Legal Representation
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Always use a qualified lawyer who can conduct proper due diligence and verify there are
              no outstanding debts before proceeding with the purchase.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
            <h3 className="mb-3 font-playfair text-lg font-semibold text-slate-900 dark:text-white">
              Documentation
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Ensure all certificates and clearance documents are obtained and verified before signing
              the final purchase contract.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-playfair text-2xl font-semibold text-slate-900 dark:text-white">
          Our Commitment
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p>
            At Inland Andalucia, we ensure that:
          </p>
          <ul>
            <li>All properties listed have been checked for outstanding debts</li>
            <li>Necessary documentation is available for review</li>
            <li>Our legal partners can conduct additional checks if required</li>
            <li>You're protected throughout the buying process</li>
          </ul>
        </div>
      </section>

      <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-playfair text-xl font-semibold text-slate-900 dark:text-white">
              Need Professional Assistance?
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Our team can help you verify any property's tax status and connect you with trusted legal experts.
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="/contact"
              className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Contact Us
            </a>
            <a
              href="/buyers-guide/buying-process"
              className="inline-flex items-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Buying Process
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}