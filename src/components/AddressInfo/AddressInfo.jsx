import { useContext } from "react";
import BioContext from "../../contexts/BioContext";

function AddressInfo() {
  const { bio } = useContext(BioContext);
  const addressInfo = bio?.address || null;
  console.log("address~~~", addressInfo);
  return (
    <div className="single-bio-address rounded shadow">
      <h5 className="card-title text-center text-2xl my-3">ঠিকানা</h5>
      <table className="table-auto w-full">
        <thead>
          <tr className="border-b text-[16px] border-t">
            <td className="px-4 py-2 text-left  w-1/2">স্থায়ী ঠিকানা</td>
            <td className="px-4 py-2 text-left  w-1/2 border-l">
              <span>{addressInfo?.permanent_address}</span>
              <br />
              <span>
                <b>এলাকার নাম: &nbsp;</b>
                {addressInfo?.permanent_area}
              </span>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="px-4 py-2 text-left  w-1/2">বর্তমান ঠিকানা</td>
            <td className="px-4 py-2 text-left  w-1/2 border-l">
              <span>{addressInfo?.present_address}</span>
              <br />
              <span>
                <b>এলাকার নাম: &nbsp;</b>
                {addressInfo?.present_area}
              </span>
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 text-left  w-1/2">কোথায় বড় হয়েছেন?</td>
            <td className="px-4 py-2 text-left  border-l">
              {addressInfo?.grown_up}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AddressInfo;
