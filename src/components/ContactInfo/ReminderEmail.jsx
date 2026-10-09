'use client';

import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { EnvelopeIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { BioChoiceDataServices } from '../../services/bioChoiceData';
import { convertToBengaliNumerals } from '../../utils/weight';
import { Toast } from '../../utils/toast';
import { getErrorMessage } from '../../utils/error';
import ButtonSpinner from '../../views/Payments/ButtonSpinner';

const bn = (value) => convertToBengaliNumerals(String(value ?? 0));

const formatUnlock = (iso) =>
  new Intl.DateTimeFormat('bn-BD', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }).format(
    new Date(iso),
  );

const cooldownText = (hours) => {
  if (!hours) return '';
  if (hours % 24 === 0) return hours === 24 ? 'প্রতি ২৪ ঘণ্টায় একটি' : `প্রতি ${bn(hours / 24)} দিনে একটি`;
  return `প্রতি ${bn(hours)} ঘণ্টায় একটি`;
};

// TODO: lets the sender of a pending proposal email the biodata owner a reminder, showing used/allowed counts.
export default function ReminderEmail({ bioUser, reminders, compact = false, inline = false }) {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState(reminders);
  const [sending, setSending] = useState(false);

  useEffect(() => setStatus(reminders), [reminders]);

  // TODO: re-check the clock each minute so the button unlocks without a reload.
  const [, setTick] = useState(0);
  useEffect(() => {
    if (!status?.next_available_at) return undefined;
    const timer = setInterval(() => setTick((n) => n + 1), 60 * 1000);
    return () => clearInterval(timer);
  }, [status?.next_available_at]);

  if (!status || !status.limit) return null;

  const waiting = status.next_available_at && new Date(status.next_available_at).getTime() > Date.now();
  const used = status.remaining === 0;
  const canSend = !used && !waiting;

  const send = async () => {
    setSending(true);
    try {
      const response = await BioChoiceDataServices.sendReminderEmail(bioUser);
      setStatus(response?.data);
      Toast.successToast('রিমাইন্ডার ইমেইল পাঠানো হয়েছে।');
    } catch (error) {
      const latest = error?.response?.data?.data;
      if (latest?.limit !== undefined) setStatus(latest);
      Toast.errorToast(getErrorMessage(error));
    } finally {
      setSending(false);
      queryClient.invalidateQueries({ queryKey: ['first-step', bioUser] });
      queryClient.invalidateQueries({ queryKey: ['bio-choice-data', 'first-step'] });
    }
  };

  const hint = used
    ? 'এই প্রস্তাবের সব রিমাইন্ডার ইমেইল পাঠানো হয়ে গেছে।'
    : waiting
      ? `পরবর্তী ইমেইল পাঠাতে পারবেন ${formatUnlock(status.next_available_at)} থেকে।`
      : `আরও ${bn(status.remaining)}টি পাঠাতে পারবেন${status.cooldown_hours ? ` · ${cooldownText(status.cooldown_hours)}` : ''}।`;

  // TODO: table-row size: one button with the count; the hint moves into the tooltip.
  if (inline) {
    return (
      <button
        type="button"
        onClick={() => void send()}
        disabled={!canSend || sending}
        title={hint}
        aria-label={`রিমাইন্ডার ইমেইল পাঠান (${status.sent}/${status.limit}). ${hint}`}
        className="mr-2 inline-flex items-center gap-1 rounded-lg border border-amber-300 bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-900 transition-colors hover:bg-amber-100 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-400"
      >
        {sending ? <ButtonSpinner className="h-3.5 w-3.5" /> : <EnvelopeIcon className="h-3.5 w-3.5" aria-hidden="true" />}
        {bn(status.sent)}/{bn(status.limit)}
      </button>
    );
  }

  return (
    <div className={`rounded-xl border border-amber-200/80 bg-white ${compact ? 'p-3' : 'mt-4 p-3.5'}`}>
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
          <EnvelopeIcon className="h-4 w-4 text-amber-600" aria-hidden="true" />
          রিমাইন্ডার ইমেইল
        </p>
        <span className="text-xs font-semibold text-gray-700" aria-label={`${status.sent} of ${status.limit} sent`}>
          {bn(status.sent)}/{bn(status.limit)} পাঠানো হয়েছে
        </span>
      </div>

      <div className="mt-2 flex gap-1" aria-hidden="true">
        {Array.from({ length: status.limit }, (_, i) => (
          <span key={i} className={`h-1.5 flex-1 rounded-full ${i < status.sent ? 'bg-amber-500' : 'bg-gray-200'}`} />
        ))}
      </div>

      <p className="mt-2 text-xs leading-5 text-gray-500">{hint}</p>

      <button
        type="button"
        onClick={() => void send()}
        disabled={!canSend || sending}
        aria-busy={sending}
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-900 transition-colors hover:bg-amber-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-400 sm:w-auto"
      >
        {sending ? (
          <>
            <ButtonSpinner /> পাঠানো হচ্ছে...
          </>
        ) : used ? (
          <>
            <CheckCircleIcon className="h-4 w-4" aria-hidden="true" /> সব ইমেইল পাঠানো হয়েছে
          </>
        ) : waiting ? (
          <>
            <ClockIcon className="h-4 w-4" aria-hidden="true" /> অপেক্ষা করুন
          </>
        ) : (
          <>
            <EnvelopeIcon className="h-4 w-4" aria-hidden="true" /> রিমাইন্ডার ইমেইল পাঠান
          </>
        )}
      </button>
    </div>
  );
}
