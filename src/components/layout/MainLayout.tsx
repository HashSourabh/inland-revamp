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
      <main className="flex-grow pt-[172px] xs:pt-[145px] sm:pt-[120px]">{children}</main>
      <Footer />
    </div>
  );
} 