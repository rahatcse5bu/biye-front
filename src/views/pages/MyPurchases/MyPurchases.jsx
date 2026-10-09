/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { FaEye, FaInfo } from 'react-icons/fa';
import { BioChoiceDataServices } from '../../../services/bioChoiceData';
import { getToken } from '../../../utils/cookies';
import { FaYoutube } from 'react-icons/fa';

import { MdFeedback } from 'react-icons/md';
import { AiFillQuestionCircle } from 'react-icons/ai';
import LoadingCircle from '../../../components/LoadingCircle/LoadingCircle';
import { FeedbackModal } from '../../../components/FeedbackModal/FeedbackModal';
import { BioDetailsModal } from '../../../components/BioDetailsModal/BioDetailsModal';
import { useNavigate, useLocation } from '@/lib/navigation';
import { Colors } from '../../../constants/colors';
import { PayDetailsModal } from '../../../components/PayDetailsModal/PayDetailsModal';
import { useContext } from 'react';
import UserContext from '../../../contexts/UserContext';
import Swal from 'sweetalert2';
import { convertToBengaliNumerals } from '../../../utils/weight';
import BkashCreatePaymentAPICall from '../../../services/bkash';
import { Toast } from '../../../utils/toast';
import { getErrorMessage } from '../../../utils/error';
import { ContactPurchaseDataServices } from '../../../services/contactPurchaseData';
import classNames from 'classnames';
import { BioDataServices } from '../../../services/bioData';
import './MyPurchases.css';
import { formatDateAndCalculateAge } from '../../../utils/date';
import CustomButton from '../../../components/CustomButton/CustomButton';
import CustomModal from '../../../components/CustomModal/CustomModal';
import YouTubeEmbed from '../../../components/YouTubeEmbed/YouTubeEmbed';
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail } from 'react-icons/hi';
import { takaForPoints, useTopUpRate } from '../../../utils/topUp';

const bnPoints = (value) => convertToBengaliNumerals(String(Number(Number(value || 0).toFixed(2))));

// TODO: popup line for the contact purchase: points left after it, or the bKash amount that covers the shortfall.
const costLine = (points, cost, rate) => {
  if (points >= cost) return `কেনার পর ${bnPoints(points - cost)} পয়েন্ট অবশিষ্ট থাকবে।`;
  const shortfall = cost - points;
  const taka = takaForPoints(shortfall, rate);
  return `আরও ${bnPoints(shortfall)} পয়েন্ট লাগবে। বিকাশে ৳${convertToBengaliNumerals(String(taka))} পরিশোধ করলে ${bnPoints(taka * rate)} পয়েন্ট পাবেন।`;
};

