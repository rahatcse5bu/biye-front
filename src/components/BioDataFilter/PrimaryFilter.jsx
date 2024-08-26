/* eslint-disable react/prop-types */
import DoubleRangeSlider from '../DoubleRangeSlider/DoubleRangeSlider';
import { useBio } from '../../contexts/useBio';
import CustomAccordion from '../CustomAccordion/CustomAccordion';
import { useFilter } from '../../contexts/useFilter';

const PrimaryFilter = ({
  setBioType,
  bioType,
  maritalStatus,
  setMaritalStatus,
  age,
  setAge,
  height,
  setHeight,
  setOpenAccordions,
}) => {
  const { setFilterFields } = useBio();
  const { primaryFilterOpen, setPrimaryFilterOpen } = useFilter();

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

                setOpenAccordions((prev) => {
                  return {
                    ...prev,
                    3: true,
                  };
                });
                // navigate(`/biodatas?${queryString}`);
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

                setOpenAccordions((prev) => {
                  return {
                    ...prev,
                    3: true,
                  };
                });
                setFilterFields((filterFields) => {
                  return {
                    ...filterFields,
                    bio_type: value,
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
        <div className="px-2">
          <label
            htmlFor="age"
            className="text-left text-gray-500 mt-4 mb-5 font-bold block"
          >
            বয়স
          </label>
          <DoubleRangeSlider id="age" value={age} setValue={setAge} />
        </div>
        <div className="lg:w-64 w-full px-2 py-2">
          <DoubleRangeSlider
            value={height}
            setValue={setHeight}
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
