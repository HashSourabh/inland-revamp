/**
 * Locale path helpers for next-intl with localePrefix: 'as-needed'.
 * Default locale (en) has no prefix in the URL; other locales use /es, /fr, etc.
 */

export const DEFAULT_LOCALE = 'en';

const LOCALE_SEGMENT_REGEX = /^\/(en|es|fr|pt|de)(?=\/|$)/;

/**
 * Strip the locale segment from pathname for comparison or building localized URLs.
 * e.g. '/es/blog' -> '/blog', '/blog' -> '/blog', '/en' -> '/'
 */
export function getPathWithoutLocale(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  const without = pathname.replace(LOCALE_SEGMENT_REGEX, '');
  return without === '' ? '/' : without;
}

/**
 * Build href for a given locale. Default locale (en) has no prefix.
 * e.g. getLocalizedPath('en', '/blog') -> '/blog', getLocalizedPath('es', '/blog') -> '/es/blog'
 * path must start with /
 */
export function getLocalizedPath(locale: string, path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return normalizedPath;
  return `/${locale}${normalizedPath}`;
}
