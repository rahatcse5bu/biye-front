/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { convertToBengaliNumerals } from '../../utils/weight';

const stepTitles = [
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

export function StepperLine({ userForm, setUserForm }) {
  const { userInfo } = useContext(UserContext);

  const editedTimelineIndex = userInfo?.data?.edited_timeline_index || 1;

  return (
    <div className="w-full mx-auto mb-6">
      <div className="flex gap-1">
        {stepTitles.map((title, index) => {
          const stepNumber = index + 1;
          const isReachable = stepNumber <= editedTimelineIndex + 1;
          const isFilled = stepNumber <= Math.max(userForm, editedTimelineIndex);

          return (
            <button
              key={title}
              type="button"
              disabled={!isReachable}
              onClick={() => isReachable && setUserForm(stepNumber)}
              aria-label={`ধাপ ${stepNumber}: ${title}`}
              aria-current={stepNumber === userForm ? 'step' : undefined}
              className={`flex-1 py-3 ${
                isReachable ? 'cursor-pointer' : 'cursor-not-allowed'
              }`}
            >
              <span
                className={`block h-1.5 rounded-full transition-colors duration-500 ease-out ${
                  isFilled ? 'bg-brand-900' : 'bg-gray-200'
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="mt-2 flex items-center justify-between">
        <p className="text-sm font-bold text-gray-500">
          ধাপ {convertToBengaliNumerals(userForm)}
          <span className="font-normal text-gray-400">
            {' '}
            / {convertToBengaliNumerals(stepTitles.length)}
          </span>
        </p>
        <p className="text-sm font-semibold text-brand-900">
          {stepTitles[userForm - 1]}
        </p>
      </div>
    </div>
  );
}
