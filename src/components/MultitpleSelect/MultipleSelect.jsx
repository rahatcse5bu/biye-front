/* eslint-disable react/prop-types */
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Colors } from '../../constants/colors';

const animatedComponents = makeAnimated();

export default function MultipleSelect({
  options,
  title,
  subtitle,
  value,
  setValue,
  classes = 'z-40',
  required = false,
  closeMenuOnSelect = false,
}) {
  // console.log(value);
  return (
    <div className="text-left">
      {title && (
        <label className="block mb-2 font-bold text-left text-gray-500">
          {title}
        </label>
      )}
      <Select
        closeMenuOnSelect={closeMenuOnSelect}
        onChange={(val) => setValue(val)}
        value={value}
        components={animatedComponents}
        isMulti
        required={required}
        isClearable={true}
        options={options}
        className={`text-left ${classes}`}
      />
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
}
