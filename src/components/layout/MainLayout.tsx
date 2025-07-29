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
      <main className="flex-grow pt-[104px]">{children}</main>
      <Footer />
    </div>
  );
} 