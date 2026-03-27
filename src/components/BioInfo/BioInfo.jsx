/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import female from "../../assets/icons/female.svg";
import male from "../../assets/icons/male.svg";
import { Colors } from "../../constants/colors";
import BioContext from "../../contexts/BioContext";
import { getDateMonthYear } from "../../utils/date";
import { convertHeightToBengali } from "../../utils/height";
import PhotoViewer from "../PhotoViewer/PhotoViewer";
import { religionToApiKey } from "../../constants/religionContent";

const RELIGION_META = {
  islam: {
    base: "মুসলিম",
    practicing: "প্র্যাক্টিসিং মুসলিম",
    color: "bg-green-600",
  },
  hinduism: {
    base: "হিন্দু",
    practicing: "প্র্যাক্টিসিং হিন্দু",
    color: "bg-orange-500",
  },
  christianity: {
    base: "খ্রিস্টান",
    practicing: "প্র্যাক্টিসিং খ্রিস্টান",
    color: "bg-blue-600",
  },
};

const PRACTICING_TYPES = new Set([
  "practicing_muslim",
  "practicing_hindu",
  "practicing_christian",
]);

const getReligionMeta = (religion) => {
  const key = religionToApiKey[religion] || religion || "islam";
  return RELIGION_META[key] || RELIGION_META.islam;
};

function BioInfo({ id }) {
  const { bio } = useContext(BioContext);
  const generalInfo = bio?.generalInfo || null;
  const [showViewer, setShowViewer] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const hasMalePhotos =
    generalInfo?.gender !== "মহিলা" &&
    generalInfo?.photos &&
    generalInfo.photos.length > 0;

  const openViewer = (index = 0) => {
    if (!hasMalePhotos) return;
    setViewerIndex(index);
    setShowViewer(true);
  };

  return (
    <div
      style={{ backgroundColor: Colors.pncPrimaryColor }}
      className=" text-white p-4 rounded-lg shadow-lg w-full "
    >
      <div
        className={`relative w-24 mx-auto ${hasMalePhotos ? 'cursor-pointer group' : ''}`}
        onClick={() => openViewer(0)}
      >
        <img
          className="rounded-full py-2 h-24 w-24 mx-auto object-cover"
          src={
            generalInfo?.gender === "মহিলা"
              ? female
              : hasMalePhotos
              ? generalInfo.photos[0]
              : male
          }
          alt="Person"
        />
        {hasMalePhotos && (
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black/60 text-white text-[10px] px-2 py-[2px] rounded-full transition-opacity">
            দেখুন
          </span>
        )}
      </div>

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
                  {(() => {
                    const meta = getReligionMeta(generalInfo.religion);
                    const label = PRACTICING_TYPES.has(
                      generalInfo.religious_type
                    )
                      ? meta.practicing
                      : meta.base;
                    return (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${meta.color}`}
                      >
                        {label}
                      </span>
                    );
                  })()}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Photo gallery for male profiles */}
      {hasMalePhotos && generalInfo.photos.length > 1 && (
          <div className="mt-4">
            <p className="text-sm font-semibold mb-2 text-center">ছবি সমূহ</p>
            <div className="grid grid-cols-3 gap-2">
              {generalInfo.photos.map((url, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer group"
                  onClick={() => openViewer(index)}
                >
                  <img
                    src={url}
                    alt={`ছবি ${index + 1}`}
                    className="w-full h-20 object-cover rounded-md border border-white/30 group-hover:opacity-70 transition-opacity"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-xs font-semibold transition-opacity rounded-md">
                    দেখুন
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Photo Viewer Modal */}
      {hasMalePhotos && (
        <PhotoViewer
          photos={generalInfo.photos}
          initialIndex={viewerIndex}
          isOpen={showViewer}
          onClose={() => setShowViewer(false)}
        />
      )}
    </div>
  );
}

export default BioInfo;
