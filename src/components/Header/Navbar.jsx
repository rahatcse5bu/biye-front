/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcLike, FcDislike, FcSettings, FcSupport } from "react-icons/fc";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { navData } from "./navigation_data";
import SubLinks from "./Sublinks.jsx";
import "../../assets/styles/nav-bar.css";
import UserContext from "../../contexts/UserContext";
import { FaUserLarge } from "react-icons/fa6";
import { MdExitToApp } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";
import navLogo from "../../assets/icons/logo.png";
import { removeToken } from "../../utils/cookies";
import { Modal } from "../Modal/Modal";
import { getGender } from "../../utils/localStorage";
import female from "../../assets/icons/female.svg";
import male from "../../assets/icons/male.svg";
import { useQuery } from "@tanstack/react-query";
import { userServices } from "../../services/user";

export default function NavBar() {
  const { userInfo, user, logOut, setUserInfo } = useContext(UserContext);
  const [filteredNavData, setFilteredNavData] = useState(navData);
  const [isHovered, setIsHovered] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const gender = getGender();
  const navigate = useNavigate();

  const {
    data,
    isLoading: userInfoFetchLoading,
    refetch: userInfoRefetch,
  } = useQuery({
    queryKey: ["user-info", user?.email],
    queryFn: async () => {
      return await userServices.getUserInfoByEmail(user?.email);
    },
    retry: false,
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (data) {
      setUserInfo(data);
    }
  }, [data, setUserInfo]);
  console.log("user~~~", user);

  // console.log("user-info", userInfo);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      } else {
        setIsHovered(false);
      }
    });
  }, []);

  const handleIconHover = () => {
    setIsHovered(true);
  };
  const logoutHandler = async () => {
    await logOut();
    setIsHovered(false);
    removeToken();
    navigate("/");
  };

  const handleIconLeave = () => {
    setIsHovered(false);
  };

  const myBioDataHandler = () => {
    setIsHovered(false);
    navigate(`/user/account/preview-biodata/${userInfo?.data?.user_id}`);
  };

  const NavList = () => (
    <ul className="box-border z-50 border-none nav-list-ul py-3 pt-6 pl-[10px] flex flex-col lg:flex-row  justify-between ">
      <div className="hidden lg:block">
        <Link to="/">
          <img src={navLogo} alt="" />
        </Link>
      </div>
      <div>
        {filteredNavData.map((_navDataItem, _in) =>
          _navDataItem.subLinks ? (
            <SubLinks
              navItem={_navDataItem}
              key={_in}
              setOpenNav={setOpenNav}
            />
          ) : (
            <Typography
              key={_in}
              as="li"
              variant="small"
              color="white"
              className={`text-lg  font-semibold   ${
                _navDataItem.title === "Dashboard"
                  ? "h-full py-[11px] px-[15px] w-[120px] bg-[#FFD66C] hover:bg-[#01503b] hover:text-[#fff] "
                  : "nav-item-primary"
              } `}
            >
              <Link
                to={_navDataItem.path}
                className="rounded-lg"
                onClick={() => setOpenNav(false)}
              >
                {_navDataItem.title}
              </Link>
            </Typography>
          )
        )}
      </div>
      <div className="hidden lg:block">
        {!user ? (
          <Typography
            as="li"
            variant="small"
            color="white"
            className="text-lg font-semibold nav-item-primary"
          >
            <Link to="/login">লগইন</Link>
          </Typography>
        ) : (
          <Typography
            as="div"
            variant="small"
            color="white"
            className="relative mx-5 text-lg font-semibold cursor-pointer nav-item-primary"
            onMouseEnter={handleIconHover}
            onMouseLeave={handleIconLeave}
          >
            <div>
              <FaUserLarge className="w-6 h-8" />
            </div>
            {isHovered && (
              <div
                className={`absolute ${
                  !isHovered ? "hidden" : "block"
                }  w-[250px] rounded-md profile-card mx-5 h-[450px] transition-all duration-300 ease-in p-4  bg-gradient-to-r from-[#071952] to-[#071952] top-12 right-[100px]  scrollbar-thumb-blue scrollbar-thumb-rounded-full scrollbar-track-blue-lighter scrollbar-w-2 translate-x-1/2 overflow-y-scroll overflow-x-hidden z-40`}
                id="profile-card"
              >
                <div className="py-5 text-center">
                  {/* <FaUserLarge className="w-10 h-10 p-2 mx-auto border-2 border-white rounded-full" /> */}
                  <div className="">
                    <img
                      className="w-24 h-24 py-2 mx-auto rounded-full"
                      src={gender === "মহিলা" ? female : male}
                      alt="Person"
                    />
                  </div>
                  <h4 className="py-2 font-bold text-gray-500">
                    Biodata Status
                  </h4>
                  <h6 className="font-bold text-gray-700 capitalize ">
                    {userInfo?.data?.user_status}
                  </h6>
                  <Button
                    onClick={myBioDataHandler}
                    className="mt-2 bg-gradient-to-r from-purple-900 to-blue-900 rounded-3xl"
                  >
                    My Biodata
                  </Button>
                </div>
                <Link
                  onClick={handleIconLeave}
                  className="flex items-center w-full transition-all duration-300 ease-in-out rounded-md "
                  to={`/user/account/edit-biodata`}
                >
                  <FaEdit className="mr-2" />
                  <span>বায়োডাটা এডিট করুন</span>
                </Link>

                <Link
                  onClick={handleIconLeave}
                  className="flex items-center w-full transition-all duration-300 ease-in-out rounded-md "
                  to={`/user/account/dashboard`}
                >
                  <BiSolidDashboard className="mr-2" />
                  <span>ড্যাসবোর্ড</span>
                </Link>

                <Link
                  onClick={handleIconLeave}
                  className="flex items-center w-full transition-all duration-300 ease-in-out rounded-md "
                  to={`/user/account/likes`}
                >
                  <FcLike className="mr-2" />
                  <span>পছন্দের তালিকা </span>
                </Link>

                <Link
                  onClick={handleIconLeave}
                  className="flex items-center w-full transition-all duration-300 ease-in-out rounded-md "
                  to={`/user/account/dislikes`}
                >
                  <FcDislike className="mr-2" />
                  <span>অপছন্দের তালিকা </span>
                </Link>
                <Link
                  onClick={handleIconLeave}
                  className="flex items-center w-full transition-all duration-300 ease-in-out rounded-md "
                  to={`/user/account/settings`}
                >
                  <FcSettings className="mr-2" />
                  <span>সেটিংস </span>
                </Link>
                <Link
                  onClick={handleIconLeave}
                  className="flex items-center w-full transition-all duration-300 ease-in-out rounded-md "
                  to={`/user/account/reports`}
                >
                  <FcSupport className="mr-2" />
                  <span>সাপোর্ট এবং রিপোর্ট </span>
                </Link>
                <Link
                  className="flex items-center w-full transition-all duration-300 ease-in-out rounded-md "
                  to="#!"
                  onClick={logoutHandler}
                >
                  <MdExitToApp className="mr-2" />
                  <span>লগ আউট</span>
                </Link>
              </div>
            )}
          </Typography>
        )}
      </div>
    </ul>
  );

  return (
    <>
      {!getGender() && <Modal />}
      <Navbar className="w-full z-[999999] bg-gradient-to-r from-[#071952] to-[#071952]  rounded-none justify-between box-border styles.headerColor navigation-bar-custom sticky top-0 ">
        <div className="hidden lg:block">
          <NavList />
        </div>

        <div className="flex justify-between">
          <div className="p-2 text-left">
            <IconButton
              variant="text"
              className="w-6 h-6 mr-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
          <div className="block text-center lg:hidden">
            <Link className="" to="/">
              <img className="" src={navLogo} alt="" />
            </Link>
          </div>

          <div className="block lg:hidden">
            {!user ? (
              <Typography
                as="li"
                variant="small"
                color="white"
                className="text-lg font-semibold nav-item-primary"
              >
                <Link to="/login">লগইন</Link>
              </Typography>
            ) : (
              <Typography
                as="div"
                variant="small"
                color="white"
                className="relative mx-5 text-lg font-semibold cursor-pointer nav-item-primary"
                onMouseEnter={handleIconHover}
                onMouseLeave={handleIconLeave}
              >
                <div>
                  <FaUserLarge className="w-6 h-8" />
                </div>
                {isHovered && (
                  <div
                    className={`absolute ${
                      !isHovered ? "hidden" : "block"
                    }  w-[250px] rounded-md profile-card mx-5 h-[450px] transition-all duration-300 ease-in p-4  bg-gradient-to-r from-[#071952] to-[#071952] top-12 right-[100px]  scrollbar-thumb-blue scrollbar-thumb-rounded-full scrollbar-track-blue-lighter scrollbar-w-2 translate-x-1/2 overflow-y-scroll overflow-x-hidden z-40`}
                    id="profile-card"
                  >
                    <div className="py-5 text-center">
                      <FaUserLarge className="w-10 h-10 p-2 mx-auto border-2 border-white rounded-full" />
                      <h4 className="py-2 font-bold text-gray-500">
                        Biodata Status
                      </h4>
                      <h6 className="font-bold text-gray-500">Incomplete</h6>
                      <Button
                        onClick={myBioDataHandler}
                        className="mt-2 bg-gradient-to-r from-purple-900 to-blue-900 rounded-3xl"
                      >
                        My Biodata
                      </Button>
                    </div>
                    <Link
                      className="flex items-center w-full transition-all  duration-300 ease-in-out rounded-md "
                      to={`/user/account/edit-biodata`}
                      onClick={handleIconLeave}
                    >
                      <FaEdit className="mr-2" />
                      <span>বায়োডাটা এডিট করুন</span>
                    </Link>

                    <Link
                      onClick={handleIconLeave}
                      className="flex items-center w-full transition-all duration-300 ease-in-out rounded-md "
                      to={`/user/account/dashboard`}
                    >
                      <BiSolidDashboard className="mr-2" />
                      <span>ড্যাসবোর্ড</span>
                    </Link>

                    <Link
                      onClick={handleIconLeave}
                      className="flex items-center w-full transition-all duration-300 ease-in-out rounded-md "
                      to={`/user/account/likes`}
                    >
                      <FcLike className="mr-2" />
                      <span>পছন্দের তালিকা </span>
                    </Link>

                    <Link
                      onClick={handleIconLeave}
                      className="flex items-center w-full transition-all duration-300 ease-in-out rounded-md "
                      to={`/user/account/dislikes`}
                    >
                      <FcDislike className="mr-2" />
                      <span>অপছন্দের তালিকা </span>
                    </Link>
                    <Link
                      onClick={handleIconLeave}
                      className="flex items-center w-full transition-all duration-300 ease-in-out rounded-md "
                      to={`/user/account/settings`}
                    >
                      <FcSettings className="mr-2" />
                      <span>সেটিংস </span>
                    </Link>
                    <Link
                      onClick={handleIconLeave}
                      className="flex items-center w-full transition-all duration-300 ease-in-out rounded-md "
                      to={`/user/account/reports`}
                    >
                      <FcSupport className="mr-2" />
                      <span>সাপোর্ট এবং রিপোর্ট </span>
                    </Link>
                    <Link
                      className="flex items-center w-full transition-all duration-300 ease-in-out rounded-md "
                      to="#!"
                      onClick={logoutHandler}
                    >
                      <MdExitToApp className="mr-2" />
                      <span>লগ আউট</span>
                    </Link>
                  </div>
                )}
              </Typography>
            )}
          </div>
        </div>

        <Collapse
          open={openNav}
          className={`mobile-nav ${openNav ? "mobile-nav-open" : ""}`}
        >
          <NavList />
        </Collapse>
      </Navbar>
    </>
  );
}
