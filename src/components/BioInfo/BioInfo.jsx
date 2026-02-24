/* eslint-disable react/prop-types */
import { useContext } from "react";
import female from "../../assets/icons/female.svg";
import male from "../../assets/icons/male.svg";
import { Colors } from "../../constants/colors";
import BioContext from "../../contexts/BioContext";
import { getDateMonthYear } from "../../utils/date";
import { convertHeightToBengali } from "../../utils/height";

function BioInfo({ id }) {
  const { bio } = useContext(BioContext);
  const generalInfo = bio?.generalInfo || null;

  return (
    <div
      style={{ backgroundColor: Colors.pncPrimaryColor }}
      className=" text-white p-4 rounded-lg shadow-lg w-full "
    >
      <img
        className="rounded-full py-2 h-24  w-24 mx-auto object-cover"
        src={
          generalInfo?.gender === "মহিলা"
            ? female
            : generalInfo?.photos && generalInfo.photos.length > 0
            ? generalInfo.photos[0]
            : male
        }
        alt="Person"
      />

      <div className="text-center">
        <h5 className="text-lg font-semibold my-2">
          Biodata No. {id}
          {/* {generalInfo?.gender === "মহিলা" ? "PNCF-" : "PNCM-"} */}
        </h5>
        <table className="table-auto w-full  mx-auto">
          <thead>
            <tr>
              <td className="px-4 text-left py-2">বায়োডাটার ধরন</td>
              <td className="px-4 text-left py-2">{generalInfo?.bio_type}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 text-left py-2">বৈবাহিক অবস্থা:</td>
              <td className="px-4 text-left py-2">
                {generalInfo?.marital_status}
              </td>
            </tr>
            <tr>
              <td className="px-4 text-left py-2">জন্মসন</td>
              <td className="px-4 text-left py-2">
                {/* {formatDate(getDateMonthYear(generalInfo?.date_of_birth))} */}
                {getDateMonthYear(generalInfo?.date_of_birth)}
              </td>
            </tr>
            <tr>
              <td className="px-4 text-left py-2">উচ্চতা</td>
              <td className="px-4 text-left py-2">
                {convertHeightToBengali(generalInfo?.height)}{" "}
              </td>
            </tr>
            <tr>
              <td className="px-4 text-left py-2">গাত্রবর্ণ</td>
              <td className="px-4 text-left py-2">
                {generalInfo?.screen_color}
              </td>
            </tr>
            <tr>
              <td className="px-4 text-left py-2">ওজন</td>
              <td className="px-4 text-left py-2">
                {generalInfo?.weight} কেজি
              </td>
            </tr>
            <tr>
              <td className="px-4 text-left py-2">রক্তের গ্রুপ</td>
              <td className="px-4 text-left py-2">
                {generalInfo?.blood_group}
              </td>
            </tr>
            <tr>
              <td className="px-4 text-left py-2">জাতীয়তা</td>
              <td className="px-4 text-left py-2">
                {generalInfo?.nationality}
              </td>
            </tr>
            {generalInfo?.religion && (
              <tr>
                <td className="px-4 text-left py-2">ধর্ম</td>
                <td className="px-4 text-left py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    generalInfo?.religion === 'islam' ? 'bg-green-600' :
                    generalInfo?.religion === 'hinduism' ? 'bg-orange-500' :
                    generalInfo?.religion === 'christianity' ? 'bg-blue-600' : 'bg-gray-500'
                  }`}>
                    {generalInfo?.religion === 'islam' 
                      ? (generalInfo?.religious_type === 'practicing_muslim' ? 'প্র্যাক্টিসিং মুসলিম' : 'মুসলিম')
                      : generalInfo?.religion === 'hinduism'
                      ? (generalInfo?.religious_type === 'practicing_hindu' ? 'প্র্যাক্টিসিং হিন্দু' : 'হিন্দু')
                      : generalInfo?.religion === 'christianity'
                      ? (generalInfo?.religious_type === 'practicing_christian' ? 'প্র্যাক্টিসিং খ্রিস্টান' : 'খ্রিস্টান')
                      : generalInfo?.religion}
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Photo gallery for male profiles */}
      {generalInfo?.gender !== "মহিলা" &&
        generalInfo?.photos &&
        generalInfo.photos.length > 1 && (
          <div className="mt-4">
            <p className="text-sm font-semibold mb-2 text-center">ছবি সমূহ</p>
            <div className="grid grid-cols-3 gap-2">
              {generalInfo.photos.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`ছবি ${index + 1}`}
                  className="w-full h-20 object-cover rounded-md border border-white/30 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => window.open(url, '_blank')}
                />
              ))}
            </div>
          </div>
        )}
    </div>
  );
}

export default BioInfo;
