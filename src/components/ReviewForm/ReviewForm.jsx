import FormTitle from "../FormTitle/FormTitle";
import { Colors } from "../../constants/colors";
import LoadingCircle from "../LoadingCircle/LoadingCircle";
import { useContext, useState } from "react";
import { UserInfoServices } from "../../services/userInfo";
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
  const submitReviewButtonHandler = async (user_status) => {
    try {
      setLoading(true);
      const result = await UserInfoServices.updateUserInfo(
        {
          user_status,
        },
        getToken().token
      );

      if (result.success) {
        Toast.successToast("Your bio data in review");
        await refetch();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const msg = getErrorMessage(error);
      Toast.errorToast(msg);
    }
  };
  // console.log(userStatus);
  return (
    <div>
      <FormTitle title="Review form" />
      <div className="flex items-center justify-center h-[80vh]">
        {userStatus?.data?.user_status === "pending" ? (
          <button
            type="submit"
            className="px-4 py-2 text-white rounded-md"
            onClick={() => submitReviewButtonHandler("in review")}
            style={{
              background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight})`,
            }}
          >
            {loading ? <LoadingCircle /> : "Submit for review"}
          </button>
        ) : userStatus?.data?.user_status === "active" ? (
          <button
            onClick={() => submitReviewButtonHandler("inactive")}
            className="px-4 py-2 text-white capitalize font-medium rounded-md disabled:cursor-not-allowed"
            style={{
              background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight})`,
            }}
          >
            {loading ? <LoadingCircle /> : " Submit for Inactive"}
          </button>
        ) : userStatus?.data?.user_status === "inactive" ? (
          <button
            onClick={() => submitReviewButtonHandler("in review")}
            className="px-4 py-2 text-white capitalize font-medium rounded-md disabled:cursor-not-allowed"
            style={{
              background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight})`,
            }}
          >
            {loading ? <LoadingCircle /> : " Submit for review"}
          </button>
        ) : (
          userStatus?.data?.user_status === "in review" && (
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 my-4 text-lg text-gray-800 text-center shadow-sm">
              <strong className="text-red-600">
                Your bio data is currently in review. You will be notified when
                your status changes.
              </strong>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ReviewForm;
