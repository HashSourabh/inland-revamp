import { Metadata } from 'next';
import FAQsContent from '@/components/buyers-guide/FAQsContent';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions About Buying Property in Spain | Inland Andalucia',
  description:
    'Find answers to common questions about buying property in inland Spain. Learn about the buying process, legal requirements, costs, and more.',
};

export default function FAQsPage() {
  return <FAQsContent />;
}