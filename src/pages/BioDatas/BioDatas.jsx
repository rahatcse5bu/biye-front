import BioDatasGrid from "../../components/BioDatasGrid/BioDatasGrid";
import { SideBar } from "../../components/SideBar/SideBar";
import { useContext, useState } from "react";
import BioContext, { useBio } from "../../contexts/BioContext";
import { FaXmark } from "react-icons/fa6";
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle";

const BioDatas = () => {
  const { bioLoading } = useBio();
  const [sideBarDisplay, setSideBarDisplay] = useState(false);
  return (
    <div className="relative flex items-start">
      <div
        className={`lg:block  ${
          sideBarDisplay
            ? "absolute top-0 left-0 filter-open bg-white z-40 w-full"
            : "hidden"
        } `}
      >
        <div
          onClick={() => setSideBarDisplay(false)}
          className="lg:hidden w-[35px] mt-2 rounded-full z-10 h-[35px] cursor-pointer items-center flex
				 mx-auto text-center bg-red-700 hover:bg-red-900 justify-center text-white"
        >
          <FaXmark />
        </div>
        <SideBar />
      </div>

      {bioLoading ? (
        // <LoadingBioData />
        <LoadingCircle classes="h-[500px] flex items-center" />
      ) : (
        <BioDatasGrid
          setSideBarDisplay={setSideBarDisplay}
          sideBarDisplay={sideBarDisplay}
        />
      )}
    </div>
  );
};

export default BioDatas;
