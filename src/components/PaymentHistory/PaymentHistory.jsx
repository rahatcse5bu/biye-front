import { useQuery } from "@tanstack/react-query";
import { paymentServices } from "../../services/payments";
import { getToken } from "../../utils/cookies";
import LoadingCircle from "../LoadingCircle/LoadingCircle";
import { refundServices } from "../../services/refunds";
import { Toast } from "../../utils/toast";

function formatPurchaseType(purchaseType) {
  // Split the purchaseType string by underscores and capitalize each word
  const words = purchaseType
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  // Join the words with spaces to create the final formatted string
  return words.join(" ");
}
function readableDateTime(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  const readableDate = date.toLocaleDateString(undefined, options);
  return readableDate;
}
const PaymentHistory = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["payments", "history"],
    queryFn: async () => {
      return await paymentServices.getPaymentsByUser(getToken().token);
    },
    retry: false,
  });

  const handleRequestRefund = async (item) => {
    try {
      // Extract the necessary data from the item
      const { id, payment_id, transaction_id, amount } = item;

      // Make the API request to add a refund request
      const response = await refundServices.addRefundRequest(
        {
          user_id: id, // User ID
          payment_id, // Payment ID
          transaction_id, // Transaction ID
          amount, // Refund amount
          refund_status: "requested", // Set to 'requested'
          refund_req_time: new Date(), // Current time
        },
        getToken().token
      );
      if (response?.success) {
        Toast.successToast("Your Request is sent to admin");
      }
      await refetch();
      // Handle the response as needed
      console.log(response);
    } catch (error) {
      // Handle any errors
      console.error("Error requesting refund:", error);
      const msg = error?.response?.data?.message || error?.message;
      Toast.errorToast(msg);
    }
  };

  return (
    <div className="col right-sidebar-main my-favs">
      {isLoading ? (
        <LoadingCircle />
      ) : data?.data?.length > 0 ? (
        <div className="my-favs-info border-t-2 w-auto rounded shadow">
          <h5 className="card-title text-center text-2xl my-3">
            পেমেন্ট হিস্টোরি
          </h5>
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr className="border-b border-t">
                  <th className="px-4 py-2 text-center w-1/7">SL</th>
                  {/* <th>পেমেন্ট আইডি</th> */}
                  <th className="px-4 py-2 text-center w-1/7">
                    ট্রানজেকশন আইডি
                  </th>
                  <th className="px-4 py-2 text-center w-1/7">মেথড</th>
                  <th className="px-4 py-2 text-center w-1/7">পরিমাণ</th>
                  <th className="px-4 py-2 text-center w-1/7">কারণ</th>
                  <th className="px-4 py-2 text-center w-1/7">স্ট্যাটাস</th>
                  <th className="px-4 py-2 text-center w-1/7">তারিখ</th>
                  <th className="px-4 py-2 text-center w-1/7">একশন</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      {/* <td className="text-xs">{item?.payment_id}</td> */}
                      <td className="text-xs">{item?.transaction_id}</td>
                      <td className="text-xs">{item?.method}</td>
                      <td className="text-xs">{item?.amount}</td>
                      <td className="text-xs">
                        {formatPurchaseType(item?.reason)}
                      </td>
                      <td className="text-xs">{item?.status}</td>
                      <td className="text-xs">
                        {readableDateTime(item?.trnx_time)}
                      </td>
                      {/* {(item && (item.status === 'Completed' && item.bio_choice_status === 'Pending'  && item.reason === 'bio_purchase') || (item && item.reason==='buy_points')) ? ( */}
                      {(item &&
                        item.status === "Completed" &&
                        item.reason === "bio_purchase") ||
                      (item && item.reason === "buy_points") ? (
                        <td>
                          {item?.refund_status === "pending" ? (
                            <button
                              onClick={() => handleRequestRefund(item)}
                              className="bg-blue-500 hover:bg-blue-700 text-white text-xs py-2 px-4 mb-2 rounded"
                            >
                              Request Refund
                            </button>
                          ) : (
                            <button
                              className="bg-gray-300 hover:bg-gray-400 text-gray-800 text-xs py-2 px-4 mb-2 rounded"
                              disabled
                              style={{ cursor: "not-allowed" }}
                              aria-label={item?.refund_status}
                            >
                              {item?.refund_status}
                            </button>
                          )}
                        </td>
                      ) : item.status === "requested" ? (
                        <td>
                          <div className="text-xs font-bold py-4 px-4 text-green-700">
                            Refund Processing
                          </div>
                        </td>
                      ) : (
                        <td>
                          <div className="text-xs py-4 px-4 text-red-700">
                            Not Refundable
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>there is no payment history</p>
      )}
    </div>
  );
};

export default PaymentHistory;
