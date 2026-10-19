/* eslint-disable react/prop-types */
import { Link } from "@/lib/navigation";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";
import { useQuery } from "@tanstack/react-query";
import { BioDataServices } from "../../../services/bioData";
import LoadingCircle from "../../../components/LoadingCircle/LoadingCircle";
import { GeneralInfoServices } from "../../../services/generalInfo";
import { LikesServices } from "../../../services/favorites";
import { getToken } from "../../../utils/cookies";
import { convertToBengaliDigits as toBn } from "../../../utils/language";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  EyeIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  HeartIcon,
  InboxArrowDownIcon,
  PlusIcon,
  ShoppingBagIcon,
  WalletIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

// TODO: toBn returns undefined for 0, so stringify first.
const bn = (n) => toBn(String(n ?? 0));

const ActionLink = ({ to, children }) => (
  <Link
    to={to}
    className="group/link inline-flex items-center gap-1.5 rounded text-sm font-semibold text-brand-900 hover:text-[#0F8287] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900/40"
  >
    {children}
    <ArrowRightIcon
      className="h-4 w-4 transition-transform duration-150 group-hover/link:translate-x-0.5 motion-reduce:transition-none"
      aria-hidden="true"
    />
  </Link>
);

const StatCard = ({ Icon, label, value, suffix, hint, action }) => (
  <div className="flex flex-col rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-shadow duration-150 hover:shadow-md motion-reduce:transition-none">
    <div className="flex items-start justify-between gap-3">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-900/10 text-brand-900">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
    </div>
    <p className="mt-1 text-3xl font-bold tabular-nums text-gray-900">
      {value}
      {suffix && <span className="ml-1 text-base font-medium text-gray-400">{suffix}</span>}
    </p>
    <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{hint}</p>
    {action && (
      <div className="mt-auto pt-4">
        <div className="border-t border-gray-100 pt-3.5">
          <ActionLink to={action.to}>{action.label}</ActionLink>
        </div>
      </div>
    )}
  </div>
);

const RateCard = ({ Icon, label, percent, hint, tone }) => {
  const value = Math.min(100, Math.max(0, Math.round(Number(percent) || 0)));
  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tone.chip}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="flex-1 text-sm font-medium text-gray-500">{label}</p>
        <p className="text-2xl font-bold tabular-nums text-gray-900">{bn(value)}%</p>
      </div>
      <div
        className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div className={`h-full rounded-full ${tone.bar}`} style={{ width: `${value}%` }} />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-gray-500">{hint}</p>
    </div>
  );
};

