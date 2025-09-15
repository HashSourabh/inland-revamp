// utils/mapProperty.ts
export const mapBackendProperty = (p: any) => ({
    id: p.Property_ID.toString(),
    title: Array.isArray(p.Property_Ref) ? p.Property_Ref[0] : p.Property_Ref,
    price: p.Public_Price,
    currency: 'EUR', // fallback currency, update if backend provides one
    shortDescription: '', // optional, can be updated later
    location: {
      province: p.Region_Name || '',
      town: p.LocationName || '',
    },
    features: {
      bedrooms: p.Bedrooms || 0,
      bathrooms: p.Bathrooms || 0,
      buildSize: 0, // optional, can update when backend provides
      type: 'N/A',  // optional, can update when backend provides
    },
    images: [
      {
        url: '/placeholder.jpg', // default image
        alt: p.Property_Ref ? `Image of ${p.Property_Ref}` : 'Property Image',
        isFeatured: true,
      },
    ],
  });
  