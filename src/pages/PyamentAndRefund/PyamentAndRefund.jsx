import PaymentHistory from "../../components/PaymentHistory/PaymentHistory";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../utils/cookies";
import { paymentServices } from "../../services/payments";
const PaymentAndRefund = () => {
  const { data, error } = useQuery({
    queryKey: ["payments", getToken()?.token],
    queryFn: async () => {
      return await paymentServices.getPaymentsByUser(getToken()?.token);
    },
    retry: false,
  });

  console.log("data~~", data);
  return (
    <div className="py-12 mx-auto ">
      <div className="col right-sidebar-main my-favs">
        <PaymentHistory />
      </div>
    </div>
  );
};

export default PaymentAndRefund;
