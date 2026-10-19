import { Link } from "@/lib/navigation";
import { convertToQuery } from "@/utils/query";

const steps = [
  {
    title: "অ্যাকাউন্ট খুলুন",
    description:
      "নিজের জন্য অথবা অভিভাবক হিসেবে ছেলে-মেয়ে বা নিকটাত্মীয়ের জন্য অ্যাকাউন্ট তৈরি করুন।",
  },
  {
    title: "বায়োডাটা জমা দিন",
    description:
      "ব্যক্তিগত, পারিবারিক, শিক্ষা, পেশা ও প্রত্যাশিত জীবনসঙ্গীর তথ্য দিয়ে ধাপে ধাপে বিয়ের বায়োডাটা তৈরি করুন।",
  },
  {
    title: "যাচাই ও অনুমোদন",
    description:
      "অভিভাবকের সম্মতি যাচাই করে সাধারণত ৩-৭ কার্যদিবসের মধ্যে বায়োডাটা অনুমোদন করা হয়।",
  },
  {
    title: "পছন্দের বায়োডাটায় যোগাযোগ",
    description:
      "এলাকা, বয়স, পেশা ও বৈবাহিক অবস্থা দিয়ে খুঁজুন, অনুরোধ পাঠান এবং অনুমোদন পেলে অভিভাবকের যোগাযোগ তথ্য নিন।",
  },
];

const divisions = [
  "ঢাকা",
  "চট্টগ্রাম",
  "রাজশাহী",
  "খুলনা",
  "বরিশাল",
  "সিলেট",
  "রংপুর",
  "ময়মনসিংহ",
];

const bioTypes = [
  { value: "পাত্রীর বায়োডাটা", label: "পাত্রী", possessive: "পাত্রীর" },
  { value: "পাত্রের বায়োডাটা", label: "পাত্র", possessive: "পাত্রের" },
];

const biodataLink = (query) => `/biodatas?${convertToQuery(query)}`;

const popularSearches = [
  ...bioTypes.map(({ value, possessive }) => ({
    label: `সকল ${possessive} বায়োডাটা`,
    href: biodataLink({ bio_type: value }),
  })),
  ...divisions.flatMap((division) =>
    bioTypes.map(({ value, label }) => ({
      label: `${division} বিভাগে ${label}`,
      href: biodataLink({ bio_type: value, division }),
    })),
  ),
];

const quickAnswers = [
  {
    question: "বিবাহ ম্যাট্রিমনিতে কি অ্যাকাউন্ট ছাড়া বায়োডাটা দেখা যায়?",
    answer:
      "হ্যাঁ, অনুমোদিত সকল বায়োডাটা যে কেউ ব্রাউজ ও ফিল্টার করতে পারেন। অভিভাবকের যোগাযোগ তথ্য পেতে অ্যাকাউন্ট ও পয়েন্ট প্রয়োজন।",
  },
  {
    question: "অভিভাবকের অনুমতি ছাড়া কি বায়োডাটা দেওয়া যায়?",
    answer:
      "না। অভিভাবকের সম্মতি যাচাই না হলে কোনো বায়োডাটা অনুমোদন করা হয় না, তাই প্ল্যাটফর্মের প্রতিটি বায়োডাটা পরিবারের জানা ও সম্মতিতে প্রকাশিত।",
  },
  {
    question: "কোন ধর্মের পাত্র-পাত্রী খোঁজা যায়?",
    answer:
      "ইসলামিক, হিন্দু ও খ্রিস্টান — তিন ধর্মের পাত্র-পাত্রীর জন্যই আলাদা পছন্দ ও ফিল্টার রয়েছে, যাতে নিজের মূল্যবোধ অনুযায়ী জীবনসঙ্গী খুঁজতে পারেন।",
  },
  {
    question: "পেমেন্ট কীভাবে করা যায়?",
    answer:
      "যোগাযোগের জন্য পয়েন্ট কিনতে বর্তমানে বিকাশ পেমেন্ট গ্রহণ করা হয়। বিস্তারিত পয়েন্ট প্যাকেজ পৃষ্ঠায় দেখুন।",
  },
];

const SeoContent = () => {
  return (
    <>
      <section className="py-12 sm:py-16" aria-labelledby="about-matrimony-heading">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold text-brand-900">বাংলাদেশি ম্যাট্রিমনি</p>
          <h2
            id="about-matrimony-heading"
            className="mt-2 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl"
          >
            বাংলাদেশের বিশ্বস্ত অনলাইন ম্যাট্রিমনি — পাত্র-পাত্রীর বায়োডাটা এক জায়গায়
          </h2>
          <p className="mt-4 leading-8 text-gray-600">
            বিবাহ (Bibaho) একটি বাংলাদেশি ম্যাট্রিমনি প্ল্যাটফর্ম, যেখানে পাত্র-পাত্রী এবং তাদের অভিভাবকরা
            নিরাপদে বিয়ের বায়োডাটা
            তৈরি করেন এবং পছন্দের জীবনসঙ্গী খোঁজেন। ইসলামিক, হিন্দু ও খ্রিস্টান
            পরিবারের জন্য আলাদা পছন্দের ব্যবস্থা, বিভাগ-জেলা-উপজেলা ভিত্তিক
            অনুসন্ধান এবং অভিভাবকের সম্মতিতে যাচাইকৃত বায়োডাটা — সব মিলিয়ে
            পাত্রী চাই বা পাত্র চাই, দুই ক্ষেত্রেই খোঁজা সহজ।
          </p>
        </div>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ title, description }, index) => (
            <li
              key={title}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-900 text-sm font-bold text-white">
                {(index + 1).toLocaleString("bn-BD")}
              </span>
              <h3 className="mt-3 text-lg font-bold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-gray-600">{description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 text-center">
          <Link
            to="/biodata-submit"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-900 px-6 py-3 font-bold text-white transition-colors hover:bg-[#0F8287] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2"
          >
            বিনা ঝামেলায় বায়োডাটা তৈরি শুরু করুন
          </Link>
        </div>
      </section>

      <section className="pb-12 sm:pb-16" aria-labelledby="popular-search-heading">
        <h2
          id="popular-search-heading"
          className="text-xl font-bold text-gray-900 sm:text-2xl"
        >
          জনপ্রিয় অনুসন্ধান: বিভাগ অনুযায়ী পাত্র-পাত্রী
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {popularSearches.map(({ label, href }) => (
            <li key={href}>
              <Link
                to={href}
                className="inline-flex rounded-full border border-brand-900/20 bg-white px-4 py-2 text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-900 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="pb-12 sm:pb-16" aria-labelledby="quick-faq-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2
            id="quick-faq-heading"
            className="text-xl font-bold text-gray-900 sm:text-2xl"
          >
            সংক্ষেপে জেনে নিন
          </h2>
          <Link to="/faq" className="text-sm font-bold text-brand-900 hover:underline">
            সকল প্রশ্নোত্তর দেখুন →
          </Link>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {quickAnswers.map(({ question, answer }) => (
            <details
              key={question}
              className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
                <h3 className="font-bold text-gray-900">{question}</h3>
                <span className="text-xl leading-none text-brand-900 group-open:rotate-45 motion-safe:transition-transform" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-gray-600">{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
};

export default SeoContent;
