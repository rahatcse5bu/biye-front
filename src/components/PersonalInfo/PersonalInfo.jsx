import { useContext } from 'react';
import BioContext from '../../contexts/BioContext';
import GridQuestionAnswerCard from '../GridQuestionAnswerCard/GridQuestionAnswerCard';

const PersonalInfo = () => {
  const { bio } = useContext(BioContext);
  const personalInfo = bio?.personalInfo || null;
  const generalInfo = bio?.generalInfo || null;
  const religion = generalInfo?.religion || 'islam';

  // Helper function to render Islamic fields
  const renderIslamicFields = () => (
    <>
      {generalInfo?.gender === 'মহিলা' ||
      generalInfo?.bio_type === 'পাত্রীর বায়োডাটা' ? (
        <>
          <GridQuestionAnswerCard
            question="ঘরের বাহিরে সাধারণত কি ধরণের পোষাক পরেন?"
            answer={personalInfo?.outside_clothings}
          />
          <GridQuestionAnswerCard
            question="কবে থেকে নিকাব সহ পর্দা করছেন?"
            answer={personalInfo?.porda_with_niqab_from}
          />
        </>
      ) : (
        <>
          <GridQuestionAnswerCard
            question="সুন্নতি দাঁড়ি আছে (১ মুষ্টি)?"
            answer={personalInfo?.isBeard}
          />
          <GridQuestionAnswerCard
            question="সুন্নতি দাঁড়ি কত বছর যাবত?"
            answer={personalInfo?.from_beard}
          />
          <GridQuestionAnswerCard
            question="টাখনুর উপরে কাপড় পরেন?"
            answer={personalInfo?.isTakhnu}
          />
          <GridQuestionAnswerCard
            question="প্রতিদিন পাঁচ ওয়াক্ত নামাজ জামায়াতে পড়েন কি?"
            answer={personalInfo?.isDailyFiveJamaat}
          />
        </>
      )}

      <GridQuestionAnswerCard
        question="প্রতিদিন পাঁচ ওয়াক্ত নামাজ পড়েন কি?"
        answer={personalInfo?.isDailyFive}
      />
      <GridQuestionAnswerCard
        question="সাধারণত সপ্তাহে কত ওয়াক্ত নামায আপনার কাযা হয়?"
        answer={personalInfo?.qadha_weekly}
      />
      <GridQuestionAnswerCard
        question="মাহরাম/নন-মাহরাম(অনলাইন-অফলাইন) মেনে চলেন কি?"
        answer={personalInfo?.mahram_non_mahram}
      />
      <GridQuestionAnswerCard
        question="শুদ্ধভাবে কুরআন তিলওয়াত করতে পারেন?"
        answer={personalInfo?.quran_tilawat}
      />
      <GridQuestionAnswerCard
        question="কোন ফিকহ অনুসরণ করেন?"
        answer={personalInfo?.fiqh}
      />
      {personalInfo?.aqidah && (
        <GridQuestionAnswerCard
          question="কোন আকিদা অনুসরণ করেন?"
          answer={personalInfo?.aqidah}
        />
      )}
      <GridQuestionAnswerCard
        question="নাটক / সিনেমা / সিরিয়াল / গান এসব দেখেন বা শুনেন?"
        answer={personalInfo?.natok_cinema}
      />
      <GridQuestionAnswerCard
        question="দ্বীনের কোন বিশেষ মেহনতে যুক্ত আছেন?"
        answer={personalInfo?.special_deeni_mehnot}
      />
      <GridQuestionAnswerCard
        question="মাজার সম্পর্কে আপনার ধারণা বা বিশ্বাস কি?"
        answer={personalInfo?.mazar}
      />
      <GridQuestionAnswerCard
        question="আপনার পছন্দের অন্তত ৩ টি ইসলামি বই এর নাম লিখুন"
        answer={personalInfo?.islamic_books}
      />
      <GridQuestionAnswerCard
        question="আপনার পছন্দের অন্তত ৩ জন আলেমের নাম লিখুন"
        answer={personalInfo?.islamic_scholars}
      />
      <GridQuestionAnswerCard
        question="মিলাদ ও কিয়াম সম্পর্কে আপনার ধারনা কি?"
        answer={personalInfo?.about_milad_qiyam}
      />
    </>
  );

  // Helper function to render Hindu fields
  const renderHinduFields = () => (
    <>
      <GridQuestionAnswerCard
        question="ঘরের বাহিরে সাধারণত কি ধরণের পোষাক পরেন?"
        answer={personalInfo?.outside_clothings}
      />
      {personalInfo?.hindu_sampraday && (
        <GridQuestionAnswerCard
          question="সম্প্রদায়"
          answer={personalInfo?.hindu_sampraday}
        />
      )}
      {personalInfo?.hindu_caste && (
        <GridQuestionAnswerCard
          question="জাতি/বর্ণ"
          answer={personalInfo?.hindu_caste}
        />
      )}
      {personalInfo?.hindu_gotra && (
        <GridQuestionAnswerCard
          question="গোত্র"
          answer={personalInfo?.hindu_gotra}
        />
      )}
      {personalInfo?.hindu_family_deity && (
        <GridQuestionAnswerCard
          question="কুলদেবতা/পারিবারিক দেবতা"
          answer={personalInfo?.hindu_family_deity}
        />
      )}
      {personalInfo?.hindu_temple_visit && (
        <GridQuestionAnswerCard
          question="মন্দিরে যাওয়া"
          answer={personalInfo?.hindu_temple_visit}
        />
      )}
      {personalInfo?.hindu_puja_frequency && (
        <GridQuestionAnswerCard
          question="পূজা করেন?"
          answer={personalInfo?.hindu_puja_frequency}
        />
      )}
      {personalInfo?.hindu_scripture_reading && (
        <GridQuestionAnswerCard
          question="ধর্মগ্রন্থ পড়েন?"
          answer={personalInfo?.hindu_scripture_reading}
        />
      )}
      {personalInfo?.hindu_fasting && (
        <GridQuestionAnswerCard
          question="ব্রত/উপবাস"
          answer={personalInfo?.hindu_fasting}
        />
      )}
      {personalInfo?.hindu_diet && (
        <GridQuestionAnswerCard
          question="খাদ্যাভ্যাস"
          answer={personalInfo?.hindu_diet}
        />
      )}
      {personalInfo?.hindu_vegetarian && (
        <GridQuestionAnswerCard
          question="সম্পূর্ণ নিরামিষ?"
          answer={personalInfo?.hindu_vegetarian}
        />
      )}
      {personalInfo?.hindu_festivals && (
        <GridQuestionAnswerCard
          question="প্রধান উৎসব"
          answer={personalInfo?.hindu_festivals}
        />
      )}
      {personalInfo?.hindu_dress_code && (
        <GridQuestionAnswerCard
          question="পোশাক"
          answer={personalInfo?.hindu_dress_code}
        />
      )}
      {personalInfo?.hindu_about_religion && (
        <GridQuestionAnswerCard
          question="ধর্ম সম্পর্কে আপনার মতামত"
          answer={personalInfo?.hindu_about_religion}
        />
      )}
    </>
  );

  // Helper function to render Christian fields
  const renderChristianFields = () => (
    <>
      <GridQuestionAnswerCard
        question="ঘরের বাহিরে সাধারণত কি ধরণের পোষাক পরেন?"
        answer={personalInfo?.outside_clothings}
      />
      {personalInfo?.christian_denomination && (
        <GridQuestionAnswerCard
          question="ডিনমিনেশন/সম্প্রদায়"
          answer={personalInfo?.christian_denomination}
        />
      )}
      {personalInfo?.christian_church_name && (
        <GridQuestionAnswerCard
          question="গির্জার নাম"
          answer={personalInfo?.christian_church_name}
        />
      )}
      {personalInfo?.christian_church_attendance && (
        <GridQuestionAnswerCard
          question="গির্জায় যাওয়া"
          answer={personalInfo?.christian_church_attendance}
        />
      )}
      {personalInfo?.christian_bible_reading && (
        <GridQuestionAnswerCard
          question="বাইবেল পড়েন?"
          answer={personalInfo?.christian_bible_reading}
        />
      )}
      {personalInfo?.christian_prayer && (
        <GridQuestionAnswerCard
          question="প্রার্থনা করেন?"
          answer={personalInfo?.christian_prayer}
        />
      )}
      {personalInfo?.christian_baptized && (
        <GridQuestionAnswerCard
          question="বাপ্তিস্ম নিয়েছেন?"
          answer={personalInfo?.christian_baptized}
        />
      )}
      {personalInfo?.christian_festivals && (
        <GridQuestionAnswerCard
          question="প্রধান উৎসব"
          answer={personalInfo?.christian_festivals}
        />
      )}
      {personalInfo?.christian_dress_code && (
        <GridQuestionAnswerCard
          question="পোশাক"
          answer={personalInfo?.christian_dress_code}
        />
      )}
      {personalInfo?.christian_diet && (
        <GridQuestionAnswerCard
          question="খাদ্যাভ্যাস"
          answer={personalInfo?.christian_diet}
        />
      )}
      {personalInfo?.christian_ministry && (
        <GridQuestionAnswerCard
          question="মিনিস্ট্রি/সেবা কাজে যুক্ত?"
          answer={personalInfo?.christian_ministry}
        />
      )}
      {personalInfo?.christian_about_faith && (
        <GridQuestionAnswerCard
          question="আপনার বিশ্বাস সম্পর্কে"
          answer={personalInfo?.christian_about_faith}
        />
      )}
    </>
  );

  return (
    <div className="w-auto border-t-2 rounded shadow single-bio-personal-info">
      <h5 className="my-3 text-2xl text-center card-title">ব্যক্তিগত তথ্য</h5>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-0 my-3">
        {/* Render religion-specific fields */}
        {religion === 'islam' && renderIslamicFields()}
        {religion === 'hinduism' && renderHinduFields()}
        {religion === 'christianity' && renderChristianFields()}

        {/* Common fields for all religions */}
        {personalInfo?.physical_problem && (
          <GridQuestionAnswerCard
            question="আপনার শারীরিক কোনো রোগ আছে?"
            answer={personalInfo.physical_problem}
          />
        )}
        {personalInfo?.mental_problem && (
          <GridQuestionAnswerCard
            question=" আপনার মানসিক কোনো রোগ আছে?"
            answer={personalInfo?.mental_problem}
          />
        )}
        <GridQuestionAnswerCard
          question="কোনো নেশাদ্রব্য পান করেন?"
          answer={personalInfo?.isNeshaDrobbo}
        />
        <GridQuestionAnswerCard
          question="নিজের সম্পর্কে কিছু লিখুন"
          answer={personalInfo?.about_me}
        />
      </div>
    </div>
  );
};

export default PersonalInfo;
