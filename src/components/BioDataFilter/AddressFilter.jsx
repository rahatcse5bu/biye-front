/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { useBio } from '../../contexts/useBio';
import { useQuery } from '@tanstack/react-query';
import Select from 'react-select';
import { BioDataServices } from '../../services/bioData';
import CustomAccordion from '../CustomAccordion/CustomAccordion';
import { useFilter } from '../../contexts/useFilter';

const AddressFilter = () => {
  const { setFilterFields } = useBio();
  const {
    addressFilterOpen,
    setAddressFilterOpen,
    setSelectedDistricts,
    setSelectedDivisions,
    selectedDivisions,
    selectedDistricts,
  } = useFilter();

  const [selectedPresentDivisions, setSelectedPresentDivisions] = useState([]);
  const [selectedPresentDistricts, setSelectedPresentDistricts] = useState([]);

  useEffect(() => {
    setFilterFields((prev) => {
      return {
        ...prev,
        division: selectedDivisions.map((division) => division.value),
        district: selectedDistricts.map((district) => district.value),
        presentDivision: selectedPresentDivisions.map(
          (division) => division.value
        ),
        presentDistrict: selectedPresentDistricts.map(
          (district) => district.value
        ),
      };
    });
  }, [
    selectedDivisions,
    selectedDistricts,
    selectedPresentDivisions,
    selectedPresentDistricts,
  ]);

  const handleDivisionChange = (selectedOptions, type) => {
    if (type === 'permanent') {
      setSelectedDivisions(selectedOptions);
      if (selectedOptions.some((option) => option.value === 'All Divisions')) {
        setSelectedDistricts(['all']);
      }
    } else if (type === 'present') {
      setSelectedPresentDivisions(selectedOptions);
      if (selectedOptions.some((option) => option.value === 'All Divisions')) {
        setSelectedPresentDistricts(['all']);
      }
    }
  };

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

  const { data: presentDistrictOptions } = useQuery(
    ['presentDistricts', selectedPresentDivisions],
    async () => {
      const selectedDivisionValues = selectedPresentDivisions.map(
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
    option: (provided) => ({
      ...provided,
      height: 40,
      display: 'flex',
      alignItems: 'center',
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: 200,
      padding: 0,
      position: 'absolute',
      width: '100%',
      backgroundColor: 'white',
      zIndex: 10000,
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  return (
    <div>
      <CustomAccordion
        isOpen={addressFilterOpen}
        onToggle={() => setAddressFilterOpen((prev) => !prev)}
        title="ঠিকানা"
      >
        <div>
          <p className="my-2 font-semibold text-left">স্থায়ী ঠিকানা</p>
          <div className="mx-auto pb-3">
            <Select
              options={divisionOptions}
              onChange={(selectedOptions) =>
                handleDivisionChange(selectedOptions, 'permanent')
              }
              value={selectedDivisions}
              placeholder="Select Division(s)"
              isMulti
              styles={customStyles}
              isSearchable
            />
            <br />
            <Select
              options={districtOptions}
              onChange={setSelectedDistricts}
              value={selectedDistricts}
              placeholder="Select District(s)"
              isMulti
              styles={customStyles}
              isSearchable
            />
          </div>
        </div>
        <hr className="bg-gray-700" />
        <div>
          <p className="my-2 font-semibold text-left">বর্তমান ঠিকানা</p>
          <div className="mx-auto pb-3">
            <Select
              options={divisionOptions}
              onChange={(selectedOptions) =>
                handleDivisionChange(selectedOptions, 'present')
              }
              value={selectedPresentDivisions}
              placeholder="Select Division(s)"
              isMulti
              styles={customStyles}
              isSearchable
            />
            <br />
            <Select
              options={presentDistrictOptions}
              onChange={setSelectedPresentDistricts}
              value={selectedPresentDistricts}
              placeholder="Select District(s)"
              isMulti
              styles={customStyles}
              isSearchable
            />
          </div>
        </div>
      </CustomAccordion>
    </div>
  );
};

export default AddressFilter;
