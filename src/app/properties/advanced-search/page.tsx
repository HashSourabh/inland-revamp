"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PromoSidebar from "@/components/PromoSidebar";

export default function AdvancedSearchPage() {
  const [filters, setFilters] = React.useState({
    regionId: "",
    propertyType: "",
    minBeds: "",
    minBaths: "",
    priceFrom: "",
    priceTo: "",
  });

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

  const [propertyTypes, setPropertyTypes] = React.useState<
    { id: number; name: string; code: string }[]
  >([]);
  const [regionCounts, setRegionCounts] = React.useState<
    { regionId: number; region: string; count: number }[]
  >([]);

  const router = useRouter();
  const refInput = useRef<HTMLInputElement>(null);

  // fetch property types and region counts
  React.useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/properties/types?languageId=1`
        );
        if (!res.ok) throw new Error(`Failed: ${res.status}`);
        const data = await res.json();
        if (data?.success && data.data) {
          const formatted = data.data.map((r: any) => ({
            id: r.id,
            name: r.name,
            code: r.code,
          }));
          setPropertyTypes(formatted);
        }
      } catch (err) {
        console.error("Error loading property types:", err);
      }
    };

    const fetchRegionCounts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/properties/regions/counts`);
        if (!res.ok) throw new Error(`Failed: ${res.status}`);
        const data = await res.json();

        if (data?.success && data.data?.regions) {
          const formatted = data.data.regions.map((r: any) => ({
            regionId: r.regionId,
            region: r.region,
            count: r.count,
          }));
          setRegionCounts(formatted);
        }
      } catch (err) {
        console.error("Error loading region counts:", err);
      }
    };

    fetchPropertyTypes();
    fetchRegionCounts();
  }, [API_BASE_URL]);

  // handle form submit -> build query string
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(
      Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== "")
      )
    );
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Advanced Search Form */}
      <section className="md:col-span-2 bg-white rounded-xl  p-8 border border-black/10 ">
        <h1 className="font-heading text-3xl font-bold text-primary-600 mb-6">
          Andalucía Property
        </h1>
        <p className="mb-8 text-neutral-600">
          At Inland Andalucia we have country, rural, inland property ranging
          from fincas, villas, townhouses to apartments. We specialise in the
          areas of Antequera, Cordoba, Granada, Jaen, Malaga and Sevilla where,
          with us you will find your ideal inland property. If you do not find
          what you are looking for please{" "}
          <Link
            href="/contact"
            className="text-primary-600 underline"
          >
            contact us
          </Link>
          , as we probably have it.
        </p>

        <div className="bg-primary-600 rounded-lg mb-6">
          <h2 className="text-lg font-medium text-white px-6 py-3">
            Property search (advanced)
          </h2>
        </div>

        <form
          className="bg-neutral-50 rounded-lg p-6 mb-8"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Area */}
            <div>
              <label className="block font-medium text-neutral-800 mb-1">
                Area:
              </label>
              <select
                value={filters.regionId}
                onChange={(e) =>
                  setFilters({ ...filters, regionId: e.target.value })
                }
                className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">All</option>
                {regionCounts.map((r) => (
                  <option key={r.regionId} value={r.regionId}>
                    {r.region} ({r.count})
                  </option>
                ))}
              </select>
            </div>

            {/* PropertyType */}
            <div>
              <label className="block font-medium text-neutral-800 mb-1">
                Property Type:
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) =>
                  setFilters({ ...filters, propertyType: e.target.value })
                }
                className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">All</option>
                {propertyTypes.map((t) => (
                  <option key={t.id} value={t.code}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Beds */}
            <div>
              <label className="block font-medium text-neutral-800 mb-1">
                Min. Beds:
              </label>
              <select
                value={filters.minBeds}
                onChange={(e) =>
                  setFilters({ ...filters, minBeds: e.target.value })
                }
                className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">Any</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5+</option>
              </select>
            </div>

            {/* Min Baths */}
            <div>
              <label className="block font-medium text-neutral-800 mb-1">
                Min. Baths:
              </label>
              <select
                value={filters.minBaths}
                onChange={(e) =>
                  setFilters({ ...filters, minBaths: e.target.value })
                }
                className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">Any</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5+</option>
              </select>
            </div>

            {/* Price From */}
            <div>
              <label className="block font-medium text-neutral-800 mb-1">
                Price from:
              </label>
              <select
                value={filters.priceFrom}
                onChange={(e) =>
                  setFilters({ ...filters, priceFrom: e.target.value })
                }
                className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">Any</option>
                <option value="50000">€50,000</option>
                <option value="100000">€100,000</option>
                <option value="150000">€150,000</option>
                <option value="200000">€200,000</option>
                <option value="300000">€300,000</option>
                <option value="500000">€500,000</option>
                <option value="1000000">€1,000,000</option>
              </select>
            </div>

            {/* Price To */}
            <div>
              <label className="block font-medium text-neutral-800 mb-1">
                to:
              </label>
              <select
                value={filters.priceTo}
                onChange={(e) =>
                  setFilters({ ...filters, priceTo: e.target.value })
                }
                className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">Any</option>
                <option value="100000">€100,000</option>
                <option value="150000">€150,000</option>
                <option value="200000">€200,000</option>
                <option value="300000">€300,000</option>
                <option value="500000">€500,000</option>
                <option value="1000000">€1,000,000</option>
                <option value="2000000">€2,000,000+</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="bg-primary-600 text-white font-semibold px-8 py-3 rounded-md shadow hover:bg-primary-700 transition"
            >
              Search
            </button>
          </div>
        </form>

        {/* Search by reference */}
        <div className="bg-primary-600 rounded-lg mb-4">
          <h2 className="text-lg font-medium text-white px-6 py-3">
            Property search by reference
          </h2>
        </div>
        <form
          className="bg-neutral-50 rounded-lg p-6 flex flex-col md:flex-row gap-4 items-center"
          onSubmit={(e) => {
            e.preventDefault();
            const ref = refInput.current?.value.trim();
            if (ref) router.push(`/properties/${ref.toLowerCase()}`);
          }}
        >
          <label className="font-medium text-neutral-800">
            Reference number
          </label>
          <input
            ref={refInput}
            type="text"
            className="flex-1 rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500 px-4 py-2"
            placeholder="Enter reference..."
          />
          <button
            type="submit"
            className="bg-primary-600 text-white font-semibold px-8 py-2 rounded-md shadow hover:bg-primary-700 transition"
          >
            Search
          </button>
        </form>
      </section>

      {/* Right: Sidebar */}
      <div>
        <PromoSidebar />
      </div>
    </div>
  );
}
