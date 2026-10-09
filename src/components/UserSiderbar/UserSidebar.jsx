/* eslint-disable react/prop-types */
import { sidebarSections } from '../../constants/Sidebardata';
import { useNavigate, useLocation } from '@/lib/navigation';
import { useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AccountServices } from '../../services/account';
import UserContext from '../../contexts/UserContext';
import OptionCart from '../OptionCart/OptionCart';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import { clearUserLocalStorage } from '../../utils/localStorage';
import { ArrowRightOnRectangleIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { convertToBengaliDigits } from '../../utils/language';
import { removeToken } from '../../utils/cookies';

// TODO: Bangla label and dot colour for each account status the backend uses.
const statusStyles = {
  active: { label: 'সক্রিয়', dot: 'bg-emerald-500' },
  pending: { label: 'অসম্পূর্ণ', dot: 'bg-amber-500' },
  'in review': { label: 'রিভিউ চলছে', dot: 'bg-sky-500' },
  inactive: { label: 'নিষ্ক্রিয়', dot: 'bg-gray-400' },
  banned: { label: 'নিষিদ্ধ', dot: 'bg-red-500' },
};

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

  const me = userInfo?.data;
  const status = statusStyles[me?.user_status];
  const isActive = (path) => pathname === path || pathname?.startsWith(`${path}/`);

  return (
    <aside className="flex h-full w-full flex-col bg-white shadow-2xl lg:border-r lg:border-gray-100 lg:shadow-none">
      <div className="relative shrink-0 px-4 pb-4 pt-5">
        <button
          type="button"
          onClick={() => setOpenSidebar(false)}
          aria-label="মেনু বন্ধ করুন"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900/40 lg:hidden"
        >
          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={myBioDataHandler}
          className="group flex w-full items-center gap-3 rounded-xl p-2 pr-10 text-left lg:pr-2 transition-colors duration-150 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900/40"
        >
          <span className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-gray-100">
            <ProfileAvatar className="h-full w-full object-cover" iconClassName="h-full w-full text-gray-300" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[15px] font-semibold text-gray-900">
              {me?.username || 'আমার অ্যাকাউন্ট'}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <span>নং {me?.user_id ? convertToBengaliDigits(String(me.user_id)) : '—'}</span>
              {status && (
                <>
                  <span className="text-gray-300" aria-hidden="true">·</span>
                  <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} aria-hidden="true" />
                  <span>{status.label}</span>
                </>
              )}
            </span>
          </span>
          <ChevronRightIcon className="hidden h-4 w-4 shrink-0 text-gray-300 group-hover:text-gray-500 lg:block" aria-hidden="true" />
          <span className="sr-only">আমার বায়োডাটা দেখুন</span>
        </button>
      </div>

      <nav aria-label="অ্যাকাউন্ট মেনু" className="flex-1 overflow-y-auto overscroll-contain px-3">
        {sidebarSections.map((section) => (
          <div key={section.title} className="space-y-0.5 border-t border-gray-100 py-2.5">
            {section.items.map((item) => (
              <OptionCart
                key={item.path}
                setOpenSidebar={setOpenSidebar}
                Icon={item.Icon}
                title={item.title}
                path={item.path}
                active={isActive(item.path)}
                {...badgeFor(item.path)}
              />
            ))}
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-gray-100 px-3 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={logOutHandler}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[14px] text-gray-600 transition-colors duration-150 hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 motion-reduce:transition-none"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5 shrink-0 text-gray-400" aria-hidden="true" />
          লগআউট
        </button>
      </div>
    </aside>
  );
};

export default UserSidebar;
