import React, { useState } from 'react';
import CustomAccordion from '../CustomAccordion/CustomAccordion';
import { Colors } from '../../constants/colors';
import CustomCheckboxOption from '../CustomCheckBoxOption/CustomCheckBoxOption';

const OthersFilter = () => {
  const [othersFilterOpen, setOthersFilterOpen] = useState(false);
  const [checkboxState, setCheckboxState] = useState({
    upperClass: false,
    upperMiddleClass: false,
    middleClass: false,
    lowerMiddleClass: false,
    lowerClass: false,
    disabled: false,
    infertile: false,
    newMuslim: false,
    orphan: false,
    interestInMasna: false,
    tabligh: false,
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
      isOpen={othersFilterOpen}
      onToggle={() => setOthersFilterOpen((prev) => !prev)}
      title="অন্যান্য"
    >
      <div className="py-5">
        <h3
          style={{ color: Colors.primary800 }}
          className="mt-4 mb-2 font-semibold text-center"
        >
          অর্থনৈতিক অবস্থা{' '}
        </h3>

        <div className="grid grid-cols-2">
          {/* upperClass, upperMiddleClass,middleClass,lowerMiddleClass,lowerClass,disabled,infertile,newMuslim,orphan,interestInMasna,tabligh */}

          <CustomCheckboxOption
            id="upperClass"
            label="উচ্চবিত্ত"
            checked={checkboxState.upperClass}
            onChange={handleCheckboxChange}
          />
          <CustomCheckboxOption
            id="upperMiddleClass"
            label="উচ্চ মধ্যবিত্ত"
            checked={checkboxState.upperMiddleClass}
            onChange={handleCheckboxChange}
          />
          <CustomCheckboxOption
            id="middleClass"
            label="মধ্যবিত্ত"
            checked={checkboxState.middleClass}
            onChange={handleCheckboxChange}
          />
          <CustomCheckboxOption
            id="lowerMiddleClass"
            label="নিম্ন মধ্যবিত্ত"
            checked={checkboxState.lowerMiddleClass}
            onChange={handleCheckboxChange}
          />
          <CustomCheckboxOption
            id="lowerClass"
            label="নিম্নবিত্ত"
            checked={checkboxState.lowerClass}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>

      <div>
        <h3
          style={{ color: Colors.primary800 }}
          className="mt-4 mb-2 font-semibold text-center"
        >
          {' '}
          ক্যাটাগরি{' '}
        </h3>
        <div className="grid grid-cols-2">
          <CustomCheckboxOption
            id="disabled"
            label="প্রতিবন্ধী"
            checked={checkboxState.disabled}
            onChange={handleCheckboxChange}
          />
          <CustomCheckboxOption
            id="infertile"
            label="বন্ধ্যা"
            checked={checkboxState.infertile}
            onChange={handleCheckboxChange}
          />
          <CustomCheckboxOption
            id="newMuslim"
            label="নওমুসলিম"
            checked={checkboxState.newMuslim}
            onChange={handleCheckboxChange}
          />
          <CustomCheckboxOption
            id="orphan"
            label="এতিম"
            checked={checkboxState.orphan}
            onChange={handleCheckboxChange}
          />
          <CustomCheckboxOption
            id="interestInMasna"
            label="মাসনা হতে আগ্রহী"
            checked={checkboxState.interestInMasna}
            onChange={handleCheckboxChange}
          />

          <CustomCheckboxOption
            id="tabligh"
            label="তাবলীগ"
            checked={checkboxState.tabligh}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>
    </CustomAccordion>
  );
};

export default OthersFilter;
