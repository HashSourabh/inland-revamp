"use client";

import PromoSidebar from "@/components/PromoSidebar";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function SellWithUsPage() {
  const t = useTranslations("sell-with-us");

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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 lg:gap-8 gap-4">
      {/* Left: Content */}
      <section className="md:col-span-3 lg:col-span-4 bg-white rounded-xl md:p-8 sm:p-6 xs:p-5 p-4 border border-black/10">
        <h1 className="font-heading lg:text-3xl sm:text-2xl text-xl font-bold text-primary-600 lg:mb-6 sm:mb-4 mb-3">
          {t("header.title")}
        </h1>

        <p className="lg:mb-10 md:mb-6 mb-4 text-neutral-600 text-sm sm:text-base lg:text-lg">{t("intro.paragraph1")}</p>
        <p className="lg:mb-10 md:mb-6 mb-4 text-neutral-600 text-sm sm:text-base lg:text-lg">{t("intro.paragraph2")}</p>
        <p className="lg:mb-10 md:mb-6 mb-4 text-neutral-600 text-sm sm:text-base lg:text-lg">{t("intro.paragraph3")}</p>
        <p className="lg:mb-10 md:mb-6 mb-4 text-neutral-600 text-sm sm:text-base lg:text-lg">{t("intro.paragraph4")}</p>
        <p className="lg:mb-10 md:mb-6 mb-4 text-neutral-600 text-sm sm:text-base lg:text-lg">{t("intro.paragraph5")}</p>

        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl lg:p-8 md:p-6 xs:p-5 p-4 space-y-4 sm:space-y-6 border border-gray-200"
          >
            <h2 className="sm:text-xl text-lg font-semibold text-primary-600 sm:mb-4 mb-3">
              {t("form.title")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="col-span-2 lg:col-span-1">
                <label className="block text-sm sm:text-base font-medium text-gray-700">
                  {t("form.fields.firstName.label")}
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div className="col-span-2 lg:col-span-1">
                <label className="block text-sm sm:text-base font-medium text-gray-700">
                  {t("form.fields.lastName.label")}
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div className="col-span-2 lg:col-span-1">
                <label className="block text-sm sm:text-base font-medium text-gray-700">
                  {t("form.fields.telephone.label")}
                </label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div className="col-span-2 lg:col-span-1">
                <label className="block text-sm sm:text-base font-medium text-gray-700">
                  {t("form.fields.email.label")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div className="col-span-2 md:col-span-2">
                <label className="block text-sm sm:text-base font-medium text-gray-700">
                  {t("form.fields.location.label")}
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  {t("form.fields.details.label")}
                </label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  rows={5}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div className="col-span-2 lg:col-span-1 flex gap-2 items-center">
                <label className="block text-sm font-medium text-gray-700">
                  {t("form.fields.captcha.label")}
                </label>
                <span className="text-gray-800 whitespace-nowrap">{t("form.fields.captcha.question")}</span>
                <input
                  type="text"
                  name="captcha"
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto float-end px-6 py-3 bg-primary-600 text-white font-medium rounded-md shadow hover:bg-primary-700 transition"
            >
              {t("form.button.submit")}
            </button>
          </form>
        </div>
      </section>

      {/* Right: Sidebar */}
      <div className="md:col-span-2 lg:col-span-2">
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
