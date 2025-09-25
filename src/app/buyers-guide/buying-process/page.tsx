import PromoSidebar from '@/components/PromoSidebar';
import { Metadata } from 'next';
import BuyersGuidePage from '../page';
import { BuyersGuideNav } from '@/components/buyers-guide/BuyersGuideNav';

export const metadata: Metadata = {
  title: 'Property Buying Process in Spain - Step by Step Guide | Inland Andalucia',
  description:
    'Understanding the Spanish property buying process. Learn about each step from property viewing to completion, legal requirements, and timelines.',
};

export default function BuyingProcessPage() {
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Left: Advanced Search Form */}
      <section className="md:col-span-3 bg-white rounded-xl p-8 border border-black/10">
        <header>
          <h1 className="text-3xl font-bold text-primary-600 dark:text-white mb-3">
            The Property Buying Process in Spain
          </h1>
          <p className="mb-8 mt-0 text-base text-neutral-600 dark:text-slate-300">
            A comprehensive guide to buying property in Spain, from initial viewing to getting your keys.
            Understanding each step helps ensure a smooth purchase process.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
            Step 1: Property Viewing and Selection
          </h2>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Schedule viewings of properties that match your criteria</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Take detailed notes and photos during viewings</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Ask questions about the property's history and condition</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Research the local area and amenities</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Consider arranging a second viewing if interested</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
            Step 2: Making an Offer
          </h2>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Submit your offer through your estate agent</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Negotiate the price and terms</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Agree on fixtures and fittings to be included</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Discuss timeline and any conditions</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
            Step 3: Legal and Administrative Process
          </h2>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Appoint a legal representative</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Obtain NIE (Foreign Identity Number)</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Open a Spanish bank account</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Conduct property checks and searches</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Review and sign reservation agreement</li>
            </ul>
          </div>
        </section>

        <div className="rounded-lg bg-yellow-50 p-6 dark:bg-yellow-900/20 border border-black/10">
          <h3 className="mb-3 mt-0 text-2xl font-semibold text-primary-900 dark:text-white">
            Important Documentation
          </h3>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className='text-base text-neutral-600 mb-4'>Essential documents needed during the process:</p>
            <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>NIE (Foreigner's Identification Number)</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Passport or ID</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Proof of funds</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Power of Attorney (if not present for completion)</li>
            </ul>
          </div>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
            Step 4: Purchase Completion
          </h2>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Sign the purchase contract (Escritura)</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Pay remaining balance and taxes</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Register the property in your name</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Receive keys and documentation</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Set up utility contracts</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
            After Purchase Support
          </h2>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className='text-base text-neutral-600 mb-4'>Our service doesn't end with the purchase. We help with:</p>
            <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Setting up utilities and services</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Connecting with local contractors if needed</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Providing local area information</li>
              <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Ongoing support and advice</li>
            </ul>
          </div>
        </section>

        <div className="mt-8 flex items-center justify-between rounded-lg  bg-neutral-50 p-6 dark:border-slate-700 dark:bg-slate-800">
          <div className='w-[50%] pr-[20px]'>
            <h3 className="text-2xl font-semibold text-primary-900 mt-0 mb-2 dark:text-white">
              Need More Information?
            </h3>
            <p className="mt-0 mb-0 text-base text-neutral-600 dark:text-slate-300">
              Contact our team for detailed guidance on the buying process or to arrange a viewing.
            </p>
          </div>
          <div className="flex justify-end gap-4 w-[50%]">
            <a
              href="/contact"
              className="rounded-md bg-primary-600 px-8 py-2 min-h-[40px] inline-flex items-center no-underline text-base font-semibold text-white transition-colors hover:bg-primary-900 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Contact Us
            </a>
            <a
              href="/properties"
              className="rounded-md border border-primary-600 bg-white px-8 py-2 min-h-[40px] inline-flex items-center text-base font-semibold no-underline text-primary-600 transition-colors hover:bg-primary-900 hover:text-white dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              View Properties
            </a>
          </div>
        </div>
      </section>
      <div>
        <BuyersGuideNav />
      </div>
    </div>
  );
} 