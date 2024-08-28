import { useContext } from 'react';
import BioContext from '../../contexts/BioContext';
import GridQuestionAnswerCard from '../GridQuestionAnswerCard/GridQuestionAnswerCard';

const PersonalInfo = () => {
  const { bio } = useContext(BioContext);
  const personalInfo = bio?.personalInfo || null;
  const generalInfo = bio?.generalInfo || null;
  // console.log("personal-info~", personalInfo);

  return (
    <div className="w-auto border-t-2 rounded shadow single-bio-personal-info">
      <h5 className="my-3 text-2xl text-center card-title">ব্যক্তিগত তথ্য</h5>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-0 my-3">
        {generalInfo?.gender === 'মহিলা' ||
        generalInfo?.bio_type === 'পাত্রীর বায়োডাটা' ? (
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
              question="সুন্নতি দাঁড়ি আছে (১ মুষ্টি)?"
              answer={personalInfo?.isBeard}
            />
            <GridQuestionAnswerCard
              question="সুন্নতি দাঁড়ি কত বছর যাবত?"
              answer={personalInfo?.from_beard}
            />
            <GridQuestionAnswerCard
              question="টাখনুর উপরে কাপড় পরেন?"
              answer={personalInfo?.isTakhnu}
            />
            <GridQuestionAnswerCard
              question="প্রতিদিন পাঁচ ওয়াক্ত নামাজ জামায়াতে পড়েন কি?"
              answer={personalInfo?.isDailyFiveJamaat}
            />
            {/* Uncomment the following if needed */}
            {/* <GridQuestionAnswerCard
        question="প্রতিদিন পাঁচ ওয়াক্ত কবে থেকে নিয়মিত জামায়াতে পড়ছেন?"
        answer={personalInfo?.daily_five_jamaat_from}
      /> */}
          </>
        )}

        <GridQuestionAnswerCard
          question="প্রতিদিন পাঁচ ওয়াক্ত নামাজ পড়েন কি?"
          answer={personalInfo?.isDailyFive}
        />
        <GridQuestionAnswerCard
          question="সাধারণত সপ্তাহে কত ওয়াক্ত নামায আপনার কাযা হয়?"
          answer={personalInfo?.qadha_weekly}
        />
        <GridQuestionAnswerCard
          question="মাহরাম/নন-মাহরাম(অনলাইন-অফলাইন) মেনে চলেন কি?"
          answer={personalInfo?.mahram_non_mahram}
        />
        <GridQuestionAnswerCard
          question="শুদ্ধভাবে কুরআন তিলওয়াত করতে পারেন?"
          answer={personalInfo?.quran_tilawat}
        />

        <GridQuestionAnswerCard
          question="শুদ্ধভাবে কুরআন তিলওয়াত করতে পারেন?"
          answer={personalInfo?.quran_tilawat}
        />
        <GridQuestionAnswerCard
          question="শুদ্ধভাবে কুরআন তিলওয়াত করতে পারেন?"
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
          question="নাটক / সিনেমা / সিরিয়াল / গান এসব দেখেন বা শুনেন?"
          answer={personalInfo?.natok_cinema}
        />

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
          question="কোনো নেশাদ্রব্য পান করেন?"
          answer={personalInfo?.isNeshaDrobbo}
        />
        <GridQuestionAnswerCard
          question="মিলাদ ও কিয়াম সম্পর্কে আপনার ধারনা কি?"
          answer={personalInfo?.about_milad_qiyam}
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
