import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buying a Property in Spain - Guide | Inland Andalucia',
  description:
    'Learn everything about buying property in inland Spain. Discover property types, important considerations, and expert tips for making your Spanish property purchase.',
};

export default function BuyingPropertyPage() {
  return (
    <article className="space-y-8">
      <header>
        <h1 className="font-playfair text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
          Buying a Property in Spain
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          Your comprehensive guide to purchasing property in inland Spain. Learn about different property types,
          key considerations, and how to make the right choice for your needs.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-playfair text-2xl font-semibold text-slate-900 dark:text-white">
          Types of Properties
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p>
            Inland Andalucia offers a diverse range of properties to suit different preferences and budgets:
          </p>
          <ul>
            <li>
              <strong>Cortijos:</strong> Traditional Spanish farmhouses, often with land and outbuildings
            </li>
            <li>
              <strong>Town Houses:</strong> Properties in the heart of traditional Spanish towns
            </li>
            <li>
              <strong>Villas:</strong> Modern or traditional detached houses, often with gardens and pools
            </li>
            <li>
              <strong>Country Properties:</strong> Rural homes with land and beautiful views
            </li>
            <li>
              <strong>Renovation Projects:</strong> Properties needing work but offering great potential
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-playfair text-2xl font-semibold text-slate-900 dark:text-white">
          Key Considerations
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p>When buying a property in inland Spain, consider these important factors:</p>
          <ul>
            <li>Location and accessibility</li>
            <li>Property condition and potential renovation needs</li>
            <li>Legal status and documentation</li>
            <li>Local amenities and services</li>
            <li>Future resale potential</li>
          </ul>
        </div>
      </section>

      <div className="rounded-lg bg-yellow-50 p-6 dark:bg-yellow-900/20">
        <h3 className="mb-3 font-playfair text-xl font-semibold text-slate-900 dark:text-white">
          Important Note
        </h3>
        <p className="text-slate-600 dark:text-slate-300">
          Always work with a reputable agent who can verify the legal status of properties and guide you
          through the buying process. At Inland Andalucia, we ensure all our properties are legally
          sound and come with proper documentation.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-playfair text-2xl font-semibold text-slate-900 dark:text-white">
          Our Services
        </h2>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p>When you choose Inland Andalucia, you benefit from:</p>
          <ul>
            <li>Extensive local knowledge and expertise</li>
            <li>Property verification and legal checks</li>
            <li>Multilingual support throughout the process</li>
            <li>Access to trusted local professionals</li>
            <li>After-sale support and guidance</li>
          </ul>
        </div>
      </section>

      <div className="mt-8 flex items-center justify-between rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <div>
          <h3 className="font-playfair text-xl font-semibold text-slate-900 dark:text-white">
            Ready to Start Your Property Search?
          </h3>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Browse our extensive collection of inland properties.
          </p>
        </div>
        <a
          href="/properties"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          View Properties
        </a>
      </div>
    </article>
  );
} 