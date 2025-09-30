import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
const locales = ['en', 'es', 'fr', 'pt', 'de'];

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as any)) {
    locale = 'en'; // Default locale
  }

  const common = (await import(`../public/locales/${locale}/common.json`)).default;
  const navigation = (await import(`../public/locales/${locale}/navigation.json`)).default;

  // Merge namespaces into a single messages object
  const messages = {
    ...(common || {}),
    ...(navigation || {})
  } as Record<string, any>;

  return {
    locale,
    messages
  };
});
