import { AiOutlineDelete, AiOutlineSearch } from "react-icons/ai";
import { useBio } from "../../contexts/useBio";
import { useNavigate } from "@/lib/navigation";
import { convertToQuery } from "../../utils/query";
import { useFilter } from "../../contexts/useFilter";
import { usePrimary } from "../../contexts/userPrimary";

const BioDataFilterButton = () => {
  const { filterFields, setQuery, query, resetAllFilters, defaultReligion } =
    useBio();
  const {
    setSideBarDisplay,
    setSelectedDivisions,
    setSelectedDistricts,
    setSelectedPresentDivisions,
    setSelectedPresentDistricts,
    setAddressFilterOpen,
    setPrimaryFilterOpen,
  } = useFilter();
  const { resetPrimaryFilters } = usePrimary();
  const navigate = useNavigate();
  const buttonHandler = async (type) => {
    // console.log('type~', type);
    // console.log("filterFields~", filterFields);

    if (type === "search") {
      const nextQuery = {
        ...filterFields,
        page: 1,
        limit: query?.limit || 12,
      };
      setQuery(nextQuery);
      navigate(`/biodatas?${convertToQuery(nextQuery)}`);
    } else if (type === "delete") {
      resetAllFilters();
      setSelectedDivisions([]);
      setSelectedDistricts([]);
      setSelectedPresentDivisions([]);
      setSelectedPresentDistricts([]);
      resetPrimaryFilters(defaultReligion || "");
      navigate("/biodatas");
    }
    setSideBarDisplay(false);
    setAddressFilterOpen(true);
    setPrimaryFilterOpen(true);
  };
  return (
    <div className="sticky bottom-0 z-20 -mx-2 flex gap-2 border-t border-gray-200 bg-white/95 px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-sm lg:pb-2">
      <button
        type="button"
        className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-brand-900 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0F8287] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2"
        onClick={() => buttonHandler("search")}
      >
        <AiOutlineSearch className="h-5 w-5" aria-hidden="true" />
        খুঁজুন
      </button>
      <button
        type="button"
        className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700 transition-colors hover:bg-red-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
        onClick={() => buttonHandler("delete")}
      >
        <AiOutlineDelete className="h-5 w-5" aria-hidden="true" />
        মুছে ফেলুন
      </button>
    </div>
  );
};

export default BioDataFilterButton;
