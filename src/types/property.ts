export interface Property {
  id: string;
  title: string;
  location: {
    town: string;
    province: string;
  };
  price: {
    current: number;
    original?: number;
  };
  specs: {
    beds: number;
    baths: number;
    built: number;
    plot?: number;
  };
  description: string;
  images: string[];
  isExclusive?: boolean;
  isReduced?: boolean;
  features?: string[];
  views?: string;
  location_type?: string;
}

export type PropertyListingResponse = {
  properties: Property[];
  total: number;
  page: number;
  totalPages: number;
}; 