const DashBoard = () => {
  const { userInfo } = useContext(UserContext);
  const { data, isLoading } = useQuery({
    queryKey: ["bio-data", "stat", userInfo?.data?._id],
    queryFn: async () => {
      return await BioDataServices.getBioDataStatistics(userInfo?.data?._id);
    },
    retry: false,
    enabled: !!userInfo?.data?._id,
  });
  const { data: dashBoard } = useQuery({
    queryKey: ["dash-board-bio-data", userInfo?.data?._id],
    queryFn: async () => {
      return await GeneralInfoServices.getDashBoardData();
    },
    retry: false,
    enabled: !!userInfo?.data?._id,
  });

  // TODO: same query as the likes page, so unlocking there updates this button too.
  const { data: likers } = useQuery({
    queryKey: ["user-likes", userInfo?.data?._id],
    queryFn: async () =>
      LikesServices.getLikesListByUser(getToken()?.token, userInfo?.data?._id),
    retry: false,
    enabled: !!userInfo?.data?._id,
  });

  if (isLoading) {
    return <LoadingCircle />;
  }

  const points = Number((userInfo?.data?.points ?? 0).toFixed(2));
  const stats = dashBoard?.data;

  return (
    <section className="my-dashboard mt-6 space-y-5">
      <header>
        <h1 className="text-xl font-semibold text-gray-900">ড্যাশবোর্ড</h1>
        <p className="mt-0.5 text-sm text-gray-500">আপনার অ্যাকাউন্টের এক নজরে সারসংক্ষেপ</p>
      </header>

      {stats?.has_biodata === false && (
        <div className="flex flex-col items-start justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold text-amber-900">আপনার বায়োডাটা এখনো তৈরি হয়নি</p>
            <p className="text-sm text-amber-800">বায়োডাটা তৈরি করলে অন্যরা আপনাকে দেখতে ও প্রস্তাব পাঠাতে পারবেন।</p>
          </div>
          <Link
            to="/user/account/edit-biodata"
            className="shrink-0 rounded-lg bg-brand-900 px-4 py-2 text-sm font-semibold text-white hover:bg-[#0F8287] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900/40"
          >
            বায়োডাটা তৈরি করুন
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-[#0D7377] to-[#13A0A5] p-5 text-white shadow-sm">
          <div className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full bg-white/10" aria-hidden="true" />
          <div className="relative flex items-start justify-between gap-3">
            <p className="text-sm font-medium text-white/80">আমার বর্তমান পয়েন্ট</p>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
              <WalletIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          </div>
          <p className="relative mt-1 text-4xl font-bold tabular-nums">{bn(points)}</p>
          <p className="relative mt-1.5 text-sm leading-relaxed text-white/80">
            {points < 0
              ? "আপনার ব্যালেন্স ঋণাত্মক — রিচার্জ করে পূরণ করুন।"
              : "আপনার একাউন্টে এখন যত পয়েন্ট জমা রয়েছে।"}
          </p>
          <div className="relative mt-auto pt-4">
            <Link
              to="/points-package"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-900 shadow-sm hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <PlusIcon className="h-4 w-4" aria-hidden="true" />
              পয়েন্ট রিচার্জ করুন
            </Link>
          </div>
        </div>

        <StatCard
          Icon={InboxArrowDownIcon}
          label="পেন্ডিং প্রস্তাব"
          value={bn(data?.results?.pending)}
          suffix="টি"
          hint="যে প্রস্তাবগুলো আপনি এখনো এপ্রুভ বা রিজেক্ট করেননি।"
          action={{ to: "/user/account/bio-requests", label: "পেন্ডিংগুলো দেখুন" }}
        />

        <StatCard
          Icon={HeartIcon}
          label="যারা আমাকে পছন্দ করেছেন"
          value={bn(stats?.likes_count)}
          suffix="জন"
          hint="এত জন আপনার বায়োডাটা পছন্দের তালিকায় রেখেছেন।"
          action={{
            to: "/user/account/likes#liked-by",
            label:
              likers && !likers.locked
                ? "তালিকা দেখুন"
                : `তালিকা দেখুন (${bn(likers?.price ?? 50)} পয়েন্ট)`,
          }}
        />

        <StatCard
          Icon={HandThumbUpIcon}
          label="আমার পছন্দের তালিকা"
          value={bn(stats?.favorite_count)}
          suffix="টি"
          hint="আপনার পছন্দের তালিকাভুক্ত বায়োডাটা সমূহ।"
          action={{ to: "/user/account/likes", label: "লিস্ট দেখুন" }}
        />

        <StatCard
          Icon={HandThumbDownIcon}
          label="আমার অপছন্দের তালিকা"
          value={bn(stats?.unFavorite_count)}
          suffix="টি"
          hint="আপনার অপছন্দের তালিকাভুক্ত বায়োডাটা সমূহ।"
          action={{ to: "/user/account/dislikes", label: "লিস্ট দেখুন" }}
        />

        <StatCard
          Icon={ShoppingBagIcon}
          label="আমার ক্রয়সমূহ"
          value={bn(stats?.contact_purchase_count)}
          suffix="টি"
          hint="আপনার ক্রয় সংক্রান্ত সমস্ত তথ্য।"
          action={{ to: "/user/account/purchases", label: "বিস্তারিত দেখুন" }}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          Icon={EyeIcon}
          label="বায়োডাটা ভিজিট"
          value={bn(stats?.views_count)}
          suffix="বার"
          hint="আপনার বায়োডাটা যতবার ভিজিট করা হয়েছে।"
        />
        <RateCard
          Icon={CheckCircleIcon}
          label="আমার এপ্রুভাল রেট"
          percent={data?.results?.approvedPercentage}
          hint="এপ্রুভ করা প্রস্তাব ÷ মোট পাওয়া প্রস্তাব"
          tone={{ chip: "bg-emerald-50 text-emerald-600", bar: "bg-emerald-500" }}
        />
        <RateCard
          Icon={XCircleIcon}
          label="আমার রিজেকশন রেট"
          percent={data?.results?.rejectedPercentage}
          hint="রিজেক্ট করা প্রস্তাব ÷ মোট পাওয়া প্রস্তাব"
          tone={{ chip: "bg-rose-50 text-rose-500", bar: "bg-rose-400" }}
        />
      </div>
    </section>
  );
};

export default DashBoard;
