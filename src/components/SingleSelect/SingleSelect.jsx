/* eslint-disable react/prop-types */
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Colors } from '../../constants/colors';

const animatedComponents = makeAnimated();

export default function SingleSelect({
  options,
  title,
  subtitle,
  value,
  setValue,
  classes = 'z-40',
  required = false,
  placeholder,
  maxMenuHeight = 240,
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
        closeMenuOnSelect={true}
        onChange={(val) => setValue(val)}
        value={value}
        components={animatedComponents}
        isMulti={false}
        isClearable={true}
        required={required}
        options={options}
        placeholder={placeholder}
        menuPlacement="auto"
        maxMenuHeight={maxMenuHeight}
        menuPortalTarget={
          typeof document !== 'undefined' ? document.body : undefined
        }
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
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
