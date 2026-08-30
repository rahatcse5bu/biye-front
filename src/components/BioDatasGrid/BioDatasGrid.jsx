import { useEffect, useState } from "react";
import {
  AdjustmentsHorizontalIcon,
  CheckBadgeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@/lib/navigation";
import BioData from "../BioData/BioData";
import { Pagination } from "../Pagination/Pagination";
import { useBio } from "../../contexts/useBio";
import { convertToQuery } from "../../utils/query";
import { Toast } from "../../utils/toast";
import { convertToBengaliDigits } from "../../utils/language";
import { BioDataServices } from "../../services/bioData";

const LIMIT = 12;
const UNVERIFIED_FILTER_KEYS = new Set([
  "bio_type",
  "bio_gender",
  "gender",
  "marital_status",
  "marital_status_en",
  "religion",
  "religious_type",
  "zilla",
  "division",
  "upazila",
  "minAge",
  "maxAge",
  "minHeight",
  "maxHeight",
  "complexion",
  "sortOrder",
]);

const getBiodataKey = (biodata) =>
  biodata?._id || biodata?.user || biodata?.user_id || biodata?.bio_id;

const BioDatasGrid = ({ setSideBarDisplay }) => {
  const [sortOrder, setSortOrder] = useState("desc");
  const [activeTab, setActiveTab] = useState("verified");
  const [unverifiedPage, setUnverifiedPage] = useState(1);
  const { setQuery, query, bios, size, bioError } = useBio();
  const navigate = useNavigate();

  const unverifiedFilters = Object.fromEntries(
    Object.entries(query || {}).filter(
      ([key, value]) =>
        UNVERIFIED_FILTER_KEYS.has(key) && value !== undefined && value !== ""
    )
  );

  useEffect(() => {
    setUnverifiedPage(1);
  }, [query]);

  useEffect(() => {
    setSortOrder(query?.sortOrder === "asc" ? "asc" : "desc");
  }, [query?.sortOrder]);

  const {
    data: unverifiedRes,
    isLoading: unverifiedLoading,
    isError: unverifiedError,
  } = useQuery({
    queryKey: ["unverified-biodatas", unverifiedPage, unverifiedFilters],
    queryFn: () =>
      BioDataServices.getALLUnverifiedBiodatas({
        ...unverifiedFilters,
        page: unverifiedPage,
        limit: LIMIT,
      }),
    enabled: activeTab === "unverified",
    retry: false,
  });

  const unverifiedBios = unverifiedRes?.data || [];
  const unverifiedTotal = unverifiedRes?.meta?.total || 0;
  const unverifiedTotalPages = Math.ceil(unverifiedTotal / LIMIT);
  const visibleTotal = activeTab === "verified" ? size || 0 : unverifiedTotal;

  const handleSortChange = (event) => {
    const value = event.target.value;
    const nextQuery = { ...query, sortOrder: value };

    setSortOrder(value);
    setQuery(nextQuery);
    navigate(`/biodatas?${convertToQuery(nextQuery)}`);
    Toast.successToast(
      value === "desc"
        ? "নতুন বায়োডাটা আগে দেখানো হচ্ছে।"
        : "পুরোনো বায়োডাটা আগে দেখানো হচ্ছে।"
    );
  };

  return (
    <div className="w-full px-3 pb-6 pt-3 sm:px-4 sm:pt-4 lg:px-0 lg:py-0">
      <div className="mb-4 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-900">
              বায়োডাটা
            </p>
            <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
              আপনার পছন্দের মানুষ খুঁজুন
            </h2>
            <p className="mt-1 text-sm text-gray-500" aria-live="polite">
              {convertToBengaliDigits(visibleTotal)} টি বায়োডাটা পাওয়া গেছে
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSideBarDisplay(true)}
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-900 px-3.5 py-2 text-sm font-bold text-white transition-colors hover:bg-[#0F8287] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 lg:hidden"
            aria-label="বায়োডাটা ফিল্টার খুলুন"
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5" aria-hidden="true" />
            <span>ফিল্টার</span>
          </button>
        </div>

        <div
          className="mt-4 grid grid-cols-2 rounded-xl bg-gray-100 p-1"
          role="group"
          aria-label="বায়োডাটার ধরন"
        >
          <button
            type="button"
            aria-pressed={activeTab === "verified"}
            onClick={() => setActiveTab("verified")}
            className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold transition-colors ${
              activeTab === "verified"
                ? "bg-white text-brand-900 shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <CheckBadgeIcon className="h-4 w-4" aria-hidden="true" />
            যাচাইকৃত
          </button>
          <button
            type="button"
            aria-pressed={activeTab === "unverified"}
            onClick={() => setActiveTab("unverified")}
            className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold transition-colors ${
              activeTab === "unverified"
                ? "bg-white text-brand-900 shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <ClockIcon className="h-4 w-4" aria-hidden="true" />
            অযাচাইকৃত
          </button>
        </div>

        {activeTab === "verified" && (
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-gray-100 pt-3">
            <span className="text-sm font-semibold text-gray-600">
              সাজানোর ধরন
            </span>
            <label className="relative">
              <span className="sr-only">বায়োডাটা সাজান</span>
              <select
                value={sortOrder}
                onChange={handleSortChange}
                className="min-h-11 appearance-none rounded-xl border border-gray-200 bg-white py-2 pl-3 pr-9 text-sm font-bold text-gray-700 outline-none focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10"
              >
                <option value="desc">নতুন আগে</option>
                <option value="asc">পুরোনো আগে</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                ▼
              </span>
            </label>
          </div>
        )}
      </div>

      {activeTab === "verified" && (
        <>
          {bioError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-10 text-center text-sm font-semibold text-red-700">
              বায়োডাটা লোড করা যায়নি। কিছুক্ষণ পরে আবার চেষ্টা করুন।
            </div>
          ) : bios?.length ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
              {bios.map((biodata) => (
                <BioData key={getBiodataKey(biodata)} biodata={biodata} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-white px-4 py-12 text-center text-sm font-semibold text-gray-500">
              আপনার নির্বাচিত ফিল্টারে কোনো বায়োডাটা পাওয়া যায়নি।
            </div>
          )}
          <Pagination />
        </>
      )}

      {activeTab === "unverified" && (
        <>
          {unverifiedLoading ? (
            <div className="flex min-h-48 items-center justify-center rounded-2xl border border-gray-200 bg-white text-sm font-semibold text-gray-500">
              লোড হচ্ছে...
            </div>
          ) : unverifiedError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-10 text-center text-sm font-semibold text-red-700">
              অযাচাইকৃত বায়োডাটা লোড করা যায়নি।
            </div>
          ) : unverifiedBios.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white px-4 py-12 text-center text-sm font-semibold text-gray-500">
              কোনো বায়োডাটা পাওয়া যায়নি।
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
              {unverifiedBios.map((biodata) => (
                <BioData
                  key={getBiodataKey(biodata)}
                  biodata={{ ...biodata, is_unverified: true }}
                />
              ))}
            </div>
          )}

          {unverifiedTotalPages > 1 && (
            <nav
              className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:justify-center"
              aria-label="অযাচাইকৃত বায়োডাটা পৃষ্ঠা"
            >
              <button
                type="button"
                onClick={() =>
                  setUnverifiedPage((page) => Math.max(1, page - 1))
                }
                disabled={unverifiedPage === 1}
                className="min-h-11 rounded-xl border border-gray-200 px-4 py-2 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                আগের
              </button>
              <span className="whitespace-nowrap text-sm font-semibold text-gray-600">
                {convertToBengaliDigits(unverifiedPage)} /{" "}
                {convertToBengaliDigits(unverifiedTotalPages)}
              </span>
              <button
                type="button"
                onClick={() =>
                  setUnverifiedPage((page) =>
                    Math.min(unverifiedTotalPages, page + 1)
                  )
                }
                disabled={unverifiedPage === unverifiedTotalPages}
                className="min-h-11 rounded-xl border border-gray-200 px-4 py-2 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                পরের
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default BioDatasGrid;
