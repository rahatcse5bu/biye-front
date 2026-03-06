import { useContext } from 'react';
import BioContext from '../../contexts/BioContext';
import GridQuestionAnswerCard from '../GridQuestionAnswerCard/GridQuestionAnswerCard';

const MaritalInfo = () => {
  const { bio } = useContext(BioContext);
  const maritalInfo = bio?.maritalInfo || null;
  const generalInfo = bio?.generalInfo || null;
  const religion = generalInfo?.religion || 'islam';
  const isFemale = generalInfo?.gender === 'মহিলা' || generalInfo?.bio_type === 'পাত্রীর বায়োডাটা';

  return (
    <div className="single-bio-marital-info border-t-2 w-auto rounded shadow">
      <h5 className="card-title text-center text-2xl my-3">
        বিবাহ সম্পর্কিত তথ্য
      </h5>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-0 my-3">
        <>
          <GridQuestionAnswerCard
            question="অভিভাবক আপনার বিয়েতে রাজি কি না?"
            answer={maritalInfo?.isFamilyAgree}
          />
          {generalInfo?.gender === 'মহিলা' ||
          generalInfo?.bio_type === 'পাত্রীর বায়োডাটা' ? (
            <>
              <GridQuestionAnswerCard
                question="আপনি কি বিয়ের পর চাকরি করতে ইচ্ছুক?"
                answer={maritalInfo?.after_marriage_running_job}
              />
              <GridQuestionAnswerCard
                question="বিয়ের পর পড়াশোনা চালিয়ে যেতে চান?"
                answer={maritalInfo?.is_running_study}
              />
              <GridQuestionAnswerCard
                question="বিয়ের পর চাকরি চালিয়ে যেতে চান?"
                answer={maritalInfo?.is_running_job}
              />
              {/* Uncomment and modify these as needed */}
              {/* <GridQuestionAnswerCard
        question="তালাক হয়ে থাকলে কারণ উল্লেখ করুন"
        answer={maritalInfo?.devorced_reason === true ? " জি " : "না আলহামদুলিল্লাহ"}
      /> */}
              {/* <GridQuestionAnswerCard
        question="তালাক হয়ে থাকলে এবং সন্তান থাকলে সন্তান সম্পর্কে বিস্তারিত উল্লেখ করুন"
        answer={maritalInfo?.children_details}
      /> */}
            </>
          ) : (
            <>
              {/* Islamic-specific question - only for Muslim males */}
              {religion === 'islam' && (
                <GridQuestionAnswerCard
                  question="বিয়ের পর স্ত্রীকে পর্দায় রাখতে পারবেন?"
                  answer={maritalInfo?.isPordaToWife}
                />
              )}
              <GridQuestionAnswerCard
                question="আপনি কি বিয়ের পর বউকে চাকরি করতে দিতে ইচ্ছুক?"
                answer={maritalInfo?.permission_for_job}
              />
              <GridQuestionAnswerCard
                question="বিয়ের পর স্ত্রীকে পড়াশোনা চালিয়ে যেতে দিতে চান?"
                answer={maritalInfo?.permission_for_study}
              />
              <GridQuestionAnswerCard
                question="আপনি বা আপনার পরিবার পাত্রীপক্ষের কাছে কোনো উপহার আশা করবেন কি না?"
                answer={maritalInfo?.isJoutuk}
              />
              <GridQuestionAnswerCard
                question="বিয়ের পর স্ত্রীকে কোথায় নিয়ে থাকবেন?"
                answer={maritalInfo?.after_marriage_where}
              />
            </>
          )}

          <GridQuestionAnswerCard
            question="কেন বিয়ে করছেন? বিয়ে সম্পর্কে আপনার ধারণা কি?"
            answer={maritalInfo?.why_marriage}
          />
        </>
      </div>
    </div>
  );
};

export default MaritalInfo;
