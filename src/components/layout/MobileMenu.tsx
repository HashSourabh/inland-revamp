"use client";

import React, { Fragment, useState } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ChevronDownIcon, MapPinIcon, SunIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="font-heading text-lg font-semibold text-primary-900">
                          Menu
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-neutral-500 hover:text-neutral-700"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex-1 px-4 sm:px-6">
                      <nav className="space-y-1 pt-4">
                        <Link 
                          href="/" 
                          className="block py-2 text-base font-medium text-neutral-900 hover:text-primary-600"
                          onClick={() => setIsOpen(false)}
                        >
                          Home
                        </Link>
                        <Link 
                          href="/properties" 
                          className="block py-2 text-base font-medium text-neutral-900 hover:text-primary-600"
                          onClick={() => setIsOpen(false)}
                        >
                          Properties
                        </Link>
                        <Link 
                          href="/town-guide" 
                          className="block py-2 text-base font-medium text-neutral-900 hover:text-primary-600"
                          onClick={() => setIsOpen(false)}
                        >
                          Town Guide
                        </Link>
                        <Link 
                          href="/buyers-guide" 
                          className="block py-2 text-base font-medium text-neutral-900 hover:text-primary-600"
                          onClick={() => setIsOpen(false)}
                        >
                          Buyer's Guide
                        </Link>
                        <a 
                          href="https://luvinland.com" 
                          target="_blank" 
                          rel="nofollow noreferrer"
                          className="block py-2 text-base font-medium text-neutral-900 hover:text-primary-600"
                        >
                          Blog
                        </a>
                        <div>
                          <button
                            onClick={() => setIsAboutOpen(!isAboutOpen)}
                            className="flex w-full items-center justify-between py-2 text-base font-medium text-neutral-900 hover:text-primary-600"
                          >
                            About Us
                            <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${isAboutOpen ? 'rotate-180' : ''}`} />
                          </button>
                          {isAboutOpen && (
                            <div className="ml-4 mt-2 space-y-2 border-l-2 border-neutral-200 pl-4">
                              <Link
                                href="/about/location"
                                className="flex items-center gap-2 py-2 text-base font-medium text-neutral-900 hover:text-primary-600"
                                onClick={() => setIsOpen(false)}
                              >
                                <MapPinIcon className="h-5 w-5" />
                                Location
                              </Link>
                              <Link
                                href="/about/weather"
                                className="flex items-center gap-2 py-2 text-base font-medium text-neutral-900 hover:text-primary-600"
                                onClick={() => setIsOpen(false)}
                              >
                                <SunIcon className="h-5 w-5" />
                                Weather
                              </Link>
                              <Link
                                href="/about/airports"
                                className="flex items-center gap-2 py-2 text-base font-medium text-neutral-900 hover:text-primary-600"
                                onClick={() => setIsOpen(false)}
                              >
                                <PaperAirplaneIcon className="h-5 w-5" />
                                Airports
                              </Link>
                            </div>
                          )}
                        </div>
                        <Link 
                          href="/contact" 
                          className="block py-2 text-base font-medium text-neutral-900 hover:text-primary-600"
                          onClick={() => setIsOpen(false)}
                        >
                          Contact
                        </Link>

                        <div className="mt-6 pt-6 border-t border-neutral-200">
                          <Link
                            href="/contact"
                            className="inline-flex w-full items-center justify-center rounded-md bg-secondary-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-secondary-600"
                            onClick={() => setIsOpen(false)}
                          >
                            Contact Us
                          </Link>
                        </div>
                      </nav>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 