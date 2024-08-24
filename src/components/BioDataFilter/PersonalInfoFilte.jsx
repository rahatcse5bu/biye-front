/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import CustomAccordion from '../CustomAccordion/CustomAccordion';
import { Colors } from '../../constants/colors';

const CheckboxOption = ({ id, label }) => (
  <div className="inline-flex items-center">
    <label
      className="relative flex items-center p-3 rounded-full cursor-pointer"
      htmlFor={id}
      data-ripple-dark="true"
    >
      <input
        id={id}
        type="checkbox"
        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
      />
      <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5"
          viewBox="0 0 20 20"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
    </label>
    <label
      className="mt-px font-light text-gray-700 cursor-pointer select-none"
      htmlFor={id}
    >
      {label}
    </label>
  </div>
);

const PersonalInfoFilter = () => {
  const [personalInfoFilterOpen, setPersonalInfoFilterOpen] = useState(false);
  return (
    <CustomAccordion
      isOpen={personalInfoFilterOpen}
      onToggle={() => setPersonalInfoFilterOpen((prev) => !prev)}
      title="ব্যক্তিগত তথ্য"
    >
      <div className="py-5">
        <h3
          style={{ color: Colors.primary800 }}
          className="mt-4 mb-2 font-semibold text-center"
        >
          গাত্র বর্ন
        </h3>
        <div className="grid grid-cols-2">
          <CheckboxOption id="dark" label="কালো" />
          <CheckboxOption id="medium" label="শ্যামলা" />
          <CheckboxOption id="lightMedium" label="উজ্জ্বল শ্যামলা" />
          <CheckboxOption id="fair" label="ফর্সা" />
          <CheckboxOption id="veryFair" label="উজ্জ্বল ফর্সা" />
        </div>
      </div>

      <div>
        <h3
          style={{ color: Colors.primary800 }}
          className="mt-4 mb-2 font-semibold text-center"
        >
          ফিকহ অনুসরন
        </h3>
        <div className="grid grid-cols-2">
          <CheckboxOption id="hanafi" label="হানাফি" />
          <CheckboxOption id="maliki" label="মালিকি" />
          <CheckboxOption id="shafi" label="শাফিঈ" />
          <CheckboxOption id="hanbali" label="হাম্বলি" />
        </div>
      </div>
    </CustomAccordion>
  );
};

export default PersonalInfoFilter;
