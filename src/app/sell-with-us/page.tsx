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
    <div className="mx-auto max-w-7xl px-5 my-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Content */}
      <section className="md:col-span-2 bg-white rounded-xl p-8 border border-black/10">
        <h1 className="text-3xl font-bold text-primary-600 mb-3">
          {t("header.title")}
        </h1>

        <p className="mb-10 text-neutral-600 text-base">{t("intro.paragraph1")}</p>
        <p className="mb-10 text-neutral-600 text-base">{t("intro.paragraph2")}</p>
        <p className="mb-10 text-neutral-600 text-base">{t("intro.paragraph3")}</p>
        <p className="mb-10 text-neutral-600 text-base">{t("intro.paragraph4")}</p>
        <p className="mb-10 text-neutral-600 text-base">{t("intro.paragraph5")}</p>

        <div className="grid grid-cols-1 gap-6 mb-10">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-xl p-8 space-y-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-primary-600 mb-4">
              {t("form.title")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
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

              <div>
                <label className="block text-sm font-medium text-gray-700">
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

              <div>
                <label className="block text-sm font-medium text-gray-700">
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

              <div>
                <label className="block text-sm font-medium text-gray-700">
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

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
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

              <div className="md:col-span-2">
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

              <div className="md:col-span flex gap-2 items-center">
                <label className="block text-sm font-medium text-gray-700">
                  {t("form.fields.captcha.label")}
                </label>
                <span className="text-gray-800">{t("form.fields.captcha.question")}</span>
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
