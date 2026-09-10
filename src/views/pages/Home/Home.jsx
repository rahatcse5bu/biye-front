"use client";

import FeaturedBioDataGrid from "../../../components/FeaturedBioDataGrid/FeaturedBioDataGrid";
import HadithSlider from "../../../components/HadithSlider/HadithSlider";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@/lib/navigation";
import {
  DocumentTextIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { GeneralInfoServices } from "../../../services/generalInfo";
import BioStats from "../../../components/Home/BioStats/BioStats";
import IslamicQuote from "../../../components/Home/IslamicQuote/IslamicQuote";
import HomeBanner from "../../../components/Home/HomeBanner/HomeBanner";
import HomeFilter from "../../../components/Home/HomeFilter/HomeFilter";
import AboutFeature from "../../../components/Home/AboutFeature/AboutFeature";
import PromptFilter from "../../../components/PromptFilter/PromptFilter";
import ChatAgent from "../../../components/ChatAgent/ChatAgent";
import BioContext from "../../../contexts/BioContext";
import { useReligionPreference } from "@/contexts/ReligionPreferenceContext";
import { convertToQuery } from "@/utils/query";
import {
  getContentForReligion,
  religionToApiKey,
} from "../../../constants/religionContent";

const trustFeatures = [
  {
    title: "সহজ বায়োডাটা",
    description:
      "প্রয়োজনীয় তথ্য সুন্দরভাবে সাজানো থাকায় তুলনা ও সিদ্ধান্ত নেওয়া সহজ।",
    icon: DocumentTextIcon,
  },
  {
    title: "স্মার্ট অনুসন্ধান",
    description:
      "এলাকা, বৈবাহিক অবস্থা ও পছন্দ অনুযায়ী দ্রুত বায়োডাটা খুঁজুন।",
    icon: MagnifyingGlassIcon,
  },
  {
    title: "তথ্যের নিয়ন্ত্রণ",
    description:
      "নিজের তথ্য ও যোগাযোগের অনুরোধ আপনার অ্যাকাউন্ট থেকেই পরিচালনা করুন।",
    icon: ShieldCheckIcon,
  },
];

const Home = ({ initialReligion }) => {
  const { religion, ready } = useReligionPreference();
  const activeReligion = religion ?? initialReligion;
  const content = getContentForReligion(activeReligion);
  const apiReligion = religionToApiKey[activeReligion] || null;
  const { setQuery, setFilterFields } = useContext(BioContext);
  const navigate = useNavigate();

  const handlePromptApply = (filters) => {
    const userStatus =
      process.env.NODE_ENV === "development" ? "in review" : "active";
    const nextQuery = {
      page: 1,
      limit: 12,
      user_status: userStatus,
      ...(apiReligion && { religion: apiReligion }),
      ...filters,
    };
    setQuery(nextQuery);
    setFilterFields(nextQuery);
    navigate(`/biodatas?${convertToQuery(nextQuery)}`);
  };

  const featuredQuery = { isFeatured: true };
  if (apiReligion) {
    featuredQuery.religion = apiReligion;
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['general-info', 'featured', activeReligion],
    queryFn: async () => GeneralInfoServices.getALLGeneralInfo(featuredQuery),
    enabled: ready,
    retry: false,
  });

  return (
    <main className="bg-[#F7F9F9] text-gray-900">
      <HomeBanner content={content.banner} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <IslamicQuote content={content.quote} />

        <section className="py-10 sm:py-14" aria-labelledby="search-heading">
          <div className="mb-6 max-w-2xl">
            <p className="text-sm font-bold text-brand-900">
              আপনার পছন্দ, আপনার অনুসন্ধান
            </p>
            <h2
              id="search-heading"
              className="mt-2 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl"
            >
              পছন্দের জীবনসঙ্গী খোঁজা শুরু করুন
            </h2>
            <p className="mt-3 leading-7 text-gray-600">
              কয়েকটি তথ্য নির্বাচন করুন—আপনার পছন্দের সঙ্গে মিল আছে এমন
              বায়োডাটা আমরা দেখাব।
            </p>
          </div>

          <HomeFilter />

          <div className="mt-4 rounded-2xl border border-brand-900/10 bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-3 flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-900/10 text-brand-900">
                <SparklesIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-bold text-gray-900">
                  AI দিয়ে বাংলায় খুঁজুন
                </h3>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                  আপনার পছন্দ সাধারণ ভাষায় লিখুন, AI সেটিকে অনুসন্ধান ফিল্টারে
                  রূপান্তর করবে।
                </p>
              </div>
            </div>
            <PromptFilter onApply={handlePromptApply} />
          </div>
        </section>

        <section className="pb-12 sm:pb-16" aria-label="ফিচারড বায়োডাটা">
          {isLoading ? (
            <div
              className="flex min-h-56 items-center justify-center gap-3 rounded-3xl border border-gray-200 bg-white text-brand-900"
              role="status"
            >
              <span
                className="h-6 w-6 animate-spin rounded-full border-2 border-brand-900/20 border-t-brand-900 motion-reduce:animate-none"
                aria-hidden="true"
              />
              <span className="font-semibold">
                ফিচারড বায়োডাটা লোড হচ্ছে...
              </span>
            </div>
          ) : isError ? (
            <p
              role="alert"
              className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-600"
            >
              ফিচারড বায়োডাটা লোড করা যায়নি। কিছুক্ষণ পরে আবার চেষ্টা করুন।
            </p>
          ) : data?.data?.length ? (
            <FeaturedBioDataGrid data={data.data} />
          ) : (
            <p className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-600">
              এই পছন্দে এখনো ফিচারড বায়োডাটা নেই। উপরের অনুসন্ধান থেকে সকল
              উপলভ্য বায়োডাটা দেখতে পারেন।
            </p>
          )}
        </section>

        <section className="pb-12 sm:pb-16" aria-labelledby="why-biye-heading">
          <div className="mb-7 text-center">
            <p className="text-sm font-bold text-brand-900">কেন বিয়ে</p>
            <h2
              id="why-biye-heading"
              className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl"
            >
              পরিচ্ছন্ন, সহজ ও আপনার নিয়ন্ত্রণে
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {trustFeatures.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-900/10 text-brand-900">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-gray-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">
                  {description}
                </p>
              </article>
            ))}
          </div>
          <AboutFeature content={content.about} />
        </section>

        <BioStats />

        <section
          className="py-12 sm:py-16"
          aria-labelledby="religious-guidance-heading"
        >
          <div className="mx-auto mb-7 max-w-3xl text-center">
            <p className="text-sm font-bold text-brand-900">অনুপ্রেরণা</p>
            <h2
              id="religious-guidance-heading"
              className="mt-2 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl"
            >
              {content.heading}
            </h2>
          </div>
          <HadithSlider slides={content.slides} />
        </section>
      </div>

      <ChatAgent onApply={handlePromptApply} />
    </main>
  );
};

export default Home;
