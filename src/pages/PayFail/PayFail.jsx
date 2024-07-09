import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PayFail = () => {
  const [searchParams] = useSearchParams();
  const message = searchParams.get("message");
  const pathname = searchParams.get("pathname");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Navigating to:", pathname);
    const timeout = setTimeout(() => {
      if (pathname) {
        navigate(pathname);
      } else {
        navigate("/points-package");
        console.error("Pathname is not provided");
      }
    }, 5000); // 10 seconds timeout

    return () => clearTimeout(timeout);
  }, [navigate, pathname]);

  return (
    <div className="sm:mx-auto mx-3 my-10 rounded-md border-red-500 p-10 flex flex-col items-center justify-center w-full sm:w-1/2 bg-red-300">
      <h1 className="text-3xl mb-4 text-center text-red-900">Failed !!</h1>
      {message && <p className="text-center text-red-900">{message}</p>}
    </div>
  );
};

export default PayFail;
