import { useState } from 'react';
import {
  ArrowRightIcon,
  ArrowsPointingOutIcon,
  CalendarDaysIcon,
  CheckBadgeIcon,
  MapPinIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { FaEye } from 'react-icons/fa';
import { useNavigate } from '@/lib/navigation';
import {
  formatDate,
  formatDateAndCalculateAge,
  getDateMonthYear,
} from '../../utils/date';
import { ScrollToTop } from '../../constants/ScrolltoTop';
import { convertHeightToBengali } from '../../utils/height';
import { GeneralInfoServices } from '../../services/generalInfo';
import { religionToApiKey } from '../../constants/religionContent';
import BiodataTypeBadge from '../BiodataTypeBadge/BiodataTypeBadge';
import PhotoViewer from '../PhotoViewer/PhotoViewer';
import ReactionButton from '../ReactionButton/ReactionButton';

const RELIGION_LABELS = {
  islam: {
    base: 'মুসলিম',
    practicing: 'প্র্যাক্টিসিং মুসলিম',
    color: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  },
  hinduism: {
    base: 'হিন্দু',
    practicing: 'প্র্যাক্টিসিং হিন্দু',
    color: 'bg-orange-50 text-orange-700 ring-orange-200',
  },
  christianity: {
    base: 'খ্রিস্টান',
    practicing: 'প্র্যাক্টিসিং খ্রিস্টান',
    color: 'bg-blue-50 text-blue-700 ring-blue-200',
  },
};

const PRACTICING_TYPES = new Set([
  'practicing_muslim',
  'practicing_hindu',
  'practicing_christian',
]);

const getReligionKey = (religion) =>
  religionToApiKey[religion] || religion || 'islam';

const getReligionBadge = (religion, religiousType) => {
  const key = getReligionKey(religion);
  const entry = RELIGION_LABELS[key] || RELIGION_LABELS.islam;

  return {
    label: PRACTICING_TYPES.has(religiousType) ? entry.practicing : entry.base,
    color: entry.color,
  };
};

const getDisplayValue = (value) => value || 'উল্লেখ করা হয়নি';

const BioData = ({ biodata }) => {
  const navigate = useNavigate();
  const [showViewer, setShowViewer] = useState(false);

  const hasMalePhotos =
    biodata?.gender !== 'মহিলা' &&
    Array.isArray(biodata?.photos) &&
    biodata.photos.length > 0;
  const profileImage =
    biodata?.gender === 'মহিলা'
      ? '/assets/icons/female.svg'
      : hasMalePhotos
        ? biodata.photos[0]
        : '/assets/icons/male.svg';
  const biodataNumber = biodata?.is_unverified
    ? biodata?.bio_id
    : biodata?.user_id;
  const profileImageAlt = `বায়োডাটা BID-${biodataNumber || ''} এর প্রোফাইল`;
  const viewCount = Number(biodata?.views_count) || 0;
  const canReact = !biodata?.is_unverified && Boolean(biodata?.user);
  const religionBadge = getReligionBadge(
    biodata?.religion,
    biodata?.religious_type
  );
  const ageInfo = biodata?.date_of_birth
    ? formatDateAndCalculateAge(biodata.date_of_birth)
    : null;
  const birthYear = biodata?.date_of_birth
    ? formatDate(getDateMonthYear(biodata.date_of_birth))
    : null;

  const details = [
    {
      label: 'বয়স',
      value: ageInfo?.age ? `${ageInfo.age} বছর` : 'উল্লেখ করা হয়নি',
      secondary: birthYear ? `জন্মসন ${birthYear}` : null,
      Icon: CalendarDaysIcon,
    },
    {
      label: 'উচ্চতা',
      value: biodata?.height
        ? convertHeightToBengali(biodata.height)
        : 'উল্লেখ করা হয়নি',
      Icon: ArrowsPointingOutIcon,
    },
    {
      label: 'গাত্রবর্ণ',
      value: getDisplayValue(biodata?.screen_color),
      Icon: SparklesIcon,
    },
    {
      label: 'উপজেলা',
      value: getDisplayValue(biodata?.upzilla),
      Icon: MapPinIcon,
    },
  ];

  const bioDataHandler = async () => {
    if (biodata?._id) {
      try {
        await GeneralInfoServices.updateWatchOfBioData(biodata._id);
      } catch (error) {
        console.error('Error incrementing view count', error);
      }
    }

    if (biodata?.is_unverified) {
      navigate(`/biodata/unverified/${biodata?._id}`);
    } else {
      navigate(`/biodata/${biodata?.user_id}`);
    }
  };

  return (
    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:border-brand-900/25 hover:shadow-lg motion-reduce:transition-none">
      <ScrollToTop />

      <header className="relative bg-brand-900 px-4 pb-5 pt-4 text-center text-white">
        <div className="flex min-h-7 items-start justify-between gap-2">
          <div
            className="inline-flex items-center rounded-full bg-black/15 px-2.5 py-1 text-xs font-semibold text-white/90"
            aria-label={`${viewCount} বার দেখা হয়েছে`}
          >
            <FaEye className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
            {viewCount.toLocaleString('bn-BD')}
          </div>

          <span
            className={`max-w-[65%] rounded-full px-2.5 py-1 text-[11px] font-bold leading-4 ring-1 ${religionBadge.color}`}
          >
            {religionBadge.label}
          </span>
        </div>

        <BiodataTypeBadge
          isUnverified={biodata?.is_unverified}
          position="top-12 right-4"
        />

        {hasMalePhotos ? (
          <button
            type="button"
            className="relative mx-auto mt-2 block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900"
            onClick={() => setShowViewer(true)}
            aria-label="প্রোফাইলের ছবি দেখুন"
          >
            <img
              className="h-20 w-20 rounded-2xl border-2 border-white/70 bg-white/10 object-cover shadow-md"
              src={profileImage}
              alt={profileImageAlt}
              width="80"
              height="80"
            />
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-brand-900 shadow-sm">
              ছবি দেখুন
            </span>
          </button>
        ) : (
          <img
            className="mx-auto mt-2 h-20 w-20 rounded-2xl border-2 border-white/70 bg-white/10 object-cover shadow-md"
            src={profileImage}
            alt={profileImageAlt}
            width="80"
            height="80"
          />
        )}

        <p className="mb-1 mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
          বায়োডাটা নম্বর
        </p>
        <div className="flex items-center justify-center gap-1.5">
          {!biodata?.is_unverified && (
            <CheckBadgeIcon
              className="h-5 w-5 text-emerald-300"
              aria-label="যাচাইকৃত বায়োডাটা"
            />
          )}
          <h2 className="text-xl font-bold tracking-wide">
            BID-{biodataNumber || '—'}
          </h2>
        </div>
      </header>

      <div className="flex-1 px-4 py-4">
        <dl className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/70">
          {details.map(({ label, value, secondary, Icon }) => (
            <div
              key={label}
              className="flex min-h-14 items-center gap-3 px-3 py-2.5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-900/10 text-brand-900">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <dt className="min-w-0 flex-1">
                <span className="block text-xs font-semibold text-gray-500">
                  {label}
                </span>
                {secondary && (
                  <span className="mt-0.5 block text-[11px] text-gray-400">
                    {secondary}
                  </span>
                )}
              </dt>
              <dd className="max-w-[52%] text-right text-sm font-bold leading-5 text-gray-800">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {canReact && (
        <div className="mx-4 rounded-xl border border-gray-100 bg-gray-50">
          <ReactionButton
            bioUserId={biodata.user}
            initialCounts={{
              like: biodata?.likes_count || 0,
              dislike: biodata?.dislikes_count || 0,
              love: biodata?.love_count || 0,
              wow: biodata?.wow_count || 0,
              sad: biodata?.sad_count || 0,
              angry: biodata?.angry_count || 0,
            }}
            showCommentButton={false}
          />
        </div>
      )}

      <div className="p-4">
        <button
          type="button"
          onClick={bioDataHandler}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-900 px-4 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#0F8287] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2"
        >
          সম্পূর্ণ বায়োডাটা দেখুন
          <ArrowRightIcon
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none"
            aria-hidden="true"
          />
        </button>
      </div>

      {hasMalePhotos && (
        <PhotoViewer
          photos={biodata.photos}
          initialIndex={0}
          isOpen={showViewer}
          onClose={() => setShowViewer(false)}
        />
      )}
    </article>
  );
};

export default BioData;
