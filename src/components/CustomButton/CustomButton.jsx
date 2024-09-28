// CustomButton.jsx
import React from 'react';

const CustomButton = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  style,
  className,
  type = 'button',
}) => {
  // Tailwind classNames for different variants and sizes
  const baseClasses = `rounded focus:outline-none transition duration-300 ease-in-out`;
  const variantClasses =
    variant === 'primary'
      ? 'bg-blue-500 hover:bg-indigo-600 text-white'
      : 'bg-green-500 hover:bg-green-600 text-white';

  const sizeClasses =
    size === 'small'
      ? 'px-3 py-1 text-sm'
      : size === 'large'
        ? 'px-6 py-3 text-lg'
        : 'px-4 py-2 text-base';

  const disabledClasses = disabled ? 'bg-gray-400 cursor-not-allowed' : '';

  return (
    <button
      style={style}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
