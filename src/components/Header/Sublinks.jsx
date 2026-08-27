/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from '@/lib/navigation';
import DrobdownIcon from '../../assets/icons/Dropdown.jsx';

const SubLinks = ({ navItem, setOpenNav }) => {
  const [open, setOpen] = useState(false);

  return (
    <li className="group relative w-full list-none whitespace-nowrap text-base font-semibold lg:w-auto">
      <button
        className="inline-flex min-h-11 w-full items-center justify-center rounded-[10px] border border-transparent px-3 py-2.5 leading-none text-gray-800 transition-colors duration-200 hover:bg-[#0D7377]/10 hover:text-[#0D7377] lg:min-h-10 lg:w-auto lg:px-[7px] lg:py-[9px] lg:text-white/90 lg:hover:border-white/10 lg:hover:bg-white/[0.14] lg:hover:text-white xl:px-[clamp(9px,1vw,14px)] [&>svg]:ml-1.5 [&>svg]:h-4 [&>svg]:w-4"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {navItem.title} <DrobdownIcon />
      </button>
      <ul
        className={`static mt-0.5 w-full rounded-[10px] bg-slate-50 p-[5px] text-gray-700 lg:absolute lg:left-0 lg:top-full lg:z-[100] lg:mt-2 lg:w-auto lg:min-w-[190px] lg:overflow-hidden lg:rounded-xl lg:border lg:border-[#0D7377]/10 lg:bg-white lg:p-[7px] lg:shadow-[0_16px_38px_rgba(4,69,72,0.2)] ${open ? 'block' : 'hidden'} lg:hidden lg:group-hover:block`}
      >
        {navItem.subLinks.map((_linkItem, _in) =>
          _linkItem.path === '/voter-list' ? (
            <a
              key={_in}
              href="http://66.29.130.89:4001/notices/63d147b70bfbc8c31261a39d.pdf"
              className="block rounded-lg px-3 py-2.5 text-center text-gray-700 transition-colors duration-150 hover:bg-[#0D7377]/10 hover:text-[#0D7377] lg:text-left"
              onClick={() => {
                setOpen(false);
                setOpenNav(false);
              }}
            >
              {_linkItem.title}
            </a>
          ) : (
            <Link
              key={_in}
              to={_linkItem.path}
              className="block rounded-lg px-3 py-2.5 text-center text-gray-700 transition-colors duration-150 hover:bg-[#0D7377]/10 hover:text-[#0D7377] lg:text-left"
              onClick={() => {
                setOpen(false);
                setOpenNav(false);
              }}
            >
              {_linkItem.title}
            </Link>
          )
        )}
      </ul>
    </li>
  );
};

export default SubLinks;
