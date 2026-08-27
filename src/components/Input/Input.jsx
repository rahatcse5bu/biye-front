/* eslint-disable react/prop-types */

import { Colors } from "../../constants/colors";

const Input = ({
	title,
	type = "text",
	required = false,
	value,
	setValue,
	placeholder = "",
	subtitle,
}) => {
	return (
		<div className="my-2">
			{title && (
				<label className="text-left text-gray-500 font-bold block">
					{title} {required && <span className="text-red-900">*</span>}
				</label>
			)}

			<input
				type={type}
				required={required}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder={placeholder}
				className="w-full mt-2 py-1 outline-none hover:border-blue-900 indent-2 border border-gray-500 rounded-sm"
			/>

			{subtitle && (
				<p
					style={{ color: Colors.pncPrimaryColor }}
					className="text-left text-gray-500 font-bold my-2 block"
				>
					{subtitle}
				</p>
			)}
		</div>
	);
};

export default Input;
