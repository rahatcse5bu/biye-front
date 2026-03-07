/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
import BioContext from '../../contexts/BioContext';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaYoutube } from 'react-icons/fa';
import UserContext from '../../contexts/UserContext';
import { Toast } from '../../utils/toast';
import BkashCreatePaymentAPICall from '../../services/bkash';
import { convertToBengaliNumerals } from '../../utils/weight';
import { getToken } from '../../utils/cookies';
import { BioChoiceDataServices } from '../../services/bioChoiceData';
import { ContactPurchaseDataServices } from '../../services/contactPurchaseData';
import { Colors } from '../../constants/colors';
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import GridQuestionAnswerCard from '../GridQuestionAnswerCard/GridQuestionAnswerCard';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import CustomButton from '../CustomButton/CustomButton';
import CustomModal from '../CustomModal/CustomModal';

const ContactInfo = ({ status }) => {
  const [displayText, setDisplayText] = useState(false);
  const [checkMsg, setCheckMsg] = useState('');
  const { bio } = useContext(BioContext);
  const { userInfo, user } = useContext(UserContext);
  const generalInfo = bio?.generalInfo || null;
  const points = Number(userInfo?.data?.points);
  const [isRejected, setIsRejected] = useState(false);
  const location = useLocation();
  const [isFirstStepDone, setFirstStepDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFirstStepModalOpen, setIsFirstStepModalOpen] = useState(false);
  const [isSecondStepModalOpen, setIsSecondStepModalOpen] = useState(false);

  const { data: contactInfo = null } = useQuery({
    queryKey: ['contact', generalInfo?.user, getToken()?.token],
    queryFn: async () =>
      await BioChoiceDataServices.checkBioChoiceDataSecondStep(
        generalInfo?.user,
        getToken()?.token
      ),
    retry: false,
  });
  const { data: checkFirst = null } = useQuery({
    queryKey: ['first-step', generalInfo?.user],
    queryFn: async () =>
      await BioChoiceDataServices.checkBioChoiceDataFirstStep(
        generalInfo?.user,
        getToken()?.token
      ),
    retry: false,
  });
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
        try {
          setLoading(true);
          const data =
            await ContactPurchaseDataServices.createContactPurchaseData(
              {
                bio_user,
              },
              getToken().token
            );

          if (data.success) {
            Toast.successToast('আপনার বায়োডাটা ক্রয় সম্পূর্ন  হয়েছে।');
            window.location.reload();
          }
        } catch (error) {
          let msg = error;
          Toast.errorToast(msg);
        } finally {
          setLoading(false);
        }
      } else {
        buyWithBkashHandler(
          70 - points,
          bio_user,
          'second_step',
          location.pathname
        );
      }
    });
  };

  // console.log("checkFirst", checkFirst);
  // console.log("contact", contact);
  // console.log("Contact-info~~", contactInfo);

  // console.log({ points });
  const navigate = useNavigate();
  useEffect(() => {
    if (displayText) {
      const timeout = setTimeout(() => {
        // setDisplayText(false);
      }, 10000); // 10 seconds timeout
      return () => clearTimeout(timeout);
    }
  }, [displayText]);

  useEffect(() => {
    if (checkFirst) {
      const status = checkFirst?.data?.status;
      let msg = '';
      if (status) {
        // console.log({ status });
        if (status === 'approved' || status === 'accepted') {
          msg = 'আপনার অনুরোধ পাঠানো সম্পূর্ন হয়েছে।';
          setFirstStepDone(true);
          // Toast.successToast(msg);
          setCheckMsg(msg);
        } else if (status === 'rejected') {
          setIsRejected(true);
          msg = 'দুঃখিত ,আপনি Rejected হয়েছেন এই বায়োডাটা  থেকে।';
          // Toast.successToast(msg);
          setCheckMsg(msg);
          setFirstStepDone(false);
        } else if (status === 'pending') {
          setIsRejected(false);
          msg = 'দুঃখিত ,আপনি পেন্ডিং  আছেন এই বায়োডাটা  থেকে।';
          // Toast.successToast(msg);
          setCheckMsg(msg);
          setFirstStepDone(false);
        }
      }
    } else {
      setCheckMsg('');
      setFirstStepDone(false);
      setIsRejected(false);
    }
  }, [checkFirst]);

  const comHandler = () => {
    if (!userInfo?.data?._id) {
      Toast.errorToast('Please,Login first');
      return;
    }

    Swal.fire({
      title: 'অনুরোধ পাঠাতে চান?',
      text: `অনুরোধ পাঠাতে আপনার ৩০ পয়েন্ট খরচ হবে | ${
        points >= 30
          ? convertToBengaliNumerals((points - 30).toFixed(2).toString()) +
            ' অবশিষ্ট থাকবে'
          : 'আপনার আরও ' +
            convertToBengaliNumerals((30 - points).toFixed(2).toString()) +
            ' পয়েন্ট লাগবে'
      }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok',
    }).then(async (result) => {
      if (!result.isConfirmed) {
        return;
      }

      if (result.isConfirmed && points < 30) {
        setDisplayText(true);
      } else if (result.isConfirmed) {
        navigate(`/send-form/${bio?.generalInfo?.user}`);
      }
    });
  };

  const buyWithBkashHandler = async (value, bioId, purpose) => {
    if (!user?.email) {
      return;
    }
    if (+value > 0) {
      BkashCreatePaymentAPICall(+value, bioId, purpose, location.pathname);
    }
  };

  return (
    <div className="rounded shadow single-bio-contact-info">
      {contactInfo ? (
        <>
          <h5 className="my-3 text-2xl text-center card-title">যোগাযোগ</h5>
          <div className="paid-contact-info">
            <div className="grid grid-cols-1 gap-0 my-3">
              <>
                <GridQuestionAnswerCard
                  question={
                    generalInfo?.gender === 'মহিলা' ||
                    generalInfo?.bio_type === 'পাত্রীর বায়োডাটা'
                      ? 'পাত্রীর নাম'
                      : 'পাত্রের নাম'
                  }
                  answer={contactInfo.data?.contact_info.full_name}
                />
                <GridQuestionAnswerCard
                  question="অভিভাবকের মোবাইল নাম্বার"
                  answer={contactInfo.data?.contact_info.family_number}
                />
                <GridQuestionAnswerCard
                  question="অভিভাবকের ই-মেইল"
                  answer={contactInfo.data?.contact_info.bio_receiving_email}
                />
                <GridQuestionAnswerCard
                  question="অভিভাবকের সাথে সম্পর্ক"
                  answer={contactInfo.data?.contact_info.relation}
                />
              </>
            </div>
            <div className="flex justify-center mt-5">
              <button className="px-4 py-2 text-white mb-4 bg-red-800 rounded bio-report-btn w-93">
                রিপোর্ট করুন
              </button>
            </div>
          </div>
        </>
      ) : status === 'inactive' ? (
        <div className="pnc-bio-hidden">
          <h4 className="my-4 text-center">
            এই বায়োডাটাটি হাইড অবস্থায় আছে। অর্থাৎ এই মুহুর্তে তিনি কোনো
            প্রস্তাব পেতে আগ্রহী নয়। তাই এখন এই বায়োডাটার যোগাযোগ তথ্য দেখা যাবে
            না।
          </h4>
        </div>
      ) : (
        <div className="ask-contact-info p-5">
          <h4 className="my-4 text-center">
            সতর্কতা - বিয়ের সিদ্ধান্ত নেয়ার পূর্বে স্থানীয়ভাবে খোঁজ নিয়ে
            বায়োডাটার সমস্ত তথ্য যাচাই করবেন।
          </h4>
          <h2 className="my-5 text-2xl text-center">
            {isFirstStepDone
              ? 'যোগাযোগ তথ্য অনুরোধ করতে আপনার '
              : 'অনুরোধ পাঠাতে আপনার '}
            {isFirstStepDone
              ? convertToBengaliNumerals('70')
              : convertToBengaliNumerals('30')}
            টি পয়েন্ট খরচ হবে। আপনার একাউন্টে{' '}
            {convertToBengaliNumerals(points.toFixed(2).toString())} পয়েন্ট আছে!
          </h2>
          <div className="flex flex-col items-center justify-center ">
            {displayText ? (
              <div
                onClick={() =>
                  buyWithBkashHandler(
                    30 - points,
                    bio?.generalInfo?.user,
                    'first_Step'
                  )
                }
                className="pb-5"
              >
                <p className="mb-2 text-xl">
                  আপনার একাউন্টে কোনো{' '}
                  {convertToBengaliNumerals(points.toFixed(2).toString())}{' '}
                  পয়েন্ট আছে!
                </p>
                <button
                  className="px-2 py-2 text-white bg-green-800 rounded-md hover:bg-green-900"
                  onClick={() =>
                    buyWithBkashHandler(
                      30 - points,
                      bio?.generalInfo?.user,
                      'first_Step'
                    )
                  }
                >
                  {convertToBengaliNumerals(
                    (30 - points).toFixed(2).toString()
                  )}{' '}
                  পয়েন্ট কিনুন
                </button>
              </div>
            ) : checkMsg ? (
              !isRejected && isFirstStepDone ? (
                <div>
                  <p className="px-5 py-5 mb-5 text-green-900 bg-green-200 border-2 border-green-600 rounded-lg">
                    {checkMsg}
                  </p>{' '}
                  <button
                    onClick={() => payButtonHandler(bio?.generalInfo?.user)}
                    className="px-4 py-2 rounded-lg border  text-white"
                    style={{
                      backgroundColor: Colors.pncPrimaryColor,
                    }}
                  >
                    {loading ? <LoadingCircle /> : 'Pay Now for 2nd Step'}
                  </button>
                </div>
              ) : (
                <p className="px-5 py-1 mb-5 text-green-900 bg-green-200 border-2 border-green-600 rounded-lg">
                  {checkMsg}
                </p>
              )
            ) : (
              <button
                onClick={comHandler}
                className="px-4 py-2 mb-5 text-white bg-blue-500 rounded contact-bio-btn w-93"
              >
                Send Request
              </button>
            )}
          </div>

          <div className="my-5">
            <h3 className="font-semibold text-green-700 md:text-2xl text-xl">
              যোগাযোগ তথ্য কিভাবে দেখবেন জানতে ভিডিও দেখেন
            </h3>

            <div className="flex md:flex-row flex-col gap-5 items-center my-5 ">
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
              <LiteYouTubeEmbed
                id="X6sjWCZjiuQ"
                title="Send Request || অনুরোধ পাঠান || PNC NIkah"
              />
            </CustomModal>
            <CustomModal
              onClose={() => setIsSecondStepModalOpen(false)}
              isOpen={isSecondStepModalOpen}
              title="যোগাযোগ তথ্য অনুরোধের নিয়ম"
            >
              <LiteYouTubeEmbed
                id="x0-RXTR0DfQ"
                title="Contact Info Request || যোগাযোগ তথ্য অনুরোধ || PNC NIkah"
              />
            </CustomModal>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactInfo;
