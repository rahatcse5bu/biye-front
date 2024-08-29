import { getToken } from '../../utils/cookies';
import { ContactServices } from '../../services/contact';
import { useQuery } from '@tanstack/react-query';
import LoadingCircle from '../../components/LoadingCircle/LoadingCircle';
import { useBio } from '../../contexts/useBio';
import GridQuestionAnswerCard from '../../components/GridQuestionAnswerCard/GridQuestionAnswerCard';

const Contact = () => {
  const { bio } = useBio();
  const generalInfo = bio?.generalInfo || null;

  const { data: contactInfo, isLoading } = useQuery({
    queryKey: ['my-contact', getToken()?.token],
    queryFn: async () => {
      return await ContactServices.getContactByUser(getToken()?.token);
    },
    retry: false,
  });

  if (isLoading) {
    return <LoadingCircle />;
  }

  // console.log("contact~~", contactInfo);

  return (
    <div>
      <h5 className="my-3 text-2xl text-center card-title">যোগাযোগ</h5>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-0 my-3">
        {contactInfo && (
          <>
            <GridQuestionAnswerCard
              question={
                generalInfo?.gender === 'মহিলা' ||
                generalInfo?.bio_type === 'পাত্রীর বায়োডাটা'
                  ? 'পাত্রীর নাম'
                  : 'পাত্রের নাম'
              }
              answer={contactInfo.data?.full_name}
            />
            <GridQuestionAnswerCard
              question="অভিভাবকের মোবাইল নাম্বার"
              answer={contactInfo.data?.family_number}
            />
            <GridQuestionAnswerCard
              question="অভিভাবকের ই-মেইল"
              answer={contactInfo.data?.bio_receiving_email}
            />
            <GridQuestionAnswerCard
              question="অভিভাবকের সাথে সম্পর্ক"
              answer={contactInfo.data?.relation}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Contact;
