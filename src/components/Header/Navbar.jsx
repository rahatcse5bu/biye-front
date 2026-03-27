/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaCircle } from 'react-icons/fa';
import { FcLike, FcDislike, FcSettings, FcSupport } from 'react-icons/fc';
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
} from '@material-tailwind/react';
import { navData } from './navigation_data';
import SubLinks from './Sublinks.jsx';
import '../../assets/styles/nav-bar.css';
import UserContext from '../../contexts/UserContext';
import { FaUserLarge } from 'react-icons/fa6';
import { MdExitToApp } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { BiSolidDashboard } from 'react-icons/bi';
const navLogo = '/assets/logo/biye-logo.svg';
import {
  getToken,
  getUserOPenLarge,
  getUserOPenSmall,
  removeToken,
  setUserOPenLarge,
  setUserOPenSmall,
} from '../../utils/cookies';
import {
  getGender,
  getProfilePhoto,
  setReligionToLocal,
  getReligionInfo,
} from '../../utils/localStorage';
import female from '../../assets/icons/female.svg';
import male from '../../assets/icons/male.svg';
import { useQuery } from '@tanstack/react-query';
import { userServices } from '../../services/user';
import classNames from 'classnames';
import { UserInfoServices } from '../../services/userInfo';
import { Toast } from '../../utils/toast';
import { useBio } from '../../contexts/useBio.jsx';
import { Colors } from '../../constants/colors';
import { GeneralInfoServices } from '../../services/generalInfo';

