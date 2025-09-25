"use client";

import PromoSidebar from "@/components/PromoSidebar";
import { useState } from "react";

export default function FranchisePage() {
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
            <section className="md:col-span-2 bg-white rounded-xl  p-8 border border-black/10">
                <h1 className="text-3xl font-bold mb-6">FRANCHISE PROFILE</h1>
                <div className="prose prose-lg max-w-none mb-10">
                    <p>
                        If you are inspired by real estate business.
                    </p>
                    <p>
                        You like the south of Spain (Andalucia) and living in a calm town as part of a community and you are dreaming
                        for a life changing experience, then we have the perfect chance for you.
                    </p>
                    <p>
                        <strong>INLAND ANDALUCIA FRANCHISE</strong> offers you the opportunity to start a new life in Andalucia plenty
                        of sun and stress free lifestyle, surrounded by nature and a very good income, with no ceiling on your
                        earnings.
                    </p>
                    <p>
                        <strong>INLAND ANDALUCIA</strong> is a self-employment business ideal for an individual or family with the
                        following requirements:
                    </p>

                    <ul className="list-disc list-inside">
                        <li>English native speaking.</li>
                        <li>Commercial attitude.</li>
                        <li>Basic Computer skills.</li>
                        <li>Economic solvency.</li>
                        <li>Country lover.</li>
                        <li>Willing to be a part of a network.</li>
                    </ul>

                    <p>
                        It would be advantageous to have real estate experience and being Spanish speaking
                    </p>

                    <p className="mt-6 font-medium text-gray-800">
                        Want to know more ?
                        <button
                            type="button"
                            className="ml-3 inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-md shadow hover:bg-primary-700 transition"
                            onClick={() => window.open("https://www.youtube.com/watch?v=dummy", "_blank")}
                        >
                            ▶ Watch video
                        </button>
                        <span className="ml-3">
                            OR You can complete the form below and we will make contact to arrange a meeting :
                        </span>
                    </p>
                </div>
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

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
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
                            <label className="block text-sm font-medium text-gray-700">Comments</label>
                            <textarea
                                name="comments"
                                value={formData.comments}
                                onChange={handleChange}
                                rows={5}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full md:w-auto float-end px-6 py-3 bg-primary-600 text-white font-medium rounded-md shadow hover:bg-primary-700 transition"
                    >
                        Submit Franchise Profile
                    </button>
                </form>
                <div className="mt-10 text-center prose prose-lg max-w-none mb-10">
                    <p>
                        Scan the below QR-code with your mobile to autosave our contact details
                    </p>
                    <div className=" mt-4 flex gap-8 justify-center">
                        <div className="flex flex-col items-center">
                            <img src="/qr-martin.png" alt="Martin Gillen QR" className="h-28 w-28" />
                            <span className="mt-2 text-sm text-gray-600">Martin Gillen</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src="/qr-john.png" alt="John Gillen QR" className="h-28 w-28" />
                            <span className="mt-2 text-sm text-gray-600">John Gillen</span>
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
