import '../../app/globals.css'
import type { Metadata } from 'next';
import { Open_Sans, Playfair_Display, Work_Sans, DM_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { MainLayout } from '@/components/layout';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { PropertyCacheProvider } from '@/context/PropertyCacheContext';
import { AuthProvider } from '@/context/AuthContext';
import TidioLoader from '@/components/loader/TidioLoader';

// Performance: Optimize font loading by specifying only required weights
// This reduces font file sizes and improves initial load time
const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap', // Prevents invisible text during font load
  variable: '--font-open-sans',
  weight: ['400', '600', '700'], // Only load required weights
  preload: false, // Defer non-critical font
});

const workSans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans',
  weight: ['400', '500', '600', '700'], // Only load required weights
  preload: true, // Preload primary font
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
  weight: ['400', '500', '700'], // Only load required weights
  preload: false, // Defer non-critical font
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
  weight: ['400', '700'], // Only load required weights
  preload: false, // Defer decorative font
});

export const metadata: Metadata = {
  title: 'Inland Andalucia | Properties for Sale in Rural Spain',
  description:
    'Discover authentic Spanish countryside living with our exclusive selection of properties across Andalucia. Find your dream home in inland Spain.',
  metadataBase: new URL('https://inland-revamp.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Inland Andalucia',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  const locale = params.locale;

  return (
    <html
      lang={locale}
      className={`${workSans.variable} ${playfairDisplay.variable} ${openSans.variable} ${dmSans.variable}`}
    >
      <head>
        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://www.inlandandalucia.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://inlandandalucia.onrender.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.inlandandalucia.com" />
        <link rel="dns-prefetch" href="https://inlandandalucia.onrender.com" />
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/_next/static/media/work-sans-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${workSans.className} min-h-screen`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <AuthProvider>
            <PropertyCacheProvider>
              <MainLayout>{children}</MainLayout>
            </PropertyCacheProvider>
          </AuthProvider>
          <ThemeSwitcher />
        </NextIntlClientProvider>
        <TidioLoader />
      </body>
    </html>
  );
}
