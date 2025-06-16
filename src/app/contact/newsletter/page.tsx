"use client";

import { useState } from "react";
import { HomeIcon, StarIcon } from "@heroicons/react/24/outline";
import PromoSidebar from "@/components/PromoSidebar";

export default function NewsletterPage() {
  const [unsubscribe, setUnsubscribe] = useState(false);
  const [captcha, setCaptcha] = useState("");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Newsletter Content */}
      <section className="md:col-span-2 bg-white rounded-xl shadow-lg p-8 border border-neutral-200">
        <h1 className="font-script text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Subscribe to our Free Newsletter</h1>
        <p className="mb-2 text-neutral-800 text-lg">
          Our free monthly Newsletter provides inland news, properties of the month, information about towns and their fiestas and of course, our property promotions.
        </p>
        <p className="mb-8 text-neutral-800 text-lg">
          If you would like to register just fill in your name and email address and click on the 'Register' button. It's so simple!
        </p>
        <form className="bg-neutral-50 rounded-xl p-8 shadow-inner border border-neutral-200 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-primary-800 mb-8 text-center">Subscribe to our Free Newsletter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label htmlFor="name" className="block font-semibold text-neutral-900 mb-2">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500 px-4 py-2"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-semibold text-neutral-900 mb-2">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500 px-4 py-2"
                required
              />
            </div>
          </div>
          <div className="flex items-center mb-6">
            <input
              id="unsubscribe"
              name="unsubscribe"
              type="checkbox"
              checked={unsubscribe}
              onChange={() => setUnsubscribe(!unsubscribe)}
              className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="unsubscribe" className="ml-2 text-neutral-700">
              Unsubscribe me from this service
            </label>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
            <label htmlFor="captcha" className="font-bold text-lg text-neutral-900 flex-shrink-0">
              Captcha <span className="ml-2">9 + 1 =</span>
            </label>
            <input
              type="text"
              id="captcha"
              name="captcha"
              value={captcha}
              onChange={e => setCaptcha(e.target.value)}
              className="w-full md:w-48 rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500 px-4 py-2 text-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-auto rounded-md bg-primary-700 px-8 py-3 text-base font-semibold text-white shadow-md hover:bg-primary-800 transition-colors mx-auto block"
          >
            SUBSCRIBE
          </button>
        </form>
      </section>

      {/* Right: Sidebar (Promos) */}
      <PromoSidebar />
      <style jsx global>{`
        .font-script {
          font-family: 'Dancing Script', cursive;
        }
      `}</style>
    </div>
  );
} 