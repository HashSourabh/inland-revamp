"use client";

import Image from "next/image";
import Link from "next/link";
import PromoSidebar from "@/components/PromoSidebar";
import malagaairportguide from "@/assets/images/malagaairportguide.jpg";
import granadaairport from "@/assets/images/granadaairport.jpg";
import sevillaairport from "@/assets/images/sevillaairport.jpg";
import { useTranslations } from "next-intl";

export default function AboutAirportsPage() {
  const t = useTranslations("about-us.airports");

  return (
    <div className="mx-auto max-w-7xl px-5 my-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Airports Content */}
      <section className="md:col-span-2 bg-white rounded-xl p-8 border border-black/10">
        <h1 className="text-3xl font-bold text-primary-600 mb-3">{t("header.title")}</h1>
        <p className="mb-10 text-neutral-600 text-base">{t("intro")}</p>

        {/* Málaga Airport */}
        <div className="bg-neutral-50 rounded-lg p-6 shadow-sm border border-primary-600/10 flex mb-6">
          <div className="flex-initial">
            <Image
              src={malagaairportguide}
              alt={t("airports.malaga.name")}
              width={220}
              height={170}
              className="rounded-lg"
            />
          </div>
          <div className="flex-auto pl-6">
            <h2 className="text-2xl font-semibold text-primary-900 mb-2">{t("airports.malaga.name")}</h2>
            <p className="text-neutral-600 mb-2 max-w-[500px]">{t("airports.malaga.description")}</p>
            <Link
              href="https://www.aena.es/en/malaga-costa-del-sol.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-base font-semibold bg-primary-600 rounded-md py-2.5 hover:bg-primary-900 px-8 mt-2 inline-flex items-center justify-center"
            >
              {t("airports.malaga.button")}
            </Link>
          </div>
        </div>

        {/* Granada Airport */}
        <div className="bg-neutral-50 rounded-lg p-6 shadow-sm border border-primary-600/10 flex mb-6">
          <div className="flex-initial">
            <Image
              src={granadaairport}
              alt={t("airports.granada.name")}
              width={220}
              height={170}
              className="rounded-lg"
            />
          </div>
          <div className="flex-auto pl-6">
            <h2 className="text-2xl font-semibold text-primary-900 mb-2">{t("airports.granada.name")}</h2>
            <p className="text-neutral-600 mb-2 max-w-[500px]">{t("airports.granada.description")}</p>
            <Link
              href="https://www.aena.es/en/granada.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-base font-semibold bg-primary-600 rounded-md py-2.5 hover:bg-primary-900 px-8 mt-2 inline-flex items-center justify-center"
            >
              {t("airports.granada.button")}
            </Link>
          </div>
        </div>

        {/* Sevilla Airport */}
        <div className="bg-neutral-50 rounded-lg p-6 shadow-sm border border-primary-600/10 flex mb-10">
          <div className="flex-initial">
            <Image
              src={sevillaairport}
              alt={t("airports.sevilla.name")}
              width={220}
              height={170}
              className="rounded-lg"
            />
          </div>
          <div className="flex-auto pl-6">
            <h2 className="text-2xl font-semibold text-primary-900 mb-2">{t("airports.sevilla.name")}</h2>
            <p className="text-neutral-600 mb-2 max-w-[500px]">{t("airports.sevilla.description")}</p>
            <Link
              href="https://www.aena.es/en/sevilla.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-base font-semibold bg-primary-600 rounded-md py-2.5 hover:bg-primary-900 px-8 mt-2 inline-flex items-center justify-center"
            >
              {t("airports.sevilla.button")}
            </Link>
          </div>
        </div>

        {/* Airlines */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-primary-900 mb-4">{t("airlines.title")}</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="https://www.iberia.com/" target="_blank" rel="noopener noreferrer" className="inline-block bg-slate-100 hover:bg-primary-100 font-medium rounded px-5 text-sm py-2.5 text-primary-900 border border-primary-600/10 hover:shadow-md cursor-pointer">{t("airlines.list.0")}</Link>
            <Link href="https://www.easyjet.com/" target="_blank" rel="noopener noreferrer" className="inline-block bg-slate-100 hover:bg-primary-100 font-medium rounded px-5 text-sm py-2.5 text-primary-900 border border-primary-600/10 hover:shadow-md cursor-pointer">{t("airlines.list.1")}</Link>
            <Link href="https://www.tui.co.uk/flight/" target="_blank" rel="noopener noreferrer" className="inline-block bg-slate-100 hover:bg-primary-100 font-medium rounded px-5 text-sm py-2.5 text-primary-900 border border-primary-600/10 hover:shadow-md cursor-pointer">{t("airlines.list.2")}</Link>
            <Link href="https://www.flybe.com/" target="_blank" rel="noopener noreferrer" className="inline-block bg-slate-100 hover:bg-primary-100 font-medium rounded px-5 text-sm py-2.5 text-primary-900 border border-primary-600/10 hover:shadow-md cursor-pointer">{t("airlines.list.3")}</Link>
            <Link href="https://www.ba.com/" target="_blank" rel="noopener noreferrer" className="inline-block bg-slate-100 hover:bg-primary-100 font-medium rounded px-5 text-sm py-2.5 text-primary-900 border border-primary-600/10 hover:shadow-md cursor-pointer">{t("airlines.list.4")}</Link>
            <Link href="https://www.ryanair.com/" target="_blank" rel="noopener noreferrer" className="inline-block bg-slate-100 hover:bg-primary-100 font-medium rounded px-5 text-sm py-2.5 text-primary-900 border border-primary-600/10 hover:shadow-md cursor-pointer">{t("airlines.list.5")}</Link>
            <Link href="https://www.monarch.co.uk/" target="_blank" rel="noopener noreferrer" className="inline-block bg-slate-100 hover:bg-primary-100 font-medium rounded px-5 text-sm py-2.5 text-primary-900 border border-primary-600/10 hover:shadow-md cursor-pointer">{t("airlines.list.6")}</Link>
            <Link href="https://www.clickair.com/" target="_blank" rel="noopener noreferrer" className="inline-block bg-slate-100 hover:bg-primary-100 font-medium rounded px-5 text-sm py-2.5 text-primary-900 border border-primary-600/10 hover:shadow-md cursor-pointer">{t("airlines.list.7")}</Link>
          </div>
        </div>

        <div className="text-sm text-neutral-600">
          <p>
            {t("footerNote")}{" "}
            <a href="https://www.flightstats.com/" target="_blank" rel="noopener noreferrer" className="text-primary-700 underline">flightstats.com</a>.
          </p>
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
