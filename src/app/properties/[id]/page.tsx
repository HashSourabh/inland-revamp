'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import PropertyGallery from '@/components/properties/PropertyGallery';
import PromoSidebar from '@/components/PromoSidebar';
import Popup from '@/components/shared/Popup';
import {
  ArrowLeftIcon,
  PrinterIcon,
  EnvelopeIcon,
  UserGroupIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';

interface PropertyDetailsProps {
  params: { id: string };
}

interface Property {
  id: string;
  title: string;
  price: { current: number; original?: number };
  location: { town: string; province: string };
  description: string;
  viewed: number;
  features: { bedrooms: number; bathrooms: number; buildSize: number; plotSize: number; type: string };
  images: { url: string; alt: string; isFeatured: boolean }[];
  lat?: number;
  lng?: number;
  videoUrl: string;
}

export default function PropertyDetails({ params }: PropertyDetailsProps) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://inlandandalucia.onrender.com/api/v1";

  const [property, setProperty] = useState<Property | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [isView, setIsView] = useState(false);

  const propertyId = params.id;

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/properties/${propertyId}`);
        const data = await res.json();

        if (data.success && data.data) {
          const db = data.data;

          const addressParts = db.Property_Address?.split(",") || [];
          const location = {
            town: addressParts[0]?.trim() || "Unknown",
            province: addressParts[1]?.trim() || "Andalucia",
          };

          const numPhotos = db.Num_Photos && db.Num_Photos > 0 ? db.Num_Photos : 1;

          // **Optimize images**: featured image first, lazy-load the rest
          const images = Array.from({ length: numPhotos }, (_, i) => ({
            url: `https://www.inlandandalucia.com/images/photos/properties/${db.Property_Ref}/${db.Property_Ref}_${i + 1}.jpg`,
            alt: `${db.Property_Ref} image ${i + 1}`,
            isFeatured: i === 0,
          }));

          setProperty({
            id: db.Property_ID.toString(),
            title: `Property (${db.Property_Ref})`,
            price: { current: db.Public_Price, original: db.Original_Price },
            location,
            description: db.Property_Notes || "",
            viewed: db.Viewed || 0,
            features: {
              bedrooms: db.Bedrooms || 0,
              bathrooms: db.Bathrooms || 0,
              buildSize: db.SQM_Built || 0,
              plotSize: db.SQM_Plot || 0,
              type: "Property",
            },
            images,
            lat: db.GPS_Latitude,
            lng: db.GPS_Longitude,
            videoUrl: db.Video_URL || null,
          });
        } else {
          setProperty(null);
        }
      } catch (err) {
        console.error("Error fetching property:", err);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  const PageOverlayDetailsLoader = () => (
    <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p className="text-neutral-600 font-medium">Loading property details...</p>
      </div>
    </div>
  );

  if (loading) return <PageOverlayDetailsLoader />;

  if (!property)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-600">Property not found</p>
      </div>
    );
  function getEmbedUrl(url: string) {
    if (url.includes("youtube.com/watch")) {
      return url.replace("watch?v=", "embed/");
    }
    if (url.includes("youtu.be")) {
      const id = url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(price);

  return (
    <div className="min-h-screen bg-neutral-50 pb-16 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 pt-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/properties" className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
            <ArrowLeftIcon className="h-4 w-4" /> Back
          </Link>
        </div>

        {/* Property Info */}
        <div className="mb-8 flex flex-col gap-4 sm:justify-between">
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl font-bold">{property.title}</h1>
              <p className="mt-2 text-lg text-neutral-600">{property.location.town} / {property.location.province}</p>
            </div>
            <div className="flex items-center gap-2">
              {property.price.original && <span className="line-through text-neutral-500">{formatPrice(property.price.original)}</span>}
              <span className="text-2xl font-bold text-primary-600">{formatPrice(property.price.current)}</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button className="rounded-md bg-primary-600 px-4 py-2 text-sm text-white" onClick={() => setIsView(true)}>Reserve For Viewing</button>
            {property.videoUrl && (
              <button
                className="inline-flex items-center gap-2 rounded-md bg-yellow-400 px-4 py-2 text-sm text-neutral-900"
                onClick={() => setIsVideoOpen(true)}
              >
                <PlayIcon className="h-4 w-4" /> Watch Video
              </button>
            )}
            <Link
              href={`/properties/${property.id}/print`}
              className="inline-flex items-center gap-2 rounded-md border bg-white px-4 py-2 text-sm text-neutral-700"
            >
              <PrinterIcon className="h-4 w-4" /> Print Preview
            </Link>
            <button
              onClick={() => window.location.href = 'mailto:someone@example.com'}
              className="inline-flex items-center gap-2 rounded-md border bg-white px-4 py-2 text-sm text-neutral-700"
            >
              <EnvelopeIcon className="h-4 w-4" /> E-mail
            </button>

            <Link
              href={`/contact`}
              className="inline-flex items-center gap-2 rounded-md border bg-white px-4 py-2 text-sm text-neutral-700"
            >
              <UserGroupIcon className="h-4 w-4" /> Contact us
            </Link>

          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PropertyGallery
              images={property.images}
              title={property.title}
              description={property.description}
              location={`${property.location.town}/${property.location.province}`}
              beds={property.features.bedrooms}
              baths={property.features.bathrooms}
              built={property.features.buildSize}
              plot={property.features.plotSize}
              views={property.viewed}
              features={["Some feature", "Another feature"]}
              lat={property.lat}
              lng={property.lng}
            />
          </div>

          <div className="space-y-6">
            <PromoSidebar />
          </div>
        </div>
      </div>

      {/* Reserve Popup */}
      <Popup isOpen={isView} onClose={() => setIsView(false)} title="Reserve For Viewing" description="On receipt, we will reserve this property for you to view within 2 weeks.">
        <div className="space-y-4">
          <p>Please enter your email to reserve this property for viewing.</p>
          <input type="email" placeholder="Your email" className="w-full border rounded px-3 py-2" />
          <button className="w-full bg-primary-600 text-white px-4 py-2 rounded">Reserve</button>
        </div>
      </Popup>
      {/* Video Popup */}
      <Popup
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        title=""
        description=""
      >
        {property.videoUrl ? (
          <div className="w-full h-[400px] max-w-5xl mx-auto">
            <iframe
              src={`https://www.youtube.com/embed/${property.videoUrl}?rel=0&wmode=transparent&autoplay=0&iv_load_policy=3`}
              title="Property Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded"
            />
          </div>

        ) : (
          <p>No video available for this property.</p>
        )}
      </Popup>

    </div>
  );
}
