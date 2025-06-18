import Image from "next/image";
import Link from 'next/link';
import PropertyGrid from '@/components/properties/PropertyGrid';
import { MagnifyingGlassIcon, MapPinIcon, BuildingOfficeIcon, HomeIcon, ArrowRightIcon, StarIcon, XMarkIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import TestimonialsCarousel from '@/components/testimonials/TestimonialsCarousel';
import AdvancedSearch from '@/components/search/AdvancedSearch';

// Mock property data - In a real implementation this would come from an API
const featuredProperties = [
  {
    id: 1,
    reference: "000PR1",
    title: "Luxury Villa in Granada",
    shortDescription: "Stunning 4-bedroom villa with panoramic views and private pool",
    price: 495000,
    images: [
      {
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80",
        alt: "Luxury villa in Granada"
      }
    ],
    features: {
      bedrooms: 4,
      bathrooms: 3,
      buildSize: 280,
      plotSize: 1200
    }
  },
  {
    id: 2,
    reference: "000PR2",
    title: "Modern Apartment in Malaga",
    shortDescription: "Contemporary 2-bedroom apartment in the heart of Malaga",
    price: 275000,
    images: [
      {
        url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80",
        alt: "Modern apartment in Malaga"
      }
    ],
    features: {
      bedrooms: 2,
      bathrooms: 2,
      buildSize: 120,
      plotSize: 0
    }
  },
  {
    id: 3,
    reference: "000PR3",
    title: "Traditional Cortijo in Cordoba",
    shortDescription: "Beautifully restored 3-bedroom cortijo with olive grove",
    price: 349000,
    images: [
      {
        url: "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&q=80",
        alt: "Traditional cortijo in Cordoba"
      }
    ],
    features: {
      bedrooms: 3,
      bathrooms: 2,
      buildSize: 180,
      plotSize: 5000
    }
  }
];

const exclusiveProperties = [
  {
    id: 4,
    reference: "000PR4",
    title: "Luxury Villa with Sea Views",
    shortDescription: "Exclusive 5-bedroom villa with stunning sea views and private pool",
    price: 895000,
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
        alt: "Luxury villa with sea views"
      }
    ],
    features: {
      bedrooms: 5,
      bathrooms: 4,
      buildSize: 350,
      plotSize: 1500
    }
  },
  {
    id: 5,
    reference: "000PR5",
    title: "Historic Palace in Granada",
    shortDescription: "Magnificent 6-bedroom palace with original features and gardens",
    price: 1250000,
    images: [
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
        alt: "Historic palace in Granada"
      }
    ],
    features: {
      bedrooms: 6,
      bathrooms: 5,
      buildSize: 450,
      plotSize: 2000
    }
  },
  {
    id: 6,
    reference: "000PR6",
    title: "Modern Villa with Smart Home",
    shortDescription: "State-of-the-art 4-bedroom villa with smart home technology",
    price: 750000,
    images: [
      {
        url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80",
        alt: "Modern villa with smart home"
      }
    ],
    features: {
      bedrooms: 4,
      bathrooms: 3,
      buildSize: 300,
      plotSize: 1000
    }
  }
];

// Featured property for hero section
const heroProperty = {
  id: "prop-23450",
  reference: "IAD-23450",
  title: "Authentic 2 Bedroom Townhouse in Historic Center of Estepa",
  shortDescription: "Traditional 2-bedroom townhouse in Estepa's historic center. Features include interior patio, original architectural elements, and modern updates. Perfect authentic Spanish home in a charming white village.",
  price: 128000,
  currency: "EUR",
  location: {
    province: "Sevilla",
    town: "Estepa",
  },
  features: {
    type: "Townhouse",
    bedrooms: 2,
    bathrooms: 1,
    buildSize: 85,
  },
  images: [
    {
      url: "/images/properties/23450/main.jpg",
      alt: "Traditional townhouse facade in Estepa",
      isFeatured: true
    }
  ]
};

// Main provinces data
const provinces = [
  { id: "malaga", name: "Malaga", propertyCount: 96, imageUrl: "/images/provinces/malaga.jpg" },
  { id: "cordoba", name: "Cordoba", propertyCount: 75, imageUrl: "/images/provinces/cordoba.jpg" },
  { id: "granada", name: "Granada", propertyCount: 81, imageUrl: "/images/provinces/granada.jpg" },
  { id: "jaen", name: "Jaen", propertyCount: 93, imageUrl: "/images/provinces/jaen.jpg" },
  { id: "sevilla", name: "Sevilla", propertyCount: 102, imageUrl: "/images/provinces/sevilla.jpg" }
];

