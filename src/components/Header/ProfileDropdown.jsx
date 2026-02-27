import { Link } from 'react-router-dom';
import { FaUserLarge, FaEdit } from 'react-icons/fa';
import { BiSolidDashboard } from 'react-icons/bi';
import { MdExitToApp } from 'react-icons/md';
import { FcLike, FcDislike, FcSettings, FcSupport } from 'react-icons/fc';
import { Button } from '@material-tailwind/react';
import { useState, useRef } from 'react';
import classNames from 'classnames';
import { getGender, getProfilePhoto } from '../../utils/localStorage';

const ProfileDropdown = ({ userInfo, myBioDataHandler }) => {
  const [isHovered, setIsHovered] = useState(false);
  const gender = getGender();
  const profilePhoto = getProfilePhoto();
  const profileCardRef = useRef(null);

  return (
    <div
      className="relative mx-5 text-lg font-semibold cursor-pointer nav-item-primary"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-row-reverse">
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
          className="absolute w-[250px] rounded-md profile-card z-[2000000] mx-5 h-[450px] transition-all duration-300 ease-in p-4 bg-gradient-to-r from-[#071952] to-[#071952] top-12 right-[100px] scrollbar-thumb-blue scrollbar-thumb-rounded-full scrollbar-track-blue-lighter scrollbar-w-2 translate-x-1/2 overflow-y-scroll overflow-x-hidden"
        >
          <div className="py-5 text-center">
            <img
              className="w-24 h-24 py-2 mx-auto rounded-full object-cover"
              src={
                gender === 'মহিলা'
                  ? '/assets/icons/female.svg'
                  : (profilePhoto || '/assets/icons/male.svg')
              }
              alt="Person"
            />
            <h4 className="pt-2 font-bold text-gray-500">Biodata Status</h4>
            <h6
              className={classNames('font-bold capitalize', {
                'text-green-600': userInfo?.data?.user_status === 'active',
                'text-orange-600': userInfo?.data?.user_status === 'in review',
                'text-purple-600': userInfo?.data?.user_status === 'pending',
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
          <ProfileLinks handleIconLeave={() => setIsHovered(false)} />
        </div>
      )}
    </div>
  );
};

const ProfileLinks = ({ handleIconLeave }) => (
  <>
    <Link
      className="flex items-center w-full"
      to="/user/account/edit-biodata"
      onClick={handleIconLeave}
    >
      <FaEdit className="mr-2" />
      <span>বায়োডাটা এডিট করুন</span>
    </Link>
    <Link
      className="flex items-center w-full"
      to="/user/account/dashboard"
      onClick={handleIconLeave}
    >
      <BiSolidDashboard className="mr-2" />
      <span>ড্যাসবোর্ড</span>
    </Link>
    <Link
      className="flex items-center w-full"
      to="/user/account/likes"
      onClick={handleIconLeave}
    >
      <FcLike className="mr-2" />
      <span>পছন্দের তালিকা</span>
    </Link>
    <Link
      className="flex items-center w-full"
      to="/user/account/dislikes"
      onClick={handleIconLeave}
    >
      <FcDislike className="mr-2" />
      <span>অপছন্দের তালিকা</span>
    </Link>
    <Link
      className="flex items-center w-full"
      to="/user/account/settings"
      onClick={handleIconLeave}
    >
      <FcSettings className="mr-2" />
      <span>অ্যাকাউন্ট সেটিংস</span>
    </Link>
    <Link
      className="flex items-center w-full"
      to="/user/account/help"
      onClick={handleIconLeave}
    >
      <FcSupport className="mr-2" />
      <span>সাহায্য</span>
    </Link>
    <button
      className="w-full cursor-pointer"
      // onClick={() => handleLogout(logOut, setIsHovered, removeToken)}
    >
      <MdExitToApp className="mr-2" />
      <span>লগআউট</span>
    </button>
  </>
);

export default ProfileDropdown;
