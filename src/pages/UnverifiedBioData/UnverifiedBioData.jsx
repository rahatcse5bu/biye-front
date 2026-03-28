import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useState, useEffect } from 'react';
import { FcLeft } from 'react-icons/fc';
import { FaShieldAlt, FaPhone, FaEnvelope, FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';
import UserContext from '../../contexts/UserContext';
import { UnverifiedBioDataServices } from '../../services/unverifiedBioData';
import { getToken } from '../../utils/cookies';
import { formatDate, formatDateAndCalculateAge, getDateMonthYear } from '../../utils/date';
import { convertHeightToBengali } from '../../utils/height';
import { convertToBengaliNumerals } from '../../utils/weight';
import { Toast } from '../../utils/toast';
import LoadingCircle from '../../components/LoadingCircle/LoadingCircle';
import ScrollToTop from '../../components/ScrollTop/ScrollTop';
import GridQuestionAnswerCard from '../../components/GridQuestionAnswerCard/GridQuestionAnswerCard';
import AdditionalInfoSection from '../../components/AdditionalInfoSection/AdditionalInfoSection';
import { ShortlistServices } from '../../services/shortlist';
import { Colors } from '../../constants/colors';

const RELIGION_LABELS = {
  islam: { base: 'মুসলিম', color: 'bg-green-600' },
  hinduism: { base: 'হিন্দু', color: 'bg-orange-500' },
  christianity: { base: 'খ্রিস্টান', color: 'bg-blue-600' },
};

const COST = 50;

const UnverifiedBioData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [contactData, setContactData] = useState(null);
  const [isShortlisted, setIsShortlisted] = useState(false);
  const token = getToken()?.token;

  const { isLoading, data, isError } = useQuery({
    queryKey: ['unverified-biodata', id],
    queryFn: () => UnverifiedBioDataServices.getById(id),
    retry: false,
    enabled: !!id,
  });

  // Check if already purchased
  const { data: purchaseStatus } = useQuery({
    queryKey: ['unverified-purchase-check', id, userInfo?.data?._id],
    queryFn: () => UnverifiedBioDataServices.checkPurchase(id, getToken()?.token),
    retry: false,
    enabled: !!userInfo?.data?._id && !!id,
  });

  useEffect(() => {
    if (purchaseStatus?.purchased && purchaseStatus?.data) {
      setContactData(purchaseStatus.data);
    }
  }, [purchaseStatus]);

  const { data: shortlistStatus } = useQuery({
    queryKey: ['unverified-shortlist-check', id],
    queryFn: () => ShortlistServices.checkUnverifiedShortlist(id, token),
    retry: false,
    enabled: !!token && !!id,
  });

  useEffect(() => {
    if (shortlistStatus?.data?.shortlisted !== undefined) {
      setIsShortlisted(shortlistStatus.data.shortlisted);
    }
  }, [shortlistStatus]);

  const shortlistMutation = useMutation({
    mutationFn: () => ShortlistServices.toggleUnverifiedShortlist(id, token),
    onSuccess: (data) => {
      setIsShortlisted(data?.data?.shortlisted);
      queryClient.invalidateQueries({ queryKey: ['unverified-shortlist-check', id] });
      Toast.successToast(data?.message || 'Shortlist updated');
    },
    onError: () => Toast.errorToast('Failed to update shortlist'),
  });

  const handleShortlist = () => {
    if (!token) {
      Toast.errorToast('Please login to shortlist');
      navigate('/login');
      return;
    }
    shortlistMutation.mutate();
  };

  const biodata = data?.data;
  const points = Number(userInfo?.data?.points || 0);
  const religionKey = biodata?.religion || 'islam';
  const religionInfo = RELIGION_LABELS[religionKey] || RELIGION_LABELS.islam;

  const handlePurchase = () => {
    if (!userInfo?.data?._id) {
      Toast.errorToast('Please login first');
      navigate('/login');
      return;
    }

    Swal.fire({
      title: 'যোগাযোগ তথ্য কিনবেন?',
      text: `যোগাযোগ তথ্য পেতে আপনার ${COST} পয়েন্ট খরচ হবে। ${
        points >= COST
          ? `${convertToBengaliNumerals((points - COST).toString())} পয়েন্ট অবশিষ্ট থাকবে।`
          : `আপনার আরও ${convertToBengaliNumerals((COST - points).toString())} পয়েন্ট প্রয়োজন।`
      }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ঠিক আছে',
      cancelButtonText: 'বাতিল',
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      if (points < COST) {
        Toast.errorToast(`আপনার পর্যাপ্ত পয়েন্ট নেই। পয়েন্ট কিনুন।`);
        navigate('/points-package');
        return;
      }

      try {
        setLoading(true);
        const res = await UnverifiedBioDataServices.purchaseContact(id, getToken()?.token);
        if (res.success) {
          setContactData(res.data);
          Toast.successToast('যোগাযোগ তথ্য সফলভাবে পাওয়া গেছে!');
        }
      } catch (err) {
        const msg = err?.response?.data?.message || 'কিছু একটা সমস্যা হয়েছে।';
        Toast.errorToast(msg);
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <div className="py-2 w-full">
      <ScrollToTop />
      <div
        onClick={() => navigate(-1)}
        className="flex flex-row cursor-pointer mb-4"
      >
        <FcLeft className="w-8 h-6 text-white" />
        <strong className="text-indigo-600">Back</strong>
      </div>

      {isLoading ? (
        <LoadingCircle classes="my-10 h-[500px]" />
      ) : isError || !biodata ? (
        <div className="bg-red-50 p-10 rounded-sm border border-red-300 m-5">
          <h4 className="text-red-900 font-semibold">বায়োডাটা পাওয়া যায়নি</h4>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          {/* Unverified banner */}
          <div className="mb-4 p-3 bg-amber-50 border border-amber-300 rounded-lg flex items-center gap-3">
            <FaShieldAlt className="text-amber-600 w-5 h-5 flex-shrink-0" />
            <div>
              <p className="text-amber-800 font-semibold text-sm">অযাচাইকৃত বায়োডাটা</p>
              <p className="text-amber-700 text-xs">
                এই বায়োডাটাটি সরাসরি অ্যাডমিন কর্তৃক যোগ করা হয়েছে। বিয়ের সিদ্ধান্ত নেওয়ার আগে স্থানীয়ভাবে যাচাই করুন।
              </p>
            </div>
          </div>

          {/* Header card */}
          <div
            className="rounded-t-xl text-white text-center py-8 px-4"
            style={{ backgroundColor: Colors.pncPrimaryColor }}
          >
            <img
              className="w-20 h-20 mx-auto rounded-full object-cover mb-3 opacity-80"
              src={biodata.gender === 'মহিলা' ? '/assets/icons/female.svg' : '/assets/icons/male.svg'}
              alt=""
            />
            <p className="text-sm opacity-80">বায়োডাটা নং</p>
            <h2 className="text-2xl font-bold">UB-{biodata.bio_id?.toString().slice(-6)}</h2>
            <div className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${religionInfo.color}`}>
              {religionInfo.base}
            </div>
          </div>

          {/* Shortlist button */}
          <div className="flex justify-center py-3 bg-white border-x border-gray-200">
            <button
              onClick={handleShortlist}
              disabled={shortlistMutation.isPending}
              className={`px-8 py-2 rounded-full text-white text-sm font-semibold transition-all duration-300 disabled:opacity-50 ${
                isShortlisted
                  ? 'bg-yellow-500 hover:bg-yellow-600'
                  : 'bg-green-700 hover:bg-green-600'
              }`}
            >
              {shortlistMutation.isPending
                ? 'Loading...'
                : isShortlisted
                ? 'Shortlisted ✓'
                : 'Shortlist'}
            </button>
          </div>

          {/* Info table */}
          <div className="bg-white border border-gray-200 rounded-b-xl shadow-sm mb-6">
            <div className="grid grid-cols-1 divide-y divide-gray-100">
              <GridQuestionAnswerCard question="বায়োডাটার ধরন" answer={biodata.bio_type} />
              <GridQuestionAnswerCard
                question="জন্মসন"
                answer={`${formatDate(getDateMonthYear(biodata.date_of_birth))} [${formatDateAndCalculateAge(biodata.date_of_birth)?.age} বছর]`}
              />
              <GridQuestionAnswerCard question="উচ্চতা" answer={convertHeightToBengali(biodata.height)} />
              <GridQuestionAnswerCard question="ওজন" answer={`${biodata.weight} কেজি`} />
              <GridQuestionAnswerCard question="গাত্রবর্ণ" answer={biodata.screen_color} />
              <GridQuestionAnswerCard question="রক্তের গ্রুপ" answer={biodata.blood_group} />
              <GridQuestionAnswerCard question="বৈবাহিক অবস্থা" answer={biodata.marital_status} />
              <GridQuestionAnswerCard question="জাতীয়তা" answer={biodata.nationality} />
              <GridQuestionAnswerCard question="বিভাগ" answer={biodata.division || '—'} />
              <GridQuestionAnswerCard question="জেলা" answer={biodata.zilla} />
              <GridQuestionAnswerCard question="উপজেলা" answer={biodata.upzilla || '—'} />
            </div>
          </div>

          {/* Additional Info Section — above contact */}
          <AdditionalInfoSection
            fields={biodata.extra_fields}
            isPurchased={true}
          />

          {/* Contact section */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">যোগাযোগ তথ্য</h3>

            {contactData ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <FaUser className="text-green-600 w-4 h-4" />
                  <div>
                    <p className="text-xs text-gray-500">নাম</p>
                    <p className="font-semibold text-gray-800">{contactData.contact_name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <FaPhone className="text-green-600 w-4 h-4" />
                  <div>
                    <p className="text-xs text-gray-500">ফোন</p>
                    <p className="font-semibold text-gray-800">{contactData.contact_phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <FaEnvelope className="text-green-600 w-4 h-4" />
                  <div>
                    <p className="text-xs text-gray-500">ইমেইল</p>
                    <p className="font-semibold text-gray-800">{contactData.contact_email}</p>
                  </div>
                </div>
              </div>
            ) : !userInfo?.data?._id ? (
              <div className="text-center py-6">
                <p className="text-gray-600 mb-4">যোগাযোগ তথ্য দেখতে লগইন করুন</p>
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  লগইন করুন
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                  যোগাযোগ তথ্য পেতে আপনার{' '}
                  <strong className="text-indigo-700">{convertToBengaliNumerals(COST.toString())} পয়েন্ট</strong>{' '}
                  খরচ হবে।
                  <br />
                  আপনার বর্তমান পয়েন্ট:{' '}
                  <strong className={points >= COST ? 'text-green-700' : 'text-red-600'}>
                    {convertToBengaliNumerals(points.toString())}
                  </strong>
                </div>
                <button
                  onClick={handlePurchase}
                  disabled={loading}
                  className="px-8 py-3 text-white rounded-xl font-semibold text-base disabled:opacity-60"
                  style={{
                    background: `linear-gradient(to right, ${Colors.lnLeft}, ${Colors.lnRight})`,
                  }}
                >
                  {loading ? (
                    <LoadingCircle />
                  ) : (
                    `যোগাযোগ তথ্য দেখুন (${convertToBengaliNumerals(COST.toString())} পয়েন্ট)`
                  )}
                </button>
                {points < COST && (
                  <p className="mt-3 text-sm text-red-600">
                    পর্যাপ্ত পয়েন্ট নেই।{' '}
                    <span
                      onClick={() => navigate('/points-package')}
                      className="underline cursor-pointer text-indigo-600"
                    >
                      পয়েন্ট কিনুন
                    </span>
                  </p>
                )}
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
};

export default UnverifiedBioData;
