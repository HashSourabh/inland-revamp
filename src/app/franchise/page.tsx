"use client";

import PromoSidebar from "@/components/PromoSidebar";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function FranchisePage() {
    const t = useTranslations("franchisePage");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        telephone: "",
        email: "",
        comments: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Franchise Form Submitted:", formData);
        // TODO: send to backend or email service
    };

    return (
        <div className="mx-auto max-w-7xl px-5 my-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left: Content */}
            <section className="md:col-span-2 bg-white rounded-xl p-8 border border-black/10">
                <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>
                <div className="prose prose-lg max-w-none mb-10">
                    <p>{t("introParagraph1")}</p>
                    <p>{t("introParagraph2")}</p>
                    <p>{t("introParagraph3")}</p>
                    <p>{t("introParagraph4")}</p>

                    <ul className="list-disc list-inside">
                        <li>{t("requirement1")}</li>
                        <li>{t("requirement2")}</li>
                        <li>{t("requirement3")}</li>
                        <li>{t("requirement4")}</li>
                        <li>{t("requirement5")}</li>
                        <li>{t("requirement6")}</li>
                    </ul>

                    <p>{t("advantageText")}</p>

                    <p className="mt-6 font-medium text-gray-800">
                        {t("callToAction")}
                        <button
                            type="button"
                            className="ml-3 inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-md shadow hover:bg-primary-700 transition"
                            onClick={() => window.open("https://www.youtube.com/watch?v=dummy", "_blank")}
                        >
                            {t("watchVideoButton")}
                        </button>
                        <span className="ml-3">{t("formInstruction")}</span>
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded-xl p-8 space-y-6 border border-gray-200"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t("formLabelFirstName")}</label>
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
                            <label className="block text-sm font-medium text-gray-700">{t("formLabelLastName")}</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">{t("formLabelAddress")}</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t("formLabelTelephone")}</label>
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
                            <label className="block text-sm font-medium text-gray-700">{t("formLabelEmail")}</label>
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
                            <label className="block text-sm font-medium text-gray-700">{t("formLabelComments")}</label>
                            <textarea
                                name="comments"
                                value={formData.comments}
                                onChange={handleChange}
                                rows={5}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full md:w-auto float-end px-6 py-3 bg-primary-600 text-white font-medium rounded-md shadow hover:bg-primary-700 transition"
                        >
                            {t("submitButton")}
                        </button>
                    </div>
                </form>

                <div className="mt-10 text-center prose prose-lg max-w-none mb-10">
                    <p>{t("qrInstruction")}</p>
                    <div className="mt-4 flex gap-8 justify-center">
                        <div className="flex flex-col items-center">
                            <img src="/qr-martin.png" alt={t("qrAltMartin")} className="h-28 w-28" />
                            <span className="mt-2 text-sm text-gray-600">{t("qrNameMartin")}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src="/qr-john.png" alt={t("qrAltJohn")} className="h-28 w-28" />
                            <span className="mt-2 text-sm text-gray-600">{t("qrNameJohn")}</span>
                        </div>
                    </div>
                </div>
            </section>

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
