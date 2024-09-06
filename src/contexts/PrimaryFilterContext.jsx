import { useState, createContext } from 'react';

// Create a new context instance
export const PrimaryFilterContext = createContext();

const PrimaryFilterProvider = ({ children }) => {
  const [height, setHeight] = useState({
    min: 5.0,
    max: 6.0,
  });
  const [age, setAge] = useState({
    min: 20,
    max: 30,
  });
  const [bioType, setBioType] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const value = {
    height,
    setHeight,
    age,
    setAge,
    setBioType,
    bioType,
    maritalStatus,
    setMaritalStatus,
  };
  return (
    <PrimaryFilterContext.Provider value={value}>
      {children}
    </PrimaryFilterContext.Provider>
  );
};

export default PrimaryFilterProvider;