const statusMeta = {
  pending: { label: 'অপেক্ষমাণ', className: 'bg-amber-50 text-amber-700 ring-amber-200' },
  approved: { label: 'গৃহীত', className: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
  rejected: { label: 'প্রত্যাখ্যাত', className: 'bg-rose-50 text-rose-700 ring-rose-200' },
};

const StatusPill = ({ status }) => {
  const meta = statusMeta[status] || { label: status || '—', className: 'bg-gray-100 text-gray-700 ring-gray-200' };
  return (
    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${meta.className}`}>
      {meta.label}
    </span>
  );
};

// TODO: the biodata owner's track record, shown compactly on mobile cards.
const StatsLine = ({ results }) =>
  results ? (
    <div className="grid grid-cols-3 divide-x divide-gray-100 rounded-xl bg-gray-50 py-2 text-center">
      <div>
        <p className="text-sm font-bold text-emerald-700">{convertToBengaliNumerals(String(results.approvedPercentage ?? 0))}%</p>
        <p className="text-[11px] text-gray-500">গ্রহণের হার</p>
      </div>
      <div>
        <p className="text-sm font-bold text-rose-600">{convertToBengaliNumerals(String(results.rejectedPercentage ?? 0))}%</p>
        <p className="text-[11px] text-gray-500">প্রত্যাখ্যানের হার</p>
      </div>
      <div>
        <p className="text-sm font-bold text-amber-600">{convertToBengaliNumerals(String(results.pending ?? 0))}</p>
        <p className="text-[11px] text-gray-500">অপেক্ষমাণ</p>
      </div>
    </div>
  ) : null;

const cardButton =
  'inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D7377]/40';

const EmptyState = ({ text }) => (
  <p className="rounded-xl border border-dashed border-gray-200 px-4 py-8 text-center text-sm text-gray-500">{text}</p>
);

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
  variant = 'row',
}) => {
  const location = useLocation();
  const { userInfo } = useContext(UserContext);
  const rate = useTopUpRate();
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
        location.pathname,
        { overlay: true }
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
    const points = Number(userInfo?.data?.points) || 0;
    Swal.fire({
      title: 'যোগাযোগ তথ্য অনুরোধ করতে চান?',
      text: `যোগাযোগ তথ্য অনুরোধ করতে আপনার ৭০ পয়েন্ট খরচ হবে। ${costLine(points, 70, rate)}`,
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
        buyWithBkashHandler(takaForPoints(70 - points, rate), bio_user);
      }
    });
  };

  const viewBioIdHandler = (bioId) => {
    navigate(`/biodata/${bioId}`);
  };

  if (variant === 'card') {
    return (
      <article className="space-y-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs text-gray-500">বায়োডাটা নং</p>
            <p className="text-lg font-bold text-gray-900">{item?.bio_id}</p>
          </div>
          <StatusPill status={item?.status} />
        </div>
        {(item?.city || item?.division) && (
          <p className="flex items-center gap-1.5 text-sm text-gray-600">
            <HiOutlineLocationMarker className="h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
            {[item?.city, item?.division].filter(Boolean).join(', ')}
          </p>
        )}
        <StatsLine results={data?.results} />
        <div className="flex gap-2">
          <button type="button" onClick={() => viewBioIdHandler(item?.bio_id)} className={cardButton}>
            <FaEye aria-hidden="true" /> বায়োডাটা
          </button>
          <button type="button" onClick={() => bioDetailsOpenModalHandler(item?.bio_details)} className={cardButton}>
            <FaInfo aria-hidden="true" /> প্রশ্নোত্তর
          </button>
          <button type="button" onClick={() => feedbackDetailsModalHandler(item?.feedback)} className={cardButton}>
            <MdFeedback aria-hidden="true" /> ফিডব্যাক
          </button>
        </div>
        {item?.status === 'approved' && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => payButtonHandler(item?.bio_user)}
              disabled={loading}
              className="inline-flex flex-1 items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
              style={{ background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight})` }}
            >
              {loading ? 'অপেক্ষা করুন...' : 'যোগাযোগ তথ্য নিন (৭০ পয়েন্ট)'}
            </button>
            <button
              type="button"
              onClick={() => setPayBioDetailsModal(true)}
              className="rounded-xl p-2 text-amber-600 hover:bg-amber-50"
              aria-label="যোগাযোগ তথ্য নেওয়ার নিয়ম"
            >
              <AiFillQuestionCircle className="h-6 w-6" />
            </button>
          </div>
        )}
      </article>
    );
  }

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

