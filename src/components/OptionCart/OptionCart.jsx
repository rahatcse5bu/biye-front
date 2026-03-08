/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const OptionCart = ({ icon, title, path, setOpenSidebar }) => {
  return (
    <Link
      to={path}
      onClick={() => setOpenSidebar(false)}
      className="flex flex-row items-center cursor-pointer gap-3 px-6 py-2 h-auto w-full hover:bg-gray-200"
    >
      <span className="shrink-0">{icon}</span>
      <span className="text-sm font-normal">{title}</span>
    </Link>
  );
};

export default OptionCart;
