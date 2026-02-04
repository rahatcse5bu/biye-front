import { useContext } from 'react';
import BioContext from '../../contexts/BioContext';
import GridQuestionAnswerCard from '../GridQuestionAnswerCard/GridQuestionAnswerCard';

const FamilyInfo = () => {
  const { bio } = useContext(BioContext);
  const familyStatus = bio?.familyStatus || null;
  const generalInfo = bio?.generalInfo || null;
  const religion = generalInfo?.religion || 'islam';
  
  console.log('family-info~', familyStatus);
  return (
    <div className="w-auto border-t-2 rounded shadow single-bio-family-info">
      <h5 className="my-3 text-2xl text-center card-title">পারিবারিক তথ্য</h5>
      <table className="w-full table-auto">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-0 my-3">
          <GridQuestionAnswerCard
            question="আপনার পিতা কি জীবিত?"
            answer={familyStatus?.isFatherAlive}
          />
          <GridQuestionAnswerCard
            question="পিতার পেশার বিবরণ"
            answer={familyStatus?.father_occupation}
          />

          <GridQuestionAnswerCard
            question="আপনার মাতা কি জীবিত?"
            answer={familyStatus?.isMotherAlive}
          />

          <GridQuestionAnswerCard
            question="মাতার পেশার বিবরণ"
            answer={familyStatus?.mother_occupation}
          />

          <GridQuestionAnswerCard
            question="আপনার কতজন ভাই আছে?"
            answer={familyStatus?.number_of_brothers}
          />

          <GridQuestionAnswerCard
            question="ভাইদের তথ্য"
            answer={familyStatus?.brother_info}
          />

          <GridQuestionAnswerCard
            question="আপনার কতজন বোন আছে?"
            answer={familyStatus?.number_of_sisters}
          />

          <GridQuestionAnswerCard
            question="বোনদের তথ্য"
            answer={familyStatus?.sister_info}
          />

          <GridQuestionAnswerCard
            question="চাচা মামাদের পেশা"
            answer={familyStatus?.uncle_info}
          />

          <GridQuestionAnswerCard
            question="পারিবারিক অর্থনৈতিক অবস্থা"
            answer={familyStatus?.eco_condition_type}
          />

          <GridQuestionAnswerCard
            question="অর্থনৈতিক অবস্থার বর্ণনা"
            answer={familyStatus?.family_eco_condition}
          />

          {religion === 'islam' && (
            <GridQuestionAnswerCard
              question="পারিবারিক দ্বীনি পরিবেশ কেমন?"
              answer={familyStatus?.family_deeni_info}
            />
          )}
        </div>
      </table>
    </div>
  );
};

export default FamilyInfo;
