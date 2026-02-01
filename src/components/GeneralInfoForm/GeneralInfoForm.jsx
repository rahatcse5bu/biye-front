/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';

import Select from '../../components/Select/Select';
import Input from '../../components/Input/Input';
import { Colors } from '../../constants/colors';
import FormTitle from '../FormTitle/FormTitle';
import {
  bioDataTypes,
  bloodGroup,
  genderOptions,
  heights,
  maritalStatus,
  nationalities,
  screenColors,
  religions,
  religiousTypesByReligion,
} from './generalInfoForm.constant';
import { userServices } from '../../services/user';
import { BioDataServices } from '../../services/bioData';
import UserContext from '../../contexts/UserContext';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { getDateMonthYear, getYearMonthDate } from '../../utils/date';
import { getToken, removeToken } from '../../utils/cookies';
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import { useNavigate } from 'react-router-dom';
import { convertToBengaliNumerals } from '../../utils/weight';
import { convertToEnglishDigits } from '../../utils/weight';
import { verifyToken } from '../../services/verifyToken';
import { getErrorMessage } from '../../utils/error';
import { Toast } from '../../utils/toast';
import { GeneralInfoServices } from '../../services/generalInfo';
import SingleSelect from '../SingleSelect/SingleSelect';
import { UserInfoServices } from '../../services/userInfo';
import CustomButton from '../CustomButton/CustomButton';
import { FaYoutube } from 'react-icons/fa';
import CustomModal from '../CustomModal/CustomModal';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

