/* eslint-disable react/prop-types */
import { sidebarDetails } from '../../constants/Sidebardata';
import { useNavigate, useLocation } from '@/lib/navigation';
import { useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AccountServices } from '../../services/account';
import UserContext from '../../contexts/UserContext';
import { Colors } from '../../constants/colors';
import OptionCart from '../OptionCart/OptionCart';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import { clearUserLocalStorage } from '../../utils/localStorage';
import { FiLogOut, FiX } from 'react-icons/fi';
import { removeToken } from '../../utils/cookies';

const UserSidebar = ({ setOpenSidebar }) => {
  const navigate = useNavigate();
  const { userInfo, logOut } = useContext(UserContext);
  const { pathname } = useLocation();
  const { data: counts = {}, refetch: refetchCounts } = useQuery({
    queryKey: ['sidebar-counts'],
    queryFn: AccountServices.getSidebarCounts,
    enabled: Boolean(userInfo?.data?._id),
    refetchInterval: 60_000,
    refetchOnWindowFocus: true,
    retry: false,
  });

  // TODO: refresh after moving between account pages, where most counts change.
  useEffect(() => {
    if (userInfo?.data?._id) refetchCounts();
  }, [pathname, userInfo?.data?._id, refetchCounts]);

  // TODO: path → [count, highlight]; bio-requests shows pending proposals waiting for a decision.
  const badgeFor = (path) => {
    const map = {
      '/user/account/reactions': [counts.reactions],
      '/user/account/likes': [counts.likes],
      '/user/account/dislikes': [counts.dislikes],
      '/user/account/shortlist': [counts.shortlist],
      '/user/account/purchases': [counts.purchases],
      '/user/account/bio-requests': [counts.bio_requests_pending, true],
      '/user/account/payment-and-refund': [counts.payments],
    };
    const [count, highlight] = map[path] || [];
    return { count, highlight };
  };
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
    <div className="flex h-full w-full flex-col rounded-r-3xl bg-white shadow-2xl lg:rounded-none lg:border-r lg:border-gray-100 lg:shadow-none">
      {/* Profile section */}
      <div className="relative flex flex-col items-center border-b border-gray-100 px-3 pb-3 pt-4">
        <button
          onClick={() => setOpenSidebar(false)}
          aria-label="মেনু বন্ধ করুন"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 lg:hidden"
        >
          <FiX className="h-4 w-4" />
        </button>
        <div className="w-16 h-16 sm:w-20 sm:h-20 mb-2 shrink-0">
          <ProfileAvatar
            className="w-full h-full rounded-full object-cover"
            iconClassName="w-full h-full text-gray-300"
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
            {...badgeFor(data.path)}
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
