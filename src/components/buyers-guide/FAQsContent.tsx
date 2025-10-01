'use client';

import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface FAQ {
  q: string;
  a: string;
}

interface FAQSectionProps {
  title: string;
  questions: FAQ[];
}

function FAQSection({ title, questions }: FAQSectionProps) {
  return (
    <div className="">
      <h2 className="text-2xl mt-10 mb-4 font-semibold text-primary-900 dark:text-white">
        {title}
      </h2>
      <div className="mt-4 space-y-3">
        {questions.map((item, index) => (
          <Disclosure as="div" key={`faq-${index}`}>
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left transition-colors ${
                    open
                      ? 'bg-slate-200 dark:bg-slate-900/30'
                      : 'bg-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="font-medium text-slate-900 dark:text-white">
                    {item.q}
                  </span>
                  <ChevronDownIcon
                    className={`h-5 w-5 transition-transform duration-200 ${
                      open
                        ? 'rotate-180 transform text-black dark:text-white'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  />
                </Disclosure.Button>
                <Transition
                  show={open}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel static className="px-4 py-5 rounded-lg mt-1 bg-slate-100 dark:bg-slate-900/30">
                    {item.a}
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}

export default function FAQsContent() {
  const t = useTranslations('faq-content');

  const generalQuestions = t.raw('sections.general.questions') as FAQ[];
  const legalQuestions = t.raw('sections.legal.questions') as FAQ[];
  const propertyQuestions = t.raw('sections.property.questions') as FAQ[];

  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-primary-600 dark:text-white mb-6">
          {t('title')}
        </h1>
        <p className="mb-8 mt-0 text-base text-neutral-600 dark:text-slate-300">
          {t('description')}
        </p>
      </header>

      <motion.section
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FAQSection
          title={t('sections.general.title')}
          questions={generalQuestions}
        />
        <FAQSection
          title={t('sections.legal.title')}
          questions={legalQuestions}
        />
        <FAQSection
          title={t('sections.property.title')}
          questions={propertyQuestions}
        />
      </motion.section>

      <div className="mt-8 flex items-center justify-between rounded-lg bg-neutral-50 p-6 dark:border-slate-700 dark:bg-slate-800">
        <div className="w-[60%]">
          <h2 className="text-2xl font-semibold text-primary-900 mt-0 mb-2 dark:text-white">
            {t('cta.heading')}
          </h2>
          <p className="mt-0 mb-0 text-base text-neutral-600 dark:text-slate-300">
            {t('cta.text')}
          </p>
        </div>
        <div className="flex justify-end w-[40%]">
          <a
            href="/contact"
            className="rounded-md bg-primary-600 px-8 py-2 min-h-[40px] inline-flex items-center no-underline text-base font-semibold text-white transition-colors hover:bg-primary-900 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {t('cta.button')}
          </a>
        </div>
      </div>
    </article>
  );
}
