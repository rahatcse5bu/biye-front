/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { FaEye } from 'react-icons/fa';
import { ShortlistServices } from '../../services/shortlist';
import { getToken } from '../../utils/cookies';
import LoadingCircle from '../../components/LoadingCircle/LoadingCircle';
import { formatDate, getDateMonthYear } from '../../utils/date';
import { useNavigate } from 'react-router-dom';
import { BioDataServices } from '../../services/bioData';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

const ShortlistItem = ({ item, index }) => {
  const navigate = useNavigate();
  const { logOut } = useContext(UserContext);

  if (!getToken()?.token) {
    logOut();
    navigate('/');
  }

  const { data } = useQuery({
    queryKey: ['bio-data', 'stat', item?.bio_user],
    queryFn: async () => {
      return await BioDataServices.getBioDataStatistics(item?.bio_user);
    },
    retry: false,
    enabled: !!item?.bio_user,
  });

  const total =
    (data?.results?.approved || 0) +
    (data?.results?.pending || 0) +
    (data?.results?.rejected || 0);

  const viewButtonHandler = () => {
    navigate(`/biodata/${item.bio_id}`);
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-2 text-center border-l w-1/9">{index + 1}</td>
      <td className="px-4 py-2 text-center border-l w-1/9">{item?.bio_id}</td>
      <td className="px-4 py-2 text-center border-l w-1/9">
        {formatDate(getDateMonthYear(item?.date_of_birth))}
      </td>
      <td className="px-4 py-2 text-center border-l w-1/9">
        {item?.permanent_address}
      </td>
      <td className="px-4 py-2 text-center border-l w-1/9">{total}</td>
      <td className="px-4 py-2 text-center border-l w-1/9">
        {data?.results?.approvedPercentage || 0}%
      </td>
      <td className="px-4 py-2 text-center border-l w-1/9">
        {data?.results?.rejectedPercentage || 0}%
      </td>
      <td className="px-4 py-2 text-center border-l w-1/9">
        {data?.results?.pending || 0}
      </td>
      <td className="px-4 py-2 text-center border-l w-1/9">
        <Button onClick={viewButtonHandler} color="green" className="mr-2">
          <FaEye size={12} />
        </Button>
      </td>
    </tr>
  );
};

const TableHeader = () => (
  <thead>
    <tr className="border-t border-b bg-gray-50">
      <th className="px-4 py-2 text-center w-1/9">SL</th>
      <th className="px-4 py-2 text-center w-1/9">বায়োডাটা নং</th>
      <th className="px-4 py-2 text-center w-1/9">জন্ম তারিখ</th>
      <th className="px-4 py-2 text-center w-1/9">ঠিকানা</th>
      <th className="px-4 py-2 text-center w-1/9">টোটাল পেয়েছে</th>
      <th className="px-4 py-2 text-center w-1/9">অ্যাপ্রুভাল রেট</th>
      <th className="px-4 py-2 text-center w-1/9">রিজেকশন রেট</th>
      <th className="px-4 py-2 text-center w-1/9">পেন্ডিং সংখ্যা</th>
      <th className="px-4 py-2 text-center w-1/9">অপশন</th>
    </tr>
  </thead>
);

const Shortlist = () => {
  const { userInfo } = useContext(UserContext);

  const { data, isLoading } = useQuery({
    queryKey: ['my-shortlist', getToken()?.token],
    queryFn: async () => {
      return await ShortlistServices.getMyShortlist(getToken()?.token);
    },
    retry: false,
  });

  const { data: shortlistedByWho, isLoading: shortlistedByWhoLoading } =
    useQuery({
      queryKey: ['who-shortlisted-me', userInfo?.data?._id],
      queryFn: async () => {
        return await ShortlistServices.getWhoShortlistedMe(getToken()?.token);
      },
      retry: false,
    });

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <div className="py-12 mx-auto">
      <div className="">
        {/* My Shortlist */}
        <div className="col right-sidebar-main">
          <div className="w-auto border-t-2 rounded shadow">
            <h5 className="my-3 text-2xl text-center card-title">
              আমার শর্টলিস্ট
            </h5>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <TableHeader />
                <tbody>
                  {data?.data?.length > 0 ? (
                    data?.data?.map((item, index) => (
                      <ShortlistItem item={item} index={index} key={index} />
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={9}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        আপনার শর্টলিস্টে কোন বায়োডাটা নেই
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="h-8"></div>

        {/* Who Shortlisted Me */}
        <div className="col right-sidebar-main">
          <div className="w-auto border-t-2 rounded shadow">
            <h5 className="mt-3 text-2xl text-center card-title">
              আমার বায়োডাটা যারা শর্টলিস্ট করেছেঃ
            </h5>
            <h6 className="pb-4 text-xs text-center text-gray-500">
              কে আপনার বায়োডাটা শর্টলিস্ট করেছে তা এখানে দেখুন
            </h6>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <TableHeader />
                <tbody>
                  {shortlistedByWhoLoading ? (
                    <tr>
                      <td colSpan={9}>
                        <LoadingCircle />
                      </td>
                    </tr>
                  ) : shortlistedByWho?.data?.length > 0 ? (
                    shortlistedByWho?.data?.map((item, index) => (
                      <ShortlistItem item={item} index={index} key={index} />
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={9}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        এখনো কেউ আপনার বায়োডাটা শর্টলিস্ট করেনি
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shortlist;
