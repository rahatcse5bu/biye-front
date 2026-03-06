/* eslint-disable react/prop-types */
import { useState } from 'react';
import FormTitle from '../FormTitle/FormTitle';

import {
  educationOptionsMultiple,
  financialOptionsMultiple,
  maritalStatusMultiple,
  professionMultiple,
  screenColorOptionsMultiple,
  hinduCasteOptionsMultiple,
  hinduSubCasteOptionsMultiple,
  hinduGotraOptionsMultiple,
  hinduSampradayOptionsMultiple,
  hinduMangalikOptionsMultiple,
  christianDenominationOptionsMultiple,
  christianChurchAttendanceOptionsMultiple,
} from './expectedPartnerForm.constant';

import './expectedPartner.css';
import DoubleRangeSlider from '../DoubleRangeSlider/DoubleRangeSlider';
import MultipleSelect from '../MultitpleSelect/MultipleSelect';
import { useQuery } from '@tanstack/react-query';
import { BioDataServices } from '../../services/bioData';
import Textarea from '../Textarea/Textarea';
import { Colors } from '../../constants/colors';
import {
  dataToMultipleExpectedPartner,
  getDataFromMultipleInputExpectedPartner,
} from '../../utils/form';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { useEffect } from 'react';
import { getToken } from '../../utils/cookies';
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import { getErrorMessage } from '../../utils/error';
import { Toast } from '../../utils/toast';
import { ExpectedPartnerServices } from '../../services/expectedPartner';
import { getReligionInfo } from '../../utils/localStorage';
import Select from '../Select/Select';

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
  const [expected, setExpected] = useState('');
  const { userInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  // Get religion from localStorage
  const { religion } = getReligionInfo();

  // Hindu-specific partner preferences
  const [partnerCastePreference, setPartnerCastePreference] = useState([]);
  const [partnerSubCastePreference, setPartnerSubCastePreference] = useState(
    []
  );
  const [partnerGotraPreference, setPartnerGotraPreference] = useState('');
  const [partnerSampradayPreference, setPartnerSampradayPreference] = useState(
    []
  );
  const [partnerMangalikPreference, setPartnerMangalikPreference] =
    useState('');

  // Christian-specific partner preferences
  const [partnerDenominationPreference, setPartnerDenominationPreference] =
    useState([]);
  const [
    partnerChurchAttendancePreference,
    setPartnerChurchAttendancePreference,
  ] = useState('');

  // console.log(dataToRange(getDataFromRange(height)), getDataFromRange(height));
  // console.log(
  //   getDataFromMultipleInput(screenColor),
  //   dataToMultiple(getDataFromMultipleInput(screenColor))
  // );

  const { data: districtsOptions = [] } = useQuery({
    queryKey: ['districts'],
    queryFn: async () => {
      return await BioDataServices.getAllDistricts('');
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
      'expected-life-partner-info',
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
        // Hindu-specific fields
        partner_caste_preference,
        partner_sub_caste_preference,
        partner_gotra_preference,
        partner_sampraday_preference,
        partner_mangalik_preference,
        // Christian-specific fields
        partner_denomination_preference,
        partner_church_attendance_preference,
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

      // Hindu-specific fields
      if (partner_caste_preference) {
        setPartnerCastePreference(
          dataToMultipleExpectedPartner(partner_caste_preference)
        );
      }
      if (partner_sub_caste_preference) {
        setPartnerSubCastePreference(
          dataToMultipleExpectedPartner(partner_sub_caste_preference)
        );
      }
      if (partner_gotra_preference) {
        setPartnerGotraPreference(partner_gotra_preference);
      }
      if (partner_sampraday_preference) {
        setPartnerSampradayPreference(
          dataToMultipleExpectedPartner(partner_sampraday_preference)
        );
      }
      if (partner_mangalik_preference) {
        setPartnerMangalikPreference(partner_mangalik_preference);
      }

      // Christian-specific fields
      if (partner_denomination_preference) {
        setPartnerDenominationPreference(
          dataToMultipleExpectedPartner(partner_denomination_preference)
        );
      }
      if (partner_church_attendance_preference) {
        setPartnerChurchAttendancePreference(
          partner_church_attendance_preference
        );
      }
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

    // Add Hindu-specific fields
    if (religion === 'hinduism') {
      expectedPartnerInfoData.partner_caste_preference =
        getDataFromMultipleInputExpectedPartner(partnerCastePreference);
      expectedPartnerInfoData.partner_sub_caste_preference =
        getDataFromMultipleInputExpectedPartner(partnerSubCastePreference);
      expectedPartnerInfoData.partner_gotra_preference = partnerGotraPreference;
      expectedPartnerInfoData.partner_sampraday_preference =
        getDataFromMultipleInputExpectedPartner(partnerSampradayPreference);
      expectedPartnerInfoData.partner_mangalik_preference =
        partnerMangalikPreference;
    }

    // Add Christian-specific fields
    if (religion === 'christianity') {
      expectedPartnerInfoData.partner_denomination_preference =
        getDataFromMultipleInputExpectedPartner(partnerDenominationPreference);
      expectedPartnerInfoData.partner_church_attendance_preference =
        partnerChurchAttendancePreference;
    }

    if (!getToken()?.token || !userInfo?.data?._id) {
      alert('Please logout and try again');
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
        Toast.successToast('আপনার তথ্য সেভ করা হয়েছে ');
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
          <label
            htmlFor="anis"
            className="block mt-4 mb-5 font-bold text-left text-gray-500"
          >
            বয়স
          </label>
          <DoubleRangeSlider value={age} setValue={setAge} />

          <MultipleSelect
            title="গাত্রবর্ণ"
            subtitle="নিজের মত লিখতে পারবেন পাশাপাশি একাধিক সিলেক্ট করতে পারবেন।"
            options={screenColorOptionsMultiple}
            value={screenColor}
            setValue={setScreenColor}
            classes="z-[1]"
          />
          <br />

          <DoubleRangeSlider
            value={{
              min: parseFloat(height.min.toFixed(1)),
              max: parseFloat(height.max.toFixed(1)),
            }}
            // setValue={setHeight}
            setValue={(val) =>
              setHeight({
                min: parseFloat(val.min.toFixed(1)),
                max: parseFloat(val.max.toFixed(1)),
              })
            }
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
            classes="z-[10]"
          />
          <br />
          <MultipleSelect
            title="জেলা"
            placeholder=""
            options={districtsOptions}
            value={zilla}
            setValue={setZilla}
            classes="z-[9]"
          />
          <br />
          <MultipleSelect
            title="বৈবাহিক অবস্থা"
            placeholder=""
            options={maritalStatusMultiple}
            value={maritalStatus}
            setValue={setMaritalStatus}
            classes="z-[8]"
          />
          <br />
          <MultipleSelect
            title="পেশা"
            placeholder=""
            options={professionMultiple}
            value={profession}
            setValue={setProfession}
            classes="z-[7]"
          />
          <br />
          <MultipleSelect
            title="অর্থনৈতিক অবস্থা"
            placeholder=""
            options={financialOptionsMultiple}
            value={financial}
            setValue={setFinancial}
            classes="z-[6]"
          />
          <br />

          {/* Hindu-specific partner preference fields */}
          {religion === 'hinduism' && (
            <>
              <div className="p-4 mb-4 border-l-4 border-orange-500 bg-orange-50 rounded-r-lg">
                <h3 className="text-lg font-semibold text-orange-800 mb-3">
                  হিন্দু ধর্মীয় প্রত্যাশা
                </h3>

                <MultipleSelect
                  title="প্রত্যাশিত বর্ণ/জাতি"
                  subtitle="একাধিক নির্বাচন করতে পারবেন"
                  placeholder="বর্ণ নির্বাচন করুন"
                  options={hinduCasteOptionsMultiple}
                  value={partnerCastePreference}
                  setValue={setPartnerCastePreference}
                  classes="z-[5]"
                />
                <br />

                <MultipleSelect
                  title="প্রত্যাশিত উপ-জাতি"
                  subtitle="একাধিক নির্বাচন করতে পারবেন"
                  placeholder="উপ-জাতি নির্বাচন করুন"
                  options={hinduSubCasteOptionsMultiple}
                  value={partnerSubCastePreference}
                  setValue={setPartnerSubCastePreference}
                  classes="z-[4]"
                />
                <br />

                <Select
                  title="প্রত্যাশিত গোত্র"
                  subtitle="সাধারণত নিজের গোত্র বাদে যেকোনো গোত্রে বিবাহ হয়"
                  value={partnerGotraPreference}
                  setValue={setPartnerGotraPreference}
                  options={hinduGotraOptionsMultiple}
                  placeholder="গোত্র নির্বাচন করুন"
                />
                <br />

                <MultipleSelect
                  title="প্রত্যাশিত সম্প্রদায়"
                  subtitle="একাধিক নির্বাচন করতে পারবেন"
                  placeholder="সম্প্রদায় নির্বাচন করুন"
                  options={hinduSampradayOptionsMultiple}
                  value={partnerSampradayPreference}
                  setValue={setPartnerSampradayPreference}
                  classes="z-[3]"
                />
                <br />

                <Select
                  title="মাঙ্গলিক অবস্থা প্রত্যাশা"
                  subtitle="জীবনসঙ্গীর মাঙ্গলিক অবস্থা সম্পর্কে প্রত্যাশা"
                  value={partnerMangalikPreference}
                  setValue={setPartnerMangalikPreference}
                  options={hinduMangalikOptionsMultiple}
                  placeholder="মাঙ্গলিক প্রত্যাশা নির্বাচন করুন"
                />
              </div>
            </>
          )}

          {/* Christian-specific partner preference fields */}
          {religion === 'christianity' && (
            <>
              <div className="p-4 mb-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">
                  খ্রিস্টান ধর্মীয় প্রত্যাশা
                </h3>

                <MultipleSelect
                  title="প্রত্যাশিত মণ্ডলী/গির্জার ধরন"
                  subtitle="একাধিক নির্বাচন করতে পারবেন"
                  placeholder="মণ্ডলী নির্বাচন করুন"
                  options={christianDenominationOptionsMultiple}
                  value={partnerDenominationPreference}
                  setValue={setPartnerDenominationPreference}
                  classes="z-[5]"
                />
                <br />

                <Select
                  title="গির্জায় যাওয়ার প্রত্যাশা"
                  subtitle="জীবনসঙ্গীর গির্জায় যাওয়ার অভ্যাস সম্পর্কে প্রত্যাশা"
                  value={partnerChurchAttendancePreference}
                  setValue={setPartnerChurchAttendancePreference}
                  options={christianChurchAttendanceOptionsMultiple}
                  placeholder="গির্জায় যাওয়ার প্রত্যাশা নির্বাচন করুন"
                />
              </div>
            </>
          )}

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
              {loading ? <LoadingCircle /> : 'Save & Next'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ExpectedPartnerForm;
