import { useContext } from 'react';
import BioContext from '../../contexts/BioContext';
import GridQuestionAnswerCard from '../GridQuestionAnswerCard/GridQuestionAnswerCard';

function AddressInfo() {
  const { bio } = useContext(BioContext);
  const addressInfo = bio?.address || null;
  // console.log('address~~~', addressInfo);
  return (
    <div className="single-bio-address rounded shadow">
      <h5 className="card-title text-center text-2xl my-3">ঠিকানা</h5>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-0 my-3">
        <GridQuestionAnswerCard
          question="স্থায়ী ঠিকানা"
          answer={
            <>
              <span>{addressInfo?.permanent_address}</span>
              <br />
              <span>
                <b>এলাকার নাম: &nbsp;</b>
                {addressInfo?.permanent_area}
              </span>
            </>
          }
        />
        <GridQuestionAnswerCard
          question="বর্তমান ঠিকানা"
          answer={
            <>
              <span>{addressInfo?.present_address}</span>
              <br />
              <span>
                <b>এলাকার নাম: &nbsp;</b>
                {addressInfo?.present_area}
              </span>
            </>
          }
        />
        {/* Where Grew Up */}
        <GridQuestionAnswerCard
          question="কোথায় বড় হয়েছেন?"
          answer={addressInfo?.grown_up}
        />
      </div>
    </div>
  );
}

export default AddressInfo;
