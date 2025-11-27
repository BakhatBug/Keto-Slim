import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../contexts/ThemeContext.jsx';

function BenefitsChecklist() {
  const { darkMode } = useTheme();
  const benefits = [
    'Improving Digestion',
    'Toning Muscles',
    'Mental Wellness Reset',
    'Physical Endurance Boost',
  ];

  return (
    <div className="w-full mt-6">
      <div className="flex flex-col items-center mb-6">
        <div className="w-full flex flex-col">
          <div
            className="font-semibold text-base mb-2"
            style={{ color: darkMode ? 'rgb(224, 230, 233)' : 'rgb(24, 59, 73)' }}
          >
            Your program will also work on:
          </div>
          <ul className="flex flex-col gap-2 items-center w-full max-w-xs">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-2 w-full">
                <span
                  className="text-xl rounded-full border w-7 h-7 flex items-center justify-center"
                  style={{
                    color: 'rgb(247, 89, 80)',
                    background: darkMode ? 'rgb(35, 38, 39)' : 'rgb(255, 255, 255)',
                    borderColor: 'rgb(247, 89, 80)',
                  }}
                >
                  ✔
                </span>
                <span
                  className="font-medium text-base"
                  style={{ color: darkMode ? 'rgb(224, 230, 233)' : 'rgb(24, 59, 73)' }}
                >
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

BenefitsChecklist.propTypes = {};

export default BenefitsChecklist;
