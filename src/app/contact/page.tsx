import React from 'react';
import Image from 'next/image';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ClockIcon,
  GlobeAltIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import Mollina from "@/assets/images/qr_inlandandalucia_mollina.png";
import Alcala  from "@/assets/images/qr_inlandandalucia_jaen.png";
import Martos  from "@/assets/images/qr_inlandandalucia_martos.png";

export default function ContactPage() {
  return (
    <div className="">
      {/* Contact Hero with Background */}
      <section className="py-20 bg-primary-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-6 text-lg text-white/50">
            Get in touch with our team of experts to start your property journey in Inland Andalucia
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-5 my-10">
        
        {/* Contact Information and Form */}
        <section className="mb-8 grid gap-12 rounded-xl bg-white p-8 border border-black/10  md:grid-cols-5">
          {/* Contact Information */}
          <div className="col-span-2">
            <h2 className="font-heading text-2xl font-semibold text-primary-900">
              Get In Touch
            </h2>
            <p className="mt-4 text-neutral-600">
              Our team is here to help you find your dream property in Inland Andalucia. 
              Contact us today for personalized assistance.
            </p>

            <div className="mt-8 space-y-6">
              {/* Office Details */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 items-center justify-center inline-flex rounded-full">
                  <BuildingOfficeIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary-900">Main Office</h3>

                  <p className="mt-1 text-neutral-600 text-sm">
                    Calle Andalucia 12<br />
                    29550 Ardales<br />
                    Málaga, Spain
                  </p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 items-center justify-center inline-flex rounded-full">
                  <EnvelopeIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary-900">Email Us</h3>

                  <div className="mt-1 space-y-1 text-neutral-600 text-sm">
                    <a 
                    href="mailto:info@inlandandalucia.com" 
                    className="mt-1 text-neutral-600 text-sm"
                  >
                    info@inlandandalucia.com
                  </a>
                   
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 items-center justify-center inline-flex rounded-full">
                  <PhoneIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary-900">We Speak</h3>
                  <a 
                    href="tel:+34952741525" 
                    className="mt-1 text-neutral-600 text-sm"
                  >
                    +34 952 741 525
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <p className="mb-4 text-neutral-600">Scan the below QR-code with your mobile to autosave our contact details</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div>
                    <Image
                      src={Mollina}
                      alt="The Inland Andalucia team"
                      width="150"
                      height="150"
                      className="object-cover border border-primary-500/50"
                    /> 
                  </div>
                  <h4 className="text-neutral-600 mt-2">Mollina Office</h4>
                </div>
                <div className="text-center">
                  <div>
                    <Image
                      src={Alcala}
                      alt="The Inland Andalucia team"
                      width="150"
                      height="150"
                      className="object-cover border border-primary-500/50"
                    /> 
                  </div>
                  <h4 className="text-neutral-600 mt-2">Alcala La Real Office</h4>
                </div>
                <div className="text-center">
                  <div>
                    <Image
                      src={Martos}
                      alt="The Inland Andalucia team"
                      width="150"
                      height="150"
                      className="object-cover border border-primary-500/50"
                    /> 
                  </div>
                  <h4 className="text-neutral-600 mt-2">Martos Office</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-span-3 rounded-xl bg-neutral-50 p-6">
            <h2 className="font-heading text-2xl font-semibold text-primary-900">
              Send Us a Message
            </h2>
            <form className="mt-6 space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-900">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full rounded-md border border-black/10 focus:border-primary-500/70 focus:ring-0"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-900">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border border-black/10 focus:border-primary-500/70 focus:ring-0"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-900">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="mt-1 block w-full rounded-md border-black/10 focus:border-primary-500/70 focus:ring-0"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-900">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="mt-1 block w-full rounded-md border-black/10 focus:border-primary-500/70 focus:ring-0"
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
                <label htmlFor="message" className="block text-sm font-medium text-neutral-900">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-black/10 focus:border-primary-500/70 focus:ring-0"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-primary-600 px-6 py-3 text-base font-medium text-white  hover:bg-primary-900 focus:outline-none focus:ring-0"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Map Section */}
        <section className="p-8 bg-white rounded-xl border border-black/10">
          <h2 className="mb-6 font-heading text-2xl font-semibold text-primary-900">
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
    </div>
  );
} 