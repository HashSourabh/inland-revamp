'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowLeftIcon, PrinterIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { getLocalizedPath } from '@/utils/localePath';
import Logo from "@/assets/images/logo/logo-ia.png"

import EnFlag from '@/../public/flags/en.svg';
import EsFlag from '@/../public/flags/es.svg';
import FrFlag from '@/../public/flags/fr.svg';
import PtFlag from '@/../public/flags/pt.svg';
import DeFlag from '@/../public/flags/de.svg';
import UnderOfferBadge from '@/components/properties/UnderOfferBadge';

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
  statusId?: number;
}

interface PrintPageProps {
  params: { id: string };
}


const languageCodes = [
  { code: 'en', flag: EnFlag, id: 1 },
  { code: 'es', flag: EsFlag, id: 2 },
  { code: 'fr', flag: FrFlag, id: 3 },
  { code: 'pt', flag: PtFlag, id: 8 },
  { code: 'de', flag: DeFlag, id: 4 },
];

const LANGUAGE_FLAGS: { [key: string]: string } = {
  EN: EnFlag,
  ES: EsFlag,
  FR: FrFlag,
  PT: PtFlag,
  DE: DeFlag,
};

const API_LANGUAGE_MAP: { [key: string]: string } = {
  language_1: 'EN',
  language_2: 'ES',
};

