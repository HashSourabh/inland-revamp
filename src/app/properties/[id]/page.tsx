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
  PhoneIcon,
} from '@heroicons/react/24/outline';
import { useTranslations, useLocale } from 'next-intl';
import Cookies from 'js-cookie';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import FeaturesCard from '@/components/properties/FeaturesCard';

interface PropertyDetailsProps {
  params: { id: string };
}

interface Property {
  id: string;
  title: string;
  propertyRef: string,
  price: { current: number; original?: number };
  location: { town: string | null; province: string | null };
  description: string;
  viewed: number;
  features: { bedrooms: number; bathrooms: number; buildSize: number; plotSize: number; type: string };
  images: { url: string; alt: string; isFeatured: boolean }[];
  lat?: number;
  lng?: number;
  videoUrl: string;
  short_description: string;
}

export default function PropertyDetails({ params }: PropertyDetailsProps) {
  const t = useTranslations('properties');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://inlandandalucia.onrender.com/api/v1";
  const { user, openAuth } = useAuth();

  const [property, setProperty] = useState<Property | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isView, setIsView] = useState(false);

  // **Email reservation states** (commented out - no longer needed)
  // const [email, setEmail] = useState('');
  // const [emailExists, setEmailExists] = useState<boolean | null| "invalid">(null);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  const propertyId = params.id;

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const langId = Cookies.get('LanguageId') || '1';
        const res = await fetch(`${API_BASE_URL}/properties/${propertyId}?languageId=${langId}`);
        const data = await res.json();

        if (data.success && data.data) {
          const db = data.data;
          // Priority 1: If Property_Address exists and is not empty, use it (split by comma)
          // Priority 2: Otherwise use Area_Name and Region_Name from API
          // Priority 3: If neither exists, return null (don't display location)
          let town: string | null = null;
          let province: string | null = null;
          
          if (db.Property_Address && db.Property_Address.trim()) {
            // Use Property_Address if it exists
            const addressParts = db.Property_Address.split(",").map((part: string) => part.trim()).filter(Boolean);
            town = addressParts[0] || null;
            province = addressParts[1] || null;
          } else {
            // Use Area_Name and Region_Name from API
            town = db.Area_Name?.trim() || null;
            province = db.Region_Name?.trim() || null;
          }
          
          const location = {
            town,
            province,
          };

          const numPhotos = db.Num_Photos && db.Num_Photos > 0 ? db.Num_Photos : 1;
          const images = Array.from({ length: numPhotos }, (_, i) => ({
            url: `https://www.inlandandalucia.com/images/photos/properties/${db.Property_Ref}/${db.Property_Ref}_${i + 1}.jpg`,
            alt: `${db.Property_Ref} image ${i + 1}`,
            isFeatured: i === 0,
          }));

          // Get property type from API response, fallback to generic only if not available
          const propertyType = db.PropertyType && db.PropertyType.trim() !== '' 
            ? db.PropertyType 
            : tCommon('property');

          setProperty({
            id: db.Property_ID.toString(),
            propertyRef: db.Property_Ref || "",
            title: `${propertyType}(${db.Property_Ref})`,
            price: { 
              current: db.Public_Price, 
              original: (db.Original_Price && db.Original_Price > 0) ? db.Original_Price : undefined 
            },
            location,
            description: db.description || "",
            viewed: db.Viewed || 0,
            features: {
              bedrooms: db.Bedrooms || 0,
              bathrooms: db.Bathrooms || 0,
              buildSize: db.SQM_Built || 0,
              plotSize: db.SQM_Plot || 0,
              type: propertyType, // Use actual property type from API
            },
            images,
            // Only set lat/lng if they are valid (not 0 or null)
            lat: (db.GPS_Latitude && db.GPS_Latitude !== 0) ? db.GPS_Latitude : undefined,
            lng: (db.GPS_Longitude && db.GPS_Longitude !== 0) ? db.GPS_Longitude : undefined,
            videoUrl: db.Video_URL || null,
            short_description: db.short_description || null
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
        <p className="text-neutral-600 font-medium">{tCommon('loadingPropertyDetails')}</p>
      </div>
    </div>
  );

  if (loading) return <PageOverlayDetailsLoader />;

  if (!property)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-600">{tCommon('propertyNotFound')}</p>
      </div>
    );

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(price);
  
  // **Handle Reserve For Viewing button click**
  const handleReserveForViewing = () => {
    const propertyPayload = property ? JSON.stringify(property) : null;
    if (propertyPayload) {
      sessionStorage.setItem('propertyData', propertyPayload);
    }

    if (user) {
      router.push(`/${locale}/properties/reserve-for-view`);
    } else {
      openAuth('login', { redirectTo: `/${locale}/properties/reserve-for-view` });
    }
  };

  // **Old email reservation handler - commented out**
  // const validateEmail = (email: string) => {
  //   // Basic regex for email validation
  //   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return re.test(email);
  // };
  // const handleReserve = async () => {
  //   if (!email) return;
  //   setEmailExists(null);
  //   if (!validateEmail(email)) {
  //     setEmailExists("invalid");
  //     return;
  //   }
  //   setIsSubmitting(true);
  //   try {
  //     const res = await fetch(`${API_BASE_URL}/users/check-email?email=${encodeURIComponent(email)}`);
  //     const data = await res.json();
  //     if (data.exists && data.data) {
  //       sessionStorage.setItem('buyerData', JSON.stringify(data.data));
  //       sessionStorage.setItem('buyerEmail', email);
  //       sessionStorage.setItem('propertyData', JSON.stringify(property));
  //       window.location.href = 'reserve-for-view';
  //     } else {
  //       setEmailExists(false);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setEmailExists(null);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };



  return (
    <div className="min-h-screen bg-neutral-50 pb-16 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 pt-7">
        {/* Header */}
        <div className="mb-5">
          <Link href="/properties" className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
            <ArrowLeftIcon className="h-4 w-4" /> Back
          </Link>
        </div>

        {/* Property Info */}
        <div className="mb-8 flex flex-col gap-2.5 sm:justify-between">
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl font-bold">{property.title}</h1>
              {(property.location.town || property.location.province) && (
                <p className="mt-1 text-base text-neutral-600">
                  {[property.location.town, property.location.province].filter(Boolean).join(' / ')}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {property.price.original && property.price.original > 0 && (
                <span className="line-through text-neutral-500">{formatPrice(property.price.original)}</span>
              )}
              <span className="text-2xl font-bold text-primary-600">{formatPrice(property.price.current)}</span>
            </div>
          </div>

          
        </div>

        {/* Main Content */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className='space-y-6'>
            <PropertyGallery
              images={property.images}
              title={property.title}
              description={property.description}
              location={(property.location.town || property.location.province) 
                ? `${property.location.town || ''}/${property.location.province || ''}`.replace(/^\/|\/$/g, '')
                : undefined}
              beds={property.features.bedrooms}
              baths={property.features.bathrooms}
              built={property.features.buildSize}
              plot={property.features.plotSize}
              views={property.viewed}
              features={["Some feature", "Another feature"]}
              lat={property.lat}
              lng={property.lng}
            />
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button className="rounded-md bg-primary-600 px-4 py-2 text-sm text-white" onClick={handleReserveForViewing}>{t('details.reserve_viewing')}</button>
              {property.videoUrl && (
                <button
                  title={t('details.watch_video')}
                  className="inline-flex items-center gap-2 rounded-md bg-yellow-400 px-4 py-2 text-sm text-neutral-900"
                  onClick={() => setIsVideoOpen(true)}
                >
                  <PlayIcon className="h-4 w-4" /> 
                  {/* {t('details.watch_video')} */}
                </button>
              )}
              <Link
                title={t('details.print_preview')}
                href={`/properties/${property.id}/print`}
                className="inline-flex items-center gap-2 rounded-md border bg-white px-4 py-2 text-sm text-neutral-700"
              >
                <PrinterIcon className="h-4 w-4" /> 
                {/* {t('details.print_preview')} */}
              </Link>
              <button
                title={t('details.email')}
                onClick={() => window.location.href = 'mailto:someone@example.com'}
                className="inline-flex items-center gap-2 rounded-md border bg-white px-4 py-2 text-sm text-neutral-700"
              >
                <EnvelopeIcon className="h-4 w-4" /> 
                {/* {t('details.email')} */}
              </button>

              <Link
                href={`/contact`}
                className="inline-flex items-center gap-2 rounded-md border bg-white px-4 py-2 text-sm text-neutral-700"
              >
                <UserGroupIcon className="h-4 w-4" /> {t('details.contact_us')}
              </Link>

            </div>
          </div>

          <div className="space-y-6">
            <FeaturesCard
              beds={property.features.bedrooms}
              baths={property.features.bathrooms}
              built={property.features.buildSize}
              plot={property.features.plotSize.toString()}
              views={property.viewed.toString()}
              location={(property.location.town || property.location.province) 
                ? `${property.location.town || ''}/${property.location.province || ''}`.replace(/^\/|\/$/g, '')
                : undefined}
            />
            {/* Description */}
            {property.description && (
              <div>
                <h2 className="mb-4 text-xl font-semibold">{t('details.description')}</h2>
                <p className="text-neutral-700 dark:text-neutral-300">
                  {property.description}
                </p>
              </div>
            )}
          </div>
          {/* Location - Only show if we have valid coordinates (not 0 or null) */}
          {property.lat && property.lng && property.lat !== 0 && property.lng !== 0 && (
          <div className="lg:col-span-2">
            <h2 className="mb-3 text-xl font-semibold">Location</h2>
            <div className="aspect-[16/5] w-full overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <iframe
                src={`https://www.google.com/maps?q=${property.lat},${property.lng}&z=15&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          )}
        </div>
      </div>

      {/* Reserve Popup - Commented out - Now using login/auth flow */}
      {/* <Popup
        isOpen={isView}
        onClose={() => {
          setIsView(false);
          setEmail('');
          setEmailExists(null);
        }}
        title={tCommon('reserveForViewing')}
        description={tCommon('reserveForViewingDescription')}
      >
        <div className="space-y-4">
          <p>{tCommon('pleaseEnterEmail')}</p>
          <input
            type="email"
            placeholder={tCommon('yourEmail')}
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailExists(null);
            }}
          />
          <button
            className="w-full bg-primary-600 text-white px-4 py-2 rounded"
            onClick={handleReserve}
            disabled={isSubmitting || !email}
          >
            {isSubmitting ? tCommon('checking') : tCommon('reserve')}
          </button>

          {emailExists !== null && (
            <p
              className={`text-sm ${emailExists === true
                  ? "text-green-600"
                  : emailExists === false
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
            >
              {emailExists === "invalid"
                ? "Please enter a valid email address."
                : emailExists === true
                  ? "Email found! Redirecting..."
                  : "User not found or email does not exist."}
            </p>
          )}

        </div>
      </Popup> */}


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
              title={tCommon('propertyVideo')}
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
