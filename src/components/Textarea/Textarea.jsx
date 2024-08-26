import { Colors } from '../../constants/colors';

/* eslint-disable react/prop-types */
const Textarea = ({
  placeholder,
  title,
  subtitle,
  value,
  setValue,
  required,
  rows = 4,
}) => {
  return (
    <div className="my-2">
      {title && (
        <label
          htmlFor="message"
          className="text-left text-gray-500 font-bold block"
        >
          {title} {required && <span className="text-red-900">*</span>}
        </label>
      )}

      <textarea
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        id="message"
        name="message"
        rows={rows}
        className="w-full px-4 py-2 bg-white border-[1px] border-gray-300 outline-none rounded-md hover:border-purple-700"
      >
        {placeholder}
      </textarea>
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

export default Textarea;
