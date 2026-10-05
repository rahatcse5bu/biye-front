import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  CheckIcon,
  ClipboardDocumentIcon,
  EnvelopeIcon,
  IdentificationIcon,
  KeyIcon,
  ShieldCheckIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import ChangePasswordForm from '../../../components/Settings/ChangePasswordForm';
import ActiveDeleteButton from '../../../components/Settings/ActiveDeleteButton';
import ProfileAvatar from '../../../components/ProfileAvatar/ProfileAvatar';
import LoadingCircle from '../../../components/LoadingCircle/LoadingCircle';
import { userServices } from '../../../services/user';
import { getToken } from '../../../utils/cookies';
import { convertToBengaliDigits } from '../../../utils/language';

const toBn = (value) => convertToBengaliDigits(String(value));

const statusStyles = {
  active: { label: 'সক্রিয়', className: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
  inactive: { label: 'নিষ্ক্রিয়', className: 'bg-gray-100 text-gray-700 ring-gray-200' },
  pending: { label: 'অপেক্ষমাণ', className: 'bg-amber-50 text-amber-700 ring-amber-200' },
  'in review': { label: 'পর্যালোচনাধীন', className: 'bg-sky-50 text-sky-700 ring-sky-200' },
  banned: { label: 'নিষিদ্ধ', className: 'bg-rose-50 text-rose-700 ring-rose-200' },
  ban: { label: 'নিষিদ্ধ', className: 'bg-rose-50 text-rose-700 ring-rose-200' },
};

const formatDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? '—'
    : date.toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const SettingsCard = ({ icon: Icon, title, description, children }) => (
  <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
    <div className="mb-5 flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0D7377]/10 text-[#0D7377]">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {description && <p className="mt-0.5 text-sm text-gray-500">{description}</p>}
      </div>
    </div>
    {children}
  </section>
);

const CopyButton = ({ value }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard can be blocked; the value is still visible to copy by hand.
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D7377]/40"
      aria-label={copied ? 'কপি হয়েছে' : 'কপি করুন'}
    >
      {copied ? <CheckIcon className="h-4 w-4 text-emerald-600" /> : <ClipboardDocumentIcon className="h-4 w-4" />}
    </button>
  );
};

const DetailRow = ({ label, children }) => (
  <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
    <dt className="text-sm text-gray-500">{label}</dt>
    <dd className="flex min-w-0 items-center gap-1.5 text-sm font-medium text-gray-900 sm:justify-end">{children}</dd>
  </div>
);

function Settings() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['user-info', 'me'],
    queryFn: () => userServices.getCurrentUser(getToken()?.token),
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="py-16">
        <LoadingCircle />
      </div>
    );
  }

  const me = data?.data;
  if (isError || !me) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <p className="text-gray-600">অ্যাকাউন্টের তথ্য লোড করা যায়নি।</p>
        <button onClick={() => refetch()} className="mt-3 font-semibold text-[#0D7377] underline">
          আবার চেষ্টা করুন
        </button>
      </div>
    );
  }

  const status = statusStyles[me.user_status] || { label: me.user_status || '—', className: 'bg-gray-100 text-gray-700 ring-gray-200' };
  const usesGoogle = Boolean(me.google_id);
  const loginMethod = usesGoogle && me.has_password
    ? 'Google ও ইমেইল-পাসওয়ার্ড'
    : usesGoogle
      ? 'Google'
      : 'ইমেইল ও পাসওয়ার্ড';

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-6 sm:py-8">
      <header className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#0D7377] to-[#0B5E61] text-white shadow-sm">
        <div className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/15 ring-2 ring-white/30">
            <ProfileAvatar className="h-full w-full object-cover" iconClassName="h-12 w-12 text-white/90" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-2xl font-bold">{me.username || 'আমার অ্যাকাউন্ট'}</h1>
            <p className="mt-0.5 truncate text-sm text-white/80">{me.email}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {me.user_id && (
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">BID-{toBn(me.user_id)}</span>
            )}
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0D7377]">
              {toBn(Number(me.points || 0).toFixed(0))} পয়েন্ট
            </span>
          </div>
        </div>
      </header>

      <SettingsCard icon={IdentificationIcon} title="অ্যাকাউন্টের তথ্য" description="আপনার লগইন ও অ্যাকাউন্টের বর্তমান তথ্য">
        <dl className="divide-y divide-gray-100">
          <DetailRow label="লগইন ইমেইল">
            <EnvelopeIcon className="h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
            <span className="truncate">{me.email}</span>
            <CopyButton value={me.email} />
          </DetailRow>
          <DetailRow label="নাম">
            <UserIcon className="h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
            {me.username || '—'}
          </DetailRow>
          {me.user_id && (
            <DetailRow label="বায়োডাটা নং">
              <span className="font-mono">BID-{me.user_id}</span>
              <CopyButton value={`BID-${me.user_id}`} />
            </DetailRow>
          )}
          <DetailRow label="লগইন পদ্ধতি">
            {usesGoogle && (
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
              </svg>
            )}
            {loginMethod}
          </DetailRow>
          <DetailRow label="পাসওয়ার্ড">
            {me.has_password ? (
              <span className="tracking-[0.3em] text-gray-700" aria-label="পাসওয়ার্ড সেট করা আছে">••••••••</span>
            ) : (
              <span className="text-gray-500">সেট করা নেই (Google দিয়ে লগইন)</span>
            )}
          </DetailRow>
          {me.gender && <DetailRow label="লিঙ্গ">{me.gender}</DetailRow>}
          <DetailRow label="অ্যাকাউন্ট স্ট্যাটাস">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${status.className}`}>{status.label}</span>
          </DetailRow>
          <DetailRow label="সদস্য হয়েছেন">{formatDate(me.createdAt)}</DetailRow>
        </dl>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
          <ShieldCheckIcon className="h-4 w-4" aria-hidden="true" />
          নিরাপত্তার জন্য আপনার পাসওয়ার্ড কখনো দেখানো হয় না।
        </p>
      </SettingsCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <SettingsCard icon={KeyIcon} title="পাসওয়ার্ড পরিবর্তন" description="নিয়মিত পাসওয়ার্ড পরিবর্তন করে অ্যাকাউন্ট নিরাপদ রাখুন">
          {me.has_password ? (
            <ChangePasswordForm />
          ) : (
            <p className="rounded-xl bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-600">
              আপনি Google দিয়ে লগইন করেন, তাই এই অ্যাকাউন্টে আলাদা কোনো পাসওয়ার্ড নেই। আপনার Google অ্যাকাউন্টের নিরাপত্তা Google থেকেই পরিচালনা করুন।
            </p>
          )}
        </SettingsCard>

        <SettingsCard icon={ShieldCheckIcon} title="বায়োডাটার দৃশ্যমানতা" description="আপনার বায়োডাটা অন্যরা দেখতে পাবে কি না">
          <ActiveDeleteButton />
        </SettingsCard>
      </div>
    </div>
  );
}

export default Settings;
