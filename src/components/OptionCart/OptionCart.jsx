/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "@/lib/navigation";
import { convertToBengaliDigits } from "../../utils/language";

const OptionCart = ({ icon, title, path, setOpenSidebar, count, highlight = false }) => {
  const showBadge = Number(count) > 0;
  const label = Number(count) > 99 ? '99+' : convertToBengaliDigits(String(count));
  return (
    <Link
      to={path}
      onClick={() => setOpenSidebar(false)}
      className="flex flex-row items-center cursor-pointer gap-3 px-6 py-2 h-auto w-full hover:bg-gray-200"
    >
      <span className="shrink-0">{icon}</span>
      <span className="min-w-0 flex-1 text-sm font-normal">{title}</span>
      {showBadge && (
        <span
          className={`inline-flex min-w-[1.5rem] shrink-0 items-center justify-center rounded-full px-1.5 py-0.5 text-[11px] font-bold leading-4 ${
            highlight ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-700'
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
