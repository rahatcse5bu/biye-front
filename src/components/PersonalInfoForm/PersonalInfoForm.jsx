/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import FormTitle from '../FormTitle/FormTitle';
import Input from '../Input/Input';
import Select from '../Select/Select';
import {
  fiqhOptions,
  personalCategoryOptions,
  // Hindu constants
  hinduSampradayOptions,
  hinduCasteOptions,
  hinduGotraOptions,
  hinduTempleVisitOptions,
  hinduPujaOptions,
  hinduFastingOptions,
  hinduDietOptions,
  yesNoOptions,
  // Christian constants
  christianDenominationOptions,
  christianChurchAttendanceOptions,
  christianBibleReadingOptions,
  christianMinistryOptions,
} from './personalInfoForm.constant';
import Textarea from '../Textarea/Textarea';
import { Colors } from '../../constants/colors';
import { useQuery } from '@tanstack/react-query';
import UserContext from '../../contexts/UserContext';
import { getToken } from '../../utils/cookies';
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import MultipleSelect from '../MultitpleSelect/MultipleSelect';
import {
  dataToMultipleExpectedPartner,
  getDataFromMultipleInputExpectedPartner,
} from '../../utils/form';
import { PersonalInfoInfoServices } from '../../services/personalInfo';
import { getErrorMessage } from '../../utils/error';
import { Toast } from '../../utils/toast';

