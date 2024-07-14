/* eslint-disable react/prop-types */
import { useState } from "react";
import FormTitle from "../FormTitle/FormTitle";
import Input from "../Input/Input";
import { Colors } from "../../constants/colors";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { useEffect } from "react";
import { getToken } from "../../utils/cookies";
import LoadingCircle from "../LoadingCircle/LoadingCircle";
import { GeneralInfoServices } from "../../services/generalInfo";
import { ContactServices } from "../../services/contact";
import { getErrorMessage } from "../../utils/error";
import { Toast } from "../../utils/toast";

const ContactInfoForm = ({ userForm, setUserForm }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [relation, setRelation] = useState("");
  const { userInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const { data: generalInfo = null } = useQuery({
    queryKey: ["general-info", userInfo?.data?._id, getToken()?.token],
    queryFn: async () => {
      return await GeneralInfoServices.getGeneralInfoByUser(getToken()?.token);
    },
    retry: false,
    enabled: !!userInfo?.data?._id,
  });
  const gender = generalInfo?.data?.gender || "";

  // console.log("gender~~", gender);

  const backButtonHandler = () => {
    if (userForm > 1) {
      setUserForm((prev) => prev - 1);
    }
  };
  const { data: contactInfo = null, isLoading } = useQuery({
    queryKey: ["contact-info", userInfo?.data?._id, getToken()?.token],
    queryFn: async () => {
      return await ContactServices.getContactByUser(getToken()?.token);
    },
    retry: false,
    enabled: !!userInfo?.data?._id,
  });

  // useEffect(() => {
  //   verifyToken(userInfo?.data?._id, logOut, "contact-info-verify-token");
  // }, [logOut, userInfo?.data]);

  useEffect(() => {
    if (contactInfo?.data) {
      const { full_name, family_number, relation, bio_receiving_email } =
        contactInfo.data;
      setFullName(full_name);
      setPhone(family_number);
      setRelation(relation);
      setEmail(bio_receiving_email);
    }
  }, [contactInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    let contactInfoData = {
      full_name: fullName,
      family_number: phone,
      relation: relation,
      bio_receiving_email: email,
    };

    if (!getToken()?.token || !userInfo?.data?._id) {
      alert("Please logout and try again");
      return;
    }

    // console.log(contactInfoData);

    try {
      setLoading(true);
      let data;
      if (contactInfo?.success === true) {
        data = await ContactServices.updateContact(
          contactInfoData,
          getToken().token
        );
        // console.log(data);
      } else {
        data = await ContactServices.createContact(
          { ...contactInfoData, user_form: userForm },
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

  // console.log("contact-info-from-db~", contactInfo);
  return (
    <div>
      <FormTitle title="যোগাযোগ" />
      {isLoading ? (
        <LoadingCircle classes="mt-10" />
      ) : (
        <form onSubmit={submitHandler} action="">
          {gender === "মহিলা" ? (
            <Input
              title="পাত্রীর নাম"
              required
              value={fullName}
              setValue={setFullName}
              subtitle="পূর্ণ নাম লিখুন"
            />
          ) : (
            gender === "পুরুষ" && (
              <Input
                title="পাত্রের নাম "
                required
                value={fullName}
                setValue={setFullName}
                subtitle="পূর্ণ নাম লিখুন"
              />
            )
          )}

          <Input
            title="অভিভাবকের মোবাইল নাম্বার  "
            required
            value={phone}
            setValue={setPhone}
            subtitle="কেউ আপনার অভিভাবকের সাথে যোগাযোগ করতে চাইলে এই নাম্বারটি দেয়া হবে। এই নাম্বারে কল দিয়ে ভেরিফাই করার পর বায়োডাটা এপ্রুভ করা হবে। এখানে বন্ধু, কলিগ, কাজিন বা পাত্রপাত্রীর নিজের নাম্বার 
        লিখলে বায়োডাটা স্থায়ীভাবে ব্যান করা হবে।"
          />

          <Input
            title="অভিভাবকের সাথে সম্পর্ক "
            required
            value={relation}
            setValue={setRelation}
            subtitle="উক্ত অভিভাবক আপনার সম্পর্কে কি হয় তা লিখুন। যেমনঃ বাবা।"
          />

          <Input
            title="বায়োডাটা গ্রহণের ই-মেইল "
            required
            value={email}
            setValue={setEmail}
            subtitle="অনাকাঙ্ক্ষিত ঘটনা এড়াতে, সম্ভব হলে অভিভাবকের মেইল এড্রেস লিখুন।"
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

export default ContactInfoForm;
