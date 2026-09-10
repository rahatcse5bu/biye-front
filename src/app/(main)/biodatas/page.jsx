import { ServerSeededBioDatas } from "@/views/pages/BioDatas/BioDatas";
import { convertToQuery, parseBiodataFilters } from "@/utils/query";
import { baseUrl } from "@/utils/url";

export default async function BioDatasPage({ searchParams }) {
  const params = await searchParams;
  const filters = parseBiodataFilters(
    new URLSearchParams(convertToQuery(params))
  );
  const initialQuery = {
    page: 1,
    limit: 12,
    user_status:
      process.env.NODE_ENV === "development" ? "in review" : "active",
    ...filters,
  };
  const queryString = convertToQuery(initialQuery);
  const response = await fetch(`${baseUrl}/general-info?${queryString}`, {
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(`Unable to load biodatas (${response.status})`);
  }
  const initialData = await response.json();
  if (!initialData.success || !Array.isArray(initialData.data)) {
    throw new Error("Invalid biodata listing response");
  }

  return (
    <ServerSeededBioDatas
      key={queryString}
      initialQuery={initialQuery}
      initialData={initialData}
    />
  );
}
