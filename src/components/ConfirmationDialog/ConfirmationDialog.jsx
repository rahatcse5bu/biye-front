// src/components/ConfirmationDialog.js
import React from 'react';

const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
        <h3 className="text-lg font-semibold mb-4">{message}</h3>
        <div className="flex justify-end gap-4">
          <button
            onClick={onConfirm}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
          >
            {loading ? 'Loading...' : 'Confirm'}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
