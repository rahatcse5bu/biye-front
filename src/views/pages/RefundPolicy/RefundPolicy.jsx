import {
  ArrowRightIcon,
  ArrowUturnLeftIcon,
  BanknotesIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ClockIcon,
  DocumentTextIcon,
  LanguageIcon,
  NoSymbolIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { Link } from '@/lib/navigation';

const REFUND_PATH = '/user/account/payment-and-refund';

const windows = [
  {
    Icon: CheckCircleIcon,
    when: '৬ ঘণ্টার মধ্যে',
    title: 'সম্পূর্ণ টাকা ফেরত',
    text: 'পেমেন্টের ৬ ঘণ্টার মধ্যে আবেদন করলে পরিশোধিত পুরো টাকা ফেরত পাবেন ইনশাআল্লাহ।',
    tone: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
  {
    Icon: ClockIcon,
    when: '৬ ঘণ্টা থেকে ৩ দিন',
    title: '১.৫ পয়েন্ট = ৳১ হারে',
    text: 'কেনা পয়েন্টের ভিত্তিতে ফেরত, যেমন ১৫০ পয়েন্টে ৳১০০। পরিশোধিত টাকার বেশি নয়।',
    tone: 'border-amber-200 bg-amber-50 text-amber-700',
  },
  {
    Icon: NoSymbolIcon,
    when: '৩ দিন পর',
    title: 'রিফান্ড প্রযোজ্য নয়',
    text: 'পেমেন্টের ৩ দিন পার হয়ে গেলে আর রিফান্ড আবেদন করা যায় না।',
    tone: 'border-rose-200 bg-rose-50 text-rose-700',
  },
];

const conditions = [
  'ওই পেমেন্টে কেনা সব পয়েন্ট আবেদনের সময় আপনার অ্যাকাউন্টে থাকতে হবে।',
  'শুধু সম্পন্ন হওয়া একটি নির্দিষ্ট ট্রানজেকশনের বিপরীতে আবেদন করা যায়, কাস্টম পরিমাণ নয়।',
  'প্রতিটি পেমেন্টের জন্য একবারই রিফান্ড আবেদন করা যায়।',
];

const steps = [
  {
    Icon: DocumentTextIcon,
    title: 'আবেদন করুন',
    text: 'অ্যাকাউন্টের "পেমেন্ট এবং রিফান্ড" থেকে সংশ্লিষ্ট পেমেন্টের পাশে রিফান্ড অনুরোধ করুন।',
  },
  {
    Icon: ShieldCheckIcon,
    title: 'পয়েন্ট সংরক্ষিত থাকে',
    text: 'যাচাই চলাকালীন ওই পয়েন্টগুলো আটকে রাখা হয়, যাতে খরচ না হয়ে যায়।',
  },
  {
    Icon: BanknotesIcon,
    title: 'টাকা ফেরত',
    text: 'অনুমোদনের পর সর্বোচ্চ ৩ কার্যদিবসের মধ্যে মূল পেমেন্ট মাধ্যমে টাকা ফেরত পাবেন।',
  },
  {
    Icon: ArrowUturnLeftIcon,
    title: 'বাতিল হলে',
    text: 'আবেদন বাতিল হলে আটকে রাখা পয়েন্ট আপনার অ্যাকাউন্টে ফিরে আসবে।',
  },
];

const faqs = [
  {
    q: 'আমি কি রিফান্ড রিকুয়েস্ট করতে পারবো?',
    a: 'জ্বি। আপনি আপনার একাউন্টে পর্যাপ্ত পয়েন্ট থাকা সাপেক্ষে রিফান্ড রিকুয়েস্ট করতে পারবেন।',
  },
  {
    q: 'রিফান্ড পলিসি কিরকম?',
    a: 'আপনার একাউন্টে পর্যাপ্ত পয়েন্ট থাকা সাপেক্ষে শুধু রিফান্ড রিকুয়েস্ট করতে পারবেন! পেমেন্ট করার ৬ ঘন্টার মধ্যে রিফান্ড রিকুয়েস্ট করলে স্বাভাবিক রিফান্ড পাবেন ইনশাআল্লহ। পেমেন্ট করার ৬ ঘন্টা পর কিংবা ৩ দিনের মধ্যে রিফান্ড রিকুয়েস্ট করলে ১.৫ পয়েন্ট=১৳ রেটে রিফান্ড পাবেন।',
  },
  {
    q: 'কতদিন পর্যন্ত রিফান্ড রিকুয়েস্ট করতে পারবো?',
    a: '৩ দিন পর্যন্ত রিফান্ড রিকুয়েস্ট করতে পারবেন।',
  },
  {
    q: 'কাস্টম এমাউন্ট রিফান্ড করতে পারবো?',
    a: 'না, পারবেন না। আপনার করা ট্রান্সজেকশনের বিপরীতে শুধুমাত্র রিফান্ড রিকুয়েস্ট করতে পারবেন।',
  },
  {
    q: 'রিফান্ড পেতে কতদিন লাগতে পারে?',
    a: 'নির্ভর করে। সর্বোচ্চ ৩ কার্যদিবসের মধ্যে রিফান্ড পাবেন।',
  },
];

const faqsEn = [
  {
    q: 'Can I request a refund?',
    a: 'Yes. You can request a refund provided you have sufficient points in your account.',
  },
  {
    q: 'What is the refund policy?',
    a: 'You can only request a refund if you have sufficient points in your account. If you request a refund within 6 hours of payment, you will receive the standard refund, InshaAllah. If you request a refund after 6 hours or within 3 days of payment, you will receive a refund at a rate of 1.5 points = ৳1.',
  },
  {
    q: 'How long do I have to request a refund?',
    a: 'You can request a refund for up to 3 days.',
  },
  {
    q: 'Can I request a refund for a custom amount?',
    a: 'No. You can only request a refund against a transaction you have made.',
  },
  {
    q: 'How long does it take to receive a refund?',
    a: 'It depends. You will receive your refund within a maximum of 3 working days.',
  },
];

const toBn = (value) => String(value).replace(/\d/g, (digit) => '০১২৩৪৫৬৭৮৯'[digit]);

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2';

const primaryButton = `inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-900 px-6 py-3 font-bold text-white shadow-sm transition-colors duration-200 hover:bg-[#0F8287] motion-reduce:transition-none ${focusRing}`;

const secondaryButton = `inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-brand-900/30 bg-white px-6 py-3 font-bold text-brand-900 transition-colors duration-200 hover:border-brand-900 hover:bg-brand-900/5 motion-reduce:transition-none ${focusRing}`;

const FaqList = ({ items, lang }) => (
  <div lang={lang} className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white shadow-sm">
    {items.map(({ q, a }) => (
      <details key={q} className="group">
        <summary
          className={`flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-bold text-gray-900 [&::-webkit-details-marker]:hidden ${focusRing} focus-visible:ring-offset-0`}
        >
          {q}
          <ChevronDownIcon
            className="h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </summary>
        <p className="px-5 pb-5 leading-7 text-gray-600">{a}</p>
      </details>
    ))}
  </div>
);

function RefundPolicy() {
  return (
    <main className="bg-[#F7F9F9]">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:py-16">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-brand-900/10 px-3 py-1 text-sm font-bold text-brand-900">
            <BanknotesIcon className="h-4 w-4" aria-hidden="true" />
            রিফান্ড নীতিমালা
          </p>
          <h1 className="mt-4 text-balance text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            রিফান্ড পলিসি
          </h1>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            পয়েন্ট কেনার পর মত বদলালে পেমেন্টের ৩ দিনের মধ্যে রিফান্ডের আবেদন করতে পারবেন। কত টাকা ফেরত পাবেন তা নির্ভর করে কখন আবেদন করছেন তার ওপর।
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to={REFUND_PATH} className={primaryButton}>
              রিফান্ড আবেদন করুন
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/contact-us" className={secondaryButton}>
              সাহায্য দরকার? যোগাযোগ করুন
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16" aria-labelledby="refund-windows">
        <div className="text-center">
          <h2 id="refund-windows" className="text-2xl font-bold text-gray-900 sm:text-3xl">
            কখন কত ফেরত পাবেন
          </h2>
          <p className="mt-2 text-gray-500">সময় গোনা শুরু হয় পেমেন্ট সম্পন্ন হওয়ার মুহূর্ত থেকে</p>
        </div>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {windows.map(({ Icon, when, title, text, tone }) => (
            <li key={when} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-bold ${tone}`}>
                <Icon className="h-4 w-4" aria-hidden="true" />
                {when}
              </span>
              <h3 className="mt-5 text-xl font-bold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-gray-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:py-16 lg:grid-cols-[2fr_3fr]">
          <div aria-labelledby="refund-conditions">
            <h2 id="refund-conditions" className="text-2xl font-bold text-gray-900">
              আবেদনের শর্ত
            </h2>
            <ul className="mt-6 space-y-4">
              {conditions.map((condition) => (
                <li key={condition} className="flex gap-3">
                  <CheckCircleIcon className="mt-0.5 h-6 w-6 shrink-0 text-brand-900" aria-hidden="true" />
                  <span className="leading-7 text-gray-700">{condition}</span>
                </li>
              ))}
            </ul>
          </div>

          <div aria-labelledby="refund-process">
            <h2 id="refund-process" className="text-2xl font-bold text-gray-900">
              রিফান্ড যেভাবে হয়
            </h2>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2">
              {steps.map(({ Icon, title, text }, index) => (
                <li key={title} className="relative rounded-2xl border border-gray-200 bg-[#F7F9F9] p-5">
                  <span className="absolute right-4 top-4 text-sm font-bold text-gray-300">
                    {toBn(String(index + 1).padStart(2, '0'))}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-900/10 text-brand-900">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-bold text-gray-900">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-gray-600">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:py-16" aria-labelledby="refund-faq">
        <h2 id="refund-faq" className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          সাধারণ জিজ্ঞাসা
        </h2>
        <div className="mt-8">
          <FaqList items={faqs} lang="bn" />
        </div>

        <details className="group mt-10 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <summary
            className={`flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 font-bold text-brand-900 [&::-webkit-details-marker]:hidden ${focusRing} focus-visible:ring-offset-0`}
          >
            <span className="inline-flex items-center gap-2" lang="en">
              <LanguageIcon className="h-5 w-5" aria-hidden="true" />
              Read the refund policy in English
            </span>
            <ChevronDownIcon
              className="h-5 w-5 shrink-0 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </summary>
          <div className="border-t border-gray-200 p-4 sm:p-5">
            <FaqList items={faqsEn} lang="en" />
          </div>
        </details>
      </section>
    </main>
  );
}

export default RefundPolicy;
