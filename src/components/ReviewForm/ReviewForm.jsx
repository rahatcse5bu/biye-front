import FormTitle from "../FormTitle/FormTitle";
import { Colors } from "../../constants/colors";
import LoadingCircle from "../LoadingCircle/LoadingCircle";
import { useContext, useState } from "react";
import { UserInfoServices } from "../../services/userInfo";
import { Toast } from "../../utils/toast";
import { getErrorMessage } from "../../utils/error";
import { getToken } from "../../utils/cookies";
import { trackEvent } from "../../utils/analytics";
import { useQuery } from "@tanstack/react-query";
import UserContext from "../../contexts/UserContext";
import RevisionStatus from "../RevisionStatus/RevisionStatus";

const ReviewForm = () => {
  const [loading, setLoading] = useState(false);
  const { userInfo } = useContext(UserContext);
  const { data: userStatus = null, refetch } = useQuery({
    queryKey: ["bio-data", "status", userInfo?.data?._id],
    queryFn: async () => {
      return await UserInfoServices.getUserInfoStatus(userInfo?.data?._id);
    },
    retry: false,
    enabled: !!userInfo?.data?._id,
  });

  const status = userStatus?.data?.user_status;

  // For first-time / inactive users: change user_status to 'in review'
  const submitUserStatus = async (user_status) => {
    try {
      setLoading(true);
      const result = await UserInfoServices.updateUserInfo(
        { user_status },
        getToken().token
      );
      if (result.success) {
        Toast.successToast("Your bio data is now in review");
        trackEvent("biodata_submitted");
        await refetch();
      }
    } catch (error) {
      Toast.errorToast(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const btnStyle = {
    background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight})`,
  };

  const renderContent = () => {
    // ── New / never submitted ──────────────────────────────────────────────
    if (status === "pending") {
      return (
        <button
          type="button"
          className="px-6 py-2 text-white rounded-md font-medium"
          onClick={() => submitUserStatus("in review")}
          style={btnStyle}
        >
          {loading ? <LoadingCircle /> : "রিভিউর জন্য জমা দিন"}
        </button>
      );
    }

    // ── Active: edits are reviewed per change; the panel shows draft/pending/rejected state and submit ─
    if (status === "active") {
      return <RevisionStatus full />;
    }
    // ── Inactive: allow re-submission ──────────────────────────────────────
    if (status === "inactive") {
      return (
        <button
          type="button"
          className="px-6 py-2 text-white capitalize font-medium rounded-md"
          onClick={() => submitUserStatus("in review")}
          style={btnStyle}
        >
          {loading ? <LoadingCircle /> : "রিভিউর জন্য জমা দিন"}
        </button>
      );
    }

    // ── Already in review ──────────────────────────────────────────────────
    if (status === "in review") {
      return (
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 text-center shadow-sm max-w-md">
          <strong className="text-red-600 text-base">
            আপনার বায়োডাটা রিভিউয়ের অপেক্ষায় আছে। স্ট্যাটাস পরিবর্তন হলে
            আপনাকে জানানো হবে।
          </strong>
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <FormTitle title="Review form" />
      <div className="flex items-center justify-center h-[80vh]">
        {renderContent()}
      </div>
    </div>
  );
};

export default ReviewForm;
