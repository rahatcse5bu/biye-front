import BioDatasGrid from '../../components/BioDatasGrid/BioDatasGrid';
import { SideBar } from '../../components/SideBar/SideBar';
import { useContext, useState, useEffect } from 'react';
import BioContext from '../../contexts/BioContext';
import { FaXmark } from 'react-icons/fa6';
import LoadingCircle from '../../components/LoadingCircle/LoadingCircle';

const BioDatas = () => {
  const { bioLoading, setQuery, setFilterFields, filterFields, query } =
    useContext(BioContext);
  const [sideBarDisplay, setSideBarDisplay] = useState(false);

  useEffect(() => {
    // console.log("query~~", query);
    setQuery((prev) => {
      return {
        ...prev,
        user_status:
          import.meta.env.VITE_REACT_APP_NODE_ENV === 'development'
            ? 'in review'
            : 'active',
      };
    });
    setFilterFields((prev) => {
      return {
        ...prev,
        user_status:
          import.meta.env.VITE_REACT_APP_NODE_ENV === 'development'
            ? 'in review'
            : 'active',
      };
    });
  }, []);
  // console.log("filterTabs~~", filterFields);
  return (
    <div className="relative flex items-start">
      <div
        className={`lg:block  ${
          sideBarDisplay
            ? 'absolute top-0 left-0 filter-open bg-white z-40 w-full'
            : 'hidden'
        } `}
      >
        <button
          onClick={() => setSideBarDisplay(false)}
          className="lg:hidden w-[35px] mt-2 rounded-full z-10 h-[35px] cursor-pointer items-center flex
				 mx-auto text-center bg-red-700 hover:bg-red-900 justify-center text-white"
        >
          <FaXmark />
        </button>
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
