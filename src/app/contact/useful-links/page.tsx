"use client";

import React from "react";
import {
  HomeIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  TruckIcon,
  HeartIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface LinkCategory {
  title: string;
  icon: React.ReactNode;
  links: {
    title: string;
    url: string;
    description: string;
  }[];
}

export default function UsefulLinksPage() {
  const t = useTranslations("contact-us.useful-links");

  const categories: LinkCategory[] = [
    {
      title: t("categories.property-legal.title"),
      icon: <HomeIcon className="h-6 w-6" />,
      links: [
        {
          title: t("categories.property-legal.links.0.title"),
          url: t("categories.property-legal.links.0.url"),
          description: t("categories.property-legal.links.0.description"),
        },
        {
          title: t("categories.property-legal.links.1.title"),
          url: t("categories.property-legal.links.1.url"),
          description: t("categories.property-legal.links.1.description"),
        }
      ]
    },
    {
      title: t("categories.government-administration.title"),
      icon: <BuildingOfficeIcon className="h-6 w-6" />,
      links: [
        {
          title: t("categories.government-administration.links.0.title"),
          url: t("categories.government-administration.links.0.url"),
          description: t("categories.government-administration.links.0.description"),
        },
        {
          title: t("categories.government-administration.links.1.title"),
          url: t("categories.government-administration.links.1.url"),
          description: t("categories.government-administration.links.1.description"),
        }
      ]
    },
    {
      title: t("categories.tourism-culture.title"),
      icon: <GlobeAltIcon className="h-6 w-6" />,
      links: [
        {
          title: t("categories.tourism-culture.links.0.title"),
          url: t("categories.tourism-culture.links.0.url"),
          description: t("categories.tourism-culture.links.0.description"),
        },
        {
          title: t("categories.tourism-culture.links.1.title"),
          url: t("categories.tourism-culture.links.1.url"),
          description: t("categories.tourism-culture.links.1.description"),
        }
      ]
    },
    {
      title: t("categories.education.title"),
      icon: <AcademicCapIcon className="h-6 w-6" />,
      links: [
        {
          title: t("categories.education.links.0.title"),
          url: t("categories.education.links.0.url"),
          description: t("categories.education.links.0.description"),
        },
        {
          title: t("categories.education.links.1.title"),
          url: t("categories.education.links.1.url"),
          description: t("categories.education.links.1.description"),
        }
      ]
    },
    {
      title: t("categories.moving-relocation.title"),
      icon: <TruckIcon className="h-6 w-6" />,
      links: [
        {
          title: t("categories.moving-relocation.links.0.title"),
          url: t("categories.moving-relocation.links.0.url"),
          description: t("categories.moving-relocation.links.0.description"),
        },
        {
          title: t("categories.moving-relocation.links.1.title"),
          url: t("categories.moving-relocation.links.1.url"),
          description: t("categories.moving-relocation.links.1.description"),
        }
      ]
    },
    {
      title: t("categories.healthcare.title"),
      icon: <HeartIcon className="h-6 w-6" />,
      links: [
        {
          title: t("categories.healthcare.links.0.title"),
          url: t("categories.healthcare.links.0.url"),
          description: t("categories.healthcare.links.0.description"),
        },
        {
          title: t("categories.healthcare.links.1.title"),
          url: t("categories.healthcare.links.1.url"),
          description: t("categories.healthcare.links.1.description"),
        }
      ]
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 my-10">
      {/* Hero Section */}
      <div className="lg:mb-8 sm:mb-6 mb-4 bg-white rounded-xl md:p-8 sm:p-6 xs:p-5 p-4 border border-black/10">
        <h1 className="font-heading lg:text-3xl sm:text-2xl text-xl font-bold text-primary-600 lg:mb-6 sm:mb-4 mb-3">
          {t("header.title")}
        </h1>
        <p className="text-base text-neutral-600 m-0">
          {t("header.description")}
        </p>
      </div>

      {/* Links Grid */}
      <div className="grid gap-2 2xs:gap-4 sm:gap-6 lg:gap-8 md:grid-cols-2">
        {categories.map((category, index) => (
          <div key={index} className="bg-white rounded-xl md:p-8 sm:p-6 xs:p-5 p-4 border border-black/10">
            <div className="sm:mb-6 mb-4 flex items-center gap-3">
              <div className="flex 2xs:h-12 2xs:w-12 h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                {category.icon}
              </div>
              <h2 className="sm:text-xl text-lg font-semibold text-primary-900">
                {category.title}
              </h2>
            </div>
            <div className="2xs:space-y-4 space-y-2">
              {category.links.map((link, linkIndex) => (
                <Link
                  key={linkIndex}
                  href={link.url}
                  className="block rounded-lg border border-black/10 sm:p-4 p-3 transition-colors hover:border-primary-500 hover:bg-primary-50"
                >
                  <h3 className="font-semibold text-neutral-900">
                    {link.title}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600">
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
