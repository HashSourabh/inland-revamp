import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'es', 'fr', 'pt', 'de'],
  defaultLocale: 'en',
  localePrefix: 'always'
});

export const config = {
  // Match all paths except for static files, Next internals and API
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};



