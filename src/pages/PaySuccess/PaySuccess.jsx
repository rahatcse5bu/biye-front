import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Toast } from "../../utils/toast";
import { getErrorMessage } from "../../utils/error";
import { ContactPurchaseDataServices } from "../../services/contactPurchaseData";
import { getToken } from "../../utils/cookies";
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle";

const PaySuccess = () => {
  const [showMessage, setShowMessage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const message = searchParams.get("message");
  const bio_user = searchParams.get("bio_user");
  const purpose = searchParams.get("purpose");

  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowMessage(false);
    }, 3000); // 3 seconds timeout
    return () => clearTimeout(timeout);
  }, []);

  const buyContact = useCallback(
    async (bio_user) => {
      try {
        setLoading(true);
        const data =
          await ContactPurchaseDataServices.createContactPurchaseData(
            {
              bio_user,
            },
            getToken().token
          );

        if (data.success) {
          Toast.successToast("আপনার বায়োডাটা ক্রয় সম্পূর্ন  হয়েছে।");
          navigate("/user/account/purchases");
          // await bioChoiceFirstStepRefetch();
          // await bioChoiceSecondStepRefetch();
        }
      } catch (error) {
        let msg = getErrorMessage(error);
        Toast.errorToast(msg);
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (!showMessage) {
      if (bio_user && purpose === "second_step") {
        buyContact(bio_user);
      } else if (bio_user && bio_user.length > 4) {
        navigate(`/send-form/${bio_user}`);
      } else {
        navigate("/user/account/dashboard");
      }
    }
  }, [showMessage, bio_user, navigate, purpose, buyContact]);

  return (
    <div className="sm:mx-auto mx-3 my-10 rounded-md border-green-500 p-10 flex flex-col items-center justify-center w-full sm:w-1/2 bg-green-300">
      {message && !loading && (
        <h1 className="text-3xl mb-4 text-center text-green-900">{message}</h1>
      )}
      {loading && (
        <div>
          <LoadingCircle />
        </div>
      )}
    </div>
  );
};

export default PaySuccess;
