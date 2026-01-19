import { useState, useEffect } from 'react';
import { Colors } from '../../constants/colors';
import { BioQuestionServices } from '../../services/bioQuestions';
import { getToken } from '../../utils/cookies';
import { Toast } from '../../utils/toast';
import { FaPlus, FaTrash, FaSave } from 'react-icons/fa';
import LoadingCircle from '../LoadingCircle/LoadingCircle';

const BioQuestions = () => {
  const [questions, setQuestions] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setFetching(true);
      const data = await BioQuestionServices.getMyQuestions(getToken()?.token);
      if (data?.data?.questions) {
        setQuestions(data.data.questions);
      } else {
        // Set default questions if none exist
        setQuestions([
          'মেয়েদের চোখ ঢাকা নিকাব পড়াকে অনেকে বাড়াবাড়ি মনে করে। ইসলাম তো সহজ, আপনি এব্যাপারে কি মনে করেন?',
          'প্রচন্ড বৃষ্টি হচ্ছে, মসজিদ যদিও কাছে মোটামুটি। হয়ত ছাতাও আছে যাওয়ার। কিন্তু ইসলাম তো সহজ, এখানে তো রুখসত আছে। কিন্তু অনেক অতি উৎসাহী আছে যারা এসব ঝড়-বৃষ্টি উপেক্ষা করেও যায় মসজিদে। এরকম বাড়াবাড়ি যারা করে তাদের ব্যাপারে আপনার মন্তব্য কি??',
          'ছেলেদের ইউনিভার্সিটিতে পড়াশুনা করার ব্যাপারে আপনার মতামত কি?',
          'অনেক দ্বীনদার মেয়ে ভার্সিটিতে পড়াশুনা করতে চায় এজন্য তাদের দ্বিনি পরিবেশ খুঁজে|শুরুতে জেনেশুনে মেয়েদের জন্য ভার্সিটিতে পড়তে চাওয়ার বিষয়ে আপনি কি মনে করেন??',
          'পর্দা করে অনলাইনে হিজাব নিকাবের ব্যাবসা তো হালাল।ভিডিও(মডেলিং) বানিয়ে তা দিয়ে একটা আউটসোর্সিং বা ব্যবসা করতে চাইলে আপনার থেকে কোনো হেল্প পেতে পারি? বা পারমিশন পেতে পারি?',
          'অমুক তার ছেলেকে ভার্সিটিতে ভর্তি হতে দিতে চায় না কারন ইসলামী পরিবেশ পাবে না। এরকম বাড়াবাড়ির ব্যাপারে আপনার মতামত কি?',
        ]);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setFetching(false);
    }
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    if (questions.length < 10) {
      setQuestions([...questions, '']);
    } else {
      Toast.errorToast('সর্বোচ্চ ১০টি প্রশ্ন যোগ করতে পারবেন');
    }
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
    } else {
      Toast.errorToast('কমপক্ষে ১টি প্রশ্ন থাকতে হবে');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate questions
    const filteredQuestions = questions.filter((q) => q.trim() !== '');
    if (filteredQuestions.length === 0) {
      Toast.errorToast('কমপক্ষে ১টি প্রশ্ন যোগ করুন');
      return;
    }

    try {
      setLoading(true);
      const data = await BioQuestionServices.upsertQuestions(
        filteredQuestions,
        getToken()?.token
      );
      if (data?.success) {
        Toast.successToast('প্রশ্নগুলো সফলভাবে সংরক্ষিত হয়েছে');
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        'প্রশ্ন সংরক্ষণে সমস্যা হয়েছে';
      Toast.errorToast(msg);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <LoadingCircle />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2
        className="text-2xl font-bold mb-4"
        style={{ color: Colors.titleText }}
      >
        আপনার বায়োডাটার জন্য প্রশ্ন সেট করুন
      </h2>
      <p className="text-gray-600 mb-6">
        যারা আপনার বায়োডাটা কিনতে চাইবে তাদের এই প্রশ্নগুলোর উত্তর দিতে হবে। আপনি
        সর্বোচ্চ ১০টি প্রশ্ন যোগ করতে পারবেন।
      </p>

      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center gap-2">
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: Colors.titleText }}
              >
                প্রশ্ন {index + 1}
              </label>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="text-red-500 hover:text-red-700"
                  title="মুছে ফেলুন"
                >
                  <FaTrash size={14} />
                </button>
              )}
            </div>
            <textarea
              value={question}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="আপনার প্রশ্ন লিখুন..."
              required
            />
          </div>
        ))}

        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={addQuestion}
            disabled={questions.length >= 10}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaPlus /> নতুন প্রশ্ন যোগ করুন
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 text-white rounded-md hover:opacity-90"
            style={{
              background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight} )`,
            }}
          >
            {loading ? <LoadingCircle /> : <><FaSave /> সংরক্ষণ করুন</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BioQuestions;
