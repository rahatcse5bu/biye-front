// import React from 'react';
import { Colors } from "../../constants/colors";
import { packages } from "./payment.constant";
import BkashCreatePaymentAPICall from "../../services/bkash";
import { userServices } from "../../services/user";
import { getToken, removeToken } from "../../utils/cookies";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { Toast } from "../../utils/toast";
import { getErrorMessage } from "../../utils/error";
import { useNavigate } from "react-router";

function Payments() {
  const { userInfo, logOut } = useContext(UserContext);
  const navigate = useNavigate();
  const buyWithBkashHandler = async (value) => {
    let response;
    // ? verification check
    // try {
    // 	response = await userServices.verifyToken(getToken()?.token);
    // 	console.log("navbar-verify-token~", response);
    // 	const data = response?.data;
    // 	const user_id = userInfo?.data[0]?.id;

    // 	if (data?.user_id !== user_id) {
    // 		await logOut();
    // 		removeToken();
    // 		Toast.errorToast("You are not authorized");
    // 		navigate("/login");
    // 	}
    // } catch (error) {
    // 	console.error("navbar-verify-token~", error);
    // 	let msg = getErrorMessage(error);
    // 	Toast.errorToast(msg);
    // 	await logOut();
    // 	removeToken();
    // 	navigate("/login");
    // }

    const amount = parseInt(value);
    if (!isNaN(amount) || +amount >= 1) {
      BkashCreatePaymentAPICall(amount);
    } else {
      // await logOut();
      // removeToken();
      // navigate("/login");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1
        className="text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-8"
        style={{ color: Colors.titleText }}
      >
        আপনার পছন্দের প্যাকেজ কিনুন
      </h1>
      <h4 className="text-sm text-gray-500 font-semibold text-center mb-2 mt-4">
        পাত্র/পাত্রীর সাথে প্রতিবার আপনার বায়োডাটা শেয়ার করতে আপনাকে ৩০ পয়েন্ট
        খরচ করতে হবে।আর পাত্র/পাত্রীর অভিভাবকের যোগাযোগ এর নাম্বার পেতে আপনাকে
        ৭০ পয়েন্ট খরচ করতে হবে।{" "}
      </h4>
      <h4 className="text-sm text-gray-500 font-bold text-center mb-8">
        [বিকাশ , নগদ , রকেট দিয়ে পেমেন্ট করতে পারবেন]
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages.map((packageItem, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md border"
            style={{ borderColor: Colors.titleText }}
          >
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: Colors.titleText }}
            >
              {packageItem.name}
            </h2>
            <p className="text-gray-600 mb-4">{packageItem.price}</p>
            <ul className="text-gray-700 mb-4">
              {packageItem.features.map((feature, featureIndex) => (
                <li
                  key={featureIndex}
                  className="flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 6.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 9.586l2.293-2.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className=" hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              style={{
                background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight} )`,
              }}
              onClick={() => buyWithBkashHandler(packageItem.value)}
            >
              Buy With Bkash
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Payments;
