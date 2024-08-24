import React, { useState } from 'react';
import CustomAccordion from '../CustomAccordion/CustomAccordion';
import { Colors } from '../../constants/colors';
import CustomCheckboxOption from '../CustomCheckBoxOption/CustomCheckBoxOption';

const EducationFilter = () => {
  const [openEducationFilter, setOpenEducationFilter] = useState(false);
  const [checkboxState, setCheckboxState] = useState({
    general: false,
    qaumi: false,
    alia: false,
    hafez: false,
    maulana: false,
    mufti: false,
    mufassir: false,
    adib: false,
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
      isOpen={openEducationFilter}
      onToggle={() => setOpenEducationFilter((prev) => !prev)}
      title="  শিক্ষা"
    >
      <div>
        <h3
          className="mt-4 mb-2 font-semibold text-center"
          style={{ color: Colors.primary800 }}
        >
          পড়াশোনার মাধ্যম{' '}
        </h3>

        <div className="grid grid-cols-2">
          <CustomCheckboxOption
            id="general"
            label="জেনারেল"
            checked={checkboxState.general}
            onChange={handleCheckboxChange}
          />
          <CustomCheckboxOption
            id="qaumi"
            label="কওমী"
            checked={checkboxState.qaumi}
            onChange={handleCheckboxChange}
          />
          <CustomCheckboxOption
            id="alia"
            label="আলিয়া"
            checked={checkboxState.alia}
            onChange={handleCheckboxChange}
          />
        </div>

        <h3
          className="mt-4 mb-2 font-semibold text-center"
          style={{ color: Colors.primary800 }}
        >
          দ্বীনি শিক্ষার যোগ্যতা{' '}
        </h3>

        <div className="grid grid-cols-2">
          <CustomCheckboxOption
            id="hafez"
            label="হাফেজ"
            checked={checkboxState.hafez}
            onChange={handleCheckboxChange}
          />
          <CustomCheckboxOption
            id="maulana"
            label="মাওলানা"
            checked={checkboxState.maulana}
            onChange={handleCheckboxChange}
          />
          <CustomCheckboxOption
            id="mufti"
            label="মুফতি"
            checked={checkboxState.mufti}
            onChange={handleCheckboxChange}
          />
          <CustomCheckboxOption
            id="mufassir"
            label="মুফাসসির"
            checked={checkboxState.mufassir}
            onChange={handleCheckboxChange}
          />
          <CustomCheckboxOption
            id="adib"
            label="আদিব"
            checked={checkboxState.adib}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>
    </CustomAccordion>
  );
};

export default EducationFilter;
