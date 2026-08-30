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
