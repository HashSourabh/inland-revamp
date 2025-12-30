'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchTopProperties, TopPropertyItem } from '@/utils/api';
import { useTranslations } from 'next-intl';

interface TopFivePropertiesProps {
  queryLocation?: string; // e.g., "Jaen", "Alcala la Real"
  queryType?: string | number; // e.g., "apartment", type code, or id
  title?: string;
}

export default function TopFiveProperties({
  queryLocation,
  queryType,
  title,
}: TopFivePropertiesProps) {
  const tCommon = useTranslations('common');
  const [items, setItems] = useState<TopPropertyItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const displayTitle = title || tCommon('top5Properties');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    fetchTopProperties({ location: queryLocation, propertyType: queryType, limit: 5 })
      .then((list) => {
        if (!mounted) return;
        setItems(list);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.message ?? tCommon('failedToLoadProperties'));
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [queryLocation, queryType]);

  if (loading) {
    return (
      <div className="space-y-2">
        <p className="text-neutral-600">{tCommon('loadingTopProperties')}</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (items.length === 0) {
    return <p className="text-neutral-600">{tCommon('noMatchingPropertiesFound')}</p>;
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-primary-700">{displayTitle}</h3>
      <ol className="list-decimal pl-5 space-y-1">
        {items.map((p, idx) => (
          <li key={p.id}>
            <Link href={p.link} className="text-primary-600 hover:underline">
              {tCommon('property')} {idx + 1}: {p.title}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}



