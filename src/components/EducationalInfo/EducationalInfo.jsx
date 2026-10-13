import { useContext } from 'react';
import BioContext from '../../contexts/BioContext';
import GridQuestionAnswerCard from '../GridQuestionAnswerCard/GridQuestionAnswerCard';
import { educationOptions } from '../EducationalQualificationForm/educationQualification.constant';

// TODO: stored values stay short (e.g. "এস.এস.সি"); show the labelled form ("... সম্পন্ন" / "... চলমান").
const levelLabel = (value) => educationOptions.find((o) => o.value === value)?.label || value;

// TODO: fields added with the running/professional levels, shown only when filled in.
const EXTRA_ROWS = [
  ['ssc_exam_year', 'এস.এস.সি / দাখিল পরীক্ষার সম্ভাব্য সন'],
  ['msc_running_year', 'স্নাতকোত্তর / কামিল: কোন বর্ষে পড়ছেন'],
  ['phd_running_year', 'পিএইচডি: কোন বর্ষে পড়ছেন'],
  ['bed_inst', 'বিএড শিক্ষাপ্রতিষ্ঠান'],
  ['bed_running_year', 'বিএড: কোন বর্ষে পড়ছেন'],
  ['bed_pass_year', 'বিএড পাসের সন'],
  ['med_inst', 'এমএড শিক্ষাপ্রতিষ্ঠান'],
  ['med_running_year', 'এমএড: কোন বর্ষে পড়ছেন'],
  ['med_pass_year', 'এমএড পাসের সন'],
  ['mphil_sub', 'এমফিল বিষয়'],
  ['mphil_inst', 'এমফিল শিক্ষাপ্রতিষ্ঠান'],
  ['mphil_running_year', 'এমফিল: কোন বর্ষে পড়ছেন'],
  ['mphil_pass_year', 'এমফিল পাসের সন'],
  ['postdoc_sub', 'পোস্ট ডক গবেষণার বিষয়'],
  ['postdoc_inst', 'পোস্ট ডক প্রতিষ্ঠান'],
  ['postdoc_running_year', 'পোস্ট ডক: কোন বর্ষে চলছে'],
  ['postdoc_pass_year', 'পোস্ট ডক সম্পন্নের সন'],
];

