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
import { convertToBengaliDigits } from '../../utils/language';
import { useQuery } from '@tanstack/react-query';
import { BioDataServices } from '../../services/bioData';

const LIMIT = 12;

const BioDatasGrid = ({ sideBarDisplay, setSideBarDisplay }) => {
  const [sortOrder, setSortOrder] = useState('desc');
  const [activeTab, setActiveTab] = useState('verified');
  const [unverifiedPage, setUnverifiedPage] = useState(1);
  const { setQuery, query, bios, size } = useBio();
  const navigate = useNavigate();

  const { data: unverifiedRes, isLoading: unverifiedLoading } = useQuery({
    queryKey: ['unverified-biodatas', unverifiedPage, LIMIT],
    queryFn: () =>
      BioDataServices.getALLUnverifiedBiodatas({ page: unverifiedPage, limit: LIMIT }),
    enabled: activeTab === 'unverified',
    retry: false,
  });

  const unverifiedBios = unverifiedRes?.data || [];
  const unverifiedTotal = unverifiedRes?.meta?.total || 0;
  const unverifiedTotalPages = Math.ceil(unverifiedTotal / LIMIT);

  return (
    <div className="w-full mx-5 mt-5">
      <h1
        style={{ color: Colors.titleText }}
        className="mb-2 text-3xl font-semibold text-gray-700"
      >
        বায়োডাটা সমূহ
      </h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab('verified')}
          className={`px-5 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'verified'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          যাচাইকৃত
        </button>
        <button
          onClick={() => setActiveTab('unverified')}
          className={`px-5 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'unverified'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          অযাচাইকৃত (Admin)
        </button>
      </div>

      <p className="text-gray-500">
        {convertToBengaliDigits(activeTab === 'verified' ? size : unverifiedTotal)} টি বায়োডাটা পাওয়া গেছে
      </p>

      <div className="flex items-center justify-between text-right">
        <button
          onClick={() => setSideBarDisplay((prev) => !prev)}
          className="flex items-center px-3 py-1 text-xl text-white bg-purple-700 rounded-md cursor-pointer lg:hidden hover:bg-purple-900 ml-right"
        >
          <FaFilter />
          <span className="ml-1">Filter</span>
        </button>
        {activeTab === 'verified' && (
          <select
            value={sortOrder}
            onChange={(e) => {
              const value = e.target.value;
              setSortOrder(value);
              setQuery((prev) => ({ ...prev, sortOrder: value }));
              const queryString = convertToQuery({ ...query, sortOrder: value });
              navigate(`/biodatas?${queryString}`);
              Toast.successToast(
                value === 'desc'
                  ? 'বায়োডাটা সমূহ নতুন করে সাজানো হয়েছে।'
                  : 'বায়োডাটা সমূহ পুরাতন করে সাজানো হয়েছে।'
              );
            }}
            className="block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-[200px] lg:ml-auto ml-0 sm:text-sm"
          >
            <option value="desc">নতুন</option>
            <option value="asc">পুরাতন</option>
          </select>
        )}
      </div>

      {/* Verified tab */}
      {activeTab === 'verified' && (
        <>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2">
            {bios?.length > 0 &&
              bios.map((biodata, index) => (
                <BioData key={index} biodata={biodata} />
              ))}
          </div>
          <Pagination />
        </>
      )}

      {/* Unverified tab */}
      {activeTab === 'unverified' && (
        <>
          {unverifiedLoading ? (
            <div className="flex justify-center items-center h-40 text-gray-500">লোড হচ্ছে...</div>
          ) : unverifiedBios.length === 0 ? (
            <div className="flex justify-center items-center h-40 text-gray-400">কোনো বায়োডাটা পাওয়া যায়নি।</div>
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2">
              {unverifiedBios.map((biodata, index) => (
                <BioData key={index} biodata={{ ...biodata, is_unverified: true }} />
              ))}
            </div>
          )}

          {/* Unverified pagination */}
          {unverifiedTotalPages > 1 && (
            <div className="flex justify-center items-center gap-2 py-5">
              <button
                onClick={() => setUnverifiedPage((p) => Math.max(1, p - 1))}
                disabled={unverifiedPage === 1}
                className="px-4 py-2 text-sm rounded-full border border-gray-300 disabled:opacity-40 hover:bg-gray-100"
              >
                আগের
              </button>
              <span className="text-sm text-gray-600">
                {convertToBengaliDigits(unverifiedPage)} / {convertToBengaliDigits(unverifiedTotalPages)}
              </span>
              <button
                onClick={() => setUnverifiedPage((p) => Math.min(unverifiedTotalPages, p + 1))}
                disabled={unverifiedPage === unverifiedTotalPages}
                className="px-4 py-2 text-sm rounded-full border border-gray-300 disabled:opacity-40 hover:bg-gray-100"
              >
                পরের
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BioDatasGrid;
