import type { Metadata } from 'next';
import { BuyersGuideNav } from '@/components/buyers-guide/BuyersGuideNav';

export const metadata: Metadata = {
  title: "Buyer's Guide - Inland Andalucia",
  description: 'Everything you need to know about buying property in inland Spain - from process to taxes and mortgages.',
};

export default function BuyersGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 mt-[104px]">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <BuyersGuideNav />
        </aside>
        <main className="prose prose-slate max-w-none dark:prose-invert lg:col-span-3 bg-white p-10 shadow-sm rounded-lg dark:bg-slate-800">
          {children}
        </main>
      </div>
    </div>
  );
} 