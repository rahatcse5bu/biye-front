import React, { useState, useContext } from 'react';
import CustomAccordion from '../CustomAccordion/CustomAccordion';
import { Colors } from '../../constants/colors';
import CustomCheckboxOption from '../CustomCheckBoxOption/CustomCheckBoxOption';
import BioContext from '../../contexts/BioContext';

const OthersFilter = () => {
  const { setFilterFields } = useContext(BioContext);
  const [othersFilterOpen, setOthersFilterOpen] = useState(false);
  const [economicStatus, setEconomicStatus] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleEconomicStatusChange = (value, checked) => {
    const updated = checked
      ? [...economicStatus, value]
      : economicStatus.filter((v) => v !== value);
    
    setEconomicStatus(updated);
    setFilterFields((prev) => ({
      ...prev,
      economic_status: updated.length > 0 ? updated.join(',') : undefined,
    }));
  };

  const handleCategoriesChange = (value, checked) => {
    const updated = checked
      ? [...categories, value]
      : categories.filter((v) => v !== value);
    
    setCategories(updated);
    setFilterFields((prev) => ({
      ...prev,
      categories: updated.length > 0 ? updated.join(',') : undefined,
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
            checked={economicStatus.includes('উচ্চবিত্ত')}
            onChange={(e) => handleEconomicStatusChange('উচ্চবিত্ত', e.target.checked)}
          />
          <CustomCheckboxOption
            id="upperMiddleClass"
            label="উচ্চ মধ্যবিত্ত"
            checked={economicStatus.includes('উচ্চ মধ্যবিত্ত')}
            onChange={(e) => handleEconomicStatusChange('উচ্চ মধ্যবিত্ত', e.target.checked)}
          />
          <CustomCheckboxOption
            id="middleClass"
            label="মধ্যবিত্ত"
            checked={economicStatus.includes('মধ্যবিত্ত')}
            onChange={(e) => handleEconomicStatusChange('মধ্যবিত্ত', e.target.checked)}
          />
          <CustomCheckboxOption
            id="lowerMiddleClass"
            label="নিম্ন মধ্যবিত্ত"
            checked={economicStatus.includes('নিম্ন মধ্যবিত্ত')}
            onChange={(e) => handleEconomicStatusChange('নিম্ন মধ্যবিত্ত', e.target.checked)}
          />
          <CustomCheckboxOption
            id="lowerClass"
            label="নিম্নবিত্ত"
            checked={economicStatus.includes('নিম্নবিত্ত')}
            onChange={(e) => handleEconomicStatusChange('নিম্নবিত্ত', e.target.checked)}
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
            checked={categories.includes('প্রতিবন্ধী')}
            onChange={(e) => handleCategoriesChange('প্রতিবন্ধী', e.target.checked)}
          />
          <CustomCheckboxOption
            id="infertile"
            label="বন্ধ্যা"
            checked={categories.includes('বন্ধ্যা')}
            onChange={(e) => handleCategoriesChange('বন্ধ্যা', e.target.checked)}
          />
          <CustomCheckboxOption
            id="newMuslim"
            label="নওমুসলিম"
            checked={categories.includes('নওমুসলিম')}
            onChange={(e) => handleCategoriesChange('নওমুসলিম', e.target.checked)}
          />
          <CustomCheckboxOption
            id="orphan"
            label="এতিম"
            checked={categories.includes('এতিম')}
            onChange={(e) => handleCategoriesChange('এতিম', e.target.checked)}
          />
          <CustomCheckboxOption
            id="interestInMasna"
            label="মাসনা হতে আগ্রহী"
            checked={categories.includes('মাসনা হতে আগ্রহী')}
            onChange={(e) => handleCategoriesChange('মাসনা হতে আগ্রহী', e.target.checked)}
          />

          <CustomCheckboxOption
            id="tabligh"
            label="তাবলীগ"
            checked={categories.includes('তাবলীগ')}
            onChange={(e) => handleCategoriesChange('তাবলীগ', e.target.checked)}
          />
        </div>
      </div>
    </CustomAccordion>
  );
};

export default OthersFilter;
