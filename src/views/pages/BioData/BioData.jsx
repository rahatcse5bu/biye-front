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
import { trackEvent } from "../../../utils/analytics";
import { useContext, useEffect } from "react";
import BioContext from "../../../contexts/BioContext";
import UserContext from "../../../contexts/UserContext";
import BioDetailsSkeleton from "../../../components/BioDetailsSkeleton/BioDetailsSkeleton";
import { useNavigate } from "@/lib/navigation";
import ScrollToTop from "../../../components/ScrollTop/ScrollTop";
import { ArrowRightIcon, LockClosedIcon } from "@heroicons/react/24/outline";

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
    // TODO: null counts as fresh cached data in react-query, so the preview page would never fetch; only real server data seeds it.
    initialData: initialData ?? undefined,
    // TODO: the server already sent this biodata; without a staleTime it is fetched a second time on mount.
    staleTime: 60_000,
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

  const found = Boolean(data?.data);
  useEffect(() => {
    if (found) trackEvent("view_item", { content_ids: [String(id)], content_type: "product" });
  }, [found, id]);

  return (
    <div className="w-full py-2">
      <ScrollToTop />
      {isLoading ? (
        <BioDetailsSkeleton />
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
                <section
                  aria-labelledby="contact-login-title"
                  className="relative isolate my-6 overflow-hidden rounded-2xl border border-[#d9eae6] bg-gradient-to-br from-[#eef8f5] via-white to-[#f8fbfa] p-6 shadow-[0_4px_24px_rgba(13,115,119,0.04)] sm:p-8"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-12 -top-12 -z-10 h-44 w-44 rounded-full border-[28px] border-[#0D7377]/[0.04]"
                  />
                  <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:gap-6 sm:text-left">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#d4e9e3] bg-white text-[#0D7377] shadow-sm">
                      <LockClosedIcon aria-hidden="true" className="h-7 w-7" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="mb-2 text-sm font-semibold text-[#0D7377]">
                        যোগাযোগের তথ্য
                      </p>
                      <h2
                        id="contact-login-title"
                        className="text-xl font-bold leading-relaxed text-[#173f3b] sm:text-2xl"
                      >
                        যোগাযোগের তথ্য দেখতে লগইন করুন
                      </h2>
                      <p className="mt-2 text-base leading-7 text-[#637570]">
                        এই বায়োডাটার যোগাযোগের তথ্য কিনতে আপনার অ্যাকাউন্টে প্রবেশ করুন।
                      </p>
                      <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#0D7377] px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#095c60] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D7377] focus-visible:ring-offset-4 sm:w-auto"
                      >
                        এখনই লগইন করুন
                        <ArrowRightIcon aria-hidden="true" className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BioData;
