import React, { useEffect, useRef, useState } from "react";
import { Link } from "@/lib/navigation";
import DrobdownIcon from "../../assets/icons/Dropdown.jsx";

const SubLinks = ({ navItem, setOpenNav }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!menuRef.current?.contains(event.target)) setOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const handleMouseEnter = () => {
    if (window.matchMedia("(hover: hover)").matches) setOpen(true);
  };

  const handleMouseLeave = () => {
    if (window.matchMedia("(hover: hover)").matches) setOpen(false);
  };

  const closeMenu = () => {
    setOpen(false);
    setOpenNav(false);
  };

  return (
    <li
      ref={menuRef}
      className="relative w-full list-none whitespace-nowrap text-base font-semibold lg:w-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`inline-flex min-h-11 w-full items-center justify-center rounded-[10px] border border-transparent px-3 py-2.5 leading-none text-gray-800 transition-colors duration-200 hover:bg-[#0D7377]/10 hover:text-[#0D7377] lg:min-h-10 lg:w-auto lg:px-[7px] lg:py-[9px] lg:text-white/90 lg:hover:border-white/10 lg:hover:bg-white/[0.14] lg:hover:text-white xl:px-[clamp(9px,1vw,14px)] ${
          open
            ? "bg-[#0D7377]/10 text-[#0D7377] lg:border-white/10 lg:bg-white/[0.14] lg:text-white"
            : ""
        }`}
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        {navItem.title}
        <span
          className={`ml-1.5 inline-flex h-4 w-4 items-center justify-center transition-transform duration-200 ease-out motion-reduce:transition-none ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          <DrobdownIcon />
        </span>
      </button>

      <div
        className={`grid w-full transform-gpu transition-[grid-template-rows,opacity,transform,visibility] duration-200 ease-out motion-reduce:transition-none lg:absolute lg:left-0 lg:top-full lg:z-[100] lg:w-auto lg:min-w-[200px] lg:origin-top lg:pt-2 lg:transition-[opacity,transform,visibility] ${
          open
            ? "visible grid-rows-[1fr] translate-y-0 opacity-100 lg:pointer-events-auto lg:scale-100"
            : "invisible pointer-events-none grid-rows-[0fr] -translate-y-1 opacity-0 lg:scale-95"
        }`}
      >
        <div className="min-h-0 overflow-hidden lg:overflow-visible">
          <ul
            className="mt-1 rounded-[10px] bg-slate-50 p-[5px] text-gray-700 lg:mt-0 lg:rounded-xl lg:border lg:border-[#0D7377]/10 lg:bg-white lg:p-[7px] lg:shadow-[0_16px_38px_rgba(4,69,72,0.2)]"
            role="menu"
          >
            {navItem.subLinks.map((_linkItem) => (
              <li key={_linkItem.path} role="none">
                {_linkItem.path === "/voter-list" ? (
                  <a
                    href="http://66.29.130.89:4001/notices/63d147b70bfbc8c31261a39d.pdf"
                    className="block rounded-lg px-3 py-2.5 text-center text-gray-700 transition-colors duration-150 hover:bg-[#0D7377]/10 hover:text-[#0D7377] focus:outline-none focus-visible:bg-[#0D7377]/10 focus-visible:text-[#0D7377] lg:text-left"
                    role="menuitem"
                    onClick={closeMenu}
                  >
                    {_linkItem.title}
                  </a>
                ) : (
                  <Link
                    to={_linkItem.path}
                    className="block rounded-lg px-3 py-2.5 text-center text-gray-700 transition-colors duration-150 hover:bg-[#0D7377]/10 hover:text-[#0D7377] focus:outline-none focus-visible:bg-[#0D7377]/10 focus-visible:text-[#0D7377] lg:text-left"
                    role="menuitem"
                    onClick={closeMenu}
                  >
                    {_linkItem.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
};

export default SubLinks;
