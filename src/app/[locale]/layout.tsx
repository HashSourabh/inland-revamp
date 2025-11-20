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

// Font configuration
const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
});

export const metadata: Metadata = {
  title: 'Inland Andalucia | Properties for Sale in Rural Spain',
  description:
    'Discover authentic Spanish countryside living with our exclusive selection of properties across Andalucia. Find your dream home in inland Spain.',
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
