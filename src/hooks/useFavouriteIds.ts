'use client';

import { useEffect, useState } from 'react';
import { useAuth, getToken } from '@/context/AuthContext';
import { API_BASE_URL } from '@/utils/api';

/**
 * Hook to load favourite property IDs for the logged-in buyer.
 * Returns an array of property IDs as strings. These should match the `id`
 * field used by `PropertyCard`.
 */
export function useFavouriteIds() {
  const { user } = useAuth();
  const [favouriteIds, setFavouriteIds] = useState<string[]>([]);

  useEffect(() => {
    const loadFavs = async () => {
      if (!user) {
        setFavouriteIds([]);
        return;
      }

      try {
        const token = getToken();
        const headers: HeadersInit = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(`${API_BASE_URL}/buyers/me/favourites`, {
          headers,
        });

        if (!res.ok) {
          console.error('Failed to load favourites, status:', res.status);
          setFavouriteIds([]);
          return;
        }

        const data = await res.json();

        const ids = (data.favourites || []).map((f: any) =>
          String(f.Property_ID ?? f.Property_Id ?? f.Property_Ref ?? '')
        );

        setFavouriteIds(ids.filter(Boolean));
      } catch (err) {
        console.error('Failed to load favourites', err);
        setFavouriteIds([]);
      }
    };

    loadFavs();
  }, [user]);

  return favouriteIds;
}

