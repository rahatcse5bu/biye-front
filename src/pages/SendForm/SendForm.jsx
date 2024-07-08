import { useEffect, useState } from "react";
import { Colors } from "../../constants/colors";
import Textarea from "../../components/Textarea/Textarea";
import { BioChoiceDataServices } from "../../services/bioChoiceData";
import { getToken } from "../../utils/cookies";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "../../utils/toast";
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle";
function SendForm() {
  const { bio_user } = useParams();
  const navigate = useNavigate();
  const [opinionOnNikhab, setOpinionOnNikhab] = useState("");
  const [salatInRain, setSalatInRain] = useState("");
  const [studyingAtUniversity, setStudyingAtUniversity] = useState("");
  const [startingUniv, setStartingUniv] = useState("");
  const [onlineModeling, setOnlineModeling] = useState("");
  const [malePhotoCapture, setMalePhotoCapture] = useState("");
  const [bioInput, setBioInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [goTo, setGoto] = useState(false);
  useEffect(() => {
    if (goTo & !loading) {
      const timeout = setTimeout(() => {
        setGoto(false);
        navigate("/user/account/dashboard");
      }, 10000); // 10 seconds timeout
      return () => clearTimeout(timeout);
    }
  }, [goTo, loading, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let text = `malePhotoCapture == ${malePhotoCapture} `;
    text += `===onlineModeling==${onlineModeling}`;
    text += `===opinionOnNikhab==${opinionOnNikhab}`;
    text += `===salatInRain==${salatInRain}`;
    text += `===startingUniv==${startingUniv}`;
    text += `===studyingAtUniversity==${studyingAtUniversity}`;

    const bioChoiceData = {
      bio_details: text,
      status: "pending",
      bio_user: bio_user,
    };

    try {
      setLoading(true);
      const response = await BioChoiceDataServices.createBioChoiceData(
        bioChoiceData,
        getToken()?.token
      );
      if (response?.success) {
        Toast.successToast("আপনার বায়োডাটা পাঠানো হয়েছে");
        navigate("/user/account/purchases");
      }
      setGoto(true);
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message;
      Toast.errorToast(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-md p-6 mx-auto bg-white rounded-lg shadow-md">
      <h2
        className="mb-4 text-2xl font-semibold"
        style={{ color: Colors.titleText }}
      >
        নিচের ফর্ম পুরন করে আপনার বায়োডাটা শেয়ার করুন
      </h2>
      <h4 className="mb-4 text-sm font-semibold text-red-800">
        আপনি নিচে যে তথ্য দিবেন তা পাত্র/পাত্রীর সাথে শেয়ার করা হবে ইন শা
        আল্লাহ| আপনার বায়োডাটার ব্যাপারে সে ফিডব্যাক দিলে আপনাকে মোবাইলে এস এম
        এস করে জানিয়ে দেওয়া হবে এবং আপনি তা আপনার ড্যাশবোর্ড থেকে দেখতে পারবেন |
        সে পজেটিভ ফিডব্যাক দিলে বা পারমিশন দিলে আপনি ড্যাশবোর্ড থেকে বাকি
        পেমেন্ট করে অভিভাবক এর সাথে যোগাযোগ এর তথ্য চূড়ান্তভাবে পাবেন, ইন শা
        আল্লাহ্‌
      </h4>
      <form onSubmit={handleSubmit}>
        <Textarea
          value={opinionOnNikhab}
          setValue={setOpinionOnNikhab}
          required={true}
          title="মেয়েদের চোখ ঢাকা নিকাব পড়াকে অনেকে বাড়াবাড়ি মনে করে। ইসলাম তো সহজ, আপনি এব্যাপারে কি মনে করেন?"
        />
        <Textarea
          value={salatInRain}
          setValue={setSalatInRain}
          required={true}
          title="প্রচন্ড বৃষ্টি হচ্ছে, মসজিদ যদিও কাছে মোটামুটি। হয়ত ছাতাও আছে যাওয়ার। কিন্তু ইসলাম তো সহজ, এখানে তো রুখসত আছে। কিন্তু অনেক অতি উৎসাহী আছে যারা এসব ঝড়-বৃষ্টি উপেক্ষা করেও যায় মসজিদে। এরকম বাড়াবাড়ি যারা করে তাদের ব্যাপারে আপনার মন্তব্য কি??"
        />
        <Textarea
          value={studyingAtUniversity}
          setValue={setStudyingAtUniversity}
          required={true}
          title="ছেলেদের ইউনিভার্সিটিতে পড়াশুনা করার ব্যাপারে আপনার মতামত কি?"
        />
        <Textarea
          value={malePhotoCapture}
          setValue={setMalePhotoCapture}
          required={true}
          title="অনেক দ্বীনদার মেয়ে ভার্সিটিতে পড়াশুনা করতে চায় এজন্য তাদের দ্বিনি পরিবেশ খুঁজে|শুরুতে জেনেশুনে মেয়েদের জন্য ভার্সিটিতে পড়তে চাওয়ার বিষয়ে আপনি কি মনে করেন??"
        />
        <Textarea
          value={onlineModeling}
          setValue={setOnlineModeling}
          required={true}
          title="পর্দা করে অনলাইনে হিজাব নিকাবের ব্যাবসা তো হালাল।ভিডিও(মডেলিং) বানিয়ে তা দিয়ে একটা আউটসোর্সিং বা ব্যবসা করতে চাইলে আপনার থেকে কোনো হেল্প পেতে পারি? বা পারমিশন পেতে পারি?"
        />
        <Textarea
          value={startingUniv}
          setValue={setStartingUniv}
          required={true}
          title="অমুক তার ছেলেকে ভার্সিটিতে ভর্তি হতে দিতে চায় না কারন ইসলামী পরিবেশ পাবে না। এরকম বাড়াবাড়ির ব্যাপারে আপনার মতামত কি?"
        />
        <Textarea
          value={bioInput}
          setValue={setBioInput}
          required={true}
          title="আপনার নিজের বায়োডাটা বিস্তারিত লিখুন(বিশেষ কিছু জানাতে চাইলে তাও লিখুন)"
        />

        <div className="mb-4">
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white rounded hover:bg-blue-700"
            style={{
              background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight} )`,
            }}
          >
            {loading ? <LoadingCircle /> : "আমার বায়োডাটা শেয়ার করুন"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SendForm;
