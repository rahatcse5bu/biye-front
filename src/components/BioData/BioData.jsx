/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button } from '@material-tailwind/react';
import { Colors } from '../../constants/colors';
import {
  formatDate,
  formatDateAndCalculateAge,
  getDateMonthYear,
} from '../../utils/date';
import { useNavigate } from 'react-router-dom';
import { ScrollToTop } from '../../constants/ScrolltoTop';
import { FaEye } from 'react-icons/fa';
import { convertHeightToBengali } from '../../utils/height';
import { GeneralInfoServices } from '../../services/generalInfo';
import ReactionButton from '../ReactionButton/ReactionButton';
import PhotoViewer from '../PhotoViewer/PhotoViewer';

// Helper function to get combined religion + type display name
const getReligionBadgeLabel = (religion, religiousType) => {
  switch (religion) {
    case 'islam':
      return religiousType === 'practicing_muslim' ? 'প্র্যাক্টিসিং মুসলিম' : 'মুসলিম';
    case 'hinduism':
      return religiousType === 'practicing_hindu' ? 'প্র্যাক্টিসিং হিন্দু' : 'হিন্দু';
    case 'christianity':
      return religiousType === 'practicing_christian' ? 'প্র্যাক্টিসিং খ্রিস্টান' : 'খ্রিস্টান';
    default:
      return 'মুসলিম';
  }
};

// Helper function to get badge color based on religion
const getBadgeColor = (religion) => {
  switch (religion) {
    case 'islam':
      return 'bg-green-600';
    case 'hinduism':
      return 'bg-orange-500';
    case 'christianity':
      return 'bg-blue-600';
    default:
      return 'bg-green-600';
  }
};

const BioData = ({ biodata }) => {
  const navigate = useNavigate();
  const [showViewer, setShowViewer] = useState(false);

  const hasMalePhotos =
    biodata?.gender !== 'মহিলা' &&
    biodata?.photos &&
    biodata.photos.length > 0;

  const bioDataHandler = async () => {
    if (biodata?._id) {
      try {
        await GeneralInfoServices.updateWatchOfBioData(biodata?._id);
      } catch (error) {
        console.error('Error incrementing view count', error);
      }
    }
    navigate(`/biodata/${biodata?.user_id}`);
  };

  return (
    <div className="my-5 min-w-[280px] relative hover:shadow-2xl transition-all  duration-300 ease-in rounded-md border-2">
      <ScrollToTop />
      <div
        style={{
          backgroundColor: Colors.pncPrimaryColor,
        }}
        className="h-[200px] min flex relative  flex-col justify-center rounded-t-md text-white"
      >
        <div
          className={`relative w-16 mx-auto ${hasMalePhotos ? 'cursor-pointer group' : ''}`}
          onClick={(e) => {
            if (hasMalePhotos) {
              e.stopPropagation();
              setShowViewer(true);
            }
          }}
        >
          <img
            className="w-16 h-16 mx-auto rounded-full object-cover"
            src={
              biodata?.gender === 'মহিলা'
                ? '/assets/icons/female.svg'
                : hasMalePhotos
                ? biodata.photos[0]
                : '/assets/icons/male.svg'
            }
            alt=""
          />
          {hasMalePhotos && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black/60 text-white text-[10px] px-2 py-[2px] rounded-full transition-opacity whitespace-nowrap">
              দেখুন
            </span>
          )}
        </div>
        <h4 className="my-2"> বায়োডাটা নং </h4>
        <h3>
          {biodata?.gender === 'মহিলা' ? 'PNCF-' : 'PNCM-'}
          {biodata?.user_id}
        </h3>
        {/* view icons */}
        <div className="flex absolute top-2 left-2">
          <FaEye className="w-6 h-6 mr-2" />
          {biodata?.views_count}
        </div>
        
        {/* Religion Badge */}
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold text-white ${getBadgeColor(biodata?.religion)}`}>
          {getReligionBadgeLabel(biodata?.religion, biodata?.religious_type)}
        </div>
      </div>
      <div className="mx-2 mt-4">
        <table className="min-w-full divide-y divide-gray-200 border-0 border-gray-300">
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap border-r border-t border-b">
                জন্মসন
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap border-b border-t">
                {formatDate(getDateMonthYear(biodata?.date_of_birth))}
                <b className="text-indigo-900">
                  {` [${formatDateAndCalculateAge(biodata?.date_of_birth)?.age} বছর]`}
                </b>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap border-r  border-b">
                উচ্চতা{' '}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-b">
                <span>{convertHeightToBengali(biodata?.height)}</span>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap border-r border-b">
                গাত্রবর্ন{' '}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-b">
                {biodata?.screen_color}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap border-r border-b">
                উপজেলা{' '}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-b">
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

      <div className="my-4">
        <Button
          onClick={bioDataHandler}
          className=" rounded-3xl"
          style={{
            background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight} )`,
          }}
        >
          সম্পূর্ন বায়োডাটা
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
    </div>
  );
};

export default BioData;
