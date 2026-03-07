import BioContext from '../../contexts/BioContext';
import { useContext } from 'react';
import { convertToBengaliDigits } from '../../utils/language';
import { convertToFeetAndInches } from '../../utils/height';
import GridQuestionAnswerCard from '../GridQuestionAnswerCard/GridQuestionAnswerCard';

const ExpectedPartner = () => {
  const { bio } = useContext(BioContext);
  const expectedLifePartner = bio?.expectedLifePartner || null;
  const generalInfo = bio?.generalInfo || null;
  const personalInfo = bio?.personalInfo || null;
  const religion = generalInfo?.religion?.toLowerCase() || 'islam';

  return (
    <div className="w-auto border-t-2 rounded shadow single-bio-expected-lifepartner-info">
      <h5 className="my-3 text-2xl text-center card-title">
        প্রত্যাশিত জীবনসঙ্গী
      </h5>
      <div className="grid grid-cols-1 gap-0 my-3">
        <GridQuestionAnswerCard
          question="বয়স"
          answer={`${convertToBengaliDigits(expectedLifePartner?.age?.min)} বছর থেকে ${convertToBengaliDigits(expectedLifePartner?.age?.max)} বছর পর্যন্ত`}
        />
        <GridQuestionAnswerCard
          question="গাত্রবর্ণ"
          answer={expectedLifePartner?.color?.join(', ')}
        />
        <GridQuestionAnswerCard
          question="উচ্চতা"
          answer={`${convertToFeetAndInches(expectedLifePartner?.height?.min?.toFixed(2))} থেকে ${convertToFeetAndInches(expectedLifePartner?.height?.max?.toFixed(2))} পর্যন্ত`}
        />
        <GridQuestionAnswerCard
          question="শিক্ষাগত যোগ্যতা"
          answer={expectedLifePartner?.educational_qualifications?.join(', ')}
        />
        <GridQuestionAnswerCard
          question="জেলা"
          answer={expectedLifePartner?.zilla?.join(', ')}
        />
        <GridQuestionAnswerCard
          question="বৈবাহিক অবস্থা"
          answer={expectedLifePartner?.marital_status?.join(', ')}
        />
        <GridQuestionAnswerCard
          question="পেশা"
          answer={expectedLifePartner?.occupation?.join(', ')}
        />
        <GridQuestionAnswerCard
          question="অর্থনৈতিক অবস্থা"
          answer={expectedLifePartner?.economical_condition?.join(', ')}
        />
        <GridQuestionAnswerCard
          question="জীবনসঙ্গীর যেসব বৈশিষ্ট্য বা গুণাবলী প্রত্যাশা করেন"
          answer={expectedLifePartner?.expected_characteristics}
        />

        {/* Common fields for all religions */}
        {expectedLifePartner?.partner_own_home_type?.length > 0 && (
          <GridQuestionAnswerCard
            question="জীবনসঙ্গীর নিজস্ব বাড়ির ধরণ"
            answer={expectedLifePartner?.partner_own_home_type?.join(', ')}
          />
        )}
        {expectedLifePartner?.partner_father_profession?.length > 0 && (
          <GridQuestionAnswerCard
            question="জীবনসঙ্গীর বাবার পেশা"
            answer={expectedLifePartner?.partner_father_profession?.join(', ')}
          />
        )}
        {expectedLifePartner?.partner_home_type?.length > 0 && (
          <GridQuestionAnswerCard
            question="জীবনসঙ্গীর বাড়ির ধরণ"
            answer={expectedLifePartner?.partner_home_type?.join(', ')}
          />
        )}
        {expectedLifePartner?.flexibility_areas?.length > 0 && (
          <GridQuestionAnswerCard
            question="কোন বিষয়ে ছাড় দিতে চান"
            answer={expectedLifePartner?.flexibility_areas?.join(', ')}
          />
        )}
        {expectedLifePartner?.min_ssc_result?.length > 0 && (
          <GridQuestionAnswerCard
            question="SSC/সমমান এ সর্বনিম্ন ফলাফল"
            answer={expectedLifePartner?.min_ssc_result?.join(', ')}
          />
        )}
        {expectedLifePartner?.min_hsc_result?.length > 0 && (
          <GridQuestionAnswerCard
            question="HSC/সমমান এ সর্বনিম্ন ফলাফল"
            answer={expectedLifePartner?.min_hsc_result?.join(', ')}
          />
        )}

        {/* Hindu-specific partner expectations */}
        {religion === 'hinduism' && (
          <>
            {(expectedLifePartner?.partner_caste_preference?.length > 0 ||
              personalInfo?.caste) && (
              <GridQuestionAnswerCard
                question="প্রত্যাশিত বর্ণ/জাতি"
                answer={
                  expectedLifePartner?.partner_caste_preference?.join(', ') ||
                  personalInfo?.caste
                }
              />
            )}
            {(expectedLifePartner?.partner_sub_caste_preference?.length > 0 ||
              personalInfo?.sub_caste) && (
              <GridQuestionAnswerCard
                question="প্রত্যাশিত উপ-জাতি"
                answer={
                  expectedLifePartner?.partner_sub_caste_preference?.join(
                    ', '
                  ) || personalInfo?.sub_caste
                }
              />
            )}
            {(expectedLifePartner?.partner_gotra_preference ||
              personalInfo?.gotra) && (
              <GridQuestionAnswerCard
                question="প্রত্যাশিত গোত্র"
                answer={
                  expectedLifePartner?.partner_gotra_preference ||
                  'যেকোনো (নিজের গোত্র বাদে)'
                }
              />
            )}
            {(expectedLifePartner?.partner_sampraday_preference?.length > 0 ||
              personalInfo?.sampraday) && (
              <GridQuestionAnswerCard
                question="প্রত্যাশিত সম্প্রদায়"
                answer={
                  expectedLifePartner?.partner_sampraday_preference?.join(
                    ', '
                  ) || personalInfo?.sampraday
                }
              />
            )}
            {(expectedLifePartner?.partner_mangalik_preference ||
              personalInfo?.mangalik_status) && (
              <GridQuestionAnswerCard
                question="মাঙ্গলিক অবস্থা প্রত্যাশা"
                answer={
                  expectedLifePartner?.partner_mangalik_preference || 'যেকোনো'
                }
              />
            )}
            {personalInfo?.partner_religious_expectation && (
              <GridQuestionAnswerCard
                question="সঙ্গীর কাছে ধর্মীয় প্রত্যাশা"
                answer={personalInfo?.partner_religious_expectation}
              />
            )}
            {personalInfo?.religious_flexibility && (
              <GridQuestionAnswerCard
                question="ধর্মীয় বিষয়ে নমনীয়তা"
                answer={personalInfo?.religious_flexibility}
              />
            )}
          </>
        )}

        {/* Christian-specific partner expectations */}
        {religion === 'christianity' && (
          <>
            {(expectedLifePartner?.partner_denomination_preference?.length >
              0 ||
              personalInfo?.denomination) && (
              <GridQuestionAnswerCard
                question="প্রত্যাশিত মণ্ডলী/গির্জার ধরন"
                answer={
                  expectedLifePartner?.partner_denomination_preference?.join(
                    ', '
                  ) || personalInfo?.denomination
                }
              />
            )}
            {expectedLifePartner?.partner_church_attendance_preference && (
              <GridQuestionAnswerCard
                question="গির্জায় যাওয়ার প্রত্যাশা"
                answer={
                  expectedLifePartner?.partner_church_attendance_preference
                }
              />
            )}
            {personalInfo?.christian_partner_preference && (
              <GridQuestionAnswerCard
                question="খ্রিস্টান জীবনসঙ্গী কাম্য"
                answer={personalInfo?.christian_partner_preference}
              />
            )}
            {personalInfo?.partner_religious_expectation && (
              <GridQuestionAnswerCard
                question="সঙ্গীর কাছে ধর্মীয় প্রত্যাশা"
                answer={personalInfo?.partner_religious_expectation}
              />
            )}
            {personalInfo?.expects_partner_cooperation && (
              <GridQuestionAnswerCard
                question="ধর্মীয় কাজে সঙ্গীর সহযোগিতা প্রত্যাশা"
                answer={personalInfo?.expects_partner_cooperation}
              />
            )}
          </>
        )}

        {/* Islam-specific fields */}
        {(religion === 'islam' || !religion) &&
          (generalInfo?.gender === 'মহিলা' ||
            generalInfo?.bio_type === 'পাত্রীর বায়োডাটা') && (
            <>
              <GridQuestionAnswerCard
                question="ছাত্র বিয়ে করতে আগ্রহী?"
                answer={expectedLifePartner?.isStudent}
              />
              <GridQuestionAnswerCard
                question="মাসনা/সুলাসা/রুবায়ায় আগ্রহী?"
                answer={expectedLifePartner?.isMasna}
              />
              <GridQuestionAnswerCard
                question="কমপক্ষে কত মাসিক ইনকাম চান?"
                answer={expectedLifePartner?.min_expected_income}
              />
            </>
          )}
      </div>
    </div>
  );
};

export default ExpectedPartner;
