import { createContext, useState } from 'react';

export const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [sideBarDisplay, setSideBarDisplay] = useState(false);
  const [addressFilterOpen, setAddressFilterOpen] = useState(false);
  const [primaryFilterOpen, setPrimaryFilterOpen] = useState(false);
  const [selectedDivisions, setSelectedDivisions] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);

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
    setSelectedDivisions,
    setSelectedDistricts,
  };
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export default FilterProvider;
