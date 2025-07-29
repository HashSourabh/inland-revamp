import React from 'react';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ClockIcon,
  GlobeAltIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Contact Hero with Background */}
      <section className="relative flex min-h-[40vh] items-center justify-center pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary-900 to-primary-800"></div>
        <div className="relative z-10 text-center">
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90">
            Get in touch with our team of experts to start your property journey in Inland Andalucia
          </p>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="mt-0 mb-16">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Phone */}
          <div className="rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
              <PhoneIcon className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-neutral-900">Call Us</h3>
            <p className="text-neutral-600">Available Mon-Sat</p>
            <a 
              href="tel:+34952741525" 
              className="mt-4 block text-lg font-semibold text-primary-600 hover:text-primary-700"
            >
              +34 952 741 525
            </a>
          </div>

          {/* Email */}
          <div className="rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
              <EnvelopeIcon className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-neutral-900">Email Us</h3>
            <p className="text-neutral-600">We'll respond within 24h</p>
            <a 
              href="mailto:info@inlandandalucia.com" 
              className="mt-4 block text-lg font-semibold text-primary-600 hover:text-primary-700"
            >
              info@inlandandalucia.com
            </a>
          </div>

          {/* Visit Us */}
          <div className="rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
              <MapPinIcon className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-neutral-900">Visit Us</h3>
            <p className="text-neutral-600">Our Main Office</p>
            <address className="mt-4 not-italic text-lg font-semibold text-primary-600">
              Calle Andalucia 12,<br />
              29550 Ardales
            </address>
          </div>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="mb-16 grid gap-12 rounded-2xl bg-white p-8 shadow-lg md:grid-cols-2">
        {/* Contact Information */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-neutral-900 md:text-3xl">
            Get In Touch
          </h2>
          <p className="mt-4 text-neutral-700">
            Our team is here to help you find your dream property in Inland Andalucia. 
            Contact us today for personalized assistance.
          </p>

          <div className="mt-8 space-y-6">
            {/* Office Details */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <BuildingOfficeIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-900">Main Office</h3>
                <p className="mt-1 text-neutral-700">
                  Calle Andalucia 12<br />
                  29550 Ardales<br />
                  Málaga, Spain
                </p>
              </div>
            </div>

            {/* Office Hours */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <ClockIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-900">Office Hours</h3>
                <div className="mt-1 space-y-1 text-neutral-700">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <GlobeAltIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-900">We Speak</h3>
                <p className="mt-1 text-neutral-700">
                  English, Spanish, French, German
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-xl bg-neutral-50 p-6">
          <h2 className="font-heading text-2xl font-bold text-neutral-900">
            Send Us a Message
          </h2>
          <form className="mt-6 space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-neutral-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-neutral-700">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              >
                <option value="">Please select</option>
                <option value="property-inquiry">Property Inquiry</option>
                <option value="buying">Buying Information</option>
                <option value="selling">Selling Information</option>
                <option value="viewing-trip">Viewing Trip</option>
                <option value="general">General Inquiry</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-700">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full rounded-md bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Map Section */}
      <section className="mb-16">
        <h2 className="mb-6 font-heading text-2xl font-bold text-neutral-900 md:text-3xl">
          Find Us
        </h2>
        <div className="overflow-hidden rounded-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12614.440973994461!2d-4.598844!3d37.559482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDMzJzM0LjEiTiA0wrAzNSc1NS44Ilc!5e0!3m2!1sen!2ses!4v1620000000000!5m2!1sen!2ses"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
} 