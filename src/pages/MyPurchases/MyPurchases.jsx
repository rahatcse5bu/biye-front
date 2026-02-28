/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { FaEye, FaTrash, FaInfo } from 'react-icons/fa';
import { BioChoiceDataServices } from '../../services/bioChoiceData';
import { getToken } from '../../utils/cookies';
import { FaYoutube } from 'react-icons/fa';

import { MdFeedback } from 'react-icons/md';
import { AiFillQuestionCircle } from 'react-icons/ai';
import LoadingCircle from '../../components/LoadingCircle/LoadingCircle';
import { FeedbackModal } from '../../components/FeedbackModal/FeedbackModal';
import { BioDetailsModal } from '../../components/BioDetailsModal/BioDetailsModal';
import { useNavigate, useLocation } from 'react-router-dom';
import { Colors } from '../../constants/colors';
import { PayDetailsModal } from '../../components/PayDetailsModal/PayDetailsModal';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import Swal from 'sweetalert2';
import { convertToBengaliNumerals } from '../../utils/weight';
import BkashCreatePaymentAPICall from '../../services/bkash';
import { Toast } from '../../utils/toast';
import { getErrorMessage } from '../../utils/error';
import { ContactPurchaseDataServices } from '../../services/contactPurchaseData';
import classNames from 'classnames';
import { BioDataServices } from '../../services/bioData';
import './MyPurchases.css';
import { formatDateAndCalculateAge } from '../../utils/date';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomModal from '../../components/CustomModal/CustomModal';
import YouTubeEmbed from '../../components/YouTubeEmbed/YouTubeEmbed';

