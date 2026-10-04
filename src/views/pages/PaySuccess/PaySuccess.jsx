import { useCallback, useState } from 'react';
import { useNavigate, useSearchParams } from '@/lib/navigation';
import { CheckIcon, ClipboardDocumentIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import { Toast } from '../../../utils/toast';
import { getErrorMessage } from '../../../utils/error';
import { ContactPurchaseDataServices } from '../../../services/contactPurchaseData';
import { getToken } from '../../../utils/cookies';
import {
  PayResultShell,
  Spinner,
  cleanParam,
  primaryButton,
  secondaryButton,
  toBn,
  useCountdown,
} from '../PayResult/PayResult';

const REDIRECT_SECONDS = 6;

const formatTime = (value) => {
  if (!value) return '';
  const date = new Date(value.replace(/:(\d{3}) /, '.$1 '));
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleString('bn-BD', { dateStyle: 'medium', timeStyle: 'short' });
};

// TODO: where the user goes next, matching the purpose that started the payment.
const nextStep = (purpose, bioUser) => {
  if (bioUser && purpose === 'second_step') {
    return { label: 'যোগাযোগ তথ্য কিনুন', note: 'যোগাযোগ তথ্য কেনা সম্পন্ন করা হবে', buyContact: true };
  }
  if (bioUser && bioUser.length > 4) {
    return { label: 'প্রস্তাব পাঠান', note: 'প্রস্তাব পাঠানোর পেজে নেওয়া হবে', path: `/send-form/${bioUser}` };
  }
  return { label: 'ড্যাশবোর্ডে যান', note: 'আপনার ড্যাশবোর্ডে নেওয়া হবে', path: '/user/account/dashboard' };
};

const PaySuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const trxID = cleanParam(searchParams.get('trxID'));
  const amount = cleanParam(searchParams.get('amount'));
  const points = cleanParam(searchParams.get('points'));
  const time = cleanParam(searchParams.get('time'));
  const bioUser = cleanParam(searchParams.get('bio_user'));
  const purpose = cleanParam(searchParams.get('purpose'));

  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const step = nextStep(purpose, bioUser);

  const continueNow = useCallback(async () => {
    if (busy) return;
    if (!step.buyContact) {
      navigate(step.path, { replace: true });
      return;
    }
    setBusy(true);
    try {
      const data = await ContactPurchaseDataServices.createContactPurchaseData(
        { bio_user: bioUser },
        getToken().token
      );
      if (data.success) {
        Toast.successToast('আপনার বায়োডাটা ক্রয় সম্পূর্ন হয়েছে।');
        navigate('/user/account/purchases', { replace: true });
        return;
      }
    } catch (error) {
      Toast.errorToast(getErrorMessage(error));
    }
    setBusy(false);
  }, [busy, step, bioUser, navigate]);

  const secondsLeft = useCountdown(REDIRECT_SECONDS, continueNow, !busy);

  const copyTrx = async () => {
    try {
      await navigator.clipboard.writeText(trxID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      Toast.errorToast('কপি করা যায়নি');
    }
  };

  const details = [
    amount && { label: 'পরিমাণ', value: `৳${toBn(amount)}` },
    points && { label: 'যোগ হওয়া পয়েন্ট', value: `${toBn(Number(points).toFixed(0))} পয়েন্ট`, highlight: true },
    time && { label: 'সময়', value: formatTime(time) },
  ].filter(Boolean);

  return (
    <PayResultShell
      tone="success"
      icon={busy ? <Spinner /> : <CheckIcon className="h-10 w-10 stroke-[2.5]" aria-hidden="true" />}
      title={busy ? 'যোগাযোগ তথ্য কেনা হচ্ছে' : 'পেমেন্ট সফল হয়েছে!'}
      subtitle={busy ? 'অনুগ্রহ করে অপেক্ষা করুন...' : 'ধন্যবাদ! আপনার পেমেন্ট সম্পন্ন হয়েছে।'}
      progress={busy ? undefined : ((REDIRECT_SECONDS - secondsLeft) / REDIRECT_SECONDS) * 100}
    >
      {(details.length > 0 || trxID) && (
        <dl className="mt-6 divide-y divide-gray-100 rounded-xl border border-gray-100 bg-gray-50/60 text-left text-sm">
          {details.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-4 px-4 py-3">
              <dt className="text-gray-500">{item.label}</dt>
              <dd className={item.highlight ? 'font-bold text-emerald-700' : 'font-semibold text-gray-900'}>
                {item.value}
              </dd>
            </div>
          ))}
          {trxID && (
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <dt className="text-gray-500">ট্রানজেকশন আইডি</dt>
              <dd className="flex min-w-0 items-center gap-1.5">
                <span className="truncate font-mono text-xs font-semibold text-gray-900">{trxID}</span>
                <button
                  type="button"
                  onClick={copyTrx}
                  className="shrink-0 rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D7377]/40"
                  aria-label={copied ? 'কপি হয়েছে' : 'ট্রানজেকশন আইডি কপি করুন'}
                >
                  {copied ? (
                    <ClipboardDocumentCheckIcon className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                  ) : (
                    <ClipboardDocumentIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </dd>
            </div>
          )}
        </dl>
      )}

      {!busy && (
        <>
          <button type="button" onClick={continueNow} className={`${primaryButton} mt-6`}>
            {step.label}
          </button>
          <p className="mt-3 text-xs text-gray-500">
            {toBn(secondsLeft)} সেকেন্ডের মধ্যে {step.note}
          </p>
          {step.path !== '/user/account/dashboard' && !step.buyContact && (
            <button
              type="button"
              onClick={() => navigate('/user/account/dashboard', { replace: true })}
              className={`${secondaryButton} mt-3`}
            >
              ড্যাশবোর্ডে যান
            </button>
          )}
        </>
      )}
    </PayResultShell>
  );
};

export default PaySuccess;
