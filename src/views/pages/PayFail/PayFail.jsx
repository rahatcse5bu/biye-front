import { useNavigate, useSearchParams } from "@/lib/navigation";
import { XMarkIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import {
  PayResultShell,
  cleanParam,
  primaryButton,
  safePath,
  secondaryButton,
  toBn,
  useCountdown,
} from "../PayResult/PayResult";

const REDIRECT_SECONDS = 10;

// TODO: bKash sends status=cancel when the user closes checkout, status=failure when the payment fails.
const reasonFor = (status, message) => {
  if (status === "cancel") {
    return { title: "পেমেন্ট বাতিল করা হয়েছে", text: "আপনি পেমেন্ট বাতিল করেছেন। আপনার অ্যাকাউন্ট থেকে কোনো টাকা কাটা হয়নি।" };
  }
  if (status === "failure") {
    return { title: "পেমেন্ট ব্যর্থ হয়েছে", text: "বিকাশ পেমেন্টটি সম্পন্ন করতে পারেনি। অনুগ্রহ করে আবার চেষ্টা করুন।" };
  }
  return {
    title: "পেমেন্ট সম্পন্ন হয়নি",
    text: "আপনার পেমেন্ট নিশ্চিত করা যায়নি। টাকা কেটে থাকলে ট্রানজেকশন আইডিসহ আমাদের সাপোর্টে যোগাযোগ করুন।",
    detail: message,
  };
};

const PayFail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = cleanParam(searchParams.get("status"));
  const message = cleanParam(searchParams.get("message"));
  const retryPath = safePath(cleanParam(searchParams.get("pathname")), "/points-package");
  const reason = reasonFor(status, message);

  const retry = () => navigate(retryPath, { replace: true });
  const secondsLeft = useCountdown(REDIRECT_SECONDS, retry);

  return (
    <PayResultShell
      tone="error"
      icon={<XMarkIcon className="h-10 w-10 stroke-[2.5]" aria-hidden="true" />}
      title={reason.title}
      subtitle={reason.text}
      progress={((REDIRECT_SECONDS - secondsLeft) / REDIRECT_SECONDS) * 100}
    >
      {reason.detail && (
        <p className="mt-5 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {reason.detail}
        </p>
      )}

      <button type="button" onClick={retry} className={`${primaryButton} mt-6`}>
        <ArrowPathIcon className="h-4 w-4" aria-hidden="true" />
        আবার চেষ্টা করুন
      </button>
      <button
        type="button"
        onClick={() => navigate("/user/account/dashboard", { replace: true })}
        className={`${secondaryButton} mt-3`}
      >
        ড্যাশবোর্ডে যান
      </button>
      <p className="mt-4 text-xs text-gray-500">
        {toBn(secondsLeft)} সেকেন্ডের মধ্যে আগের পেজে ফিরিয়ে নেওয়া হবে
      </p>
    </PayResultShell>
  );
};

export default PayFail;
