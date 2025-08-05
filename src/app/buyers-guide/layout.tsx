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
    <div className="container mx-auto max-w-7xl px-5 pb-10 mt-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <main className="prose prose-slate max-w-none dark:prose-invert lg:col-span-3 bg-white p-8 border border-black/10 shadow-sm rounded-xl dark:bg-slate-800">
          {children}
        </main>
        <aside className="lg:col-span-1">
          <BuyersGuideNav />
        </aside>
      </div>
    </div>
  );
} 