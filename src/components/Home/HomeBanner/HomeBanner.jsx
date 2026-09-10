import { Link } from "@/lib/navigation";
import { bannerContent } from "@/constants/religionContent";
import {
  CheckCircleIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

const steps = [
  "পছন্দ অনুযায়ী বায়োডাটা খুঁজুন",
  "বিস্তারিত তথ্য দেখে সিদ্ধান্ত নিন",
  "নিরাপদভাবে যোগাযোগের অনুরোধ করুন",
];

const HomeBanner = ({ content }) => {
  const banner = { ...bannerContent.islam, ...content };

  return (
    <section
      className="overflow-hidden bg-brand-900 text-white"
      aria-labelledby="home-heading"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white/90">
            বাংলাদেশী ম্যাট্রিমনি প্ল্যাটফর্ম
          </p>
          <h1
            id="home-heading"
            className="text-3xl font-bold leading-[1.35] sm:text-4xl lg:text-5xl lg:leading-[1.25]"
          >
            {banner.title1} ম্যাট্রিমনিতে
            <span className="mt-1 block text-[#F8DDE5]">
              জীবনসঙ্গী খোঁজা হোক সহজ ও সুন্দর
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
            {banner.subtitle}। নিজের পছন্দ ও মূল্যবোধ অনুযায়ী বায়োডাটা দেখুন
            এবং নতুন জীবনের পথে এগিয়ে যান।
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/biodatas"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-brand-900 transition-colors duration-200 hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900 motion-reduce:transition-none"
            >
              <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
              বায়োডাটা খুঁজুন
            </Link>
            <Link
              to="/biodata-submit"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/35 bg-white/10 px-5 py-3 font-bold text-white transition-colors duration-200 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none"
            >
              <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
              বায়োডাটা তৈরি করুন
            </Link>
          </div>
        </div>

        <aside
          className="rounded-3xl border border-white/15 bg-white/10 p-5 sm:p-6"
          aria-label="বিয়ে ব্যবহারের ধাপ"
        >
          <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-4">
            <div>
              <p className="text-sm font-semibold text-white/65">শুরু করুন</p>
              <h2 className="mt-1 text-xl font-bold">সহজ তিনটি ধাপে</h2>
            </div>
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white font-bold text-brand-900">
              ৩
            </span>
          </div>
          <ol className="mt-5 space-y-4">
            {steps.map((step, index) => (
              <li
                key={step}
                className="flex items-start gap-3 text-sm leading-6 text-white/85 sm:text-base"
              >
                <CheckCircleIcon
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#F8DDE5]"
                  aria-hidden="true"
                />
                <span>
                  <span className="sr-only">ধাপ {index + 1}: </span>
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
};

export default HomeBanner;
