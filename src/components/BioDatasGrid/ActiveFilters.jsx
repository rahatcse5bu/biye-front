import { XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useNavigate } from '@/lib/navigation';
import { useBio } from '../../contexts/useBio';
import { useFilter } from '../../contexts/useFilter';
import { usePrimary } from '../../contexts/userPrimary';
import { activeFilterChips } from '../../utils/biodataFilters';
import { convertToQuery } from '../../utils/query';
import { convertToBengaliDigits } from '../../utils/language';

const ADDRESS_KEYS = new Set(['division', 'zilla', 'upazila', 'current_division', 'current_zilla', 'current_upzilla', 'permanent_address']);

// TODO: one place for "remove one filter" and "clear all", so chips, empty state and panel behave the same.
export const useFilterActions = () => {
  const { query, removeFilters, resetAllFilters, defaultReligion } = useBio();
  const { setSelectedDivisions, setSelectedDistricts, setSelectedPresentDivisions, setSelectedPresentDistricts } = useFilter();
  const { resetPrimaryFilters } = usePrimary();
  const navigate = useNavigate();

  const clearAddressSelections = () => {
    setSelectedDivisions([]);
    setSelectedDistricts([]);
    setSelectedPresentDivisions([]);
    setSelectedPresentDistricts([]);
  };

  const removeChip = (chip) => {
    const next = removeFilters(chip.keys);
    if (chip.keys.some((key) => ADDRESS_KEYS.has(key))) clearAddressSelections();
    navigate(`/biodatas?${convertToQuery(next)}`, { replace: true });
  };

  const clearAll = () => {
    resetAllFilters();
    clearAddressSelections();
    resetPrimaryFilters(defaultReligion || '');
    navigate('/biodatas', { replace: true });
  };

  return { chips: activeFilterChips(query), removeChip, clearAll };
};

export default function ActiveFilters() {
  const { chips, removeChip, clearAll } = useFilterActions();

  if (!chips.length) {
    return (
      <p className="mb-4 flex items-center gap-2 rounded-xl border border-dashed border-gray-200 bg-white px-3 py-2 text-xs text-gray-500">
        <FunnelIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
        কোনো ফিল্টার নেই — সব বায়োডাটা দেখানো হচ্ছে
      </p>
    );
  }

  return (
    <div className="mb-4 rounded-2xl border border-brand-900/15 bg-brand-900/[0.03] p-3" aria-label="প্রয়োগ করা ফিল্টার">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="flex items-center gap-1.5 text-xs font-bold text-brand-900">
          <FunnelIcon className="h-4 w-4" aria-hidden="true" />
          প্রয়োগ করা ফিল্টার ({convertToBengaliDigits(String(chips.length))})
        </p>
        <button
          type="button"
          onClick={clearAll}
          className="rounded-lg px-2 py-1 text-xs font-bold text-red-600 transition-colors hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          সব ফিল্টার মুছুন
        </button>
      </div>
      <ul className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <li key={chip.id}>
            <span className="inline-flex max-w-full items-center gap-1 rounded-full border border-brand-900/20 bg-white py-1 pl-3 pr-1 text-xs text-gray-700 shadow-sm">
              <span className="truncate">
                <span className="font-semibold text-gray-900">{chip.label}:</span> {chip.value}
              </span>
              <button
                type="button"
                onClick={() => removeChip(chip)}
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                aria-label={`${chip.label} ফিল্টার সরান`}
              >
                <XMarkIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
