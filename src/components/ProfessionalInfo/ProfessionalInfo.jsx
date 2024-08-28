import { useContext } from 'react';
import BioContext from '../../contexts/BioContext';
import GridQuestionAnswerCard from '../GridQuestionAnswerCard/GridQuestionAnswerCard';

const ProfessionalInfo = () => {
  const { bio } = useContext(BioContext);
  const occupation = bio?.occupation || null;
  return (
    <div className="single-bio-ocupational-info rounded shadow">
      <h5 className="card-title text-center text-2xl my-3">পেশাগত তথ্য</h5>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-0 my-3">
        <GridQuestionAnswerCard
          question="পেশা"
          answer={
            Array.isArray(occupation?.occupation)
              ? occupation?.occupation?.join(', ')
              : occupation?.occupation
          }
        />
        <GridQuestionAnswerCard
          question="পেশার বিস্তারিত বিবরণ"
          answer={occupation?.occupation_details}
        />
        <GridQuestionAnswerCard
          question="মাসিক আয়"
          answer={occupation?.monthly_income}
        />
      </div>
    </div>
  );
};

export default ProfessionalInfo;
