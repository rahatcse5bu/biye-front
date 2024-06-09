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
        className="rounded-full py-2 h-24  w-24 mx-auto"
        src={generalInfo?.gender === "মহিলা" ? female : male}
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
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BioInfo;
