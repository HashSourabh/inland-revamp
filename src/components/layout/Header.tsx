"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import MobileMenu from './MobileMenu';
import Navigation from './Navigation';
import LanguageSwitcher from '../LanguageSwitcher';
import { useAuth } from '@/context/AuthContext';
import dynamic from 'next/dynamic';
import ConfirmDialog from '../shared/ConfirmDialog';
import { Toaster } from 'react-hot-toast';
const AuthModal = dynamic(() => import('../auth/AuthModal'), { ssr: false });

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const tCta = useTranslations('cta');
  const { user, openAuth, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full fixed top-0 left-0 right-0 z-50 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      {/* Top bar with contact info and language selector */}
      <div className="transition-all duration-300 py-2 bg-primary-600">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <a href="tel:+34952741525" className="flex items-center text-sm text-white hover:text-primary-200 transition-colors">
              <PhoneIcon className="mr-1 h-4 w-4" />
              <span>+34 952 741 525</span>
            </a>
            <a href="mailto:info@inlandandalucia.com" className="flex items-center text-sm text-white hover:text-primary-200 transition-colors">
              <EnvelopeIcon className="mr-1 h-4 w-4" />
              <span>info@inlandandalucia.com</span>
            </a>
          </div>
          <div className="relative flex items-center space-x-3">
            <LanguageSwitcher />
            {!user ? (
              <a
                href="#auth"
                onClick={(e) => { e.preventDefault(); openAuth('login'); }}
                className="text-sm text-white/90 hover:text-white underline-offset-4 hover:underline"
              >
                Login / Register
              </a>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(v => !v)}
                  className="flex items-center gap-2 text-white/90 hover:text-white"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-primary-700 border border-white/60 text-sm font-medium">
                    👤
                  </span>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-2 shadow-lg z-50">
                    <Link href="/account" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">My Profile</Link>
                    <a
                      href="#logout"
                      onClick={(e) => { e.preventDefault(); setProfileOpen(false); setLogoutConfirmOpen(true); }}
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="transition-all duration-300 py-3 bg-white/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-48">
              <svg width="150" height="40" viewBox="0 0 1220 328" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M144.656 1.03472L145.437 0.999869C150.98 0.765779 156.439 1.40998 161.86 2.55809C171.474 4.59521 181.03 7.54902 190.516 10.1419L239.934 23.7923C248.811 26.3304 257.713 28.7767 266.641 31.1313C272.577 32.7083 278.808 34.0378 284.571 36.1723C286.839 37.0122 288.732 38.2782 290.471 39.9624C293.065 42.4749 294.372 44.8854 295.157 48.3977C296.829 55.8895 295.866 64.9788 295.848 72.7019L295.822 111.228C284.38 112.184 273.009 113.214 261.691 115.221C257.395 116.014 253.121 116.913 248.871 117.921C244.619 118.928 240.397 120.041 236.202 121.26C232.007 122.48 227.845 123.804 223.717 125.233C219.588 126.661 215.498 128.192 211.447 129.826C207.395 131.461 203.387 133.195 199.423 135.031C195.458 136.866 191.543 138.8 187.676 140.832C183.809 142.864 179.995 144.992 176.235 147.217C172.474 149.44 168.773 151.757 165.129 154.167L157.254 150.103C127.558 133.519 90.0192 120.245 56.4416 115.323C38.0709 112.63 19.4616 111.991 0.927429 111.393L0.816645 71.6307C0.797882 64.5544 0.173361 56.8294 1.19639 49.8407C1.63866 46.8189 2.47047 43.6775 4.46917 41.2982C6.24361 39.1851 8.70871 37.3052 11.2828 36.2956C17.2306 33.9619 23.7843 32.6199 29.9546 30.9482L62.1509 22.1144L103.637 10.6288C117.072 6.83781 130.686 2.08901 144.656 1.03472Z" fill="rgb(var(--color-primary))" />
                <path d="M0.950707 141.12C48.2976 139.127 97.5405 151.819 138.573 175.389C118.205 192.478 102.118 214.04 88.4565 236.69C86.1085 240.636 83.8703 244.644 81.7421 248.713C79.6144 252.783 77.5997 256.907 75.6978 261.087C73.7964 265.267 72.0113 269.496 70.3423 273.774C68.6727 278.052 67.1219 282.372 65.69 286.736C51.9001 279.666 37.5804 272.832 26.4924 261.742C2.57237 237.817 0.915861 211.067 0.877441 179.361L0.950707 141.12Z" fill="rgb(var(--color-secondary))" />
                <path d="M291.169 140.409C292.601 140.168 294.229 140.269 295.684 140.229C295.794 151.279 295.821 162.328 295.766 173.378C292.677 173.71 289.598 174.117 286.529 174.6C283.459 175.083 280.404 175.64 277.362 176.273C274.32 176.906 271.295 177.613 268.287 178.394C265.28 179.175 262.294 180.029 259.329 180.957C256.363 181.884 253.423 182.884 250.506 183.956C247.59 185.028 244.702 186.17 241.842 187.384C238.981 188.598 236.152 189.881 233.354 191.233C230.557 192.585 227.795 194.006 225.068 195.493C191.016 213.74 160.492 243.007 142.429 277.36C135.386 290.756 130.219 304.953 125.845 319.413C119.71 316.211 113.596 312.967 107.505 309.682L92.7898 301.846C100.959 273.551 116.394 245.764 135.1 223.089C169.057 181.928 215.303 153.2 267.995 143.32C275.675 141.88 283.399 141.157 291.169 140.409Z" fill="rgb(var(--color-secondary))" />
                <path d="M294.525 203.863L294.983 203.866L295.372 204.519C294.632 212.411 293.441 220.247 290.926 227.791C286.252 241.813 278.581 254.425 267.708 264.527C255.618 275.76 239.953 283.211 225.457 290.8L196.406 306.132C183.242 313.082 170.371 320.634 157.072 327.321L156.604 327.249L156.339 326.309C160.781 303.614 177.019 278.74 192.089 261.531C215.898 234.342 257.836 206.278 294.525 203.863Z" fill="rgb(var(--color-secondary))" />
                <path d="M389 170V16H417.786V170H389Z" fill="rgb(var(--color-primary))" />
                <path d="M460.826 170V16H489.612L562.02 123.8V16H590.806V170H562.02L489.612 62.42V170H460.826Z" fill="rgb(var(--color-primary))" />
                <path d="M633.632 170V16H662.417V147.56H713.26L705.014 170H633.632Z" fill="rgb(var(--color-primary))" />
                <path d="M729.46 170L785.924 16H818.475L875.161 170H844.825L796.332 31.84H808.067L759.574 170H729.46ZM755.588 134.58L763.338 112.14H841.282L849.032 134.58H755.588Z" fill="rgb(var(--color-primary))" />
                <path d="M908.337 170V16H937.123L1009.53 123.8V16H1038.32V170H1009.53L937.123 62.42V170H908.337Z" fill="rgb(var(--color-primary))" />
                <path d="M1081.14 170V16H1134.51C1152.66 16 1167.57 19.2267 1179.24 25.68C1191.05 31.9867 1199.75 40.9333 1205.36 52.52C1211.12 63.96 1214 77.4533 1214 93C1214 108.547 1211.12 122.113 1205.36 133.7C1199.75 145.14 1191.05 154.087 1179.24 160.54C1167.57 166.847 1152.66 170 1134.51 170H1081.14ZM1109.93 145.58H1132.96C1145.95 145.58 1156.13 143.527 1163.51 139.42C1171.04 135.167 1176.43 129.153 1179.68 121.38C1182.93 113.46 1184.55 104 1184.55 93C1184.55 82.1467 1182.93 72.76 1179.68 64.84C1176.43 56.92 1171.04 50.8333 1163.51 46.58C1156.13 42.3267 1145.95 40.2 1132.96 40.2H1109.93V145.58Z" fill="rgb(var(--color-primary))" />
                <path d="M360 314.309L395.701 215.691H416.282L452.123 314.309H432.942L402.281 225.834H409.702L379.041 314.309H360ZM376.521 291.627L381.421 277.257H430.702L435.603 291.627H376.521Z" fill="rgb(var(--color-primary))" />
                <path d="M473.1 314.309V215.691H491.3L537.082 284.724V215.691H555.283V314.309H537.082L491.3 245.417V314.309H473.1Z" fill="rgb(var(--color-primary))" />
                <path d="M582.36 314.309V215.691H616.102C627.582 215.691 637.009 217.757 644.382 221.89C651.849 225.928 657.356 231.657 660.903 239.077C664.543 246.403 666.363 255.044 666.363 265C666.363 274.956 664.543 283.644 660.903 291.064C657.356 298.39 651.849 304.119 644.382 308.251C637.009 312.29 627.582 314.309 616.102 314.309H582.36ZM600.561 298.671H615.121C623.335 298.671 629.775 297.356 634.442 294.727C639.202 292.003 642.609 288.152 644.662 283.174C646.716 278.102 647.743 272.044 647.743 265C647.743 258.05 646.716 252.039 644.662 246.967C642.609 241.895 639.202 237.997 634.442 235.273C629.775 232.55 623.335 231.188 615.121 231.188H600.561V298.671Z" fill="rgb(var(--color-primary))" />
                <path d="M678.905 314.309L714.606 215.691H735.187L771.028 314.309H751.847L721.186 225.834H728.606L697.945 314.309H678.905ZM695.425 291.627L700.325 277.257H749.607L754.507 291.627H695.425Z" fill="rgb(var(--color-primary))" />
                <path d="M791.864 314.309V215.691H810.065V299.939H853.466V314.309H791.864Z" fill="rgb(var(--color-primary))" />
                <path d="M912.656 316C905.469 316 898.982 314.591 893.195 311.773C887.408 308.862 882.788 304.494 879.335 298.671C875.881 292.754 874.154 285.334 874.154 276.412V215.691H892.355V276.552C892.355 284.16 894.175 289.843 897.815 293.599C901.549 297.356 906.635 299.235 913.076 299.235C919.516 299.235 924.556 297.356 928.196 293.599C931.93 289.843 933.796 284.16 933.796 276.552V215.691H951.997V276.412C951.997 285.334 950.224 292.754 946.677 298.671C943.13 304.494 938.37 308.862 932.396 311.773C926.423 314.591 919.843 316 912.656 316Z" fill="rgb(var(--color-primary))" />
                <path d="M1021.69 316C1011.89 316 1003.4 313.887 996.209 309.66C989.115 305.34 983.655 299.376 979.828 291.768C976.002 284.066 974.088 275.191 974.088 265.141C974.088 255.091 976.002 246.215 979.828 238.514C983.655 230.812 989.115 224.801 996.209 220.481C1003.4 216.16 1011.89 214 1021.69 214C1033.54 214 1043.2 216.959 1050.67 222.876C1058.23 228.793 1062.94 237.058 1064.81 247.671H1044.65C1043.53 242.318 1041.01 238.138 1037.09 235.133C1033.17 232.127 1027.94 230.624 1021.41 230.624C1015.44 230.624 1010.3 232.033 1006.01 234.851C1001.72 237.575 998.402 241.519 996.069 246.685C993.736 251.851 992.569 258.003 992.569 265.141C992.569 272.279 993.736 278.431 996.069 283.597C998.402 288.669 1001.72 292.613 1006.01 295.431C1010.3 298.155 1015.44 299.517 1021.41 299.517C1027.94 299.517 1033.12 298.108 1036.95 295.29C1040.87 292.472 1043.44 288.387 1044.65 283.033H1064.67C1062.9 293.459 1058.23 301.583 1050.67 307.406C1043.2 313.135 1033.54 316 1021.69 316Z" fill="rgb(var(--color-primary))" />
                <path d="M1088.62 314.309V215.691H1106.82V314.309H1088.62Z" fill="rgb(var(--color-primary))" />
                <path d="M1127.88 314.309L1163.58 215.691H1184.16L1220 314.309H1200.82L1170.16 225.834H1177.58L1146.92 314.309H1127.88ZM1144.4 291.627L1149.3 277.257H1198.58L1203.48 291.627H1144.4Z" fill="rgb(var(--color-primary))" />
              </svg>

            </div>
          </Link>

          {/* Main Navigation */}
          <Navigation />

          {/* CTA Button only */}
          <div className="hidden md:block">
            <Link
              href="/sell-with-us"
              className="rounded-md bg-secondary-500 px-4 py-2 min-h-[38px] inline-flex font-normal text-white shadow-md hover:bg-primary-600 transition-colors text-[15px]"
            >
              {tCta('sellWithUs')}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
      <AuthModal />
      <ConfirmDialog
        open={logoutConfirmOpen}
        onClose={() => setLogoutConfirmOpen(false)}
        onConfirm={() => {
          logout();
        }}
        titleKey="logout.title"
        descriptionKey="logout.description"
        confirmKey="logout.confirm"
        cancelKey="logout.cancel"
        confirmButtonClassName="bg-primary-600 hover:bg-primary-700"
      />
      <Toaster
        position="top-right"
        gutter={12}
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "10px",
            padding: "12px 16px",
            fontWeight: "500",
          },
          success: {
            iconTheme: {
              primary: "#fff",
              secondary: "#10b981",
            },
          },
          error: {
            iconTheme: {
              primary: "#fff",
              secondary: "#ef4444",
            },
          },
        }}
      />
    </header>
  );
} 