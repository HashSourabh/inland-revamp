'use client';

import React from 'react';
import Link from 'next/link';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

const SocialIcon = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-500 text-white hover:bg-secondary-500/80 transition-colors"
  >
    {children}
  </a>
);

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-primary-600 text-white">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Information */}
          <div>
            <h3 className="mb-4 text-xl font-bold">{t('about_title')}</h3>
            <p className="mb-6 text-primary-100/90">{t('about_text')}</p>
            <div className="flex space-x-4">
              {/* Social Icons */}
              <SocialIcon href="https://www.facebook.com/inlandandaluciahomes">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 
                    3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797
                    c0-2.506 1.492-3.89 3.777-3.89 
                    1.094 0 2.238.195 2.238.195v2.46h-1.26
                    c-1.243 0-1.63.771-1.63 1.562V12h2.773
                    l-.443 2.89h-2.33v6.988C18.343 21.128 
                    22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </SocialIcon>

              <SocialIcon href="https://www.instagram.com/inland_andalucia/">
                {/* Instagram Icon */}
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 
                    1.064.049 1.791.218 2.427.465a4.902 4.902 
                    0 011.772 1.153 4.902 4.902 0 011.153 
                    1.772c.247.636.416 1.363.465 2.427.048 
                    1.067.06 1.407.06 4.123v.08c0 2.643-.012 
                    2.987-.06 4.043-.049 1.064-.218 1.791-.465 
                    2.427a4.902 4.902 0 01-1.153 1.772 
                    4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465
                    -1.067.048-1.407.06-4.123.06h-.08c-2.643 
                    0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 
                    4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427
                    -.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808
                    .049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 
                    4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465
                    C8.901 2.013 9.256 2 11.685 2h.63z"
                    clipRule="evenodd"
                  />
                </svg>
              </SocialIcon>

              <SocialIcon href="https://www.youtube.com/channel/UCeku6fMjkT8mmRmB0kAaALw">
                {/* YouTube Icon */}
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M19.812 5.418c.861.23 
                    1.538.907 1.768 1.768C21.998 
                    8.746 22 12 22 12s0 3.255-.418 
                    4.814a2.504 2.504 0 0 1-1.768 
                    1.768c-1.56.419-7.814.419-7.814.419s-6.255 
                    0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 
                    15.255 2 12 2 12s0-3.255.417-4.814a2.507 
                    2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 
                    11.998 5s6.255 0 7.814.418ZM15.194 12 
                    10 15V9l5.194 3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xl font-bold">{t('quick_links_title')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/properties" className="text-primary-100/90 hover:text-white transition-colors inline-flex items-center">
                  <ArrowRightIcon className="mr-2 h-4 w-4" />
                  {t('quick_links.properties')}
                </Link>
              </li>
              <li>
                <Link href="/town-guide/cordoba" className="text-primary-100/90 hover:text-white transition-colors inline-flex items-center">
                  <ArrowRightIcon className="mr-2 h-4 w-4" />
                  {t('quick_links.town_guide')}
                </Link>
              </li>
              <li>
                <Link href="/buyers-guide/buying-property" className="text-primary-100/90 hover:text-white transition-colors inline-flex items-center">
                  <ArrowRightIcon className="mr-2 h-4 w-4" />
                  {t('quick_links.buyers_guide')}
                </Link>
              </li>
              <li>
                <Link href="https://luvinland.com" className="text-primary-100/90 hover:text-white transition-colors inline-flex items-center">
                  <ArrowRightIcon className="mr-2 h-4 w-4" />
                  {t('quick_links.blog')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-primary-100/90 hover:text-white transition-colors inline-flex items-center">
                  <ArrowRightIcon className="mr-2 h-4 w-4" />
                  {t('quick_links.about_us')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-primary-100/90 hover:text-white transition-colors inline-flex items-center">
                  <ArrowRightIcon className="mr-2 h-4 w-4" />
                  {t('quick_links.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-4 text-xl font-bold">{t('contact_title')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPinIcon className="mt-1 h-5 w-5 flex-shrink-0 text-primary-300" />
                <span className="ml-3 text-primary-100/90">{t('contact_address')}</span>
              </li>
              <li className="flex items-start">
                <PhoneIcon className="mt-1 h-5 w-5 flex-shrink-0 text-primary-300" />
                <span className="ml-3 text-primary-100/90">{t('contact_phone')}</span>
              </li>
              <li className="flex items-start">
                <EnvelopeIcon className="mt-1 h-5 w-5 flex-shrink-0 text-primary-300" />
                <span className="ml-3 text-primary-100/90">{t('contact_email')}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-xl font-bold">{t('newsletter_title')}</h3>
            <p className="mb-4 text-primary-100/90">{t('newsletter_text')}</p>
            <form className="mt-4">
              <div className="flex flex-col space-y-3">
                <input
                  type="email"
                  placeholder={t('newsletter_placeholder')}
                  className="w-full rounded-md border-neutral-300 bg-white/10 px-4 py-2 text-white placeholder-white/60 focus:border-primary-500 focus:ring-primary-500"
                  required
                />
                <button
                  type="submit"
                  className="rounded-md bg-secondary-500 px-4 py-2 font-medium text-white hover:bg-secondary-600 transition-colors"
                >
                  {t('newsletter_subscribe')}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-800 pt-8">
          <div className="flex flex-col md:flex-row md:justify-between">
            <p className="text-sm text-primary-100/70">{t('copyright')}</p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <Link href="/privacy-policy" className="text-sm text-primary-100/70 hover:text-white transition-colors">
                {t('privacy')}
              </Link>
              <Link href="/terms-conditions" className="text-sm text-primary-100/70 hover:text-white transition-colors">
                {t('terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
