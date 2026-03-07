/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Colors } from "../../constants/colors";
import BioContext from "../../contexts/BioContext";
import { useQuery } from "@tanstack/react-query";
import { BioDataServices } from "../../services/bioData";
import LoadingCircle from "../LoadingCircle/LoadingCircle";
import clipboardCopy from "clipboard-copy";
import { Toast } from "../../utils/toast";
import ReactionButton from "../ReactionButton/ReactionButton";

const BioDataStat = ({ id }) => {
  const { bio } = useContext(BioContext);

  const generalInfo = bio?.generalInfo || null;
  const { data, isLoading } = useQuery({
    queryKey: ["bio-data", "stat", generalInfo?.user],
    queryFn: async () => {
      return await BioDataServices.getBioDataStatistics(generalInfo?.user);
    },
    retry: false,
    enabled: !!generalInfo?.user,
  });

  // console.log("bioStats~", generalInfo);
  // console.log("bioStats", data);

  // const rejected = data?.results?.rejected;
  // const approved = data?.results?.approved;
  // const total = rejected + approved;
  // let approvedRate = 0;
  // let rejectedRate = 0;
  // if (total) {
  //   approvedRate = approved / total;
  //   approvedRate = approvedRate.toFixed(2);
  //   rejectedRate = rejected / total;
  //   rejectedRate = rejectedRate.toFixed(2);
  // }
  if (isLoading) {
    return <LoadingCircle />;
  }
  const handleCopyLink = async () => {
    const currentLink = window.location.href;
    try {
      await clipboardCopy(currentLink);
      //   alert('Link copied to clipboard!');
      Toast.successToast("Link copied to clipboard!");
    } catch (error) {
      console.error("Copy failed: ", error);
    }
  };
  return (
    <>
      <div
        className="single-bio-left-sidebar-stats card-left px-2 mx-[2px] rounded-md text-white shadow-md"
        style={{ backgroundColor: Colors.pncPrimaryColor }}
      >
        <h5 className="card-titlee text-lg text-center my-4 pt-5">পরিসংখ্যান</h5>
        <table className="w-full  mx-auto py-10">
          <thead>
            <tr className="border-b">
              <td className="px-4 text-left  py-2">মোট ভিউ</td>
              <td className="px-4 text-left  py-2">
                {generalInfo?.views_count}
              </td>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 text-left  py-2">মোট পেন্ডিং</td>
              <td className="px-4 text-left  py-2">{data?.results?.pending}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 text-left  py-2">মোট অনুমোদিত</td>
              <td className="px-4 text-left  py-2">
                {data?.results?.approved}
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 text-left  py-2">মোট বাতিল</td>
              <td className="px-4 text-left  py-2">
                {data?.results?.rejected}
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 text-left  py-2">অনুমোদনের হার</td>
              <td className="px-4 text-left  py-2">
                {data?.results.approvedPercentage}%
              </td>
            </tr>
            <tr>
              <td className="px-4 text-left  py-2">বাতিলের হার</td>
              <td className="px-4 text-left  py-2">
                {data?.results.rejectedPercentage}%
              </td>
            </tr>
            <tr>
              <td className="px-4 text-left  py-2">পেন্ডিং হার</td>
              <td className="px-4 text-left  py-2">
                {data?.results.pendingPercentage}%
              </td>
            </tr>
          </tbody>
        </table>
        <div className="h-5"></div>
      </div>

      {/* Enhanced Reaction Section - Facebook Style */}
      <div className="h-4"></div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <h5 className="text-lg font-semibold text-gray-800 text-center">
            এই বায়োডাটায় রিয়্যাক্ট করুন
          </h5>
        </div>
        <ReactionButton 
          bioUserId={generalInfo?.user}
          initialCounts={{
            like: generalInfo?.likes_count || 0,
            dislike: generalInfo?.dislikes_count || 0,
            love: generalInfo?.love_count || 0,
            wow: generalInfo?.wow_count || 0,
            sad: generalInfo?.sad_count || 0,
            angry: generalInfo?.angry_count || 0,
          }}
          showCommentButton={false}
        />
      </div>

      <div className="h-4"></div>
      <div className="flex justify-center md:mb-0 mb-5">
        <button
          onClick={handleCopyLink}
          style={{ backgroundColor: Colors.pncPrimaryColor }}
          className="copy-biodata-link mx-auto text-white py-3 px-10 rounded-full"
        >
          বায়োডাটার লিংক কপি করুন
        </button>
      </div>
    </>
  );
};

export default BioDataStat;
