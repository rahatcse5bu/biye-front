import React, { useState } from 'react';
import CustomAccordion from '../CustomAccordion/CustomAccordion';
import { Colors } from '../../constants/colors';
import CustomCheckboxOption from '../CustomCheckBoxOption/CustomCheckBoxOption';

const OccupationFilter = () => {
  const [occupationFilterOpen, setOccupationFilterOPen] = useState(false);
  const [checkboxState, setCheckboxState] = useState({
    imam: false,
    madrashaTeacher: false,
    teacher: false,
    doctor: false,
    engineer: false,
    business: false,
    govtJob: false,
    privateJob: false,
    freelancer: false,
    student: false,
    expatriate: false,
    others: false,
    noProfession: false,
  });

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setCheckboxState((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  return (
    <CustomAccordion
      title="পেশা"
      isOpen={occupationFilterOpen}
      onToggle={() => setOccupationFilterOPen((prev) => !prev)}
    >
      <div className="py-5">
        <h3
          style={{ color: Colors.primary800 }}
          className="mt-4 mb-2 font-semibold text-center"
        >
          {' '}
          পেশা{' '}
        </h3>

        <div className="grid grid-cols-2">
          <CustomCheckboxOption
            id="imam"
            label="ইমাম"
            checked={checkboxState.imam}
            onChange={handleCheckboxChange}
          />
          <CustomCheckboxOption
            id="madrashaTeacher"
            label=" মাদ্রাসা শিক্ষক"
            checked={checkboxState.madrashaTeacher}
            onChange={handleCheckboxChange}
          />
          <CustomCheckboxOption
            id="madrashaTeacher"
            label=" মাদ্রাসা শিক্ষক"
            checked={checkboxState.madrashaTeacher}
            onChange={handleCheckboxChange}
          />
          <CustomCheckboxOption
            id="teacher"
            label="শিক্ষক"
            checked={checkboxState.teacher}
            onChange={handleCheckboxChange}
          />
          <CustomCheckboxOption
            id="doctor"
            label="ডাক্তার"
            checked={checkboxState.doctor}
            onChange={handleCheckboxChange}
          />
          <CustomCheckboxOption
            id="engineer"
            label="ইঞ্জিনিয়ার"
            checked={checkboxState.engineer}
            onChange={handleCheckboxChange}
          />
          <CustomCheckboxOption
            id="business"
            label="ব্যবসায়ী"
            checked={checkboxState.business}
            onChange={handleCheckboxChange}
          />
          <CustomCheckboxOption
            id="govtJob"
            label="সরকারি চাকুরি"
            checked={checkboxState.govtJob}
            onChange={handleCheckboxChange}
          />
          <CustomCheckboxOption
            id="privateJob"
            label="বেসরকারি চাকুরি"
            checked={checkboxState.privateJob}
            onChange={handleCheckboxChange}
          />
          <CustomCheckboxOption
            id="freelancer"
            label="ফ্রিল্যাস্নায়ার"
            checked={checkboxState.freelancer}
            onChange={handleCheckboxChange}
          />
          {/* student, expatriate ,others ,noProfession*/}
          <CustomCheckboxOption
            id="student"
            label="শিক্ষার্থী"
            checked={checkboxState.student}
            onChange={handleCheckboxChange}
          />
          <CustomCheckboxOption
            id="expatriate"
            label="প্রবাসী"
            checked={checkboxState.expatriate}
            onChange={handleCheckboxChange}
          />
          <CustomCheckboxOption
            id="others"
            label="অন্যান্য"
            checked={checkboxState.others}
            onChange={handleCheckboxChange}
          />
          <CustomCheckboxOption
            id="noProfession"
            label="পেশা নেই"
            checked={checkboxState.noProfession}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>
    </CustomAccordion>
  );
};

export default OccupationFilter;
