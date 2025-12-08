import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  label?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps, label }) => {
  const { darkMode } = useTheme();
  return (
    <div className="flex justify-between items-center mb-3 mx-auto px-0 sm:mb-8">
      {label && (
        <span
          className={`${darkMode ? 'text-teal-400' : 'text-teal-500'} font-semibold text-md sm:text-xl`}
        >
          {label}
        </span>
      )}
      <div className="flex flex-row items-center gap-2">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${index < currentStep ? 'bg-teal-500' : 'bg-gray-300'
              }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default ProgressIndicator;
