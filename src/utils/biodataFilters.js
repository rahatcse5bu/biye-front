import { convertToBengaliDigits } from './language';

// TODO: query keys that aren't user filters: paging, sorting, visibility, and the header's religion preference.
const NON_FILTER_KEYS = new Set(['page', 'limit', 'user_status', 'sortBy', 'sortOrder', 'religion']);

const LABELS = {
  bio_type: 'বায়োডাটার ধরন',
  bio_gender: 'লিঙ্গ',
  gender: 'লিঙ্গ',
  marital_status: 'বৈবাহিক অবস্থা',
  marital_status_en: 'বৈবাহিক অবস্থা',
  religious_type: 'ধর্মীয় ধরন',
  complexion: 'গাত্রবর্ণ',
  division: 'স্থায়ী বিভাগ',
  zilla: 'স্থায়ী জেলা',
  upazila: 'স্থায়ী উপজেলা',
  current_division: 'বর্তমান বিভাগ',
  current_zilla: 'বর্তমান জেলা',
  current_upzilla: 'বর্তমান উপজেলা',
  permanent_address: 'স্থায়ী ঠিকানা',
  education_medium: 'শিক্ষার মাধ্যম',
  deeni_edu: 'দ্বীনি শিক্ষা',
  occupation: 'পেশা',
  fiqh: 'মাযহাব',
  economic_status: 'অর্থনৈতিক অবস্থা',
  categories: 'ক্যাটাগরি',
  isFeatured: 'ফিচার্ড',
  exp_zilla: 'প্রত্যাশিত জেলা',
  exp_marital_status: 'প্রত্যাশিত বৈবাহিক অবস্থা',
  exp_occupation: 'প্রত্যাশিত পেশা',
  exp_economical_condition: 'প্রত্যাশিত অর্থনৈতিক অবস্থা',
  exp_educational_qualifications: 'প্রত্যাশিত শিক্ষাগত যোগ্যতা',
};

const RELIGIOUS_TYPES = {
  practicing_muslim: 'প্র্যাক্টিসিং মুসলিম',
  general_muslim: 'সাধারণ মুসলিম',
  practicing_hindu: 'প্র্যাক্টিসিং হিন্দু',
  general_hindu: 'সাধারণ হিন্দু',
  practicing_christian: 'প্র্যাক্টিসিং খ্রিস্টান',
  general_christian: 'সাধারণ খ্রিস্টান',
};

const isEmpty = (value) =>
  value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0);

const asText = (value) => (Array.isArray(value) ? value.join(', ') : String(value));

// TODO: age/height defaults (18–60, 4.5–7) mean "no limit", so they aren't shown as filters.
const RANGES = [
  { key: 'age', label: 'বয়স', min: 'minAge', max: 'maxAge', defaults: [18, 60], unit: 'বছর' },
  { key: 'height', label: 'উচ্চতা', min: 'minHeight', max: 'maxHeight', defaults: [4.5, 7], unit: 'ফুট' },
];

// TODO: applied filters as chips: { id, label, value, keys } where keys are the query keys a chip removes.
export const activeFilterChips = (query = {}) => {
  const chips = [];
  const rangeKeys = new Set();

  RANGES.forEach(({ key, label, min, max, defaults, unit }) => {
    rangeKeys.add(min);
    rangeKeys.add(max);
    const lo = isEmpty(query[min]) ? defaults[0] : Number(query[min]);
    const hi = isEmpty(query[max]) ? defaults[1] : Number(query[max]);
    if (lo === defaults[0] && hi === defaults[1]) return;
    chips.push({
      id: key,
      label,
      value: `${convertToBengaliDigits(String(lo))}–${convertToBengaliDigits(String(hi))} ${unit}`,
      keys: [min, max],
    });
  });

  Object.entries(query).forEach(([key, value]) => {
    if (NON_FILTER_KEYS.has(key) || rangeKeys.has(key) || isEmpty(value)) return;
    const text = key === 'religious_type' ? RELIGIOUS_TYPES[value] || asText(value) : asText(value);
    chips.push({ id: key, label: LABELS[key] || key, value: text, keys: [key] });
  });

  return chips;
};

// TODO: compares the panel's ticked filters with the applied ones, ignoring paging and empty values.
const normalize = (fields = {}) =>
  JSON.stringify(
    Object.keys(fields)
      .filter((key) => !NON_FILTER_KEYS.has(key) || key === 'religion')
      .filter((key) => !isEmpty(fields[key]))
      .sort()
      .map((key) => [key, asText(fields[key])])
  );

export const hasPendingChanges = (filterFields, query) => normalize(filterFields) !== normalize(query);
