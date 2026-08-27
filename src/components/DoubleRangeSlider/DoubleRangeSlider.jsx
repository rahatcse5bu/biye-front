import Slider from '@mui/material/Slider';
import { Colors } from '../../constants/colors';

const DoubleRangeSlider = ({
  value,
  setValue,
  step = 1,
  maxValue = 60,
  minValue = 18,
  title,
  subtitle,
}) => {
  const sliderValue = [value?.min ?? minValue, value?.max ?? maxValue];

  const handleChange = (_event, nextValue) => {
    if (!Array.isArray(nextValue)) return;

    setValue({
      min: nextValue[0],
      max: nextValue[1],
    });
  };

  return (
    <div className="mb-6 px-2">
      {title && (
        <label className="text-left mb-4 text-gray-700 font-bold block">
          {title}
        </label>
      )}
      <Slider
        value={sliderValue}
        onChange={handleChange}
        valueLabelDisplay="auto"
        disableSwap
        step={step}
        max={maxValue}
        min={minValue}
        getAriaLabel={(index) =>
          index === 0 ? 'Minimum range value' : 'Maximum range value'
        }
        sx={{
          color: Colors.pncPrimaryColor,
          '& .MuiSlider-thumb:hover, & .MuiSlider-thumb.Mui-focusVisible': {
            boxShadow: '0 0 0 8px rgba(7, 25, 82, 0.16)',
          },
        }}
      />
      {subtitle && (
        <p
          style={{ color: Colors.pncPrimaryColor }}
          className="text-left text-gray-500 font-bold my-5 block"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default DoubleRangeSlider;
