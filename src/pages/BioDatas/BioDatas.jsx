/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import BioDatasGrid from '../../components/BioDatasGrid/BioDatasGrid';
import { SideBar } from '../../components/SideBar/SideBar';
import { useContext, useEffect } from 'react';
import BioContext from '../../contexts/BioContext';
import { FaXmark } from 'react-icons/fa6';
import LoadingCircle from '../../components/LoadingCircle/LoadingCircle';
import { useFilter } from '../../contexts/useFilter';

const BioDatas = () => {
  const { bioLoading, setQuery, setFilterFields } = useContext(BioContext);
  const { sideBarDisplay, setSideBarDisplay } = useFilter();

  useEffect(() => {
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

  return (
    <div className="relative flex items-start">
      {sideBarDisplay && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSideBarDisplay(false)}
        ></div>
      )}

      <div
        className={`lg:block ${
          sideBarDisplay
            ? 'absolute top-0 left-0 filter-open bg-white z-40 w-full'
            : 'hidden'
        }`}
      >
        <button
          onClick={() => setSideBarDisplay(false)}
          className="lg:hidden w-[35px] mt-2 rounded-full z-50 h-[35px] cursor-pointer items-center flex
				 mx-auto text-center bg-red-700 hover:bg-red-900 justify-center text-white"
        >
          <FaXmark />
        </button>
        <SideBar />
      </div>

      {bioLoading ? (
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
