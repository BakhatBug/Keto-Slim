import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const ProgressGrid: React.FC = () => {
  const { darkMode } = useTheme();
  return (
    <div
      className={`w-full grid grid-cols-2 gap-x-8 gap-y-4 rounded-xl p-4 sm:p-6 ${darkMode ? 'bg-[rgb(35,38,39)]' : 'bg-white'
        }`}
    >
      {/* Current Stats */}
      <div className="flex flex-col gap-5 pr-2">
        <div>
          <div
            className={`text-xs mb-1 ${darkMode ? 'text-[rgb(181,194,201)]' : 'text-[rgb(24,59,73)]'
              }`}
          >
            Body Fat
          </div>
          <div className="font-bold text-base text-[rgb(247,89,80)]">
            20–25%
          </div>
        </div>
        <div>
          <div
            className={`text-xs mb-1 ${darkMode ? 'text-[rgb(181,194,201)]' : 'text-[rgb(24,59,73)]'
              }`}
          >
            Energy Levels
          </div>
          <div
            className={`w-full h-2 rounded ${darkMode ? 'bg-[rgb(45,49,51)]' : 'bg-gray-200'
              }`}
          >
            <div
              className="h-2 rounded bg-[rgb(247,89,80)] transition-all duration-400 w-[30%]"
            ></div>
          </div>
        </div>
        <div>
          <div
            className={`text-xs mb-1 ${darkMode ? 'text-[rgb(181,194,201)]' : 'text-[rgb(24,59,73)]'
              }`}
          >
            Physical Health
          </div>
          <div
            className={`w-full h-2 rounded ${darkMode ? 'bg-[rgb(45,49,51)]' : 'bg-gray-200'
              }`}
          >
            <div
              className="h-2 rounded bg-[rgb(247,89,80)] transition-all duration-400 w-[35%]"
            ></div>
          </div>
        </div>
        <div>
          <div
            className={`text-xs mb-1 ${darkMode ? 'text-[rgb(181,194,201)]' : 'text-[rgb(24,59,73)]'
              }`}
          >
            Metabolism Speed
          </div>
          <div
            className={`w-full h-2 rounded ${darkMode ? 'bg-[rgb(45,49,51)]' : 'bg-gray-200'
              }`}
          >
            <div
              className="h-2 rounded bg-[rgb(247,89,80)] transition-all duration-400 w-[25%]"
            ></div>
          </div>
        </div>
      </div>

      {/* Future Stats */}
      <div className="flex flex-col gap-5 pl-2">
        <div>
          <div
            className={`text-xs mb-1 ${darkMode ? 'text-[rgb(181,194,201)]' : 'text-[rgb(24,59,73)]'
              }`}
          >
            Body Fat
          </div>
          <div className="font-bold text-base text-[rgb(54,188,159)]">
            10–12%
          </div>
        </div>
        <div>
          <div
            className={`text-xs mb-1 ${darkMode ? 'text-[rgb(181,194,201)]' : 'text-[rgb(24,59,73)]'
              }`}
          >
            Energy Levels
          </div>
          <div
            className={`w-full h-2 rounded ${darkMode ? 'bg-[rgb(45,49,51)]' : 'bg-gray-200'
              }`}
          >
            <div
              className="h-2 rounded bg-[rgb(54,188,159)] transition-all duration-400 w-[85%]"
            ></div>
          </div>
        </div>
        <div>
          <div
            className={`text-xs mb-1 ${darkMode ? 'text-[rgb(181,194,201)]' : 'text-[rgb(24,59,73)]'
              }`}
          >
            Physical Health
          </div>
          <div
            className={`w-full h-2 rounded ${darkMode ? 'bg-[rgb(45,49,51)]' : 'bg-gray-200'
              }`}
          >
            <div
              className="h-2 rounded bg-[rgb(54,188,159)] transition-all duration-400 w-[90%]"
            ></div>
          </div>
        </div>
        <div>
          <div
            className={`text-xs mb-1 ${darkMode ? 'text-[rgb(181,194,201)]' : 'text-[rgb(24,59,73)]'
              }`}
          >
            Metabolism Speed
          </div>
          <div
            className={`w-full h-2 rounded ${darkMode ? 'bg-[rgb(45,49,51)]' : 'bg-gray-200'
              }`}
          >
            <div
              className="h-2 rounded bg-[rgb(54,188,159)] transition-all duration-400 w-[80%]"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressGrid;
