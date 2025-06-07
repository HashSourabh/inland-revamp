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
        <h1 className="font-playfair text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
          Property Taxes in Spain
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          Understanding the tax implications of buying and owning property in Spain is crucial for making
          informed decisions. Here's a comprehensive overview of all the taxes involved.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-playfair text-2xl font-semibold text-slate-900 dark:text-white">
          Purchase Taxes
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <h3>Transfer Tax (ITP)</h3>
          <p>
            When buying a resale property, you'll need to pay the Property Transfer Tax (ITP):
          </p>
          <ul>
            <li>8% for properties up to €400,000</li>
            <li>9% for properties between €400,000 and €700,000</li>
            <li>10% for properties over €700,000</li>
          </ul>

          <h3 className="mt-6">VAT (IVA) and Stamp Duty</h3>
          <p>
            For new properties, instead of ITP, you'll pay:
          </p>
          <ul>
            <li>10% VAT (IVA)</li>
            <li>1.5% Stamp Duty (AJD)</li>
          </ul>
        </div>
      </section>

      <div className="rounded-lg bg-yellow-50 p-6 dark:bg-yellow-900/20">
        <h3 className="mb-3 font-playfair text-xl font-semibold text-slate-900 dark:text-white">
          Important Note
        </h3>
        <p className="text-slate-600 dark:text-slate-300">
          Tax rates can vary between regions in Spain and may change over time. Always consult with a
          legal professional for the most current rates and regulations.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-playfair text-2xl font-semibold text-slate-900 dark:text-white">
          Annual Property Taxes
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <h3>IBI (Council Tax)</h3>
          <p>
            The main annual property tax in Spain, based on the cadastral value of your property:
          </p>
          <ul>
            <li>Paid annually to the local town hall</li>
            <li>Rates vary by municipality</li>
            <li>Usually between 0.4% and 1.1% of cadastral value</li>
          </ul>

          <h3 className="mt-6">Basura (Rubbish Collection)</h3>
          <p>
            Annual fee for waste collection services:
          </p>
          <ul>
            <li>Varies by location and property size</li>
            <li>Typically paid annually</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-playfair text-2xl font-semibold text-slate-900 dark:text-white">
          Non-Resident Taxes
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p>If you're a non-resident property owner, you'll need to:</p>
          <ul>
            <li>File an annual income tax return</li>
            <li>Pay tax on rental income (if applicable)</li>
            <li>Submit Form 210 for imputed income tax</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-playfair text-2xl font-semibold text-slate-900 dark:text-white">
          Capital Gains Tax
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p>When selling your property, you'll need to consider:</p>
          <ul>
            <li>19-23% tax on the profit made (for non-residents)</li>
            <li>Possible exemptions for primary residences</li>
            <li>Deductions for improvements and buying costs</li>
          </ul>
        </div>
      </section>

      <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="font-playfair text-xl font-semibold text-slate-900 dark:text-white">
          Need Tax Advice?
        </h3>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Our team can connect you with experienced tax advisors who specialize in Spanish property taxation.
        </p>
        <div className="mt-4">
          <a
            href="/contact"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Contact Our Team
          </a>
        </div>
      </div>
    </article>
  );
} 