export default function PrintPage({ params }: PrintPageProps) {
  const t = useTranslations('printPage');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://inlandandalucia.onrender.com/api/v1";
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  
  const propertyId = params.id;
  const findFlag = (flagID : any) =>{
    const currentLangIndex = languageCodes.findIndex(lang => lang.code === flagID);
    return currentLangIndex;
  }

  // Hide Tidio chat widget when printing (JS backup — Tidio can override CSS)
  useEffect(() => {
    const TIDIO_SELECTORS = [
      '#tidio-chat',
      '#tidio-chat-widget',
      '[data-tidio-widget]',
      '.tidio-chat-widget',
      '[id*="tidio"]',
      '[class*="tidio"]',
    ];
    
    const hideChat = () => {
      TIDIO_SELECTORS.forEach((sel) => {
        try {
          document.querySelectorAll(sel).forEach((el) => {
            (el as HTMLElement).style.setProperty('display', 'none', 'important');
            (el as HTMLElement).style.setProperty('visibility', 'hidden', 'important');
          });
        } catch (_) {}
      });
    };
    const showChat = () => {
      TIDIO_SELECTORS.forEach((sel) => {
        try {
          document.getElementById('tidio-chat')?.style.removeProperty('display');
          document.querySelectorAll(sel).forEach((el) => {
            (el as HTMLElement).style.removeProperty('visibility');
          });
        } catch (_) {}
      });
    };
    window.addEventListener('beforeprint', hideChat);
    window.addEventListener('afterprint', showChat);
    // Also hide on print page so preview doesn’t show it
    return () => {
      window.removeEventListener('beforeprint', hideChat);
      window.removeEventListener('afterprint', showChat);
      showChat();
    };
  }, []);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const langId = Cookies.get('LanguageId') || '1';
        const res = await fetch(`${API_BASE_URL}/properties/${propertyId}?languageId=${langId}`);
        const data = await res.json();
        if (data.success && data.data) {
          const db = data.data;

          const location = {
            town: db.Area_Name?.trim() || tCommon('unknown'),
            province: db.Region_Name?.trim() || tCommon('andalucia'),
          };

          const numPhotos = db.Num_Photos && db.Num_Photos > 0 ? db.Num_Photos : 1;
          const imagesBase = (process.env.NEXT_PUBLIC_PROPERTY_IMAGES_BASE_URL || 'https://admin.inlandandalucia.com').replace(/\/$/, '');
          const images = Array.from({ length: Math.min(numPhotos, 3) }, (_, i) => ({
            url: `${imagesBase}/images/photos/properties/${db.Property_Ref}/${db.Property_Ref}_${i + 1}.jpg`,
            alt: `${db.Property_Ref} image ${i + 1}`,
            isFeatured: i === 0,
          }));

          setProperty({
            id: db.Property_ID.toString(),
            ref: db.Property_Ref || '',
            type: db.Property_Type || tCommon('property'),
            price: { current: db.Public_Price, original: db.Original_Price },
            location,
            bedrooms: db.Bedrooms || 0,
            bathrooms: db.Bathrooms || 0,
            buildSize: db.SQM_Built || 0,
            plotSize: db.SQM_Plot || 0,
            views: db.Viewed || tCommon('village'),
            description: db.translations
              ? db.translations.reduce((acc: any, t: any) => {
                const lang = t.languageId === 1 ? 'EN' : t.languageId === 2 ? 'ES' : `LANG_${t.languageId}`;
                acc[lang] = t.description;
                return acc;
              }, {})
              : {},

            property_features: db.features || {},
            images,
            statusId: db.Status_ID != null ? Number(db.Status_ID) : undefined,
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

  if (loading) return <p className="p-8 text-center">{t('loading')}</p>;
  if (!property) return <p className="p-8 text-center">{t('notFound')}</p>;
  console.log("propertypropertypropertyproperty",property);
  return (
    <div className="min-h-screen bg-white text-black p-4 sm:p-6 md:p-8 print:p-0">
      {/* Buttons (hidden in print) */}
      <div className="mx-auto max-w-4xl flex gap-4 mb-5 print:hidden">
        <Link href={getLocalizedPath(locale, `/properties/${property.ref || property.id}`)} className="inline-flex items-center gap-2 rounded-md border bg-gray-200 px-3 py-1.5 text-sm">
          <ArrowLeftIcon className="h-4 w-4" /> {t('back')}
        </Link>
        <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-md border bg-gray-200 px-3 py-1.5 text-sm">
          <PrinterIcon className="h-4 w-4" /> {t('print')}
        </button>
      </div>
      <style jsx global>{`
        @media print {
          header, footer, nav, .print\:hidden { display: none !important; }
          @page { margin: 0 !important; }
          .no-print { display: none !important; }
          #tidio-chat, #tidio-chat-widget, .tidio-chat-widget, [data-tidio-widget], [id*="tidio"], [class*="tidio"] { display: none !important; visibility: hidden !important; }
          html, body { margin: 0 !important; padding: 0 !important; background: #ffffff !important; }
          #__next { padding: 0 !important; }
          .print-logo { height: 22mm; }
          .print-hero { height: 75mm !important; }
          .print-thumb { height: 45mm !important; }
          .under-offer-badge, .under-offer-badge * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color: #ffffff !important;
          }
          .under-offer-badge-ribbon {
            background-color: #dc2626 !important;
          }
        }
      `}</style>
      <div className="max-w-[210mm] print-container mx-auto print:p-6 print:-mt-[125px]">
        
        {/* Print Header: Logo */}
        <div className="flex flex-col sm:flex-row items-stretch justify-between mb-3">
          <div className="flex justify-center sm:justify-start items-center gap-3 sm:border-r-4 border-secondary-600 sm:w-1/3 w-full">
            <div className="relative">
              <Image src={Logo.src} alt="Inland Andalucia Logo" width={220} height={105} />
            </div>
          </div>
          <div className="text-sm text-neutral-500 sm:w-2/3 w-full sm:pl-7 mt-6 sm:mt-0">
            <h2 className='lg:text-4xl md:text-3xl sm:text-2xl text-xl font-normal font-yellowtail text-primary-600 mb-4 text-center mt-0'>{t('safeHandsTitle')}</h2>
            <div className='flex flex-col 2xs:flex-row justify-between w-full gap-6'>
              <div className="text-sm text-neutral-600">
                <h4 className='lg:text-2xl text-xl font-bold font-heading text-primary-600 mb-1 text-center 2xs:text-left'>{t('molinaOffice')}</h4>
                <div className='text-sm lg:text-base font-medium mb-0 text-primary-600 text-center 2xs:text-left'>info@inlandandalucia.com</div>
                <div className='text-sm lg:text-base font-medium text-primary-600 text-center 2xs:text-left'>www.inlandandalucia.com</div>
              </div>
              <div>
                <div className='flex gap-2 justify-center 2xs:justify-start'>
                  <div className='lg:w-8 w-6 lg:h-8 h-6 rounded-full flex items-center justify-center overflow-hidden'>
                    <Image src={EnFlag} alt={property.images[0].alt} width={40} height={40}  className='w-full h-full object-cover object-center' />
                  </div>
                  <div className='lg:w-8 w-6 lg:h-8 h-6 rounded-full flex items-center justify-center overflow-hidden'>
                    <Image src={EsFlag} alt={property.images[0].alt} width={40} height={40}  className='w-full h-full object-cover object-center' />
                  </div>
                  <div className='lg:w-8 w-6 lg:h-8 h-6 rounded-full flex items-center justify-center overflow-hidden'>
                    <Image src={FrFlag} alt={property.images[0].alt} width={40} height={40}  className='w-full h-full object-cover object-center' />
                  </div>
                  <div className='lg:w-8 w-6 lg:h-8 h-6 rounded-full flex items-center justify-center overflow-hidden'>
                    <Image src={PtFlag} alt={property.images[0].alt} width={40} height={40}  className='w-full h-full object-cover object-center' />
                  </div>
                  <div className='lg:w-8 w-6 lg:h-8 h-6 rounded-full flex items-center justify-center overflow-hidden'>
                    <Image src={DeFlag} alt={property.images[0].alt} width={40} height={40}  className='w-full h-full object-cover object-center' />
                  </div>
                </div>
                <h4 className='lg:text-lg text-base font-semibold text-primary-600 mt-2 lg:tracking-[.22rem] tracking-[.15rem] text-center 2xs:text-left'>+34 952 741 525</h4>
              </div>
            </div>
          </div>
        </div>
        

        {/* Title */}
        {/* <h1 className="md:text-2xl text-xl font-bold mb-3 text-center 2xs:text-left">{property.ref} - {property.type}</h1> */}
        <div className="grid 2xs:grid-cols-2 sm:grid-cols-3 items-baseline mb-1">
          <p className='text-center 2xs:text-left text-sm sm:text-base'>{t('ref')}: <strong className='text-lg sm:text-lg'>{property.ref}</strong></p>
          <p className="text-lg sm:text-lg text-center"><strong>{t('townHouse')}</strong></p>
          <p className="mb-1 text-center sm:text-right text-sm sm:text-base">{t('price')} <strong className='text-lg sm:text-lg'>{formatPrice(property.price.current)}</strong></p>
        </div>
        {/* <p className="mb-3 text-center 2xs:text-left text-sm sm:text-base">{t('locationLabel')} {[property.location.province, property.location.town].filter(Boolean).join(' / ')}</p> */}

        {/* Images */}
        {property.images.length > 0 && (
          <div className="grid grid-cols-3 gap-0 mb-2.5 h-[275px]">
            {/* Hero image */}
            <div className="col-span-2 row-span-2 h-full relative">
              <img
                src={property.images[0].url}
                alt={property.images[0].alt}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              {property.statusId === 7 && <UnderOfferBadge />}
            </div>
            {/* Thumbnails */}
            {property.images.length > 1 && (
              <>
                {property.images.slice(1, 3).map((img, idx) => (
                  <div key={`thumb-${idx}`} className="relative h-full">
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="absolute top-0 left-0 w-full h-full object-cover" 
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* Property Specs (views excluded from print) */}
        <div className="flex flex-row justify-start gap-6 mb-3 text-sm font-medium">
          <div>{t('beds')}: <strong> {property.bedrooms}</strong></div>
          <div>{t('built')} : <strong>{property.buildSize} m²</strong></div>
          <div>{t('baths')} : <strong>{property.bathrooms}</strong></div>
          <div>{t('plot')} : <strong>{property.plotSize} m²</strong></div>
          <div className='col-span-3'>{t('location')} : <strong>{[property.location.province, property.location.town].filter(Boolean).join(' / ')}</strong></div>
        </div>

        <h2 className="text-base font-semibold mb-1.5">{t('description')}</h2>
        {([...Object.entries(property.description)] as [string, string][])
          .sort(([a], [b]) => {
            const order = ['ES', 'EN'];
            const ia = order.indexOf(a);
            const ib = order.indexOf(b);
            if (ia !== -1 && ib !== -1) return ia - ib;
            if (ia !== -1) return -1;
            if (ib !== -1) return 1;
            return a.localeCompare(b);
          })
          .map(([lang, text]) => (
          <div key={lang} className="mb-3  max-h-[50mm] overflow-hidden">
            <p className='text-sm leading-[1.2]'> 
                <Image src={languageCodes.find(l => l.code === lang.toLowerCase())?.flag || languageCodes[0].flag} alt={`${lang} flag`} width={24} height={30}  className='w-7 h-auto object-cover object-center inline-block mr-2' />
                {text}
              </p>
          </div>
        ))}


        {/* Features */}
        {/* Features */}
        <div>
          <h2 className="text-base font-semibold mb-[1.5]">{t('featuresTitle')}</h2>
          {Object.entries(property.property_features).length > 0 ? (
            Object.entries(property.property_features).map(([lang, feats]) => {
              const flagKey = API_LANGUAGE_MAP[lang] || lang;
              const featuresText = Array.isArray(feats)
                ? feats.map(f => f.text).join(' - ')
                : '';

              return (
                <div key={lang} className="mb-2 text-sm leading-[1.2]">
                  {featuresText || t('noFeatures')}
                </div>
              );
            })
          ) : (
            <p>{t('noFeatures')}</p>
          )}
        </div>

      </div>
    </div>
  );
}
