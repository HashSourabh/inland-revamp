"use client"
import Link from 'next/link';
import { useState } from 'react';
import { Property } from '@/types/property';
import PropertyGallery from '@/components/properties/PropertyGallery';
import { allProperties } from '@/data/properties';
import PromoSidebar from '@/components/PromoSidebar';
import Popup from '@/components/shared/Popup';
import { 
  ArrowLeftIcon, 
  PrinterIcon, 
  EnvelopeIcon, 
  PhoneIcon,
  VideoCameraIcon,
  CalendarIcon,
  MapPinIcon,
  HomeIcon,
  EyeIcon,
  ShareIcon,
  CheckIcon,
  ChevronLeftIcon, 
  ChevronRightIcon,
  UserGroupIcon,
  PlayIcon,
  StarIcon,
  HomeModernIcon,
  BeakerIcon,
  MapIcon,
  BuildingOfficeIcon,
  TagIcon
} from '@heroicons/react/24/outline';

interface PropertyDetailsProps {
  params: {
    id: string;
  };
}

// // Generate static params for all properties
// export async function generateStaticParams() {
//   // Log the available property IDs for debugging
//   console.log('Available property IDs:', allProperties.map(p => p.id));
  
//   return allProperties.map((property) => ({
//     id: property.id.toLowerCase() // Ensure IDs are lowercase for consistency
//   }));
// }

// Log the requested ID for debugging
export default function PropertyDetails({ params }: PropertyDetailsProps) {
  console.log('Requested property ID:', params.id);
  
  // Try to find the property by ID, being case-insensitive
  const property = allProperties.find(p => 
    p.id.toLowerCase() === params.id.toLowerCase()
  );

  if (!property) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-neutral-600">Property not found</p>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
  };
  const [isView, setIsView] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 pb-16 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 pt-8">
        {/* Header */}
          <div className="mb-6">
            <Link 
              href="/properties"
              className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back
            </Link>
          </div> 
            <div className="mb-8 flex flex-col gap-4 sm:justify-between">
              <div className="flex justify-between">
              <div>
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-white sm:text-3xl">
                  {property.title} ({property.id})
                </h1>
                <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">
                  {property.location.town} / {property.location.province}
                </p>
              </div>
                <div className="flex items-center gap-2">
                  {property.price.original && (
                    <span className="text-lg line-through text-neutral-500 dark:text-neutral-400">
                      {formatPrice(property.price.original)}
                    </span>
                  )}
                  <span className="text-2xl font-bold text-primary-600 sm:text-3xl">
                    {formatPrice(property.price.current)}
                  </span>
                </div>
                
              </div>
              <div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700" onClick={()=>{setIsView(true)}}>
                    Reserve For Viewing
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-md bg-yellow-400 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-yellow-500">
                    <PlayIcon className="h-4 w-4" />
                    Watch Video
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700">
                    <PrinterIcon className="h-4 w-4" />
                    Print Preview
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700">
                    <EnvelopeIcon className="h-4 w-4" />
                    E-mail
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700">
                    <UserGroupIcon className="h-4 w-4" />
                    Contact us
                  </button>
                  
                </div>
              </div>
            </div>
        {/* Property Details */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">

            {/* Gallery */}
            <PropertyGallery images={property.images} title={property.title} description={property.description} features={property.features} location={`${property.location.town}/${property.location.province}`}/>
        </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Form */}
            <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
              <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-white">
                Contact Us About This Property
              </h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500"
                    placeholder="I'm interested in this property..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
                >
                  Send Message
                </button>
              </form>
            </div>

            <PromoSidebar />
          </div>
        </div>
      </div>
      {/* Popup for reserveation for view*/}
      <Popup isOpen={isView} onClose={()=>{setIsView(false)}} title="Reserve For Viewing" description="On receipt, we will reserve this property for you to view within 2 weeks. Any price negotiation will be determined after.">
        <div className="">
            <div className="mb-3">
              <label htmlFor="" className="text-gray-600">Email Address <span>*</span></label>
              <input type="email" className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500" />
            </div>
            <div className="text-red-500 text-sm hidden">
              <p className="mb-2">This Email address is not registered in our system, please enter the Email address used when communicating with your InlandAndalucia Property Specialist.</p>
              <p>If you have not been in contact with us before <a href="" className="text-primary-600 underline">click here</a> so we can register you. After you receive a confirmation message (Check your Email spam) you can reserve for viewing this property. Thanks</p>
            </div>
            <div className="text-center px-5 py-2.5 bg-primary-500/10 rounded-lg border border-primary-500/50 mt-4">I would like to reserve <strong>TH6194</strong> for next two weeks...</div>
        </div> 
        <div className="grid grid-cols-2 gap-5 mt-6">
          <button className="px-5 text-gray-600 bg-white border border-gray-300 min-h-[42px] rounded-md">Cancel</button>
          <button className="px-5 text-white bg-primary-600  border border-primary-600 min-h-[42px] rounded-md">Reserve</button>
        </div>
      </Popup>
    </div>
  );
} 