/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DrobdownIcon from '../../assets/icons/Dropdown.jsx';

const SubLinks = ({ navItem, setOpenNav }) => {
  const [open, setOpen] = useState(false);

  return (
    <li className="group relative block lg:inline-block  antialiased font-sans text-white text-lg font-semibold nav-item-primary nav-item-dropdown">
      <button
        className="flex items-center justify-center w-full lg:w-auto ease-linear transition-all duration-150 h-full"
        onClick={() => setOpen(!open)}
      >
        {navItem.title} <DrobdownIcon />{' '}
      </button>
      <ul className={`absolute left-0 text-gray-700 w-full lg:w-40 text-sm nav-item-dropdown-ul ${open ? 'block' : 'hidden'} lg:hidden lg:group-hover:block`}>
        {navItem.subLinks.map((_linkItem, _in) =>
          _linkItem.path === '/voter-list' ? (
            <a
              key={_in}
              href="http://66.29.130.89:4001/notices/63d147b70bfbc8c31261a39d.pdf"
              className="whitespace-no-wrap block py-2 px-4 hover:bg-gray-400"
              onClick={() => { setOpen(false); setOpenNav(false); }}
            >
              {_linkItem.title}
            </a>
          ) : (
            <Link
              key={_in}
              to={_linkItem.path}
              className="whitespace-no-wrap block py-2 px-4 hover:bg-gray-400"
              onClick={() => { setOpen(false); setOpenNav(false); }}
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
