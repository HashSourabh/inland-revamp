import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans, Playfair_Display,Work_Sans,DM_Sans  } from 'next/font/google';
import { MainLayout } from '@/components/layout';
import ThemeSwitcher from '@/components/ThemeSwitcher';

// Font configuration
const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable:'--font-work-sans',
});

const dmSans = DM_Sans({
  subsets:['latin'],
  display:'swap',
  variable:'--font-dm-sans',
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
    <html lang="en" className={`${workSans.variable} ${playfairDisplay.variable}`}>
      <body className={`${workSans.className} min-h-screen`}>
        <MainLayout>{children}</MainLayout>
        <ThemeSwitcher />
      </body>
    </html>
  );
}
