'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  PhoneIcon,
  EnvelopeIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

import Mollina from "@/assets/images/qr_inlandandalucia_mollina.png";
import Alcala from "@/assets/images/qr_inlandandalucia_jaen.png";
import Martos from "@/assets/images/qr_inlandandalucia_martos.png";

export default function ContactPage() {
  const t = useTranslations('contactPage');

  return (
    <div>
      {/* Hero Section */}
      <section className="md:py-20 sm:py-16 py-12 bg-primary-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-white lg:text-5xl md:text-4xl text-3xl">
            {t('hero.title')}
          </h1>
          <p className="mx-auto lg:mt-6 md:mt-4 mt-3 text-sm sm:text-base lg:text-lg text-white/50">
            {t('hero.description')}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 my-10">
        {/* Contact Information & Form */}
        <section className="sm:mb-8 mb-4 grid gap-12 rounded-xl bg-white md:p-8 sm:p-6 2xs:p-5 p-4 border border-black/10 md:grid-cols-5">

          {/* Contact Info */}
          <div className="col-span-2">
            <h2 className="font-heading lg:text-2xl sm:text-xl text-lg font-semibold text-primary-900">
              {t('contactInfo.title')}
            </h2>
            <p className="md:mt-4 sm:mt-3 mt-2 text-neutral-600 text-sm sm:text-base lg:text-lg">
              {t('contactInfo.description')}
            </p>

            <div className="md:mt-8 sm:mt-6 mt-4 2xs:space-y-6 space-y-4">
              {/* Main Office */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 flex items-center justify-center rounded-full">
                  <BuildingOfficeIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold md:text-lg text-base text-primary-900">
                    {t('contactInfo.offices.mainOffice.title')}
                  </h3>
                  <p className="mt-1 text-neutral-600 text-sm whitespace-pre-line">
                    {t('contactInfo.offices.mainOffice.address')}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 flex items-center justify-center rounded-full">
                  <EnvelopeIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary-900">
                    {t('contactInfo.email.title')}
                  </h3>
                  <div className="mt-1 text-neutral-600 text-sm">
                    <a href={`mailto:${t('contactInfo.email.emailAddress')}`}>
                      {t('contactInfo.email.emailAddress')}
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 flex items-center justify-center rounded-full">
                  <PhoneIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary-900">
                    {t('contactInfo.phone.title')}
                  </h3>
                  <a href={`tel:${t('contactInfo.phone.number')}`} className="mt-1 text-neutral-600 text-sm">
                    {t('contactInfo.phone.number')}
                  </a>
                </div>
              </div>
            </div>

            {/* QR Codes */}
            <div className="mt-8">
              <p className="mb-4 text-neutral-600 sm:text-base text-sm">{t('contactInfo.qr.description')}</p>
              <div className="grid sm:grid-cols-3 2xs:grid-cols-2 grid-cols-1 gap-4">
                <div className="text-center">
                  <Image src={Mollina} alt={t('contactInfo.qr.offices.mollina')} width={150} height={150} className="inline-block object-cover border border-primary-500/50" />
                  <h4 className="text-neutral-600 mt-2 sm:text-base text-sm">{t('contactInfo.qr.offices.mollina')}</h4>
                </div>
                <div className="text-center">
                  <Image src={Alcala} alt={t('contactInfo.qr.offices.alcala')} width={150} height={150} className="inline-block object-cover border border-primary-500/50" />
                  <h4 className="text-neutral-600 mt-2 sm:text-base text-sm">{t('contactInfo.qr.offices.alcala')}</h4>
                </div>
                <div className="text-center">
                  <Image src={Martos} alt={t('contactInfo.qr.offices.martos')} width={150} height={150} className="inline-block object-cover border border-primary-500/50" />
                  <h4 className="text-neutral-600 mt-2 sm:text-base text-sm">{t('contactInfo.qr.offices.martos')}</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-span-3 rounded-xl bg-neutral-50 sm:p-6 p-4">
            <h2 className="font-heading md:text-2xl text-xl font-semibold text-primary-900">
              {t('form.title')}
            </h2>
            <form className="mt-6 md:space-y-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-900">
                  {t('form.fields.name')}
                </label>
                <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border border-black/10 focus:border-primary-500/70 focus:ring-0" required />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-900">
                  {t('form.fields.email')}
                </label>
                <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border border-black/10 focus:border-primary-500/70 focus:ring-0" required />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-900">
                  {t('form.fields.phone')}
                </label>
                <input type="tel" id="phone" name="phone" className="mt-1 block w-full rounded-md border-black/10 focus:border-primary-500/70 focus:ring-0" />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-900">
                  {t('form.fields.subject')}
                </label>
                <select id="subject" name="subject" className="mt-1 block w-full rounded-md border-black/10 focus:border-primary-500/70 focus:ring-0" required>
                  <option value="">{t('form.subjectOptions.placeholder')}</option>
                  <option value="property-inquiry">{t('form.subjectOptions.propertyInquiry')}</option>
                  <option value="buying">{t('form.subjectOptions.buying')}</option>
                  <option value="selling">{t('form.subjectOptions.selling')}</option>
                  <option value="viewing-trip">{t('form.subjectOptions.viewingTrip')}</option>
                  <option value="general">{t('form.subjectOptions.general')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-900">
                  {t('form.fields.message')}
                </label>
                <textarea id="message" name="message" rows={4} className="mt-1 block w-full rounded-md border border-black/10 focus:border-primary-500/70 focus:ring-0" required></textarea>
              </div>

              <div>
                <button type="submit" className="w-full rounded-md bg-primary-600 px-6 py-3 text-base font-medium text-white hover:bg-primary-900 focus:outline-none focus:ring-0">
                  {t('form.submitButton')}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Map Section */}
        <section className="md:p-8 sm:p-6 p-4 bg-white rounded-xl border border-black/10">
          <h2 className="sm:mb-6 mb-4 font-heading md:text-2xl text-xl font-semibold text-primary-900">
            {t('mapSection.title')}
          </h2>
          <div className="overflow-hidden rounded-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12614.440973994461!2d-4.598844!3d37.559482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDMzJzM0LjEiTiA0wrAzNSc1NS44Ilc!5e0!3m2!1sen!2ses!4v1620000000000!5m2!1sen!2ses"
              width="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="md:h-[450px] sm:h-[400px] h-[300px]"
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
}
