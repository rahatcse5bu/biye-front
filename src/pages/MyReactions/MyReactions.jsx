/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Button,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import {
  FaEye,
  FaHeart,
  FaSadTear,
  FaAngry,
  FaGrinStars,
} from 'react-icons/fa';
import { MdOutlineThumbUp } from 'react-icons/md';
import { RiProhibitedFill } from 'react-icons/ri';
import { ReactionsServices } from '../../services/reactions';
import { getToken } from '../../utils/cookies';
import LoadingCircle from '../../components/LoadingCircle/LoadingCircle';
import { formatDate, getDateMonthYear } from '../../utils/date';
import { useNavigate } from 'react-router-dom';
import { BioDataServices } from '../../services/bioData';
import { useContext, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import { Colors } from '../../constants/colors';

const ReactionItem = ({ item, index }) => {
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

  const total = data?.results
    ? data.results.approved + data.results.pending + data.results.rejected
    : 0;

  const viewButtonHandler = () => {
    navigate(`/biodata/${item.bio_id}`);
  };

  const getReactionIcon = (reactionType) => {
    switch (reactionType) {
      case 'like':
        return <MdOutlineThumbUp className="inline" size={16} />;
      case 'dislike':
        return <RiProhibitedFill className="inline" size={16} />;
      case 'love':
        return <FaHeart className="inline" size={16} />;
      case 'sad':
        return <FaSadTear className="inline" size={16} />;
      case 'angry':
        return <FaAngry className="inline" size={16} />;
      case 'wow':
        return <FaGrinStars className="inline" size={16} />;
      default:
        return null;
    }
  };

  const getReactionLabel = (reactionType) => {
    switch (reactionType) {
      case 'like':
        return 'লাইক';
      case 'dislike':
        return 'ডিসলাইক';
      case 'love':
        return 'ভালোবাসা';
      case 'sad':
        return 'দুঃখিত';
      case 'angry':
        return 'রাগ';
      case 'wow':
        return 'বিস্ময়';
      default:
        return '';
    }
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-2 text-center border-l w-1/10">{index + 1}</td>
      <td className="px-4 py-2 text-center border-l w-1/10">{item?.bio_id}</td>
      <td className="px-4 py-2 text-center border-l w-1/10">
        {formatDate(getDateMonthYear(item?.date_of_birth))}
      </td>
      <td className="px-4 py-2 text-center border-l w-1/10">
        {item?.permanent_address}
      </td>
      <td className="px-4 py-2 text-center border-l w-1/10">
        <span className="inline-flex items-center gap-1">
          {getReactionIcon(item?.reaction_type)}
          {getReactionLabel(item?.reaction_type)}
        </span>
      </td>
      <td className="px-4 py-2 text-center border-l w-1/10">{total}</td>
      <td className="px-4 py-2 text-center border-l w-1/10">
        {data?.results?.approvedPercentage || 0}%
      </td>
      <td className="px-4 py-2 text-center border-l w-1/10">
        {data?.results?.rejectedPercentage || 0}%
      </td>
      <td className="px-4 py-2 text-center border-l w-1/10">
        {data?.results?.pending || 0}
      </td>
      <td className="px-4 py-2 text-center border-l w-1/10">
        <Button
          onClick={viewButtonHandler}
          style={{ backgroundColor: Colors.primary900 }}
          className="mr-2"
        >
          <FaEye size={12} />
        </Button>
      </td>
    </tr>
  );
};

const MyReactions = () => {
  const { userInfo } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('all');

  const reactionTabs = [
    { label: 'সব', value: 'all', icon: null },
    { label: 'লাইক', value: 'like', icon: <MdOutlineThumbUp size={16} /> },
    {
      label: 'ডিসলাইক',
      value: 'dislike',
      icon: <RiProhibitedFill size={16} />,
    },
    { label: 'ভালোবাসা', value: 'love', icon: <FaHeart size={16} /> },
    { label: 'দুঃখিত', value: 'sad', icon: <FaSadTear size={16} /> },
    { label: 'রাগ', value: 'angry', icon: <FaAngry size={16} /> },
    { label: 'বিস্ময়', value: 'wow', icon: <FaGrinStars size={16} /> },
  ];

  const { data: myReactions, isLoading } = useQuery({
    queryKey: ['my-reactions', activeTab, getToken()?.token],
    queryFn: async () => {
      const reactionType = activeTab === 'all' ? null : activeTab;
      return await ReactionsServices.getMyReactionsList(
        reactionType,
        getToken()?.token
      );
    },
    retry: false,
  });

  const { data: reactionsReceived, isLoading: reactionsReceivedLoading } =
    useQuery({
      queryKey: ['reactions-received', activeTab, userInfo?.data?._id],
      queryFn: async () => {
        const reactionType = activeTab === 'all' ? null : activeTab;
        return await ReactionsServices.getReactionsReceived(
          reactionType,
          getToken()?.token
        );
      },
      retry: false,
    });

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <div className="py-12 mx-auto max-w-7xl px-4">
      <div className="mb-8">
        <h2
          className="text-3xl font-bold text-center mb-6"
          style={{ color: Colors.primary900 }}
        >
          আমার রিঅ্যাকশন সমূহ
        </h2>

        {/* Reaction Type Tabs */}
        <div className="mb-6">
          <Tabs value={activeTab} className="w-full">
            <TabsHeader
              className="bg-gray-100"
              indicatorProps={{
                className: 'shadow-none',
                style: { backgroundColor: Colors.primary900 },
              }}
            >
              {reactionTabs.map(({ label, value, icon }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => setActiveTab(value)}
                  className={activeTab === value ? 'text-white' : ''}
                >
                  <div className="flex items-center gap-2">
                    {icon}
                    {label}
                  </div>
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
        </div>

        {/* My Reactions Section */}
        <div className="col right-sidebar-main my-reactions mb-8">
          <div
            className="w-auto border-t-2 rounded shadow"
            style={{ borderColor: Colors.primary900 }}
          >
            <h5 className="my-3 text-2xl text-center font-semibold">
              আমি যে বায়োডাটাতে রিঅ্যাক্ট করেছি
            </h5>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead style={{ backgroundColor: Colors.primary100 }}>
                  <tr className="border-t border-b">
                    <th className="px-4 py-2 text-center w-1/10">SL</th>
                    <th className="px-4 py-2 text-center w-1/10">
                      বায়োডাটা নং
                    </th>
                    <th className="px-4 py-2 text-center w-1/10">জন্ম তারিখ</th>
                    <th className="px-4 py-2 text-center w-1/10">ঠিকানা</th>
                    <th className="px-4 py-2 text-center w-1/10">রিঅ্যাকশন</th>
                    <th className="px-4 py-2 text-center w-1/10">
                      টোটাল পেয়েছে
                    </th>
                    <th className="px-4 py-2 text-center w-1/10">
                      অ্যাপ্রুভাল রেট
                    </th>
                    <th className="px-4 py-2 text-center w-1/10">
                      রিজেকশন রেট
                    </th>
                    <th className="px-4 py-2 text-center w-1/10">
                      পেইন্ডিং সংখ্যা
                    </th>
                    <th className="px-4 py-2 text-center w-1/10">অপশন</th>
                  </tr>
                </thead>
                <tbody>
                  {myReactions?.data && myReactions.data.length > 0 ? (
                    myReactions.data.map((item, index) => (
                      <ReactionItem item={item} index={index} key={index} />
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="10"
                        className="text-center py-8 text-gray-500"
                      >
                        কোন রিঅ্যাকশন পাওয়া যায়নি
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Reactions Received Section */}
        <div className="col right-sidebar-main my-bio-reactions">
          <div
            className="w-auto border-t-2 rounded shadow"
            style={{ borderColor: Colors.secondary900 }}
          >
            <h5 className="mt-3 text-2xl text-center font-semibold">
              আমার বায়োডাটায় যারা রিঅ্যাক্ট করেছেঃ
            </h5>
            <h6 className="pb-4 text-xs text-center text-gray-600">
              এটি প্রিমিয়াম ফিচার! এই তথ্য দেখতে হলে আপনাকে ৫০ পয়েন্ট খরচ করতে
              হবে!!!
            </h6>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead style={{ backgroundColor: Colors.secondary100 }}>
                  <tr className="border-t border-b">
                    <th className="px-4 py-2 text-center w-1/10">SL</th>
                    <th className="px-4 py-2 text-center w-1/10">
                      বায়োডাটা নং
                    </th>
                    <th className="px-4 py-2 text-center w-1/10">জন্ম তারিখ</th>
                    <th className="px-4 py-2 text-center w-1/10">ঠিকানা</th>
                    <th className="px-4 py-2 text-center w-1/10">রিঅ্যাকশন</th>
                    <th className="px-4 py-2 text-center w-1/10">
                      টোটাল পেয়েছে
                    </th>
                    <th className="px-4 py-2 text-center w-1/10">
                      অ্যাপ্রুভাল রেট
                    </th>
                    <th className="px-4 py-2 text-center w-1/10">
                      রিজেকশন রেট
                    </th>
                    <th className="px-4 py-2 text-center w-1/10">
                      পেইন্ডিং সংখ্যা
                    </th>
                    <th className="px-4 py-2 text-center w-1/10">অপশন</th>
                  </tr>
                </thead>
                <tbody>
                  {reactionsReceivedLoading ? (
                    <tr>
                      <td colSpan="10" className="text-center py-8">
                        <LoadingCircle />
                      </td>
                    </tr>
                  ) : reactionsReceived?.data &&
                    reactionsReceived.data.length > 0 ? (
                    reactionsReceived.data.map((item, index) => (
                      <ReactionItem item={item} index={index} key={index} />
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="10"
                        className="text-center py-8 text-gray-500"
                      >
                        কোন রিঅ্যাকশন পাওয়া যায়নি
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

export default MyReactions;
