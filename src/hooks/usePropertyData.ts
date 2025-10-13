import { usePropertyCache } from '@/context/PropertyCacheContext';
import { useEffect, useState } from 'react';

export function usePropertyData() {
  const cache = usePropertyCache();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Check if data needs to be refreshed
  const needsRefresh = cache.isDataStale() || 
    cache.featuredProperties.length === 0 || 
    cache.exclusiveProperties.length === 0 ||
    Object.keys(cache.propertyTypesMap).length === 0;

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [isInitialLoad]);

  return {
    ...cache,
    needsRefresh,
    isInitialLoad,
    hasData: cache.featuredProperties.length > 0 && 
             cache.exclusiveProperties.length > 0 &&
             Object.keys(cache.propertyTypesMap).length > 0
  };
}

