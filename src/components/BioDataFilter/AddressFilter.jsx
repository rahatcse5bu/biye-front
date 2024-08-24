/* eslint-disable react/prop-types */

import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBio } from '../../contexts/useBio';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Select from 'react-select';
import { BioDataServices } from '../../services/bioData';
import CustomAccordion from '../CustomAccordion/CustomAccordion';

const AddressFilter = ({ division, setDivision, setZilla, zilla }) => {
  const [addressFilterOpen, setAddressFilterOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const { setQuery, setFilterFields } = useBio();
  const [selectedDivisions, setSelectedDivisions] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);

  const handleDivisionChange = (selectedOptions) => {
    setSelectedDivisions(selectedOptions);
    if (selectedOptions.some((option) => option.value === 'All Divisions')) {
      setSelectedDistricts(['all']);
    }
  };

  useEffect(() => {
    setDivision(searchParams.get('division'));
    setZilla(searchParams.get('zilla'));
  }, [searchParams, setDivision, setZilla]);

  useEffect(() => {
    let queryObj = {};
    if (division) {
      queryObj = {
        ...queryObj,
        division: division,
      };
    }

    if (zilla) {
      queryObj = {
        ...queryObj,
        zilla: zilla,
      };
    }
    setQuery((prev) => {
      return {
        ...prev,
        ...queryObj,
      };
    });
    setFilterFields((prev) => {
      return {
        ...prev,
        ...queryObj,
      };
    });
  }, [division, setFilterFields, setQuery, zilla]);

  const { data: divisionOptions, isLoading: divisionLoading } = useQuery({
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

  const { data: districtOptions, isLoading: districtLoading } = useQuery(
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

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      height: 40, // Set the height for each option (in pixels)
      display: 'flex',
      alignItems: 'center',
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: 200, // Set the maximum height for the entire list of options
      padding: 0,
      position: 'absolute',
      width: '100%',
      backgroundColor: 'red',
      zIndex: '10000000000000',
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999, // Adjust the zIndex as needed
    }),
  };

  console.log('districtOptions~~', districtOptions);

  return (
    <div>
      <CustomAccordion
        isOpen={addressFilterOpen}
        onToggle={() => setAddressFilterOpen((prev) => !prev)}
        title="ঠিকানা"
      >
        <div>
          <p className="my-2 font-semibold text-left ">স্থায়ী ঠিকানা </p>

          <div className=" mx-auto pb-3">
            <Select
              options={divisionOptions}
              onChange={handleDivisionChange}
              value={selectedDivisions}
              placeholder="Select Division(s)"
              isMulti
            />
            <br />
            <Select
              options={districtOptions}
              onChange={setSelectedDistricts}
              value={selectedDistricts}
              placeholder="Select District(s)"
              isMulti
            />
          </div>
        </div>
        <hr className="bg-gray-700" />
        <div>
          <p className="my-2 font-semibold text-left "> বর্তমান ঠিকানা </p>

          <div className=" mx-auto pb-3">
            <Select
              options={divisionOptions}
              onChange={handleDivisionChange}
              value={selectedDivisions}
              placeholder="Select Division(s)"
              isMulti
            />
            <br />
            <Select
              options={districtOptions}
              onChange={setSelectedDistricts}
              value={selectedDistricts}
              placeholder="Select District(s)"
              isMulti
            />
          </div>
        </div>
      </CustomAccordion>
    </div>
  );
};

export default AddressFilter;
