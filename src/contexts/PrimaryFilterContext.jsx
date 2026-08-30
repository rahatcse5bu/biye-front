import { useState, createContext } from "react";
import { getReligionInfo } from "../utils/localStorage";
import { religionToApiKey } from "../constants/religionContent";

// Create a new context instance
export const PrimaryFilterContext = createContext();

const PrimaryFilterProvider = ({ children }) => {
  const [height, setHeight] = useState({
    min: 4.5,
    max: 7.0,
  });
  const [age, setAge] = useState({
    min: 18,
    max: 60,
  });
  const [bioType, setBioType] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [religion, setReligion] = useState(
    () => religionToApiKey[getReligionInfo().religion] || ""
  );
  const [religiousType, setReligiousType] = useState("");

  const resetPrimaryFilters = (defaultReligion = "") => {
    setHeight({ min: 4.5, max: 7.0 });
    setAge({ min: 18, max: 60 });
    setBioType("");
    setMaritalStatus("");
    setReligion(defaultReligion);
    setReligiousType("");
  };

  const value = {
    height,
    setHeight,
    age,
    setAge,
    setBioType,
    bioType,
    maritalStatus,
    setMaritalStatus,
    religion,
    setReligion,
    religiousType,
    setReligiousType,
    resetPrimaryFilters,
  };
  return (
    <PrimaryFilterContext.Provider value={value}>
      {children}
    </PrimaryFilterContext.Provider>
  );
};

export default PrimaryFilterProvider;
