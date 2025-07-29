import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Buyer's Guide - Your Path to Spanish Property | Inland Andalucia",
  description:
    'Comprehensive guide to buying property in inland Spain. Learn about the buying process, taxes, mortgages, and essential information for property buyers.',
};

export default function BuyersGuidePage() {
  return (
    <div className="space-y-6">
      <h1 className="font-playfair text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
        Buyer&apos;s Guide
      </h1>
      
      <p className="text-lg text-slate-600 dark:text-slate-300">
        Welcome to our comprehensive Buyer&apos;s Guide. Whether you&apos;re looking to buy a property in inland Spain
        or just exploring your options, we&apos;ve got you covered with everything you need to know.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Quick Links Cards */}
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
          <h3 className="mb-2 font-playfair text-xl font-semibold text-slate-900 dark:text-white">
            Buying a Property
          </h3>
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
            Essential information about property types, locations, and what to look for.
          </p>
          <a
            href="/buyers-guide/buying-property"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Learn more →
          </a>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
          <h3 className="mb-2 font-playfair text-xl font-semibold text-slate-900 dark:text-white">
            Buying Process
          </h3>
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
            Step-by-step guide to the property purchase process in Spain.
          </p>
          <a
            href="/buyers-guide/buying-process"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Learn more →
          </a>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
          <h3 className="mb-2 font-playfair text-xl font-semibold text-slate-900 dark:text-white">
            Property Taxes
          </h3>
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
            Understanding taxes and fees involved in Spanish property purchase.
          </p>
          <a
            href="/buyers-guide/property-taxes"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Learn more →
          </a>
        </div>
      </div>

      <div className="mt-8 rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
        <h2 className="mb-4 font-playfair text-2xl font-semibold text-slate-900 dark:text-white">
          Why Choose Inland Andalucia?
        </h2>
        <ul className="ml-6 list-disc space-y-2 text-slate-600 dark:text-slate-300">
          <li>Over 20 years of experience in inland Spanish property</li>
          <li>Comprehensive support throughout the buying process</li>
          <li>Expert local knowledge and guidance</li>
          <li>Verified and legal properties</li>
          <li>Multilingual team to assist you</li>
        </ul>
      </div>
    </div>
  );
} 