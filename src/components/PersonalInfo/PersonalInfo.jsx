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
      {personalInfo?.sampraday && (
        <GridQuestionAnswerCard
          question="সম্প্রদায়"
          answer={personalInfo?.sampraday}
        />
      )}
      {personalInfo?.caste && (
        <GridQuestionAnswerCard
          question="জাতি/বর্ণ"
          answer={personalInfo?.caste}
        />
      )}
      {personalInfo?.gotra && (
        <GridQuestionAnswerCard question="গোত্র" answer={personalInfo?.gotra} />
      )}
      {personalInfo?.kul_devata && (
        <GridQuestionAnswerCard
          question="কুলদেবতা/পারিবারিক দেবতা"
          answer={personalInfo?.kul_devata}
        />
      )}
      {personalInfo?.temple_visit_frequency && (
        <GridQuestionAnswerCard
          question="মন্দিরে যাওয়া"
          answer={personalInfo?.temple_visit_frequency}
        />
      )}
      {personalInfo?.regular_pooja && (
        <GridQuestionAnswerCard
          question="পূজা করেন?"
          answer={personalInfo?.regular_pooja}
        />
      )}
      {personalInfo?.vrat_observance && (
        <GridQuestionAnswerCard
          question="ব্রত/উপবাস"
          answer={personalInfo?.vrat_observance}
        />
      )}
      {personalInfo?.food_habit && (
        <GridQuestionAnswerCard
          question="খাদ্যাভ্যাস"
          answer={personalInfo?.food_habit}
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
      {personalInfo?.denomination && (
        <GridQuestionAnswerCard
          question="ডিনমিনেশন/সম্প্রদায়"
          answer={personalInfo?.denomination}
        />
      )}
      {personalInfo?.church_name && (
        <GridQuestionAnswerCard
          question="গির্জার নাম"
          answer={personalInfo?.church_name}
        />
      )}
      {personalInfo?.church_attendance && (
        <GridQuestionAnswerCard
          question="গির্জায় যাওয়া"
          answer={personalInfo?.church_attendance}
        />
      )}
      {personalInfo?.bible_reading_frequency && (
        <GridQuestionAnswerCard
          question="বাইবেল পড়েন?"
          answer={personalInfo?.bible_reading_frequency}
        />
      )}
      {personalInfo?.baptism_status && (
        <GridQuestionAnswerCard
          question="বাপ্তিস্ম নিয়েছেন?"
          answer={personalInfo?.baptism_status}
        />
      )}
      {personalInfo?.church_activity_participation && (
        <GridQuestionAnswerCard
          question="মিনিস্ট্রি/সেবা কাজে যুক্ত?"
          answer={personalInfo?.church_activity_participation}
        />
      )}
      {personalInfo?.religious_value_importance && (
        <GridQuestionAnswerCard
          question="আপনার বিশ্বাস সম্পর্কে"
          answer={personalInfo?.religious_value_importance}
        />
      )}
    </>
  );

  return (
    <div className="w-auto border-t-2 rounded shadow single-bio-personal-info">
      <h5 className="my-3 text-2xl text-center card-title">ব্যক্তিগত তথ্য</h5>

      <div className="grid grid-cols-1 gap-0 my-3">
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
