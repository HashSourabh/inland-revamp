import { Metadata } from 'next';
import FAQsContent from '@/components/buyers-guide/FAQsContent';
import { BuyersGuideNav } from '@/components/buyers-guide/BuyersGuideNav';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions About Buying Property in Spain | Inland Andalucia',
  description:
    'Find answers to common questions about buying property in inland Spain. Learn about the buying process, legal requirements, costs, and more.',
};

export default function FAQsPage() {
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Left: Main Content */}
      <section className="md:col-span-3 bg-white rounded-xl p-8 border border-black/10">
        <FAQsContent />
      </section>
      <div>
        <BuyersGuideNav />
      </div>
    </div>
  );
}