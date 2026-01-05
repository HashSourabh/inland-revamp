"use client";

import { useState } from "react";
import PromoSidebar from "@/components/PromoSidebar";
import { useTranslations } from "next-intl";

export default function NewsletterPage() {
  const t = useTranslations("contact-us.newsletter");
  const [unsubscribe, setUnsubscribe] = useState(false);
  const [captcha, setCaptcha] = useState("");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 lg:gap-8 gap-4">
      {/* Left: Newsletter Content */}
      <section className="md:col-span-3 lg:col-span-4 bg-white rounded-xl md:p-8 sm:p-6 xs:p-5 p-4 border border-black/10">
        <h1 className="font-heading lg:text-3xl sm:text-2xl text-xl font-bold text-primary-600 lg:mb-6 sm:mb-4 mb-3">
          {t("header.title")}
        </h1>

        <p className="sm:mb-10 mb-6 text-neutral-600 text-sm sm:text-base lg:text-lg">
          {t("intro.paragraph1")}
        </p>
        <p className="sm:mb-10 mb-6 text-neutral-600 text-sm sm:text-base lg:text-lg">
          {t("intro.paragraph2")}
        </p>

        <form className="bg-neutral-50 rounded-xl lg:p-8 md:p-6 xs:p-5 p-4 mx-auto">
          <h2 className="sm:text-2xl text-xl font-semibold text-primary-900 sm:mb-8 mb-6 text-center">
            {t("form.title")}
          </h2>

          <div className="flex flex-col sm:gap-6 gap-4 mb-4 mx-auto max-w-[600px]">
            <div>
              <label
                htmlFor="name"
                className="block font-medium text-neutral-900 sm:mb-1 mb-0.5 text-sm sm:text-base"
              >
                {t("form.fields.name.label")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full rounded-md border-black/10 focus:border-primary-500/70 focus:ring-0 px-4 py-2"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-medium text-neutral-900 sm:mb-1 mb-0.5 text-sm sm:text-base"
              >
                {t("form.fields.email.label")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full rounded-md border-black/10 focus:border-primary-500/70 focus:ring-0 px-4 py-2"
                required
              />
            </div>
          </div>

          <div className="flex items-center sm:mb-6 mb-4 mx-auto max-w-[600px]">
            <input
              id="unsubscribe"
              name="unsubscribe"
              type="checkbox"
              checked={unsubscribe}
              onChange={() => setUnsubscribe(!unsubscribe)}
              className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:outline-none focus:ring-0"
            />
            <label
              htmlFor="unsubscribe"
              className="ml-2 text-neutral-600 sm:text-base text-sm"
            >
              {t("form.fields.unsubscribe.label")}
            </label>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:mb-8 mb-4 mx-auto max-w-[600px]">
            <label
              htmlFor="captcha"
              className="font-medium sm:text-base text-sm text-neutral-900 flex-shrink-0"
            >
              {t("form.fields.captcha.label")}
              <span className="ml-2">{t("form.fields.captcha.question")}</span>
            </label>
            <input
              type="text"
              id="captcha"
              name="captcha"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
              className="w-full md:w-20 min-h-[40px] rounded-md border border-black/10 focus:border-primary-500/70 focus:ring-0 px-3 py-1 text-base font-normal"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full md:w-auto rounded-md bg-primary-600 px-8 py-3 text-base font-semibold text-white hover:bg-primary-900 transition-colors mx-auto block"
          >
            {t("form.button.subscribe")}
          </button>
        </form>
      </section>

      {/* Right: Sidebar (Promos) */}
      <div className="md:col-span-2 lg:col-span-2">
        <PromoSidebar />
      </div>

      <style jsx global>{`
        .font-script {
          font-family: "Dancing Script", cursive;
        }
      `}</style>
    </div>
  );
}
