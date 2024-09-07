/* eslint-disable react/prop-types */
// src/contexts/BioContext.js
import { useState, useEffect, createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BioDataServices } from '../services/bioData';

// Create a new context instance
const BioContext = createContext();

// Create a provider component to wrap your app
export const BioProvider = ({ children }) => {
  const [bio, setBio] = useState(null);
  const [bioLoading, setBioLoading] = useState(false);
  const [query, setQuery] = useState({
    page: 1,
    limit: 12,
  });
  const [filterFields, setFilterFields] = useState({});

  //! get all bio datas
  const {
    data: bios,
    error: bioError,
    isLoading,
  } = useQuery({
    queryKey: ['bioData', 'generalInfo', query],
    queryFn: async () => {
      return await BioDataServices.getALLGeneralInfo(query);
    },
    retry: false,
    refetchInterval: 300000, //every five minutes
  });

  useEffect(() => {
    setBioLoading(isLoading);
  }, [isLoading]);

  // console.log("bios~~", bios);
  const value = {
    bio,
    setBio,
    bios: bios?.data,
    limit: bios?.limit ?? 10,
    page: bios?.page ?? 1,
    size: bios?.size,
    bioLoading,
    bioError,
    setQuery,
    query,
    setFilterFields,
    filterFields,
  };
  // console.log("Bios-from-db~", bios);
  // console.log("Size-from-db~", bios?.size);
  // console.log("Limit-from-db~", bios?.limit);

  return <BioContext.Provider value={value}>{children}</BioContext.Provider>;
};

export default BioContext;
