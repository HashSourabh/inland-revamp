import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions About Buying Property in Spain | Inland Andalucia',
  description:
    'Find answers to common questions about buying property in inland Spain. Learn about the buying process, legal requirements, costs, and more.',
};

export default function FAQsPage() {
  return (
    <article className="space-y-8">
      <header>
        <h1 className="font-playfair text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          Find answers to the most common questions about buying property in inland Spain. If you can't
          find what you're looking for, don't hesitate to contact us.
        </p>
      </header>

      <section className="space-y-6">
        <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
          <h2 className="font-playfair text-xl font-semibold text-slate-900 dark:text-white">
            General Questions
          </h2>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium text-slate-900 dark:text-white">
                Do I need to be a resident to buy property in Spain?
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                No, you don't need to be a resident. Non-residents can freely buy property in Spain, but
                you'll need an NIE (Foreign Identity Number) to complete the purchase.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-slate-900 dark:text-white">
                What additional costs should I budget for when buying?
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Budget approximately 10-12% of the purchase price for additional costs, including:
                transfer tax (6-10%), notary fees, legal fees, and registration fees.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
          <h2 className="font-playfair text-xl font-semibold text-slate-900 dark:text-white">
            Legal & Documentation
          </h2>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium text-slate-900 dark:text-white">
                What is an NIE and how do I get one?
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                An NIE (Número de Identidad de Extranjero) is a tax identification number for foreigners.
                You can obtain it through the Spanish consulate in your country or through a police
                station in Spain. We can assist with this process.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-slate-900 dark:text-white">
                Do I need a Spanish bank account?
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Yes, a Spanish bank account is necessary for paying utilities and local taxes. It's also
                required if you're taking out a Spanish mortgage.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
          <h2 className="font-playfair text-xl font-semibold text-slate-900 dark:text-white">
            Property & Location
          </h2>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium text-slate-900 dark:text-white">
                What's the difference between urban and rural properties?
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Urban properties are located within town boundaries with access to main services. Rural
                properties might have more land but could have restricted building rights and limited
                access to utilities.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-slate-900 dark:text-white">
                Can I renovate or extend my property?
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Yes, but you'll need proper permits from the local town hall. Regulations vary between
                urban and rural areas, and some properties may have restrictions.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
          <h2 className="font-playfair text-xl font-semibold text-slate-900 dark:text-white">
            After Purchase
          </h2>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium text-slate-900 dark:text-white">
                What ongoing costs should I expect?
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Regular costs include IBI (council tax), community fees if applicable, utilities,
                insurance, and non-resident income tax if you're not a resident.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-slate-900 dark:text-white">
                Can I rent out my property?
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Yes, but you'll need to register for tourist rentals and comply with local regulations.
                Income must be declared and taxed appropriately.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8 rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
        <h2 className="font-playfair text-xl font-semibold text-slate-900 dark:text-white">
          Still Have Questions?
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Our team is here to help you with any questions you might have about buying property in
          inland Spain.
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