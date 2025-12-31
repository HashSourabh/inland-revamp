"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import PromoSidebar from "@/components/PromoSidebar";
import Mapimage from "@/assets/images/AndaluciaMap.gif";

export default function AboutLocationPage() {
  const t = useTranslations("about-us");

  return (
    <div className="mx-auto max-w-7xl px-5 my-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Location Content */}
      <section className="md:col-span-2 bg-white rounded-xl p-8 border border-black/10">
        <h1 className="text-3xl  font-bold text-primary-600 mb-6">{t("location.header.title")}</h1>

        <p className="mb-4 text-neutral-600 text-base">{t("location.content.paragraph1")}</p>
        <p className="mb-4 text-neutral-600 text-base">{t("location.content.paragraph2")}</p>
        <p className="mb-4 text-neutral-600 text-base">{t("location.content.paragraph3")}</p>

        <div className="mt-8 mb-8 flex justify-center">
          <Image
            src={Mapimage}
            alt={t("images.map")}
            width={650}
            height={350}
            className=""
          />
        </div>

        <p className="mb-4 text-neutral-600 text-base">{t("location.content.paragraph4")}</p>
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