const PersonalInfoForm = ({ setUserForm, userForm, religion = 'islam', gender: genderProp = '' }) => {
  // Common states
  const [cloth, setCloth] = useState('');
  const [personalCategory, setPersonalCategory] = useState([]);
  const [isDisease, setIsDisease] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [isNeshaDrobbo, setIsNeshaDrobbo] = useState('');

  // Islamic states
  const [isDeenContribution, setIsDeenContribution] = useState('');
  const [mazar, setMazar] = useState('');
  const [fiqh, setFiqh] = useState('');
  const [salatKaza, setSalatKaza] = useState('');
  const [fromWhenBeard, setFromWhenBeard] = useState('');
  const [fromWhenFiveSalat, setFromWhenFiveSalat] = useState('');
  const [fromWhenNikhab, setFromWhenNikhab] = useState('');
  const [uponTakhno, setUponTakhno] = useState('');
  const [isDailyFive, setIsDailyFive] = useState('');
  const [isMahram, setIsMahram] = useState('');
  const [isNatok, setIsNatok] = useState('');
  const [isPureRecite, setIsPureRecite] = useState('');
  const [books, setBooks] = useState('');
  const [scholars, setScholars] = useState('');
  const [acceptIslam, setAcceptIslam] = useState('');
  const [fromWhenFiveSalatJamat, setFromWhenFiveSalatJamat] = useState('');
  const [isDailyFiveJamaat, setIsDailyFiveJamaat] = useState('');
  const [isBeard, setIsBeard] = useState('');
  const [aboutMiladQiyam, setAboutMiladQiyam] = useState('');

  // Hindu states (matching backend field names)
  const [hinduSampraday, setHinduSampraday] = useState('');
  const [hinduCaste, setHinduCaste] = useState('');
  const [hinduGotra, setHinduGotra] = useState('');
  const [hinduTempleVisit, setHinduTempleVisit] = useState('');
  const [hinduPujaFrequency, setHinduPujaFrequency] = useState('');
  const [hinduFasting, setHinduFasting] = useState('');
  const [hinduDiet, setHinduDiet] = useState('');
  const [hinduFamilyDeity, setHinduFamilyDeity] = useState('');

  // Christian states (matching backend field names)
  const [christianDenomination, setChristianDenomination] = useState('');
  const [christianChurchAttendance, setChristianChurchAttendance] = useState('');
  const [christianBibleReading, setChristianBibleReading] = useState('');
  const [christianBaptized, setChristianBaptized] = useState('');
  const [christianChurchName, setChristianChurchName] = useState('');
  const [christianMinistry, setChristianMinistry] = useState('');
  const [christianAboutFaith, setChristianAboutFaith] = useState('');

  const backButtonHandler = () => {
    if (userForm > 1) {
      setUserForm((prev) => prev - 1);
    }
  };
  const { userInfo } = useContext(UserContext);

  const { data: personalInfo = null, isLoading } = useQuery({
    queryKey: ['personal-info', userInfo?.data?._id],
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
  const gender = genderProp;

  useEffect(() => {
    if (personalInfo?.data) {
      const {
        // Common fields
        outside_clothings,
        physical_problem,
        about_me,
        my_phone,
        isNeshaDrobbo,
        my_categories,
        // Islamic fields
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
        special_deeni_mehnot,
        mazar,
        islamic_books,
        islamic_scholars,
        from_when_nikhab,
        about_reverted_islam,
        about_milad_qiyam,
        // Hindu fields (backend uses short names)
        sampraday,
        caste,
        gotra,
        temple_visit_frequency,
        regular_pooja,
        vrat_observance,
        food_habit,
        kul_devata,
        // Christian fields (backend uses short names)
        denomination,
        church_attendance,
        bible_reading_frequency,
        baptism_status,
        church_name,
        church_activity_participation,
        religious_value_importance,
      } = personalInfo.data;

      // Common fields
      setCloth(outside_clothings);
      setPersonalCategory(dataToMultipleExpectedPartner(my_categories));
      setAboutMe(about_me);
      setPhone(my_phone);
      setIsDisease(physical_problem);
      setIsNeshaDrobbo(isNeshaDrobbo);

      // Islamic fields
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
      setScholars(islamic_scholars);
      setBooks(islamic_books);
      setIsPureRecite(quran_tilawat);
      setIsNatok(natok_cinema);
      setIsDeenContribution(special_deeni_mehnot);
      setFromWhenNikhab(from_when_nikhab);
      setAcceptIslam(about_reverted_islam);
      setAboutMiladQiyam(about_milad_qiyam);

      // Hindu fields (backend uses short names)
      setHinduSampraday(sampraday || '');
      setHinduCaste(caste || '');
      setHinduGotra(gotra || '');
      setHinduTempleVisit(temple_visit_frequency || '');
      setHinduPujaFrequency(regular_pooja || '');
      setHinduFasting(vrat_observance || '');
      setHinduDiet(food_habit || '');
      setHinduFamilyDeity(kul_devata || '');

      // Christian fields (backend uses short names)
      setChristianDenomination(denomination || '');
      setChristianChurchAttendance(church_attendance || '');
      setChristianBibleReading(bible_reading_frequency || '');
      setChristianBaptized(baptism_status || '');
      setChristianChurchName(church_name || '');
      setChristianMinistry(church_activity_participation || '');
      setChristianAboutFaith(religious_value_importance || '');
    }
  }, [personalInfo]);
  const submitHandler = async (e) => {
    e.preventDefault();

    // Common fields
    let personalInfoData = {
      outside_clothings: cloth,
      physical_problem: isDisease,
      about_me: aboutMe,
      my_phone: phone,
      isNeshaDrobbo,
      my_categories: getDataFromMultipleInputExpectedPartner(personalCategory),
    };

    // Add religion-specific fields based on religion
    if (religion === 'islam') {
      personalInfoData = {
        ...personalInfoData,
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
        special_deeni_mehnot: isDeenContribution,
        mazar: mazar,
        islamic_books: books,
        islamic_scholars: scholars,
        from_when_nikhab: fromWhenNikhab,
        isBeard: isBeard,
        about_reverted_islam: acceptIslam,
        about_milad_qiyam: aboutMiladQiyam,
      };
    } else if (religion === 'hinduism') {
      personalInfoData = {
        ...personalInfoData,
        sampraday: hinduSampraday,
        caste: hinduCaste,
        gotra: hinduGotra,
        temple_visit_frequency: hinduTempleVisit,
        regular_pooja: hinduPujaFrequency,
        vrat_observance: hinduFasting,
        food_habit: hinduDiet,
        kul_devata: hinduFamilyDeity,
      };
    } else if (religion === 'christianity') {
      personalInfoData = {
        ...personalInfoData,
        denomination: christianDenomination,
        church_attendance: christianChurchAttendance,
        bible_reading_frequency: christianBibleReading,
        baptism_status: christianBaptized,
        church_name: christianChurchName,
        church_activity_participation: christianMinistry,
        religious_value_importance: christianAboutFaith,
      };
    }

    if (!getToken()?.token || !userInfo?.data?._id) {
      alert('Please logout and try again');
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

  // console.log(personalInfo);
  // console.log("personalCategory~~", personalCategory);

  return (
    <div className="mt-5">
      <FormTitle title="ব্যক্তিগত তথ্য" />
      {isLoading ? (
        <LoadingCircle classes="mt-10" />
      ) : (
        <form action="" onSubmit={submitHandler}>
          {/* Common field - Clothing */}
          <Textarea
            title="ঘরের বাহিরে সাধারণত কি ধরণের পোষাক পরেন?"
            value={cloth}
            rows={2}
            setValue={setCloth}
            required
          />

          {/* ============ ISLAMIC FORM ============ */}
          {religion === 'islam' && gender && gender === 'মহিলা' && (
            <Textarea
              title=" কবে থেকে নিকাব সহ পর্দা করছেন?"
              value={fromWhenNikhab}
              setValue={setFromWhenNikhab}
              rows={2}
              required
            />
          )}
          {religion === 'islam' && gender && gender === 'পুরুষ' && (
            <>
              <Select
                title=" সুন্নতি দাড়ি আছে কি না?"
                options={[
                  {
                    value: 'জ্বী ,আলহামদুলিল্লাহ',
                  },
                  {
                    value: 'না',
                  },
                ]}
                value={isBeard}
                setValue={setIsBeard}
                required
              />
              {isBeard === 'জ্বী ,আলহামদুলিল্লাহ' && (
                <Textarea
                  title="কবে থেকে রেখেছেন?"
                  required={true}
                  value={fromWhenBeard}
                  setValue={setFromWhenBeard}
                  rows={2}
                />
              )}
            </>
          )}
          {religion === 'islam' && gender && gender === 'পুরুষ' && (
            <Select
              title="টাখনুর উপরে কাপড় পরেন? "
              options={[
                {
                  value: 'জ্বী ,আলহামদুলিল্লাহ',
                },
                {
                  value: 'না',
                },
              ]}
              value={uponTakhno}
              setValue={setUponTakhno}
              required
            />
          )}

          {religion === 'islam' && (
            <Select
              title="প্রতিদিন পাঁচ ওয়াক্ত নামাজ পড়েন কি? "
              options={[
                {
                  value: 'জ্বী ,আলহামদুলিল্লাহ',
                },
                {
                  value: 'না',
                },
              ]}
              value={isDailyFive}
              setValue={setIsDailyFive}
              required
            />
          )}
          {religion === 'islam' && isDailyFive === 'জ্বী ,আলহামদুলিল্লাহ' && (
            <Input
              title="কবে থেকে পড়ছেন?"
              value={fromWhenFiveSalat}
              setValue={setFromWhenFiveSalat}
              required
            />
          )}
          {religion === 'islam' && gender && gender === 'পুরুষ' && (
            <>
              <Select
                title="প্রতিদিন পাঁচ ওয়াক্ত নামাজ জামায়াতে পড়েন কি? "
                options={[
                  {
                    value: 'জ্বী ,আলহামদুলিল্লাহ',
                  },
                  {
                    value: 'না',
                  },
                ]}
                value={isDailyFiveJamaat}
                setValue={setIsDailyFiveJamaat}
                required
              />
              {isDailyFiveJamaat === 'জ্বী ,আলহামদুলিল্লাহ' && (
                <Textarea
                  title="প্রতিদিন পাঁচ ওয়াক্ত কবে থেকে নিয়মিত জামায়াতে পড়ছেন?"
                  value={fromWhenFiveSalatJamat}
                  setValue={setFromWhenFiveSalatJamat}
                  required
                  rows={2}
                />
              )}
            </>
          )}

          {religion === 'islam' && (
            <Textarea
              title="সাধারণত সপ্তাহে কত ওয়াক্ত নামায আপনার কাযা হয়?"
              value={salatKaza}
              setValue={setSalatKaza}
              required
              rows={2}
            />
          )}
          {religion === 'islam' && (
            <Textarea
              title=" মাহরাম/নন-মাহরাম মেনে চলেন কি?"
              value={isMahram}
              rows={2}
              setValue={setIsMahram}
              required
            />
          )}
          {religion === 'islam' && (
            <Textarea
              rows={2}
              title="শুদ্ধভাবে কুরআন তিলওয়াত করতে পারেন?"
              value={isPureRecite}
              setValue={setIsPureRecite}
              required
            />
          )}
          {religion === 'islam' && (
            <Select
              title="কোন ফিকহ অনুসরণ করেন?"
              options={fiqhOptions}
              value={fiqh}
              setValue={setFiqh}
            />
          )}

          {religion === 'islam' && (
            <Textarea
              title="নাটক / সিনেমা / সিরিয়াল / গান এসব দেখেন বা শুনেন?"
              value={isNatok}
              setValue={setIsNatok}
              required
              rows={2}
            />
          )}

          {religion === 'islam' && (
            <Textarea
              title="দ্বীনের কোন বিশেষ মেহনতে যুক্ত আছেন? "
              value={isDeenContribution}
              setValue={setIsDeenContribution}
              rows={2}
              required
            />
          )}
          {religion === 'islam' && (
            <Textarea
              title="মাজার সম্পর্কে আপনার ধারণা বা বিশ্বাস কি? "
              value={mazar}
              setValue={setMazar}
              rows={3}
              required
            />
          )}
          {religion === 'islam' && (
            <Textarea
              title="আপনার পড়া হয়েছে এমন অন্তত ৩ টি ইসলামি বই এর নাম লিখুন "
              value={books}
              setValue={setBooks}
              rows={2}
              required
            />
          )}

          {religion === 'islam' && (
            <Textarea
              title="আপনার পছন্দের অন্তত ৩ জন আলেমের নাম লিখুন"
              value={scholars}
              setValue={setScholars}
              required
              rows={2}
            />
          )}

          {/* <Select
				title="আপনার ক্ষেত্রে প্রযোজ্য হয় এমন ক্যাটাগরি সিলেক্ট করুন। (অন্যথায় ঘরটি ফাঁকা রাখুন) "
				options={personalCategoryOptions}
				value={personalCategory}
				setValue={setPersonalCategory}
			/> */}

          {religion === 'islam' && (
            <MultipleSelect
              title="আপনার ক্ষেত্রে প্রযোজ্য হয় এমন ক্যাটাগরি সিলেক্ট করুন। (অন্যথায় ঘরটি ফাঁকা রাখুন) "
              options={personalCategoryOptions}
              value={personalCategory}
              setValue={setPersonalCategory}
            />
          )}

          {religion === 'islam' &&
            personalCategory?.length > 0 &&
            personalCategory.some((item) => item.value === 'নওমুসলিম') && (
              <Textarea
                title="আপনার ইসলাম গ্রহণের সময় ও ঘটনা উল্লেখ করুন"
                value={acceptIslam}
                setValue={setAcceptIslam}
                required
              />
            )}
          {religion === 'islam' && (
            <Textarea
              title="মিলাদ ও কিয়াম সম্পর্কে আপনার ধারনা কি?"
              value={aboutMiladQiyam}
              setValue={setAboutMiladQiyam}
            />
          )}

          {/* ============ HINDU FORM ============ */}
          {religion === 'hinduism' && (
            <>
              <Select
                title="সম্প্রদায়"
                options={hinduSampradayOptions}
                value={hinduSampraday}
                setValue={setHinduSampraday}
                required
              />
              <Select
                title="জাতি/বর্ণ"
                options={hinduCasteOptions}
                value={hinduCaste}
                setValue={setHinduCaste}
                required
              />
              <Select
                title="গোত্র"
                options={hinduGotraOptions}
                value={hinduGotra}
                setValue={setHinduGotra}
              />
              <Input
                title="কুলদেবতা/পারিবারিক দেবতা"
                value={hinduFamilyDeity}
                setValue={setHinduFamilyDeity}
              />
              <Select
                title="মন্দিরে যাওয়া"
                options={hinduTempleVisitOptions}
                value={hinduTempleVisit}
                setValue={setHinduTempleVisit}
                required
              />
              <Select
                title="পূজা করেন?"
                options={hinduPujaOptions}
                value={hinduPujaFrequency}
                setValue={setHinduPujaFrequency}
                required
              />
              <Select
                title="ব্রত/উপবাস"
                options={hinduFastingOptions}
                value={hinduFasting}
                setValue={setHinduFasting}
              />
              <Select
                title="খাদ্যাভ্যাস"
                options={hinduDietOptions}
                value={hinduDiet}
                setValue={setHinduDiet}
                required
              />
            </>
          )}

          {/* ============ CHRISTIAN FORM ============ */}
          {religion === 'christianity' && (
            <>
              <Select
                title="ডিনমিনেশন/সম্প্রদায়"
                options={christianDenominationOptions}
                value={christianDenomination}
                setValue={setChristianDenomination}
                required
              />
              <Input
                title="গির্জার নাম"
                value={christianChurchName}
                setValue={setChristianChurchName}
              />
              <Select
                title="গির্জায় যাওয়া"
                options={christianChurchAttendanceOptions}
                value={christianChurchAttendance}
                setValue={setChristianChurchAttendance}
                required
              />
              <Select
                title="বাইবেল পড়েন?"
                options={christianBibleReadingOptions}
                value={christianBibleReading}
                setValue={setChristianBibleReading}
                required
              />
              <Select
                title="বাপ্তিস্ম নিয়েছেন?"
                options={yesNoOptions}
                value={christianBaptized}
                setValue={setChristianBaptized}
                required
              />
              <Select
                title="গির্জার কার্যক্রমে অংশগ্রহণ"
                options={christianMinistryOptions}
                value={christianMinistry}
                setValue={setChristianMinistry}
              />
              <Textarea
                title="ধর্মীয় মূল্যবোধ সম্পর্কে লিখুন"
                value={christianAboutFaith}
                setValue={setChristianAboutFaith}
                rows={3}
              />
            </>
          )}

          {/* ============ COMMON FIELDS ============ */}
          <Textarea
            title="আপনার মানসিক বা শারীরিক কোনো রোগ আছে?"
            value={isDisease}
            setValue={setIsDisease}
            rows={2}
            required
          />

          <Textarea
            title="নিজের সম্পর্কে কিছু লিখুন "
            value={aboutMe}
            required
            setValue={setAboutMe}
          />

          <Input
            title="কোনো নেশাদ্রব্য পান করেন?"
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
              {loading ? <LoadingCircle /> : 'Save & Next'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PersonalInfoForm;
