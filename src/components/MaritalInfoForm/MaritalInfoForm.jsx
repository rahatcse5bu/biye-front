/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import FormTitle from "../FormTitle/FormTitle";
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import { Colors } from "../../constants/colors";
import UserContext from "../../contexts/UserContext";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../utils/cookies";
import LoadingCircle from "../LoadingCircle/LoadingCircle";
// import { useNavigate } from "react-router-dom";
import { MaritalInfoInfoServices } from "../../services/maritalInfo";
import { getErrorMessage } from "../../utils/error";
import { Toast } from "../../utils/toast";
// import { verifyToken } from "../../services/verifyToken";

const MaritalInfoForm = ({ userForm, setUserForm, religion = 'islam', gender: genderProp = '', maritalStatus: maritalStatusProp = '' }) => {
  const [wifeDeadInfo, setWifeDeadInfo] = useState("");
  const [whenHusbandDead, setWhenHusbandDead] = useState("");
  const [divorcedReason, setDivorcedReason] = useState("");
  // const [isJoutuk, setIsJoutuk] = useState("");
  const [whyMarriedAnother, setWhyMarriedAnother] = useState("");
  const [whyMarriage, setWhyMarriage] = useState("");
  const [hopeForGift, setHopeForGift] = useState("");
  const [permissionForStudy, setPermissionForStudy] = useState("");
  const [isFamilyAgree, setIsFamilyAgree] = useState("");
  const [isRunningJob, setIsRunningJob] = useState("");
  const [afterMarriageRunningJob, setAfterMarriageRunningJob] = useState("");
  const [isRunningStudy, setIsRunningStudy] = useState("");
  const [isWifePorda, setIsWifePorda] = useState("");
  const [quantityWifeAndChildren, setQuantityWifeAndChildren] = useState("");
  const [permissionForJob, setPermissionForJob] = useState("");
  const [afterMarryWhere, setAfterMarryWhere] = useState("");
  const [loading, setLoading] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [gender, setGender] = useState("");

  const { userInfo } = useContext(UserContext);
  // const navigate = useNavigate();

  const { data: maritalInfo = null, isLoading } = useQuery({
    queryKey: ["marital-info", userInfo?.data?._id, getToken()?.token],
    queryFn: async () => {
      return await MaritalInfoInfoServices.getMaritalInfoInfoByUser(
        getToken()?.token
      );
    },
    retry: false,
    enabled: !!userInfo?.data?._id,
  });

  // maritalStatus and gender are set from maritalInfo or from the prop
  useEffect(() => {
    if (genderProp) setGender(genderProp);
    if (maritalStatusProp) setMaritalStatus(maritalStatusProp);
  }, [genderProp, maritalStatusProp]);
  // useEffect(() => {
  // 	verifyToken(userInfo?.data[0]?.id, logOut, "marital-info-verify-token");
  // }, [logOut, userInfo?.data]);
  const backButtonHandler = () => {
    if (userForm > 1) {
      setUserForm((prev) => prev - 1);
    }
  };

  // console.log(generalInfo);

  // console.log("sina-marital-status~~", maritalStatus, gender);

  useEffect(() => {
    if (maritalInfo?.data) {
      const {
        isFamilyAgree,
        isPordaToWife,
        permission_for_study,
        permission_for_job,
        isJoutuk,
        after_marriage_where,
        divorced_reason,
        why_marriage,
        wife_dead_info,
        when_husband_dead,
        why_married_another,
        is_running_job,
        is_running_study,
        after_marriage_running_job,
        quantity_wife_and_children,
      } = maritalInfo.data;

      setQuantityWifeAndChildren(quantity_wife_and_children);
      setAfterMarriageRunningJob(after_marriage_running_job);
      setIsRunningStudy(is_running_study);
      setIsRunningJob(is_running_job);
      setWhyMarriedAnother(why_married_another);
      setWhenHusbandDead(when_husband_dead);
      setWifeDeadInfo(wife_dead_info);
      setWhyMarriage(why_marriage);
      setDivorcedReason(divorced_reason);
      setAfterMarryWhere(after_marriage_where);
      setHopeForGift(isJoutuk);
      setPermissionForJob(permission_for_job);
      setPermissionForStudy(permission_for_study);
      setIsWifePorda(isPordaToWife);
      setIsFamilyAgree(isFamilyAgree);
    }
  }, [maritalInfo]);
  // console.log(maritalStatus);
  const submitHandler = async (e) => {
    e.preventDefault();

    let maritalInfoData = {
      isFamilyAgree: isFamilyAgree,
      isPordaToWife: isWifePorda,
      permission_for_study: permissionForStudy,
      permission_for_job: permissionForJob,
      after_marriage_where: afterMarryWhere,
      why_marriage: whyMarriage,
      wife_dead_info: wifeDeadInfo,
      when_husband_dead: whenHusbandDead,
      divorced_reason: divorcedReason,
      why_married_another: whyMarriedAnother,
      is_running_job: isRunningJob,
      is_running_study: isRunningStudy,
      after_marriage_running_job: afterMarriageRunningJob,
      isJoutuk: hopeForGift,
      quantity_wife_and_children: quantityWifeAndChildren,
    };

    if (!getToken()?.token || !userInfo?.data?._id) {
      alert("Please logout and try again");
      return;
    }

    // console.log(maritalInfoData);

    try {
      setLoading(true);
      let data;
      if (maritalInfo?.success === true) {
        data = await MaritalInfoInfoServices.updateMaritalInfoInfo(
          maritalInfoData,
          getToken().token
        );
      } else {
        data = await MaritalInfoInfoServices.createMaritalInfoInfo(
          { ...maritalInfoData, user_form: userForm },
          getToken().token
        );
      }

      if (data.success) {
        Toast.successToast("আপনার তথ্য সেভ করা হয়েছে ");
        setUserForm((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
      const errorMsg = getErrorMessage(error);
      Toast.errorToast(errorMsg);

      //! for token error redirect to logout
      // if (errorMsg.includes("You are not authorized")) {
      //   await logOut();
      //   removeToken();
      //   navigate("/");
      // }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <FormTitle title="বিবাহ সম্পর্কিত তথ্য" />
      {isLoading ? (
        <LoadingCircle classes="mt-10" />
      ) : (
        <form action="" onSubmit={submitHandler}>
          {maritalStatus === "বিপত্নীক" && (
            <>
              <Textarea
                title=" আপনার স্ত্রী কবে, কিভাবে মারা গিয়েছিলেন?"
                subtitle="কয় বছরের সংসার ছিল, সন্তান আছে কি না, থাকলে তাদের বয়স সহ বর্ণনা দিবেন।"
                value={wifeDeadInfo}
                setValue={setWifeDeadInfo}
                required
              />
            </>
          )}

          {maritalStatus === "বিধবা" && (
            <>
              <Textarea
                title="আপনার স্বামী কবে, কিভাবে মারা গিয়েছিল?"
                subtitle="কয় বছরের সংসার ছিল, সন্তান আছে কি না, থাকলে তাদের বয়স সহ বর্ণনা দিবেন।"
                value={whenHusbandDead}
                setValue={setWhenHusbandDead}
                required
              />
            </>
          )}

          {maritalStatus === "ডিভোর্সড" && (
            <>
              <Textarea
                title="  আপনার পূর্বের বিবাহ ও ডিভোর্সের তারিখ উল্লেখ করে ডিভোর্সের কারণ লিখুন"
                subtitle="সন্তান থাকলে তাদের বয়স ও কার দায়িত্বে আছে লিখবেন। এছাড়া অন্যান্য বিষয় থাকলে লিখবেন।"
                value={divorcedReason}
                setValue={setDivorcedReason}
                required
              />
            </>
          )}
          {maritalStatus === "বিবাহিত" && (
            <>
              <Textarea
                title=" বিবাহিত অবস্থায় আবার কেন বিয়ে করতে চাচ্ছেন? "
                subtitle="বর্তমান স্ত্রী আপনার নতুন বিয়েতে রাজি কি না এবং অন্যান্য বিষয়ে বিস্তারিত লিখবেন"
                value={whyMarriedAnother}
                setValue={setWhyMarriedAnother}
                required
              />

              <Textarea
                title="বর্তমানে আপনার কতজন স্ত্রী ও সন্তান আছে?"
                value={quantityWifeAndChildren}
                setValue={setQuantityWifeAndChildren}
                required
              />
            </>
          )}

          <Input
            title="অভিভাবক আপনার বিয়েতে রাজি কি না?"
            required
            value={isFamilyAgree}
            setValue={setIsFamilyAgree}
          />
          {gender === "পুরুষ" && (
            <>
              {religion === 'islam' && (
              <Input
                title="বিয়ের পর স্ত্রীকে পর্দায় রাখতে পারবেন?"
                required
                value={isWifePorda}
                setValue={setIsWifePorda}
              />
              )}

              <Input
                title="বিয়ের পর স্ত্রীকে পড়াশোনা করতে দিতে চান? "
                required
                value={permissionForStudy}
                setValue={setPermissionForStudy}
              />
              <Input
                title="বিয়ের পর স্ত্রীকে চাকরী করতে দিতে চান?"
                required
                value={permissionForJob}
                setValue={setPermissionForJob}
              />
              <Input
                title="বিয়ের পর স্ত্রীকে কোথায় নিয়ে থাকবেন? "
                required
                value={afterMarryWhere}
                setValue={setAfterMarryWhere}
              />
              <Input
                title="আপনি বা আপনার পরিবার পাত্রীপক্ষের কাছে কোনো উপহার আশা করবেন কি না?"
                required
                value={hopeForGift}
                setValue={setHopeForGift}
              />
            </>
          )}

          {gender === "মহিলা" && (
            <>
              <Input
                title="আপনি কি বিয়ের পর চাকরি করতে ইচ্ছুক?"
                required
                value={afterMarriageRunningJob}
                setValue={setAfterMarriageRunningJob}
              />
              <Input
                title="পড়াশোনা চালিয়ে যেতে চান?  "
                required
                value={isRunningStudy}
                setValue={setIsRunningStudy}
              />
              <Input
                title="বিয়ের পর চাকরি চালিয়ে যেতে চান? "
                value={isRunningJob}
                setValue={setIsRunningJob}
                subtitle="চাকুরীজীবী না হলে ঘরটি ফাঁকা রাখুন।"
              />
            </>
          )}
          {/* <Input
            title="বিয়েতে যৌতুক নিবেন বা দিবেন?"
            value={isJoutuk}
            setValue={setIsJoutuk}
            subtitle="চাকুরীজীবী না হলে ঘরটি ফাঁকা রাখুন।"
          /> */}

          <Textarea
            title="কেন বিয়ে করছেন? বিয়ে সম্পর্কে আপনার ধারণা কি?"
            value={whyMarriage}
            setValue={setWhyMarriage}
            required
          />

          <div className="flex items-center justify-between my-5">
            <button
              type="button"
              onClick={backButtonHandler}
              className="px-5 py-2 text-xl text-white bg-gray-700 rounded-3xl"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xl text-white rounded-3xl"
              style={{
                background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight})`,
              }}
            >
              {loading ? <LoadingCircle /> : "Save & Next"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default MaritalInfoForm;
