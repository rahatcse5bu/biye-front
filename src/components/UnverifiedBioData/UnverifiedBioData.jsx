/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { Colors } from '../../constants/colors';
import { formatDate, formatDateAndCalculateAge, getDateMonthYear } from '../../utils/date';
import { convertHeightToBengali } from '../../utils/height';
import { FaEye, FaShieldAlt } from 'react-icons/fa';
import { Button } from '@material-tailwind/react';
import { ScrollToTop } from '../../constants/ScrolltoTop';

const RELIGION_LABELS = {
  islam: { base: 'মুসলিম', color: 'bg-green-600' },
  hinduism: { base: 'হিন্দু', color: 'bg-orange-500' },
  christianity: { base: 'খ্রিস্টান', color: 'bg-blue-600' },
};

const UnverifiedBioData = ({ biodata }) => {
  const navigate = useNavigate();

  const religionKey = biodata?.religion || 'islam';
  const religionInfo = RELIGION_LABELS[religionKey] || RELIGION_LABELS.islam;

  const handleClick = () => {
    navigate(`/biodata/unverified/${biodata?._id}`);
  };

  return (
    <div className="my-5 min-w-[280px] relative hover:shadow-2xl transition-all duration-300 ease-in rounded-md border-2 border-dashed border-gray-300">
      <ScrollToTop />

      {/* Unverified ribbon */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
        <span className="bg-amber-500 text-white text-[10px] font-semibold px-3 py-0.5 rounded-full shadow">
          অযাচাইকৃত
        </span>
      </div>

      <div
        style={{ backgroundColor: Colors.pncPrimaryColor }}
        className="h-[200px] flex relative flex-col justify-center rounded-t-md text-white opacity-80"
      >
        <div className="relative w-16 mx-auto">
          <img
            className="w-16 h-16 mx-auto rounded-full object-cover"
            src={
              biodata?.gender === 'মহিলা'
                ? '/assets/icons/female.svg'
                : '/assets/icons/male.svg'
            }
            alt=""
          />
        </div>
        <h4 className="my-2">বায়োডাটা নং</h4>
        <h3>{'UB-'}{biodata?.bio_id?.toString().slice(-6)}</h3>

        {/* view count */}
        <div className="flex absolute top-2 left-2">
          <FaEye className="w-6 h-6 mr-2" />
          {biodata?.views_count || 0}
        </div>

        {/* Religion badge */}
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold text-white ${religionInfo.color}`}>
          {religionInfo.base}
        </div>
      </div>

      <div className="mx-2 mt-4">
        <table className="min-w-full divide-y divide-gray-200 border-0 border-gray-300">
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap border-r border-t border-b">জন্মসন</td>
              <td className="px-6 py-4 text-sm whitespace-nowrap border-b border-t">
                {formatDate(getDateMonthYear(biodata?.date_of_birth))}
                <b className="text-indigo-900">
                  {` [${formatDateAndCalculateAge(biodata?.date_of_birth)?.age} বছর]`}
                </b>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap border-r border-b">উচ্চতা</td>
              <td className="px-6 py-4 whitespace-nowrap border-b">
                {convertHeightToBengali(biodata?.height)}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap border-r border-b">গাত্রবর্ন</td>
              <td className="px-6 py-4 whitespace-nowrap border-b">{biodata?.screen_color}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap border-r border-b">উপজেলা</td>
              <td className="px-6 py-4 whitespace-nowrap border-b">{biodata?.upzilla || biodata?.zilla}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 50 points badge */}
      <div className="mx-4 mt-3 flex items-center gap-2 text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs">
        <FaShieldAlt className="w-3 h-3 flex-shrink-0" />
        <span>যোগাযোগ পেতে মাত্র <strong>৫০ পয়েন্ট</strong> খরচ হবে</span>
      </div>

      <div className="my-4">
        <Button
          onClick={handleClick}
          className="rounded-3xl"
          style={{
            background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight})`,
          }}
        >
          সম্পূর্ন বায়োডাটা
        </Button>
      </div>
    </div>
  );
};

export default UnverifiedBioData;