const FirstStepCard = ({
  item,
  index,
  setFeedback,
  setQa,
  setIsFeedbackDialogOpen,
  setBioDetailsModal,
  setPayBioDetailsModal,
  bioChoiceFirstStepRefetch,
  bioChoiceSecondStepRefetch,
}) => {
  const location = useLocation();
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data } = useQuery({
    queryKey: ['bio-data', 'stat', item?.bio_user],
    queryFn: async () => {
      return await BioDataServices.getBioDataStatistics(item?.bio_user);
    },
    retry: false,
    enabled: !!item?.bio_user,
  });
  const buyWithBkashHandler = async (value, bio_user) => {
    if (+value >= 0) {
      BkashCreatePaymentAPICall(
        +value,
        bio_user,
        'second_step',
        location.pathname
      );
    }
  };
  // console.log("bio-stats", data);
  const bioDetailsOpenModalHandler = (text) => {
    setQa(text);
    setBioDetailsModal(true);
  };

  const feedbackDetailsModalHandler = (item) => {
    setIsFeedbackDialogOpen(true);
    setFeedback(item);
  };

  // buy contact after first step

  const buyContact = async (bio_user) => {
    try {
      setLoading(true);
      const data = await ContactPurchaseDataServices.createContactPurchaseData(
        {
          bio_user,
        },
        getToken().token
      );

      if (data.success) {
        Toast.successToast('আপনার বায়োডাটা ক্রয় সম্পূর্ন  হয়েছে।');
        await bioChoiceFirstStepRefetch();
        await bioChoiceSecondStepRefetch();
      }
    } catch (error) {
      let msg = getErrorMessage(error);
      Toast.errorToast(msg);
    } finally {
      setLoading(false);
    }
  };

  const payButtonHandler = (bio_user) => {
    const points = userInfo?.data?.points;
    Swal.fire({
      title: 'যোগাযোগ তথ্য অনুরোধ করতে চান?',
      text: `যোগাযোগ তথ্য অনুরোধ করতে আপনার ৭০ পয়েন্ট খরচ হবে | ${
        points >= 70
          ? convertToBengaliNumerals((points - 70).toString()) +
            ' অবশিষ্ট থাকবে'
          : 'আপনার আরও ' +
            convertToBengaliNumerals((70 - points).toString()) +
            ' পয়েন্ট লাগবে'
      }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok',
    }).then(async (result) => {
      //! for not confirm
      if (!result.isConfirmed) {
        return;
      }
      if (points >= 70) {
        // console.log("clicked button");
        buyContact(bio_user);
      } else {
        buyWithBkashHandler(70 - points, bio_user);
      }
    });
  };

  const viewBioIdHandler = (bioId) => {
    navigate(`/biodata/${bioId}`);
  };

  return (
    <tr className="border-b">
      <td className="px-4 py-2 text-center border-l w-1/10">{index + 1}</td>
      <td className="px-4 py-2 text-center border-l w-1/10">{item?.bio_id}</td>
      <td className="px-4 py-2 text-center border-l w-1/10">
        {item?.city},{item?.division}
      </td>
      <td
        className={classNames(
          'px-4 py-2 capitalize  w-1/10 text-center font-bold text-base border-l w-1/7',
          {
            'text-orange-500': item?.status === 'pending',
            'text-green-600': item?.status === 'approved',
            'text-red-600': item?.status === 'rejected',
          }
        )}
      >
        {item?.status}
      </td>
      <td className="px-4 py-2 text-center border-l w-1/10">
        <button
          onClick={() => bioDetailsOpenModalHandler(item?.bio_details)}
          className="flex items-center justify-center cursor-pointer"
        >
          <FaInfo color="gray" size={22} />
        </button>
      </td>
      <td className="px-4 py-2 text-center border-l w-1/10">
        <button
          onClick={() => feedbackDetailsModalHandler(item?.feedback)}
          className="flex items-center justify-center cursor-pointer"
        >
          <MdFeedback color="gray" size={22} />
        </button>
      </td>
      <td className="px-4 py-2 text-center border-l w-1/10">
        {data?.results.approvedPercentage}%
      </td>
      <td className="px-4 py-2 text-center border-l w-1/10">
        {data?.results.rejectedPercentage}%
      </td>
      <td className="px-4 py-2 text-center border-l w-1/10">
        {data?.results.pending}
      </td>
      <td className="flex items-center px-4 py-2 text-center border-l w-1/10">
        {item?.status === 'approved' && (
          <>
            <Button
              onClick={() => payButtonHandler(item?.bio_user)}
              size="xs"
              className="mr-2"
              style={{
                background: `linear-gradient(to right,${Colors.lnRight},${Colors.lnLeft} )`,
              }}
            >
              {loading ? <LoadingCircle /> : 'Pay'}
            </Button>
            <AiFillQuestionCircle
              onClick={() => setPayBioDetailsModal(true)}
              className="w-6 h-6 mr-2 text-yellow-600 cursor-pointer hover:text-yellow-800"
            />
          </>
        )}
        <Button
          onClick={() => viewBioIdHandler(item?.bio_id)}
          color="green"
          size="xs"
          className=""
        >
          <FaEye />
        </Button>
      </td>
    </tr>
  );
};

const SecondStepCard = ({ item, index }) => {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ['bio-data', 'stat', item?.bio_user],
    queryFn: async () => {
      return await BioDataServices.getBioDataStatistics(item?.bio_user);
    },
    retry: false,
    enabled: !!item?.bio_user,
  });
  const total =
    data?.results?.rejected + data?.results?.approved + data?.results?.pending;

  const viewBioIdHandler = (bioId) => {
    navigate(`/biodata/${bioId}`);
  };
  // console.log("data~", data);
  return (
    <tr className="border-b">
      <td className="px-4 py-2 text-center border-l w-1/10">{index + 1}</td>
      <td className="px-4 py-2 text-center border-l w-1/10">{item?.bio_id}</td>
      <td className="px-4 py-2 text-center border-l w-1/10">
        {item?.full_name}
      </td>
      <td className="px-4 py-2 text-center border-l w-1/10">
        {item?.bio_receiving_email}
      </td>
      <td className="px-4 py-2 whitespace-nowrap text-center border-l w-1/10">
        {formatDateAndCalculateAge(item?.date_of_birth)?.formattedDate}
      </td>
      <td className="px-4 py-2 whitespace-nowrap text-center border-l w-1/10">
        {item?.permanent_area}
      </td>
      <td className="px-4 py-2 whitespace-nowrap text-center border-l w-1/10">
        {item?.present_area}
      </td>
      <td className="px-4 py-2 text-center border-l w-1/10">
        {item?.family_number}
      </td>
      <td className="px-4 py-2 text-center border-l w-1/10">
        {item?.relation}
      </td>
      <td className="px-4 py-2 text-center border-l w-1/10">{total}</td>
      <td className="px-4 py-2 text-center border-l w-1/10">
        {data?.results?.approvedPercentage}%
      </td>
      <td className="px-4 py-2 text-center border-l w-1/10">
        {data?.results?.rejectedPercentage}%
      </td>
      <td className="px-4 py-2 text-center border-l w-1/10">
        {data?.results?.pending}
      </td>
      <td className="flex px-4 py-2 text-center border-l w-1/10">
        <Button
          color="green"
          size="xs"
          onClick={() => viewBioIdHandler(item?.bio_id)}
          className="mr-2"
        >
          <FaEye size={12} />
        </Button>
        <Button color="red" size="xs">
          <FaTrash size={12} />
        </Button>
      </td>
    </tr>
  );
};
const MyPurchases = () => {
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
  const [bioDetailsModal, setBioDetailsModal] = useState(false);
  const [payDetailsModal, setPayBioDetailsModal] = useState(false);
  const [qA, setQa] = useState('"');
  const [feedback, setFeedback] = useState('');
  const [isFirstStepModalOpen, setIsFirstStepModalOpen] = useState(false);
  const [isSecondStepModalOpen, setIsSecondStepModalOpen] = useState(false);
  const {
    data: bioChoiceFirstStep,
    isLoading: bioChoiceFirstStepLoading,
    refetch: bioChoiceFirstStepRefetch,
  } = useQuery({
    queryKey: ['bio-choice-data', 'first-step'],
    queryFn: async () => {
      return await BioChoiceDataServices.getBioChoiceDataFirstStep(
        getToken().token
      );
    },
    retry: false,
  });

  const {
    data: bioChoiceSecondStep,
    isLoading: bioChoiceSecondStepLoading,
    refetch: bioChoiceSecondStepRefetch,
  } = useQuery({
    queryKey: ['bio-choice-data', 'second-step'],
    queryFn: async () => {
      return await BioChoiceDataServices.getBioChoiceDataSecondStep(
        getToken().token
      );
    },
    retry: false,
  });

  // console.log("bio-choice-second-step~", bioChoiceSecondStep);
  // console.log("bio-choice-first-step~", bioChoiceFirstStep);

  return (
    <>
      <div className="py-12 mx-auto ">
        <div className="">
          {/*<!-- End of Left Sidebar -->*/}
          <div className="col right-sidebar-main my-favs">
            <div className="w-auto border-t-2 rounded shadow my-favs-info">
              <h5 className="mt-3 text-2xl text-center card-title">
                আমার শেয়ার করা বায়োডাটার অবস্থা (অনুরোধ পাঠান)
              </h5>
              <h6 className="py-4 text-xs">
                আপনার নিজের বায়োডাটা যেসকল পাত্র/পাত্রীর সাথে শেয়ার
                করেছেন তাদের তালিকা, ফিডব্যাক ও অবস্থা
              </h6>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="border-t border-b">
                      <th className="px-4 py-2 text-center w-1/10">SL</th>
                      <th className="px-4 whitespace-nowrap py-2 text-center w-1/10">
                        বায়োডাটা নং
                      </th>
                      <th className="px-4 py-2 text-center w-1/10">
                        অ্যাড্রেস
                      </th>
                      <th className="px-4 py-2 text-center w-1/10">
                        স্ট্যাটাস
                      </th>
                      <th className="px-4 py-2 text-center w-1/10">
                        Bio Details
                      </th>
                      <th className="px-4 py-2 text-center w-1/10">ফিডব্যাক</th>
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
                    {bioChoiceFirstStepLoading ? (
                      <LoadingCircle />
                    ) : (
                      bioChoiceFirstStep?.data?.length > 0 &&
                      bioChoiceFirstStep?.data?.map((item, index) => {
                        return (
                          <FirstStepCard
                            item={item}
                            key={index}
                            index={index}
                            setQa={setQa}
                            setFeedback={setFeedback}
                            setIsFeedbackDialogOpen={setIsFeedbackDialogOpen}
                            setBioDetailsModal={setBioDetailsModal}
                            setPayBioDetailsModal={setPayBioDetailsModal}
                            bioChoiceFirstStepRefetch={
                              bioChoiceFirstStepRefetch
                            }
                            bioChoiceSecondStepRefetch={
                              bioChoiceSecondStepRefetch
                            }
                          />
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex md:flex-row flex-col gap-5 items-center my-10 ">
            <CustomButton
              onClick={() => {
                setIsFirstStepModalOpen(true);
              }}
              className=" flex w-full md:w-[50%] items-center justify-center border hover:bg-transparent border-indigo-700 rounded-full py-2 bg-white"
            >
              <FaYoutube className="mb-0 pb-0 mr-2 text-red-500 w-12 h-6  rounded-full bg-white" />{' '}
              <span
                className="md:text-xl text-xl"
                style={{
                  color: Colors.titleText,
                }}
              >
                অনুরোধ পাঠান টিউটোরিয়াল
              </span>
            </CustomButton>
            <CustomButton
              onClick={() => {
                setIsSecondStepModalOpen(true);
              }}
              className=" flex w-full md:w-[50%] items-center justify-center border hover:bg-transparent border-indigo-700 rounded-full py-2 bg-white"
            >
              <FaYoutube className="mb-0 pb-0 mr-2 text-red-500 w-12 h-6  rounded-full bg-white" />{' '}
              <span
                className="md:text-xl text-xl"
                style={{
                  color: Colors.titleText,
                }}
              >
                যোগাযোগ তথ্য অনুরোধ টিউটোরিয়াল
              </span>
            </CustomButton>
          </div>
          <CustomModal
            onClose={() => setIsFirstStepModalOpen(false)}
            isOpen={isFirstStepModalOpen}
            title="অনুরোধ পাঠানোর নিয়ম"
          >
            <YouTubeEmbed
              title="Send Request || অনুরোধ পাঠান || PNC NIkah"
              videoId="X6sjWCZjiuQ"
            />
          </CustomModal>
          <CustomModal
            onClose={() => setIsSecondStepModalOpen(false)}
            isOpen={isSecondStepModalOpen}
            title="যোগাযোগ তথ্য অনুরোধের নিয়ম"
          >
            <YouTubeEmbed
              videoId="x0-RXTR0DfQ"
              title="Contact Info Request || যোগাযোগ তথ্য অনুরোধ || PNC NIkah"
            />
          </CustomModal>
          <div className="col right-sidebar-main overflow-hidden my-favs">
            <div className="w-auto overflow-hidden border-t-2 rounded shadow my-favs-info">
              <h5 className="mt-3 text-2xl text-center card-title">
                আমার ফাইনাল বায়োডাটা ক্রয়সমূহ (যোগাযোগ তথ্য অনুরোধ)
              </h5>
              <h6 className="py-4 text-xs">
                আপনার অনুরোধ পাঠিয়ে আপ্রুভাল পাওয়ার পর যেসকল
                অভিভাবকের কনটাক্ট নাম্বার পেয়েছেন, তাদের তালিকা
              </h6>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="border-t border-b">
                      <th className="w-1/12 px-4 py-2 text-center">SL</th>
                      <th className="w-1/12 px-4 py-2 text-center">
                        বায়োডাটা নং
                      </th>
                      <th className="w-1/12 px-4 py-2 text-center">নাম</th>
                      <th className="w-1/12 px-4 py-2 text-center">ই-মেইল</th>
                      <th className="w-1/12 px-4 py-2 text-center">
                        জন্ম তারিখ
                      </th>
                      <th className="w-1/12 whitespace-nowrap px-4 py-2 text-center">
                        স্থায়ী ঠিকানা
                      </th>
                      <th className="w-1/12 whitespace-nowrap  px-4 py-2 text-center">
                        বর্তমান ঠিকানা{' '}
                      </th>
                      <th className="w-1/12 px-4 py-2 text-center">
                        যোগাযোগের নাম্বার
                      </th>
                      <th className="w-1/12 px-4 py-2 text-center">সম্পর্ক</th>
                      <th className="w-1/12 px-4 py-2 text-center">
                        টোটাল পেয়েছে
                      </th>
                      <th className="w-1/12 px-4 py-2 text-center">
                        অ্যাপ্রুভাল রেট
                      </th>
                      <th className="w-1/12 px-4 py-2 text-center">
                        রিজেকশন রেট
                      </th>
                      <th className="w-1/12 px-4 py-2 text-center">
                        পেইন্ডিং সংখ্যা
                      </th>
                      <th className="w-1/12 px-4 py-2 text-center">অপশন</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bioChoiceSecondStepLoading ? (
                      <LoadingCircle />
                    ) : (
                      bioChoiceSecondStep?.data?.length > 0 &&
                      bioChoiceSecondStep?.data?.map((item, index) => {
                        return (
                          <SecondStepCard
                            key={index}
                            index={index}
                            item={item}
                          />
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
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
      {isFeedbackDialogOpen && (
        <FeedbackModal
          open={isFeedbackDialogOpen}
          setOpen={setIsFeedbackDialogOpen}
          feedbackData={feedback}
          purchase={true}
        />
      )}
      {payDetailsModal && (
        <PayDetailsModal
          open={payDetailsModal}
          setOpen={setPayBioDetailsModal}
        />
      )}
    </>
  );
};

export default MyPurchases;
