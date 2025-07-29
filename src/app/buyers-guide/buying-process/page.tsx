import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Property Buying Process in Spain - Step by Step Guide | Inland Andalucia',
  description:
    'Understanding the Spanish property buying process. Learn about each step from property viewing to completion, legal requirements, and timelines.',
};

export default function BuyingProcessPage() {
  return (
    <article className="space-y-8">
      <header>
        <h1 className="font-playfair text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
          The Property Buying Process in Spain
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          A comprehensive guide to buying property in Spain, from initial viewing to getting your keys.
          Understanding each step helps ensure a smooth purchase process.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-playfair text-2xl font-semibold text-slate-900 dark:text-white">
          Step 1: Property Viewing and Selection
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <ul>
            <li>Schedule viewings of properties that match your criteria</li>
            <li>Take detailed notes and photos during viewings</li>
            <li>Ask questions about the property's history and condition</li>
            <li>Research the local area and amenities</li>
            <li>Consider arranging a second viewing if interested</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-playfair text-2xl font-semibold text-slate-900 dark:text-white">
          Step 2: Making an Offer
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <ul>
            <li>Submit your offer through your estate agent</li>
            <li>Negotiate the price and terms</li>
            <li>Agree on fixtures and fittings to be included</li>
            <li>Discuss timeline and any conditions</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-playfair text-2xl font-semibold text-slate-900 dark:text-white">
          Step 3: Legal and Administrative Process
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <ul>
            <li>Appoint a legal representative</li>
            <li>Obtain NIE (Foreign Identity Number)</li>
            <li>Open a Spanish bank account</li>
            <li>Conduct property checks and searches</li>
            <li>Review and sign reservation agreement</li>
          </ul>
        </div>
      </section>

      <div className="rounded-lg bg-yellow-50 p-6 dark:bg-yellow-900/20">
        <h3 className="mb-3 font-playfair text-xl font-semibold text-slate-900 dark:text-white">
          Important Documentation
        </h3>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p>Essential documents needed during the process:</p>
          <ul>
            <li>NIE (Foreigner's Identification Number)</li>
            <li>Passport or ID</li>
            <li>Proof of funds</li>
            <li>Power of Attorney (if not present for completion)</li>
          </ul>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="font-playfair text-2xl font-semibold text-slate-900 dark:text-white">
          Step 4: Purchase Completion
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <ul>
            <li>Sign the purchase contract (Escritura)</li>
            <li>Pay remaining balance and taxes</li>
            <li>Register the property in your name</li>
            <li>Receive keys and documentation</li>
            <li>Set up utility contracts</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-playfair text-2xl font-semibold text-slate-900 dark:text-white">
          After Purchase Support
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p>Our service doesn't end with the purchase. We help with:</p>
          <ul>
            <li>Setting up utilities and services</li>
            <li>Connecting with local contractors if needed</li>
            <li>Providing local area information</li>
            <li>Ongoing support and advice</li>
          </ul>
        </div>
      </section>

      <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="font-playfair text-xl font-semibold text-slate-900 dark:text-white">
          Need More Information?
        </h3>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Contact our team for detailed guidance on the buying process or to arrange a viewing.
        </p>
        <div className="mt-4 flex gap-4">
          <a
            href="/contact"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Contact Us
          </a>
          <a
            href="/properties"
            className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            View Properties
          </a>
        </div>
      </div>
    </article>
  );
} 