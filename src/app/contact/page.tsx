import React from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Contact Hero */}
      <section className="py-16 md:py-24">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold text-neutral-900 md:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-neutral-700">
            Get in touch with our team of experts to start your property journey in Inland Andalucia
          </p>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-8 md:py-16">
        <div className="grid gap-12 md:grid-cols-2">
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
              {/* Phone */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <PhoneIcon className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-neutral-900">Phone</p>
                  <p className="mt-1 text-neutral-700">+34 952 741 525</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <EnvelopeIcon className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-neutral-900">Email</p>
                  <p className="mt-1 text-neutral-700">info@inlandandalucia.com</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <MapPinIcon className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-neutral-900">Office Address</p>
                  <p className="mt-1 text-neutral-700">
                    Calle Andalucia 12<br />
                    29550 Ardales<br />
                    Málaga, Spain
                  </p>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="mt-12">
              <h3 className="font-heading text-xl font-bold text-neutral-900">
                Office Hours
              </h3>
              <div className="mt-4 space-y-2 text-neutral-700">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-lg bg-white p-8 shadow-sm">
            <h2 className="font-heading text-2xl font-bold text-neutral-900">
              Send Us a Message
            </h2>
            <form className="mt-6 space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
                  Full Name
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
                  Email
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
                  Phone Number (optional)
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
                  Subject
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
                  Message
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
                  className="w-full rounded-md bg-primary-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <h2 className="font-heading text-2xl font-bold text-neutral-900 md:text-3xl">
          Find Us
        </h2>
        <div className="mt-6 rounded-lg bg-neutral-200 pb-[56.25%] relative h-0">
          {/* This would be replaced with an actual Google Maps embed */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-neutral-600">Map will be displayed here</p>
          </div>
        </div>
      </section>
    </div>
  );
} 