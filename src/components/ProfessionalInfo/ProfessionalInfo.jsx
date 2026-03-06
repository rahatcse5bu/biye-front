import { useContext } from 'react';
import BioContext from '../../contexts/BioContext';
import GridQuestionAnswerCard from '../GridQuestionAnswerCard/GridQuestionAnswerCard';
import { Colors } from '../../constants/colors';

// Bengali month names
const bengaliMonths = {
  '01': 'জানুয়ারি',
  '02': 'ফেব্রুয়ারি',
  '03': 'মার্চ',
  '04': 'এপ্রিল',
  '05': 'মে',
  '06': 'জুন',
  '07': 'জুলাই',
  '08': 'আগস্ট',
  '09': 'সেপ্টেম্বর',
  '10': 'অক্টোবর',
  '11': 'নভেম্বর',
  '12': 'ডিসেম্বর',
};

// Convert to Bengali digits
const toBengaliDigits = (num) => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (d) => bengaliDigits[parseInt(d)]);
};

// Format date like "2025-11" to "নভেম্বর ২০২৫"
const formatDateBengali = (dateStr) => {
  if (!dateStr) return null;
  const [year, month] = dateStr.split('-');
  const monthName = bengaliMonths[month] || month;
  const bengaliYear = toBengaliDigits(year);
  return `${monthName} ${bengaliYear}`;
};

const ProfessionalInfo = () => {
  const { bio } = useContext(BioContext);
  const occupation = bio?.occupation || null;
  const workingHistory = occupation?.working_history || [];

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
          question="মাসিক আয়"
          answer={occupation?.monthly_income}
        />
      </div>

      {/* Working History Section - Grid Style matching other fields */}
      {workingHistory.length > 0 && (
        <div className="mt-2">
          <div 
            className="px-4 py-3 text-center text-white font-semibold"
            style={{ backgroundColor: Colors.primary900 }}
          >
            কর্মসংস্থান ইতিহাস
          </div>
          
          {workingHistory.map((history, index) => (
            <div key={index} className="grid md:grid-cols-2 grid-cols-1 gap-0">
              <GridQuestionAnswerCard
                question="প্রতিষ্ঠান"
                answer={
                  <div className="flex items-center gap-2">
                    <span>{history.company_name}</span>
                    {history.is_current && (
                      <span 
                        className="px-2 py-0.5 text-xs text-white rounded-full"
                        style={{ backgroundColor: Colors.primary900 }}
                      >
                        বর্তমান
                      </span>
                    )}
                  </div>
                }
              />
              <GridQuestionAnswerCard
                question="পদবি"
                answer={history.designation}
              />
              <GridQuestionAnswerCard
                question="সময়কাল"
                answer={`${formatDateBengali(history.start_date) || 'N/A'} - ${history.is_current ? 'বর্তমান' : (formatDateBengali(history.end_date) || 'N/A')}`}
              />
              {history.job_description && (
                <GridQuestionAnswerCard
                  question="কাজের বিবরণ"
                  answer={history.job_description}
                />
              )}
              {index < workingHistory.length - 1 && (
                <div className="md:col-span-2 border-b-2 border-gray-300 my-1"></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfessionalInfo;
