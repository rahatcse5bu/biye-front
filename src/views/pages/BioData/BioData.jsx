"use client";

import BioInfo from "../../../components/BioInfo/BioInfo";
import AddressInfo from "../../../components/AddressInfo/AddressInfo";
import EducationInfo from "../../../components/EducationalInfo/EducationalInfo";
import BioInfoButton from "../../../components/BioInfoButton/BioInfoButton";
import BioDataStat from "../../../components/BioDataStat/BioDataStat";
import FamilyInfo from "../../../components/FamilyInfo/FamilyInfo";
import PersonalInfo from "../../../components/PersonalInfo/PersonalInfo";
import ProfessionalInfo from "../../../components/ProfessionalInfo/ProfessionalInfo";
import MaritalInfo from "../../../components/MaritalInfo/MaritalInfo";
import ExpectedPartner from "../../../components/ExpectedPartner/ExpectedPartner";
import OngikarNama from "../../../components/OngikarNama/OngikarNama";
import ContactInfo from "../../../components/ContactInfo/ContactInfo";
import Achievement from "../../../components/Achievement/Achievement";
import "./BioData.css";
import { useParams } from "@/lib/navigation";
import { useQuery } from "@tanstack/react-query";
import { BioDataServices } from "../../../services/bioData";
import { ContactServices } from "../../../services/contact";
import { UserInfoServices } from "../../../services/userInfo";
import { getToken } from "../../../utils/cookies";
import { useContext, useEffect } from "react";
import BioContext from "../../../contexts/BioContext";
import UserContext from "../../../contexts/UserContext";
import LoadingCircle from "../../../components/LoadingCircle/LoadingCircle";
import { useNavigate } from "@/lib/navigation";
import ScrollToTop from "../../../components/ScrollTop/ScrollTop";

import Contact from "../Contact/Contact";
const BioData = ({ initialData = null }) => {
  const { id } = useParams();
  const { setBio } = useContext(BioContext);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  // console.log(id);
  const { isLoading, data, isError } = useQuery({
    queryKey: ["bio-data", id],
    queryFn: async () => {
      return await BioDataServices.getBioData(id);
    },
    initialData,
    retry: false,
    enabled: !!id,
  });

  // console.log("data~~", data);
  const { data: userStatus = null } = useQuery({
    queryKey: ["bio-data", "status", id],
    queryFn: async () => {
      return await UserInfoServices.getUserInfoStatus(id);
    },
    retry: false,
    enabled: !!id,
  });
  const { data: contact = null } = useQuery({
    queryKey: ["bio-data", "contact", id, userInfo?.data?._id],
    queryFn: async () => {
      return await ContactServices.getContactForBuyer(
        userInfo?.data?._id,
        id,
        getToken()?.token
      );
    },
    retry: false,
    enabled: !!userInfo?.data?._id,
  });

  useEffect(() => {
    if (data && data?.data) {
      setBio(data.data);
    }
    return () => {
      setBio(null);
    };
  }, [data, setBio, id]);

  return (
    <div className="w-full py-2">
      <ScrollToTop />
      {isLoading ? (
        <LoadingCircle classes="my-10 h-[500px]" />
      ) : isError ? (
        <div className="bg-red-50 p-10 rounded-sm border border-red-300 m-5">
          <h4 className="text-red-900 font-semibold">Not found</h4>
        </div>
      ) : (
        <>
          {id &&
            userInfo?.data?.user_id &&
            Number(id) === Number(userInfo?.data?.user_id) &&
            data?.data?.generalInfo?.has_pending_changes && (
              <div className="mb-4 p-4 rounded-lg border border-amber-300 bg-amber-50 text-amber-900 text-sm font-medium">
                ⏳ আপনার পরিবর্তনগুলো রিভিউয়ের অপেক্ষায় আছে। অনুমোদনের পরে
                নতুন পরিবর্তন প্রকাশিত হবে। নিচে বর্তমান সক্রিয় বায়োডাটা
                দেখানো হচ্ছে।
              </div>
            )}
          <div className="grid text-[16px] lg:grid-cols-[30%,70%] md:grid-cols-[50%,50%] grid-cols-1 ">
            <div className="col px-2 single-bio-left-sidebar">
              <BioInfo id={id} />
              <div className="h-5"></div>
              <BioInfoButton />
              <div className="h-5"></div>
              <BioDataStat id={id} />
              {/*<!-- End of Single Bio STATS Section  -->*/}
            </div>
            <div className="col px-2  single-bio-right-sidebar">
              <AddressInfo />
              <hr />
              <div className="h-5"></div>
              <EducationInfo />

              <div className="h-5"></div>
              <FamilyInfo />

              <div className="h-5"></div>
              <PersonalInfo />
              <div className="h-5"></div>
              <ProfessionalInfo />
              {/*<!-- End of Occupational Info  -->*/}
              <div className="h-5"></div>
              <MaritalInfo />

              <div className="h-5"></div>

              <ExpectedPartner />
              {/*<!-- End of Expected Life Partner  -->*/}
              <div className="h-5"></div>
              <OngikarNama />

              <div className="h-5"></div>
              <Achievement />

              <div className="h-5"></div>
              {id &&
              userInfo?.data?.user_id &&
              Number(id) !== Number(userInfo?.data?.user_id) ? (
                <ContactInfo
                  contact={contact?.data}
                  status={userStatus?.data}
                />
              ) : userInfo?.data?.user_id ? (
                <Contact />
              ) : (
                <div className="my-8 p-6 bg-gray-100 border border-gray-300 rounded-lg text-center">
                  <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    এই বায়োডাটার যোগাযোগের তথ্য কিনতে লগইন করুন
                  </h1>
                  <p className="text-gray-600 text-lg mb-6">
                    যোগাযোগের তথ্য দেখতে প্রথমে আপনার অ্যাকাউন্টে লগইন করুন।
                  </p>
                  <button
                    onClick={() => navigate("/login")}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  >
                    এখনই লগইন করুন
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BioData;
