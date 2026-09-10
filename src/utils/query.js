export const BIODATA_QUERY_KEYS = new Set([
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

export const parseBiodataFilters = (searchParams) => {
  const filters = {};
  searchParams.forEach((value, key) => {
    if (!BIODATA_QUERY_KEYS.has(key)) return;
    if (NUMBER_QUERY_KEYS.has(key)) {
      const number = Number(value);
      if (value.trim() && Number.isFinite(number)) filters[key] = number;
    } else {
      filters[key] = value;
    }
  });
  return filters;
};

export const convertToQuery = (query = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    searchParams.set(
      key,
      Array.isArray(value) ? value.join(",") : String(value)
    );
  });

  return searchParams.toString();
};
