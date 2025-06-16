"use client";

import { LockClosedIcon, ShieldCheckIcon, UserGroupIcon, HomeIcon, StarIcon } from '@heroicons/react/24/outline';
import PromoSidebar from '@/components/PromoSidebar';

export default function AgentsPrivateAreaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Login & Features */}
      <section className="md:col-span-2 bg-white rounded-xl shadow-lg p-8 border border-neutral-200 flex flex-col items-center">
        <h1 className="font-script text-4xl md:text-5xl font-bold text-neutral-900 mb-6">Agents Private Area</h1>
        <div className="w-full max-w-md bg-primary-50 rounded-xl shadow p-8 mb-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
              <LockClosedIcon className="h-8 w-8 text-primary-600" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-primary-900">Agent Login</h2>
            <p className="mt-2 text-primary-800">Access your private agent area</p>
          </div>
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 px-4 py-2"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 px-4 py-2"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">Remember me</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">Forgot password?</a>
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-primary-700 px-6 py-3 text-base font-semibold text-white shadow-md hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>
        </div>
        {/* Features */}
        <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                <ShieldCheckIcon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">Secure Access</h3>
              <p className="mt-2 text-neutral-600">Your data is protected with industry-standard encryption and security measures</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                <UserGroupIcon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">Agent Resources</h3>
              <p className="mt-2 text-neutral-600">Access exclusive listings, marketing materials, and agent tools</p>
            </div>
          </div>
        </div>
      </section>
      {/* Right: Sidebar (Promos) */}
      <PromoSidebar />
      <style jsx global>{`
        .font-script {
          font-family: 'Dancing Script', cursive;
        }
      `}</style>
    </div>
  );
} 