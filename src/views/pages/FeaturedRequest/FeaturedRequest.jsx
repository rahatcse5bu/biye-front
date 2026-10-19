import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@/lib/navigation';
import {
  CheckBadgeIcon,
  ClockIcon,
  CursorArrowRaysIcon,
  EyeIcon,
  HomeModernIcon,
  SparklesIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { FeaturedRequestServices } from '../../../services/featuredRequest';
import { convertToBengaliDigits as bn } from '../../../utils/language';
import { getErrorMessage } from '../../../utils/error';
import { Toast } from '../../../utils/toast';
import { trackEvent } from '../../../utils/analytics';

const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

const STATUS = {
  pending: { label: 'পর্যালোচনাধীন', className: 'bg-amber-50 text-amber-700' },
  approved: { label: 'অনুমোদিত', className: 'bg-emerald-50 text-emerald-700' },
  rejected: { label: 'বাতিল', className: 'bg-rose-50 text-rose-700' },
};

const BENEFITS = [
  { Icon: HomeModernIcon, text: 'হোমপেজের ফিচার্ড অংশে এবং মিলে যাওয়া সার্চ ফলাফলের শুরুতে আপনার বায়োডাটা দেখানো হবে' },
  { Icon: CursorArrowRaysIcon, text: 'কতজন আপনার বায়োডাটা দেখেছেন ও ক্লিক করেছেন, তা এখানেই দেখতে পারবেন' },
  { Icon: EyeIcon, text: 'আরও বেশি সদস্যের চোখে পড়বে, ফলে প্রস্তাব পাওয়ার সম্ভাবনা বাড়বে' },
  { Icon: CheckBadgeIcon, text: 'অ্যাডমিন যাচাই করে অনুমোদন দেন; অনুমোদন না হলে টাকা ফেরত দেওয়া হয়' },
];

// TODO: current featuring state of the member's biodata, with the one action that fits it.
const StatusCard = ({ data }) => {
  const pending = data.requests?.find((item) => item.status === 'pending');
  if (data.is_featured) {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <SparklesIcon className="h-6 w-6 flex-none text-emerald-600" aria-hidden="true" />
        <div>
          <p className="font-semibold text-emerald-800">আপনার বায়োডাটা এখন ফিচার্ড</p>
          <p className="text-sm text-emerald-700">
            {data.featured_until
              ? `${formatDate(data.featured_until)} পর্যন্ত হোমপেজ ও সার্চ ফলাফলে দেখানো হবে। চাইলে এখনই মেয়াদ বাড়াতে পারেন।`
              : 'অ্যাডমিন আপনার বায়োডাটা ফিচার্ড করেছেন।'}
          </p>
        </div>
      </div>
    );
  }
  if (pending) {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <ClockIcon className="h-6 w-6 flex-none text-amber-600" aria-hidden="true" />
        <div>
          <p className="font-semibold text-amber-800">আপনার অনুরোধ পর্যালোচনা করা হচ্ছে</p>
          <p className="text-sm text-amber-700">
            পেমেন্ট পাওয়া গেছে। অ্যাডমিন অনুমোদন দিলেই আপনার বায়োডাটা {bn(pending.duration_days)} দিনের জন্য ফিচার্ড হবে।
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const FeaturedRequest = () => {
  const [starting, setStarting] = useState(false);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['featured-request', 'me'],
    queryFn: FeaturedRequestServices.getMine,
    retry: false,
  });

  const startPayment = async () => {
    if (starting) return;
    setStarting(true);
    try {
      const result = await FeaturedRequestServices.checkout();
      trackEvent('begin_checkout', { value: Number(result.amount), currency: 'BDT', purpose: 'featured' });
      window.location.href = result.bkashURL;
    } catch (error) {
      Toast.errorToast(getErrorMessage(error));
      setStarting(false);
      refetch();
    }
  };

  if (isLoading) {
    return <div className="py-16 text-center text-gray-500">লোড হচ্ছে...</div>;
  }
  if (isError || !data) {
    return (
      <div className="py-16 text-center text-gray-500">
        তথ্য লোড করা যায়নি।{' '}
        <button type="button" onClick={() => refetch()} className="font-semibold text-[#0D7377] underline">
          আবার চেষ্টা করুন
        </button>
      </div>
    );
  }

  const { settings } = data;

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-1 py-8">
      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="bg-gradient-to-br from-[#0D7377] to-[#119196] px-6 py-7 text-white">
          <div className="flex items-center gap-2 text-sm font-medium text-white/80">
            <SparklesIcon className="h-5 w-5" aria-hidden="true" />
            ফিচার্ড বায়োডাটা
          </div>
          <h1 className="mt-2 text-2xl font-bold">আপনার বায়োডাটা ফিচার্ড করুন</h1>
          <p className="mt-1 text-sm text-white/85">হোমপেজে আলাদাভাবে দেখানোর মাধ্যমে উপযুক্ত পাত্র-পাত্রীর কাছে দ্রুত পৌঁছান।</p>
        </div>

        <div className="space-y-6 p-6">
          <ul className="space-y-3">
            {BENEFITS.map(({ Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm text-gray-700">
                <Icon className="h-5 w-5 flex-none text-[#0D7377]" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-end justify-between gap-4 rounded-xl bg-[#EAF5F5] p-5">
            <div>
              <p className="text-sm text-gray-600">মূল্য</p>
              <p className="text-3xl font-bold text-[#0D7377]">৳{bn(settings.price)}</p>
              <p className="text-sm text-gray-600">{bn(settings.duration_days)} দিনের জন্য ফিচার্ড</p>
            </div>
            {data.can_request && (
              <button
                type="button"
                onClick={startPayment}
                disabled={starting}
                className="rounded-lg bg-[#E2136E] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#c8105f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E2136E]/40 disabled:opacity-60"
              >
                {starting ? 'বিকাশে নেওয়া হচ্ছে...' : data.is_featured ? `বিকাশে ৳${bn(settings.price)} দিয়ে মেয়াদ বাড়ান` : `বিকাশে ৳${bn(settings.price)} পরিশোধ করুন`}
              </button>
            )}
          </div>

          <StatusCard data={data} />

          {!data.can_request && data.reason && !data.is_featured && !data.requests?.some((r) => r.status === 'pending') && (
            <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
              <XCircleIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
              <div>
                {data.reason}{' '}
                {settings.enabled && (
                  <Link to="/user/account/edit-biodata" className="font-semibold text-[#0D7377] underline">
                    বায়োডাটা দেখুন
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {data.requests?.length > 0 && (
        <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <h2 className="border-b border-gray-100 px-6 py-4 text-lg font-semibold text-gray-900">আমার ফিচার্ড অনুরোধ</h2>
          <ul className="divide-y divide-gray-100">
            {data.requests.map((item) => {
              const status = STATUS[item.status] || STATUS.pending;
              return (
                <li key={item._id} className="flex flex-wrap items-start justify-between gap-3 px-6 py-4 text-sm">
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-900">
                      ৳{bn(item.amount)} · {bn(item.duration_days)} দিন
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(item.createdAt)}
                      {item.transaction_id && <> · TrxID: <span className="font-mono">{item.transaction_id}</span></>}
                    </p>
                    {item.status === 'approved' && item.featured_until && (
                      <p className="text-xs text-emerald-700">ফিচার্ড মেয়াদ: {formatDate(item.featured_until)} পর্যন্ত</p>
                    )}
                    {item.status === 'approved' && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        <span className="inline-flex items-center gap-1 rounded-lg bg-gray-50 px-2.5 py-1 text-xs text-gray-700">
                          <EyeIcon className="h-4 w-4 text-[#0D7377]" aria-hidden="true" />
                          ইমপ্রেশন: <span className="font-semibold">{bn(String(item.impressions || 0))}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-lg bg-gray-50 px-2.5 py-1 text-xs text-gray-700">
                          <CursorArrowRaysIcon className="h-4 w-4 text-[#0D7377]" aria-hidden="true" />
                          ক্লিক: <span className="font-semibold">{bn(String(item.clicks || 0))}</span>
                        </span>
                      </div>
                    )}
                    {item.status === 'rejected' && (
                      <p className="text-xs text-rose-700">
                        {item.admin_note ? `কারণ: ${item.admin_note}` : 'অনুরোধটি অনুমোদন হয়নি।'}
                        {item.refunded ? ' টাকা বিকাশে ফেরত পাঠানো হয়েছে।' : ''}
                      </p>
                    )}
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}>{status.label}</span>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
};

export default FeaturedRequest;
