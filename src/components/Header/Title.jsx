/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "@/lib/navigation";
import LogoImage from "./logoImage.jpg";
import {
  BiLogoFacebook,
  BiLogoLinkedin,
  BiLogoSkype,
  BiLogoWhatsapp,
} from "react-icons/bi";
import { Colors } from "../../constants/colors";

//bg-gradient-to-r from-teal-200 to-teal-500
export default function Tittle() {
  return (
    <nav
      className={`title-container h-[80px] bg-gradient-to-r p-0 m-0 bg-from-slate-900 to-slate-700  bg-[${Colors.primary}] `}
      style={{ backgroundColor: Colors.primary600 }}
    >
      <div className=" flex flex-row justify-between  px-[40px] pt-5  ">
        {/* Image part  */}
        <div className="h-[50px]  w-[50px] ">
          <Link to="/">
            <img
              src={LogoImage}
              className="h-full w-full object-cover rounded-full  "
              alt="bholaBar"
            />
          </Link>
        </div>
        <div className=" text-[20px] font-bold leading-[40px] self-center md:text-[30px] text-[#fff] ">
          <h1>PNC-নিকাহতে আপনাকে স্বাগতম!</h1>
        </div>

        <div className=" hidden md:flex flex-row cursor-pointer justify-evenly px-[20px] self-center  h-[35px] gap-6 ">
          <a
            href="https://www.facebook.com/pncsoft.tech"
            className="cursor-pointer transition ease-in duration-500  p-1 border-solid border-[2px] border-[#fff]  hover:bg-[#fff] rounded-full "
          >
            <BiLogoFacebook className="text-[22px] text-[#fff] hover:text-[#ff5e14] " />
          </a>

          <a
            href="https://www.linkedin.com/company/pnc-soft-tech/"
            className=" p-1 border-solid border-[2px] border-[#fff] hover:bg-[#fff] rounded-full transition ease-in duration-500"
          >
            <BiLogoLinkedin className="text-[22px] text-[#fff] hover:text-[#ff5e14] " />
          </a>

          <div className=" p-1 border-solid border-[2px] border-[#fff] hover:bg-[#fff] rounded-full transition ease-in duration-500">
            <BiLogoWhatsapp className="text-[22px] text-[#fff] hover:text-[#ff5e14] " />
          </div>
        </div>
      </div>
    </nav>
  );
}
