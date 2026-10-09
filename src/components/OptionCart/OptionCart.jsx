/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from '@/lib/navigation';
import { convertToBengaliDigits } from '../../utils/language';

const OptionCart = ({ Icon, title, path, active = false, setOpenSidebar, count, highlight = false }) => {
  const showBadge = Number(count) > 0;
  const label = Number(count) > 99 ? '৯৯+' : convertToBengaliDigits(String(count));
  return (
    <Link
      to={path}
      onClick={() => setOpenSidebar(false)}
      aria-current={active ? 'page' : undefined}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[14px] leading-6 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900/40 motion-reduce:transition-none ${
        active
          ? 'bg-brand-900/[0.07] font-semibold text-brand-900'
          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <Icon
        className={`h-5 w-5 shrink-0 ${active ? 'text-brand-900' : 'text-gray-400'}`}
        aria-hidden="true"
      />
      <span className="min-w-0 flex-1 truncate">{title}</span>
      {showBadge && (
        <span
          className={`shrink-0 rounded-full px-2 text-xs font-semibold leading-5 ${
            highlight ? 'bg-amber-100 text-amber-700' : 'text-gray-400'
          }`}
          aria-label={highlight ? `${count}টি অপেক্ষমাণ` : `${count}টি`}
        >
          {label}
        </span>
      )}
    </Link>
  );
};

export default OptionCart;
