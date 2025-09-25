import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
const locales = ['en', 'es', 'fr', 'pt', 'de'];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  const common = (await import(`../public/locales/${locale}/common.json`)).default;
  const navigation = (await import(`../public/locales/${locale}/navigation.json`)).default;

  // Merge namespaces into a single messages object
  const messages = {
    ...(common || {}),
    ...(navigation || {})
  } as Record<string, any>;

  return {
    messages
  };
});



