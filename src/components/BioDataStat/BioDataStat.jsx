/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Colors } from "../../constants/colors";
import BioContext from "../../contexts/BioContext";
import { useQuery } from "@tanstack/react-query";
import { BioDataServices } from "../../services/bioData";
import LoadingCircle from "../LoadingCircle/LoadingCircle";
import clipboardCopy from "clipboard-copy";
import { Toast } from "../../utils/toast";

const BioDataStat = ({ id }) => {
  const { bio } = useContext(BioContext);
  const generalInfo = bio?.generalInfo || null;
  const { data, isLoading } = useQuery({
    queryKey: ["bio-data", "stat", id],
    queryFn: async () => {
      return await BioDataServices.getBioDataStatistics(id);
    },
    retry: false,
    enabled: !!id,
  });

  console.log("bioStats~", generalInfo);
  console.log("bioStats", data);

  const rejected = data?.results?.rejected;
  const approved = data?.results?.approved;
  const total = rejected + approved;
  let approvedRate = 0;
  let rejectedRate = 0;
  if (total) {
    approvedRate = approved / total;
    approvedRate = approvedRate.toFixed(2);
    rejectedRate = rejected / total;
    rejectedRate = rejectedRate.toFixed(2);
  }
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
        <h5 className="card-titlee text-lg text-center my-4 pt-5">STATS:</h5>
        <table className="w-full  mx-auto py-10">
          <thead>
            <tr className="border-b">
              <td className="px-4 text-left  py-2">Total Views</td>
              <td className="px-4 text-left  py-2">{generalInfo?.views}</td>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 text-left  py-2">Total Pending:</td>
              <td className="px-4 text-left  py-2">{data?.results?.pending}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 text-left  py-2">Total Approved</td>
              <td className="px-4 text-left  py-2">
                {data?.results?.approved}
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 text-left  py-2">Total Rejected</td>
              <td className="px-4 text-left  py-2">
                {data?.results?.rejected}
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 text-left  py-2">Approval Rate</td>
              <td className="px-4 text-left  py-2">{approvedRate * 100}%</td>
            </tr>
            <tr>
              <td className="px-4 text-left  py-2">Rejection Rate</td>
              <td className="px-4 text-left  py-2">{rejectedRate * 100}%</td>
            </tr>
          </tbody>
        </table>
        <div className="h-5"></div>
      </div>

      <div className="h-4"></div>
      <div className="flex justify-center md:mb-0 mb-5">
        <button
          onClick={handleCopyLink}
          style={{ backgroundColor: Colors.pncPrimaryColor }}
          className="copy-biodata-link mx-auto text-white py-3 px-10 rounded-full"
        >
          Copy Biodata Link
        </button>
      </div>
    </>
  );
};

export default BioDataStat;