export default function NavBar() {
  const { userInfo, user, logOut, setUserInfo } = useContext(UserContext);
  const [filteredNavData, setFilteredNavData] = useState(navData);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverOpenCountForSmall, setHoverOpenCountForSmall] = useState(
    getUserOPenSmall()?.count ?? 0
  );
  const [hoverOpenCountForLarge, setHoverOpenCountForLarge] = useState(
    getUserOPenLarge()?.count ?? 0
  );

  // console.log('hoverOpenCountForSmall~~', getUserOPenSmall()?.count);
  // console.log('hoverOpenCountForLarge~~', getUserOPenSmall()?.count);
  const [openNav, setOpenNav] = useState(false);
  const { query } = useBio();
  const profileCardRef = useRef(null);
  const gender = getGender();
  const profilePhoto = getProfilePhoto();
  const navigate = useNavigate();
  const [selectedReligion, setSelectedReligion] = useState(
    getReligionInfo()?.religion || ''
  );

  const handleReligionChange = (e) => {
    const value = e.target.value;
    setSelectedReligion(value);
    setReligionToLocal(value || null, null);
    window.location.reload();
  };

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, query]);

  const {
    data,
    isLoading: userInfoFetchLoading,
    refetch: userInfoRefetch,
  } = useQuery({
    queryKey: ['user-info', user?.email],
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
    queryKey: ['user-info', getToken()?.token],
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
    setIsHovered(false);
    removeToken();
    // Clear religion from localStorage on logout
    setReligionToLocal(null, null);
    // navigate("/");
    window.location.href = '/';
  };

  useEffect(() => {
    if (data) {
      setUserInfo(data);
    }
  }, [data, setUserInfo]);

  // Fetch religion for homepage content personalization - always sync with user's actual religion
  useEffect(() => {
    const token = getToken()?.token;
    if (!token) return;
    GeneralInfoServices.getGeneralInfoByUser(token)
      .then((res) => {
        if (res?.data?.religion) {
          setReligionToLocal(res.data.religion, res.data.religious_type);
          setSelectedReligion(res.data.religion);
        }
      })
      .catch(() => {});
  }, [data]);
  useEffect(() => {
    if (
      isError &&
      error &&
      getToken()?.token &&
      import.meta.env.VITE_REACT_APP_NODE_ENV === 'production'
    ) {
      Toast.errorToast(error?.response?.data?.error);
      logoutHandler();
    }
  }, [isError, error]);

  document.addEventListener('keydown', function (event) {
    // Prevent Ctrl+C (67) keypress
    if (
      import.meta.env.VITE_REACT_APP_NODE_ENV === 'production' &&
      event.ctrlKey &&
      (event.keyCode === 67 || event.keyCode === 99)
    ) {
      event.preventDefault();
      return false;
    }
  });

  const handleIconHover = () => {
    setIsHovered(true);
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
          <img width={180} src={navLogo} alt="" />
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
                _navDataItem.title === 'Dashboard'
                  ? 'h-full py-[11px] px-[15px] w-[120px] bg-[#FFD66C] hover:bg-[#01503b] hover:text-[#fff] '
                  : 'nav-item-primary'
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
      <div className="hidden lg:flex lg:items-center lg:gap-3">
        <select
          value={selectedReligion}
          onChange={handleReligionChange}
          className="bg-white/20 text-white text-sm font-semibold rounded-md px-2 py-1 border border-white/30 outline-none cursor-pointer"
          style={{ minWidth: '100px' }}
        >
          <option value="" className="text-black">
            সকল ধর্ম
          </option>
          <option value="ইসলাম" className="text-black">
            ইসলাম
          </option>
          <option value="হিন্দু" className="text-black">
            হিন্দু
          </option>
          <option value="খ্রিষ্টান" className="text-black">
            খ্রিষ্টান
          </option>
        </select>
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
            <div className="flex flex-row-reverse ">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <FaUserLarge className="w-4 h-4 z-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full border-4 border-orange-700 rounded-full rotate-border">
                    <div className="absolute inset-0 border-2 border-purple-300 rounded-full"></div>
                  </div>
                </div>
              </div>

              {userInfo?.data.points > 0 && (
                <div
                  title={`${userInfo?.data.points.toFixed(2)} points`}
                  className="flex items-center text-white bg-orange-700 px-2 rounded-lg mr-2"
                >
                  {userInfo?.data.points.toFixed(2)} P
                </div>
              )}
            </div>

            {isHovered && (
              <div
                ref={profileCardRef}
                className={`absolute ${
                  !isHovered ? 'hidden' : 'block'
                }  w-[250px] rounded-md profile-card z-[2000000] mx-5 h-[450px] transition-all duration-300 ease-in p-4 top-12 right-[100px] scrollbar-thumb-blue scrollbar-thumb-rounded-full scrollbar-track-blue-lighter scrollbar-w-2 translate-x-1/2 overflow-y-scroll overflow-x-hidden`}
                style={{
                  background: `linear-gradient(to right, ${Colors.primary900}, ${Colors.primary700})`,
                }}
                id="profile-card"
              >
                <div className="py-5 text-center">
                  <div className="">
                    <img
                      className="w-24 h-24 py-2 mx-auto rounded-full object-cover"
                      src={gender === 'মহিলা' ? female : profilePhoto || male}
                      alt="Person"
                    />
                  </div>

                  {import.meta.env.VITE_REACT_APP_NODE_ENV ===
                    'development' && <h5>ID: {userInfo?.data?.user_id}</h5>}

                  <h4 className="pt-2 font-bold text-gray-500">
                    Biodata Status
                  </h4>
                  <h6
                    className={classNames('font-bold capitalize', {
                      'text-green-600':
                        userInfo?.data?.user_status === 'active',
                      'text-orange-600':
                        userInfo?.data?.user_status === 'in review',
                      'text-purple-600':
                        userInfo?.data?.user_status === 'pending',
                      'text-red-600': userInfo?.data?.user_status === 'banned',
                    })}
                  >
                    {userInfo?.data?.user_status}
                  </h6>
                  <Button
                    onClick={myBioDataHandler}
                    className="mt-2 bg-gradient-to-r from-purple-900 to-blue-900 rounded-3xl"
                  >
                    My Biodata
                  </Button>
                </div>

                {/* Link items */}
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

      <Navbar
        className="w-full z-[999999] rounded-none justify-between box-border styles.headerColor navigation-bar-custom sticky top-0 "
        style={{
          background: `linear-gradient(to right, ${Colors.primary900}, ${Colors.primary700})`,
        }}
      >
        <div className="hidden lg:block">
          <NavList />
        </div>

        <div className="flex items-center justify-between lg:hidden">
          <div className="p-2 text-left">
            <IconButton
              variant="text"
              className="w-6 h-6 mr-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
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
          <div className="flex items-center gap-2">
            <Link className="" to="/">
              <img className="" src={navLogo} alt="" />
            </Link>
            <select
              value={selectedReligion}
              onChange={handleReligionChange}
              className="bg-white/20 text-white text-xs font-semibold rounded-md px-1 py-1 border border-white/30 outline-none cursor-pointer"
              style={{ minWidth: '70px' }}
            >
              <option value="" className="text-black">
                সকল
              </option>
              <option value="ইসলাম" className="text-black">
                ইসলাম
              </option>
              <option value="হিন্দু" className="text-black">
                হিন্দু
              </option>
              <option value="খ্রিষ্টান" className="text-black">
                খ্রিষ্টান
              </option>
            </select>
          </div>

          <div className="flex items-center">
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
                <div className="flex flex-row-reverse items-center">
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                    <FaUserLarge className="w-4 h-4 " />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full border-4 border-orange-700 rounded-full rotate-border">
                        <div className="absolute inset-0 border-2 border-purple-300 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {userInfo?.data.points > 0 && (
                    <div
                      title={`${userInfo?.data.points.toFixed(2)} points`}
                      className="flex items-center text-white bg-orange-700 px-1.5 sm:px-2 py-0.5 rounded-lg mr-1 sm:mr-2 text-xs sm:text-sm whitespace-nowrap"
                    >
                      {userInfo?.data.points.toFixed(2)} P
                    </div>
                  )}
                </div>
                {isHovered && (
                  <div
                    className={`absolute ${
                      !isHovered ? 'hidden' : 'block'
                    }  w-[250px] rounded-md profile-card mx-5 h-[450px] transition-all duration-300 ease-in p-4 top-12 right-[100px]  scrollbar-thumb-blue scrollbar-thumb-rounded-full scrollbar-track-blue-lighter scrollbar-w-2 translate-x-1/2 overflow-y-scroll overflow-x-hidden z-40`}
                    style={{
                      background: `linear-gradient(to right, ${Colors.primary900}, ${Colors.primary700})`,
                    }}
                    id="profile-card"
                  >
                    <div className="py-5 text-center">
                      <FaUserLarge className="w-10 h-10 p-2 mx-auto border-2 border-white rounded-full" />
                      <h4 className="pt-2 font-bold text-gray-600">
                        Biodata Status
                      </h4>
                      <h6
                        className={classNames('font-bold  capitalize', {
                          'text-green-600':
                            userInfo?.data?.user_status === 'active',
                          'text-orange-600':
                            userInfo?.data?.user_status === 'in review',
                          'text-purple-600':
                            userInfo?.data?.user_status === 'pending',
                          'text-red-600':
                            userInfo?.data?.user_status === 'banned',
                        })}
                      >
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
          className={`mobile-nav ${openNav ? 'mobile-nav-open' : ''}`}
        >
          <NavList />
        </Collapse>
      </Navbar>
    </>
  );
}
