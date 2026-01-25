/* eslint-disable react/prop-types */
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

const BioData = ({ biodata }) => {
  const navigate = useNavigate();

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
        <img
          className="w-16 h-16 mx-auto rounded-full "
          src={
            biodata?.gender === 'মহিলা'
              ? '/assets/icons/female.svg'
              : '/assets/icons/male.svg'
          }
          alt=""
        />
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
      
      {/* Reaction Buttons */}
      <div className="mx-2 mb-4 flex justify-center">
        <ReactionButton 
          bioUserId={biodata?.user} 
          initialCounts={{
            like: biodata?.likes_count || 0,
            dislike: biodata?.dislikes_count || 0,
          }}
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
    </div>
  );
};

export default BioData;
