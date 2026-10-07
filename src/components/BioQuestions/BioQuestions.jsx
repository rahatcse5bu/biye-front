import { useState, useEffect } from 'react';
import { Colors } from '../../constants/colors';
import { BioQuestionServices } from '../../services/bioQuestions';
import { getToken } from '../../utils/cookies';
import { Toast } from '../../utils/toast';
import { FaPlus, FaTrash, FaSave } from 'react-icons/fa';
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import Swal from 'sweetalert2';

const RELIGION_LABELS = { islam: 'ইসলাম', hinduism: 'হিন্দু', christianity: 'খ্রিষ্টান' };

const BioQuestions = () => {
  const [questions, setQuestions] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [isCustom, setIsCustom] = useState(false);
  const [religion, setReligion] = useState('');
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setFetching(true);
      const data = await BioQuestionServices.getMyQuestions(getToken()?.token);
      // TODO: with no own set, the API returns the admin's defaults for the user's religion.
      setQuestions(data?.data?.questions?.length ? data.data.questions : ['']);
      setIsCustom(data?.data?.isCustom === true);
      setReligion(data?.data?.religion || '');
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
        setIsCustom(true);
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

  const restoreDefaults = async () => {
    const result = await Swal.fire({
      title: 'ডিফল্ট প্রশ্নে ফিরে যাবেন?',
      text: 'আপনার নিজের প্রশ্নগুলো মুছে যাবে এবং অ্যাডমিন নির্ধারিত ডিফল্ট প্রশ্ন ব্যবহার হবে।',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'হ্যাঁ, ফিরে যান',
      cancelButtonText: 'বাতিল',
      confirmButtonColor: '#0D7377',
    });
    if (!result.isConfirmed) return;
    try {
      setResetting(true);
      await BioQuestionServices.deleteQuestions(getToken()?.token);
      Toast.successToast('ডিফল্ট প্রশ্ন চালু হয়েছে');
      await fetchQuestions();
    } catch (error) {
      Toast.errorToast(error?.response?.data?.message || 'ডিফল্ট প্রশ্নে ফেরানো যায়নি');
    } finally {
      setResetting(false);
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

      {isCustom ? (
        <div className="mb-6 flex flex-col items-start justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 sm:flex-row sm:items-center">
          <p className="text-sm text-gray-700">আপনি নিজের প্রশ্ন ব্যবহার করছেন।</p>
          <button
            type="button"
            onClick={restoreDefaults}
            disabled={resetting}
            className="shrink-0 rounded-lg border border-[#0D7377]/30 bg-white px-3 py-1.5 text-sm font-semibold text-[#0D7377] hover:bg-[#0D7377]/5 disabled:opacity-60"
          >
            {resetting ? 'অপেক্ষা করুন...' : 'ডিফল্ট প্রশ্নে ফিরে যান'}
          </button>
        </div>
      ) : (
        <p className="mb-6 rounded-xl border border-[#0D7377]/20 bg-[#0D7377]/5 px-4 py-3 text-sm text-[#0D7377]">
          আপনার ধর্ম অনুযায়ী{religion && RELIGION_LABELS[religion] ? ` (${RELIGION_LABELS[religion]})` : ''} অ্যাডমিন নির্ধারিত ডিফল্ট প্রশ্নগুলো দেখানো হচ্ছে। চাইলে পরিবর্তন করে সংরক্ষণ করুন।
        </p>
      )}

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
