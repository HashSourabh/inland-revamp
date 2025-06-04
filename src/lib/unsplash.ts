import { createApi } from 'unsplash-js';

// Initialize the Unsplash API client
const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || '',
});

export interface UnsplashPhoto {
  id: string;
  urls: {
    regular: string;
    small: string;
    thumb: string;
    raw: string;
  };
  alt_description: string;
  description: string | null;
  user: {
    name: string;
    links: {
      html: string;
    };
  };
  width: number;
  height: number;
  color: string | null;
  created_at: string;
  links: {
    html: string;
  };
}

/**
 * Search for photos on Unsplash
 * @param query The search query (e.g., "andalucia real estate")
 * @param page The page number for pagination (starts at 1)
 * @param perPage Number of photos per page
 * @param orientation Optional orientation filter (landscape, portrait, squarish)
 * @returns Array of UnsplashPhoto objects
 */
export async function searchPhotos(
  query: string, 
  page: number = 1, 
  perPage: number = 10,
  orientation: 'landscape' | 'portrait' | 'squarish' = 'landscape'
): Promise<UnsplashPhoto[]> {
  try {
    const result = await unsplash.search.getPhotos({
      query,
      page,
      perPage,
      orientation,
    });

    if (result.type === 'success') {
      return result.response.results as UnsplashPhoto[];
    }
    return [];
  } catch (error) {
    console.error('Error fetching photos from Unsplash:', error);
    return [];
  }
}

/**
 * Get a random photo from Unsplash
 * @param query The search query
 * @returns An UnsplashPhoto object or null
 */
export async function getRandomPhoto(query: string): Promise<UnsplashPhoto | null> {
  try {
    const result = await unsplash.photos.getRandom({
      query,
      count: 1,
    });

    if (result.type === 'success' && Array.isArray(result.response)) {
      return result.response[0] as UnsplashPhoto;
    }
    return null;
  } catch (error) {
    console.error('Error fetching random photo from Unsplash:', error);
    return null;
  }
}

/**
 * Get photos for a specific location in Andalucia
 * @param location The name of the town or area (e.g., "Antequera")
 * @param count Number of photos to return
 * @returns Array of UnsplashPhoto objects
 */
export async function getLocationPhotos(location: string, count: number = 4): Promise<UnsplashPhoto[]> {
  return searchPhotos(`${location} Andalucia Spain`, 1, count);
}

/**
 * Get property photos based on type
 * @param propertyType The type of property (e.g., "villa", "farmhouse", "apartment")
 * @param count Number of photos to return
 * @returns Array of UnsplashPhoto objects
 */
export async function getPropertyTypePhotos(propertyType: string, count: number = 4): Promise<UnsplashPhoto[]> {
  return searchPhotos(`Andalucia Spain ${propertyType}`, 1, count);
}

/**
 * Formats the Unsplash attribution string as required by their API guidelines
 * @param photo The UnsplashPhoto object
 * @returns Formatted attribution string
 */
export function formatPhotoAttribution(photo: UnsplashPhoto): string {
  return `Photo by ${photo.user.name} on Unsplash`;
} 