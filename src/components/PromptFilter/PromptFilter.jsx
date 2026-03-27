/* eslint-disable react/prop-types */
import { useState } from 'react';
import { parseBiodataQuery } from '../../services/llmFilter';

// Human-readable labels for applied filters
const formatFilterChip = (key, value) => {
  const religion = { islam: 'ইসলাম', hinduism: 'হিন্দু', christianity: 'খ্রিস্টান' };
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setLoading(true);
    setError('');

    try {
      const filters = await parseBiodataQuery(trimmed);
      const filtered = Object.fromEntries(
        Object.entries(filters).filter(([k]) => DISPLAY_KEYS.includes(k))
      );
      setAppliedFilters(Object.keys(filtered).length > 0 ? filtered : null);
      onApply(filtered);
    } catch (err) {
      setError('ফিল্টার প্রক্রিয়া করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      console.error('LLM filter error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInput('');
    setAppliedFilters(null);
    setError('');
    if (onClear) onClear();
  };

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <div className="relative flex-1">
          {/* AI spark icon */}
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg select-none pointer-events-none">
            ✨
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="বাংলায় লিখুন — যেমন: ঢাকার ডাক্তার পাত্র, বয়স ২৫-৩০, প্র্যাকটিসিং মুসলিম"
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap"
        >
          {loading ? (
            <span className="flex items-center gap-1.5">
              <svg
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              খুঁজছি...
            </span>
          ) : (
            'AI খোঁজ'
          )}
        </button>
        {appliedFilters && (
          <button
            type="button"
            onClick={handleClear}
            className="px-3 py-2.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            ✕ মুছুন
          </button>
        )}
      </form>

      {/* Error */}
      {error && (
        <p className="mt-1.5 text-xs text-red-600">{error}</p>
      )}

      {/* Applied filter chips */}
      {appliedFilters && Object.keys(appliedFilters).length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5 items-center">
          <span className="text-xs text-gray-500 mr-1">প্রযুক্ত ফিল্টার:</span>
          {Object.entries(appliedFilters).map(([key, value]) => (
            <span
              key={key}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-200"
            >
              {formatFilterChip(key, value)}
            </span>
          ))}
        </div>
      )}

      {appliedFilters && Object.keys(appliedFilters).length === 0 && !loading && (
        <p className="mt-1.5 text-xs text-amber-600">
          কোনো নির্দিষ্ট ফিল্টার পাওয়া যায়নি। আরও বিস্তারিত লিখুন।
        </p>
      )}
    </div>
  );
};

export default PromptFilter;
