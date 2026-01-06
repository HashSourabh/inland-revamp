"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import PromoSidebar from "@/components/PromoSidebar";
import Mapimage from "@/assets/images/AndaluciaMap.gif";

export default function AboutLocationPage() {
  const t = useTranslations("about-us");
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 lg:gap-8 gap-4">
      {/* Left: Location Content */}
      <section className="md:col-span-3 lg:col-span-4 bg-white rounded-xl md:p-8 sm:p-6 xs:p-5 p-4 border border-black/10">
        <h1 className="font-heading lg:text-3xl sm:text-2xl text-xl font-bold text-primary-600 lg:mb-6 sm:mb-4 mb-3">{t("location.header.title")}</h1>

        <p className="mb-4 text-neutral-600 text-sm sm:text-base lg:text-lg">{t("location.content.paragraph1")}</p>
        <p className="mb-4 text-neutral-600 text-sm sm:text-base lg:text-lg">{t("location.content.paragraph2")}</p>
        <p className="mb-4 text-neutral-600 text-sm sm:text-base lg:text-lg">{t("location.content.paragraph3")}</p>

        <div className="mt-8 mb-8 flex justify-center">
          <Image
            src={Mapimage}
            alt={t("images.map")}
            width={650}
            height={350}
            className=""
          />
        </div>
        <p className="mb-4 text-neutral-600 text-sm sm:text-base lg:text-lg">{t("location.content.paragraph4")}</p>
      </section>

      {/* Right: Sidebar (Promos) */}
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
