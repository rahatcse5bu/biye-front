import { Button, Input } from "@material-tailwind/react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { Colors } from "../../constants/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const BioDataInput = () => {
	const [bioId, setBioId] = useState(0);
	const navigate = useNavigate();

	const navigateHandler = () => {
		if (bioId < 2000) {
			return;
		}
		navigate(`/biodata/${bioId}`);
	};
	return (
		<div className="flex mt-5 flex-col  lg:w-[20rem] w-full">
			<div className="mr-8">
				<Input
					value={bioId}
					onChange={(e) => setBioId(e.target.value)}
					color="purple"
					className="py-5 "
					type="number"
					label="বায়োডাটা নং"
				/>
			</div>

			<div className="grid grid-cols-2 gap-4 my-10 mr-8 ">
			
				<Button
					className="flex items-center px-5 py-1 text-[16px]"
					onClick={() => setBioId(0)}
					style={{
						background: `red`,
					}}
				>
					<FaTrash className="w-4 h-6 pr-2" />
					<span>মুছে ফেলুন</span>
				</Button>
				<Button
					className="flex items-center px-5 text-[16px]"
					style={{
						background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight} )`,
					}}
					onClick={navigateHandler}
				>
					<AiOutlineSearch className="w-4 h-6 " /> <span>খুজুন</span>
				</Button>
			</div>
		</div>
	);
};

export default BioDataInput;
