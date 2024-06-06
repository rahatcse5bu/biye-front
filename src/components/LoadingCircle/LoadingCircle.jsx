/* eslint-disable react/prop-types */
import { Oval } from "react-loader-spinner";

const LoadingCircle = ({ classes = null }) => {
  return (
    <div className={`w-full flex justify-center ${classes}`}>
      <Oval
        height={25}
        width={25}
        color="#ffff"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="gray"
        strokeWidth={5}
        strokeWidthSecondary={5}
      />
    </div>
  );
};

export default LoadingCircle;
