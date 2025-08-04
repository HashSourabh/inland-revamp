"use client";

import { useState } from "react";
import { HomeIcon, StarIcon } from "@heroicons/react/24/outline";
import PromoSidebar from "@/components/PromoSidebar";

export default function NewsletterPage() {
  const [unsubscribe, setUnsubscribe] = useState(false);
  const [captcha, setCaptcha] = useState("");

  return (
    <div className="mx-auto max-w-7xl px-5 my-10  grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Newsletter Content */}
      <section className="md:col-span-2 bg-white rounded-xl p-8 border border-black/10">
        <h1 className="text-3xl font-bold text-primary-600 dark:text-white mb-6">Subscribe to our Free Newsletter</h1>
        <p className="mb-2 text-neutral-600 text-base">
          Our free monthly Newsletter provides inland news, properties of the month, information about towns and their fiestas and of course, our property promotions.
        </p>
        <p className="mb-8 text-neutral-600 text-base">
          If you would like to register just fill in your name and email address and click on the 'Register' button. It's so simple!
        </p>
        <form className="bg-neutral-50 rounded-xl p-8  mx-auto">
          <h2 className="text-2xl font-semibold text-primary-900 mb-8 text-center">Subscribe to our Free Newsletter</h2>
          <div className="flex flex-col gap-6 mb-4 mx-auto max-w-[600px]">
            <div>
              <label htmlFor="name" className="block font-medium text-neutral-900 mb-1">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full rounded-md border-black/10 focus:border-primary-500/70 focus:ring-0 px-4 py-2"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-medium text-neutral-900 mb-1">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full rounded-md border-black/10 focus:border-primary-500/70 focus:ring-0 px-4 py-2"
                required
              />
            </div>
          </div>
          <div className="flex items-center mb-6 mx-auto max-w-[600px]">
            <input
              id="unsubscribe"
              name="unsubscribe"
              type="checkbox"
              checked={unsubscribe}
              onChange={() => setUnsubscribe(!unsubscribe)}
              className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:outline-none focus:ring-0"
            />
            <label htmlFor="unsubscribe" className="ml-2 text-neutral-600 text-sm">
              Unsubscribe me from this service
            </label>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 mx-auto max-w-[600px]">
            <label htmlFor="captcha" className="font-medium text-base text-neutral-900 flex-shrink-0">
              Captcha <span className="ml-2">9 + 1 =</span>
            </label>
            <input
              type="text"
              id="captcha"
              name="captcha"
              value={captcha}
              onChange={e => setCaptcha(e.target.value)}
              className="w-full md:w-20 min-h-[40px] rounded-md border border-black/10 focus:border-primary-500/70 focus:ring-0 px-3 py-1 text-base font-normal"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-auto rounded-md bg-primary-600 px-8 py-3 text-base font-semibold text-white  hover:bg-primary-900 transition-colors mx-auto block"
          >
            Subscribe
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