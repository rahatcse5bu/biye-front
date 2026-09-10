// src/contexts/BioContext.js
import { useState, useEffect, createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { BioDataServices } from "../services/bioData";
import { religionToApiKey } from "../constants/religionContent";
import { useReligionPreference } from "./ReligionPreferenceContext";

// Create a new context instance
const BioContext = createContext();

// Create a provider component to wrap your app
export const BioProvider = ({
  children,
  initialQuery: serverQuery,
  initialData,
}) => {
  const [bio, setBio] = useState(null);
  const [bioLoading, setBioLoading] = useState(false);
  const [filterResetKey, setFilterResetKey] = useState(0);

  // Religion is a global browsing preference (header / chooser / filters).
  // Auto-include it in the biodata query.
  const { religion: preferredReligion, ready } = useReligionPreference();
  const apiReligion = religionToApiKey[preferredReligion] || null;
  const initialQuery = { page: 1, limit: 12 };
  if (apiReligion) {
    initialQuery.religion = apiReligion;
  }
  const [query, setQuery] = useState(serverQuery || initialQuery);
  const [filterFields, setFilterFields] = useState(
    () => serverQuery || (apiReligion ? { religion: apiReligion } : {}),
  );

  // When the user selects a religion, fetch the biodata immediately with it.
  // On server-seeded pages (biodatas listing) the URL + BioDataFilter own the
  // sync and already include the preference; the URL never loses religion.
  useEffect(() => {
    if (!ready || serverQuery) return;

    setQuery((prev) => {
      const next = { ...prev, page: 1 };
      if (apiReligion) next.religion = apiReligion;
      else delete next.religion;
      // Religious type no longer matches when the religion changes
      delete next.religious_type;
      return next;
    });

    setFilterFields((prev) => {
      const next = { ...prev };
      if (apiReligion) next.religion = apiReligion;
      else delete next.religion;
      delete next.religious_type;
      return next;
    });
  }, [apiReligion, ready, serverQuery, setFilterFields, setQuery]);

  const resetAllFilters = () => {
    const userStatus =
      process.env.NODE_ENV === "development" ? "in review" : "active";
    const defaultQuery = {
      page: 1,
      limit: 12,
      user_status: userStatus,
      ...(apiReligion && { religion: apiReligion }),
    };

    setQuery(defaultQuery);
    setFilterFields({
      user_status: userStatus,
      ...(apiReligion && { religion: apiReligion }),
    });
    setFilterResetKey((previous) => previous + 1);
  };

  //! get all bio datas
  const {
    data: bios,
    error: bioError,
    isLoading,
  } = useQuery({
    queryKey: ["bioData", "generalInfo", query],
    queryFn: async () => {
      return await BioDataServices.getALLGeneralInfo(query);
    },
    // Seed only the matching query; changed filters must fetch their own results.
    initialData:
      serverQuery &&
      Object.keys(query).length === Object.keys(serverQuery).length &&
      Object.entries(serverQuery).every(([key, value]) => query[key] === value)
        ? initialData
        : undefined,
    staleTime: serverQuery ? 30000 : 0,
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
    limit: bios?.limit ?? 12,
    page: bios?.page ?? 1,
    size: bios?.size,
    bioLoading: serverQuery ? isLoading : bioLoading,
    bioError,
    setQuery,
    query,
    setFilterFields,
    filterFields,
    filterResetKey,
    resetAllFilters,
    defaultReligion: apiReligion,
  };
  // console.log("Bios-from-db~", bios);
  // console.log("Size-from-db~", bios?.size);
  // console.log("Limit-from-db~", bios?.limit);

  return <BioContext.Provider value={value}>{children}</BioContext.Provider>;
};

export default BioContext;
