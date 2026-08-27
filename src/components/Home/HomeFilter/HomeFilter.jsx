import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { convertToQuery } from '../../../utils/query';
import { useNavigate } from '@/lib/navigation';
import { useBio } from '../../../contexts/useBio';
import { useQuery } from '@tanstack/react-query';
import { BioDataServices } from '../../../services/bioData';
import Select from 'react-select';
import { useFilter } from '../../../contexts/useFilter';
import { usePrimary } from '../../../contexts/userPrimary';

const selectClassNames = {
  control: ({ isFocused }) =>
    `!min-h-12 !rounded-xl !border-gray-200 !bg-gray-50 !shadow-none hover:!border-brand-900/40 ${
      isFocused ? '!border-brand-900 !ring-2 !ring-brand-900/10' : ''
    }`,
  valueContainer: () => '!px-3 !py-1',
  placeholder: () => '!text-gray-400',
  input: () => '!text-gray-900',
  multiValue: () => '!rounded-lg !bg-brand-900/10',
  multiValueLabel: () => '!px-2 !py-1 !text-brand-900',
  multiValueRemove: () => '!rounded-r-lg hover:!bg-brand-900 hover:!text-white',
  menu: () =>
    '!z-30 !overflow-hidden !rounded-xl !border !border-gray-100 !shadow-xl',
  option: ({ isFocused, isSelected }) =>
    `!cursor-pointer ${isSelected ? '!bg-brand-900' : isFocused ? '!bg-brand-900/10 !text-brand-900' : ''}`,
};

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

  const { data: divisionOptions = [] } = useQuery({
    queryKey: ['divisions'],
    queryFn: async () => {
      const divisions = await BioDataServices.getAllDivisions();
      return [
        { value: 'All Divisions', label: 'সকল বিভাগ' },
        ...divisions.map((division) => ({
          value: division.value,
          label: division.value,
        })),
      ];
    },
  });

  const { data: districtOptions = [] } = useQuery(
    ['districts', selectedDivisions],
    async () => {
      const selectedDivisionValues = selectedDivisions.map(
        (division) => division.value
      );

      if (selectedDivisionValues.includes('All Divisions')) {
        const allDistricts = await BioDataServices.getAllDistricts(null);
        return [
          { value: 'All Districts', label: 'সকল জেলা' },
          ...allDistricts.map((district) => ({
            value: district.value,
            label: district.label,
          })),
        ];
      }

      if (selectedDivisionValues.length === 0) {
        return [{ value: 'All Districts', label: 'সকল জেলা' }];
      }

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

      return [
        { value: 'All Districts', label: 'সকল জেলা' },
        ...formattedDistrictOptions,
      ];
    }
  );

  const handleDivisionChange = (selectedOptions) => {
    const options = selectedOptions || [];
    setSelectedDivisions(options);

    if (options.some((option) => option.value === 'All Divisions')) {
      setSelectedDistricts([{ value: 'All Districts', label: 'সকল জেলা' }]);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const marital_status = form.marital_status.value;
    const bio_type = form.bio_type.value;

    let divisionValues = selectedDivisions.map((division) => division.value);
    const districtValues = selectedDistricts.map((district) => district.value);

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
        process.env.NODE_ENV === 'development' ? 'in review' : 'active',
    };

    setBioType(bio_type);
    setMaritalStatus(marital_status);
    setQuery(filterQuery);
    setFilterFields(filterQuery);
    navigate(`/biodatas?${convertToQuery(filterQuery)}`);
  };

  return (
    <form
      onSubmit={submitHandler}
      className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="home-bio-type"
          >
            আমি খুঁজছি
          </label>
          <select
            id="home-bio-type"
            name="bio_type"
            defaultValue=""
            className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-gray-800 outline-none transition-colors duration-200 hover:border-brand-900/40 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10"
          >
            <option value="">সকল বায়োডাটা</option>
            <option value="পাত্রের বায়োডাটা">পাত্রের বায়োডাটা</option>
            <option value="পাত্রীর বায়োডাটা">পাত্রীর বায়োডাটা</option>
          </select>
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="home-marital-status"
          >
            বৈবাহিক অবস্থা
          </label>
          <select
            id="home-marital-status"
            name="marital_status"
            defaultValue=""
            className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-gray-800 outline-none transition-colors duration-200 hover:border-brand-900/40 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10"
          >
            <option value="">সকল অবস্থা</option>
            <option value="অবিবাহিত">অবিবাহিত</option>
            <option value="বিবাহিত">বিবাহিত</option>
            <option value="ডিভোর্সড">ডিভোর্সড</option>
            <option value="বিধবা">বিধবা</option>
            <option value="বিপত্নীক">বিপত্নীক</option>
          </select>
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="home-division"
          >
            স্থায়ী বিভাগ
          </label>
          <Select
            inputId="home-division"
            instanceId="home-division"
            options={divisionOptions}
            onChange={handleDivisionChange}
            value={selectedDivisions}
            placeholder="বিভাগ নির্বাচন করুন"
            noOptionsMessage={() => 'কোনো বিভাগ পাওয়া যায়নি'}
            classNames={selectClassNames}
            isMulti
          />
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="home-district"
          >
            স্থায়ী জেলা
          </label>
          <Select
            inputId="home-district"
            instanceId="home-district"
            options={districtOptions}
            onChange={(options) => setSelectedDistricts(options || [])}
            value={selectedDistricts}
            placeholder="জেলা নির্বাচন করুন"
            noOptionsMessage={() => 'কোনো জেলা পাওয়া যায়নি'}
            classNames={selectClassNames}
            isMulti
          />
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-900 px-6 py-3 font-bold text-white transition-colors duration-200 hover:bg-[#0F8287] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 motion-reduce:transition-none sm:w-auto"
          type="submit"
        >
          <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
          বায়োডাটা খুঁজুন
        </button>
      </div>
    </form>
  );
};

export default HomeFilter;
