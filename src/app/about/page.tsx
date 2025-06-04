import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* About Hero */}
      <section className="py-16 md:py-24">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold text-neutral-900 md:text-5xl">
            About Inland Andalucia
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-neutral-700">
            Your trusted partner for finding authentic Spanish properties in the heart of Andalucia
          </p>
        </div>
        
        <div className="mt-16 grid gap-12 md:grid-cols-2 md:items-center">
          <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
            <div className="h-full w-full bg-neutral-200"></div>
            {/* Placeholder for an actual image */}
            {/* <Image
              src="/images/about-team.jpg"
              alt="The Inland Andalucia team"
              fill
              className="object-cover"
            /> */}
          </div>
          <div>
            <h2 className="font-heading text-3xl font-bold text-neutral-900">
              Our Story
            </h2>
            <div className="mt-6 space-y-4 text-neutral-700">
              <p>
                Founded in 2001, Inland Andalucia has been helping clients from around the world find their dream properties in the beautiful Spanish countryside for over two decades.
              </p>
              <p>
                Our team of experienced professionals combines local knowledge with international expertise to provide a personalized and comprehensive real estate service.
              </p>
              <p>
                We specialize in authentic Spanish properties, from traditional cortijos and fincas to modern villas and townhouses, all located in the picturesque inland towns and villages of Andalucia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-neutral-50">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-neutral-900">
            Our Values
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-600">
            What makes Inland Andalucia different
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Value 1 */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="font-heading text-xl font-bold text-neutral-900">Integrity</h3>
            <p className="mt-4 text-neutral-700">
              We prioritize honesty and transparency in every interaction, ensuring you have all the information needed to make informed decisions.
            </p>
          </div>
          
          {/* Value 2 */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="font-heading text-xl font-bold text-neutral-900">Local Expertise</h3>
            <p className="mt-4 text-neutral-700">
              Our deep understanding of the inland Andalucia region allows us to provide valuable insights and find the perfect location for your needs.
            </p>
          </div>
          
          {/* Value 3 */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="font-heading text-xl font-bold text-neutral-900">Personalized Service</h3>
            <p className="mt-4 text-neutral-700">
              We recognize that every client is unique, which is why we tailor our approach to meet your specific requirements and preferences.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-neutral-900">
            Meet Our Team
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-600">
            The dedicated professionals who make Inland Andalucia special
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Team Member 1 */}
          <div className="text-center">
            <div className="mx-auto h-40 w-40 overflow-hidden rounded-full bg-neutral-200">
              {/* Placeholder for an actual image */}
              {/* <Image
                src="/images/team-1.jpg"
                alt="Graham Goode"
                width={160}
                height={160}
                className="h-full w-full object-cover"
              /> */}
            </div>
            <h3 className="mt-4 text-xl font-bold text-neutral-900">Graham Goode</h3>
            <p className="text-neutral-600">Managing Director</p>
          </div>
          
          {/* Team Member 2 */}
          <div className="text-center">
            <div className="mx-auto h-40 w-40 overflow-hidden rounded-full bg-neutral-200">
              {/* Placeholder for an actual image */}
              {/* <Image
                src="/images/team-2.jpg"
                alt="Maria Rodriguez"
                width={160}
                height={160}
                className="h-full w-full object-cover"
              /> */}
            </div>
            <h3 className="mt-4 text-xl font-bold text-neutral-900">Maria Rodriguez</h3>
            <p className="text-neutral-600">Sales Manager</p>
          </div>
          
          {/* Team Member 3 */}
          <div className="text-center">
            <div className="mx-auto h-40 w-40 overflow-hidden rounded-full bg-neutral-200">
              {/* Placeholder for an actual image */}
              {/* <Image
                src="/images/team-3.jpg"
                alt="John Smith"
                width={160}
                height={160}
                className="h-full w-full object-cover"
              /> */}
            </div>
            <h3 className="mt-4 text-xl font-bold text-neutral-900">John Smith</h3>
            <p className="text-neutral-600">Property Consultant</p>
          </div>
          
          {/* Team Member 4 */}
          <div className="text-center">
            <div className="mx-auto h-40 w-40 overflow-hidden rounded-full bg-neutral-200">
              {/* Placeholder for an actual image */}
              {/* <Image
                src="/images/team-4.jpg"
                alt="Sofia Martinez"
                width={160}
                height={160}
                className="h-full w-full object-cover"
              /> */}
            </div>
            <h3 className="mt-4 text-xl font-bold text-neutral-900">Sofia Martinez</h3>
            <p className="text-neutral-600">Client Relations</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-800 py-16 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            Ready to Work With Us?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl">
            Whether you're looking to buy or sell a property in Inland Andalucia, our team is here to help.
          </p>
          <div className="mt-8">
            <Link 
              href="/contact" 
              className="inline-block rounded-md bg-white px-6 py-3 font-medium text-primary-800 hover:bg-neutral-100"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 