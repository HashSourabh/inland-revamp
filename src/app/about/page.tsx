'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import mollina from '@/assets/images/mollina.jpg';
import { useTranslations } from 'next-intl';
import PageOverlayLoader from '@/components/loader/PageOverlayLoader';

interface Town {
  name: string;
  count: number;
  weather?: string;
}

interface Province {
  province: string;
  count?: number;
  towns: Town[];
  loading?: boolean;
}

export default function AboutPage() {
  const t = useTranslations('aboutPage');
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loadingRegions, setLoadingRegions] = useState<boolean>(true);
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || 'https://inlandandalucia.onrender.com/api/v1';

  useEffect(() => {
    const fetchProvinces = async () => {
      setLoadingRegions(true);

      try {
        const res = await fetch(`${API_BASE_URL}/properties/regions/counts`);
        if (!res.ok) throw new Error('Failed to fetch provinces');

        const data = await res.json();

        if (data?.success && data.data?.regions) {
          const formatted: Province[] = [];

          for (const region of data.data.regions) {
            const province: Province = {
              province: region.region,
              count: region.count,
              towns: [],
              loading: true,
            };

            formatted.push(province);
            setProvinces([...formatted]);

            try {
              const areasRes = await fetch(
                `${API_BASE_URL}/properties/regions/${region.regionId}/areas`
              );
              const areasData = await areasRes.json();

              province.towns =
                areasData?.data?.areas?.map((a: any) => ({
                  name: a.areaName,
                  count: a.count,
                  weather: `https://weather.com/weather/today/l/${encodeURIComponent(
                    a.areaName
                  )}:1:SP`,
                })) || [];
            } catch (err) {
              console.error(`Error loading areas for ${region.region}:`, err);
              province.towns = [];
            } finally {
              province.loading = false;
              setProvinces([...formatted]);
            }
          }
        }
      } catch (err) {
        console.error('Error loading provinces:', err);
        setProvinces([]);
      } finally {
        setLoadingRegions(false);
      }
    };

    fetchProvinces();
  }, [API_BASE_URL]);

  // Spinner Component
 

  return (
    <div>
      {/* Hero Section */}
      <div className="py-20 bg-primary-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">
            {t('hero.title')}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/50">
            {t('hero.description')}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        {/* About Hero */}
        <section className="py-10 md:py-10 md:pt-20">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
              <div className="h-full w-full bg-neutral-200"></div>
              <Image
                src={mollina}
                alt={t('aboutHero.altImage')}
                width={600}
                height={400}
                className="object-cover h-[400px]"
              />
            </div>
            <div>
              <div className="space-y-4 text-neutral-700">
                <p>{t('aboutHero.p1')}</p>
                <p>{t('aboutHero.p2')}</p>
                <p>{t('aboutHero.p3')}</p>
                <p>{t('aboutHero.p4')}</p>
                <p>{t('aboutHero.p5')}</p>
                <p>{t('aboutHero.p6')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-10">
          <div className="text-left">
            <h2 className="text-3xl font-semibold text-primary-900 mb-4">{t('values.title')}</h2>
          </div>
          <div className="space-y-4 text-neutral-700">
            <p>{t('values.p1')}</p>
            <p>{t('values.p2')}</p>
            <p>{t('values.p3')}</p>
            <p>{t('values.p4')}</p>
          </div>
        </section>

        {/* Properties Section */}
        <section className="py-10 text-white">
          <p className="text-neutral-700 mb-6">{t('ctaSection.description')}</p>

          {loadingRegions ? (
            <PageOverlayLoader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-10">
              {provinces.map((prov) => (
                <div key={prov.province}>
                  <h3 className="font-medium text-primary-900 mb-2 capitalize text-xl pb-3 border-b border-primary-600/10 mb-4">
                    {prov.province} (
                    {prov.count ?? prov.towns.reduce((sum, t) => sum + t.count, 0)})
                  </h3>

                  {prov.loading ? (
                    <PageOverlayLoader />
                  ) : prov.towns.length > 0 ? (
                    <ul className="flex gap-3 flex-wrap">
                      {prov.towns.map((town) => (
                        <li key={town.name}>
                          <Link
                            href={town.weather || '#'}
                            className="inline-block bg-primary-600/10 hover:bg-primary-100 font-medium rounded px-5 text-sm py-2.5 text-primary-900 border border-primary-600/10 hover:shadow-md cursor-pointer"
                          >
                            {town.name}{' '}
                            <span className="text-secondary-600 inline-block ml-2">
                              ({town.count})
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-neutral-500">
                      {t('ctaSection.noTowns', { count: prov.count })}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
