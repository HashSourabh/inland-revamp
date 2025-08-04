"use client";

import React from "react";
import { HomeIcon, StarIcon } from "@heroicons/react/24/outline";
import PromoSidebar from "@/components/PromoSidebar";

export default function ViewingTripPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Viewing Trip Content */}
      <div className="md:col-span-2">
        <section className=" bg-white rounded-xl  p-8 border border-black/10">
          <h1 className="font-heading text-3xl font-bold text-primary-600 mb-6">Viewing Trip</h1>
          <h2 className="mb-8 text-neutral-600 text-xl">
            Our personalised service on your property inspection visit includes...
          </h2>
          <ul className="list-disc pl-6 space-y-4 text-base mb-8 text-neutral-600">
            <li>
              Prior to arriving, work with our professional team selecting a portfolio of properties to view. This will include having your specific questions answered by email and or telephone.
            </li>
            <li>
              Our team will take you out and about to view your selected properties and surrounding areas.
            </li>
            <li>
              We will provide you with a comprehensive buying guide. When you have found the perfect property we will assist you with the full process during and after your purchase. We are not just a real estate agency, we are your one stop shopping agency.
            </li>
            <li>
              Speak to your property Specialist with regards to places you can stay while here, they can send you details of local B&B´s and hotels and you can then choose which is the right one for you.
            </li>
          </ul>
        </section>
      </div>

      {/* Right: Sidebar (same as advanced search page) */}
      <PromoSidebar />
    </div>
  );
} 