import { createContext, useMemo, useState } from 'react';

export const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [sideBarDisplay, setSideBarDisplay] = useState(false);
  const [addressFilterOpen, setAddressFilterOpen] = useState(false);
  const [primaryFilterOpen, setPrimaryFilterOpen] = useState(false);
  const [selectedDivisions, setSelectedDivisions] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [selectedPresentDivisions, setSelectedPresentDivisions] = useState([]);
  const [selectedPresentDistricts, setSelectedPresentDistricts] = useState([]);

  // TODO: memoized on the state values; setters are stable.
  const value = useMemo(() => ({
    openSidebar,
    setOpenSidebar,
    sideBarDisplay,
    setSideBarDisplay,
    addressFilterOpen,
    setAddressFilterOpen,
    primaryFilterOpen,
    setPrimaryFilterOpen,
    selectedDivisions,
    selectedDistricts,
    selectedPresentDivisions,
    selectedPresentDistricts,
    setSelectedDivisions,
    setSelectedDistricts,
    setSelectedPresentDivisions,
    setSelectedPresentDistricts,
  }), [
    openSidebar,
    sideBarDisplay,
    addressFilterOpen,
    primaryFilterOpen,
    selectedDivisions,
    selectedDistricts,
    selectedPresentDivisions,
    selectedPresentDistricts,
  ]);
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export default FilterProvider;
