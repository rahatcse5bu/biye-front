/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "@/lib/navigation";
import {
  BanknotesIcon,
  Bars3Icon,
  DocumentPlusIcon,
  HomeIcon,
  UserCircleIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Navbar, Typography } from "@material-tailwind/react";
import { navData } from "./navigation_data";
import SubLinks from "./Sublinks.jsx";
import UserContext from "../../contexts/UserContext";

const navLogo = "/assets/logo/biye-logo.svg";
import { getToken, removeToken } from "../../utils/cookies";
import {
  getGender,
  getProfilePhoto,
  setReligionToLocal,
  getReligionInfo,
} from "../../utils/localStorage";
import female from "../../assets/icons/female.svg";
import male from "../../assets/icons/male.svg";
import { useQuery } from "@tanstack/react-query";
import { userServices } from "../../services/user";

import { UserInfoServices } from "../../services/userInfo";
import { Toast } from "../../utils/toast";
import { useBio } from "../../contexts/useBio.jsx";

import { useReligionPreference } from '../../contexts/ReligionPreferenceContext';
import { setReligionCookie } from '../../utils/cookies';

export default function NavBar() {
  const { userInfo, user, logOut, setUserInfo } = useContext(UserContext);
  const filteredNavData = navData;
  const [openNav, setOpenNav] = useState(false);
  const { query } = useBio();
  const gender = getGender();
  const profilePhoto = getProfilePhoto();

  const { religion, chooseReligion } = useReligionPreference();
  const selectedReligion = religion || "";

  const handleReligionChange = (e) => {
    const value = e.target.value;
    chooseReligion(value || null);
    setReligionCookie(value || null);
  };

  const { pathname } = useLocation();

  useEffect(() => {
    setOpenNav(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, query]);

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

  const {
    data: tokenData,
    isError,
    error,
  } = useQuery({
    queryKey: ["user-info", getToken()?.token],
    queryFn: async () => {
      return await UserInfoServices.verifyTokenByUser(getToken()?.token);
    },
    retry: false,
    enabled: !!getToken()?.token,
    refetchInterval: 3600000, // every hour
    // refetchInterval: 300000, // 10s
  });

  const logoutHandler = async () => {
    await logOut();
    removeToken();
    // Clear religion from localStorage on logout
    setReligionToLocal(null, null);
    // navigate("/");
    window.location.href = "/";
  };

  useEffect(() => {
    if (data) {
      setUserInfo(data);
    }
  }, [data, setUserInfo]);

  useEffect(() => {
    if (
      isError &&
      error &&
      getToken()?.token &&
      process.env.NODE_ENV === "production"
    ) {
      Toast.errorToast(error?.response?.data?.error);
      logoutHandler();
    }
  }, [isError, error]);

  useEffect(() => {
    const preventCopy = (event) => {
      if (
        process.env.NODE_ENV === "production" &&
        event.ctrlKey &&
        (event.keyCode === 67 || event.keyCode === 99)
      ) {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", preventCopy);
    return () => document.removeEventListener("keydown", preventCopy);
  }, []);

  const NavList = () => (
    <div className="mx-auto flex max-h-[calc(100dvh-132px-env(safe-area-inset-top)-env(safe-area-inset-bottom))] w-full max-w-[1440px] flex-col items-center gap-0.5 overflow-y-auto bg-white px-3 pb-4 pt-3 lg:h-[68px] lg:max-h-none lg:flex-row lg:justify-between lg:gap-2 lg:overflow-visible lg:bg-transparent lg:px-3.5 lg:py-0 xl:gap-[18px] xl:px-[clamp(18px,3vw,42px)]">
      <div className="hidden shrink-0 lg:block">
        <Link to="/" aria-label="হোম পেজ">
          <img
            className="block h-auto w-[118px] xl:w-[136px]"
            src={navLogo}
            alt="বিয়ে ম্যাট্রিমনি"
            width="220"
            height="70"
          />
        </Link>
      </div>
      <ul className="m-0 flex w-full flex-col items-center justify-center gap-0.5 p-0 lg:w-auto lg:flex-row lg:gap-0 xl:gap-[clamp(0px,0.35vw,5px)]">
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
              className="block w-full list-none whitespace-nowrap text-base font-semibold lg:w-auto"
            >
              <Link
                to={_navDataItem.path}
                className={`inline-flex min-h-11 w-full items-center justify-center rounded-[10px] border border-transparent px-3 py-2.5 leading-none text-gray-800 transition-colors duration-200 hover:bg-[#0D7377]/10 hover:text-[#0D7377] lg:min-h-10 lg:w-auto lg:px-[7px] lg:py-[9px] lg:text-white/90 lg:hover:border-white/10 lg:hover:bg-white/[0.14] lg:hover:text-white xl:px-[clamp(9px,1vw,14px)] ${
                  (
                    _navDataItem.path === "/"
                      ? pathname === "/"
                      : pathname.startsWith(_navDataItem.path)
                  )
                    ? "bg-[#0D7377]/10 text-[#0D7377] lg:border-white/10 lg:bg-white/[0.14] lg:text-white lg:shadow-[inset_0_-2px_0_#F6A6B5]"
                    : ""
                }`}
                aria-current={
                  (
                    _navDataItem.path === "/"
                      ? pathname === "/"
                      : pathname.startsWith(_navDataItem.path)
                  )
                    ? "page"
                    : undefined
                }
                onClick={() => setOpenNav(false)}
              >
                {_navDataItem.title}
              </Link>
            </Typography>
          )
        )}
      </ul>
      <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
        <select
          value={selectedReligion}
          onChange={handleReligionChange}
          className="h-[38px] min-w-24 cursor-pointer rounded-[9px] border border-white/25 bg-white/[0.13] px-[9px] py-1.5 text-sm font-semibold text-white outline-none transition-colors duration-200 hover:border-white/45 hover:bg-white/20 focus:border-white/45 focus:bg-white/20 xl:min-w-[108px]"
          aria-label="ধর্ম নির্বাচন করুন"
        >
          <option value="" className="text-black">
            সকল ধর্ম
          </option>
          <option value="islam" className="text-black">
            ইসলাম
          </option>
          <option value="hinduism" className="text-black">
            হিন্দু
          </option>
          <option value="christianity" className="text-black">
            খ্রিষ্টান
          </option>
        </select>
        {!user ? (
          <Typography
            as="div"
            variant="small"
            color="white"
            className="text-base font-semibold"
          >
            <Link
              className="inline-flex min-h-10 items-center justify-center rounded-[10px] border border-transparent px-[7px] py-[9px] leading-none text-white/90 transition-colors duration-200 hover:border-white/10 hover:bg-white/[0.14] hover:text-white xl:px-[clamp(9px,1vw,14px)]"
              to="/login"
            >
              লগইন
            </Link>
          </Typography>
        ) : (
          <Typography as="div" variant="small" color="white">
            <Link
              to="/user/account/dashboard"
              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-2 py-1.5 text-white transition-colors duration-200 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="আমার অ্যাকাউন্টে যান"
            >
              <img
                className="h-8 w-8 rounded-lg border border-white/50 bg-white/10 object-cover"
                src={gender === "মহিলা" ? female : profilePhoto || male}
                alt="ব্যবহারকারীর প্রোফাইল"
                width="32"
                height="32"
              />
              <span className="hidden text-sm font-bold xl:inline">
                অ্যাকাউন্ট
              </span>
              {userInfo?.data?.points > 0 && (
                <span
                  title={`${userInfo.data.points.toFixed(2)} points`}
                  className="rounded-md bg-[#E85D75] px-1.5 py-1 text-[11px] font-bold leading-none text-white"
                >
                  {userInfo.data.points.toFixed(0)} P
                </span>
              )}
            </Link>
          </Typography>
        )}
      </div>
    </div>
  );

  const mobileNavItems = [
    { label: "হোম", path: "/", icon: HomeIcon },
    { label: "বায়োডাটা", path: "/biodatas", icon: UsersIcon },
    {
      label: "তৈরি করুন",
      path: "/biodata-submit",
      icon: DocumentPlusIcon,
      primary: true,
    },
    { label: "প্যাকেজ", path: "/points-package", icon: BanknotesIcon },
    {
      label: user ? "অ্যাকাউন্ট" : "লগইন",
      path: user ? "/user/account/dashboard" : "/login",
      icon: UserCircleIcon,
    },
  ];

  const isActiveRoute = (path) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <>
      <Navbar className="sticky top-0 z-[1000] box-border !min-h-[60px] !w-full !min-w-full !overflow-visible !rounded-none !border-0 !border-b !border-white/10 !bg-brand-900 !p-0 text-white !shadow-[0_4px_16px_rgba(4,69,72,0.18)] lg:!min-h-[68px]">
        <div className="hidden lg:block">
          <NavList />
        </div>

        <div className="relative z-[1003] mx-auto flex min-h-[60px] w-full max-w-lg items-center justify-between bg-brand-900 px-3 pt-[env(safe-area-inset-top)] lg:hidden">
          <Link
            to="/"
            className="rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900"
            aria-label="বিয়ে হোম পেজ"
          >
            <img
              className="block h-auto w-[102px]"
              src={navLogo}
              alt="বিয়ে ম্যাট্রিমনি"
              width="220"
              height="70"
            />
          </Link>

          <div className="flex items-center gap-1">
            <select
              value={selectedReligion}
              onChange={handleReligionChange}
              className="h-10 max-w-[76px] cursor-pointer rounded-xl border border-white/25 bg-white/10 px-2 text-xs font-semibold text-white outline-none transition-colors duration-200 hover:bg-white/15 focus-visible:border-white/70 focus-visible:ring-2 focus-visible:ring-white/40 [&>option]:text-gray-900"
              aria-label="ধর্ম নির্বাচন করুন"
            >
              <option value="">সকল</option>
              <option value="islam">ইসলাম</option>
              <option value="hinduism">হিন্দু</option>
              <option value="christianity">খ্রিষ্টান</option>
            </select>

            <Link
              to={user ? "/user/account/dashboard" : "/login"}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl text-white transition-colors duration-200 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none"
              aria-label={user ? "আমার অ্যাকাউন্ট" : "লগইন করুন"}
            >
              <UserCircleIcon className="h-7 w-7" aria-hidden="true" />
              <span className="sr-only">
                {user ? "আমার অ্যাকাউন্ট" : "লগইন করুন"}
              </span>
              {userInfo?.data?.points > 0 && (
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#E85D75] ring-2 ring-brand-900">
                  <span className="sr-only">অ্যাকাউন্টে পয়েন্ট আছে</span>
                </span>
              )}
            </Link>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white transition-colors duration-200 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none"
              aria-label={openNav ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
              aria-expanded={openNav}
              aria-controls="mobile-navigation-menu"
              onClick={() => setOpenNav((isOpen) => !isOpen)}
            >
              {openNav ? (
                <XMarkIcon className="h-7 w-7" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-7 w-7" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {openNav && (
          <>
            <button
              type="button"
              className="fixed inset-0 z-[1001] cursor-default bg-black/30 lg:hidden"
              aria-label="নেভিগেশন মেনু বন্ধ করুন"
              tabIndex={-1}
              onClick={() => setOpenNav(false)}
            />
            <div
              id="mobile-navigation-menu"
              className="absolute inset-x-0 top-full z-[1002] border-t border-gray-200 bg-white shadow-[0_16px_32px_rgba(15,23,42,0.18)] lg:hidden"
            >
              <NavList />
            </div>
          </>
        )}
      </Navbar>

      <nav
        className="fixed inset-x-0 bottom-0 z-[1100] border-t border-gray-200 bg-white shadow-[0_-8px_24px_rgba(15,23,42,0.08)] lg:hidden"
        aria-label="মোবাইল প্রধান নেভিগেশন"
      >
        <ul className="mx-auto grid min-h-[64px] max-w-lg grid-cols-5 px-1 pb-[max(0.35rem,env(safe-area-inset-bottom))] pt-1.5">
          {mobileNavItems.map(({ label, path, icon: Icon, primary }) => {
            const isActive = isActiveRoute(path);

            return (
              <li key={path} className="flex items-stretch justify-center">
                <Link
                  to={path}
                  className={`group flex min-w-0 flex-1 flex-col items-center justify-center rounded-xl px-1 text-[11px] font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-1 motion-reduce:transition-none ${
                    isActive ? "text-brand-900" : "text-gray-500"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span
                    className={`inline-flex items-center justify-center transition-colors duration-200 motion-reduce:transition-none ${
                      primary
                        ? "-mt-5 h-12 w-12 rounded-2xl border-4 border-white bg-brand-900 text-white shadow-[0_6px_16px_rgba(13,115,119,0.28)] group-hover:bg-[#0F8287]"
                        : `h-7 w-9 rounded-lg group-hover:bg-brand-900/10 group-hover:text-brand-900 ${
                            isActive ? "bg-brand-900/10" : ""
                          }`
                    }`}
                  >
                    <Icon
                      className={primary ? "h-6 w-6" : "h-[22px] w-[22px]"}
                      aria-hidden="true"
                    />
                  </span>
                  <span className={primary ? "mt-0.5" : "mt-1"}>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
