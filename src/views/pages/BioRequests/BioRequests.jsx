import './BioRequests.css';
import { Button } from '@material-tailwind/react';
import { FaEye, FaCheck, FaTimes, FaInfo } from 'react-icons/fa';
import { MdFeedback } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import { BioChoiceDataServices } from '../../../services/bioChoiceData';
import { getToken } from '../../../utils/cookies';
import { Colors } from '../../../constants/colors';
import LoadingCircle from '../../../components/LoadingCircle/LoadingCircle';
import { useNavigate } from '@/lib/navigation';
import { getErrorMessage } from '../../../utils/error';
import { FaYoutube } from 'react-icons/fa';
import { Toast } from '../../../utils/toast';
import { useState } from 'react';
import { BioDetailsModal } from '../../../components/BioDetailsModal/BioDetailsModal';
import { FeedbackModal } from '../../../components/FeedbackModal/FeedbackModal';
import classNames from 'classnames';
import CustomButton from '../../../components/CustomButton/CustomButton';
import CustomModal from '../../../components/CustomModal/CustomModal';
import YouTubeEmbed from '../../../components/YouTubeEmbed/YouTubeEmbed';
import { HiOutlineLocationMarker } from 'react-icons/hi';

const statusMeta = {
  pending: { label: 'অপেক্ষমাণ', className: 'bg-amber-50 text-amber-700 ring-amber-200' },
  approved: { label: 'গৃহীত', className: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
  rejected: { label: 'প্রত্যাখ্যাত', className: 'bg-rose-50 text-rose-700 ring-rose-200' },
};

const cardButton =
  'inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D7377]/40';

// TODO: mobile layout for one received proposal; same actions as the desktop table row.
const RequestCard = ({ item, onView, onDetails, onFeedback, onDecide, busyStatus }) => {
  const meta = statusMeta[item?.status] || { label: item?.status || '—', className: 'bg-gray-100 text-gray-700 ring-gray-200' };
  const decisionButton = (status, label, tone) => {
    const active = item?.status === status;
    const busy = busyStatus === status;
    return (
      <button
        type="button"
        onClick={() => onDecide(item?.user, status)}
        disabled={Boolean(busyStatus) || active}
        className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed ${
          active ? `${tone.active} opacity-90` : `${tone.idle} disabled:opacity-60`
        }`}
      >
        {busy ? <LoadingCircle /> : active ? `${label} করা হয়েছে` : `${label} করুন`}
      </button>
    );
  };
  return (
    <article className="space-y-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-gray-500">বায়োডাটা নং</p>
          <p className="text-lg font-bold text-gray-900">{item?.user_id}</p>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${meta.className}`}>
          {meta.label}
        </span>
      </div>
      <p className="flex items-start gap-1.5 text-sm text-gray-600">
        <HiOutlineLocationMarker className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
        {item?.present_address || 'ঠিকানা উল্লেখ করা হয়নি'}
      </p>
      <div className="flex gap-2">
        <button type="button" onClick={() => onView(item?.user_id)} className={cardButton}>
          <FaEye aria-hidden="true" /> বায়োডাটা
        </button>
        <button type="button" onClick={() => onDetails(item?.bio_details)} className={cardButton}>
          <FaInfo aria-hidden="true" /> প্রশ্নোত্তর
        </button>
        <button type="button" onClick={() => onFeedback(item?.user, item?.feedback || '')} className={cardButton}>
          <MdFeedback aria-hidden="true" /> ফিডব্যাক
        </button>
      </div>
      <div className="flex gap-2 border-t border-gray-100 pt-3">
        {decisionButton('approved', 'গ্রহণ', {
          active: 'bg-emerald-600 text-white',
          idle: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-100',
        })}
        {decisionButton('rejected', 'প্রত্যাখ্যান', {
          active: 'bg-rose-600 text-white',
          idle: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200 hover:bg-rose-100',
        })}
      </div>
    </article>
  );
};
const MyBioRequests = () => {
  const navigate = useNavigate();
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
  const [isFirstStepModalOpen, setIsFirstStepModalOpen] = useState(false);

  const [userId, setUserId] = useState('');
  const [feedback, setFeedback] = useState('');
  const [qA, setQa] = useState('"');
  const [bioDetailsModal, setBioDetailsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['bio-share-all'],
    queryFn: async () => {
      return await BioChoiceDataServices.getBioChoiceShare(getToken().token);
    },
    retry: false,
  });

  const viewBioHandler = (id) => {
    navigate(`/biodata/${id}`);
  };

  // action for accepting and rejecting
  const reactionDataHandler = async (user, status) => {
    try {
      setLoading(true);
      setLoadingId(user);
      setLoadingStatus(status);
      const response = await BioChoiceDataServices.updateBioChoiceData(
        {
          user,
          status: status,
        },
        getToken().token,
        'status'
      );
      if (response?.success === true) {
        Toast.successToast('আপনার রিয়াকশন সেভ করা হয়েছে।');
        await refetch();
      }
    } catch (error) {
      const msg = getErrorMessage(error);
      Toast.errorToast(msg);
    } finally {
      setLoadingId(null);
      setLoading(false);
      setLoadingStatus(null);
    }
  };

  const bioDetailsOpenModalHandler = (text) => {
    setQa(text);
    setBioDetailsModal(true);
  };
  const feedbackDetailsModalHandler = (user, item) => {
    setIsFeedbackDialogOpen(true);
    setUserId(user);
    setFeedback(item);
  };

  // if (loading) {
  //   return (
  //     <div>
  //       <LoadingCircle />
  //     </div>
  //   );
  // }

  // console.log("bio-share-data~", data);

  return (
    <>
      <div className="mx-auto py-6 md:py-12">
        <div className="">
          {/*<!-- End of Left Sidebar -->*/}
          <div className="col right-sidebar-main my-favs">
            <div className="w-auto border-t-2 rounded shadow my-favs-info">
              <h5 className="mt-3 px-3 text-xl text-center card-title md:text-2xl">
                আমার কাছে শেয়ার করা বায়োডাটার অনুরোধসমূহ
              </h5>
              <h6 className="px-3 py-4 text-center text-xs" style={{ color: Colors.siteGlobal }}>
                আপনার নিকট যেসকল পাত্র/পাত্রী তাদের নিজেদের বায়োডাটা
                শেয়ার করেছেন, তাদের তালিকা, ফিডব্যাক ও অবস্থা
              </h6>
              {isLoading ? (
                <div className="py-8"><LoadingCircle /></div>
              ) : !(data?.data?.length > 0) ? (
                <div className="px-3 pb-4">
                  <p className="rounded-xl border border-dashed border-gray-200 px-4 py-8 text-center text-sm text-gray-500">
                    এখনো কেউ আপনার কাছে প্রস্তাব পাঠায়নি।
                  </p>
                </div>
              ) : (
              <>
              <div className="space-y-3 px-3 pb-4 md:hidden">
                {data.data.map((item, index) => (
                  <RequestCard
                    key={item?._id || index}
                    item={item}
                    onView={viewBioHandler}
                    onDetails={bioDetailsOpenModalHandler}
                    onFeedback={feedbackDetailsModalHandler}
                    onDecide={reactionDataHandler}
                    busyStatus={loading && loadingId === item?.user ? loadingStatus : null}
                  />
                ))}
              </div>
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="border-t border-b">
                      <th className="px-4 py-2 text-center w-1/7">SL</th>
                      <th className="px-4 py-2 text-center w-1/7">
                        বায়োডাটা নং
                      </th>
                      <th className="px-4 py-2 text-center w-1/7">অ্যাড্রেস</th>
                      <th className="px-4 py-2 text-center w-1/7">স্ট্যাটাস</th>
                      <th className="px-4 py-2 text-center w-1/7">
                        বায়ো ডিটেইলস
                      </th>
                      <th className="px-4 py-2 text-center w-1/7">ফিডব্যাক</th>

                      <th className="px-4 py-2 text-center w-1/7">অপশন</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.data.map((item, index) => {
                        return (
                          <tr key={item?._id || index} className="border-b">
                            <td className="px-4 py-2 text-center border-l w-1/10">
                              {index + 1}
                            </td>
                            <td className="px-4 py-2 text-center border-l w-1/7">
                              {item?.user_id}
                            </td>
                            <td className="px-4 py-2 text-center border-l w-1/7">
                              {item?.present_address || 'এড্রেস উল্লেখ করে নাই'}
                            </td>
                            <td
                              className={classNames(
                                'px-4 py-2 capitalize text-center font-bold text-base border-l w-1/7',
                                {
                                  'text-orange-500': item?.status === 'pending',
                                  'text-green-600': item?.status === 'approved',
                                  'text-red-600': item?.status === 'rejected',
                                }
                              )}
                            >
                              {item?.status}
                            </td>
                            <td className="px-4 py-2 text-center border-l w-1/7">
                              <button
                                onClick={() =>
                                  bioDetailsOpenModalHandler(item?.bio_details)
                                }
                                className="flex items-center justify-center cursor-pointer"
                              >
                                <FaInfo color="gray" size={22} />
                              </button>
                            </td>
                            <td className="px-4 py-2 text-center border-l w-1/7">
                              <button
                                onClick={() =>
                                  feedbackDetailsModalHandler(
                                    item?.user,
                                    item?.feedback || ''
                                  )
                                }
                                className="flex items-center justify-center cursor-pointer"
                              >
                                <MdFeedback color="gray" size={22} />
                              </button>
                            </td>
                            <td className="px-4 py-2 text-center border-l w-1/7">
                              <div className="flex items-center justify-center">
                                <Button
                                  onClick={() => viewBioHandler(item?.user_id)}
                                  color="blue"
                                  size="xs"
                                  className="mr-2"
                                >
                                  <FaEye size={12} />
                                </Button>
                                <Button
                                  onClick={() =>
                                    reactionDataHandler(item?.user, 'approved')
                                  }
                                  color="green"
                                  size="xs"
                                  className="mr-2"
                                >
                                  {loading &&
                                  loadingId === item?.user &&
                                  loadingStatus === 'approved' ? (
                                    <LoadingCircle />
                                  ) : (
                                    <FaCheck size={12} />
                                  )}
                                </Button>
                                <Button
                                  onClick={() =>
                                    reactionDataHandler(item?.user, 'rejected')
                                  }
                                  color="red"
                                  size="xs"
                                >
                                  {loading &&
                                  loadingId === item?.user &&
                                  loadingStatus === 'rejected' ? (
                                    <LoadingCircle />
                                  ) : (
                                    <FaTimes size={12} />
                                  )}
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              </>
              )}
            </div>
            <CustomButton
              onClick={() => {
                setIsFirstStepModalOpen(true);
              }}
              className=" flex w-full md:w-[50%] mt-6 md:mt-10 mx-auto items-center justify-center border hover:bg-transparent border-indigo-700 rounded-full py-2 bg-white"
            >
              <FaYoutube className="mb-0 pb-0 mr-2 text-red-500 w-12 h-6  rounded-full bg-white" />{' '}
              <span
                className="text-base md:text-xl"
                style={{
                  color: Colors.titleText,
                }}
              >
                অনুরোধ পাঠান টিউটোরিয়াল
              </span>
            </CustomButton>

            <CustomModal
              onClose={() => setIsFirstStepModalOpen(false)}
              isOpen={isFirstStepModalOpen}
              title="অনুরোধ পাঠানোর নিয়ম"
            >
              <YouTubeEmbed
                videoId="X6sjWCZjiuQ"
                title="Send Request || অনুরোধ পাঠান || PNC NIkah"
              />
            </CustomModal>
          </div>
        </div>
      </div>
      {qA && (
        <BioDetailsModal
          open={bioDetailsModal}
          setOpen={setBioDetailsModal}
          title="Bio Details"
          text={qA}
        />
      )}
      {isFeedbackDialogOpen && userId && (
        <FeedbackModal
          open={isFeedbackDialogOpen}
          setOpen={setIsFeedbackDialogOpen}
          user={userId}
          refetch={refetch}
          feedbackData={feedback}
        />
      )}
    </>
  );
};

export default MyBioRequests;
