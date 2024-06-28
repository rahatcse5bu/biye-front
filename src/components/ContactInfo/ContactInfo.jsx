/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
import BioContext from "../../contexts/BioContext";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../../contexts/UserContext";
import { Toast } from "../../utils/toast";
import BkashCreatePaymentAPICall from "../../services/bkash";
import { convertToBengaliNumerals } from "../../utils/weight";
import { getToken, removeToken } from "../../utils/cookies";
import { BioChoiceDataServices } from "../../services/bioChoiceData";
import { userServices } from "../../services/user";
import { getErrorMessage } from "../../utils/error";
const ContactInfo = ({ contact, status }) => {
  const [displayText, setDisplayText] = useState(false);
  const [checkMsg, setCheckMsg] = useState("");
  const { bio } = useContext(BioContext);
  const { userInfo, logOut } = useContext(UserContext);
  const generalInfo = bio?.generalInfo || null;
  const points = Number(userInfo?.data?.points);
  const token = getToken()?.token;
  const bio_user = generalInfo?.user;

  const { data: contactInfo = null } = useQuery({
    queryKey: ["contact", generalInfo?.user, getToken()?.token],
    queryFn: async () =>
      await BioChoiceDataServices.checkBioChoiceDataSecondStep(
        generalInfo?.user,
        getToken()?.token
      ),
    retry: false,
  });
  // console.log("contact", contact);
  console.log("Contact-info~~", contactInfo);

  // console.log({ points });
  const navigate = useNavigate();
  useEffect(() => {
    if (displayText) {
      const timeout = setTimeout(() => {
        // setDisplayText(false);
      }, 10000); // 10 seconds timeout
      return () => clearTimeout(timeout);
    }
  }, [displayText]);

  useEffect(() => {
    const check = async () => {
      try {
        //? check first step

        if (!getToken()?.token || !generalInfo?.user) {
          // Toast.errorToast("Please,Login to view more");
          return;
        }

        const checkFirst =
          await BioChoiceDataServices.checkBioChoiceDataFirstStep(
            generalInfo?.user,
            getToken()?.token
          );
        // console.log("bio-check-first-step~", checkFirst);
        const status = checkFirst?.data?.status;
        let msg = "";

        if (status) {
          // console.log({ status });
          if (status === "approved" || status === "accepted") {
            msg = "আপনার প্রথম পদক্ষেপ সম্পূর্ন হয়েছে।";
            // Toast.successToast(msg);
            setCheckMsg(msg);
          } else if (status === "rejected") {
            msg = "দুংক্ষিত ,আপনি প্রতাক্ষিত হয়েছেন এই বায়োডাটা  থেকে।";
            // Toast.successToast(msg);
            setCheckMsg(msg);
          } else if (status === "pending") {
            msg = "দুংক্ষিত ,আপনি পেন্ডিং  আছেন এই বায়োডাটা  থেকে।";
            // Toast.successToast(msg);
            setCheckMsg(msg);
          }
        }

        // const checkSecond =
        //   await BioChoiceDataServices.checkBioChoiceDataSecondStep(
        //     bio_user,
        //     token
        //   );
        // console.log("bio-choice-second-step~", checkSecond);
        // if (checkSecond?.success) {
        //   const payment_status = checkSecond?.data?.payment_status;
        //   const refund_status = checkSecond?.data?.refund_status;
        //   if (payment_status === "Completed" && refund_status !== "refunded") {
        //     msg = "দুংক্ষিত ,আপনি এই বায়োডাটা ইতিমধ্যে কিনছেন";
        //     Toast.successToast(msg);
        //     setCheckMsg(msg);
        //   }
        //   if (payment_status === "Completed" && refund_status === "refunded") {
        //     msg =
        //       "দুংক্ষিত ,আপনি এই বায়োডাটার ইতিমধ্যে প্রথম পদক্ষেপ  কিনছেন,\n আপনি দ্বিতীয় পদক্ষেপ এর জন্য টাকা পরিশোধ করুন ";
        //     Toast.successToast(msg);
        //     setCheckMsg(msg);
        //   }
        // }
      } catch (error) {
        // let msg = error?.response?.data?.message || error?.message;
        // console.log("contact-info-error~", error);
        // Toast.errorToast(msg);
      }
    };
    check();
  }, [bio_user, generalInfo?.user, token]);

  const comHandler = () => {
    if (!userInfo?.data?._id) {
      Toast.errorToast("Please,Login first");
      return;
    }

    Swal.fire({
      title: "আপনি কি তথ্য দেখতে চান?",
      text: `যোগাযোগ তথ্য দেখতে আপনার ৩০ পয়েন্ট খরচ হবে 
			। ${
        points >= 30
          ? convertToBengaliNumerals((points - 30).toString()) +
            " অবশিষ্ট থাকবে"
          : "আপনার আরও " +
            convertToBengaliNumerals((30 - points).toString()) +
            " পয়েন্ট লাগবে"
      }`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
    }).then(async (result) => {
      if (!result.isConfirmed) {
        return;
      }

      if (result.isConfirmed && points < 30) {
        setDisplayText(true);
      } else if (result.isConfirmed) {
        navigate(`/send-form/${bio?.generalInfo?.user}`);
      }
    });
  };

  const buyWithBkashHandler = async (value, bioId) => {
    let response;
    // ? verification check
    try {
      response = await userServices.verifyToken(getToken()?.token);
      console.log("navbar-verify-token~", response);
      const data = response?.data;
      const user_id = userInfo?.data[0]?.id;

      if (data?.user_id !== user_id) {
        await logOut();
        removeToken();
        Toast.errorToast("You are not authorized");
        navigate("/login");
      }
    } catch (error) {
      console.error("navbar-verify-token~", error);
      let msg = getErrorMessage(error);
      Toast.errorToast(msg);
      await logOut();
      removeToken();
      navigate("/login");
    }

    // ? bkash payment api call
    const amount = parseInt(value);
    if (isNaN(amount) || +amount <= 0) {
      alert("Please enter a valid amount.");
    } else if (response?.success === true) {
      BkashCreatePaymentAPICall(amount, bioId);
    } else {
      await logOut();
      removeToken();
      navigate("/login");
    }
  };

  return (
    <div className="rounded shadow single-bio-contact-info">
      {contactInfo ? (
        <>
          <h5 className="my-3 text-2xl text-center card-title">যোগাযোগ</h5>
          <div className="paid-contact-info">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-t border-b">
                  <td className="w-1/2 px-4 py-2 text-left">
                    {" "}
                    {generalInfo?.gender === "মহিলা" ||
                    generalInfo?.bio_type === "পাত্রীর বায়োডাটা"
                      ? "পাত্রীর নাম"
                      : "পাত্রের নাম"}{" "}
                  </td>
                  <td className="w-1/2 px-4 py-2 text-left border-l">
                    {contactInfo.data?.contact_info.full_name}
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="w-1/2 px-4 py-2 text-left">
                    অভিভাবকের মোবাইল নাম্বার
                  </td>
                  <td className="w-1/2 px-4 py-2 text-left border-l">
                    {contactInfo.data?.contact_info.family_number}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="w-1/2 px-4 py-2 text-left">
                    অভিভাবকের ই-মেইল
                  </td>
                  <td className="w-1/2 px-4 py-2 text-left border-l">
                    {contactInfo.data?.contact_info.bio_receiving_email}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="w-1/2 px-4 py-2 text-left">
                    অভিভাবকের সাথে সম্পর্ক
                  </td>
                  <td className="px-4 py-2 text-left border-l">
                    {contactInfo.data?.contact_info.relation}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-center mt-5">
              <button className="px-4 py-2 text-white mb-4 bg-red-800 rounded bio-report-btn w-93">
                রিপোর্ট করুন
              </button>
            </div>
          </div>
        </>
      ) : status === "hidden" ? (
        <div className="pnc-bio-hidden">
          <h4 className="my-4 text-center">
            এই বায়োডাটাটি হাইড অবস্থায় আছে। অর্থাৎ এই মুহুর্তে তিনি কোনো
            প্রস্তাব পেতে আগ্রহী নয়। তাই এখন এই বায়োডাটার যোগাযোগ তথ্য দেখা যাবে
            না।
          </h4>
        </div>
      ) : (
        <div className="ask-contact-info">
          <h4 className="my-4 text-center">
            সতর্কতা - বিয়ের সিদ্ধান্ত নেয়ার পূর্বে স্থানীয়ভাবে খোঁজ নিয়ে
            বায়োডাটার সমস্ত তথ্য যাচাই করবেন।
          </h4>
          <h2 className="my-5 text-2xl text-center">
            এই বায়োডাটার অভিভাবকের যোগাযোগের তথ্য দেখতে আপনার{" "}
            {convertToBengaliNumerals("30")} টি পয়েন্ট খরচ হবে।
          </h2>
          <div className="flex flex-col items-center justify-center ">
            {displayText ? (
              <div className="pb-5">
                <p className="mb-2 text-xl">
                  আপনার একাউন্টে কোনো{" "}
                  {convertToBengaliNumerals(points.toString())} পয়েন্ট আছে!
                </p>
                <button
                  className="px-2 py-2 text-white bg-green-800 rounded-md hover:bg-green-900"
                  onClick={() =>
                    buyWithBkashHandler(30 - points, generalInfo?.user_id)
                  }
                >
                  {convertToBengaliNumerals((30 - points).toString())} পয়েন্ট
                  কিনুন
                </button>
              </div>
            ) : checkMsg ? (
              <p className="px-5 py-3 mb-5 text-green-900 bg-green-200 border-2 border-green-600 rounded-lg">
                {checkMsg}
              </p>
            ) : (
              <button
                onClick={comHandler}
                className="px-4 py-2 mb-5 text-white bg-blue-500 rounded contact-bio-btn w-93"
              >
                যোগাযোগের তথ্য দেখুন
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactInfo;
