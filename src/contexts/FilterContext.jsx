import { createContext, useState } from 'react';

export const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [sideBarDisplay, setSideBarDisplay] = useState(false);
  const [addressFilterOpen, setAddressFilterOpen] = useState(false);
  const [primaryFilterOpen, setPrimaryFilterOpen] = useState(false);
  const [selectedDivisions, setSelectedDivisions] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [selectedPresentDivisions, setSelectedPresentDivisions] = useState([]);
  const [selectedPresentDistricts, setSelectedPresentDistricts] = useState([]);

  const value = {
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
  };
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export default FilterProvider;
