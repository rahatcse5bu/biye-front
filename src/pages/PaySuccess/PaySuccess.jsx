import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

const PaySuccess = () => {
  const [showMessage, setShowMessage] = useState(true);
  const [searchParams] = useSearchParams();
  const message = searchParams.get("message");
  const bio_user = searchParams.get("bio_user");

  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowMessage(false);
    }, 5000); // 5 seconds timeout
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!showMessage) {
      if (bio_user && bio_user.length > 4) {
        navigate(`/send-form/${bio_user}`);
      } else {
        navigate("/user/account/dashboard");
      }
    }
  }, [showMessage, bio_user, navigate]);

  return (
    <div className="sm:mx-auto mx-3 my-10 rounded-md border-green-500 p-10 flex flex-col items-center justify-center w-full sm:w-1/2 bg-green-300">
      {message && (
        <h1 className="text-3xl mb-4 text-center text-green-900">{message}</h1>
      )}
    </div>
  );
};

export default PaySuccess;
