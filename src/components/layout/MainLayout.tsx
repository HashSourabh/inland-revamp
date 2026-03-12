"use client";

import React from 'react';
import { Header, Footer } from '.';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow pt-[195px] xs:pt-[167px] sm:pt-[139px] xl:pt-[150px]">{children}</main>
      <Footer />
    </div>
  );
} 