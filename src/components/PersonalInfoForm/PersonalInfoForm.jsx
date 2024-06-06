/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import FormTitle from "../FormTitle/FormTitle";
import Input from "../Input/Input";
import Select from "../Select/Select";
import {
  fiqhOptions,
  personalCategoryOptions,
} from "./personalInfoForm.constant";
import Textarea from "../Textarea/Textarea";
import { Colors } from "../../constants/colors";
import { useQuery } from "@tanstack/react-query";
import UserContext from "../../contexts/UserContext";
import { userServices } from "../../services/user";
import { getToken, removeToken } from "../../utils/cookies";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LoadingCircle from "../LoadingCircle/LoadingCircle";
import MultipleSelect from "../MultitpleSelect/MultipleSelect";
import { dataToMultiple, getDataFromMultipleInput } from "../../utils/form";
import { verifyToken } from "../../services/verifyToken";
import { GeneralInfoServices } from "../../services/generalInfo";
import { PersonalInfoInfoServices } from "../../services/personalInfo";
import { getErrorMessage } from "../../utils/error";
import { Toast } from "../../utils/toast";

const PersonalInfoForm = ({ setUserForm, userForm }) => {
  const [cloth, setCloth] = useState("");
  const [isDeenContribution, setIsDeenContribution] = useState("");
  const [mazar, setMazar] = useState("");
  const [fiqh, setFiqh] = useState("");
  const [personalCategory, setPersonalCategory] = useState("");
  const [salatKaza, setSalatKaza] = useState("");
  const [fromWhenBeard, setFromWhenBeard] = useState("");
  const [fromWhenFiveSalat, setFromWhenFiveSalat] = useState("");
  const [fromWhenNikhab, setFromWhenNikhab] = useState("");
  const [uponTakhno, setUponTakhno] = useState("");
  const [isDailyFive, setIsDailyFive] = useState("");
  const [isMahram, setIsMahram] = useState("");
  const [isNatok, setIsNatok] = useState("");
  const [isPureRecite, setIsPureRecite] = useState("");
  const [isDisease, setIsDisease] = useState("");
  const [books, setBooks] = useState("");
  const [scholars, setScholars] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [acceptIslam, setAcceptIslam] = useState("");
  const [phone, setPhone] = useState("");
  const [fromWhenFiveSalatJamat, setFromWhenFiveSalatJamat] = useState("");
  const [isDailyFiveJamaat, setIsDailyFiveJamaat] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNeshaDrobbo, setIsNeshaDrobbo] = useState("");
  const [isBeard, setIsBeard] = useState("");
  const [aboutMiladQiyam, setAboutMiladQiyam] = useState("");
  const navigate = useNavigate();

  const backButtonHandler = () => {
    if (userForm > 1) {
      setUserForm((prev) => prev - 1);
    }
  };
  const { userInfo, logOut } = useContext(UserContext);
  const { data: generalInfo = null } = useQuery({
    queryKey: ["general-info", userInfo?.data?._id, getToken()?.token],
    queryFn: async () => {
      return await GeneralInfoServices.getGeneralInfoByUser(getToken()?.token);
    },
    retry: false,
    enabled: !!userInfo?.data?._id,
  });

  const { data: personalInfo = null, isLoading } = useQuery({
    queryKey: ["personal-info", userInfo?.data?._id],
    queryFn: async () => {
      return await PersonalInfoInfoServices.getPersonalInfoInfoByUser(
        getToken()?.token
      );
    },
    retry: false,
    enabled: !!userInfo?.data?._id,
  });
  // useEffect(() => {
  // 	verifyToken(
  // 		userInfo?.data[0]?.id,
  // 		logOut,
  // 		"personal-info-form-verify-token"
  // 	);
  // }, [logOut, userInfo?.data]);
  const gender = generalInfo?.data?.gender || "";
  useEffect(() => {
    if (personalInfo?.data) {
      const {
        outside_clothings,
        isBeard,
        from_beard,
        isTakhnu,
        isDailyFive,
        isDailyFiveJamaat,
        daily_five_jamaat_from,
        daily_five_from,
        qadha_weekly,
        mahram_non_mahram,
        quran_tilawat,
        fiqh,
        natok_cinema,
        physical_problem,
        special_deeni_mehnot,
        mazar,
        islamic_books,
        islamic_scholars,
        my_categories,
        about_me,
        my_phone,
        isNeshaDrobbo,
        from_when_nikhab,
        about_reverted_islam,
        about_milad_qiyam,
      } = personalInfo.data;
      setCloth(outside_clothings);
      setIsBeard(isBeard);
      setFromWhenBeard(from_beard);
      setUponTakhno(isTakhnu);
      setIsDailyFive(isDailyFive);
      setIsDailyFiveJamaat(isDailyFiveJamaat);
      setFromWhenFiveSalatJamat(daily_five_jamaat_from);
      setFromWhenFiveSalat(daily_five_from);
      setSalatKaza(qadha_weekly);
      setIsMahram(mahram_non_mahram);
      setFiqh(fiqh);
      setMazar(mazar);
      setPersonalCategory(dataToMultiple(my_categories));
      setScholars(islamic_scholars);
      setBooks(islamic_books);
      setAboutMe(about_me);
      setPhone(my_phone);
      setIsPureRecite(quran_tilawat);
      setIsNatok(natok_cinema);
      setIsDeenContribution(special_deeni_mehnot);
      setIsDisease(physical_problem);
      setIsNeshaDrobbo(isNeshaDrobbo);
      setFromWhenNikhab(from_when_nikhab);
      setAcceptIslam(about_reverted_islam);
      setAboutMiladQiyam(about_milad_qiyam);
    }
  }, [personalInfo]);
  const submitHandler = async (e) => {
    e.preventDefault();

    let personalInfoData = {
      outside_clothings: cloth,
      from_beard: fromWhenBeard,
      isTakhnu: uponTakhno,
      isDailyFive: isDailyFive,
      isDailyFiveJamaat: isDailyFiveJamaat,
      daily_five_jamaat_from: fromWhenFiveSalatJamat,
      daily_five_from: fromWhenFiveSalat,
      qadha_weekly: salatKaza,
      mahram_non_mahram: isMahram,
      quran_tilawat: isPureRecite,
      fiqh: fiqh,
      natok_cinema: isNatok,
      physical_problem: isDisease,
      special_deeni_mehnot: isDeenContribution,
      mazar: mazar,
      islamic_books: books,
      islamic_scholars: scholars,
      my_categories: getDataFromMultipleInput(personalCategory),
      about_me: aboutMe,
      my_phone: phone,
      from_when_nikhab: fromWhenNikhab,
      isNeshaDrobbo,
      isBeard: isBeard,
      about_reverted_islam: acceptIslam,
      about_milad_qiyam: aboutMiladQiyam,
    };

    if (!getToken()?.token || !userInfo?.data?._id) {
      alert("Please logout and try again");
      return;
    }

    // console.log("edit-personal-info-~", personalInfoData);
    let data;
    setLoading(true);
    try {
      if (personalInfo?.success === true) {
        data = await PersonalInfoInfoServices.updatePersonalInfoInfo(
          personalInfoData,
          getToken()?.token
        );
      } else {
        data = await PersonalInfoInfoServices.createPersonalInfoInfo(
          {
            ...personalInfoData,
            user_form: userForm,
          },
          getToken()?.token
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

  // console.log(personalInfo);

  return (
    <div className="mt-5">
      <FormTitle title="ব্যক্তিগত তথ্য" />
      {isLoading ? (
        <LoadingCircle classes="mt-10" />
      ) : (
        <form action="" onSubmit={submitHandler}>
          <Input
            title="ঘরের বাহিরে সাধারণত কি ধরণের পোষাক পরেন?"
            value={cloth}
            setValue={setCloth}
            required
          />
          {gender && gender === "মহিলা" && (
            <Input
              title=" কবে থেকে নিকাব সহ পর্দা করছেন?"
              value={fromWhenNikhab}
              setValue={setFromWhenNikhab}
              required
            />
          )}
          {gender && gender === "পুরুষ" && (
            <>
              <Select
                title=" সুন্নতি দাড়ি আছে কি না?"
                options={[
                  {
                    value: "জ্বী ,আলহামদুলিল্লাহ",
                  },
                  {
                    value: "না",
                  },
                ]}
                value={isBeard}
                setValue={setIsBeard}
                required
              />
              {isBeard === "জ্বী ,আলহামদুলিল্লাহ" && (
                <Input
                  title="কবে থেকে রেখেছেন?"
                  required={true}
                  value={fromWhenBeard}
                  setValue={setFromWhenBeard}
                />
              )}
            </>
          )}
          {gender && gender === "পুরুষ" && (
            <Select
              title="টাখনুর উপরে কাপড় পরেন? "
              options={[
                {
                  value: "জ্বী ,আলহামদুলিল্লাহ",
                },
                {
                  value: "না",
                },
              ]}
              value={uponTakhno}
              setValue={setUponTakhno}
              required
            />
          )}

          <Select
            title="প্রতিদিন পাঁচ ওয়াক্ত নামাজ পড়েন কি? "
            options={[
              {
                value: "জ্বী ,আলহামদুলিল্লাহ",
              },
              {
                value: "না",
              },
            ]}
            value={isDailyFive}
            setValue={setIsDailyFive}
            required
          />
          {isDailyFive === "জ্বী ,আলহামদুলিল্লাহ" && (
            <Input
              title="কবে থেকে পড়ছেন?"
              value={fromWhenFiveSalat}
              setValue={setFromWhenFiveSalat}
              required
            />
          )}
          {gender && gender === "পুরুষ" && (
            <>
              <Select
                title="প্রতিদিন পাঁচ ওয়াক্ত নামাজ জামায়াতে পড়েন কি? "
                options={[
                  {
                    value: "জ্বী ,আলহামদুলিল্লাহ",
                  },
                  {
                    value: "না",
                  },
                ]}
                value={isDailyFiveJamaat}
                setValue={setIsDailyFiveJamaat}
                required
              />
              {isDailyFiveJamaat === "জ্বী ,আলহামদুলিল্লাহ" && (
                <Input
                  title="প্রতিদিন পাঁচ ওয়াক্ত কবে থেকে নিয়মিত জামায়াতে পড়ছেন?"
                  value={fromWhenFiveSalatJamat}
                  setValue={setFromWhenFiveSalatJamat}
                  required
                />
              )}
            </>
          )}

          <Input
            title="সাধারণত সপ্তাহে কত ওয়াক্ত নামায আপনার কাযা হয়?"
            value={salatKaza}
            setValue={setSalatKaza}
            required
          />
          <Input
            title=" মাহরাম/নন-মাহরাম মেনে চলেন কি?"
            value={isMahram}
            setValue={setIsMahram}
            required
          />
          <Input
            title="শুদ্ধভাবে কুরআন তিলওয়াত করতে পারেন?"
            value={isPureRecite}
            setValue={setIsPureRecite}
            required
          />
          <Select
            title="কোন ফিকহ অনুসরণ করেন?"
            options={fiqhOptions}
            value={fiqh}
            setValue={setFiqh}
          />

          <Input
            title="নাটক / সিনেমা / সিরিয়াল / গান এসব দেখেন বা শুনেন?"
            value={isNatok}
            setValue={setIsNatok}
            required
          />

          <Input
            title="আপনার মানসিক বা শারীরিক কোনো রোগ আছে?"
            value={isDisease}
            setValue={setIsDisease}
            required
          />
          <Input
            title="দ্বীনের কোন বিশেষ মেহনতে যুক্ত আছেন? "
            value={isDeenContribution}
            setValue={setIsDeenContribution}
            required
          />
          <Input
            title="মাজার সম্পর্কে আপনার ধারণা বা বিশ্বাস কি? "
            value={mazar}
            setValue={setMazar}
            required
          />
          <Input
            title="আপনার পড়া হয়েছে এমন অন্তত ৩ টি ইসলামি বই এর নাম লিখুন "
            value={books}
            setValue={setBooks}
            required
          />

          <Input
            title="আপনার পছন্দের অন্তত ৩ জন আলেমের নাম লিখুন"
            value={scholars}
            setValue={setScholars}
            required
          />

          {/* <Select
				title="আপনার ক্ষেত্রে প্রযোজ্য হয় এমন ক্যাটাগরি সিলেক্ট করুন। (অন্যথায় ঘরটি ফাঁকা রাখুন) "
				options={personalCategoryOptions}
				value={personalCategory}
				setValue={setPersonalCategory}
			/> */}

          <MultipleSelect
            title="আপনার ক্ষেত্রে প্রযোজ্য হয় এমন ক্যাটাগরি সিলেক্ট করুন। (অন্যথায় ঘরটি ফাঁকা রাখুন) "
            options={personalCategoryOptions}
            value={personalCategory}
            setValue={setPersonalCategory}
          />

          {personalCategory === "নওমুসলিম" && (
            <Textarea
              title="আপনার ইসলাম গ্রহণের সময় ও ঘটনা উল্লেখ করুন"
              value={acceptIslam}
              setValue={setAcceptIslam}
              required
            />
          )}
          <Textarea
            title="মিলাদ ও কিয়াম সম্পর্কে আপনার ধারনা কি?"
            value={aboutMiladQiyam}
            setValue={setAboutMiladQiyam}
          />
          <Textarea
            title="নিজের সম্পর্কে কিছু লিখুন "
            value={aboutMe}
            required
            setValue={setAboutMe}
          />

          <Select
            title="কোনো নেশাদ্রব্য পান করেন?"
            options={[
              {
                value: "জ্বী",
              },
              {
                value: "না,আলহামদুলিল্লাহ",
              },
            ]}
            value={isNeshaDrobbo}
            setValue={setIsNeshaDrobbo}
            required
          />

          <Input
            title="মোবাইল নাম্বার"
            value={phone}
            setValue={setPhone}
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

export default PersonalInfoForm;
