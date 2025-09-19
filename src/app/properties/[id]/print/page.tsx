'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowLeftIcon, PrinterIcon } from '@heroicons/react/24/outline';

interface Feature {
  id: number;
  text: string;
}


interface Property {
  id: string;
  ref: string;
  type: string;
  price: { current: number; original?: number };
  location: { town: string; province: string };
  bedrooms: number;
  bathrooms: number;
  buildSize: number;
  plotSize: number;
  views: string;
  description: { [lang: string]: string };
  property_features: { [language: string]: Feature[] };
  images: { url: string; alt: string; isFeatured: boolean }[];
}

interface PrintPageProps {
  params: { id: string };
}

const LANGUAGE_FLAGS: { [key: string]: string } = {
  EN: '🇬🇧',
  ES: '🇪🇸',
};

const API_LANGUAGE_MAP: { [key: string]: string } = {
  language_1: 'EN',
  language_2: 'ES',
};

export default function PrintPage({ params }: PrintPageProps) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://inlandandalucia.onrender.com/api/v1";
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  const propertyId = params.id;

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/properties/${propertyId}`);
        const data = await res.json();
        if (data.success && data.data) {
          const db = data.data;

          const locationParts = db.Property_Address?.split(",") || [];
          const location = {
            town: locationParts[0]?.trim() || 'Unknown',
            province: locationParts[1]?.trim() || 'Andalucia',
          };

          const numPhotos = db.Num_Photos && db.Num_Photos > 0 ? db.Num_Photos : 1;
          const images = Array.from({ length: Math.min(numPhotos, 3) }, (_, i) => ({
            url: `https://www.inlandandalucia.com/images/photos/properties/${db.Property_Ref}/${db.Property_Ref}_${i + 1}.jpg`,
            alt: `${db.Property_Ref} image ${i + 1}`,
            isFeatured: i === 0,
          }));

          setProperty({
            id: db.Property_ID.toString(),
            ref: db.Property_Ref || '',
            type: db.Property_Type || 'Property',
            price: { current: db.Public_Price, original: db.Original_Price },
            location,
            bedrooms: db.Bedrooms || 0,
            bathrooms: db.Bathrooms || 0,
            buildSize: db.SQM_Built || 0,
            plotSize: db.SQM_Plot || 0,
            views: db.Viewed || 'Village',
            description: db.Property_Notes ? { ES: db.Property_Notes, EN: db.Property_Notes } : {},
            property_features: db.features || {},
            images,
          });
        } else {
          setProperty(null);
        }
      } catch (err) {
        console.error(err);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [propertyId]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(price);

  if (loading) return <p className="p-8 text-center">Loading property for print...</p>;
  if (!property) return <p className="p-8 text-center">Property not found</p>;

  return (
    <div className="min-h-screen bg-white text-black p-8 print:p-0">
      {/* Buttons (hidden in print) */}
      <div className="flex gap-4 mb-8 print:hidden">
        <Link href={`/properties/${property.id}`} className="inline-flex items-center gap-2 rounded-md border bg-gray-200 px-4 py-2 text-sm">
          <ArrowLeftIcon className="h-4 w-4" /> Back
        </Link>
        <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-md border bg-gray-200 px-4 py-2 text-sm">
          <PrinterIcon className="h-4 w-4" /> Print
        </button>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">{property.ref} - {property.type}</h1>
      <p className="mb-1">Price / Precio: {formatPrice(property.price.current)}</p>
      <p className="mb-4">Location / Localidad: {property.location.town} - {property.location.province}</p>

      {/* Images */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
        {property.images.map((img, idx) => (
          <img
            key={idx}
            src={img.url}
            alt={img.alt}
            className={`w-full h-48 object-cover rounded ${idx === 0 ? 'sm:col-span-2 sm:h-64' : 'sm:h-64'}`}
          />
        ))}
      </div>

      {/* Property Specs */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>Beds: {property.bedrooms}</div>
        <div>Built : {property.buildSize} m²</div>
        <div>Baths : {property.bathrooms}</div>
        <div>Plot : {property.plotSize} m²</div>
        <div>Views : {property.views}</div>
        <div>Location : {property.location.town}</div>
      </div>

      {property.description.EN && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Description </h2>
          <p>{property.description.EN}</p>
        </div>
      )}

      {/* Features */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Features / Características:</h2>
        {Object.entries(property.property_features).length > 0 ? (
          Object.entries(property.property_features).map(([lang, feats]) => {
            const flagKey = API_LANGUAGE_MAP[lang] || lang;
            return (
              <div key={lang} className="mb-2">
                <strong>{LANGUAGE_FLAGS[flagKey] || flagKey}:</strong> {feats.map(f => f.text).join(' - ')}
              </div>
            );
          })
        ) : (
          <p>No features available</p>
        )}
      </div>

    </div>
  );
}
