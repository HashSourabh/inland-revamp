"use client";

import React from "react";
import { HomeIcon, StarIcon } from "@heroicons/react/24/outline";
import PromoSidebar from "@/components/PromoSidebar";

export default function ViewingTripPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Viewing Trip Content */}
      <section className="md:col-span-2 bg-white rounded-xl shadow-lg p-8 border border-neutral-200">
        <h1 className="font-script text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Viewing Trip</h1>
        <h2 className="text-xl md:text-2xl font-semibold italic text-blue-700 mb-6">
          Our personalised service on your property inspection visit includes...
        </h2>
        <ul className="list-disc pl-6 space-y-4 text-lg text-neutral-800">
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

      {/* Right: Sidebar (same as advanced search page) */}
      <PromoSidebar />
    </div>
  );
} 