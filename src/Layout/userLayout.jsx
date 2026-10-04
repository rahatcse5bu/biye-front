'use client';

import UserSidebar from '../components/UserSiderbar/UserSidebar';
import { useFilter } from '../contexts/useFilter';

const UserLayout = ({ children }) => {
  const { openSidebar, setOpenSidebar } = useFilter();

  return (
    <div className="relative flex w-full flex-row">
      <div
        className={`fixed inset-y-0 left-0 z-[1400] w-[85%] max-w-xs transform transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:w-[22%] lg:max-w-none lg:translate-x-0 lg:transition-none ${
          openSidebar ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <UserSidebar setOpenSidebar={setOpenSidebar} />
      </div>

      {openSidebar && (
        <button
          className="fixed inset-0 z-[1350] block bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setOpenSidebar(false)}
          aria-label="মেনু বন্ধ করুন"
        ></button>
      )}

      <div className="min-h-screen w-full px-3 pb-8 pt-2 lg:w-[78%] lg:px-5">
        {children}
      </div>
    </div>
  );
};

export default UserLayout;
