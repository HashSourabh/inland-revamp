'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowLeftIcon, PrinterIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';
import Image from 'next/image';

import EnFlag from '@/../public/flags/en.svg';
import EsFlag from '@/../public/flags/es.svg';
import FrFlag from '@/../public/flags/fr.svg';
import PtFlag from '@/../public/flags/pt.svg';
import DeFlag from '@/../public/flags/de.svg';

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


const languages = [
  { code: 'en', name: 'English', flag: EnFlag, id: 1 },
  { code: 'es', name: 'Español', flag: EsFlag, id: 2 },
  { code: 'fr', name: 'Français', flag: FrFlag, id: 3 },
  { code: 'pt', name: 'Português', flag: PtFlag, id: 8 },
  { code: 'de', name: 'German', flag: DeFlag, id: 4 },
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
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://inlandandalucia.onrender.com/api/v1";
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  
  const propertyId = params.id;
  const findFlag = (flagID : any) =>{
    const currentLangIndex = languages.findIndex(lang => lang.code === flagID);
    return currentLangIndex;
  }

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const langId = Cookies.get('LanguageId') || '1';
        const res = await fetch(`${API_BASE_URL}/properties/${propertyId}?languageId=${langId}`);
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
            description: db.translations
              ? db.translations.reduce((acc: any, t: any) => {
                const lang = t.languageId === 1 ? 'EN' : t.languageId === 2 ? 'ES' : `LANG_${t.languageId}`;
                acc[lang] = t.description;
                return acc;
              }, {})
              : {},

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
  console.log("propertypropertypropertyproperty",property);
  return (
    <div className="min-h-screen bg-white text-black p-8 print:p-0">
      {/* Buttons (hidden in print) */}
      <div className="mx-auto max-w-4xl px-8 flex gap-4 mb-5 print:hidden">
        <Link href={`/properties/${property.id}`} className="inline-flex items-center gap-2 rounded-md border bg-gray-200 px-4 py-2 text-sm">
          <ArrowLeftIcon className="h-4 w-4" /> Back
        </Link>
        <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-md border bg-gray-200 px-4 py-2 text-sm">
          <PrinterIcon className="h-4 w-4" /> Print
        </button>
      </div>
      <style jsx global>{`
        @media print {
          header, footer, nav, .print\:hidden { display: none !important; }
          .no-print { display: none !important; }
          html, body { margin: 0 !important; padding: 0 !important; background: #ffffff !important; }
          #__next { padding: 0 !important; }
          .print-logo { height: 22mm; }
          .print-hero { height: 75mm !important; }
          .print-thumb { height: 45mm !important; }
        }
      `}</style>
      <div className="max-w-[210mm] print-container mx-auto print:p-8 print:-mt-[104px]">
        
        {/* Print Header: Logo */}
        <div className="flex items-stretch justify-between mb-6">
          <div className="flex items-center gap-3 w-1/3 border-r-4 border-secondary-600">
            <div className="relative">
              <svg width="200" height="60" viewBox="0 0 1220 328" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M144.656 1.03472L145.437 0.999869C150.98 0.765779 156.439 1.40998 161.86 2.55809C171.474 4.59521 181.03 7.54902 190.516 10.1419L239.934 23.7923C248.811 26.3304 257.713 28.7767 266.641 31.1313C272.577 32.7083 278.808 34.0378 284.571 36.1723C286.839 37.0122 288.732 38.2782 290.471 39.9624C293.065 42.4749 294.372 44.8854 295.157 48.3977C296.829 55.8895 295.866 64.9788 295.848 72.7019L295.822 111.228C284.38 112.184 273.009 113.214 261.691 115.221C257.395 116.014 253.121 116.913 248.871 117.921C244.619 118.928 240.397 120.041 236.202 121.26C232.007 122.48 227.845 123.804 223.717 125.233C219.588 126.661 215.498 128.192 211.447 129.826C207.395 131.461 203.387 133.195 199.423 135.031C195.458 136.866 191.543 138.8 187.676 140.832C183.809 142.864 179.995 144.992 176.235 147.217C172.474 149.44 168.773 151.757 165.129 154.167L157.254 150.103C127.558 133.519 90.0192 120.245 56.4416 115.323C38.0709 112.63 19.4616 111.991 0.927429 111.393L0.816645 71.6307C0.797882 64.5544 0.173361 56.8294 1.19639 49.8407C1.63866 46.8189 2.47047 43.6775 4.46917 41.2982C6.24361 39.1851 8.70871 37.3052 11.2828 36.2956C17.2306 33.9619 23.7843 32.6199 29.9546 30.9482L62.1509 22.1144L103.637 10.6288C117.072 6.83781 130.686 2.08901 144.656 1.03472Z" fill="rgb(var(--color-primary))" />
                <path d="M0.950707 141.12C48.2976 139.127 97.5405 151.819 138.573 175.389C118.205 192.478 102.118 214.04 88.4565 236.69C86.1085 240.636 83.8703 244.644 81.7421 248.713C79.6144 252.783 77.5997 256.907 75.6978 261.087C73.7964 265.267 72.0113 269.496 70.3423 273.774C68.6727 278.052 67.1219 282.372 65.69 286.736C51.9001 279.666 37.5804 272.832 26.4924 261.742C2.57237 237.817 0.915861 211.067 0.877441 179.361L0.950707 141.12Z" fill="rgb(var(--color-secondary))" />
                <path d="M291.169 140.409C292.601 140.168 294.229 140.269 295.684 140.229C295.794 151.279 295.821 162.328 295.766 173.378C292.677 173.71 289.598 174.117 286.529 174.6C283.459 175.083 280.404 175.64 277.362 176.273C274.32 176.906 271.295 177.613 268.287 178.394C265.28 179.175 262.294 180.029 259.329 180.957C256.363 181.884 253.423 182.884 250.506 183.956C247.59 185.028 244.702 186.17 241.842 187.384C238.981 188.598 236.152 189.881 233.354 191.233C230.557 192.585 227.795 194.006 225.068 195.493C191.016 213.74 160.492 243.007 142.429 277.36C135.386 290.756 130.219 304.953 125.845 319.413C119.71 316.211 113.596 312.967 107.505 309.682L92.7898 301.846C100.959 273.551 116.394 245.764 135.1 223.089C169.057 181.928 215.303 153.2 267.995 143.32C275.675 141.88 283.399 141.157 291.169 140.409Z" fill="rgb(var(--color-secondary))" />
                <path d="M294.525 203.863L294.983 203.866L295.372 204.519C294.632 212.411 293.441 220.247 290.926 227.791C286.252 241.813 278.581 254.425 267.708 264.527C255.618 275.76 239.953 283.211 225.457 290.8L196.406 306.132C183.242 313.082 170.371 320.634 157.072 327.321L156.604 327.249L156.339 326.309C160.781 303.614 177.019 278.74 192.089 261.531C215.898 234.342 257.836 206.278 294.525 203.863Z" fill="rgb(var(--color-secondary))" />
                <path d="M389 170V16H417.786V170H389Z" fill="rgb(var(--color-primary))" />
                <path d="M460.826 170V16H489.612L562.02 123.8V16H590.806V170H562.02L489.612 62.42V170H460.826Z" fill="rgb(var(--color-primary))" />
                <path d="M633.632 170V16H662.417V147.56H713.26L705.014 170H633.632Z" fill="rgb(var(--color-primary))" />
                <path d="M729.46 170L785.924 16H818.475L875.161 170H844.825L796.332 31.84H808.067L759.574 170H729.46ZM755.588 134.58L763.338 112.14H841.282L849.032 134.58H755.588Z" fill="rgb(var(--color-primary))" />
                <path d="M908.337 170V16H937.123L1009.53 123.8V16H1038.32V170H1009.53L937.123 62.42V170H908.337Z" fill="rgb(var(--color-primary))" />
                <path d="M1081.14 170V16H1134.51C1152.66 16 1167.57 19.2267 1179.24 25.68C1191.05 31.9867 1199.75 40.9333 1205.36 52.52C1211.12 63.96 1214 77.4533 1214 93C1214 108.547 1211.12 122.113 1205.36 133.7C1199.75 145.14 1191.05 154.087 1179.24 160.54C1167.57 166.847 1152.66 170 1134.51 170H1081.14ZM1109.93 145.58H1132.96C1145.95 145.58 1156.13 143.527 1163.51 139.42C1171.04 135.167 1176.43 129.153 1179.68 121.38C1182.93 113.46 1184.55 104 1184.55 93C1184.55 82.1467 1182.93 72.76 1179.68 64.84C1176.43 56.92 1171.04 50.8333 1163.51 46.58C1156.13 42.3267 1145.95 40.2 1132.96 40.2H1109.93V145.58Z" fill="rgb(var(--color-primary))" />
                <path d="M360 314.309L395.701 215.691H416.282L452.123 314.309H432.942L402.281 225.834H409.702L379.041 314.309H360ZM376.521 291.627L381.421 277.257H430.702L435.603 291.627H376.521Z" fill="rgb(var(--color-primary))" />
                <path d="M473.1 314.309V215.691H491.3L537.082 284.724V215.691H555.283V314.309H537.082L491.3 245.417V314.309H473.1Z" fill="rgb(var(--color-primary))" />
                <path d="M582.36 314.309V215.691H616.102C627.582 215.691 637.009 217.757 644.382 221.89C651.849 225.928 657.356 231.657 660.903 239.077C664.543 246.403 666.363 255.044 666.363 265C666.363 274.956 664.543 283.644 660.903 291.064C657.356 298.39 651.849 304.119 644.382 308.251C637.009 312.29 627.582 314.309 616.102 314.309H582.36ZM600.561 298.671H615.121C623.335 298.671 629.775 297.356 634.442 294.727C639.202 292.003 642.609 288.152 644.662 283.174C646.716 278.102 647.743 272.044 647.743 265C647.743 258.05 646.716 252.039 644.662 246.967C642.609 241.895 639.202 237.997 634.442 235.273C629.775 232.55 623.335 231.188 615.121 231.188H600.561V298.671Z" fill="rgb(var(--color-primary))" />
                <path d="M678.905 314.309L714.606 215.691H735.187L771.028 314.309H751.847L721.186 225.834H728.606L697.945 314.309H678.905ZM695.425 291.627L700.325 277.257H749.607L754.507 291.627H695.425Z" fill="rgb(var(--color-primary))" />
                <path d="M791.864 314.309V215.691H810.065V299.939H853.466V314.309H791.864Z" fill="rgb(var(--color-primary))" />
                <path d="M912.656 316C905.469 316 898.982 314.591 893.195 311.773C887.408 308.862 882.788 304.494 879.335 298.671C875.881 292.754 874.154 285.334 874.154 276.412V215.691H892.355V276.552C892.355 284.16 894.175 289.843 897.815 293.599C901.549 297.356 906.635 299.235 913.076 299.235C919.516 299.235 924.556 297.356 928.196 293.599C931.93 289.843 933.796 284.16 933.796 276.552V215.691H951.997V276.412C951.997 285.334 950.224 292.754 946.677 298.671C943.13 304.494 938.37 308.862 932.396 311.773C926.423 314.591 919.843 316 912.656 316Z" fill="rgb(var(--color-primary))" />
                <path d="M1021.69 316C1011.89 316 1003.4 313.887 996.209 309.66C989.115 305.34 983.655 299.376 979.828 291.768C976.002 284.066 974.088 275.191 974.088 265.141C974.088 255.091 976.002 246.215 979.828 238.514C983.655 230.812 989.115 224.801 996.209 220.481C1003.4 216.16 1011.89 214 1021.69 214C1033.54 214 1043.2 216.959 1050.67 222.876C1058.23 228.793 1062.94 237.058 1064.81 247.671H1044.65C1043.53 242.318 1041.01 238.138 1037.09 235.133C1033.17 232.127 1027.94 230.624 1021.41 230.624C1015.44 230.624 1010.3 232.033 1006.01 234.851C1001.72 237.575 998.402 241.519 996.069 246.685C993.736 251.851 992.569 258.003 992.569 265.141C992.569 272.279 993.736 278.431 996.069 283.597C998.402 288.669 1001.72 292.613 1006.01 295.431C1010.3 298.155 1015.44 299.517 1021.41 299.517C1027.94 299.517 1033.12 298.108 1036.95 295.29C1040.87 292.472 1043.44 288.387 1044.65 283.033H1064.67C1062.9 293.459 1058.23 301.583 1050.67 307.406C1043.2 313.135 1033.54 316 1021.69 316Z" fill="rgb(var(--color-primary))" />
                <path d="M1088.62 314.309V215.691H1106.82V314.309H1088.62Z" fill="rgb(var(--color-primary))" />
                <path d="M1127.88 314.309L1163.58 215.691H1184.16L1220 314.309H1200.82L1170.16 225.834H1177.58L1146.92 314.309H1127.88ZM1144.4 291.627L1149.3 277.257H1198.58L1203.48 291.627H1144.4Z" fill="rgb(var(--color-primary))" />
              </svg>
            </div>
          </div>
          <div className="text-sm text-neutral-500 w-2/3 pl-7">
            <h2 className='text-4xl font-normal font-yellowtail text-primary-600 mb-6 text-center'>You're in Safe Hands</h2>
            <div className='flex justify-between w-full'>
              <div className="text-sm text-neutral-600">
                <h4 className='text-2xl font-bold font-heading text-primary-600 mb-1'>Molina Office</h4>
                <div className='text-base font-medium mb-1.5 text-primary-600'>info@inlandandalucia.com</div>
                <div className='text-base font-medium text-primary-600'>www.inlandandalucia.com</div>
              </div>
              <div>
                <div className='flex gap-2'>
                  <div className='w-8 h-8 rounded-full flex items-center justify-center overflow-hidden'>
                    <Image src={EnFlag} alt={property.images[0].alt} width={40} height={40}  className='w-full h-full object-cover object-center' />
                  </div>
                  <div className='w-8 h-8 rounded-full flex items-center justify-center overflow-hidden'>
                    <Image src={EsFlag} alt={property.images[0].alt} width={40} height={40}  className='w-full h-full object-cover object-center' />
                  </div>
                  <div className='w-8 h-8 rounded-full flex items-center justify-center overflow-hidden'>
                    <Image src={FrFlag} alt={property.images[0].alt} width={40} height={40}  className='w-full h-full object-cover object-center' />
                  </div>
                  <div className='w-8 h-8 rounded-full flex items-center justify-center overflow-hidden'>
                    <Image src={PtFlag} alt={property.images[0].alt} width={40} height={40}  className='w-full h-full object-cover object-center' />
                  </div>
                  <div className='w-8 h-8 rounded-full flex items-center justify-center overflow-hidden'>
                    <Image src={DeFlag} alt={property.images[0].alt} width={40} height={40}  className='w-full h-full object-cover object-center' />
                  </div>
                </div>
                <h4 className='text-lg font-semibold text-primary-600 mt-2 tracking-[.22rem]'>+34 952 741 525</h4>
              </div>
            </div>
          </div>
        </div>
        

        {/* Title */}
        <h1 className="text-2xl font-bold mb-3">{property.ref} - {property.type}</h1>
        <div className="grid grid-cols-3 items-baseline mb-1">
          <p>Ref: <strong className='text-xl'>{property.ref}</strong></p>
          <p className="text-center"><strong>Town House</strong></p>
          <p className="mb-1 text-right">Price / Precio: <strong className='text-xl'>{formatPrice(property.price.current)}</strong></p>
        </div>
        <p className="mb-3">Location / Localidad: {property.location.town} - {property.location.province}</p>

        {/* Images */}
        {property.images.length > 0 && (
          <div className="mb-5">
            {/* Hero image */}
            <img
              src={property.images[0].url}
              alt={property.images[0].alt}
              className="w-full h-64 md:h-72 print-hero object-cover rounded"
            />
            {/* Thumbnails */}
            {property.images.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {property.images.slice(1, 3).map((img, idx) => (
                  <img
                    key={`thumb-${idx}`}
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-48 md:h-56 print-thumb object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Property Specs */}
        <div className="grid grid-cols-3 gap-2 mb-5 text-sm font-medium">
          <div>Beds: <strong> {property.bedrooms}</strong></div>
          <div>Built : <strong>{property.buildSize} m²</strong></div>
          <div>Baths : <strong>{property.bathrooms}</strong></div>
          <div>Plot : <strong>{property.plotSize} m²</strong></div>
          <div>Views : <strong>{property.views}</strong></div>
          <div>Location : <strong>{property.location.town}</strong></div>
        </div>

        <h2 className="text-lg font-semibold">Description</h2>
        {Object.entries(property.description).map(([lang, text]) => (
          <div key={lang} className="py-2">
            <p className='text-sm'> 
                <Image src={languages.find(l => l.code === lang.toLowerCase())?.flag || languages[0].flag} alt={`${lang} flag`} width={40} height={40}  className='w-7 h-auto object-cover object-center inline-block mr-2' />
                {text}
              </p>
          </div>
        ))}


        {/* Features */}
        {/* Features */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Features / Características:</h2>
          {Object.entries(property.property_features).length > 0 ? (
            Object.entries(property.property_features).map(([lang, feats]) => {
              const flagKey = API_LANGUAGE_MAP[lang] || lang;
              const featuresText = Array.isArray(feats)
                ? feats.map(f => f.text).join(' - ')
                : '';

              return (
                <div key={lang} className="mb-2 text-sm">
                  <strong className='capitalize'>{LANGUAGE_FLAGS[flagKey] || flagKey}:</strong> {featuresText || 'No features'}
                </div>
              );
            })
          ) : (
            <p>No features available</p>
          )}
        </div>

      </div>
    </div>
  );
}
