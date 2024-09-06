import React from 'react';
import { Colors } from '../../../constants/colors';
import { convertToQuery } from '../../../utils/query';
import { useNavigate } from 'react-router-dom';
import { useBio } from '../../../contexts/useBio';
import { useQuery } from '@tanstack/react-query';
import { BioDataServices } from '../../../services/bioData';
import Select from 'react-select';
import { useFilter } from '../../../contexts/useFilter';
import { usePrimary } from '../../../contexts/userPrimary';

const HomeFilter = () => {
  const navigate = useNavigate();
  const { setQuery, query, setFilterFields } = useBio();
  const { setBioType, setMaritalStatus } = usePrimary();
  const {
    selectedDivisions,
    setSelectedDivisions,
    selectedDistricts,
    setSelectedDistricts,
  } = useFilter();

  const { data: divisionOptions } = useQuery({
    queryKey: ['divisions'],
    queryFn: async () => {
      const divisions = await BioDataServices.getAllDivisions();
      const allDivisionsOption = {
        value: 'All Divisions',
        label: 'All Divisions',
      };
      const formattedDivisionOptions = divisions.map((division) => ({
        value: division.value,
        label: division.value,
      }));
      formattedDivisionOptions.unshift(allDivisionsOption);
      return formattedDivisionOptions;
    },
  });

  const { data: districtOptions } = useQuery(
    ['districts', selectedDivisions],
    async () => {
      const selectedDivisionValues = selectedDivisions.map(
        (division) => division.value
      );
      if (selectedDivisionValues.includes('All Divisions')) {
        const allDistricts = await BioDataServices.getAllDistricts(null);
        const allDistrictsOption = {
          value: 'All Districts',
          label: 'All Districts',
        };
        const formattedAllDistricts = allDistricts.map((district) => ({
          value: district.value,
          label: district.label,
        }));
        formattedAllDistricts.unshift(allDistrictsOption);
        return formattedAllDistricts;
      } else if (selectedDivisionValues.length === 0) {
        return [{ value: 'All Districts', label: 'All Districts' }];
      } else {
        const districtPromises = selectedDivisionValues.map((divisionValue) =>
          BioDataServices.getAllDistricts(divisionValue)
        );
        const results = await Promise.all(districtPromises);
        const formattedDistrictOptions = results.flatMap((districts, index) =>
          districts.map((district) => ({
            value: district.value,
            label: district.label,
            division: selectedDivisionValues[index],
          }))
        );
        const allDistrictsOption = {
          value: 'All Districts',
          label: 'All Districts',
        };
        formattedDistrictOptions.unshift(allDistrictsOption);
        return formattedDistrictOptions;
      }
    }
  );

  const handleDivisionChange = (selectedOptions) => {
    setSelectedDivisions(selectedOptions);
    if (selectedOptions.some((option) => option.value === 'All Divisions')) {
      setSelectedDistricts(['all']);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const form = event.target;
    const marital_status = form.marital_status.value;
    const bio_type = form.bio_type.value;

    let divisionValues = selectedDivisions.map((division) => division.value);
    let districtValues = selectedDistricts.map((district) => district.value);

    if (divisionValues.includes('All Divisions')) {
      divisionValues = ['all'];
    }
    if (districtValues.includes('All Districts')) {
      districtValues.splice(0, districtValues.length);
      const selectedDivisionValues = selectedDivisions.map(
        (division) => division.value
      );
      const allDistricts = districtOptions
        .filter((district) =>
          selectedDivisionValues.includes(district.division)
        )
        .map((district) => district.value);
      districtValues.push(...allDistricts);
    }

    const filterQuery = {
      ...query,
      marital_status,
      bio_type,
      zilla: districtValues.join(','),
      division: divisionValues.join(','),
      user_status:
        import.meta.env.VITE_REACT_APP_NODE_ENV === 'development'
          ? 'in review'
          : 'active',
    };
    setBioType(bio_type);
    setMaritalStatus(marital_status);
    setQuery(filterQuery);
    setFilterFields(filterQuery);
    const queryString = convertToQuery(filterQuery);
    navigate(`/biodatas?${queryString}`);
  };
  return (
    <form
      onSubmit={submitHandler}
      className="px-4 py-5 mx-auto my-5 bg-white border-2 shadow-sm search-filter rounded-2xl lg:px-8 lg:p-16 lg:flex lg:items-center lg:justify-between"
    >
      <div className="mb-4 lg:mb-0">
        <label
          className="block mb-2 text-xl md:text-2xl lg:text-2xl lg:inline-block lg:mb-0 lg:mr-4"
          style={{
            color: Colors.titleText,
          }}
          htmlFor="ans"
        >
          আমি খুঁজছি:
        </label>
        <div className="md:h-2"></div>
        <select
          name="bio_type"
          className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md lg:w-auto md:px-8 md:py-4"
        >
          <option value="" selected>
            সকল
          </option>
          <option value="পাত্রের বায়োডাটা">পাত্রের বায়োডাটা</option>
          <option value="পাত্রীর বায়োডাটা">পাত্রীর বায়োডাটা</option>
        </select>
      </div>

      {/* Dropdown 2 */}
      <div className="mb-4 lg:mb-0">
        <label
          htmlFor="ans"
          className="block mb-2 text-xl md:text-2xl lg:text-2xl lg:inline-block lg:mb-0 lg:mr-4"
          style={{
            color: Colors.titleText,
          }}
        >
          বৈবাহিক অবস্থা:
        </label>
        <div className="md:h-2"></div>
        <select
          name="marital_status"
          className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md lg:w-auto md:px-8 md:py-4"
        >
          <option value="" selected>
            সকল
          </option>
          <option value="অবিবাহিত">অবিবাহিত</option>
          <option value="বিবাহিত">বিবাহিত</option>
          <option value="ডিভোর্সড">ডিভোর্সড</option>
          <option value="বিধবা">বিধবা</option>
          <option value="বিপত্নীক">বিপত্নীক</option>
        </select>
      </div>

      {/* Dropdown 3 */}
      <div className="mb-4 lg:max-w-[410px] lg:mb-0">
        <label
          className="block mb-4 text-xl md:text-2xl lg:text-2xl lg:inline-block lg:mb-0 lg:mr-4"
          style={{
            color: Colors.titleText,
          }}
          htmlFor="ans"
        >
          স্থায়ী ঠিকানা:
        </label>
        <div className="md:h-2"></div>

        <Select
          className=""
          options={divisionOptions}
          onChange={handleDivisionChange}
          value={selectedDivisions}
          placeholder="Select Division(s)"
          isMulti
        />
        <p className="py-2"></p>
        <Select
          className=""
          options={districtOptions}
          onChange={setSelectedDistricts}
          value={selectedDistricts}
          placeholder="Select District(s)"
          isMulti
        />
      </div>

      {/* Filter Button */}
      <button
        className="block w-full px-4 py-2 text-xl text-white bg-blue-500 rounded-lg lg:w-auto lg:px-8 lg:py-2 md:mt-8 lg:text-2xl"
        style={{
          background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight} )`,
        }}
        type="submit"
      >
        খুঁজুন
      </button>
    </form>
  );
};

export default HomeFilter;
