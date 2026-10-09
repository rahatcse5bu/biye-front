/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CheckIcon, LockClosedIcon } from '@heroicons/react/20/solid';
import { stepTitles, useStepProgress } from '../Stepper/Stepper';
import { convertToBengaliNumerals } from '../../utils/weight';
import UserContext from '../../contexts/UserContext';
import { UserInfoServices } from '../../services/userInfo';
import { getToken, removeToken } from '../../utils/cookies';
import { clearUserLocalStorage } from '../../utils/localStorage';
import { Toast } from '../../utils/toast';
import { useNavigate } from '@/lib/navigation';

const Numbering = ({ setUserForm, userForm }) => {
  const { userInfo, logOut, user } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    data: tokenData,
    isError,
    error,
  } = useQuery({
    queryKey: ['user-info', getToken()?.token],
    queryFn: async () => {
      return await UserInfoServices.verifyTokenByUser(getToken()?.token);
    },
    retry: true,
    enabled: !!getToken()?.token,
  });

  useEffect(() => {
    // Removed technical issues toast
  }, []);

  const logoutHandler = async () => {
    await logOut();
    removeToken();
    clearUserLocalStorage();
    navigate('/');
  };

  useEffect(() => {
    if (
      isError &&
      error &&
      getToken()?.token &&
      process.env.NODE_ENV === 'production'
    ) {
      Toast.errorToast(error?.response.data?.error);
      logoutHandler();
    }
  }, [isError, error]);

  useEffect(() => {
    if (user && user?.email && !getToken()?.token) {
      logoutHandler();
    }
  }, []);

  const { savedSteps, isDone, isReachable } = useStepProgress();
  const total = stepTitles.length;
  const percent = Math.round((savedSteps / total) * 100);

  return (
    <nav
      aria-label="বায়োডাটার ধাপসমূহ"
      className="sticky top-[88px] mt-6 max-h-[calc(100dvh-108px)] overflow-y-auto rounded-3xl border border-gray-200 bg-white shadow-sm"
    >
      <div className="flex items-center gap-4 border-b border-gray-100 px-5 py-5">
        <ProgressRing percent={percent} />
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">বায়োডাটা তৈরি</p>
          <p className="mt-0.5 text-lg font-bold text-gray-900">
            {convertToBengaliNumerals(percent)}% সম্পন্ন
          </p>
          <p className="text-xs text-gray-500">
            {convertToBengaliNumerals(total)}টি ধাপের মধ্যে {convertToBengaliNumerals(savedSteps)}টি
          </p>
        </div>
      </div>

      <ol className="px-3 py-3">
        {stepTitles.map((title, index) => {
          const step = index + 1;
          const current = step === userForm;
          const done = isDone(step) && !current;
          const reachable = isReachable(step);
          const lineFilled = isDone(step) && step < total;
          const status = current
            ? 'এখন পূরণ করছেন'
            : done
              ? 'সম্পন্ন'
              : reachable
                ? 'পরবর্তী ধাপ'
                : 'আগের ধাপ শেষ করুন';

          return (
            <li key={title} className="relative">
              {step < total && (
                <span
                  aria-hidden="true"
                  className={`absolute left-[27px] top-11 h-[calc(100%-28px)] w-0.5 rounded-full ${
                    lineFilled ? 'bg-brand-900' : 'bg-gray-200'
                  }`}
                />
              )}
              <button
                type="button"
                disabled={!reachable}
                onClick={() => setUserForm(step)}
                aria-current={current ? 'step' : undefined}
                className={`group relative flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 motion-reduce:transition-none ${
                  current ? 'bg-brand-900/[0.06]' : 'enabled:hover:bg-gray-50'
                } disabled:cursor-not-allowed`}
              >
                <StepDot step={step} current={current} done={done} reachable={reachable} />
                <span className="min-w-0">
                  <span
                    className={`block truncate text-[15px] leading-6 ${
                      current
                        ? 'font-bold text-brand-900'
                        : done
                          ? 'font-semibold text-gray-800'
                          : reachable
                            ? 'font-semibold text-gray-700'
                            : 'text-gray-400'
                    }`}
                  >
                    {title}
                  </span>
                  <span className={`block text-xs ${current ? 'text-brand-900/70' : 'text-gray-400'}`}>
                    {status}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

function StepDot({ step, current, done, reachable }) {
  const base = 'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors duration-200 motion-reduce:transition-none';
  if (done) {
    return (
      <span className={`${base} bg-brand-900 text-white`}>
        <CheckIcon className="h-4 w-4" aria-hidden="true" />
      </span>
    );
  }
  if (current) {
    return (
      <span className={`${base} border-2 border-brand-900 bg-white text-brand-900 ring-4 ring-brand-900/15`}>
        {convertToBengaliNumerals(step)}
      </span>
    );
  }
  if (reachable) {
    return (
      <span className={`${base} border-2 border-gray-300 bg-white text-gray-600 group-hover:border-brand-900/50`}>
        {convertToBengaliNumerals(step)}
      </span>
    );
  }
  return (
    <span className={`${base} bg-gray-100 text-gray-400`}>
      <LockClosedIcon className="h-3.5 w-3.5" aria-hidden="true" />
    </span>
  );
}

function ProgressRing({ percent }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  return (
    <span className="relative flex h-16 w-16 shrink-0 items-center justify-center">
      <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90" aria-hidden="true">
        <circle cx="32" cy="32" r={radius} fill="none" strokeWidth="6" className="stroke-gray-100" />
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - percent / 100)}
          className="stroke-brand-900 transition-[stroke-dashoffset] duration-700 ease-out motion-reduce:transition-none"
        />
      </svg>
      <span className="absolute text-sm font-bold text-brand-900">{convertToBengaliNumerals(percent)}%</span>
    </span>
  );
}

export default Numbering;
