/* eslint-disable react/prop-types */

const SubmitButton = ({ text }) => {
  return (
    <div className="">
      <button type="submit" className="text-black">
        {text}
      </button>
    </div>
  );
};

export default SubmitButton;
