import BioContext from "../../contexts/BioContext";
import { useContext } from "react";
const ExpectedPartner = () => {
  const { bio } = useContext(BioContext);
  const expectedLifePartner = bio?.expectedLifePartner || null;
  const generalInfo = bio?.generalInfo || null;
  return (
    <div className="w-auto border-t-2 rounded shadow single-bio-expected-lifepartner-info">
      <h5 className="my-3 text-2xl text-center card-title">
        প্রত্যাশিত জীবনসঙ্গী
      </h5>
      <table className="w-full table-auto">
        <tbody>
          <tr className="border-t border-b">
            <td className="w-1/2 px-4 py-2 text-left">বয়স</td>
            <td className="w-1/2 px-4 py-2 text-left border-l">
              {expectedLifePartner?.age?.min}
              {expectedLifePartner?.age?.max}
            </td>
          </tr>
          <tr className="border-b">
            <td className="w-1/2 px-4 py-2 text-left"> গাত্রবর্ণ </td>
            <td className="w-1/2 px-4 py-2 text-left border-l">
              {expectedLifePartner?.color.join(",")}
            </td>
          </tr>
          <tr className="border-b">
            <td className="w-1/2 px-4 py-2 text-left">উচ্চতা</td>
            <td className="w-1/2 px-4 py-2 text-left border-l">
              {expectedLifePartner?.height?.min}
              {expectedLifePartner?.height?.max}
            </td>
          </tr>
          <tr className="border-b">
            <td className="w-1/2 px-4 py-2 text-left">শিক্ষাগত যোগ্যতা</td>
            <td className="w-1/2 px-4 py-2 text-left break-all border-l">
              {expectedLifePartner?.educational_qualifications?.join(",")}
            </td>
          </tr>
          <tr className="border-b lg:block sm:hidden">
            <td className="w-1/2 px-4 py-2 text-left">জেলা</td>
            <td className="w-1/2 px-4 py-2 text-left break-all border-l">
              {expectedLifePartner?.zilla.join(",")}
            </td>
          </tr>

          {/* mobile version layout change */}
          {/* Row 1 */}
          <tr className="border-b lg:hidden">
            <td colSpan="2" className="px-4 py-2 text-left">
              জেলা
            </td>
          </tr>

          {/* Row 2 */}
          <tr className="w-full border-b lg:hidden">
            <td
              colSpan="2"
              className="px-4 py-2 text-center break-all border-l"
            >
              <div className="w-max-contentt">
                {expectedLifePartner?.zilla.join(",")}
              </div>
            </td>
          </tr>

          <tr className="border-b">
            <td className="w-1/2 px-4 py-2 text-left">বৈবাহিক অবস্থা</td>
            <td className="w-1/2 px-4 py-2 text-left border-l">
              {expectedLifePartner?.marital_status.join(",")}
            </td>
          </tr>
          <tr className="border-b">
            <td className="w-1/2 px-4 py-2 text-left">পেশা</td>
            <td className="w-1/2 px-4 py-2 text-left break-all border-l">
              {expectedLifePartner?.occupation.join(",")}
            </td>
          </tr>
          <tr className="border-b">
            <td className="w-1/2 px-4 py-2 text-left">অর্থনৈতিক অবস্থা</td>
            <td className="w-1/2 px-4 py-2 text-left border-l">
              {expectedLifePartner?.economical_condition.join(",")}
            </td>
          </tr>
          <tr className="border-b">
            <td className="w-1/2 px-4 py-2 text-left">
              জীবনসঙ্গীর যেসব বৈশিষ্ট্য বা গুণাবলী প্রত্যাশা করেন
            </td>
            <td className="w-1/2 px-4 py-2 text-left break-all border-l">
              {expectedLifePartner?.expected_characteristics}
            </td>
          </tr>
          <tr className="border-b">
            <td className="w-1/2 px-4 py-2 text-left">
              আকিদা ও মাজহাব কিরকম প্রত্যাশা করেন?{" "}
            </td>
            <td className="w-1/2 px-4 py-2 text-left border-l">
              {expectedLifePartner?.aqidah_madhab}
            </td>
          </tr>
          {generalInfo?.gender === "মহিলা" ||
          generalInfo?.bio_type === "পাত্রীর বায়োডাটা" ? (
            <>
              <tr className="border-b">
                <td className="w-1/2 px-4 py-2 text-left">
                  ছাত্র বিয়ে করতে আগ্রহী?{" "}
                </td>
                <td className="w-1/2 px-4 py-2 text-left border-l">
                  {expectedLifePartner?.isStudent === true ? "জি" : "না"}{" "}
                </td>
              </tr>
              <tr className="border-b">
                <td className="w-1/2 px-4 py-2 text-left">
                  মাসনা/সুলাসা/রুবায়ায় আগ্রহী?{" "}
                </td>
                <td className="w-1/2 px-4 py-2 text-left border-l">
                  {expectedLifePartner?.isMasna === true ? "জি" : "না"}{" "}
                </td>
              </tr>
              <tr className="border-b">
                <td className="w-1/2 px-4 py-2 text-left">
                  কমপক্ষে কত মাসিক ইনকাম চান (ইংরেজীতে শুধু সংখ্যা লিখুন)?{" "}
                </td>
                <td className="w-1/2 px-4 py-2 text-left border-l">
                  {expectedLifePartner?.min_expected_income}{" "}
                </td>
              </tr>
            </>
          ) : (
            <>
              {" "}
              <tr className="border-b">
                <td className="w-1/2 px-4 py-2 text-left">
                  তালাক-প্রাপ্তা বিয়ে করতে আগ্রহী?{" "}
                </td>
                <td className="w-1/2 px-4 py-2 text-left border-l">
                  {expectedLifePartner?.isDivorced_Widow === true ? "জি" : "না"}{" "}
                </td>
              </tr>
            </>
          )}

          <tr className="border-b">
            <td className="w-1/2 px-4 py-2 text-left">
              সন্তানসহ বিয়ে করতে আগ্রহী?{" "}
            </td>
            <td className="w-1/2 px-4 py-2 text-left border-l">
              {expectedLifePartner?.isChild === true ? "জি" : "না"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ExpectedPartner;
