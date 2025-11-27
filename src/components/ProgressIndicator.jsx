import React from 'react';
import PropTypes from 'prop-types';

function ProgressIndicator({ currentStep, totalSteps, darkMode, label }) {
  return (
    <div className="flex justify-between items-center mb-6 sm:mb-8">
      {label && (
        <span
          className={`${darkMode ? 'text-teal-400' : 'text-teal-500'} font-semibold text-sm sm:text-base`}
        >
          {label}
        </span>
      )}
      <div className="flex flex-row items-center gap-2">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
              index < currentStep ? 'bg-teal-500' : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

ProgressIndicator.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  darkMode: PropTypes.bool.isRequired,
  label: PropTypes.string,
};

export default ProgressIndicator;
