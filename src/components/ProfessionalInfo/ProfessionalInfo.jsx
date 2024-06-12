import { useContext } from "react";
import BioContext from "../../contexts/BioContext";

const ProfessionalInfo = () => {
  const { bio } = useContext(BioContext);
  const occupation = bio?.occupation || null;
  return (
    <div className="single-bio-ocupational-info rounded shadow">
      <h5 className="card-title text-center text-2xl my-3">পেশাগত তথ্য</h5>
      <table className="table-auto w-full">
        <thead>
          <tr className="border-b border-t">
            <td className="px-4 py-2 text-left  w-1/2">পেশা</td>
            <td className="px-4 py-2 text-left  w-1/2 border-l">
              {occupation?.occupation?.join(", ")}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="px-4 py-2 text-left  w-1/2">
              পেশার বিস্তারিত বিবরণ
            </td>
            <td className="px-4 py-2 text-left  w-1/2 border-l">
              {occupation?.occupation_details}
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 text-left  w-1/2">মাসিক আয়</td>
            <td className="px-4 py-2 text-left  border-l">
              {occupation?.monthly_income}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProfessionalInfo;
