import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans, Playfair_Display } from 'next/font/google';
import { MainLayout } from '@/components/layout';
import ThemeSwitcher from '@/components/ThemeSwitcher';

// Font configuration
const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
});

export const metadata: Metadata = {
  title: 'Inland Andalucia | Properties for Sale in Rural Spain',
  description: 'Discover authentic Spanish countryside living with our exclusive selection of properties across Andalucia. Find your dream home in inland Spain.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.variable} ${playfairDisplay.variable}`}>
      <body className={`${openSans.className} min-h-screen`}>
        <MainLayout>{children}</MainLayout>
        <ThemeSwitcher />
      </body>
    </html>
  );
}
