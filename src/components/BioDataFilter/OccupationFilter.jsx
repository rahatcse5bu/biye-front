import React, { useState, useContext } from 'react';
import CustomAccordion from '../CustomAccordion/CustomAccordion';
import { Colors } from '../../constants/colors';
import CustomCheckboxOption from '../CustomCheckBoxOption/CustomCheckBoxOption';
import BioContext from '../../contexts/BioContext';

const OccupationFilter = () => {
  const { setFilterFields } = useContext(BioContext);
  const [occupationFilterOpen, setOccupationFilterOPen] = useState(false);
  const [occupation, setOccupation] = useState([]);

  const handleOccupationChange = (value, checked) => {
    const updated = checked
      ? [...occupation, value]
      : occupation.filter((v) => v !== value);
    
    setOccupation(updated);
    setFilterFields((prev) => ({
      ...prev,
      occupation: updated.length > 0 ? updated.join(',') : undefined,
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
            checked={occupation.includes('ইমাম')}
            onChange={(e) => handleOccupationChange('ইমাম', e.target.checked)}
          />
          <CustomCheckboxOption
            id="madrashaTeacher"
            label=" মাদ্রাসা শিক্ষক"
            checked={occupation.includes('মাদ্রাসা শিক্ষক')}
            onChange={(e) => handleOccupationChange('মাদ্রাসা শিক্ষক', e.target.checked)}
          />
          <CustomCheckboxOption
            id="teacher"
            label="শিক্ষক"
            checked={occupation.includes('শিক্ষক')}
            onChange={(e) => handleOccupationChange('শিক্ষক', e.target.checked)}
          />
          <CustomCheckboxOption
            id="doctor"
            label="ডাক্তার"
            checked={occupation.includes('ডাক্তার')}
            onChange={(e) => handleOccupationChange('ডাক্তার', e.target.checked)}
          />
          <CustomCheckboxOption
            id="engineer"
            label="ইঞ্জিনিয়ার"
            checked={occupation.includes('ইঞ্জিনিয়ার')}
            onChange={(e) => handleOccupationChange('ইঞ্জিনিয়ার', e.target.checked)}
          />
          <CustomCheckboxOption
            id="business"
            label="ব্যবসায়ী"
            checked={occupation.includes('ব্যবসায়ী')}
            onChange={(e) => handleOccupationChange('ব্যবসায়ী', e.target.checked)}
          />
          <CustomCheckboxOption
            id="govtJob"
            label="সরকারি চাকুরি"
            checked={occupation.includes('সরকারি চাকুরি')}
            onChange={(e) => handleOccupationChange('সরকারি চাকুরি', e.target.checked)}
          />
          <CustomCheckboxOption
            id="privateJob"
            label="বেসরকারি চাকুরি"
            checked={occupation.includes('বেসরকারি চাকুরি')}
            onChange={(e) => handleOccupationChange('বেসরকারি চাকুরি', e.target.checked)}
          />
          <CustomCheckboxOption
            id="freelancer"
            label="ফ্রিল্যাস্নায়ার"
            checked={occupation.includes('ফ্রিল্যাস্নায়ার')}
            onChange={(e) => handleOccupationChange('ফ্রিল্যাস্নায়ার', e.target.checked)}
          />
          {/* student, expatriate ,others ,noProfession*/}
          <CustomCheckboxOption
            id="student"
            label="শিক্ষার্থী"
            checked={occupation.includes('শিক্ষার্থী')}
            onChange={(e) => handleOccupationChange('শিক্ষার্থী', e.target.checked)}
          />
          <CustomCheckboxOption
            id="expatriate"
            label="প্রবাসী"
            checked={occupation.includes('প্রবাসী')}
            onChange={(e) => handleOccupationChange('প্রবাসী', e.target.checked)}
          />
          <CustomCheckboxOption
            id="others"
            label="অন্যান্য"
            checked={occupation.includes('অন্যান্য')}
            onChange={(e) => handleOccupationChange('অন্যান্য', e.target.checked)}
          />
          <CustomCheckboxOption
            id="noProfession"
            label="পেশা নেই"
            checked={occupation.includes('পেশা নেই')}
            onChange={(e) => handleOccupationChange('পেশা নেই', e.target.checked)}
          />
        </div>
      </div>
    </CustomAccordion>
  );
};

export default OccupationFilter;
