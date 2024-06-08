import "./BioRequests.css";
import { Button } from "@material-tailwind/react";
import { FaEye, FaCheck, FaTimes, FaInfo } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { BioChoiceDataServices } from "../../services/bioChoiceData";
import { getToken } from "../../utils/cookies";
import { Colors } from "../../constants/colors";
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../utils/error";
import { Toast } from "../../utils/toast";
import { useState } from "react";
import { BioDetailsModal } from "../../components/BioDetailsModal/BioDetailsModal";
import { FeedbackModal } from "../../components/FeedbackModal/FeedbackModal";
import classNames from "classnames";
const MyBioRequests = () => {
  const navigate = useNavigate();
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [feedback, setFeedback] = useState("");
  const [qA, setQa] = useState('"');
  const [bioDetailsModal, setBioDetailsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["bio-share"],
    queryFn: async () => {
      return await BioChoiceDataServices.getBioChoiceShare(getToken().token);
    },
    retry: false,
  });

  const viewBioHandler = (id) => {
    navigate(`/biodata/${id}`);
  };

  // action for accepting and rejecting
  const reactionDataHandler = async (user, status) => {
    try {
      setLoading(true);
      setLoadingId(user);
      setLoadingStatus(status);
      const response = await BioChoiceDataServices.updateBioChoiceData(
        {
          user,
          status: status,
        },
        getToken().token
      );
      if (response?.success === true) {
        Toast.successToast("আপনার রিয়াকশন সেভ করা হয়েছে।");
        await refetch();
      }
    } catch (error) {
      const msg = getErrorMessage(error);
      Toast.errorToast(msg);
    } finally {
      setLoadingId(null);
      setLoading(false);
      setLoadingStatus(null);
    }
  };

  const bioDetailsOpenModalHandler = (text) => {
    setQa(text);
    setBioDetailsModal(true);
  };
  const feedbackDetailsModalHandler = (user, item) => {
    setIsFeedbackDialogOpen(true);
    setUserId(user);
    setFeedback(item);
  };

  // console.log("bio-share-data~", data);

  return (
    <>
      <div className="py-12 mx-auto ">
        <div className="">
          {/*<!-- End of Left Sidebar -->*/}
          <div className="col right-sidebar-main my-favs">
            <div className="w-auto border-t-2 rounded shadow my-favs-info">
              <h5 className="mt-3 text-2xl text-center card-title">
                আমার কাছে শেয়ার করা বায়োডাটার অনুরোধসমূহ
              </h5>
              <h6 className="py-4 text-xs" style={{ color: Colors.siteGlobal }}>
                প্রথম ধাপে আপনার নিকট যেসকল পাত্র/পাত্রী তাদের নিজেদের বায়োডাটা
                শেয়ার করেছেন, তাদের তালিকা,ফিডব্যাক ও অবস্থা
              </h6>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="border-t border-b">
                      <th className="px-4 py-2 text-center w-1/7">SL</th>
                      <th className="px-4 py-2 text-center w-1/7">
                        বায়োডাটা নং
                      </th>
                      <th className="px-4 py-2 text-center w-1/7">অ্যাড্রেস</th>
                      <th className="px-4 py-2 text-center w-1/7">স্ট্যাটাস</th>
                      <th className="px-4 py-2 text-center w-1/7">
                        বায়ো ডিটেইলস
                      </th>
                      <th className="px-4 py-2 text-center w-1/7">ফিডব্যাক</th>

                      <th className="px-4 py-2 text-center w-1/7">অপশন</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <div className="flex justify-center w-full my-2">
                        <LoadingCircle />
                      </div>
                    ) : (
                      data?.data?.length > 0 &&
                      data?.data?.map((item, index) => {
                        return (
                          <tr key={index} className="border-b">
                            <td className="px-4 py-2 text-center border-l w-1/10">
                              {index}
                            </td>
                            <td className="px-4 py-2 text-center border-l w-1/7">
                              {item?.user_id}
                            </td>
                            <td className="px-4 py-2 text-center border-l w-1/7">
                              {item?.present_address}
                            </td>
                            <td
                              className={classNames(
                                "px-4 py-2 capitalize text-center font-bold text-base border-l w-1/7",
                                {
                                  "text-orange-500": item?.status === "pending",
                                  "text-green-600": item?.status === "approved",
                                  "text-red-600": item?.status === "rejected",
                                }
                              )}
                            >
                              {item?.status}
                            </td>
                            <td className="px-4 py-2 text-center border-l w-1/7">
                              <div
                                onClick={() =>
                                  bioDetailsOpenModalHandler(item?.bio_details)
                                }
                                className="flex items-center justify-center cursor-pointer"
                              >
                                <FaInfo color="gray" size={22} />
                              </div>
                            </td>
                            <td className="px-4 py-2 text-center border-l w-1/7">
                              <div
                                onClick={() =>
                                  feedbackDetailsModalHandler(
                                    item?.user,
                                    item?.feedback || ""
                                  )
                                }
                                className="flex items-center justify-center cursor-pointer"
                              >
                                <MdFeedback color="gray" size={22} />
                              </div>
                            </td>
                            <td className="px-4 py-2 text-center border-l w-1/7">
                              <div className="flex items-center justify-center">
                                <Button
                                  onClick={() => viewBioHandler(item?.user_id)}
                                  color="blue"
                                  size="xs"
                                  className="mr-2"
                                >
                                  <FaEye size={12} />
                                </Button>
                                <Button
                                  onClick={() =>
                                    reactionDataHandler(item?.user, "approved")
                                  }
                                  color="green"
                                  size="xs"
                                  className="mr-2"
                                >
                                  {loading &&
                                  loadingId === item?.user_id &&
                                  loadingStatus === "approved" ? (
                                    <LoadingCircle />
                                  ) : (
                                    <FaCheck size={12} />
                                  )}
                                </Button>
                                <Button
                                  onClick={() =>
                                    reactionDataHandler(item?.user, "rejected")
                                  }
                                  color="red"
                                  size="xs"
                                >
                                  {loading &&
                                  loadingId === item?.user_id &&
                                  loadingStatus === "rejected" ? (
                                    <LoadingCircle />
                                  ) : (
                                    <FaTimes size={12} />
                                  )}
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {qA && (
        <BioDetailsModal
          open={bioDetailsModal}
          setOpen={setBioDetailsModal}
          title="Bio Details"
          text={qA}
        />
      )}
      {isFeedbackDialogOpen && userId && (
        <FeedbackModal
          open={isFeedbackDialogOpen}
          setOpen={setIsFeedbackDialogOpen}
          user={userId}
          refetch={refetch}
          feedbackData={feedback}
        />
      )}
    </>
  );
};

export default MyBioRequests;
