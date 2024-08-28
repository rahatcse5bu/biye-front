import BioContext from '../../contexts/BioContext';
import { useContext } from 'react';
import { convertToBengaliDigits } from '../../utils/language';
import { convertToFeetAndInches } from '../../utils/height';
import GridQuestionAnswerCard from '../GridQuestionAnswerCard/GridQuestionAnswerCard';
const ExpectedPartner = () => {
  const { bio } = useContext(BioContext);
  const expectedLifePartner = bio?.expectedLifePartner || null;
  const generalInfo = bio?.generalInfo || null;
  return (
    <div className="w-auto border-t-2 rounded shadow single-bio-expected-lifepartner-info">
      <h5 className="my-3 text-2xl text-center card-title">
        প্রত্যাশিত জীবনসঙ্গী
      </h5>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-0 my-3">
        <GridQuestionAnswerCard
          question="বয়স"
          answer={`${convertToBengaliDigits(expectedLifePartner?.age?.min)} বছর থেকে ${convertToBengaliDigits(expectedLifePartner?.age?.max)} বছর পর্যন্ত`}
        />
        <GridQuestionAnswerCard
          question="গাত্রবর্ণ"
          answer={expectedLifePartner?.color.join(', ')}
        />
        <GridQuestionAnswerCard
          question="উচ্চতা"
          answer={`${convertToFeetAndInches(expectedLifePartner?.height?.min.toFixed(2))} থেকে ${convertToFeetAndInches(expectedLifePartner?.height?.max.toFixed(2))} পর্যন্ত`}
        />
        {/* For desktops */}
        <GridQuestionAnswerCard
          question="শিক্ষাগত যোগ্যতা"
          answer={expectedLifePartner?.educational_qualifications?.join(', ')}
        />
        {/* For mobiles */}
        <div className="md:hidden">
          <GridQuestionAnswerCard
            question="শিক্ষাগত যোগ্যতা"
            answer={expectedLifePartner?.educational_qualifications?.join(', ')}
          />
        </div>
        {/* For desktops */}
        <GridQuestionAnswerCard
          question="জেলা"
          answer={expectedLifePartner?.zilla.join(', ')}
        />
        {/* For mobiles */}
        <div className="md:hidden">
          <GridQuestionAnswerCard
            question="জেলা"
            answer={expectedLifePartner?.zilla.join(', ')}
          />
        </div>
        {/* For desktops */}
        <GridQuestionAnswerCard
          question="বৈবাহিক অবস্থা"
          answer={expectedLifePartner?.marital_status.join(', ')}
        />
        {/* For mobiles */}
        <div className="md:hidden">
          <GridQuestionAnswerCard
            question="বৈবাহিক অবস্থা"
            answer={expectedLifePartner?.marital_status.join(', ')}
          />
        </div>
        {/* For desktops */}
        <GridQuestionAnswerCard
          question="পেশা"
          answer={expectedLifePartner?.occupation.join(', ')}
        />
        {/* For mobiles */}
        <div className="md:hidden">
          <GridQuestionAnswerCard
            question="পেশা"
            answer={expectedLifePartner?.occupation.join(', ')}
          />
        </div>
        {/* For desktops */}
        <GridQuestionAnswerCard
          question="অর্থনৈতিক অবস্থা"
          answer={expectedLifePartner?.economical_condition.join(', ')}
        />
        {/* For mobiles */}
        <div className="md:hidden">
          <GridQuestionAnswerCard
            question="অর্থনৈতিক অবস্থা"
            answer={expectedLifePartner?.economical_condition.join(', ')}
          />
        </div>
        {/* For desktops */}
        <GridQuestionAnswerCard
          question="জীবনসঙ্গীর যেসব বৈশিষ্ট্য বা গুণাবলী প্রত্যাশা করেন"
          answer={expectedLifePartner?.expected_characteristics}
        />
        {/* For mobiles */}
        <div className="md:hidden">
          <GridQuestionAnswerCard
            question="জীবনসঙ্গীর যেসব বৈশিষ্ট্য বা গুণাবলী প্রত্যাশা করেন"
            answer={expectedLifePartner?.expected_characteristics}
          />
        </div>
        {generalInfo?.gender === 'মহিলা' ||
        generalInfo?.bio_type === 'পাত্রীর বায়োডাটা' ? (
          <>
            <GridQuestionAnswerCard
              question="ছাত্র বিয়ে করতে আগ্রহী?"
              answer={expectedLifePartner?.isStudent}
            />
            <GridQuestionAnswerCard
              question="মাসনা/সুলাসা/রুবায়ায় আগ্রহী?"
              answer={expectedLifePartner?.isMasna}
            />
            <GridQuestionAnswerCard
              question="কমপক্ষে কত মাসিক ইনকাম চান (ইংরেজীতে শুধু সংখ্যা লিখুন)?"
              answer={expectedLifePartner?.min_expected_income}
            />
          </>
        ) : (
          <>
            {/* Uncomment if needed */}
            {/* <GridQuestionAnswerCard
      question="তালাক-প্রাপ্তা বিয়ে করতে আগ্রহী?"
      answer={expectedLifePartner?.isDivorced_Widow === true ? "জি" : "না"}
    /> */}
          </>
        )}

        {/* <GridQuestionAnswerCard
          question="সন্তানসহ বিয়ে করতে আগ্রহী?"
          answer={expectedLifePartner?.isChild === true ? 'জি' : 'না'}
        />
        */}
      </div>
    </div>
  );
};

export default ExpectedPartner;
