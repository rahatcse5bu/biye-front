/* eslint-disable react/prop-types */
import DoubleRangeSlider from '../DoubleRangeSlider/DoubleRangeSlider';
import { useBio } from '../../contexts/useBio';
import CustomAccordion from '../CustomAccordion/CustomAccordion';
import { useFilter } from '../../contexts/useFilter';
import { usePrimary } from '../../contexts/userPrimary';

// Religious type options based on religion
const religiousTypesByReligion = {
  islam: [
    { value: 'practicing_muslim', label: 'প্র্যাকটিসিং মুসলিম' },
    { value: 'general_muslim', label: 'সাধারণ মুসলিম' },
  ],
  hinduism: [
    { value: 'practicing_hindu', label: 'প্র্যাকটিসিং হিন্দু' },
    { value: 'general_hindu', label: 'সাধারণ হিন্দু' },
  ],
  christianity: [
    { value: 'practicing_christian', label: 'প্র্যাকটিসিং খ্রিস্টান' },
    { value: 'general_christian', label: 'সাধারণ খ্রিস্টান' },
  ],
};

const PrimaryFilter = () => {
  const { setFilterFields } = useBio();
  const { primaryFilterOpen, setPrimaryFilterOpen } = useFilter();
  const {
    age,
    setAge,
    height,
    setHeight,
    setBioType,
    bioType,
    maritalStatus,
    setMaritalStatus,
    religion,
    setReligion,
    religiousType,
    setReligiousType,
  } = usePrimary();

  // Get religious type options based on selected religion
  const religiousTypeOptions = religion ? religiousTypesByReligion[religion] || [] : [];

  return (
    <div>
      <CustomAccordion
        isOpen={primaryFilterOpen}
        onToggle={() => setPrimaryFilterOpen((prev) => !prev)}
        title="প্রাথমিক"
      >
        <div className="lg:w-64 w-full">
          <label
            htmlFor="select"
            className="block my-2 text-sm font-bold text-left text-gray-700"
          >
            আমি খুজছি
          </label>
          <div className="relative">
            <select
              id="select"
              name="select"
              onChange={(e) => {
                const value = e.target.value;

                setBioType(value);

                setFilterFields((filterFields) => {
                  return {
                    ...filterFields,
                    bio_type: value,
                  };
                });
              }}
              value={bioType}
              className="block w-[90%] px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none cursor-pointer hover:border-gray-500 focus:outline-none focus:shadow-outline"
            >
              <option value="">সকল</option>
              <option value="পাত্রের বায়োডাটা">পাত্রের বায়োডাটা</option>
              <option value="পাত্রীর বায়োডাটা"> পাত্রীর বায়োডাটা </option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
              <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="lg:w-64 w-full">
          <label
            htmlFor="select"
            className="block my-2 text-sm font-bold text-left text-gray-700"
          >
            বৈবাহিক অবস্থা
          </label>
          <div className="relative">
            <select
              id="select"
              name="select"
              value={maritalStatus}
              onChange={(e) => {
                const value = e.target.value;

                setMaritalStatus(value);

                setFilterFields((filterFields) => {
                  return {
                    ...filterFields,
                    marital_status: value,
                  };
                });
                // navigate(`/biodatas?${queryString}`);
              }}
              className="block  w-[90%]  px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none cursor-pointer hover:border-gray-500 focus:outline-none focus:shadow-outline"
            >
              <option value="">সকল</option>
              <option value="অবিবাহিত"> অবিবাহিত </option>
              <option value="বিবাহিত">বিবাহিত</option>
              <option value="বিবাহিত"> ডিভোর্সড</option>
              <option value="বিধবা">বিধবা</option>
              <option value="বিপত্নীক">বিপত্নীক </option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
              <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Religion Filter */}
        <div className="lg:w-64 w-full">
          <label
            htmlFor="religion"
            className="block my-2 text-sm font-bold text-left text-gray-700"
          >
            ধর্ম
          </label>
          <div className="relative">
            <select
              id="religion"
              name="religion"
              value={religion}
              onChange={(e) => {
                const value = e.target.value;
                setReligion(value);
                // Reset religious type when religion changes
                setReligiousType('');
                setFilterFields((filterFields) => {
                  const newFields = {
                    ...filterFields,
                    religion: value,
                  };
                  // Remove religious_type when religion changes
                  delete newFields.religious_type;
                  return newFields;
                });
              }}
              className="block w-[90%] px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none cursor-pointer hover:border-gray-500 focus:outline-none focus:shadow-outline"
            >
              <option value="">সকল ধর্ম</option>
              <option value="islam">ইসলাম</option>
              <option value="hinduism">হিন্দু</option>
              <option value="christianity">খ্রিস্টান</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
              <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Religious Type Filter - Only show when religion is selected */}
        {religion && religiousTypeOptions.length > 0 && (
          <div className="lg:w-64 w-full">
            <label
              htmlFor="religiousType"
              className="block my-2 text-sm font-bold text-left text-gray-700"
            >
              ধর্মীয় ধরন
            </label>
            <div className="relative">
              <select
                id="religiousType"
                name="religiousType"
                value={religiousType}
                onChange={(e) => {
                  const value = e.target.value;
                  setReligiousType(value);
                  setFilterFields((filterFields) => ({
                    ...filterFields,
                    religious_type: value,
                  }));
                }}
                className="block w-[90%] px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none cursor-pointer hover:border-gray-500 focus:outline-none focus:shadow-outline"
              >
                <option value="">সকল ধরন</option>
                {religiousTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                <svg
                  className="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        )}

        <div className="px-2">
          <label
            htmlFor="age"
            className="text-left text-gray-500 mt-4 mb-5 font-bold block"
          >
            বয়স
          </label>
          <DoubleRangeSlider
            id="age"
            value={age}
            setValue={(val) => {
              setAge(val);
              setFilterFields((filterFields) => ({
                ...filterFields,
                minAge: val.min,
                maxAge: val.max,
              }));
            }}
          />
        </div>
        <div className="lg:w-64 w-full px-2 py-2">
          <DoubleRangeSlider
            // value={height}
            value={{
              min: parseFloat(height.min.toFixed(1)),
              max: parseFloat(height.max.toFixed(1)),
            }}
            // setValue={setHeight}
            setValue={(val) => {
              const minHeight = parseFloat(val.min.toFixed(1));
              const maxHeight = parseFloat(val.max.toFixed(1));
              setHeight({ min: minHeight, max: maxHeight });
              setFilterFields((filterFields) => ({
                ...filterFields,
                minHeight: minHeight,
                maxHeight: maxHeight,
              }));
            }}
            maxValue={7.0}
            minValue={4.5}
            step={0.1}
            title="উচ্চতা"
            subtitle="5.1 বোঝায় ৫ ফুট ১ ইঞ্চি "
          />
        </div>
      </CustomAccordion>
    </div>
  );
};

export default PrimaryFilter;
