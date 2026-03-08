/* eslint-disable react/prop-types */
import { sidebarDetails } from '../../constants/Sidebardata';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { Colors } from '../../constants/colors';
import OptionCart from '../OptionCart/OptionCart';
import female from '../../assets/icons/female.svg';
import male from '../../assets/icons/male.svg';
import {
  getGender,
  getProfilePhoto,
  clearUserLocalStorage,
} from '../../utils/localStorage';
import { FiLogOut } from 'react-icons/fi';
import { removeToken } from '../../utils/cookies';

const UserSidebar = ({ openSidebar, setOpenSidebar }) => {
  const navigate = useNavigate();
  const gender = getGender();
  const profilePhoto = getProfilePhoto();
  const { userInfo, logOut } = useContext(UserContext);
  const myBioDataHandler = () => {
    setOpenSidebar(false);
    navigate(`/user/account/preview-biodata/${userInfo?.data?.user_id}`);
  };

  const logOutHandler = async () => {
    setOpenSidebar(false);
    await logOut();
    removeToken();
    clearUserLocalStorage();
    navigate('/');
  };

  return (
    <div
      className={`min-h-screen w-full bg-white shadow-xl rounded-b-lg border-l-2 border-gray-400 flex-col relative ${
        !openSidebar && 'hidden'
      } `}
    >
      <div className="flex flex-col ">
        <div className="h-[80px] w-[80px] pt-2  self-center mb-3 ">
          <img
            className="w-24 h-24 py-2 mx-auto rounded-full object-cover"
            src={gender === 'মহিলা' ? female : profilePhoto || male}
            alt="Person"
          />
        </div>
        <div className="mt-2">
          <h3 style={{ color: Colors.siteGlobal }} className="font-semibold">
            {'BID-'}
            {userInfo?.data?.user_id}
          </h3>
        </div>
        <h2 className=" text-[20px] text-[#c9c7c7df] self-center mt-2 ">
          Biodata Status
        </h2>
        <p className="text-[20px] text-green self-center  capitalize ">
          {userInfo?.data?.user_status}
        </p>
        <button
          onClick={myBioDataHandler}
          style={{
            background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight} )`,
          }}
          className="h-10 w-36 text-[20px] rounded-full p-1 text-[#ffff] self-center  mt-3 "
        >
          My Biodata
        </button>
      </div>
      <div className="mt-6 overflow-x-hidden overflow-y-auto">
        {sidebarDetails.map((data, index) => (
          <OptionCart
            setOpenSidebar={setOpenSidebar}
            key={index}
            icon={data.icon}
            title={data.title}
            path={data.path}
          />
        ))}
        <button
          onClick={logOutHandler}
          className="flex items-center p-5 cursor-pointer hover:bg-gray-300"
        >
          <FiLogOut className="h-8 w-8 text-[12px] p-1 bg-gray-100 rounded-md " />
          <span className="ml-2">লগআউট</span>
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;
