/* eslint-disable react/prop-types */
import { useState } from "react";
import FormTitle from "../FormTitle/FormTitle";

import {
  educationOptionsMultiple,
  financialOptionsMultiple,
  maritalStatusMultiple,
  professionMultiple,
  screenColorOptionsMultiple,
} from "./expectedPartnerForm.constant";

import "./expectedPartner.css";
import DoubleRangeSlider from "../DoubleRangeSlider/DoubleRangeSlider";
import MultipleSelect from "../MultitpleSelect/MultipleSelect";
import { useQuery } from "@tanstack/react-query";
import { BioDataServices } from "../../services/bioData";
import Textarea from "../Textarea/Textarea";
import { Colors } from "../../constants/colors";
import {
  dataToMultiple,
  dataToMultipleExpectedPartner,
  dataToRange,
  getDataFromMultipleInput,
  getDataFromMultipleInputExpectedPartner,
  getDataFromRange,
} from "../../utils/form";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { useEffect } from "react";
import { getToken } from "../../utils/cookies";
import LoadingCircle from "../LoadingCircle/LoadingCircle";
import { getErrorMessage } from "../../utils/error";
import { Toast } from "../../utils/toast";
import { ExpectedPartnerServices } from "../../services/expectedPartner";

const ExpectedPartnerForm = ({ userForm, setUserForm }) => {
  const [zilla, setZilla] = useState([]);
  const [screenColor, setScreenColor] = useState([]);
  const [height, setHeight] = useState({
    min: 5.0,
    max: 6.0,
  });

  const [educationExpected, setEducationExpected] = useState([]);
  const [age, setAge] = useState({
    min: 20,
    max: 30,
  });
  const [profession, setProfession] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState([]);
  const [financial, setFinancial] = useState([]);
  const [expected, setExpected] = useState("");
  const { userInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  // console.log(dataToRange(getDataFromRange(height)), getDataFromRange(height));
  // console.log(
  //   getDataFromMultipleInput(screenColor),
  //   dataToMultiple(getDataFromMultipleInput(screenColor))
  // );

  const { data: districtsOptions = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      return await BioDataServices.getAllDistricts("");
    },
  });
  // useEffect(() => {
  //   verifyToken(
  //     userInfo?.data?._id,
  //     logOut,
  //     "expected-partner-info-verify-token"
  //   );
  // }, [logOut, userInfo?.data]);
  const { data: expectedPartnerInfo = null, isLoading } = useQuery({
    queryKey: [
      "expected-life-partner-info",
      userInfo?.data?._id,
      getToken()?.token,
    ],
    queryFn: async () => {
      return await ExpectedPartnerServices.getExpectedPartnerByUser(
        getToken()?.token
      );
    },
    retry: false,
    enabled: !!userInfo?.data?._id,
  });
  useEffect(() => {
    if (expectedPartnerInfo?.data) {
      const {
        age,
        height,
        color,
        zilla,
        marital_status,
        expected_characteristics,
        educational_qualifications,
        occupation,
        economical_condition,
      } = expectedPartnerInfo.data;
      setAge(age);
      setHeight(height);
      // setAge(dataToRange(age));
      // setHeight(dataToRange(height));
      setScreenColor(dataToMultipleExpectedPartner(color));
      setZilla(dataToMultipleExpectedPartner(zilla));
      setMaritalStatus(dataToMultipleExpectedPartner(marital_status));
      setProfession(dataToMultipleExpectedPartner(occupation));
      setFinancial(dataToMultipleExpectedPartner(economical_condition));
      setExpected(expected_characteristics);
      setEducationExpected(
        dataToMultipleExpectedPartner(educational_qualifications)
      );
    }
  }, [expectedPartnerInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    let expectedPartnerInfoData = {
      age: age,
      height: height,
      // age: getDataFromRange(age),
      // height: getDataFromRange(height),
      color: getDataFromMultipleInputExpectedPartner(screenColor),
      educational_qualifications:
        getDataFromMultipleInputExpectedPartner(educationExpected),
      zilla: getDataFromMultipleInputExpectedPartner(zilla),
      marital_status: getDataFromMultipleInputExpectedPartner(maritalStatus),
      occupation: getDataFromMultipleInputExpectedPartner(profession),
      economical_condition: getDataFromMultipleInputExpectedPartner(financial),
      expected_characteristics: expected,
    };

    if (!getToken()?.token || !userInfo?.data?._id) {
      alert("Please logout and try again");
      return;
    }

    console.log(expectedPartnerInfoData);

    try {
      setLoading(true);
      let data;
      if (expectedPartnerInfo?.success === true) {
        data = await ExpectedPartnerServices.updateExpectedPartner(
          expectedPartnerInfoData,
          getToken().token
        );
      } else {
        data = await ExpectedPartnerServices.createExpectedPartner(
          { ...expectedPartnerInfoData, user_form: userForm },
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

  const backButtonHandler = () => {
    if (userForm > 1) {
      setUserForm((prev) => prev - 1);
    }
  };
  return (
    <div>
      <FormTitle title="প্রত্যাশিত জীবনসঙ্গী" />
      {isLoading ? (
        <LoadingCircle classes="mt-10" />
      ) : (
        <form onSubmit={submitHandler} action="">
          <label className="block mt-4 mb-5 font-bold text-left text-gray-500">
            বয়স
          </label>
          <DoubleRangeSlider value={age} setValue={setAge} />

          <MultipleSelect
            title="গাত্রবর্ণ"
            subtitle="নিজের মত লিখতে পারবেন পাশাপাশি একাধিক সিলেক্ট করতে পারবেন।"
            options={screenColorOptionsMultiple}
            value={screenColor}
            setValue={setScreenColor}
          />
          <br />

          <DoubleRangeSlider
            value={height}
            setValue={setHeight}
            maxValue={7.0}
            minValue={4.5}
            step={0.1}
            title="উচ্চতা"
            subtitle="5.1 বোঝায় ৫ ফুট ১ ইঞ্চি "
          />

          <MultipleSelect
            title="শিক্ষাগত যোগ্যতা "
            placeholder=""
            options={educationOptionsMultiple}
            value={educationExpected}
            setValue={setEducationExpected}
            classes="z-[99999]"
          />
          <br />
          <MultipleSelect
            title="জেলা"
            placeholder=""
            options={districtsOptions}
            value={zilla}
            setValue={setZilla}
            classes="z-[9999]"
          />
          <br />
          <MultipleSelect
            title="বৈবাহিক অবস্থা"
            placeholder=""
            options={maritalStatusMultiple}
            value={maritalStatus}
            setValue={setMaritalStatus}
            classes="z-[999]"
          />
          <br />
          <MultipleSelect
            title="পেশা"
            placeholder=""
            options={professionMultiple}
            value={profession}
            setValue={setProfession}
            classes="z-[99]"
          />
          <br />
          <MultipleSelect
            title="অর্থনৈতিক অবস্থা"
            placeholder=""
            options={financialOptionsMultiple}
            value={financial}
            setValue={setFinancial}
          />
          <br />
          <Textarea
            value={expected}
            setValue={setExpected}
            required
            title="জীবনসঙ্গীর যেসব বৈশিষ্ট্য বা গুণাবলী প্রত্যাশা করেন"
            subtitle=" আপনার প্রত্যাশা বিস্তারিত লিখতে পারেন। কোন বিশেষ শর্ত থাকলে উল্লেখ করতে পারেন।"
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

export default ExpectedPartnerForm;
