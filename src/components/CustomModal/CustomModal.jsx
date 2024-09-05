import React from 'react';
import { Colors } from '../../constants/colors';

const CustomModal = ({ isOpen, onClose, title, children, className }) => {
  if (!isOpen) return null; // If modal is not open, don't render

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-[9000000]">
      <div
        className={`bg-white rounded-lg shadow-lg md:w-[50%] w-full p-6 relative ${className}`}
      >
        <div className="flex justify-between items-center mb-4">
          {title && (
            <h2
              style={{ color: Colors.titleText }}
              className="text-2xl font-semibold"
            >
              {title}
            </h2>
          )}

          <button
            className=" text-white hover:bg-white transition-all hover:border border-red-800 duration-150 ease-in-out hover:text-red-800 bg-red-500 w-10 h-10 rounded-full text-2xl focus:outline-none"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="mb-6">{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
