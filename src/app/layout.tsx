import './globals.css';
import '../styles/tidio.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Open_Sans, Playfair_Display,Work_Sans,DM_Sans  } from 'next/font/google';
import { PropertyCacheProvider } from '@/context/PropertyCacheContext';
import { AuthProvider } from '@/context/AuthContext';
import TidioLoader from '@/components/loader/TidioLoader';
import TidioListener from '@/components/TidioListener';

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

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${workSans.variable} ${playfairDisplay.variable}`} suppressHydrationWarning>
      <head></head>
      <body className={`${workSans.className} min-h-screen`} suppressHydrationWarning>
        <AuthProvider>
          <PropertyCacheProvider>
            {children}
          </PropertyCacheProvider>
        </AuthProvider>
        <Script
          id="tidio"
          src="//code.tidio.co/egmmkeqjhcxreesz9g4b9ykarz2npaoa.js"
          strategy="lazyOnload"
        />
        <TidioListener />
        <TidioLoader />
      </body>
    </html>
  );
}



