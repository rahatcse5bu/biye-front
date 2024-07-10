import { useBio } from "../../contexts/BioContext";
import { getToken } from "../../utils/cookies";
import { ContactServices } from "../../services/contact";
import { useQuery } from "@tanstack/react-query";
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle";
const Contact = () => {
  const { bio } = useBio();
  const generalInfo = bio?.generalInfo || null;

  const { data: contactInfo, isLoading } = useQuery({
    queryKey: ["my-contact", getToken()?.token],
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
      <div className="paid-contact-info">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-t border-b">
              <td className="w-1/2 px-4 py-2 text-left">
                {" "}
                {generalInfo?.gender === "মহিলা" ||
                generalInfo?.bio_type === "পাত্রীর বায়োডাটা"
                  ? "পাত্রীর নাম"
                  : "পাত্রের নাম"}{" "}
              </td>
              <td className="w-1/2 px-4 py-2 text-left border-l">
                {contactInfo?.data.full_name}
              </td>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="w-1/2 px-4 py-2 text-left">
                অভিভাবকের মোবাইল নাম্বার
              </td>
              <td className="w-1/2 px-4 py-2 text-left border-l">
                {contactInfo?.data.family_number}
              </td>
            </tr>
            <tr className="border-b">
              <td className="w-1/2 px-4 py-2 text-left">অভিভাবকের ই-মেইল</td>
              <td className="w-1/2 px-4 py-2 text-left border-l">
                {contactInfo?.data.bio_receiving_email}
              </td>
            </tr>
            <tr className="border-b">
              <td className="w-1/2 px-4 py-2 text-left">
                অভিভাবকের সাথে সম্পর্ক
              </td>
              <td className="px-4 py-2 text-left border-l">
                {contactInfo?.data.relation}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contact;
