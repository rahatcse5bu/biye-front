import React, { useState, useContext } from 'react';
import CustomAccordion from '../CustomAccordion/CustomAccordion';
import { Colors } from '../../constants/colors';
import CustomCheckboxOption from '../CustomCheckBoxOption/CustomCheckBoxOption';
import BioContext from '../../contexts/BioContext';

const EXP_MARITAL_STATUS = [
  'অবিবাহিত',
  'বিবাহিত',
  'ডিভোর্সড',
  'বিধবা',
  'বিপত্নীক',
];

const EXP_OCCUPATION = [
  'ডাক্তার',
  'ইঞ্জিনিয়ার',
  'শিক্ষক',
  'ব্যবসায়ী',
  'সরকারী চাকুরী',
  'বেসরকারী চাকুরী',
  'ফ্রিল্যান্সার',
  'প্রবাসী',
  'শিক্ষার্থী',
  'ইমাম',
  'মাদ্রাসা শিক্ষক',
  'হাফেজ',
  'পেশা নেই',
  'অন্যান্য',
];

const EXP_ECONOMICAL_CONDITION = [
  'উচ্চবিত্ত',
  'উচ্চ মধ্যবিত্ত',
  'মধ্যবিত্ত',
  'নিম্ন মধ্যবিত্ত',
  'নিম্নবিত্ত',
];

const EXP_EDUCATION = [
  "এস.এস.সি'র নিচে",
  'এস.এস.সি',
  'এইচ.এস.সি',
  'ডিপ্লোমা',
  'স্নাতক',
  'স্নাতকোত্তর',
  'ডক্টরেট',
  'হাফেজ',
];

const ExpectedPartnerFilter = () => {
  const { setFilterFields } = useContext(BioContext);
  const [isOpen, setIsOpen] = useState(false);

  const [expMaritalStatus, setExpMaritalStatus] = useState([]);
  const [expOccupation, setExpOccupation] = useState([]);
  const [expEconomicalCondition, setExpEconomicalCondition] = useState([]);
  const [expEducation, setExpEducation] = useState([]);

  const handleExpMaritalStatusChange = (value, checked) => {
    const updated = checked
      ? [...expMaritalStatus, value]
      : expMaritalStatus.filter((v) => v !== value);
    setExpMaritalStatus(updated);
    setFilterFields((prev) => ({
      ...prev,
      exp_marital_status: updated.length > 0 ? updated.join(',') : undefined,
    }));
  };

  const handleExpOccupationChange = (value, checked) => {
    const updated = checked
      ? [...expOccupation, value]
      : expOccupation.filter((v) => v !== value);
    setExpOccupation(updated);
    setFilterFields((prev) => ({
      ...prev,
      exp_occupation: updated.length > 0 ? updated.join(',') : undefined,
    }));
  };

  const handleExpEconomicalConditionChange = (value, checked) => {
    const updated = checked
      ? [...expEconomicalCondition, value]
      : expEconomicalCondition.filter((v) => v !== value);
    setExpEconomicalCondition(updated);
    setFilterFields((prev) => ({
      ...prev,
      exp_economical_condition:
        updated.length > 0 ? updated.join(',') : undefined,
    }));
  };

  const handleExpEducationChange = (value, checked) => {
    const updated = checked
      ? [...expEducation, value]
      : expEducation.filter((v) => v !== value);
    setExpEducation(updated);
    setFilterFields((prev) => ({
      ...prev,
      exp_educational_qualifications:
        updated.length > 0 ? updated.join(',') : undefined,
    }));
  };

  return (
    <CustomAccordion
      isOpen={isOpen}
      onToggle={() => setIsOpen((prev) => !prev)}
      title="প্রত্যাশিত জীবনসঙ্গী"
    >
      {/* Expected Marital Status */}
      <div className="py-2">
        <h3
          style={{ color: Colors.primary800 }}
          className="mt-4 mb-2 font-semibold text-center"
        >
          প্রত্যাশিত বৈবাহিক অবস্থা
        </h3>
        <div className="grid grid-cols-2">
          {EXP_MARITAL_STATUS.map((v) => (
            <CustomCheckboxOption
              key={v}
              id={`exp-marital-${v}`}
              label={v}
              checked={expMaritalStatus.includes(v)}
              onChange={(e) =>
                handleExpMaritalStatusChange(v, e.target.checked)
              }
            />
          ))}
        </div>
      </div>

      {/* Expected Occupation */}
      <div className="py-2">
        <h3
          style={{ color: Colors.primary800 }}
          className="mt-4 mb-2 font-semibold text-center"
        >
          প্রত্যাশিত পেশা
        </h3>
        <div className="grid grid-cols-2">
          {EXP_OCCUPATION.map((v) => (
            <CustomCheckboxOption
              key={v}
              id={`exp-occ-${v}`}
              label={v}
              checked={expOccupation.includes(v)}
              onChange={(e) => handleExpOccupationChange(v, e.target.checked)}
            />
          ))}
        </div>
      </div>

      {/* Expected Economic Condition */}
      <div className="py-2">
        <h3
          style={{ color: Colors.primary800 }}
          className="mt-4 mb-2 font-semibold text-center"
        >
          প্রত্যাশিত অর্থনৈতিক অবস্থা
        </h3>
        <div className="grid grid-cols-2">
          {EXP_ECONOMICAL_CONDITION.map((v) => (
            <CustomCheckboxOption
              key={v}
              id={`exp-eco-${v}`}
              label={v}
              checked={expEconomicalCondition.includes(v)}
              onChange={(e) =>
                handleExpEconomicalConditionChange(v, e.target.checked)
              }
            />
          ))}
        </div>
      </div>

      {/* Expected Education */}
      <div className="py-2">
        <h3
          style={{ color: Colors.primary800 }}
          className="mt-4 mb-2 font-semibold text-center"
        >
          প্রত্যাশিত শিক্ষাগত যোগ্যতা
        </h3>
        <div className="grid grid-cols-2">
          {EXP_EDUCATION.map((v) => (
            <CustomCheckboxOption
              key={v}
              id={`exp-edu-${v}`}
              label={v}
              checked={expEducation.includes(v)}
              onChange={(e) => handleExpEducationChange(v, e.target.checked)}
            />
          ))}
        </div>
      </div>
    </CustomAccordion>
  );
};

export default ExpectedPartnerFilter;
