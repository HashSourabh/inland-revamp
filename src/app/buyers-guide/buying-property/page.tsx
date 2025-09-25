import { Metadata } from 'next';
import { BuyersGuideNav } from '@/components/buyers-guide/BuyersGuideNav';

export const metadata: Metadata = {
  title: 'Buying a Property in Spain - Guide | Inland Andalucia',
  description:
    'Learn everything about buying property in inland Spain. Discover property types, important considerations, and expert tips for making your Spanish property purchase.',
};

export default function BuyingPropertyPage() {
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Left: Main Content */}
      <section className="md:col-span-3 bg-white rounded-xl p-8 border border-black/10">
        <article className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-primary-600 dark:text-white mb-3">
          Buying a Property in Spain
        </h1>
        <p className="mb-8 mt-0 text-base text-neutral-600 dark:text-slate-300">
          Your comprehensive guide to purchasing property in inland Spain. Learn about different property types,
          key considerations, and how to make the right choice for your needs.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
          Types of Properties
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p className='text-base text-neutral-600 mb-4'>
            Inland Andalucia offers a diverse range of properties to suit different preferences and budgets:
          </p>
          <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>
              <strong className='text-primary-600'>Cortijos:</strong> Traditional Spanish farmhouses, often with land and outbuildings
            </li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>
              <strong className='text-primary-600'>Town Houses:</strong> Properties in the heart of traditional Spanish towns
            </li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>
              <strong className='text-primary-600'>Villas:</strong> Modern or traditional detached houses, often with gardens and pools
            </li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>
              <strong className='text-primary-600'>Country Properties:</strong> Rural homes with land and beautiful views
            </li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>
              <strong className='text-primary-600'>Renovation Projects:</strong> Properties needing work but offering great potential
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
          Key Considerations
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p className='text-base text-neutral-600 mb-4'>When buying a property in inland Spain, consider these important factors:</p>
          <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Location and accessibility</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Property condition and potential renovation needs</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Legal status and documentation</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Local amenities and services</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Future resale potential</li>
          </ul>
        </div>
      </section>

      <div className="rounded-lg bg-yellow-50 p-6 dark:bg-yellow-900/20 border border-black/10">
        <h3 className="mb-3 mt-0 text-2xl font-semibold text-primary-900 dark:text-white">
          Important Note
        </h3>
        <p className="text-neutral-600 text-base dark:text-slate-300">
          Always work with a reputable agent who can verify the legal status of properties and guide you
          through the buying process. At Inland Andalucia, we ensure all our properties are legally
          sound and come with proper documentation.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary-900 mt-10 mb-4 dark:text-white">
          Our Services
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p className='text-base text-neutral-600 mb-4'>When you choose Inland Andalucia, you benefit from:</p>
          <ul className='pl-[19px] mt-0 marker:text-primary-900/85'>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Extensive local knowledge and expertise</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Property verification and legal checks</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Multilingual support throughout the process</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>Access to trusted local professionals</li>
            <li className='p-0 mt-0 mb-2.5 text-neutral-600'>After-sale support and guidance</li>
          </ul>
        </div>
      </section>

      <div className="mt-8 flex items-center justify-between rounded-lg  bg-neutral-50 p-6 dark:border-slate-700 dark:bg-slate-800">
        <div>
          <h3 className="text-2xl font-semibold text-primary-900 mt-0 mb-2 dark:text-white">
            Ready to Start Your Property Search?
          </h3>
          <p className="mt-0 mb-0 text-base text-neutral-600 dark:text-slate-300">
            Browse our extensive collection of inland properties.
          </p>
        </div>
        <a
          href="/properties"
          className="rounded-md bg-primary-600 px-8 py-2 min-h-[40px] inline-flex items-center no-underline text-base font-semibold text-white transition-colors hover:bg-primary-900 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          View Properties
        </a>
      </div>
        </article>
      </section>
      <div>
        <BuyersGuideNav />
      </div>
    </div>
  );
} 