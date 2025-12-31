import './globals.css';
import '../styles/tidio.css';
import type { Metadata } from 'next';
import { Open_Sans, Playfair_Display,Work_Sans,DM_Sans  } from 'next/font/google';
import { PropertyCacheProvider } from '@/context/PropertyCacheContext';
import { AuthProvider } from '@/context/AuthContext';
import TidioLoader from '@/components/loader/TidioLoader';

// Performance: Optimize font loading by specifying only required weights
const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
  weight: ['400', '600', '700'],
  preload: false,
});

const workSans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable:'--font-work-sans',
  weight: ['400', '500', '600', '700'],
  preload: true,
});

const dmSans = DM_Sans({
  subsets:['latin'],
  display:'swap',
  variable:'--font-dm-sans',
  weight: ['400', '500', '700'],
  preload: false,
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
  weight: ['400', '700'],
  preload: false,
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
      <head>
        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://www.inlandandalucia.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://inlandandalucia.onrender.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.inlandandalucia.com" />
        <link rel="dns-prefetch" href="https://inlandandalucia.onrender.com" />
      </head>
      <body className={`${workSans.className} min-h-screen`} suppressHydrationWarning>
        <AuthProvider>
          <PropertyCacheProvider>
            {children}
          </PropertyCacheProvider>
        </AuthProvider>
        <TidioLoader />
      </body>
    </html>
  );
}