const GeneralInfoForm = ({ userForm, setUserForm }) => {
  const { userInfo, logOut } = useContext(UserContext);
  const [referId, setReferId] = useState('');
  const [bioType, setBioType] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [dob, setDob] = useState('');
  const [height, setHeight] = useState('');
  const [color, setColor] = useState('');
  const [weight, setWeight] = useState('৫০');
  const [blood, setBlood] = useState('');
  const [nationality, setNationality] = useState('বাংলাদেশী');
  const [gender, setGender] = useState('');
  const [religion, setReligion] = useState('islam');
  const [religiousType, setReligiousType] = useState('practicing_muslim');
  const [religiousTypeOptions, setReligiousTypeOptions] = useState(
    religiousTypesByReligion['islam'] || []
  );
  const [filteredMaritalStatus, setFilteredMaritalStatus] =
    useState(maritalStatus);
  const [loading, setLoading] = useState(false);
  const [isModelForBioDate, setIsModalForBioDate] = useState(false);
  const navigate = useNavigate();
  const { data: generalInfo = null, isLoading } = useQuery({
    queryKey: ['general-info', userInfo?.data?._id, getToken()?.token],
    queryFn: async () => {
      return await GeneralInfoServices.getGeneralInfoByUser(getToken()?.token);
    },
    retry: false,
    enabled: !!userInfo?.data?._id,
  });
  const { data: userInfoIds = null } = useQuery({
    queryKey: ['all-users-id', getToken()?.token],
    queryFn: async () => {
      return await UserInfoServices.getAllUsersInfoId(getToken()?.token);
    },
    retry: false,
    enabled: !!getToken()?.token,
  });

  //! set init data
  useEffect(() => {
    // console.log(generalInfo?.data);
    if (generalInfo?.data) {
      const {
        gender,
        bio_type,
        date_of_birth,
        height,
        nationality,
        screen_color,
        marital_status,
        weight,
        blood_group,
        refer_user,
        religion: savedReligion,
        religious_type,
      } = generalInfo.data;

      setGender(gender);
      setBioType(bio_type);
      setMaritalStatus(marital_status);
      setBlood(blood_group);
      setDob(getYearMonthDate(date_of_birth));
      setNationality(nationality);
      setHeight(height);
      setWeight(convertToBengaliNumerals(weight.toString()));
      setColor(screen_color);
      
      // Set religion and religious type
      if (savedReligion) {
        setReligion(savedReligion);
        setReligiousTypeOptions(religiousTypesByReligion[savedReligion] || []);
      }
      if (religious_type) {
        setReligiousType(religious_type);
      }
      // console.log("refer_user", refer_user);
      // console.log("userInfoIds", userInfoIds);
      if (refer_user && userInfoIds) {
        const user = userInfoIds?.data.find((item) => item._id === refer_user);
        // console.log("filtered-user_id", user);
        if (user) {
          setReferId({
            value: user?._id,
            label: user?.user_id,
          });
        }
      }
    }
  }, [generalInfo, userInfoIds]);

  // Update religious type options when religion changes
  useEffect(() => {
    const options = religiousTypesByReligion[religion] || [];
    setReligiousTypeOptions(options);
    // Set default religiousType when religion changes
    if (options.length > 0 && !options.some((opt) => opt.value === religiousType)) {
      setReligiousType(options[0].value);
    }
  }, [religion]);

  // console.log(userInfo?.data?._id);

  const backButtonHandler = () => {
    if (userForm > 1) {
      setUserForm((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (bioType === 'পাত্রের বায়োডাটা') {
      setGender('পুরুষ');
    } else if (bioType === 'পাত্রীর বায়োডাটা') {
      setGender('মহিলা');
    }

    if (gender === 'পুরুষ') {
      setFilteredMaritalStatus([
        { value: 'অবিবাহিত' },
        { value: 'বিবাহিত' },
        { value: 'ডিভোর্সড' },
        { value: 'বিপত্নীক' },
      ]);
    } else if (gender === 'মহিলা') {
      setFilteredMaritalStatus([
        { value: 'অবিবাহিত' },
        { value: 'বিবাহিত' },
        { value: 'ডিভোর্সড' },
        { value: 'বিধবা' },
      ]);
    }
  }, [bioType, gender]);

  const submitGeneralFormHandler = async (event) => {
    event.preventDefault();

    let formData = {
      bio_type: bioType,
      marital_status: maritalStatus,
      date_of_birth: dob,
      height: parseFloat(height),
      screen_color: color,
      weight: convertToEnglishDigits(weight.toString()),
      blood_group: blood,
      nationality: nationality,
      gender: gender,
      user_id: userInfo?.data?._id,
      refer_user: referId?.value,
      religion: religion,
      religious_type: religiousType,
    };

    // console.log('general_info_data~~', formData);

    // console.log("userInfo?.data?._id~~", userInfo?.data?._id);
    // console.log("!getToken()?.token~~", getToken()?.token);

    if (!getToken()?.token || !userInfo?.data?._id) {
      alert('Please logout and try again');
      return;
    }

    try {
      setLoading(true);
      let data;
      if (generalInfo?.success) {
        data = await GeneralInfoServices.updateGeneralInfo(
          formData,
          getToken()?.token
        );
      } else {
        data = await BioDataServices.createGeneralInfo(
          { ...formData, user_form: userForm },
          getToken().token
        );
      }
      if (data.success) {
        Toast.successToast('আপনার তথ্য আপডেট  করা হয়েছে');
        setUserForm((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
      const errorMsg = getErrorMessage(error);
      Toast.errorToast(errorMsg);
      // ! for token error redirect to logout
      if (errorMsg.includes('You are not authorized')) {
        await logOut();
        removeToken();
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <FormTitle title="সাধারন তথ্য" />
      {isLoading ? (
        <LoadingCircle />
      ) : (
        <form onSubmit={submitGeneralFormHandler}>
          {userInfoIds && (
            <SingleSelect
              title="রেফার আইডি"
              value={referId}
              setValue={setReferId}
              required={false}
              classes="z-10"
              options={userInfoIds?.data.map((item) => {
                return { value: item._id, label: item.user_id };
              })}
            />
          )}

          <Select
            title="বায়োডাটার ধরণ"
            options={bioDataTypes}
            value={bioType}
            setValue={setBioType}
            required
          />
          <Select
            title="লিঙ্গ"
            options={genderOptions}
            value={gender}
            setValue={setGender}
            required
          />

          <Select
            title="বৈবাহিক অবস্থা "
            required
            value={maritalStatus}
            setValue={setMaritalStatus}
            options={filteredMaritalStatus}
          />

          <Input
            title={'জন্মসন '}
            value={dob}
            setValue={setDob}
            required
            type="date"
          />

          <div className="text-center w-full sm:hidden block">
            <CustomButton
              onClick={() => {
                setIsModalForBioDate(true);
              }}
              type="button"
              className=" flex w-full mx-auto md:w-[50%] mt-3 items-center justify-center border hover:bg-transparent border-indigo-700 rounded-full py-2 bg-white"
            >
              <FaYoutube className="mb-0 pb-0 mr-2  text-red-500 w-12 h-6  rounded-full bg-white" />{' '}
              <span
                className="md:text-xl text-xl"
                style={{
                  color: Colors.titleText,
                }}
              >
                যেভাবে জন্ম তারিখ সিলেক্ট করবেন
              </span>
            </CustomButton>
            <CustomModal
              onClose={() => setIsModalForBioDate(false)}
              isOpen={isModelForBioDate}
              title="যেভাবে জন্ম তারিখ সিলেক্ট করবেন"
            >
              <LiteYouTubeEmbed
                id="Gc5WmS1K9D8"
                title="কীভাবে PNC নিকাহতে জন্ম তারিখ সেট করতে হয় - PNC Nikah"
              />
            </CustomModal>
          </div>

          <Select
            title="উচ্চতা "
            required
            value={height}
            setValue={setHeight}
            options={heights}
          />

          <Select
            title="গাত্রবর্ণ"
            required
            value={color}
            setValue={setColor}
            options={screenColors}
          />

          <Input
            title={'ওজন (KG) '}
            value={weight}
            setValue={setWeight}
            required
            type="text"
            placeholder="৫০"
            subtitle="বাংলা অংকে লিখুন,যেমনঃ ৫০,৫৫,৪২...।"
          />

          <Select
            title="রক্তের গ্রুপ "
            required
            value={blood}
            setValue={setBlood}
            options={bloodGroup}
          />

          <Select
            title="জাতীয়তা"
            required
            value={nationality}
            setValue={setNationality}
            options={nationalities}
          />
          <Select
            title="ধর্ম"
            required
            value={religion}
            setValue={setReligion}
            options={religions}
          />

          <Select
            title="ধর্মীয় ধরণ"
            required
            value={religiousType}
            setValue={setReligiousType}
            options={religiousTypeOptions}
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

export default GeneralInfoForm;
