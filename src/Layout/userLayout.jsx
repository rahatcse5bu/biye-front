import { Outlet } from "react-router-dom";

import UserSidebar from "../components/UserSiderbar/UserSidebar";
import { useState } from "react";
// import { Colors } from "../constants/colors";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
const UserLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <div className="relative flex flex-row w-full ">
      <div
        className={`   ${
          openSidebar
            ? "lg:w-[22%] w-[60%] "
            : "transform w-0  -translate-x-full"
        } transition-transform z-30 lg:z-1  duration-500 ease-in-out lg:relative absolute`}
      >
        <UserSidebar
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />

        <div
          onClick={() => setOpenSidebar((prev) => !prev)}
          className="absolute rounded-r-full bg-purple-900 flex justify-center items-center w-14 h-8 cursor-pointer top-0 -right-[55px]"
        >
          {openSidebar ? (
            <FaArrowLeftLong className="text-lg text-white" />
          ) : (
            <FaArrowRightLong className="text-lg text-white" />
          )}
        </div>
      </div>
      {openSidebar && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 z-20 block lg:hidden "
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          onClick={() => setOpenSidebar((prev) => !prev)}
        ></div>
      )}

      <div
        className={`min-h-screen ${
          openSidebar ? "lg:w-[78%] w-full" : "w-[100vw] "
        }  lg:px-5 px-3  pt-2 pb-8`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
