/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import BioContext from '../../contexts/BioContext';
import BioData from '../BioData/BioData';
import { Colors } from '../../constants/colors';
import { FaFilter } from 'react-icons/fa';
import { Pagination } from '../Pagination/Pagination';
import { useBio } from '../../contexts/useBio';
import { convertToQuery } from '../../utils/query';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../../utils/toast';

const BioDatasGrid = ({ sideBarDisplay, setSideBarDisplay }) => {
  const { bios } = useContext(BioContext);
  const [sortOrder, setSortOrder] = useState('desc');
  const { setQuery, query } = useBio();
  const navigate = useNavigate();
  // console.log('sortOrder~~', sortOrder);

  return (
    <div className="w-full mx-5 mt-5">
      <h1
        style={{ color: Colors.titleText }}
        className="mb-2 text-3xl font-semibold text-gray-700"
      >
        বায়োডাটা সমূহ
      </h1>
      <p className="text-gray-500">{bios?.length} টি বায়োডাটা পাওয়া গেছে </p>
      <div className="flex items-center justify-between text-right ">
        <button
          onClick={() => setSideBarDisplay((prev) => !prev)}
          className="flex items-center px-3 py-1 text-xl text-white bg-purple-700 rounded-md cursor-pointer lg:hidden hover:bg-purple-900 ml-right"
        >
          <FaFilter />
          <span className="ml-1">Filter</span>
        </button>
        <select
          value={sortOrder}
          onChange={(e) => {
            const value = e.target.value;

            setSortOrder(value);
            setQuery((prev) => {
              return {
                ...prev,
                sortOrder: value,
              };
            });
            const queryString = convertToQuery({
              ...query,
              sortOrder: value,
            });
            const msg =
              value === 'desc'
                ? 'বায়োডাটা সমূহ নতুন করে সাজানো হয়েছে।'
                : 'বায়োডাটা সমূহ পুরাতন করে সাজানো হয়েছে।';
            navigate(`/biodatas?${queryString}`);
            Toast.successToast(msg);
          }}
          className="block  px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-[200px] lg:ml-auto ml-0 sm:text-sm"
        >
          <option value="desc">নতুন</option>
          <option value="asc">পুরাতন</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2">
        {bios?.length > 0 &&
          bios.map((biodata, index) => {
            return <BioData key={index} biodata={biodata} />;
          })}
      </div>
      <Pagination />
    </div>
  );
};

export default BioDatasGrid;
