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
import { HiPaperAirplane, HiInformationCircle, HiCheckCircle } from 'react-icons/hi2';

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
    const fetchQuestions = async () => {
      try {
        setFetchingQuestions(true);
        const data = await BioQuestionServices.getQuestionsByUser(bio_user);
        if (data?.data?.questions) {
          setQuestions(data.data.questions);
          setIsCustomQuestions(data.data.isCustom === true);
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
      }, 3000);
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

    let text = '';
    questions.forEach((question, index) => {
      const answer = answers[`question_${index}`] || '';
      text += `===question_${index}==${question}===answer_${index}==${answer}`;
    });

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
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingCircle />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/50 to-white py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header Card */}
        <div
          className="rounded-2xl p-6 mb-6 text-white shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${Colors.primary900}, ${Colors.primary700})`,
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <HiPaperAirplane className="text-2xl" />
            </div>
            <h2 className="text-2xl font-bold">অনুরোধ পাঠান</h2>
          </div>
          <p className="text-white/85 text-sm leading-relaxed">
            নিচের ফর্ম পূরণ করে আপনার অনুরোধ পাঠান। আপনার তথ্য পাত্র/পাত্রীর
            সাথে শেয়ার করা হবে।
          </p>
        </div>

        {/* Info Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex gap-3">
          <HiInformationCircle className="text-amber-500 text-xl flex-shrink-0 mt-0.5" />
          <p className="text-amber-800 text-sm leading-relaxed">
            পজিটিভ ফিডব্যাক পেলে আপনি ড্যাশবোর্ড থেকে বাকি পেমেন্ট করে
            অভিভাবকের যোগাযোগ তথ্য পাবেন, ইন শা আল্লাহ্‌। ফিডব্যাক এসএমএস ও
            ড্যাশবোর্ডে দেখা যাবে।
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            {/* Questions Section */}
            {questions.length > 0 ? (
              <div className="space-y-5">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <span
                    className="w-1.5 h-6 rounded-full"
                    style={{ backgroundColor: Colors.primary900 }}
                  />
                  প্রশ্নগুলোর উত্তর দিন
                </h3>
                {questions.map((question, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <span
                        className="inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs mr-2"
                        style={{ backgroundColor: Colors.primary900 }}
                      >
                        {index + 1}
                      </span>
                      {question}
                    </label>
                    <textarea
                      rows="3"
                      required
                      value={answers[`question_${index}`] || ''}
                      onChange={(e) =>
                        handleAnswerChange(index, e.target.value)
                      }
                      className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all resize-none"
                      placeholder="আপনার উত্তর লিখুন..."
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-400">
                <p>এই বায়োডাটার জন্য কোন প্রশ্ন সেট করা হয়নি।</p>
              </div>
            )}

            {/* Bio Section */}
            {!isCustomQuestions && (
              <>
                <div className="border-t border-gray-100 my-6" />

                <label className="flex items-center gap-3 cursor-pointer select-none mb-5 group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={isHasBio}
                      onChange={handleHasBio}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:border-teal-600 peer-checked:bg-teal-600 transition-all flex items-center justify-center">
                      {isHasBio && (
                        <HiCheckCircle className="text-white text-sm" />
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                    ইতিমধ্যে আপনার বায়োডাটা লিঙ্ক রেডি আছে?
                  </span>
                </label>

                {!isHasBio ? (
                  <SendMyBio formData={formData} setFormData={setFormData} />
                ) : (
                  <Textarea
                    value={bioInput}
                    setValue={setBioInput}
                    required={true}
                    title="আপনার নিজের বায়োডাটা লিখুন অথবা বায়োডাটার লিঙ্ক শেয়ার করুন"
                  />
                )}
              </>
            )}

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-white font-semibold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md flex items-center justify-center gap-2"
                style={{
                  background: `linear-gradient(135deg, ${Colors.primary900}, ${Colors.primary600})`,
                }}
              >
                {loading ? (
                  <LoadingCircle />
                ) : (
                  <>
                    <HiPaperAirplane className="text-lg" />
                    আমার অনুরোধ পাঠান
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SendForm;
