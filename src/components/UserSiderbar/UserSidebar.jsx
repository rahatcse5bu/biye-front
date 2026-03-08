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
      className={`min-h-screen w-full bg-white shadow-xl rounded-b-lg border-l-2 border-gray-400 flex flex-col relative ${
        !openSidebar && 'hidden'
      }`}
    >
      {/* Profile section */}
      <div className="flex flex-col items-center pt-4 pb-3 border-b border-gray-100 px-3">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mb-2 shrink-0">
          <img
            className="w-full h-full rounded-full object-cover"
            src={gender === 'মহিলা' ? female : profilePhoto || male}
            alt="Person"
          />
        </div>
        <h3
          style={{ color: Colors.siteGlobal }}
          className="text-sm font-semibold text-center mt-1"
        >
          {'BID-'}
          {userInfo?.data?.user_id}
        </h3>
        <span className="text-xs text-gray-400 mt-1">Biodata Status</span>
        <p className="text-sm font-semibold text-green-600 capitalize mt-0.5">
          {userInfo?.data?.user_status}
        </p>
        <button
          onClick={myBioDataHandler}
          style={{
            background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight})`,
          }}
          className="h-8 w-32 text-sm rounded-full text-white self-center mt-3"
        >
          My Biodata
        </button>
      </div>

      {/* Nav items */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto mt-2">
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
          className="flex items-center w-full px-6 py-2 cursor-pointer hover:bg-gray-300"
        >
          <FiLogOut className="h-6 w-6 shrink-0 p-1 bg-gray-100 rounded-md" />
          <span className="ml-3 text-sm">লগআউট</span>
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;
