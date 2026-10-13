import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import {
  ArrowPathIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import { BiodataRevisionServices } from '../../services/biodataRevision';
import { BIODATA_STAGED_EVENT } from '../../utils/axios';
import { getToken } from '../../utils/cookies';
import { Toast } from '../../utils/toast';
import { getErrorMessage } from '../../utils/error';

const QUERY_KEY = ['biodata-revision', 'me'];
const REJECTION_VISIBLE_MS = 30 * 24 * 60 * 60 * 1000;

const toBn = (value) => String(value).replace(/\d/g, (digit) => '০১২৩৪৫৬৭৮৯'[digit]);

const button =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60';

const tones = {
  draft: 'border-amber-200 bg-amber-50 text-amber-900',
  pending: 'border-sky-200 bg-sky-50 text-sky-900',
  rejected: 'border-rose-200 bg-rose-50 text-rose-900',
  info: 'border-gray-200 bg-white text-gray-700',
};

// TODO: status of edits to a published biodata (draft -> submitted -> approved/rejected), with submit/withdraw actions.
const RevisionStatus = ({ full = false }) => {
  const queryClient = useQueryClient();
  const hasToken = Boolean(getToken()?.token);

  const { data, isLoading, refetch } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: BiodataRevisionServices.getMine,
    enabled: hasToken,
    retry: false,
  });

  useEffect(() => {
    const onStaged = () => refetch();
    window.addEventListener(BIODATA_STAGED_EVENT, onStaged);
    return () => window.removeEventListener(BIODATA_STAGED_EVENT, onStaged);
  }, [refetch]);

  const onDone = (result, message) => {
    queryClient.setQueryData(QUERY_KEY, result?.data);
    queryClient.invalidateQueries({ queryKey: ['bio-data'] });
    Toast.successToast(message);
  };

  const submitMutation = useMutation({
    mutationFn: BiodataRevisionServices.submit,
    onSuccess: (result) => onDone(result, 'পরিবর্তনগুলো অনুমোদনের জন্য জমা দেওয়া হয়েছে'),
    onError: (error) => Toast.errorToast(getErrorMessage(error)),
  });

  const withdrawMutation = useMutation({
    mutationFn: BiodataRevisionServices.withdraw,
    onSuccess: (result) => {
      onDone(result, 'পরিবর্তনগুলো বাতিল করা হয়েছে');
      // TODO: forms show staged values, so drop their cache to show the published biodata again.
      queryClient.invalidateQueries();
    },
    onError: (error) => Toast.errorToast(getErrorMessage(error)),
  });

  const confirmWithdraw = async (pending) => {
    const { isConfirmed } = await Swal.fire({
      icon: 'warning',
      title: pending ? 'অনুরোধ প্রত্যাহার করবেন?' : 'পরিবর্তন বাতিল করবেন?',
      text: 'আপনার জমা না হওয়া সব পরিবর্তন মুছে যাবে এবং প্রকাশিত বায়োডাটা আগের মতোই থাকবে।',
      showCancelButton: true,
      confirmButtonText: 'হ্যাঁ, বাতিল করুন',
      cancelButtonText: 'না',
      confirmButtonColor: '#be123c',
    });
    if (isConfirmed) withdrawMutation.mutate();
  };

  if (!hasToken || isLoading || !data?.published) return null;

  const { open, last_decision: last } = data;
  const busy = submitMutation.isPending || withdrawMutation.isPending;
  const sectionList = open?.sections?.map((s) => s.label).join(', ');
  const recentRejection =
    !open &&
    last?.status === 'rejected' &&
    Date.now() - new Date(last.reviewed_at).getTime() < REJECTION_VISIBLE_MS;

  let tone = 'info';
  let Icon = InformationCircleIcon;
  let title = 'আপনার বায়োডাটা প্রকাশিত আছে';
  let body = 'যেকোনো পরিবর্তন সেভ করে "অনুমোদনের জন্য জমা দিন" চাপলে অ্যাডমিন যাচাইয়ের পর তা প্রকাশিত হবে।';

  if (open?.status === 'draft') {
    tone = 'draft';
    Icon = ExclamationTriangleIcon;
    title = `আপনার ${toBn(open.field_count)}টি পরিবর্তন এখনো জমা দেওয়া হয়নি`;
    body = `পরিবর্তিত অংশ: ${sectionList}। জমা না দেওয়া পর্যন্ত এগুলো প্রকাশিত হবে না।`;
  } else if (open?.status === 'pending') {
    tone = 'pending';
    Icon = ClockIcon;
    title = `${toBn(open.field_count)}টি পরিবর্তন অ্যাডমিন অনুমোদনের অপেক্ষায়`;
    body = `পরিবর্তিত অংশ: ${sectionList}। অনুমোদনের আগ পর্যন্ত আগের বায়োডাটা প্রকাশিত থাকবে। এখন আরও পরিবর্তন করলে সেগুলোও এই অনুরোধে যুক্ত হবে।`;
  } else if (recentRejection) {
    tone = 'rejected';
    Icon = ExclamationTriangleIcon;
    title = 'আপনার সর্বশেষ পরিবর্তন অনুমোদিত হয়নি';
    body = `${last.admin_note ? `কারণ: ${last.admin_note}। ` : ''}প্রয়োজনীয় সংশোধন করে আবার জমা দিতে পারেন।`;
  } else if (!full) {
    return null;
  }

  return (
    <div className={`rounded-2xl border p-4 sm:p-5 ${tones[tone]} ${full ? 'mx-auto max-w-xl' : 'mb-4'}`} role="status">
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-6 w-6 shrink-0" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <p className="font-bold">{title}</p>
          <p className="mt-1 text-sm leading-6 opacity-90">{body}</p>

          {open && (
            <div className="mt-4 flex flex-wrap gap-2">
              {open.status === 'draft' && (
                <button
                  type="button"
                  onClick={() => submitMutation.mutate()}
                  disabled={busy}
                  className={`${button} bg-brand-900 text-white hover:bg-[#0F8287] focus-visible:ring-brand-900`}
                >
                  {submitMutation.isPending ? (
                    <ArrowPathIcon className="h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <PaperAirplaneIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                  অনুমোদনের জন্য জমা দিন
                </button>
              )}
              <button
                type="button"
                onClick={() => confirmWithdraw(open.status === 'pending')}
                disabled={busy}
                className={`${button} border border-black/10 bg-white/70 hover:bg-white focus-visible:ring-gray-500`}
              >
                {open.status === 'pending' ? 'অনুরোধ প্রত্যাহার করুন' : 'পরিবর্তন বাতিল করুন'}
              </button>
            </div>
          )}

          {full && !open && !recentRejection && last?.status === 'approved' && (
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
              <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
              সর্বশেষ পরিবর্তন অনুমোদিত হয়েছে
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RevisionStatus;
