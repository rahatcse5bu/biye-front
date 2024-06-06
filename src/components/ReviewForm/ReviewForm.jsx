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
  const submitReviewButtonHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await UserInfoServices.updateUserInfo(
        {
          user_status: "in review",
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
  console.log(userStatus);
  return (
    <form onSubmit={submitReviewButtonHandler}>
      <FormTitle title="Review form" />
      <div className="flex items-center justify-center h-[80vh]">
        {userStatus?.data?.user_status !== "in review" ? (
          <button
            type="submit"
            className="px-4 py-2 text-white rounded-md"
            style={{
              background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight})`,
            }}
          >
            {loading ? <LoadingCircle /> : "Submit for review"}
          </button>
        ) : (
          <button
            type="submit"
            disabled={true}
            className="px-4 py-2 text-white rounded-md cursor-not-allowed"
            style={{
              background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight})`,
            }}
          >
            {userStatus?.data?.user_status}
          </button>
        )}
      </div>
    </form>
  );
};

export default ReviewForm;
