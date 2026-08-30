import { useEffect } from "react";
import { useSearchParams } from "@/lib/navigation";
import { useBio } from "../../contexts/useBio";
import { usePrimary } from "../../contexts/userPrimary";
import PrimaryFilter from "./PrimaryFilter";
import AddressFilter from "./AddressFilter";
import BioDataFilterButton from "./BioDataFilterButton";
import EducationFilter from "./EducationFilter";
import PersonalInfoFilter from "./PersonalInfoFilte";
import OccupationFilter from "./OccupationFilter";
import OthersFilter from "./OthersFilter";
import ExpectedPartnerFilter from "./ExpectedPartnerFilter";

const ALLOWED_QUERY_KEYS = new Set([
  "page",
  "limit",
  "user_status",
  "sortBy",
  "sortOrder",
  "isFeatured",
  "bio_type",
  "bio_gender",
  "gender",
  "marital_status",
  "marital_status_en",
  "religion",
  "religious_type",
  "minAge",
  "maxAge",
  "minHeight",
  "maxHeight",
  "complexion",
  "division",
  "zilla",
  "upazila",
  "current_division",
  "current_zilla",
  "current_upzilla",
  "permanent_address",
  "education_medium",
  "deeni_edu",
  "occupation",
  "fiqh",
  "economic_status",
  "categories",
  "exp_zilla",
  "exp_marital_status",
  "exp_occupation",
  "exp_economical_condition",
  "exp_educational_qualifications",
]);

const NUMBER_QUERY_KEYS = new Set([
  "page",
  "limit",
  "minAge",
  "maxAge",
  "minHeight",
  "maxHeight",
]);

const BioDataFilter = () => {
  const [searchParams] = useSearchParams();
  const { setFilterFields, setQuery, filterResetKey, defaultReligion } =
    useBio();
  const {
    setBioType,
    setMaritalStatus,
    setReligion,
    setReligiousType,
    setAge,
    setHeight,
  } = usePrimary();

  useEffect(() => {
    const urlFilters = {};

    searchParams.forEach((value, key) => {
      if (!ALLOWED_QUERY_KEYS.has(key)) return;
      urlFilters[key] = NUMBER_QUERY_KEYS.has(key) ? Number(value) : value;
    });

    const hasUrlFilters = Object.keys(urlFilters).length > 0;
    const userStatus =
      process.env.NODE_ENV === "development" ? "in review" : "active";
    const nextQuery = {
      page: 1,
      limit: 12,
      user_status: userStatus,
      ...(defaultReligion && { religion: defaultReligion }),
      ...urlFilters,
    };

    if (hasUrlFilters && !("religion" in urlFilters)) {
      delete nextQuery.religion;
    }

    setQuery(nextQuery);
    setFilterFields(nextQuery);

    setBioType(urlFilters.bio_type || "");
    setMaritalStatus(urlFilters.marital_status || "");
    setReligion(
      "religion" in urlFilters
        ? urlFilters.religion || ""
        : defaultReligion || ""
    );
    setReligiousType(urlFilters.religious_type || "");
    setAge({
      min: Number(urlFilters.minAge) || 18,
      max: Number(urlFilters.maxAge) || 60,
    });
    setHeight({
      min: Number(urlFilters.minHeight) || 4.5,
      max: Number(urlFilters.maxHeight) || 7,
    });
  }, [
    defaultReligion,
    searchParams,
    setAge,
    setBioType,
    setFilterFields,
    setHeight,
    setMaritalStatus,
    setQuery,
    setReligion,
    setReligiousType,
  ]);

  return (
    <div className="space-y-3 pb-2">
      <PrimaryFilter />
      <AddressFilter key={`address-${filterResetKey}`} />
      <EducationFilter key={`education-${filterResetKey}`} />
      <PersonalInfoFilter key={`personal-${filterResetKey}`} />
      <OccupationFilter key={`occupation-${filterResetKey}`} />
      <OthersFilter key={`others-${filterResetKey}`} />
      <ExpectedPartnerFilter key={`expected-${filterResetKey}`} />
      <BioDataFilterButton />
    </div>
  );
};

export default BioDataFilter;
