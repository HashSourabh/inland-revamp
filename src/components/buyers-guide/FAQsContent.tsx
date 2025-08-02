'use client';

import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface FAQ {
  question: string;
  answer: string;
}

const generalQuestions: FAQ[] = [
  {
    question: 'Do I need to be a resident to buy property in Spain?',
    answer:'No, you dont need to be a resident. Non-residents can freely buy property in Spain, but youll need an NIE (Foreign Identity Number) to complete the purchase.',
  },
  {
    question: 'What additional costs should I budget for when buying?',
    answer:
      'Budget approximately 10-12% of the purchase price for additional costs, including: transfer tax (6-10%), notary fees, legal fees, and registration fees.',
  },
  {
    question: 'How long does the buying process take?',
    answer:
      'The typical buying process takes 2-3 months from offer acceptance to completion. This can vary depending on various factors such as mortgage arrangements and legal checks.',
  },
];

const legalQuestions: FAQ[] = [
  {
    question: 'What is an NIE and how do I get one?',
    answer:
      'An NIE (Número de Identidad de Extranjero) is a tax identification number for foreigners. You can obtain it through the Spanish consulate in your country or through a police station in Spain. We can assist with this process.',
  },
  {
    question: 'Do I need a Spanish bank account?',
    answer:
      'Yes, a Spanish bank account is necessary for paying utilities and local taxes. Its also required if youre taking out a Spanish mortgage.',
  },
  {
    question: 'Is it necessary to make a will in Spain?',
    answer:
      'While not mandatory, its highly recommended to make a Spanish will for your property to ensure smooth inheritance proceedings and avoid potential complications with international succession laws.',
  },
];

const propertyQuestions: FAQ[] = [
  {
    question: 'Whats the difference between urban and rural properties?',
    answer:
      'Urban properties are located within town boundaries with access to main services. Rural properties might have more land but could have restricted building rights and limited access to utilities.',
  },
  {
    question: 'Can I renovate or extend my property?',
    answer:
      'Yes, but youll need proper permits from the local town hall. Regulations vary between urban and rural areas, and some properties may have restrictions.',
  },
  {
    question: 'What ongoing costs should I expect?',
    answer:
      'Regular costs include IBI (council tax), community fees if applicable, utilities, insurance, and non-resident income tax if youre not a resident.',
  },
];

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
                  <span className={`font-medium ${
                    open 
                      ? 'text-slate-900 dark:text-white' 
                      : 'text-slate-900 dark:text-white'
                  }`}>
                    {item.question}
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
                  key={`transition-${index}`}
                  show={open}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel static className={`px-4 py-5 rounded-lg mt-1 ${
                    open 
                      ? 'bg-slate-100 dark:bg-slate-900/30' 
                      : 'text-slate-600 dark:text-slate-300'
                  }`}>
                    {item.answer}
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
  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-primary-600 dark:text-white mb-6">
          Frequently Asked Questions
        </h1>
        <p className="mb-8 mt-0 text-base text-neutral-600 dark:text-slate-300">
          Find answers to the most common questions about buying property in inland Spain. If you can't
          find what you're looking for, don't hesitate to contact us.
        </p>
      </header>

      <motion.section
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FAQSection title="General Questions" questions={generalQuestions} />
        <FAQSection title="Legal & Documentation" questions={legalQuestions} />
        <FAQSection title="Property & Location" questions={propertyQuestions} />
      </motion.section>

      <div className="mt-8 flex items-center justify-between rounded-lg  bg-neutral-50 p-6 dark:border-slate-700 dark:bg-slate-800">
        <div className='w-[60%]'>
          <h2 className="text-2xl font-semibold text-primary-900 mt-0 mb-2 dark:text-white">
          Still Have Questions?
        </h2>
        <p className="mt-0 mb-0 text-base text-neutral-600 dark:text-slate-300">
          Our team is here to help you with any questions you might have about buying property in
          inland Spain.
        </p>
        </div>
        <div className="flex justify-end w-[40%]">
          <a
            href="/contact"
            className="rounded-md bg-primary-600 px-8 py-2 min-h-[40px] inline-flex items-center no-underline text-base font-semibold text-white transition-colors hover:bg-primary-900 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Contact Our Team
          </a>
        </div>
      </div>
    </article>
  );
} 