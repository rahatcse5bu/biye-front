import { useEffect, useMemo, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useNavigate } from '@/lib/navigation';
import { useBio } from '../../contexts/useBio';
import { convertToQuery } from '../../utils/query';
import { convertToBengaliDigits } from '../../utils/language';

const PAGE_SIZES = [5, 12, 20, 30, 50];

export function Pagination() {
  const { setQuery, setFilterFields, limit, size, page, query } = useBio();
  const [active, setActive] = useState(page || 1);
  const [itemsPerPage, setItemsPerPage] = useState(limit || 12);
  const navigate = useNavigate();
  const totalPage = size ? Math.ceil(size / itemsPerPage) : 0;

  useEffect(() => {
    setActive(page || 1);
  }, [page]);

  useEffect(() => {
    setItemsPerPage(limit || 12);
  }, [limit]);

  const visiblePages = useMemo(() => {
    if (totalPage <= 5) {
      return Array.from({ length: totalPage }, (_, index) => index + 1);
    }
    if (active <= 3) return [1, 2, 3, 4, 'end-gap', totalPage];
    if (active >= totalPage - 2) {
      return [
        1,
        'start-gap',
        totalPage - 3,
        totalPage - 2,
        totalPage - 1,
        totalPage,
      ];
    }
    return [
      1,
      'start-gap',
      active - 1,
      active,
      active + 1,
      'end-gap',
      totalPage,
    ];
  }, [active, totalPage]);

  if (!size) return null;

  const applyPagination = (nextPage, nextLimit = itemsPerPage) => {
    const userStatus =
      query?.user_status ||
      (process.env.NODE_ENV === 'development' ? 'in review' : 'active');
    const safePage = Math.min(Math.max(nextPage, 1), Math.max(totalPage, 1));
    const nextQuery = {
      ...query,
      user_status: userStatus,
      page: safePage,
      limit: nextLimit,
    };

    setActive(safePage);
    setItemsPerPage(nextLimit);
    setQuery(nextQuery);
    setFilterFields((previous) => ({
      ...previous,
      user_status: userStatus,
      page: safePage,
      limit: nextLimit,
    }));
    navigate(`/biodatas?${convertToQuery(nextQuery)}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className="mt-5 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4"
      aria-label="বায়োডাটা পৃষ্ঠা পরিবর্তন"
    >
      <div className="flex items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 sm:text-sm">
          প্রতি পৃষ্ঠায়
          <select
            value={itemsPerPage}
            onChange={(event) => applyPagination(1, Number(event.target.value))}
            className="min-h-11 rounded-xl border border-gray-200 bg-white px-3 py-2 font-bold text-gray-700 outline-none focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10"
          >
            {PAGE_SIZES.map((item) => (
              <option key={item} value={item}>
                {convertToBengaliDigits(item)}
              </option>
            ))}
          </select>
        </label>

        <span className="text-xs font-semibold text-gray-500 sm:text-sm">
          পৃষ্ঠা {convertToBengaliDigits(active)} /{' '}
          {convertToBengaliDigits(totalPage)}
        </span>
      </div>

      {totalPage > 1 && (
        <div className="mt-3 flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
          <button
            type="button"
            onClick={() => applyPagination(active - 1)}
            disabled={active === 1}
            className="inline-flex min-h-11 items-center gap-1 rounded-xl border border-gray-200 px-3 py-2 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">আগের</span>
          </button>

          <div className="flex min-w-0 items-center justify-start gap-1 overflow-x-auto px-1 sm:justify-center">
            {visiblePages.map((item) =>
              typeof item === 'string' ? (
                <span
                  key={item}
                  className="flex h-10 min-w-6 items-center justify-center text-gray-400"
                  aria-hidden="true"
                >
                  …
                </span>
              ) : (
                <button
                  type="button"
                  key={item}
                  onClick={() => applyPagination(item)}
                  aria-current={active === item ? 'page' : undefined}
                  className={`h-10 min-w-10 rounded-xl px-2 text-sm font-bold transition-colors ${
                    active === item
                      ? 'bg-brand-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {convertToBengaliDigits(item)}
                </button>
              )
            )}
          </div>

          <button
            type="button"
            onClick={() => applyPagination(active + 1)}
            disabled={active === totalPage}
            className="inline-flex min-h-11 items-center gap-1 rounded-xl border border-gray-200 px-3 py-2 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="hidden sm:inline">পরের</span>
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </nav>
  );
}
