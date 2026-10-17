import {
  ArrowUturnLeftIcon,
  CheckCircleIcon,
  PaperAirplaneIcon,
  PhoneIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import BkashCreatePaymentAPICall from "../../services/bkash";
import { trackEvent } from "@/utils/analytics";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UserContext from "../../contexts/UserContext";
import { Toast } from "../../utils/toast";
import { useLocation } from "@/lib/navigation";
import { pointsPackageService } from "../../services/pointsPackages";
import { convertToBengaliDigits } from "../../utils/language";
import CustomPointsCard from "./CustomPointsCard";
import ButtonSpinner from "./ButtonSpinner";

const toBn = (value) => convertToBengaliDigits(String(value));

function Payments() {
  const { user, userInfo } = useContext(UserContext);
  const location = useLocation();
  const {
    data: packages = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["points-packages"],
    queryFn: pointsPackageService.list,
  });
  const { data: customSettings } = useQuery({
    queryKey: ["points-packages", "custom-settings"],
    queryFn: pointsPackageService.customSettings,
  });
  // TODO: id of the package (or "custom") whose bKash checkout is starting.
  const [loadingKey, setLoadingKey] = useState(null);

  useEffect(() => {
    trackEvent("view_item_list", { item_list_name: "points_packages" });
  }, []);

  useEffect(() => {
    // TODO: Back from bKash can restore this page from cache with a button still spinning.
    const reset = (event) => event.persisted && setLoadingKey(null);
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  const buyWithBkashHandler = async (value, key) => {
    if (!user?.email) {
      Toast.errorToast("পয়েন্ট কিনতে আগে লগইন করুন");
      return;
    }
    if (loadingKey || +value < 1) return;
    setLoadingKey(key);
    const redirecting = await BkashCreatePaymentAPICall(
      process.env.NODE_ENV === "development" ? 1 : +value,
      "",
      "buy_package",
      location.pathname
    );
    if (!redirecting) setLoadingKey(null);
  };
  const balance = userInfo?.data?.points;
  // TODO: "best value" = most points per taka; only marked when there is something to compare.
  const bestValueId =
    packages.length > 1
      ? packages.reduce((best, item) =>
          item.points / item.price > best.points / best.price ? item : best
        )._id
      : null;

  return (
    <main className="min-h-screen bg-[#F7F9F9]">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10 text-center sm:py-14">
          <p className="text-sm font-bold text-brand-900">পয়েন্ট প্যাকেজ</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            আপনার পছন্দের প্যাকেজ বেছে নিন
          </h1>
          <p className="mx-auto mt-3 max-w-2xl leading-7 text-gray-600">
            পয়েন্ট দিয়ে পাত্র/পাত্রীর কাছে আপনার বায়োডাটা পাঠান এবং অভিভাবকের যোগাযোগ তথ্য নিন।
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3.5 py-1.5 text-gray-700">
              <PaperAirplaneIcon className="h-4 w-4 text-brand-900" aria-hidden="true" />
              বায়োডাটা পাঠানো <b className="text-gray-900">{toBn(30)} পয়েন্ট</b>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3.5 py-1.5 text-gray-700">
              <PhoneIcon className="h-4 w-4 text-brand-900" aria-hidden="true" />
              অভিভাবকের যোগাযোগ তথ্য <b className="text-gray-900">{toBn(70)} পয়েন্ট</b>
            </span>
          </div>
          {user?.email && typeof balance === "number" && (
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-900/10 px-4 py-1.5 text-sm font-semibold text-brand-900">
              <SparklesIcon className="h-4 w-4" aria-hidden="true" />
              আপনার বর্তমান পয়েন্ট: {toBn(Math.floor(balance))}
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:py-12">
        {isError && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700" role="alert">
            প্যাকেজ লোড করা যায়নি। পরে আবার চেষ্টা করুন।
          </p>
        )}
        {!isLoading && !isError && packages.length === 0 && (
          <p className="text-center text-gray-500">এই মুহূর্তে কোনো প্যাকেজ নেই।</p>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-80 animate-pulse rounded-2xl border border-gray-200 bg-white p-6 motion-reduce:animate-none">
                <span className="block h-5 w-24 rounded bg-gray-200" />
                <span className="mt-6 block h-10 w-32 rounded bg-gray-200" />
                <span className="mt-3 block h-4 w-40 rounded bg-gray-100" />
                <span className="mt-8 block h-3 w-full rounded bg-gray-100" />
                <span className="mt-3 block h-3 w-4/5 rounded bg-gray-100" />
                <span className="mt-10 block h-11 w-full rounded-xl bg-gray-200" />
              </div>
            ))}

          {packages.map((packageItem) => {
            const bestValue = packageItem._id === bestValueId;
            const busy = loadingKey === packageItem._id;
            return (
              <article
                key={packageItem._id}
                className={`relative flex flex-col rounded-2xl bg-white p-6 transition-shadow duration-200 hover:shadow-md ${
                  bestValue ? "border-2 border-brand-900 shadow-md" : "border border-gray-200 shadow-sm"
                }`}
              >
                {bestValue && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-900 px-3 py-1 text-xs font-bold text-white shadow-sm">
                    সেরা মূল্য
                  </span>
                )}
                <h2 className="text-lg font-bold text-gray-900">{packageItem.name}</h2>

                <p className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-gray-900">৳{toBn(packageItem.price)}</span>
                </p>
                <p className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-lg bg-brand-900/[0.07] px-2.5 py-1 text-sm font-bold text-brand-900">
                  <SparklesIcon className="h-4 w-4" aria-hidden="true" />
                  {toBn(packageItem.points)} পয়েন্ট
                </p>

                {packageItem.features?.length > 0 && (
                  <ul className="mt-6 space-y-2.5 border-t border-gray-100 pt-5 text-sm text-gray-600">
                    {packageItem.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2.5">
                        <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-900" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* TODO: pushes the button to the card bottom so buttons line up across cards. */}
                <div className="min-h-6 flex-1" aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => buyWithBkashHandler(packageItem.price, packageItem._id)}
                  disabled={Boolean(loadingKey)}
                  aria-busy={busy}
                  className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none ${
                    bestValue
                      ? "bg-brand-900 text-white hover:bg-[#0F8287]"
                      : "border border-brand-900/30 bg-white text-brand-900 hover:border-brand-900 hover:bg-brand-900/5"
                  }`}
                >
                  {busy ? (
                    <>
                      <ButtonSpinner /> অপেক্ষা করুন...
                    </>
                  ) : (
                    "বিকাশ দিয়ে কিনুন"
                  )}
                </button>
              </article>
            );
          })}
        </div>

        {customSettings?.enabled && (
          <CustomPointsCard
            settings={customSettings}
            packages={packages}
            onBuy={(amount) => buyWithBkashHandler(amount, "custom")}
            loading={loadingKey === "custom"}
            disabled={Boolean(loadingKey)}
          />
        )}

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
          <li className="inline-flex items-center gap-1.5">
            <ShieldCheckIcon className="h-4 w-4 text-brand-900" aria-hidden="true" />
            নিরাপদ বিকাশ পেমেন্ট
          </li>
          <li className="inline-flex items-center gap-1.5">
            <ArrowUturnLeftIcon className="h-4 w-4 text-brand-900" aria-hidden="true" />
            পেমেন্টের ৩ দিনের মধ্যে রিফান্ড অনুরোধ করা যায়
          </li>
        </ul>
      </div>
    </main>
  );
}

export default Payments;
