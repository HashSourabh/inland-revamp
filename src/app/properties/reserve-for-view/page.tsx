"use client";

import React from "react";
import { HomeIcon, StarIcon, EnvelopeIcon, MapPinIcon, HomeModernIcon, UserCircleIcon} from "@heroicons/react/24/outline";
import PromoSidebar from "@/components/PromoSidebar";

export default function ReserveForView() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Left: Viewing Trip Content */}
      <div className="md:col-span-2">
        <h1 className="font-heading text-3xl font-bold text-primary-600 mb-6">Reserve For Viewing</h1>
        <section className=" bg-white rounded-xl  p-8 border border-black/10 space-y-10 mb-6">
          <div className="grid grid-cols-2 gap-6">
          <div>
            <h1 className="font-heading text-xl font-semibold text-gray-600 mb-6">Customer Details</h1>
            <div className="space-y-4">
              <div className="flex item-center justify-start">
                <div className="mr-2">
                  <UserCircleIcon className="w-6 h-6 text-secondary-600"/>
                </div>
                <div><p className="text-base text-gray-600 font-medium">sourabh odesk</p></div>
              </div>
              <div className="flex item-center justify-start">
                <div className="mr-2">
                  <EnvelopeIcon className="w-6 h-6 text-secondary-600"/>
                </div>
                <div><p className="text-base text-gray-600 font-medium">sourabhodesk@gmail.com</p></div>
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-heading text-xl font-semibold text-gray-600 mb-6">Property Reference</h1>
            <div className="space-y-4">
              <div className="flex item-center justify-start ">
                <div className="mr-2">
                  <HomeModernIcon className="w-6 h-6 text-secondary-600"/>
                </div>
                <div><p className="text-base text-gray-600 font-medium">Town House (TH6194)</p></div>
              </div>
              <div className="flex item-center justify-start ">
                <div className="mr-2">
                  <MapPinIcon className="w-6 h-6 text-secondary-600"/>
                </div>
                <div><p className="text-base text-gray-600 font-medium">Sevilla / Aguadulce</p></div>
              </div>
            </div>
          </div> 
          </div>
        </section>
         <section className=" bg-white rounded-xl  p-8 border border-black/10 space-y-10 mb-6">
          <div>
            <h1 className="font-heading text-xl font-semibold text-gray-600 mb-6">Payment Details</h1>
            <div className="space-y-2">
              <div className="mb-3">
                <div className="mb-2">
                  <label htmlFor="" className="text-gray-600 font-medium">Amount (In Euro) <span>*</span></label>
                  <input type="email" className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500" placeholder="Booking amount in euro" />
                </div>
                <div className="text-gray-500 text-sm font-medium">Please enter amount above 1000</div>
              </div>
              <button className="px-5 text-white bg-secondary-500  border border-secondary-500 min-h-[42px] rounded-md">Continue</button>
            </div>
          </div> 
        </section>
        <section className=" bg-white rounded-xl  p-8 border border-black/10 space-y-10">
          <div>
            <h1 className="font-heading text-xl font-semibold text-gray-600 mb-6">Payment Details</h1>
            <div className="space-y-2">
              <div className="mb-5">
                <div className="mb-2">
                  <label htmlFor="" className="text-gray-600 font-medium">Cardholder Name</label>
                  <input type="email" className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500" />
                </div>
                <div className="text-gray-500 text-sm font-medium">Please enter amount above 1000</div>
              </div>
              <div className="mb-3">
                <div className="mb-2">
                  <label htmlFor="" className="text-gray-600 font-medium">Please enter Card Number, Expiry Date, CVC*, CP** below </label>
                  <input type="email" className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500" placeholder="Booking amount in euro" />
                </div>
                <div className="text-gray-500 text-sm font-medium">*Security code at the back of your card : last 3 digit only</div>
                <div className="text-gray-500 text-sm font-medium">**Enter postcode only if Required</div>
              </div>
              <button className="px-5 text-white bg-secondary-500  border border-secondary-500 min-h-[42px] rounded-md">Reserve Now</button>
            </div>
          </div> 
        </section>
      </div>

    </div>
  );
} 