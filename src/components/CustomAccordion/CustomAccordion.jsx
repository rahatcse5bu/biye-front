import React from 'react';

const CustomAccordion = ({ title, isOpen, onToggle, children }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onToggle();
    }
  };

  return (
    <div className="accordion-item" style={{ marginBottom: '10px' }}>
      <div
        className="accordion-title"
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        tabIndex={0} // Makes the element focusable
        role="button" // Indicates that this element is a button
        aria-expanded={isOpen} // Indicates whether the accordion is open
        style={{
          cursor: 'pointer',
          padding: '10px',
          backgroundColor: '#f0f0f0',
          borderRadius: '5px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3 className="text-xl font-bold text-gray">{title}</h3>
        <h4 className="text-xl font-bold text-gray">{isOpen ? '-' : '+'}</h4>
      </div>
      {isOpen && (
        <div
          className="accordion-content"
          style={{
            padding: '10px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '5px',
            marginTop: '5px',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default CustomAccordion;
