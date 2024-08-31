/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import BioInfo from '../../components/BioInfo/BioInfo';
import AddressInfo from '../../components/AddressInfo/AddressInfo';
import EducationInfo from '../../components/EducationalInfo/EducationalInfo';
import BioInfoButton from '../../components/BioInfoButton/BioInfoButton';
import BioDataStat from '../../components/BioDataStat/BioDataStat';
import FamilyInfo from '../../components/FamilyInfo/FamilyInfo';
import PersonalInfo from '../../components/PersonalInfo/PersonalInfo';
import ProfessionalInfo from '../../components/ProfessionalInfo/ProfessionalInfo';
import MaritalInfo from '../../components/MaritalInfo/MaritalInfo';
import ExpectedPartner from '../../components/ExpectedPartner/ExpectedPartner';
import OngikarNama from '../../components/OngikarNama/OngikarNama';
import ContactInfo from '../../components/ContactInfo/ContactInfo';
import './BioData.css';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { BioDataServices } from '../../services/bioData';
import { ContactServices } from '../../services/contact';
import { UserInfoServices } from '../../services/userInfo';
import { getToken } from '../../utils/cookies';
import { useContext, useEffect } from 'react';
import BioContext from '../../contexts/BioContext';
import UserContext from '../../contexts/UserContext';
import LoadingCircle from '../../components/LoadingCircle/LoadingCircle';
import { FcLeft } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import ScrollToTop from '../../components/ScrollTop/ScrollTop';
import AnalyticsService from '../../firebase/analyticsService';
import Contact from '../Contact/Contact';
const BioData = () => {
  const { id } = useParams();
  const { setBio } = useContext(BioContext);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  // console.log(id);
  const { isLoading, data, isError } = useQuery({
    queryKey: ['bio-data', id],
    queryFn: async () => {
      return await BioDataServices.getBioData(id);
    },
    retry: false,
    enabled: !!id,
  });

  // console.log("data~~", data);
  const { data: userStatus = null } = useQuery({
    queryKey: ['bio-data', 'status', id],
    queryFn: async () => {
      return await UserInfoServices.getUserInfoStatus(id);
    },
    retry: false,
    enabled: !!id,
  });
  const { data: contact = null } = useQuery({
    queryKey: ['bio-data', 'contact', id, userInfo?.data?._id],
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
  }, [data, setBio, id]);

  const location = useLocation();

  useEffect(() => {
    AnalyticsService.logEvent('bio details page', {
      page_path: location.pathname,
    });
  }, [id, location]);

  return (
    <div className=" py-2 w-full  ">
      <div className="flex md:flex-row flex-col  py-3 justify-between">
        <div
          onClick={() => navigate(-1)}
          className=" flex flex-row cursor-pointer "
        >
          <FcLeft className="w-8 h-6 text-white " />
          <strong className="text-indigo-600">Back</strong>
        </div>
        <div className="flex flex-row md:mr-10 md:ml-0 ml-3 md:pt-0 pt-3 mr-0">
          <p className="md:mr-2  text-green-600 font-semibold">
            কীভাবে বায়োডাটা তৈরি করবেন
          </p>{' '}
          <Link
            to="/biodata-submit"
            className="text-indigo-700 ml-3 underline font-semibold"
          >
            এখানে ক্লিক করুন{' '}
          </Link>
        </div>
      </div>
      <ScrollToTop />
      {isLoading ? (
        <LoadingCircle classes="my-10 h-[500px]" />
      ) : isError ? (
        <div className="bg-red-50 p-10 rounded-sm border border-red-300 m-5">
          <h4 className="text-red-900 font-semibold">Not found</h4>
        </div>
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
            ) : userInfo?.data?.user_id ? (
              <Contact />
            ) : (
              <div className="my-8 p-6 bg-gray-100 border border-gray-300 rounded-lg text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  Please Login to Purchase This Biodata
                </h1>
                <p className="text-gray-600 text-lg mb-6">
                  Access to premium content requires a quick login. Don`&apos;`t
                  miss out!
                </p>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Login Now
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BioData;
