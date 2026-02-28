import { useEffect, useState } from 'react';
import { Colors } from '../../constants/colors';
import Textarea from '../../components/Textarea/Textarea';
import { BioChoiceDataServices } from '../../services/bioChoiceData';
import { BioQuestionServices } from '../../services/bioQuestions';
import { getToken } from '../../utils/cookies';
import { useNavigate, useParams } from 'react-router-dom';
import { Toast } from '../../utils/toast';
import LoadingCircle from '../../components/LoadingCircle/LoadingCircle';
import SendMyBio from './SendMyBio';
function SendForm() {
  const { bio_user } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isCustomQuestions, setIsCustomQuestions] = useState(false);
  const [bioInput, setBioInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingQuestions, setFetchingQuestions] = useState(true);
  const [goTo, setGoto] = useState(false);
  const [isHasBio, setIsHasBio] = useState(false);
  // State to handle form inputs
  const [formData, setFormData] = useState({
    upzilla: '',
    zilla: '',
    maxEducation: '',
    institution: '',
    job: '',
    salary: '',
    fatherProfession: '',
    motherProfession: '',
    familyStatus: '',
    siblingsDetails: '',
    deeniCondition: '',
    economicalCondition: '',
    height: '',
    color: '',
    weight: '',
    jobPosition: '',
    maritalStatus: '',
    physicalMentalConditions: '',
    aboutMe: '',
  });

  useEffect(() => {
    // Fetch questions for this biodata owner
    const fetchQuestions = async () => {
      try {
        setFetchingQuestions(true);
        const data = await BioQuestionServices.getQuestionsByUser(bio_user);
        if (data?.data?.questions) {
          setQuestions(data.data.questions);
          setIsCustomQuestions(data.data.isCustom === true);
          // Initialize answers object
          const initialAnswers = {};
          data.data.questions.forEach((_, index) => {
            initialAnswers[`question_${index}`] = '';
          });
          setAnswers(initialAnswers);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
        Toast.errorToast('প্রশ্ন লোড করতে সমস্যা হয়েছে');
      } finally {
        setFetchingQuestions(false);
      }
    };

    if (bio_user) {
      fetchQuestions();
    }
  }, [bio_user]);

  useEffect(() => {
    if (goTo & !loading) {
      const timeout = setTimeout(() => {
        setGoto(false);
        navigate('/user/account/purchases');
      }, 3000); // 3 seconds timeout
      return () => clearTimeout(timeout);
    }
  }, [goTo, loading, navigate]);

  const handleAnswerChange = (index, value) => {
    setAnswers({
      ...answers,
      [`question_${index}`]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Build bio_details string with question-answer pairs
    let text = '';
    questions.forEach((question, index) => {
      const answer = answers[`question_${index}`] || '';
      text += `===question_${index}==${question}===answer_${index}==${answer}`;
    });

    // Only include SendMyBio / bio link data when using default questions
    if (!isCustomQuestions) {
      if (isHasBio) {
        text += `===bioInput==${bioInput}`;
      } else {
        text += `===upzilla==${formData.upzilla}`;
        text += `===zilla==${formData.zilla}`;
        text += `===maxEducation==${formData.maxEducation}`;
        text += `===institution==${formData.institution}`;
        text += `===job==${formData.job}`;
        text += `===salary==${formData.salary}`;
        text += `===fatherProfession==${formData.fatherProfession}`;
        text += `===motherProfession==${formData.motherProfession}`;
        text += `===familyStatus==${formData.familyStatus}`;
        text += `===siblingsDetails==${formData.siblingsDetails}`;
        text += `===deeniCondition==${formData.deeniCondition}`;
        text += `===economicalCondition==${formData.economicalCondition}`;
        text += `===height==${formData.height}`;
        text += `===color==${formData.color}`;
        text += `===weight==${formData.weight}`;
        text += `===jobPosition==${formData.jobPosition}`;
        text += `===maritalStatus==${formData.maritalStatus}`;
        text += `===physicalMentalConditions==${formData.physicalMentalConditions}`;
        text += `===aboutMe==${formData.aboutMe}`;
      }
    }

    const bioChoiceData = {
      bio_details: text,
      status: 'pending',
      bio_user: bio_user,
    };

    try {
      setLoading(true);
      const response = await BioChoiceDataServices.createBioChoiceData(
        bioChoiceData,
        getToken()?.token
      );
      if (response?.success) {
        Toast.successToast('আপনার বায়োডাটা পাঠানো হয়েছে');
        navigate('/user/account/purchases');
      }
      setGoto(true);
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message;
      Toast.errorToast(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleHasBio = () => {
    setIsHasBio(!isHasBio);
  };

  if (fetchingQuestions) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingCircle />
      </div>
    );
  }

  return (
    <div className="max-w-screen-md p-6 mx-auto bg-white rounded-lg shadow-md">
      <h2
        className="mb-4 text-2xl font-semibold"
        style={{ color: Colors.titleText }}
      >
        নিচের ফর্ম পুরন করে আপনার অনুরোধ পাঠান
      </h2>
      <h4 className="mb-4 text-sm font-semibold text-red-800">
        আপনি নিচে যে তথ্য দিবেন তা পাত্র/পাত্রীর সাথে শেয়ার করা হবে ইন শা
        আল্লাহ| আপনার বায়োডাটার ব্যাপারে সে ফিডব্যাক দিলে আপনাকে মোবাইলে এস এম
        এস করে জানিয়ে দেওয়া হবে এবং আপনি তা আপনার ড্যাশবোর্ড থেকে দেখতে পারবেন |
        সে পজেটিভ ফিডব্যাক দিলে বা পারমিশন দিলে আপনি ড্যাশবোর্ড থেকে বাকি
        পেমেন্ট করে অভিভাবক এর সাথে যোগাযোগ এর তথ্য চূড়ান্তভাবে পাবেন, ইন শা
        আল্লাহ্‌
      </h4>
      <form onSubmit={handleSubmit}>
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <Textarea
              key={index}
              value={answers[`question_${index}`] || ''}
              setValue={(value) => handleAnswerChange(index, value)}
              required={true}
              title={`প্রশ্ন ${index + 1}: ${question}`}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 mb-4">
            <p>এই বায়োডাটার জন্য কোন প্রশ্ন সেট করা হয়নি।</p>
          </div>
        )}
        
        {!isCustomQuestions && (
          <>
            <div
              className="mb-4 text-lg font-semibold"
              style={{ color: Colors.titleText }}
            >
              {' '}
              <input type="checkbox" onChange={handleHasBio} /> ইতিমধ্যে আপনার
              বায়োডাটা লিঙ্ক রেডি আছে?{' '}
            </div>
            {!isHasBio && (
              <SendMyBio formData={formData} setFormData={setFormData} />
            )}

            {isHasBio && (
              <Textarea
                value={bioInput}
                setValue={setBioInput}
                required={true}
                title="আপনার নিজের বায়োডাটা লিখুন অথবা বায়োডাটার লিঙ্ক শেয়ার করুন"
              />
            )}
          </>
        )}

        <div className="mb-4">
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white rounded hover:bg-blue-700"
            style={{
              background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight} )`,
            }}
          >
            {loading ? <LoadingCircle /> : 'আমার অনুরোধ পাঠান'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SendForm;
