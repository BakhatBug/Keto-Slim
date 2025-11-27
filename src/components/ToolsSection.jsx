import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../contexts/ThemeContext.jsx';

function ToolsSection({ phoneImage }) {
  const { darkMode } = useTheme();
  const tools = [
    { icon: '🍔', text: 'Daily Custom Meal Plan' },
    { icon: '🛒', text: 'Done-For-You Grocery Lists' },
    { icon: '🍜', text: 'Overwhelm-Free Delicious Recipes' },
    { icon: '🎓', text: 'Weekly Tips & Guidance' },
  ];

  return (
    <div className="w-full mt-8 mb-6">
      <div className="text-center mb-6">
        <h3
          className="text-xl font-bold"
          style={{ color: darkMode ? 'rgb(224, 230, 233)' : 'rgb(24, 59, 73)' }}
        >
          Get all the right tools & knowledge.
        </h3>
      </div>

      <div className="flex items-center justify-between gap-8">
        {/* Left Column with features */}
        <div className="flex-1 space-y-4">
          {tools.map((tool, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-3xl">{tool.icon}</span>
              <span className="font-medium text-base" style={{ color: 'rgb(247, 89, 80)' }}>
                {tool.text}
              </span>
            </div>
          ))}
        </div>

        {/* Right Column with mobile image */}
        <div className="shrink-0">
          <img src={phoneImage} alt="Mobile phone displaying app" className="w-48 h-auto" />
        </div>
      </div>
    </div>
  );
}

ToolsSection.propTypes = {
  phoneImage: PropTypes.string.isRequired,
};

export default ToolsSection;
