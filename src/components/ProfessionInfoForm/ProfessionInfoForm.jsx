/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import FormTitle from "../FormTitle/FormTitle";
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import { occupationOptions } from "./professionInfoForm.constant";
import { Colors } from "../../constants/colors";
import UserContext from "../../contexts/UserContext";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../utils/cookies";
import LoadingCircle from "../LoadingCircle/LoadingCircle";
import MultipleSelect from "../MultitpleSelect/MultipleSelect";
import {
  dataToMultipleExpectedPartner,
  getDataFromMultipleInputExpectedPartner,
} from "../../utils/form";
import { ProfessionalInfoServices } from "../../services/professionalInfo";
import { getErrorMessage } from "../../utils/error";
import { Toast } from "../../utils/toast";

const ProfessionInfoForm = ({ userForm, setUserForm }) => {
  const [occupation, setOccupation] = useState();
  const [income, setIncome] = useState("");
  const [occupationInfo, setOccupationInfo] = useState();
  const { userInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const backButtonHandler = () => {
    if (userForm > 1) {
      setUserForm((prev) => prev - 1);
    }
  };
  const { data: professionalInfo = null, isLoading } = useQuery({
    queryKey: ["professional-info", userInfo?.data?._id, getToken()?.token],
    queryFn: async () => {
      return await ProfessionalInfoServices.getProfessionalInfoByUser(
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
  // 		"professional-info-verify-token"
  // 	);
  // }, [logOut, userInfo?.data]);

  useEffect(() => {
    if (professionalInfo?.data) {
      const { occupation, occupation_details, monthly_income } =
        professionalInfo.data;
      setOccupation(dataToMultipleExpectedPartner(occupation));
      setOccupationInfo(occupation_details);
      setIncome(monthly_income);
    }
  }, [professionalInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    let professionalInfoData = {
      occupation: getDataFromMultipleInputExpectedPartner(occupation),
      occupation_details: occupationInfo,
      monthly_income: income,
    };

    if (!getToken()?.token || !userInfo?.data?._id) {
      alert("Please logout and try again");
      return;
    }

    console.log(professionalInfoData);
    let data;
    try {
      setLoading(true);
      if (professionalInfo?.success === true) {
        data = await ProfessionalInfoServices.updateProfessionalInfo(
          professionalInfoData,
          getToken().token
        );
      } else {
        data = await ProfessionalInfoServices.createProfessionalInfo(
          { ...professionalInfoData, user_form: userForm },
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
      <FormTitle title="পেশাগত তথ্য" />
      {isLoading ? (
        <LoadingCircle classes="mt-10" />
      ) : (
        <form onSubmit={submitHandler} action="">
          {/* <Select
					title="পেশা "
					value={occupation}
					options={occupationOptions}
					setValue={setOccupation}
					required
				/> */}
          <MultipleSelect
            title="পেশা"
            options={occupationOptions}
            value={occupation}
            setValue={setOccupation}
            required
          />
          <Textarea
            title="পেশার বিস্তারিত বিবরণ"
            value={occupationInfo}
            setValue={setOccupationInfo}
            subtitle=" আপনার কর্মস্থল কোথায়, আপনি কোন প্রতিষ্ঠানে কাজ করছেন, আপনার উপার্জন হালাল কি না ইত্যাদি লিখতে পারেন।"
            required
          />
          <Input
            title="মাসিক আয়"
            type="number"
            value={income}
            setValue={setIncome}
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
              disabled={loading}
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

export default ProfessionInfoForm;
