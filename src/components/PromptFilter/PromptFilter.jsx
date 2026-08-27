/* eslint-disable react/prop-types */
import { useState } from 'react';
import { SparklesIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { parseBiodataQuery } from '../../services/llmFilter';

const formatFilterChip = (key, value) => {
  const religion = {
    islam: 'ইসলাম',
    hinduism: 'হিন্দু',
    christianity: 'খ্রিস্টান',
  };
  const religiousType = {
    practicing_muslim: 'প্র্যাকটিসিং মুসলিম',
    general_muslim: 'সাধারণ মুসলিম',
    practicing_hindu: 'প্র্যাকটিসিং হিন্দু',
    general_hindu: 'সাধারণ হিন্দু',
    practicing_christian: 'প্র্যাকটিসিং খ্রিস্টান',
    general_christian: 'সাধারণ খ্রিস্টান',
  };

  switch (key) {
    case 'bio_type':
      return value;
    case 'religion':
      return religion[value] || value;
    case 'religious_type':
      return religiousType[value] || value;
    case 'marital_status':
      return value;
    case 'minAge':
      return `বয়স ≥ ${value}`;
    case 'maxAge':
      return `বয়স ≤ ${value}`;
    case 'minHeight':
      return `উচ্চতা ≥ ${value}'`;
    case 'maxHeight':
      return `উচ্চতা ≤ ${value}'`;
    case 'division':
      return `বিভাগ: ${value}`;
    case 'zilla':
      return `জেলা: ${value}`;
    case 'occupation':
      return `পেশা: ${value}`;
    case 'education_medium':
      return `শিক্ষা: ${value}`;
    case 'complexion':
      return `গায়ের রঙ: ${value}`;
    case 'economic_status':
      return `আর্থিক অবস্থা: ${value}`;
    default:
      return `${key}: ${value}`;
  }
};

const DISPLAY_KEYS = [
  'bio_type',
  'religion',
  'religious_type',
  'marital_status',
  'minAge',
  'maxAge',
  'minHeight',
  'maxHeight',
  'division',
  'zilla',
  'occupation',
  'education_medium',
  'complexion',
  'economic_status',
];

const PromptFilter = ({ onApply, onClear, className = '' }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [appliedFilters, setAppliedFilters] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setLoading(true);
    setError('');

    try {
      const filters = await parseBiodataQuery(trimmed);
      const filtered = Object.fromEntries(
        Object.entries(filters).filter(([key]) => DISPLAY_KEYS.includes(key))
      );
      setAppliedFilters(Object.keys(filtered).length > 0 ? filtered : null);
      onApply(filtered);
    } catch (requestError) {
      setError('ফিল্টার প্রক্রিয়া করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      console.error('LLM filter error:', requestError);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInput('');
    setAppliedFilters(null);
    setError('');
    onClear?.();
  };

  return (
    <div className={`w-full ${className}`}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 sm:flex-row sm:items-center"
      >
        <div className="relative flex-1">
          <SparklesIcon
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-900"
            aria-hidden="true"
          />
          <label htmlFor="ai-biodata-search" className="sr-only">
            বাংলায় আপনার পছন্দের বায়োডাটার বর্ণনা লিখুন
          </label>
          <input
            id="ai-biodata-search"
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="যেমন: ঢাকার ডাক্তার পাত্র, বয়স ২৫–৩০"
            className="min-h-12 w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition-colors duration-200 placeholder:text-gray-400 hover:border-brand-900/40 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
            aria-describedby={error ? 'ai-search-error' : undefined}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-900 px-5 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#0F8287] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
        >
          {loading ? (
            <>
              <span
                className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white motion-reduce:animate-none"
                aria-hidden="true"
              />
              খুঁজছি...
            </>
          ) : (
            <>
              <SparklesIcon className="h-4 w-4" aria-hidden="true" />
              AI খোঁজ
            </>
          )}
        </button>
        {appliedFilters && (
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex min-h-12 items-center justify-center gap-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-600 transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 motion-reduce:transition-none"
          >
            <XMarkIcon className="h-4 w-4" aria-hidden="true" />
            মুছুন
          </button>
        )}
      </form>

      {error && (
        <p
          id="ai-search-error"
          className="mt-2 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}

      {appliedFilters && Object.keys(appliedFilters).length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-semibold text-gray-500">
            প্রয়োগ করা ফিল্টার:
          </span>
          {Object.entries(appliedFilters).map(([key, value]) => (
            <span
              key={key}
              className="inline-flex items-center rounded-full border border-brand-900/15 bg-brand-900/10 px-2.5 py-1 text-xs font-bold text-brand-900"
            >
              {formatFilterChip(key, value)}
            </span>
          ))}
        </div>
      )}

      {appliedFilters &&
        Object.keys(appliedFilters).length === 0 &&
        !loading && (
          <p className="mt-2 text-sm text-amber-700">
            কোনো নির্দিষ্ট ফিল্টার পাওয়া যায়নি। আরও বিস্তারিত লিখুন।
          </p>
        )}
    </div>
  );
};

export default PromptFilter;
