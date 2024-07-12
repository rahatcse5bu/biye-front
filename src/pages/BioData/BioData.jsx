import BioInfo from "../../components/BioInfo/BioInfo";
import AddressInfo from "../../components/AddressInfo/AddressInfo";
import EducationInfo from "../../components/EducationalInfo/EducationalInfo";
import BioInfoButton from "../../components/BioInfoButton/BioInfoButton";
import BioDataStat from "../../components/BioDataStat/BioDataStat";
import FamilyInfo from "../../components/FamilyInfo/FamilyInfo";
import PersonalInfo from "../../components/PersonalInfo/PersonalInfo";
import ProfessionalInfo from "../../components/ProfessionalInfo/ProfessionalInfo";
import MaritalInfo from "../../components/MaritalInfo/MaritalInfo";
import ExpectedPartner from "../../components/ExpectedPartner/ExpectedPartner";
import OngikarNama from "../../components/OngikarNama/OngikarNama";
import ContactInfo from "../../components/ContactInfo/ContactInfo";
import "./BioData.css";
import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BioDataServices } from "../../services/bioData";
import { ContactServices } from "../../services/contact";
import { UserInfoServices } from "../../services/userInfo";
import { getToken } from "../../utils/cookies";
import { useContext, useEffect } from "react";
import BioContext from "../../contexts/BioContext";
import UserContext from "../../contexts/UserContext";
// import { ScrollToTop } from "../../constants/ScrolltoTop";
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle";
import { FcLeft } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../../components/ScrollTop/ScrollTop";
import AnalyticsService from "../../firebase/analyticsService";
import Contact from "../Contact/Contact";
const BioData = () => {
  const { id } = useParams();
  const { setBio } = useContext(BioContext);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  // console.log(id);
  const { isLoading, data } = useQuery({
    queryKey: ["bio-data", id],
    queryFn: async () => {
      return await BioDataServices.getBioData(id);
    },
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
  const { data: contact = null, isLoading: contactLoading } = useQuery({
    queryKey: ["bio-data", "contact", id, userInfo?.data?._id],
    queryFn: async () => {
      return await ContactServices.getContactForBuyer(
        userInfo?.data?._id,
        id,
        getToken().token
      );
    },
    retry: false,
    enabled: !!userInfo?.data?._id,
  });

  // console.log("contact-bio-user~", contact);
  // console.log("user-info-status~", userStatus);

  useEffect(() => {
    if (data && data?.data) {
      setBio(data.data);
    }
  }, [data, setBio, id]);

  const location = useLocation();

  useEffect(() => {
    AnalyticsService.logEvent("bio details page", {
      page_path: location.pathname,
    });
  }, [id, location]);

  // const incrementViewCount = useCallback(async () => {
  //   const generalId = data?.data?.generalInfo?._id;
  //   if (generalId) {
  //     try {
  //       const response = await GeneralInfoServices.updateWatchOfBioData(
  //         generalId
  //       );
  //       console.log("watch~~", response);
  //     } catch (error) {
  //       console.error("Error incrementing view count", error);
  //     }
  //   }
  // }, [data?.data?.generalInfo?._id]);

  // useEffect(() => {
  //   if (data?.data?.generalInfo?._id) {
  //     incrementViewCount();
  //   }
  // }, [data?.data?.generalInfo?._id, incrementViewCount]);

  // if (isLoading) {
  // 	return <LoadingBioData />;
  // }

  // console.log(data);
  // console.log(error);

  // console.log(
  //   "userInfo?.data?.user_id,id~~~",
  //   id,
  //   +userInfo?.data?.user_id,
  //   id && +id !== +userInfo?.data?.user_id
  // );

  return (
    <div className=" py-2 w-full  ">
      <div
        onClick={() => navigate(-1)}
        className=" py-2 flex flex-row cursor-pointer my-2"
      >
        <FcLeft className="w-8 h-6 text-white " />
        <strong className="text-indigo-600">Back</strong>
      </div>
      <ScrollToTop />
      {isLoading ? (
        <LoadingCircle classes="my-10 h-[500px]" />
      ) : (
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
            {id &&
            userInfo?.data?.user_id &&
            Number(id) !== Number(userInfo?.data?.user_id) ? (
              <ContactInfo contact={contact?.data} status={userStatus?.data} />
            ) : (
              <Contact />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BioData;
