import BioContext from '../../contexts/BioContext';
import { useContext } from 'react';
import GridQuestionAnswerCard from '../GridQuestionAnswerCard/GridQuestionAnswerCard';
const OngikarNama = () => {
  const { bio } = useContext(BioContext);
  const ongikarNama = bio?.ongikarNama || null;
  const siteUrl = import.meta.env.VITE_SITE_URL || 'pncnikah.com';
  return (
    <div className="single-bio-ongikar-info rounded shadow">
      <h5 className="card-title text-center text-2xl my-3">অঙ্গীকারনামা</h5>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-0 my-3">
        <GridQuestionAnswerCard
          question={`${siteUrl} ওয়েবসাইটে বায়োডাটা জমা দিচ্ছেন, তা আপনার অভিভাবক জানেন?`}
          answer={ongikarNama?.is_family_know}
        />
        <GridQuestionAnswerCard
          question="আল্লাহ&lsquo;র শপথ করে সাক্ষ্য দিন, যে তথ্যগুলো দিয়েছেন সব সত্য?"
          answer={ongikarNama?.isTrueData}
        />
        <GridQuestionAnswerCard
          question={`কোনো মিথ্যা তথ্য প্রদান করলে দুনিয়াবী আইনগত এবং আখিরাতের দায়ভার ${siteUrl} কর্তৃপক্ষ নিবে না। আপনি কি সম্মত?`}
          answer={ongikarNama?.isAgree}
        />
      </div>
    </div>
  );
};

export default OngikarNama;
