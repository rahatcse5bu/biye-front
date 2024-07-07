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

function formatDateString(dateString) {
  try {
    // Replace the colon before milliseconds with a dot
    let formattedString = dateString.replace(/:(\d{3}) /, ".$1 ");

    // Create a new Date object
    let date = new Date(formattedString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid Date");
    }

    // Format the date to a readable string
    let options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };

    return date.toLocaleString("en-US", options);
  } catch (error) {
    // Handle the error by returning an error message
    return `Error: ${error.message}`;
  }
}
const PaymentHistory = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["payments", "history"],
    queryFn: async () => {
      return await paymentServices.getPaymentsByUser(getToken()?.token);
    },
    retry: false,
  });

  console.log("data~~", data);

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
                  <th>পেমেন্ট আইডি</th>
                  <th className="px-4 py-2 text-center w-1/7">
                    ট্রানজেকশন আইডি
                  </th>
                  <th className="px-4 py-2 text-center w-1/7">পয়েন্ট</th>
                  <th className="px-4 py-2 text-center w-1/7">পরিমাণ</th>
                  {/* <th className="px-4 py-2 text-center w-1/7">কারণ</th> */}
                  <th className="px-4 py-2 text-center w-1/7">স্ট্যাটাস</th>
                  <th className="px-4 py-2 text-center w-1/7">তারিখ</th>
                  <th className="px-4 py-2 text-center w-1/7">একশন</th>
                </tr>
              </thead>
              <tbody>
                {" "}
                {data?.data?.map((item, index) => {
                  return (
                    <tr key={index} className="y-2">
                      <td>{index + 1}</td>
                      <td className="text-xs">{item?.payment_id}</td>
                      <td className="text-xs">{item?.transaction_id}</td>
                      <td className="text-xs">{item?.points}</td>
                      <td className="text-xs">{item?.amount}</td>

                      <td className="text-xs">{item?.status}</td>
                      <td className="text-xs">
                        {formatDateString(item.createdAt)}
                      </td>
                      <td className="p-2">
                        <button className="bg-blue-500 text-white py-1 px-3 rounded flex items-center gap-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l2 2m-4 0l2-2m6-4V3m0 8l4-4m-4 4l4 4m-4-4h4"
                            ></path>
                          </svg>
                          Request for refund
                        </button>
                      </td>
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
