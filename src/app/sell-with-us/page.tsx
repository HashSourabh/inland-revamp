"use client";

import PromoSidebar from "@/components/PromoSidebar";
import { useState } from "react";

export default function SellWithUsPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    telephone: "",
    email: "",
    location: "",
    details: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // TODO: connect with API / send email
  };

  return (
    <div className="mx-auto max-w-7xl px-5 my-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Airports Content */}
      <section className="md:col-span-2 bg-white rounded-xl  p-8 border border-black/10">
        <h1 className="text-3xl font-bold text-primary-600 mb-3">Let us Sell your property</h1>

        <p className="mb-10 text-neutral-600 text-base">
          We are Andalucia&apos;s largest most trusted Estate Agent, established for more than 20 years, we have sold
          1,000&apos;s of properties across all of Inland Andalucia.
        </p>
        <p className="mb-10 text-neutral-600 text-base">
          We advertise across more than 30 online portals across all of Europe and publish on all the main Social Media
          platforms including Facebook reaching over 100,000 people a month, Telegram, Instagram and YouTube getting
          over 70,000 views each month. We also send weekly newsletters to over 14,500 subscribers watching new listings
          and price drops. This marketing provides us with more than 550 new buyer enquiries each month.
        </p>
        <p className="mb-10 text-neutral-600 text-base">
          Our professional multilingual listing staff use the very latest in digital technology to take high quality
          photographs and videos of your property. See what our Vendors and Clients say.
        </p>
        <p className="mb-10 text-neutral-600 text-base">
          We have an extensive database of clients ready to purchase property in Andalucia and our property experts are
          constantly informing buyers of the latest deals to be had.
        </p>
        <p className="mb-10 text-neutral-600 text-base">
          Selling your property through us you&apos;re in Safe Hands. Please fill in the form below and we will contact
          you as soon as possible or call <strong>+34 952 741 525</strong>.
        </p>
        <div className="grid grid-cols-1 gap-6 mb-10">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-xl p-8 space-y-6 border border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Telephone</label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Property Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Property Details</label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  rows={5}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div className="md:col-span flex gap-2">
                <label className="block text-sm font-medium text-gray-700">Captcha</label>
                <h1>40 + 5 = </h1>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
                <span></span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto float-end px-6 py-3 bg-primary-600 text-white font-medium rounded-md shadow hover:bg-primary-700 transition"
            >
              Submit Property
            </button>
          </form>
        </div>
      </section>

      {/* Right: Sidebar (Promos) */}
      <div>
        <PromoSidebar />
      </div>
      <style jsx global>{`
        .font-script {
          font-family: 'Dancing Script', cursive;
        }
      `}</style>
    </div>
  );
}
