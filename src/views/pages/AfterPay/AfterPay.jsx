import { useEffect, useContext, useRef } from "react";
import { useNavigate, useSearchParams } from "@/lib/navigation";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { BkashCallAfterPay } from "../../../services/bkash";
import UserContext from "../../../contexts/UserContext";
import { getErrorMessage } from "../../../utils/error";
import { PayResultShell, Spinner, buildUrl, cleanParam } from "../PayResult/PayResult";

const AfterPay = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get("status");
  const bio_user = cleanParam(searchParams.get("bio_user"));
  const purpose = cleanParam(searchParams.get("purpose"));
  const paymentID = searchParams.get("paymentID");
  const pathname = cleanParam(searchParams.get("pathname"));
  const { user } = useContext(UserContext);
  // TODO: run once even if React re-runs the effect (dev strict mode, context updates).
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;

    const fail = (message) =>
      navigate(buildUrl("/pay/fail", { status, message, pathname }), { replace: true });

    if (status !== "success" || !paymentID) {
      started.current = true;
      fail();
      return;
    }
    if (!user?.email) return;
    started.current = true;

    (async () => {
      try {
        const response = await BkashCallAfterPay({
          paymentID,
          email: user.email,
          purpose,
        });
        if (response?.success) {
          navigate(
            buildUrl("/pay/success", {
              trxID: response.trxID,
              amount: response.amount,
              points: response.points,
              time: response.payment_create_time,
              bio_user,
              purpose,
              pathname,
            }),
            { replace: true }
          );
        } else {
          fail(response?.message);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        fail(getErrorMessage(error));
      }
    })();
  }, [status, paymentID, navigate, user?.email, bio_user, purpose, pathname]);

  return (
    <PayResultShell
      tone="info"
      icon={<Spinner />}
      title="পেমেন্ট যাচাই করা হচ্ছে"
      subtitle="বিকাশ থেকে আপনার পেমেন্ট নিশ্চিত করা হচ্ছে। অনুগ্রহ করে পেজটি বন্ধ বা রিফ্রেশ করবেন না।"
    >
      <p className="mt-6 inline-flex items-center gap-1.5 text-xs text-gray-400">
        <ShieldCheckIcon className="h-4 w-4" aria-hidden="true" />
        নিরাপদ বিকাশ পেমেন্ট
      </p>
    </PayResultShell>
  );
};

export default AfterPay;
