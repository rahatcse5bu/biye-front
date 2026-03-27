import FormTitle from "../FormTitle/FormTitle";
import { Colors } from "../../constants/colors";
import LoadingCircle from "../LoadingCircle/LoadingCircle";
import { useContext, useState } from "react";
import { UserInfoServices } from "../../services/userInfo";
import { GeneralInfoServices } from "../../services/generalInfo";
import { Toast } from "../../utils/toast";
import { getErrorMessage } from "../../utils/error";
import { getToken } from "../../utils/cookies";
import { useQuery } from "@tanstack/react-query";
import UserContext from "../../contexts/UserContext";

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
  const biodataStatus = userStatus?.data?.biodata_status;
  const hasPendingChanges = userStatus?.data?.has_pending_changes;

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
        await refetch();
      }
    } catch (error) {
      Toast.errorToast(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  // For active users who have edited: submit pending changes for admin review
  // user_status remains 'active' — public still sees the last approved version
  const submitActiveBioForReview = async () => {
    try {
      setLoading(true);
      const result = await GeneralInfoServices.submitForReview();
      if (result.success) {
        Toast.successToast("পরিবর্তনগুলো রিভিউর জন্য জমা দেওয়া হয়েছে");
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

    // ── Active: show appropriate message / action based on biodata_status ─
    if (status === "active") {
      // Changes already submitted & awaiting admin review
      if (biodataStatus === "pending" || hasPendingChanges) {
        return (
          <div className="bg-amber-50 border border-amber-300 rounded-lg p-6 text-center shadow-sm max-w-md">
            <p className="text-amber-800 font-semibold text-base">
              ⏳ আপনার পরিবর্তনগুলো রিভিউর অপেক্ষায় আছে।
            </p>
            <p className="text-amber-700 text-sm mt-2">
              অ্যাডমিন রিভিউ করার আগ পর্যন্ত আপনার পূর্বের অনুমোদিত বায়োডাটা
              সাইটে দেখা যাচ্ছে।
            </p>
          </div>
        );
      }

      // Active with recent edit changes not yet explicitly submitted
      return (
        <div className="text-center max-w-md">
          <p className="text-gray-600 text-sm mb-4">
            আপনার বায়োডাটা সক্রিয় আছে। যদি নতুন পরিবর্তন জমা দিতে চান, নিচের
            বাটনে ক্লিক করুন।
          </p>
          <button
            type="button"
            className="px-6 py-2 text-white rounded-md font-medium"
            onClick={submitActiveBioForReview}
            style={btnStyle}
          >
            {loading ? <LoadingCircle /> : "রিভিউর জন্য জমা দিন"}
          </button>
        </div>
      );
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