export default function Home() {
  return (
    <div>
      {/* Quick Search Section - Floating on top */}
      {/* <div className="fixed top-[120px] right-8 z-40 w-80">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-neutral-200/50">
          <h3 className="text-xl font-semibold text-neutral-900 mb-4">Quick Search</h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Property Reference (e.g. IAD-12345)"
              className="w-full rounded-lg border-neutral-300 pl-10 pr-4 py-3 focus:border-primary-500 focus:ring-primary-500 bg-white shadow-sm"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
          </div>
          <button className="mt-3 w-full bg-primary-600 text-white rounded-lg py-3 font-medium hover:bg-primary-700 transition-colors shadow-sm">
            Search
          </button>
        </div>
      </div> */}

      {/* Hero Section with full-width background image */}
      <section className="relative min-h-[90vh] pt-[88px]">
        <div className="absolute inset-0 z-0">
        <Image
            src="/images/hero_bg.jpg"
            alt="Andalucian countryside landscape"
            fill
            className="object-cover brightness-75"
          priority
        />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--color-primary))] filter brightness-50 to-transparent z-10"></div>

        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <div className="max-w-2xl">
            <h1 className="font-heading text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Find Your Dream Home in Inland Andalucia
            </h1>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/properties"
                className="rounded-md bg-secondary-500 px-8 py-4 font-medium text-white shadow-md hover:bg-secondary-600 transition-colors"
              >
                View Properties
              </Link>
              <Link
                href="/contact"
                className="rounded-md border-2 border-white bg-transparent px-8 py-4 font-medium text-white shadow-md hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Property Search Section - Updated background and styling */}
      <section className="py-16 bg-gradient-to-b from-white to-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-xl p-8 -mt-32 relative z-30 border border-neutral-100">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Find Your Perfect Property</h2>
            <AdvancedSearch />
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold text-neutral-900 md:text-5xl">
              Featured Properties
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Discover our handpicked selection of exceptional properties
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.map((property) => (
              <Link
                key={property.id}
                href={`/properties/${property.reference.toLowerCase()}`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                  <div className="relative h-64">
                    <Image
                      src={property.images[0].url}
                      alt={property.images[0].alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                      {property.title}
                    </h3>
                    <p className="mt-2 text-neutral-600 line-clamp-2">
                      {property.shortDescription}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary-600">
                        €{property.price.toLocaleString()}
                      </span>
                      <div className="flex items-center gap-4 text-sm text-neutral-600">
                        <span>{property.features.bedrooms} beds</span>
                        <span>{property.features.bathrooms} baths</span>
                        <span>{property.features.buildSize}m²</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Properties Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold text-neutral-900 md:text-5xl">
              Exclusive Properties
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Our most prestigious and unique property listings
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {exclusiveProperties.map((property) => (
              <Link
                key={property.id}
                href={`/properties/${property.reference.toLowerCase()}`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                  <div className="relative h-64">
                    <Image
                      src={property.images[0].url}
                      alt={property.images[0].alt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-600 text-white">
                        Exclusive
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                      {property.title}
                    </h3>
                    <p className="mt-2 text-neutral-600 line-clamp-2">
                      {property.shortDescription}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary-600">
                        €{property.price.toLocaleString()}
                      </span>
                      <div className="flex items-center gap-4 text-sm text-neutral-600">
                        <span>{property.features.bedrooms} beds</span>
                        <span>{property.features.bathrooms} baths</span>
                        <span>{property.features.buildSize}m²</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sell Your House Section */}
      {/* <section className="py-16 bg-primary-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">
                Looking to Sell Your Property?
              </h2>
              <p className="mt-6 text-lg text-white/90">
                With over 20 years of experience in the Inland Andalucia real estate market,
                we offer professional valuation and marketing services to help you sell your property.
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <StarIcon className="h-5 w-5 text-secondary-400 mr-3" />
                  <span>Professional property valuation</span>
                </li>
                <li className="flex items-center">
                  <StarIcon className="h-5 w-5 text-secondary-400 mr-3" />
                  <span>International marketing exposure</span>
          </li>
                <li className="flex items-center">
                  <StarIcon className="h-5 w-5 text-secondary-400 mr-3" />
                  <span>Dedicated sales team</span>
          </li>
              </ul>
              <div className="mt-8">
                <Link
                  href="/sell-your-property"
                  className="inline-block bg-white text-primary-900 px-8 py-4 rounded-md font-semibold hover:bg-neutral-100 transition-colors"
                >
                  List Your Property
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80"
                alt="Sell your property"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* Franchise Opportunities Section */}
      {/* <section className="py-16 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
            <Image
                src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80"
                alt="Franchise opportunities"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="font-heading text-3xl font-bold text-neutral-900 md:text-4xl">
                Franchise Opportunities
              </h2>
              <p className="mt-6 text-lg text-neutral-700">
                Join the leading real estate network in Inland Andalucia. We offer exclusive
                territories and comprehensive support to help you build a successful business.
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <StarIcon className="h-5 w-5 text-primary-600 mr-3" />
                  <span>Exclusive territory rights</span>
                </li>
                <li className="flex items-center">
                  <StarIcon className="h-5 w-5 text-primary-600 mr-3" />
                  <span>Comprehensive training and support</span>
                </li>
                <li className="flex items-center">
                  <StarIcon className="h-5 w-5 text-primary-600 mr-3" />
                  <span>Proven business model</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link
                  href="/franchise"
                  className="inline-block bg-primary-600 text-white px-8 py-4 rounded-md font-semibold hover:bg-primary-700 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Trust Section - "You're in Safe Hands" */}
      {/* <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-neutral-900 md:text-4xl">
              You're in Safe Hands
            </h2>
            <p className="mt-4 text-neutral-600">
              Trusted by hundreds of buyers and sellers in Inland Andalucia
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center p-6">
              <div className="inline-block p-4 bg-primary-50 rounded-full mb-4">
                <StarIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">20+ Years Experience</h3>
              <p className="text-neutral-600">
                Decades of experience in the Inland Andalucia property market
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-block p-4 bg-primary-50 rounded-full mb-4">
                <StarIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">1000+ Properties Sold</h3>
              <p className="text-neutral-600">
                Successfully helping buyers find their dream homes
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-block p-4 bg-primary-50 rounded-full mb-4">
                <StarIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">5-Star Service</h3>
              <p className="text-neutral-600">
                Consistently rated 5 stars by our satisfied clients
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/testimonials"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              Read Client Testimonials <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section> */}

      {/* Provinces Section with large cards */}
      {/* <section className="py-16 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-neutral-900 text-center md:text-4xl mb-4">
            Explore Inland Andalucia
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-600 text-center mb-12">
            Discover the unique charm of each province in southern Spain's inland region
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            <Link href="/provinces/cordoba" className="group relative overflow-hidden rounded-xl shadow-md h-80 transition-transform hover:-translate-y-1">
              <Image
                src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80"
                alt="Cordoba Province"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white">Cordoba</h3>
              </div>
            </Link>

            <Link href="/provinces/granada" className="group relative overflow-hidden rounded-xl shadow-md h-80 transition-transform hover:-translate-y-1">
              <Image
                src="https://images.unsplash.com/photo-1534423839368-1796a4dd1845?auto=format&fit=crop&q=80"
                alt="Granada Province"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white">Granada</h3>
              </div>
            </Link>

            <Link href="/provinces/jaen" className="group relative overflow-hidden rounded-xl shadow-md h-80 transition-transform hover:-translate-y-1">
              <Image
                src="https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&q=80"
                alt="Jaen Province"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white">Jaen</h3>
              </div>
            </Link>

            <Link href="/provinces/malaga" className="group relative overflow-hidden rounded-xl shadow-md h-80 transition-transform hover:-translate-y-1">
              <Image
                src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80"
                alt="Malaga Province"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white">Malaga</h3>
              </div>
            </Link>

            <Link href="/provinces/sevilla" className="group relative overflow-hidden rounded-xl shadow-md h-80 transition-transform hover:-translate-y-1">
          <Image
                src="https://images.unsplash.com/photo-1558370781-d6196949e317?auto=format&fit=crop&q=80"
                alt="Sevilla Province"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white">Sevilla</h3>
              </div>
            </Link>
          </div>
        </div>
      </section> */}

      {/* Lifestyle Section */}
      {/* <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-sm font-semibold text-primary-600 uppercase tracking-wider mb-2">Experience Andalucia</span>
              <h2 className="font-heading text-3xl font-bold text-neutral-900 md:text-4xl">
                Embrace the Authentic Spanish Lifestyle
              </h2>
              <p className="mt-6 text-lg text-neutral-700">
                Owning a property in inland Andalucia is more than just having a home - it's about embracing a relaxed way of life surrounded by breathtaking landscapes, rich culture, and warm local communities.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-100 rounded-full p-1">
                    <svg className="h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-neutral-700">300+ days of sunshine per year</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-100 rounded-full p-1">
                    <svg className="h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-neutral-700">Rich local gastronomy and wine culture</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-100 rounded-full p-1">
                    <svg className="h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-neutral-700">Vibrant local festivals and traditions</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-100 rounded-full p-1">
                    <svg className="h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-neutral-700">Excellent healthcare and infrastructure</p>
                </div>
              </div>
              <div className="mt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center font-medium text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Learn more about life in Andalucia <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&q=80"
                  alt="Andalucian countryside lifestyle"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-2/3 overflow-hidden rounded-xl shadow-xl border-4 border-white">
                <div className="relative aspect-video">
          <Image
                    src="https://images.unsplash.com/photo-1559598467-f8b76c8155d0?auto=format&fit=crop&q=80"
                    alt="Spanish village life"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Testimonials Section */}
      {/* <section className="py-16 bg-primary-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl font-bold text-neutral-900 md:text-4xl">
              What Our Clients Say
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-neutral-600">
              Hear from homeowners who found their perfect Spanish property with Inland Andalucia
            </p>
          </div>

          <TestimonialsCarousel />
        </div>
      </section> */}

      {/* CTA Section with background image */}
      <section className="relative py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1512753360435-329c4535a9a7?auto=format&fit=crop&q=80"
            alt="Andalucian landscape"
            fill
            className="object-cover brightness-50"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
            Ready to Find Your Spanish Paradise?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            Contact our team of local experts today to start your property journey in Inland Andalucia.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-block rounded-md bg-white px-8 py-4 font-medium text-primary-800 shadow-md hover:bg-neutral-100 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
