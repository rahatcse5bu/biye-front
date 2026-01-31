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
    selectedPresentDivisions,
    setSelectedPresentDivisions,
    selectedPresentDistricts,
    setSelectedPresentDistricts,
  } = useFilter();

  // Local state for Upazila selections
  const [selectedUpazilas, setSelectedUpazilas] = useState([]);
  const [selectedPresentUpazilas, setSelectedPresentUpazilas] = useState([]);

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

  // Permanent Upazila options based on selected districts
  const { data: upazilaOptions } = useQuery(
    ['upazilas', selectedDistricts],
    async () => {
      const selectedDistrictValues = selectedDistricts
        .map((district) => district.value)
        .filter((value) => value !== 'All Districts');

      if (selectedDistrictValues.length === 0) {
        return [{ value: 'All Upazilas', label: 'All Upazilas' }];
      }

      const upazilaPromises = selectedDistrictValues.map((districtValue) =>
        BioDataServices.getAllUpzilla(districtValue)
      );
      const results = await Promise.all(upazilaPromises);
      const formattedUpazilaOptions = results.flatMap((upazilas) =>
        upazilas.map((upazila) => ({
          value: upazila.value,
          label: upazila.value,
        }))
      );
      const allUpazilasOption = {
        value: 'All Upazilas',
        label: 'All Upazilas',
      };
      formattedUpazilaOptions.unshift(allUpazilasOption);
      return formattedUpazilaOptions;
    },
    {
      enabled: selectedDistricts.length > 0,
    }
  );

  // Present Upazila options based on selected present districts
  const { data: presentUpazilaOptions } = useQuery(
    ['presentUpazilas', selectedPresentDistricts],
    async () => {
      const selectedDistrictValues = selectedPresentDistricts
        .map((district) => district.value)
        .filter((value) => value !== 'All Districts');

      if (selectedDistrictValues.length === 0) {
        return [{ value: 'All Upazilas', label: 'All Upazilas' }];
      }

      const upazilaPromises = selectedDistrictValues.map((districtValue) =>
        BioDataServices.getAllUpzilla(districtValue)
      );
      const results = await Promise.all(upazilaPromises);
      const formattedUpazilaOptions = results.flatMap((upazilas) =>
        upazilas.map((upazila) => ({
          value: upazila.value,
          label: upazila.value,
        }))
      );
      const allUpazilasOption = {
        value: 'All Upazilas',
        label: 'All Upazilas',
      };
      formattedUpazilaOptions.unshift(allUpazilasOption);
      return formattedUpazilaOptions;
    },
    {
      enabled: selectedPresentDistricts.length > 0,
    }
  );

  useEffect(() => {
    setFilterFields((prev) => {
      // Build division filter
      let divisionFilter = undefined;
      if (selectedDivisions.length > 0) {
        if (
          selectedDivisions.some((option) => option.value === 'All Divisions')
        ) {
          divisionFilter = 'all';
        } else {
          divisionFilter = selectedDivisions.map((d) => d.value).join(',');
        }
      }

      // Build zilla (district) filter
      let zillaFilter = undefined;
      if (selectedDistricts.length > 0) {
        if (
          selectedDistricts.some((option) => option.value === 'All Districts')
        ) {
          // If "All Districts" is selected but we have specific divisions, don't set zilla
          // This means we want all districts within the selected divisions
          zillaFilter = undefined;
        } else {
          zillaFilter = selectedDistricts.map((d) => d.value).join(',');
        }
      }

      // Build upazila filter
      let upazilaFilter = undefined;
      const upazilas = selectedUpazilas
        .map((upazila) => upazila.value)
        .filter((value) => value !== 'All Upazilas');
      if (upazilas.length > 0) {
        upazilaFilter = upazilas.join(',');
      }

      // Build present/current address filters
      let currentDivisionFilter = undefined;
      if (selectedPresentDivisions.length > 0) {
        if (
          selectedPresentDivisions.some(
            (option) => option.value === 'All Divisions'
          )
        ) {
          currentDivisionFilter = 'all';
        } else {
          currentDivisionFilter = selectedPresentDivisions
            .map((d) => d.value)
            .join(',');
        }
      }

      let currentZillaFilter = undefined;
      if (selectedPresentDistricts.length > 0) {
        if (
          !selectedPresentDistricts.some(
            (option) => option.value === 'All Districts'
          )
        ) {
          currentZillaFilter = selectedPresentDistricts
            .map((d) => d.value)
            .join(',');
        }
      }

      let currentUpazilaFilter = undefined;
      const presentUpazilas = selectedPresentUpazilas
        .map((upazila) => upazila.value)
        .filter((value) => value !== 'All Upazilas');
      if (presentUpazilas.length > 0) {
        currentUpazilaFilter = presentUpazilas.join(',');
      }

      return {
        ...prev,
        division: divisionFilter,
        zilla: zillaFilter,
        upazila: upazilaFilter,
        current_division: currentDivisionFilter,
        current_zilla: currentZillaFilter,
        current_upzilla: currentUpazilaFilter,
      };
    });
  }, [
    selectedDivisions,
    selectedDistricts,
    selectedUpazilas,
    selectedPresentDivisions,
    selectedPresentDistricts,
    selectedPresentUpazilas,
    setFilterFields,
  ]);

  const handleDivisionChange = (selectedOptions, type) => {
    if (type === 'permanent') {
      setSelectedDivisions(selectedOptions);
      setSelectedDistricts([]);
      setSelectedUpazilas([]);
      if (selectedOptions.some((option) => option.value === 'All Divisions')) {
        setSelectedDistricts([
          {
            value: 'All Districts',
            label: 'All Districts',
          },
        ]);
      }
    } else if (type === 'present') {
      setSelectedPresentDivisions(selectedOptions);
      setSelectedPresentDistricts([]);
      setSelectedPresentUpazilas([]);
      if (selectedOptions.some((option) => option.value === 'All Divisions')) {
        setSelectedPresentDistricts([
          {
            value: 'All Districts',
            label: 'All Districts',
          },
        ]);
      }
    }
  };

  const handleDistrictChange = (selectedOptions, type) => {
    if (type === 'permanent') {
      setSelectedDistricts(selectedOptions);
      setSelectedUpazilas([]);
    } else if (type === 'present') {
      setSelectedPresentDistricts(selectedOptions);
      setSelectedPresentUpazilas([]);
    }
  };

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
              onChange={(selectedOptions) =>
                handleDistrictChange(selectedOptions, 'permanent')
              }
              value={selectedDistricts}
              placeholder="Select District(s)"
              isMulti
              styles={customStyles}
              isSearchable
            />
            <br />
            <Select
              options={upazilaOptions}
              onChange={setSelectedUpazilas}
              value={selectedUpazilas}
              placeholder="Select Upazila(s)"
              isMulti
              styles={customStyles}
              isSearchable
              isDisabled={selectedDistricts.length === 0}
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
              onChange={(selectedOptions) =>
                handleDistrictChange(selectedOptions, 'present')
              }
              value={selectedPresentDistricts}
              placeholder="Select District(s)"
              isMulti
              styles={customStyles}
              isSearchable
            />
            <br />
            <Select
              options={presentUpazilaOptions}
              onChange={setSelectedPresentUpazilas}
              value={selectedPresentUpazilas}
              placeholder="Select Upazila(s)"
              isMulti
              styles={customStyles}
              isSearchable
              isDisabled={selectedPresentDistricts.length === 0}
            />
          </div>
        </div>
      </CustomAccordion>
    </div>
  );
};

export default AddressFilter;