function EducationInfo() {
  const { bio } = useContext(BioContext);
  const educationInfo = bio?.educationQualification || null;
  const generalInfo = bio?.generalInfo || null;
  const religion = generalInfo?.religion || 'islam';

  return (
    <div className="w-auto border-t-2 rounded shadow single-bio-educational-qualification">
      <h5 className="my-3 text-2xl text-center card-title">শিক্ষাগত যোগ্যতা</h5>

      <div className="grid grid-cols-1 gap-0 my-3">
        <GridQuestionAnswerCard
          question="আপনার শিক্ষা মাধ্যম"
          answer={educationInfo?.education_medium}
        />
        {educationInfo?.highest_edu_level && (
          <GridQuestionAnswerCard
            question="সর্বোচ্চ শিক্ষাগত যোগ্যতা"
            answer={levelLabel(educationInfo?.highest_edu_level)}
          />
        )}

        {educationInfo?.ssc_inst && (
          <GridQuestionAnswerCard question="স্কুল / মাদ্রাসার নাম" answer={educationInfo.ssc_inst} />
        )}
        {educationInfo?.after_ssc_inst && (
          <GridQuestionAnswerCard question="কলেজ / মাদ্রাসার নাম" answer={educationInfo.after_ssc_inst} />
        )}
        {educationInfo?.before_ssc && (
          <GridQuestionAnswerCard
            question="আপনি কোন ক্লাস পর্যন্ত পড়াশুনা করেছেন?"
            answer={educationInfo?.before_ssc}
          />
        )}

        {educationInfo?.ibti_inst && (
          <GridQuestionAnswerCard
            question="ইবতিদাইয়্যাহ কোন মাদ্রাসা থেকে পড়েছেন?"
            answer={educationInfo?.ibti_inst}
          />
        )}

        {educationInfo?.ibti_result && (
          <GridQuestionAnswerCard
            question="ফলাফল"
            answer={educationInfo?.ibti_result}
          />
        )}

        {educationInfo?.ibti_pass_year && (
          <GridQuestionAnswerCard
            question="পাসের সন"
            answer={educationInfo?.ibti_pass_year}
          />
        )}

        {educationInfo?.mutawas_inst && (
          <GridQuestionAnswerCard
            question="মুতাওয়াসসিতাহ কোন মাদ্রাসা থেকে পড়েছেন?"
            answer={educationInfo?.mutawas_inst}
          />
        )}

        {educationInfo?.mutawas_result && (
          <GridQuestionAnswerCard
            question="ফলাফল"
            answer={educationInfo?.mutawas_result}
          />
        )}

        {educationInfo?.mutawas_pass_year && (
          <GridQuestionAnswerCard
            question="পাসের সন"
            answer={educationInfo?.mutawas_pass_year}
          />
        )}

        {educationInfo?.sanabiya_inst && (
          <GridQuestionAnswerCard
            question="সানাবিয়া উলইয়া কোন মাদ্রাসা থেকে পড়েছেন?"
            answer={educationInfo?.sanabiya_inst}
          />
        )}

        {educationInfo?.sanabiya_result && (
          <GridQuestionAnswerCard
            question="ফলাফল"
            answer={educationInfo?.sanabiya_result}
          />
        )}

        {educationInfo?.sanabiya_pass_year && (
          <GridQuestionAnswerCard
            question="পাসের সন"
            answer={educationInfo?.sanabiya_pass_year}
          />
        )}

        {educationInfo?.fozilat_inst && (
          <GridQuestionAnswerCard
            question="ফযীলত কোন মাদ্রাসা থেকে পড়েছেন?"
            answer={educationInfo?.fozilat_inst}
          />
        )}

        {educationInfo?.fozilat_result && (
          <GridQuestionAnswerCard
            question="ফলাফল"
            answer={educationInfo?.fozilat_result}
          />
        )}

        {educationInfo?.fozilat_pass_year && (
          <GridQuestionAnswerCard
            question="পাসের সন"
            answer={educationInfo?.fozilat_pass_year}
          />
        )}

        {educationInfo?.takmil_inst && (
          <GridQuestionAnswerCard
            question="তাকমীল কোন মাদ্রাসা থেকে পড়েছেন?"
            answer={educationInfo?.takmil_inst}
          />
        )}

        {educationInfo?.takmil_result && (
          <GridQuestionAnswerCard
            question="ফলাফল"
            answer={educationInfo?.takmil_result}
          />
        )}

        {educationInfo?.takmil_pass_year && (
          <GridQuestionAnswerCard
            question="পাসের সন"
            answer={educationInfo?.takmil_pass_year}
          />
        )}

        {educationInfo?.takhassus_inst && (
          <GridQuestionAnswerCard
            question="তাখাসসুস কোন মাদ্রাসা থেকে পড়েছেন?"
            answer={educationInfo?.takhassus_inst}
          />
        )}

        {educationInfo?.takhassus_sub && (
          <GridQuestionAnswerCard
            question="তাখাসসুসের বিষয়"
            answer={educationInfo?.takhassus_sub}
          />
        )}

        {educationInfo?.takhassus_result && (
          <GridQuestionAnswerCard
            question="ফলাফল"
            answer={educationInfo?.takhassus_result}
          />
        )}

        {educationInfo?.takhassus_pass_year && (
          <GridQuestionAnswerCard
            question="পাসের সন"
            answer={educationInfo?.takhassus_pass_year}
          />
        )}

        {educationInfo?.ssc_year && (
          <GridQuestionAnswerCard
            question="এস.এস.সি / দাখিল / সমমান পাসের সন"
            answer={educationInfo?.ssc_year}
          />
        )}

        {educationInfo?.ssc_group && (
          <GridQuestionAnswerCard
            question="বিভাগ"
            answer={educationInfo?.ssc_group}
          />
        )}

        {educationInfo?.ssc_result && (
          <GridQuestionAnswerCard
            question="ফলাফল"
            answer={Number.isFinite(Number(educationInfo.ssc_result)) ? `GPA ${Number(educationInfo.ssc_result).toFixed(2)}` : educationInfo.ssc_result}
          />
        )}

        {educationInfo?.diploma_sub && (
          <GridQuestionAnswerCard
            question="ডিপ্লোমা কোন বিষয়ে পড়েছেন?"
            answer={educationInfo?.diploma_sub}
          />
        )}

        {educationInfo?.diploma_inst && (
          <GridQuestionAnswerCard
            question="শিক্ষাপ্রতিষ্ঠানের নাম"
            answer={educationInfo?.diploma_inst}
          />
        )}

        {educationInfo?.diploma_running_year && (
          <GridQuestionAnswerCard
            question="এখন কোন বর্ষে পড়ছেন?"
            answer={educationInfo?.diploma_running_year}
          />
        )}

        {educationInfo?.diploma_pass_year && (
          <GridQuestionAnswerCard
            question="পাসের বছর"
            answer={educationInfo?.diploma_pass_year}
          />
        )}

        {educationInfo?.after_ssc_year && (
          <GridQuestionAnswerCard
            question="এইচ.এস.সি / আলিম / সমমান পাসের সন"
            answer={educationInfo?.after_ssc_year}
          />
        )}

        {educationInfo?.after_ssc_status !== undefined && educationInfo?.after_ssc_status !== null && (
          <GridQuestionAnswerCard
            question="এইচ.এস.সি / আলিম অবস্থা"
            answer={educationInfo?.after_ssc_status ? 'চলমান' : 'সম্পন্ন'}
          />
        )}

        {educationInfo?.after_ssc_group && (
          <GridQuestionAnswerCard
            question="বিভাগ"
            answer={educationInfo?.after_ssc_group}
          />
        )}

        {educationInfo?.after_ssc_result && (
          <GridQuestionAnswerCard
            question="ফলাফল"
            answer={Number.isFinite(Number(educationInfo.after_ssc_result)) ? `GPA ${Number(educationInfo.after_ssc_result).toFixed(2)}` : educationInfo.after_ssc_result}
          />
        )}

        {educationInfo?.hons_sub && (
          <GridQuestionAnswerCard
            question="স্নাতক / স্নাতক (সম্মান) / ফাজিল পড়াশোনার বিষয়"
            answer={educationInfo?.hons_sub}
          />
        )}

        {educationInfo?.hons_inst && (
          <GridQuestionAnswerCard
            question="শিক্ষাপ্রতিষ্ঠানের নাম"
            answer={educationInfo?.hons_inst}
          />
        )}

        {educationInfo?.hons_pass_year && (
          <GridQuestionAnswerCard
            question="পাসের সন"
            answer={educationInfo?.hons_pass_year}
          />
        )}

        {educationInfo?.hons_year && (
          <GridQuestionAnswerCard
            question="কোন বর্ষে পড়ছেন?"
            answer={educationInfo?.hons_year}
          />
        )}

        {educationInfo?.msc_sub && (
          <GridQuestionAnswerCard
            question="স্নাতকোত্তর / কামিল পড়াশোনার বিষয়"
            answer={educationInfo?.msc_sub}
          />
        )}

        {educationInfo?.msc_inst && (
          <GridQuestionAnswerCard
            question="শিক্ষাপ্রতিষ্ঠানের নাম"
            answer={educationInfo?.msc_inst}
          />
        )}

        {educationInfo?.msc_pass_year && (
          <GridQuestionAnswerCard
            question="পাসের সন"
            answer={educationInfo?.msc_pass_year}
          />
        )}

        {educationInfo?.phd_sub && (
          <GridQuestionAnswerCard
            question="ডক্টরেট অধ্যয়নের বিষয়"
            answer={educationInfo?.phd_sub}
          />
        )}

        {educationInfo?.phd_inst && (
          <GridQuestionAnswerCard
            question="শিক্ষাপ্রতিষ্ঠানের নাম"
            answer={educationInfo?.phd_inst}
          />
        )}

        {educationInfo?.phd_pass_year && (
          <GridQuestionAnswerCard
            question="পাসের সন"
            answer={educationInfo?.phd_pass_year}
          />
        )}
        {EXTRA_ROWS.filter(([key]) => educationInfo?.[key]).map(([key, question]) => (
          <GridQuestionAnswerCard key={key} question={question} answer={educationInfo[key]} />
        ))}

        {educationInfo?.others_edu && (
          <GridQuestionAnswerCard
            question="অন্যান্য শিক্ষাগত যোগ্যতা"
            answer={educationInfo?.others_edu}
          />
        )}

        {/* Islamic-specific question - only for Muslims */}
        {religion === 'islam' && generalInfo?.religious_type !== 'general_muslim' && educationInfo?.deeni_edu && (
          <GridQuestionAnswerCard
            question="কোনো দ্বীনি শিক্ষাগত যোগ্যতা"
            answer={
              Array.isArray(educationInfo?.deeni_edu)
                ? educationInfo?.deeni_edu.join(', ')
                : educationInfo?.deeni_edu
            }
          />
        )}

        {educationInfo?.edu_details && (
          <GridQuestionAnswerCard
            question="শিক্ষা সম্পর্কিত বিস্তারিত"
            answer={educationInfo?.edu_details}
          />
        )}
      </div>
    </div>
  );
}

export default EducationInfo;
