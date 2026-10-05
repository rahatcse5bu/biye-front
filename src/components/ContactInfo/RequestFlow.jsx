import {
  CheckCircleIcon,
  CheckIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  LockClosedIcon,
  PlayCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { convertToBengaliNumerals } from '../../utils/weight';
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import ButtonSpinner from '../../views/Payments/ButtonSpinner';

const PROPOSAL_COST = 30;
const CONTACT_COST = 70;

// TODO: whole numbers without ".00", otherwise up to two decimals, in Bangla digits.
const bnPoints = (value) => convertToBengaliNumerals(String(Number(Number(value || 0).toFixed(2))));

const primaryButton =
  'inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0F8287] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto';

const Step = ({ number, title, cost, state }) => {
  const styles = {
    done: 'border-emerald-500 bg-emerald-500 text-white',
    current: 'border-brand-900 bg-brand-900 text-white',
    locked: 'border-gray-200 bg-white text-gray-400',
  }[state];
  return (
    <div className="flex min-w-0 flex-1 items-center gap-2.5">
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${styles}`}>
        {state === 'done' ? (
          <CheckIcon className="h-4 w-4 stroke-[3]" aria-hidden="true" />
        ) : state === 'locked' ? (
          <LockClosedIcon className="h-4 w-4" aria-hidden="true" />
        ) : (
          convertToBengaliNumerals(String(number))
        )}
      </span>
      <div className="min-w-0">
        <p className={`truncate text-sm font-semibold ${state === 'locked' ? 'text-gray-400' : 'text-gray-900'}`}>{title}</p>
        <p className="text-xs text-gray-500">{convertToBengaliNumerals(String(cost))} পয়েন্ট</p>
      </div>
    </div>
  );
};

const Panel = ({ tone, Icon, title, children }) => {
  const tones = {
    brand: 'border-brand-900/15 bg-brand-900/[0.04]',
    amber: 'border-amber-200 bg-amber-50',
    rose: 'border-rose-200 bg-rose-50',
    emerald: 'border-emerald-200 bg-emerald-50',
  };
  const iconTones = { brand: 'text-brand-900', amber: 'text-amber-600', rose: 'text-rose-600', emerald: 'text-emerald-600' };
  return (
    <div className={`rounded-2xl border p-4 sm:p-5 ${tones[tone]}`}>
      <div className="flex items-start gap-3">
        <Icon className={`mt-0.5 h-6 w-6 shrink-0 ${iconTones[tone]}`} aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-gray-900">{title}</p>
          <div className="mt-1 text-sm leading-6 text-gray-600">{children}</div>
        </div>
      </div>
    </div>
  );
};

// TODO: the two-step contact flow for verified biodatas: send a proposal, then buy the contact once accepted.
export default function RequestFlow({
  firstStatus,
  points,
  needsTopUp,
  loading,
  payLoading,
  onSendProposal,
  onBuyContact,
  onTopUp,
  onOpenFirstVideo,
  onOpenSecondVideo,
}) {
  const approved = firstStatus === 'approved' || firstStatus === 'accepted';
  const pending = firstStatus === 'pending';
  const rejected = firstStatus === 'rejected';
  const shortfall = Math.max(0, (approved ? CONTACT_COST : PROPOSAL_COST) - points);

  let panel;
  if (approved) {
    panel = (
      <Panel tone="emerald" Icon={CheckCircleIcon} title="আপনার প্রস্তাব গৃহীত হয়েছে">
        <p>এখন অভিভাবকের যোগাযোগ তথ্য নিতে পারবেন।</p>
        <p className="mt-1 text-xs text-gray-500">
          {shortfall > 0
            ? `আরও ${bnPoints(shortfall)} পয়েন্ট প্রয়োজন — বাকিটা বিকাশে পরিশোধ করতে পারবেন।`
            : `কেনার পর আপনার ${bnPoints(points - CONTACT_COST)} পয়েন্ট থাকবে।`}
        </p>
        <button type="button" onClick={onBuyContact} disabled={loading} className={`${primaryButton} mt-4`}>
          {loading ? <LoadingCircle /> : `যোগাযোগ তথ্য নিন (${convertToBengaliNumerals(String(CONTACT_COST))} পয়েন্ট)`}
        </button>
      </Panel>
    );
  } else if (pending) {
    panel = (
      <Panel tone="amber" Icon={ClockIcon} title="প্রস্তাব পাঠানো হয়েছে — উত্তরের অপেক্ষায়">
        পাত্র/পাত্রী আপনার প্রস্তাব গ্রহণ করলে আপনাকে নোটিফিকেশন ও ইমেইলে জানানো হবে। তারপর যোগাযোগ তথ্য নিতে পারবেন।
      </Panel>
    );
  } else if (rejected) {
    panel = (
      <Panel tone="rose" Icon={XCircleIcon} title="প্রস্তাবটি গৃহীত হয়নি">
        দুঃখিত, এই পাত্র/পাত্রী এই মুহূর্তে আগ্রহী নন। আরও বায়োডাটা দেখে নতুন প্রস্তাব পাঠাতে পারেন।
      </Panel>
    );
  } else if (needsTopUp) {
    panel = (
      <Panel tone="brand" Icon={ExclamationTriangleIcon} title="পর্যাপ্ত পয়েন্ট নেই">
        <p>প্রস্তাব পাঠাতে আরও {bnPoints(shortfall)} পয়েন্ট প্রয়োজন।</p>
        <button type="button" onClick={onTopUp} disabled={payLoading} aria-busy={payLoading} className={`${primaryButton} mt-4`}>
          {payLoading ? (
            <>
              <ButtonSpinner /> অপেক্ষা করুন...
            </>
          ) : (
            `${bnPoints(shortfall)} পয়েন্ট কিনুন`
          )}
        </button>
      </Panel>
    );
  } else {
    panel = (
      <Panel tone="brand" Icon={CheckCircleIcon} title="আগ্রহী হলে প্রস্তাব পাঠান">
        <p>আপনার বায়োডাটা ও প্রস্তাব পাঠানো হবে। তিনি গ্রহণ করলে অভিভাবকের যোগাযোগ তথ্য নিতে পারবেন।</p>
        <button type="button" onClick={onSendProposal} className={`${primaryButton} mt-4`}>
          প্রস্তাব পাঠান ({convertToBengaliNumerals(String(PROPOSAL_COST))} পয়েন্ট)
        </button>
      </Panel>
    );
  }

  return (
    <div className="space-y-4 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-bold text-gray-900">যোগাযোগ তথ্য</h3>
        <span className="rounded-full bg-brand-900/10 px-3 py-1 text-xs font-semibold text-brand-900">
          আপনার পয়েন্ট: {bnPoints(points)}
        </span>
      </div>

      <div className="flex items-center gap-2 rounded-2xl border border-gray-100 bg-gray-50/70 p-3">
        <Step number={1} title="প্রস্তাব পাঠান" cost={PROPOSAL_COST} state={firstStatus ? 'done' : 'current'} />
        <div className={`h-0.5 w-6 shrink-0 rounded sm:w-10 ${approved ? 'bg-emerald-400' : 'bg-gray-200'}`} aria-hidden="true" />
        <Step number={2} title="যোগাযোগ তথ্য" cost={CONTACT_COST} state={approved ? 'current' : 'locked'} />
      </div>

      {panel}

      <p className="flex items-start gap-2 rounded-xl bg-amber-50/70 px-3 py-2.5 text-xs leading-5 text-amber-900">
        <ExclamationTriangleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        সতর্কতা: বিয়ের সিদ্ধান্ত নেয়ার পূর্বে স্থানীয়ভাবে খোঁজ নিয়ে বায়োডাটার সমস্ত তথ্য যাচাই করবেন।
      </p>

      <div>
        <p className="mb-2 text-xs font-semibold text-gray-500">যোগাযোগ তথ্য কিভাবে দেখবেন — ভিডিও দেখুন</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            ['প্রস্তাব পাঠানোর নিয়ম', onOpenFirstVideo],
            ['যোগাযোগ তথ্য নেওয়ার নিয়ম', onOpenSecondVideo],
          ].map(([label, onClick]) => (
            <button
              key={label}
              type="button"
              onClick={onClick}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900/40"
            >
              <PlayCircleIcon className="h-5 w-5 shrink-0 text-red-500" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
