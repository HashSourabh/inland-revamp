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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 lg:gap-8 gap-4">
      {/* Left: Main Content */}
      <section className="md:col-span-3 lg:col-span-4 bg-white rounded-xl md:p-8 sm:p-6 xs:p-5 p-4 border border-black/10">
        <FAQsContent />
      </section>
      <div className="md:col-span-2 lg:col-span-2">
        <BuyersGuideNav />
      </div>
    </div>
  );
}