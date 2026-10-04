// import React from 'react';
import { Colors } from "../../constants/colors";
import BkashCreatePaymentAPICall from "../../services/bkash";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import UserContext from "../../contexts/UserContext";
import { Toast } from "../../utils/toast";
import { useLocation } from "@/lib/navigation";
import { pointsPackageService } from "../../services/pointsPackages";
import { convertToBengaliDigits } from "../../utils/language";
import CustomPointsCard from "./CustomPointsCard";

const toBn = (value) => convertToBengaliDigits(String(value));

function Payments() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const {
    data: packages = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["points-packages"],
    queryFn: pointsPackageService.list,
  });
  const { data: customSettings } = useQuery({
    queryKey: ["points-packages", "custom-settings"],
    queryFn: pointsPackageService.customSettings,
  });

  // console.log("userInfo", userInfo);
  // console.log("user", user);
  const buyWithBkashHandler = async (value) => {
    if (!user?.email) {
      Toast.errorToast("Please Login");
      return;
    }
    // console.log("location", location.pathname);
    if (+value >= 1) {
      // console.log("value", +value);
      BkashCreatePaymentAPICall(
        process.env.NODE_ENV === "development" ? 1 : +value,
        "",
        "buy_package",
        location.pathname
      );
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
      {isLoading && (
        <p className="text-center text-gray-500">প্যাকেজ লোড হচ্ছে...</p>
      )}
      {isError && (
        <p className="text-center text-red-600">
          প্যাকেজ লোড করা যায়নি। পরে আবার চেষ্টা করুন।
        </p>
      )}
      {!isLoading && !isError && packages.length === 0 && (
        <p className="text-center text-gray-500">
          এই মুহূর্তে কোনো প্যাকেজ নেই।
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages.map((packageItem) => (
          <div
            key={packageItem._id}
            className="bg-white p-6 rounded-lg shadow-md border"
            style={{ borderColor: Colors.titleText }}
          >
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: Colors.titleText }}
            >
              {packageItem.name}
            </h2>
            <p className="text-gray-600 mb-4">{toBn(packageItem.price)} টাকা</p>
            <ul className="text-gray-700 mb-4">
              {[`${toBn(packageItem.points)} পয়েন্ট`, ...packageItem.features].map((feature, featureIndex) => (
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
              onClick={() => buyWithBkashHandler(packageItem.price)}
            >
              Buy With Bkash
            </button>
          </div>
        ))}
      </div>
      {customSettings?.enabled && (
        <CustomPointsCard
          settings={customSettings}
          packages={packages}
          onBuy={buyWithBkashHandler}
        />
      )}
    </div>
  );
}

export default Payments;
