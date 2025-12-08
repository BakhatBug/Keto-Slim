import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const BenefitsChecklist: React.FC = () => {
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
            className={`font-semibold text-base mb-2 ${darkMode ? 'text-[#e0e6e9]' : 'text-[#183b49]'
              }`}
          >
            Your program will also work on:
          </div>
          <ul className="flex flex-col gap-2 items-center w-full max-w-xs">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-2 w-full">
                <span
                  className={`text-xl rounded-full border w-7 h-7 flex items-center justify-center text-[#f75950] border-[#f75950] ${darkMode ? 'bg-[#232627]' : 'bg-white'
                    }`}
                >
                  ✔
                </span>
                <span
                  className={`font-medium text-base ${darkMode ? 'text-[#e0e6e9]' : 'text-[#183b49]'
                    }`}
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

export default BenefitsChecklist;
