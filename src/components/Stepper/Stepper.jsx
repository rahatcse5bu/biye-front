/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { convertToBengaliNumerals } from '../../utils/weight';

export const stepTitles = [
  'সাধারণ তথ্য',
  'ঠিকানা',
  'শিক্ষাগত যোগ্যতা',
  'পারিবারিক তথ্য',
  'ব্যাক্তিগত তথ্য',
  'পেশাগত তথ্য',
  'অর্জন',
  'বিবাহ সম্পর্কিত তথ্য',
  'প্রত্যাশিত জীবনসঙ্গী',
  'অঙ্গীকারনামা',
  'যোগাযোগ',
  'পর্যালোচনা',
];

// TODO: edited_timeline_index is the highest saved step (backend default 1); one step past it can be opened.
export const useStepProgress = () => {
  const { userInfo } = useContext(UserContext);
  const savedSteps = Math.min(userInfo?.data?.edited_timeline_index || 1, stepTitles.length);
  return {
    savedSteps,
    isDone: (step) => step <= savedSteps,
    isReachable: (step) => step <= savedSteps + 1,
  };
};

export function StepperLine({ userForm, setUserForm }) {
  const { savedSteps, isDone, isReachable } = useStepProgress();
  const nextTitle = stepTitles[userForm];

  return (
    <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-900 text-base font-bold text-white">
          {convertToBengaliNumerals(userForm)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-gray-500">
            ধাপ {convertToBengaliNumerals(userForm)} / {convertToBengaliNumerals(stepTitles.length)}
          </p>
          <p className="truncate text-base font-bold text-gray-900">{stepTitles[userForm - 1]}</p>
        </div>
        <span className="shrink-0 rounded-full bg-brand-900/10 px-2.5 py-1 text-xs font-bold text-brand-900">
          {convertToBengaliNumerals(savedSteps)} সম্পন্ন
        </span>
      </div>

      <div className="mt-4 flex gap-1" role="list" aria-label="বায়োডাটার ধাপসমূহ">
        {stepTitles.map((title, index) => {
          const step = index + 1;
          const current = step === userForm;
          return (
            <button
              key={title}
              type="button"
              role="listitem"
              disabled={!isReachable(step)}
              onClick={() => setUserForm(step)}
              aria-label={`ধাপ ${convertToBengaliNumerals(step)}: ${title}`}
              aria-current={current ? 'step' : undefined}
              className="group flex-1 py-2 disabled:cursor-not-allowed"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                  current
                    ? 'bg-brand-900 ring-2 ring-brand-900/25'
                    : isDone(step)
                      ? 'bg-brand-900/70'
                      : 'bg-gray-200 group-enabled:group-hover:bg-gray-300'
                }`}
              />
            </button>
          );
        })}
      </div>

      {nextTitle && (
        <p className="mt-1 text-xs text-gray-500">
          পরবর্তী: <span className="font-semibold text-gray-700">{nextTitle}</span>
        </p>
      )}
    </div>
  );
}
