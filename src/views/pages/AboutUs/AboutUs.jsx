import {
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
  EyeSlashIcon,
  HeartIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  ScaleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserGroupIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { Link } from '@/lib/navigation';
import BioStats from '../../../components/Home/BioStats/BioStats';

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2';

const features = [
  {
    Icon: ClipboardDocumentListIcon,
    title: 'গোছানো বায়োডাটা',
    text: 'ব্যক্তিগত, পারিবারিক, শিক্ষা, পেশা ও প্রত্যাশিত জীবনসঙ্গীর তথ্য ধাপে ধাপে সাজিয়ে বিনামূল্যে বায়োডাটা তৈরি করুন।',
  },
  {
    Icon: ShieldCheckIcon,
    title: 'যাচাই করে প্রকাশ',
    text: 'প্রতিটি বায়োডাটা আমাদের টিম যাচাই করে এবং অভিভাবকের সম্মতি সাপেক্ষে প্রকাশ করে।',
  },
  {
    Icon: MagnifyingGlassIcon,
    title: 'পছন্দমতো অনুসন্ধান',
    text: 'এলাকা, বয়স, বৈবাহিক অবস্থা, শিক্ষা ও পেশা অনুযায়ী ফিল্টার করে মানানসই বায়োডাটা খুঁজুন।',
  },
  {
    Icon: SparklesIcon,
    title: 'AI দিয়ে বাংলায় খোঁজা',
    text: 'নিজের পছন্দ সাধারণ বাংলায় লিখুন, AI সেটিকে অনুসন্ধান ফিল্টারে রূপান্তর করে দেবে।',
  },
  {
    Icon: HeartIcon,
    title: 'দুই ধাপের প্রস্তাব',
    text: 'প্রথমে প্রস্তাব পাঠান। বায়োডাটার মালিক রাজি হলে তবেই অভিভাবকের যোগাযোগ তথ্য নিন, ফলে অপ্রয়োজনীয় খরচ কমে।',
  },
  {
    Icon: EyeSlashIcon,
    title: 'তথ্য আপনার নিয়ন্ত্রণে',
    text: 'কথাবার্তা চললে বা বিয়ে হয়ে গেলে সেটিংস থেকে এক ক্লিকে বায়োডাটা লুকিয়ে রাখুন।',
  },
];

const principles = [
  {
    Icon: UserGroupIcon,
    title: 'পরিবারকে সঙ্গে রেখে',
    text: 'অভিভাবকের অনুমতি ছাড়া বায়োডাটা অনুমোদন করা হয় না, যোগাযোগও হয় অভিভাবকের মাধ্যমে।',
  },
  {
    Icon: LockClosedIcon,
    title: 'গোপনীয়তার সম্মান',
    text: 'অভিভাবকের যোগাযোগ তথ্য প্রকাশ্যে থাকে না, শুধু প্রস্তাব অনুমোদিত হলেই তা শেয়ার করা হয়।',
  },
  {
    Icon: ScaleIcon,
    title: 'স্বচ্ছতা',
    text: 'প্রতিটি বায়োডাটার অনুমোদন ও প্রত্যাখ্যানের হার দেখানো হয়, যাতে প্রস্তাব পাঠানোর আগে ভেবে সিদ্ধান্ত নিতে পারেন।',
  },
  {
    Icon: UsersIcon,
    title: 'সবার জন্য',
    text: 'মুসলিম, হিন্দু ও খ্রিস্টান পরিবারের জন্য নিজ নিজ বিশ্বাস ও রীতি অনুযায়ী আলাদা অভিজ্ঞতা।',
  },
];

const AboutUs = () => {
  return (
    <main className="bg-[#F7F9F9]">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:py-16">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-brand-900/10 px-3 py-1 text-sm font-bold text-brand-900">
            <HeartIcon className="h-4 w-4" aria-hidden="true" />
            আমাদের সম্পর্কে
          </p>
          <h1 className="mt-4 text-balance text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            জীবনসঙ্গী খোঁজা হোক সহজ, নিরাপদ ও সম্মানজনক
          </h1>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            বিবাহ একটি বাংলাদেশি ম্যাট্রিমনি প্ল্যাটফর্ম। এখানে পাত্র-পাত্রী ও তাদের অভিভাবকেরা
            বিনামূল্যে বায়োডাটা তৈরি করতে পারেন, পছন্দ অনুযায়ী বায়োডাটা খুঁজতে পারেন এবং
            পরিবারের মাধ্যমে নিরাপদে যোগাযোগ করতে পারেন।
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/biodatas"
              className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-900 px-6 py-3 font-bold text-white shadow-sm transition-colors duration-200 hover:bg-[#0F8287] motion-reduce:transition-none ${focusRing}`}
            >
              <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
              বায়োডাটা খুঁজুন
            </Link>
            <Link
              to="/biodata-submit"
              className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-brand-900/30 px-6 py-3 font-bold text-brand-900 transition-colors duration-200 hover:border-brand-900 hover:bg-brand-900/5 motion-reduce:transition-none ${focusRing}`}
            >
              কীভাবে কাজ করে
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16" aria-labelledby="story-heading">
        <div className="grid gap-8 lg:grid-cols-[2fr_3fr] lg:gap-12">
          <div>
            <p className="text-sm font-bold text-brand-900">কেন বিবাহ</p>
            <h2
              id="story-heading"
              className="mt-2 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl"
            >
              বিশ্বস্ত তথ্যে, পরিবারের সম্মতিতে নতুন জীবনের শুরু
            </h2>
          </div>
          <div className="space-y-4 leading-8 text-gray-700">
            <p>
              বিয়ে শুধু দুজন মানুষের নয়, দুটি পরিবারের বন্ধন। অথচ আজকের ব্যস্ত জীবনে
              নিজের মূল্যবোধ ও প্রত্যাশার সঙ্গে মিলে যায় এমন জীবনসঙ্গী খুঁজে পাওয়া অনেকের
              জন্যই কঠিন। আত্মীয়স্বজনের মাধ্যমে খোঁজ সীমিত, আর অনলাইনে ভুয়া প্রোফাইল ও
              তথ্যের অপব্যবহারের ভয় থাকে।
            </p>
            <p>
              এই সমস্যার সমাধানে আমরা বিবাহ তৈরি করেছি। আমাদের লক্ষ্য একটি পরিচ্ছন্ন প্ল্যাটফর্ম,
              যেখানে প্রতিটি বায়োডাটা যাচাই করা, তথ্য গোছানো এবং যোগাযোগ হয় অভিভাবকের
              মাধ্যমে। নিজের উপজেলা থেকে শুরু করে সারা দেশে, নিজের বিশ্বাস ও পারিবারিক রীতি
              অনুযায়ী পাত্র-পাত্রী খুঁজে পাওয়াকে আমরা সহজ করতে চাই।
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-white" aria-labelledby="features-heading">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold text-brand-900">আমরা যা দিই</p>
            <h2 id="features-heading" className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              বায়োডাটা তৈরি থেকে যোগাযোগ পর্যন্ত, সব এক জায়গায়
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ Icon, title, text }) => (
              <article
                key={title}
                className="rounded-2xl border border-gray-200 bg-[#F7F9F9] p-5 sm:p-6"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-900/10 text-brand-900">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16" aria-labelledby="principles-heading">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold text-brand-900">আমাদের নীতি</p>
          <h2 id="principles-heading" className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            যে বিষয়গুলোতে আমরা আপস করি না
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {principles.map(({ Icon, title, text }) => (
            <article
              key={title}
              className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-900 text-white">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-bold text-gray-900">{title}</h3>
                <p className="mt-1 text-sm leading-7 text-gray-600">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <BioStats />
      </div>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 rounded-3xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm sm:px-10">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-900/10 text-brand-900">
            <ChatBubbleLeftRightIcon className="h-6 w-6" aria-hidden="true" />
          </span>
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">কোনো প্রশ্ন আছে?</h2>
          <p className="max-w-xl leading-7 text-gray-600">
            সাধারণ জিজ্ঞাসার উত্তর দেখে নিন, অথবা সরাসরি আমাদের টিমের সঙ্গে যোগাযোগ করুন।
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact-us"
              className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-900 px-6 py-3 font-bold text-white shadow-sm transition-colors duration-200 hover:bg-[#0F8287] motion-reduce:transition-none ${focusRing}`}
            >
              যোগাযোগ করুন
            </Link>
            <Link
              to="/faq"
              className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-brand-900/30 px-6 py-3 font-bold text-brand-900 transition-colors duration-200 hover:border-brand-900 hover:bg-brand-900/5 motion-reduce:transition-none ${focusRing}`}
            >
              সাধারণ জিজ্ঞাসা
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
