import { useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { paymentServices } from "../../services/payments";
import { getToken } from "../../utils/cookies";
import LoadingCircle from "../LoadingCircle/LoadingCircle";
import { refundServices } from "../../services/refunds";
import { Toast } from "../../utils/toast";
import UserContext from "../../contexts/UserContext";
import { convertToBengaliDigits } from "../../utils/language";

const HOUR = 60 * 60 * 1000;
const toBn = (value) => convertToBengaliDigits(String(value));

const formatDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleString("bn-BD", { dateStyle: "medium", timeStyle: "short" });
};

// TODO: mirrors the backend refund policy: full within 6h, otherwise points at 1.5 = ৳1, up to 3 days.
const refundPreview = (payment) => {
  const age = Date.now() - new Date(payment.createdAt).getTime();
  if (age > 72 * HOUR) return null;
  if (age <= 6 * HOUR) return payment.amount;
  return Math.min(payment.amount, Math.floor((payment.points || 0) / 1.5));
};

const requestBadge = {
  requested: { label: "রিফান্ড অনুরোধ পর্যালোচনাধীন", className: "bg-amber-100 text-amber-800" },
  refunded: { label: "রিফান্ড সম্পন্ন", className: "bg-green-100 text-green-800" },
  rejected: { label: "রিফান্ড অনুরোধ বাতিল", className: "bg-red-100 text-red-700" },
};

const PaymentHistory = () => {
  const queryClient = useQueryClient();
  const { userInfo } = useContext(UserContext);
  const balance = userInfo?.data?.points ?? 0;

  const { data, isLoading } = useQuery({
    queryKey: ["payments", getToken()?.token],
    queryFn: async () => paymentServices.getPaymentsByUser(getToken()?.token),
    retry: false,
  });
  const { data: requests = [] } = useQuery({
    queryKey: ["refund-requests", "me"],
    queryFn: refundServices.getMyRefundRequests,
    retry: false,
  });

  const requestByPayment = new Map(requests.map((item) => [String(item.payment), item]));

  const handleRequestRefund = async (payment) => {
    const amount = refundPreview(payment);
    if (amount === null || amount < 1) {
      Toast.errorToast("এই পেমেন্টটি রিফান্ডের যোগ্য নয়");
      return;
    }
    if (balance < (payment.points || 0)) {
      Toast.errorToast(
        `রিফান্ড অনুরোধ করতে আপনার অ্যাকাউন্টে কমপক্ষে ${toBn(payment.points)} পয়েন্ট থাকতে হবে`
      );
      return;
    }

    const result = await Swal.fire({
      title: "রিফান্ড অনুরোধ করবেন?",
      html: `
        <p style="margin-bottom:8px">আপনি <b>৳${toBn(amount)}</b> ফেরত পাবেন${amount < payment.amount ? ` (পেমেন্ট ছিল ৳${toBn(payment.amount)}; ৬ ঘন্টা পরে ১.৫ পয়েন্ট = ১৳ রেটে)` : ""}।</p>
        <p>অনুরোধ করার সাথে সাথে <b>${toBn(payment.points || 0)} পয়েন্ট</b> আটকে রাখা হবে। অনুরোধ বাতিল হলে পয়েন্ট ফেরত পাবেন।</p>
      `,
      input: "textarea",
      inputPlaceholder: "রিফান্ডের কারণ লিখুন (ঐচ্ছিক)",
      inputAttributes: { maxlength: "500" },
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "অনুরোধ পাঠান",
      cancelButtonText: "বাতিল",
      confirmButtonColor: "#0D7377",
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: async (reason) => {
        try {
          return await refundServices.requestRefund(payment._id, reason);
        } catch (error) {
          Swal.showValidationMessage(
            error?.response?.data?.message || "অনুরোধ পাঠানো যায়নি"
          );
          return false;
        }
      },
    });

    if (result.isConfirmed) {
      Toast.successToast("আপনার রিফান্ড অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে");
      queryClient.invalidateQueries({ queryKey: ["refund-requests", "me"] });
      queryClient.invalidateQueries({ queryKey: ["user-info"] });
    }
  };

  if (isLoading) return <LoadingCircle />;
  const payments = data?.data || [];
  if (payments.length === 0) {
    return <p className="py-10 text-center text-gray-500">কোনো পেমেন্ট হিস্টোরি নেই</p>;
  }

  return (
    <div className="my-favs-info w-auto rounded border-t-2 shadow">
      <h5 className="card-title my-3 text-center text-2xl">পেমেন্ট হিস্টোরি</h5>
      <p className="mb-3 px-4 text-center text-xs text-gray-500">
        পেমেন্টের ৩ দিনের মধ্যে রিফান্ড অনুরোধ করা যাবে। ৬ ঘন্টার মধ্যে পূর্ণ রিফান্ড, এরপর ১.৫ পয়েন্ট = ১৳ রেটে।
      </p>
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="border-b border-t">
              <th className="px-3 py-2 text-center">SL</th>
              <th className="px-3 py-2 text-center">ট্রানজেকশন আইডি</th>
              <th className="px-3 py-2 text-center">পয়েন্ট</th>
              <th className="px-3 py-2 text-center">পরিমাণ</th>
              <th className="px-3 py-2 text-center">স্ট্যাটাস</th>
              <th className="px-3 py-2 text-center">তারিখ</th>
              <th className="px-3 py-2 text-center">রিফান্ড</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((item, index) => {
              const request = requestByPayment.get(String(item._id));
              const badge = request && requestBadge[request.status];
              const preview = refundPreview(item);
              const canRequest =
                !request && item.status === "Completed" && preview !== null && preview >= 1;

              return (
                <tr key={item._id} className="border-b last:border-b-0">
                  <td className="px-3 py-2 text-center">{toBn(index + 1)}</td>
                  <td className="break-all px-3 py-2 text-center font-mono text-xs">{item.transaction_id}</td>
                  <td className="px-3 py-2 text-center">{toBn(item.points ?? 0)}</td>
                  <td className="px-3 py-2 text-center">৳{toBn(item.amount ?? 0)}</td>
                  <td className="px-3 py-2 text-center text-xs">{item.status}</td>
                  <td className="px-3 py-2 text-center text-xs">{formatDate(item.createdAt)}</td>
                  <td className="px-3 py-2 text-center">
                    {badge ? (
                      <div className="flex flex-col items-center gap-1">
                        <span className={`whitespace-nowrap rounded-full px-2 py-1 text-xs font-semibold ${badge.className}`}>
                          {badge.label}
                        </span>
                        <span className="text-xs text-gray-500">৳{toBn(request.refund_amount)}</span>
                        {request.status === "rejected" && request.admin_note && (
                          <span className="max-w-[12rem] text-xs text-gray-500">কারণ: {request.admin_note}</span>
                        )}
                      </div>
                    ) : canRequest ? (
                      <button
                        type="button"
                        onClick={() => handleRequestRefund(item)}
                        className="whitespace-nowrap rounded bg-[#0D7377] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#0F8287] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D7377]/40"
                      >
                        রিফান্ড অনুরোধ
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400">
                        {item.status === "Refunded" ? "রিফান্ড সম্পন্ন" : "প্রযোজ্য নয়"}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
