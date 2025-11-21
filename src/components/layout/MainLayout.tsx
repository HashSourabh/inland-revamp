"use client";

import React from 'react';
import { Header, Footer } from '.';
import ChatWidget from '@/components/chat/ChatWidget';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow pt-[104px]">{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  );
} 