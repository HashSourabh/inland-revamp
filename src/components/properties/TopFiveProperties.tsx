'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchTopProperties, TopPropertyItem } from '@/utils/api';

interface TopFivePropertiesProps {
  queryLocation?: string; // e.g., "Jaen", "Alcala la Real"
  queryType?: string | number; // e.g., "apartment", type code, or id
  title?: string;
}

export default function TopFiveProperties({
  queryLocation,
  queryType,
  title = 'Top 5 properties',
}: TopFivePropertiesProps) {
  const [items, setItems] = useState<TopPropertyItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        setError(err?.message ?? 'Failed to load properties');
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
        <p className="text-neutral-600">Loading top properties…</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (items.length === 0) {
    return <p className="text-neutral-600">No matching properties found.</p>;
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-primary-700">{title}</h3>
      <ol className="list-decimal pl-5 space-y-1">
        {items.map((p, idx) => (
          <li key={p.id}>
            <Link href={p.link} className="text-primary-600 hover:underline">
              Property {idx + 1}: {p.title}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}



