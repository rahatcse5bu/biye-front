import { useState, createContext, useEffect, useCallback, useMemo } from "react";
import { useReligionPreference } from "./ReligionPreferenceContext";

// Create a new context instance
export const PrimaryFilterContext = createContext();

const PrimaryFilterProvider = ({ children }) => {
  const { religion: preferredReligion, ready } = useReligionPreference();
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
  const [religion, setReligion] = useState("");
  const [religiousType, setReligiousType] = useState("");

  // Keep the filter's religion in sync with the global preference so the
  // sidebar reflects the religion chosen in the header / chooser / filters.
  useEffect(() => {
    if (!ready) return;
    setReligion(preferredReligion || "");
    // Religious type no longer matches when the religion changes
    setReligiousType("");
  }, [preferredReligion, ready]);

  const resetPrimaryFilters = useCallback((defaultReligion = "") => {
    setHeight({ min: 4.5, max: 7.0 });
    setAge({ min: 18, max: 60 });
    setBioType("");
    setMaritalStatus("");
    setReligion(defaultReligion);
    setReligiousType("");
  }, []);

  // TODO: memoized on the state values; setters and resetPrimaryFilters are stable.
  const value = useMemo(() => ({
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
  }), [height, age, bioType, maritalStatus, religion, religiousType, resetPrimaryFilters]);
  return (
    <PrimaryFilterContext.Provider value={value}>
      {children}
    </PrimaryFilterContext.Provider>
  );
};

export default PrimaryFilterProvider;
