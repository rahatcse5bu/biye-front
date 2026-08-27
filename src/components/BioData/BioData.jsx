/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button } from '@material-tailwind/react';
import {
  formatDate,
  formatDateAndCalculateAge,
  getDateMonthYear,
} from '../../utils/date';
import { useNavigate } from '@/lib/navigation';
import { ScrollToTop } from '../../constants/ScrolltoTop';
import { FaEye } from 'react-icons/fa';
import { convertHeightToBengali } from '../../utils/height';
import { GeneralInfoServices } from '../../services/generalInfo';
import ReactionButton from '../ReactionButton/ReactionButton';
import PhotoViewer from '../PhotoViewer/PhotoViewer';
import BiodataTypeBadge from '../BiodataTypeBadge/BiodataTypeBadge';
import { religionToApiKey } from '../../constants/religionContent';

const RELIGION_LABELS = {
  islam: {
    base: 'মুসলিম',
    practicing: 'প্র্যাক্টিসিং মুসলিম',
    color: 'bg-green-600',
  },
  hinduism: {
    base: 'হিন্দু',
    practicing: 'প্র্যাক্টিসিং হিন্দু',
    color: 'bg-orange-500',
  },
  christianity: {
    base: 'খ্রিস্টান',
    practicing: 'প্র্যাক্টিসিং খ্রিস্টান',
    color: 'bg-blue-600',
  },
};

const PRACTICING_TYPES = new Set([
  'practicing_muslim',
  'practicing_hindu',
  'practicing_christian',
]);

const getReligionKey = (religion) =>
  religionToApiKey[religion] || religion || 'islam';

const getReligionBadgeLabel = (religion, religiousType) => {
  const key = getReligionKey(religion);
  const entry = RELIGION_LABELS[key] || RELIGION_LABELS.islam;
  return PRACTICING_TYPES.has(religiousType) ? entry.practicing : entry.base;
};

const getBadgeColor = (religion) => {
  const key = getReligionKey(religion);
  return (RELIGION_LABELS[key] || RELIGION_LABELS.islam).color;
};

const BioData = ({ biodata }) => {
  const navigate = useNavigate();
  const [showViewer, setShowViewer] = useState(false);

  const hasMalePhotos =
    biodata?.gender !== 'মহিলা' && biodata?.photos && biodata.photos.length > 0;
  const profileImage =
    biodata?.gender === 'মহিলা'
      ? '/assets/icons/female.svg'
      : hasMalePhotos
        ? biodata.photos[0]
        : '/assets/icons/male.svg';
  const profileImageAlt = `বায়োডাটা BID-${
    biodata?.is_unverified ? biodata?.bio_id : biodata?.user_id
  } এর প্রোফাইল`;

  const bioDataHandler = async () => {
    if (biodata?._id) {
      try {
        await GeneralInfoServices.updateWatchOfBioData(biodata?._id);
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
    <article className="relative min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-900/20 hover:shadow-lg motion-reduce:transform-none motion-reduce:transition-none">
      <ScrollToTop />
      <div className="relative flex h-[176px] flex-col justify-center bg-brand-900 text-center text-white">
        {hasMalePhotos ? (
          <button
            type="button"
            className="group relative mx-auto w-16 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900"
            onClick={(event) => {
              event.stopPropagation();
              setShowViewer(true);
            }}
            aria-label="প্রোফাইলের ছবি দেখুন"
          >
            <img
              className="mx-auto h-16 w-16 rounded-2xl border-2 border-white/50 bg-white/10 object-cover"
              src={profileImage}
              alt={profileImageAlt}
              width="64"
              height="64"
            />
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white">
              দেখুন
            </span>
          </button>
        ) : (
          <div className="relative mx-auto w-16">
            <img
              className="mx-auto h-16 w-16 rounded-2xl border-2 border-white/50 bg-white/10 object-cover"
              src={profileImage}
              alt={profileImageAlt}
              width="64"
              height="64"
            />
          </div>
        )}
        <p className="mb-1 mt-3 text-xs font-semibold text-white/65">
          বায়োডাটা নম্বর
        </p>
        <h3 className="text-lg font-bold tracking-wide">
          {'BID-'}
          {biodata?.is_unverified ? biodata?.bio_id : biodata?.user_id}
        </h3>
        {/* view icons */}
        <div
          className="absolute left-3 top-3 flex items-center rounded-full bg-black/15 px-2 py-1 text-xs"
          aria-label={`${biodata?.views_count || 0} বার দেখা হয়েছে`}
        >
          <FaEye className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
          {biodata?.views_count}
        </div>

        {/* Religion Badge */}
        <div
          className={`absolute right-3 top-3 rounded-full px-2 py-1 text-[11px] font-semibold text-white ${getBadgeColor(biodata?.religion)}`}
        >
          {getReligionBadgeLabel(biodata?.religion, biodata?.religious_type)}
        </div>

        {/* Unverified Badge */}
        <BiodataTypeBadge
          isUnverified={biodata?.is_unverified}
          position="top-12 right-2"
        />
      </div>
      <div className="px-4 pt-4">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-100">
            <tr>
              <th
                scope="row"
                className="whitespace-nowrap py-3 pr-3 text-left font-semibold text-gray-500"
              >
                জন্মসন
              </th>
              <td className="py-3 text-right text-gray-800">
                {formatDate(getDateMonthYear(biodata?.date_of_birth))}
                <b className="text-indigo-900">
                  {` [${formatDateAndCalculateAge(biodata?.date_of_birth)?.age} বছর]`}
                </b>
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                className="whitespace-nowrap py-3 pr-3 text-left font-semibold text-gray-500"
              >
                উচ্চতা
              </th>
              <td className="py-3 text-right text-gray-800">
                <span>{convertHeightToBengali(biodata?.height)}</span>
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                className="whitespace-nowrap py-3 pr-3 text-left font-semibold text-gray-500"
              >
                গাত্রবর্ণ
              </th>
              <td className="py-3 text-right text-gray-800">
                {biodata?.screen_color}
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                className="whitespace-nowrap py-3 pr-3 text-left font-semibold text-gray-500"
              >
                উপজেলা
              </th>
              <td className="py-3 text-right text-gray-800">
                {biodata?.upzilla}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Enhanced Reaction Section - Facebook Style */}
      <div className="bg-white border-t border-gray-100">
        <ReactionButton
          bioUserId={biodata?.user}
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

      <div className="p-4 pt-3">
        <Button
          onClick={bioDataHandler}
          className="w-full rounded-xl bg-brand-900 py-3 text-sm shadow-none transition-colors duration-200 hover:bg-[#0F8287] hover:shadow-none focus:ring-2 focus:ring-brand-900 focus:ring-offset-2"
        >
          সম্পূর্ণ বায়োডাটা দেখুন
        </Button>
      </div>

      {/* Photo Viewer Modal */}
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