const SecondStepCard = ({ item, index, variant = 'row' }) => {
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
  if (variant === 'card') {
    const details = [
      ['জন্ম তারিখ', formatDateAndCalculateAge(item?.date_of_birth)?.formattedDate],
      ['স্থায়ী ঠিকানা', item?.permanent_area],
      ['বর্তমান ঠিকানা', item?.present_area],
    ].filter(([, value]) => value);
    return (
      <article className="space-y-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs text-gray-500">বায়োডাটা নং</p>
            <p className="text-lg font-bold text-gray-900">{item?.bio_id}</p>
          </div>
          <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
            কেনা হয়েছে
          </span>
        </div>

        <div className="rounded-xl border border-[#0D7377]/15 bg-[#0D7377]/[0.04] p-3">
          <p className="text-xs text-gray-500">অভিভাবক</p>
          <p className="font-semibold text-gray-900">
            {item?.full_name}
            {item?.relation && <span className="font-normal text-gray-500"> ({item.relation})</span>}
          </p>
          <div className="mt-2 flex flex-col gap-1.5 text-sm">
            {item?.family_number && (
              <a href={`tel:${item.family_number}`} className="flex items-center gap-2 font-semibold text-[#0D7377]">
                <HiOutlinePhone className="h-4 w-4 shrink-0" aria-hidden="true" />
                {item.family_number}
              </a>
            )}
            {item?.bio_receiving_email && (
              <a href={`mailto:${item.bio_receiving_email}`} className="flex min-w-0 items-center gap-2 text-[#0D7377]">
                <HiOutlineMail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="truncate">{item.bio_receiving_email}</span>
              </a>
            )}
          </div>
        </div>

        {details.length > 0 && (
          <dl className="space-y-1 text-sm">
            {details.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-3">
                <dt className="text-gray-500">{label}</dt>
                <dd className="text-right font-medium text-gray-900">{value}</dd>
              </div>
            ))}
          </dl>
        )}

        <StatsLine results={data?.results} />
        <button type="button" onClick={() => viewBioIdHandler(item?.bio_id)} className={`${cardButton} w-full`}>
          <FaEye aria-hidden="true" /> বায়োডাটা দেখুন
        </button>
      </article>
    );
  }

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
        >
          <FaEye size={12} />
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
      <div className="mx-auto py-6 md:py-12">
        <div className="">
          {/*<!-- End of Left Sidebar -->*/}
          <div className="col right-sidebar-main my-favs">
            <div className="w-auto border-t-2 rounded shadow my-favs-info">
              <h5 className="mt-3 px-3 text-xl text-center card-title md:text-2xl">
                আমার শেয়ার করা বায়োডাটার অবস্থা (অনুরোধ পাঠান)
              </h5>
              <h6 className="px-3 py-4 text-center text-xs text-gray-500">
                আপনার নিজের বায়োডাটা যেসকল পাত্র/পাত্রীর সাথে শেয়ার
                করেছেন তাদের তালিকা, ফিডব্যাক ও অবস্থা
              </h6>
              {bioChoiceFirstStepLoading ? (
                <div className="py-8"><LoadingCircle /></div>
              ) : !(bioChoiceFirstStep?.data?.length > 0) ? (
                <div className="px-3 pb-4">
                  <EmptyState text="আপনি এখনো কাউকে প্রস্তাব পাঠাননি। পছন্দের বায়োডাটা থেকে প্রস্তাব পাঠান।" />
                </div>
              ) : (
              <>
              <div className="space-y-3 px-3 pb-4 md:hidden">
                {bioChoiceFirstStep.data.map((item, index) => (
                  <FirstStepCard
                    variant="card"
                    item={item}
                    key={item?._id || index}
                    index={index}
                    setQa={setQa}
                    setFeedback={setFeedback}
                    setIsFeedbackDialogOpen={setIsFeedbackDialogOpen}
                    setBioDetailsModal={setBioDetailsModal}
                    setPayBioDetailsModal={setPayBioDetailsModal}
                    bioChoiceFirstStepRefetch={bioChoiceFirstStepRefetch}
                    bioChoiceSecondStepRefetch={bioChoiceSecondStepRefetch}
                  />
                ))}
              </div>
              <div className="hidden overflow-x-auto md:block">
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
                    {bioChoiceFirstStep.data.map((item, index) => {
                        return (
                          <FirstStepCard
                            item={item}
                            key={item?._id || index}
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
                      })}
                  </tbody>
                </table>
              </div>
              </>
              )}
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
                className="text-base md:text-xl"
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
                className="text-base md:text-xl"
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
              <h5 className="mt-3 px-3 text-xl text-center card-title md:text-2xl">
                আমার ফাইনাল বায়োডাটা ক্রয়সমূহ (যোগাযোগ তথ্য অনুরোধ)
              </h5>
              <h6 className="px-3 py-4 text-center text-xs text-gray-500">
                আপনার অনুরোধ পাঠিয়ে আপ্রুভাল পাওয়ার পর যেসকল
                অভিভাবকের কনটাক্ট নাম্বার পেয়েছেন, তাদের তালিকা
              </h6>
              {bioChoiceSecondStepLoading ? (
                <div className="py-8"><LoadingCircle /></div>
              ) : !(bioChoiceSecondStep?.data?.length > 0) ? (
                <div className="px-3 pb-4">
                  <EmptyState text="এখনো কোনো যোগাযোগ তথ্য কেনা হয়নি। প্রস্তাব গৃহীত হলে এখান থেকে অভিভাবকের তথ্য পাবেন।" />
                </div>
              ) : (
              <>
              <div className="space-y-3 px-3 pb-4 md:hidden">
                {bioChoiceSecondStep.data.map((item, index) => (
                  <SecondStepCard variant="card" key={item?._id || index} index={index} item={item} />
                ))}
              </div>
              <div className="hidden overflow-x-auto md:block">
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
                    {bioChoiceSecondStep.data.map((item, index) => (
                      <SecondStepCard key={item?._id || index} index={index} item={item} />
                    ))}
                  </tbody>
                </table>
              </div>
              </>
              )}
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
