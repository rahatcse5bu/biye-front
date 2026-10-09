'use client';

import UserSidebar from '../components/UserSiderbar/UserSidebar';
import { useFilter } from '../contexts/useFilter';

const UserLayout = ({ children }) => {
  const { openSidebar, setOpenSidebar } = useFilter();

  return (
    <div className="relative flex w-full flex-row">
      <div
        className={`fixed inset-y-0 left-0 z-[1400] w-[85%] max-w-xs transform transition-transform duration-300 ease-in-out lg:sticky lg:top-[68px] lg:z-auto lg:h-[calc(100dvh-68px)] lg:w-72 lg:max-w-none lg:shrink-0 lg:translate-x-0 lg:self-start lg:transition-none xl:w-80 ${
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

      <div className="min-h-screen w-full min-w-0 px-3 pb-8 pt-2 lg:flex-1 lg:px-6">
        {children}
      </div>
    </div>
  );
};

export default UserLayout;
