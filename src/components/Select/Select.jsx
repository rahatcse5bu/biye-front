/* eslint-disable react/prop-types */

import { Colors } from '../../constants/colors';

const Select = ({
  title,
  value,
  setValue,
  required = false,
  options = [],
  subtitle,
}) => {
  // console.log({ options: options });
  if (!options) {
    return <p>select</p>;
  }
  return (
    <div className="my-3 text-left">
      {title && (
        <label className="mb-2 font-bold text-gray-500">
          {title} {required && <span className="text-red-900">*</span>}
        </label>
      )}

      <select
        className="w-full p-2 mt-2 text-black border rounded outline-none focus:border-blue-500"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required={required}
      >
        <option value="">নির্বাচন করুন</option>
        {options?.map((option, index) => (
          <option className="text-black" key={index} value={option?.value}>
            {option?.label ? option?.label : option?.value}
          </option>
        ))}
      </select>

      {subtitle && (
        <p
          style={{ color: Colors.pncPrimaryColor }}
          className="block my-2 font-bold text-left text-gray-500"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Select;
