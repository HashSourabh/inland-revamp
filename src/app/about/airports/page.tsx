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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 lg:gap-8 gap-4">
      {/* Left: Airports Content */}
      <section className="md:col-span-3 lg:col-span-4 bg-white rounded-xl md:p-8 sm:p-6 xs:p-5 p-4 border border-black/10">
        <h1 className="font-heading lg:text-3xl sm:text-2xl text-xl font-bold text-primary-600 lg:mb-6 sm:mb-4 mb-3">{t("header.title")}</h1>
        <p className="sm:mb-10 mb-6 text-neutral-600 text-sm sm:text-base lg:text-lg">{t("intro")}</p>

        {/* Málaga Airport */}
        <div className="bg-neutral-50 rounded-lg md:p-6 sm:p-5 xs:p-4 p-3 shadow-sm border border-primary-600/10 flex sm:mb-6 mb-4 flex-col sm:flex-row">
          <div className="flex-initial">
            <Image
              src={malagaairportguide}
              alt={t("airports.malaga.name")}
              width={220}
              height={170}
              className="rounded-lg"
            />
          </div>
          <div className="flex-auto sm:pl-6 mt-3 sm:mt-0">
            <h2 className="md:text-2xl sm:text-xl text-lg font-semibold text-primary-900 sm:mb-2 mb-1">{t("airports.malaga.name")}</h2>
            <p className="text-neutral-600 mb-2 max-w-[500px]">{t("airports.malaga.description")}</p>
            <Link
              href="https://www.aena.es/en/malaga-costa-del-sol.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white md:text-base text-sm font-semibold bg-primary-600 rounded-md sm:py-2.5 py-2 md:px-8 sm:px-6 px-4 sm:mt-2 mt-1 inline-flex items-center justify-center"
            >
              {t("airports.malaga.button")}
            </Link>
          </div>
        </div>

        {/* Granada Airport */}
        <div className="bg-neutral-50 rounded-lg md:p-6 sm:p-5 xs:p-4 p-3 shadow-sm border border-primary-600/10 flex sm:mb-6 mb-4 flex-col sm:flex-row">
          <div className="flex-initial">
            <Image
              src={granadaairport}
              alt={t("airports.granada.name")}
              width={220}
              height={170}
              className="rounded-lg"
            />
          </div>
          <div className="flex-auto sm:pl-6 mt-3 sm:mt-0">
            <h2 className="md:text-2xl sm:text-xl text-lg font-semibold text-primary-900 sm:mb-2 mb-1">{t("airports.granada.name")}</h2>
            <p className="text-neutral-600 mb-2 max-w-[500px]">{t("airports.granada.description")}</p>
            <Link
              href="https://www.aena.es/en/granada.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white md:text-base text-sm font-semibold bg-primary-600 rounded-md sm:py-2.5 py-2 md:px-8 sm:px-6 px-4 sm:mt-2 mt-1 inline-flex items-center justify-center"
            >
              {t("airports.granada.button")}
            </Link>
          </div>
        </div>

        {/* Sevilla Airport */}
        <div className="bg-neutral-50 rounded-lg md:p-6 sm:p-5 xs:p-4 p-3 shadow-sm border border-primary-600/10 flex sm:mb-10 mb-8 flex-col sm:flex-row">
          <div className="flex-initial">
            <Image
              src={sevillaairport}
              alt={t("airports.sevilla.name")}
              width={220}
              height={170}
              className="rounded-lg"
            />
          </div>
          <div className="flex-auto sm:pl-6 mt-3 sm:mt-0">
            <h2 className="md:text-2xl sm:text-xl text-lg font-semibold text-primary-900 sm:mb-2 mb-1">{t("airports.sevilla.name")}</h2>
            <p className="text-neutral-600 mb-2 max-w-[500px]">{t("airports.sevilla.description")}</p>
            <Link
              href="https://www.aena.es/en/sevilla.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white md:text-base text-sm font-semibold bg-primary-600 rounded-md sm:py-2.5 py-2 md:px-8 sm:px-6 px-4 sm:mt-2 mt-1 inline-flex items-center justify-center"
            >
              {t("airports.sevilla.button")}
            </Link>
          </div>
        </div>

        {/* Airlines */}
        <div className="mb-10">
          <h2 className="sm:text-2xl text-xl font-semibold text-primary-900 sm:mb-4 mb-2">{t("airlines.title")}</h2>
          <div className="flex flex-wrap sm:gap-4 gap-2">
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
