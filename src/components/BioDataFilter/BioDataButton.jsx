import { Button } from "@material-tailwind/react";
import { Colors } from "../../constants/colors";
import { AiOutlineDelete, AiOutlineSearch } from "react-icons/ai";

const BioDataButton = () => {
  return (
    <div className="flex items-center justify-between my-10 ">
      <Button
        className="flex items-center px-5"
        style={{
          background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight} )`,
        }}
      >
        <AiOutlineSearch className="w-4 h-6" />
        খুজুন
      </Button>
      <Button
        style={{
          background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight} )`,
        }}
        className="flex items-center px-5"
      >
        <AiOutlineDelete className="w-4 h-6" />
        মুছে ফেলুন
      </Button>
    </div>
  );
};

export default BioDataButton;
