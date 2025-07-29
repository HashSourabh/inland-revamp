import Link from 'next/link';
import { Property } from '@/types/property';
import PropertyGallery from '@/components/properties/PropertyGallery';
import { allProperties } from '@/data/properties';
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
  CheckIcon
} from '@heroicons/react/24/outline';

interface PropertyDetailsProps {
  params: {
    id: string;
  };
}

// Generate static params for all properties
export async function generateStaticParams() {
  // Log the available property IDs for debugging
  console.log('Available property IDs:', allProperties.map(p => p.id));
  
  return allProperties.map((property) => ({
    id: property.id.toLowerCase() // Ensure IDs are lowercase for consistency
  }));
}

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

  return (
    <div className="min-h-screen bg-neutral-50 pb-16 dark:bg-neutral-900">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 border-b border-neutral-200 bg-white px-4 py-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/properties"
              className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Properties
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800">
              <PrinterIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Print Preview</span>
            </button>
            <button className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800">
              <EnvelopeIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Email</span>
            </button>
            <button className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800">
              <ShareIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white sm:text-3xl">
              {property.title} ({property.id})
            </h1>
            <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">
              {property.location.town} / {property.location.province}
            </p>
          </div>
          <div className="flex flex-col items-end">
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
            <div className="mt-2 flex gap-2">
              <button className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
                Reserve For Viewing
              </button>
              <button className="flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700">
                <VideoCameraIcon className="h-4 w-4" />
                Watch Video
              </button>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <PropertyGallery images={property.images} title={property.title} />

        {/* Property Details */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Specs */}
            <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
              <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-white">
                Property Details
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Beds</p>
                  <p className="text-lg font-medium text-neutral-900 dark:text-white">
                    {property.specs.beds}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Baths</p>
                  <p className="text-lg font-medium text-neutral-900 dark:text-white">
                    {property.specs.baths}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Built</p>
                  <p className="text-lg font-medium text-neutral-900 dark:text-white">
                    {property.specs.built} m²
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Plot</p>
                  <p className="text-lg font-medium text-neutral-900 dark:text-white">
                    {property.specs.plot} m²
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
              <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-white">
                Description
              </h2>
              <p className="whitespace-pre-line text-neutral-600 dark:text-neutral-400">
                {property.description}
              </p>
            </div>

            {/* Features */}
            <div className="mt-6 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
              <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-white">
                Features
              </h2>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {property.features?.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckIcon className="h-5 w-5 text-primary-600" />
                    <span className="text-neutral-600 dark:text-neutral-400">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
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

            {/* Map */}
            <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
              <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-white">
                Location
              </h2>
              <div className="aspect-[4/3] w-full rounded-lg bg-neutral-100 dark:bg-neutral-800">
                {/* Add map component here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 