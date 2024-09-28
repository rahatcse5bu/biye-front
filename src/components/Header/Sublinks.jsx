/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import DrobdownIcon from '../../assets/icons/Dropdown.jsx';

const SubLinks = ({ navItem, setOpenNav }) => {
  return (
    <li className="group relative inline-block  antialiased font-sans text-white text-lg font-semibold nav-item-primary nav-item-dropdown">
      <button className="flex  items-center   ease-linear transition-all duration-150 h-full">
        {navItem.title} <DrobdownIcon />{' '}
      </button>
      <ul className="absolute hidden text-gray-700 group-hover:block w-40 text-sm nav-item-dropdown-ul">
        {navItem.subLinks.map((_linkItem, _in) =>
          _linkItem.path === '/voter-list' ? (
            <a
              key={_in}
              href="http://66.29.130.89:4001/notices/63d147b70bfbc8c31261a39d.pdf"
              className="whitespace-no-wrap block py-2 px-4 hover:bg-gray-400"
            >
              {_linkItem.title}
            </a>
          ) : (
            <Link
              key={_in}
              to={_linkItem.path}
              className="whitespace-no-wrap block py-2 px-4 hover:bg-gray-400"
              onClick={() => setOpenNav(false)}
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
