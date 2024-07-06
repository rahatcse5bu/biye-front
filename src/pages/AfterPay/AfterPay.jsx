import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BkashCallAfterPay } from "../../services/bkash";
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle";
import UserContext from "../../contexts/UserContext";
import { getErrorMessage } from "../../utils/error";

const AfterPay = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get("status");
  const paymentID = searchParams.get("paymentID");
  const { user } = useContext(UserContext);

  // console.log(searchParams);
  // console.log(status);
  // console.log(paymentID);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await BkashCallAfterPay({
          paymentID,
          email: user?.email,
        });
        if (response?.success) {
          navigate(
            `/pay/success?message=${response?.statusMessage}&trxID=${
              response?.trxID
            }&paymentId=${paymentID}&amount=${response?.amount}&status=${
              response?.transactionStatus
            }&payment_create_time=${
              response?.paymentCreateTime || response?.paymentExecuteTime
            }`
          );
        } else {
          navigate(`/pay/fail?message=${response.message}`);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        const msg = getErrorMessage(error);
        navigate(`/pay/fail?message=${msg}`);
      }
    }
    // async function fetchData() {
    // 	try {
    // 		//? execute payment
    // 		let response = await BkashExecutePaymentAPICall(paymentID);

    // 		// ? payment
    // 		if (response?.message) {
    // 			response = await BkashQueryPaymentAPICall(paymentID);
    // 		}

    // 		if (response?.statusCode && response.statusCode === "0000") {
    // 			console.log("Success", response?.statusMessage);
    // 			navigate(
    // 				`/pay/success?message=${response?.statusMessage}&trxID=${
    // 					response?.trxID
    // 				}&paymentId=${paymentID}&amount=${response?.amount}&status=${
    // 					response?.transactionStatus
    // 				}&payment_create_time=${
    // 					response?.paymentCreateTime || response?.paymentExecuteTime
    // 				}${bioId > 0 ? `&bioId=${bioId}` : ""}`
    // 			);
    // 		} else {
    // 			console.log("Failure", response?.statusMessage);
    // 			navigate(
    // 				`/pay/fail?message=${response?.statusMessage}${
    // 					bioId > 0 ? `&bioId=${bioId}` : ""
    // 				}`
    // 			);
    // 		}
    // 	} catch (error) {
    // 		console.error("An error occurred:", error);
    // 	}
    // }

    if (status && status === "success" && user?.email) {
      fetchData();
    } else {
      navigate("/pay/fail");
    }
  }, [status, paymentID, navigate, user?.email]);

  return (
    <div className="my-10">
      <LoadingCircle />
    </div>
  );
};

export default AfterPay;
