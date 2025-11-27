import React from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/images/ketoslim.png';
import ThemeToggle from './ThemeToggle';
import ProgressIndicator from './ProgressIndicator';
import { useTheme } from '../contexts/ThemeContext.jsx';

function Card({
  children,
  currentStep,
  totalSteps,
  progressLabel = 'Your Results',
  showLogo = true,
  showProgress = true,
  showHeader = true,
  ariaLabel,
  ariaLabelledBy,
  className = '',
  wrapperClassName = '',
}) {
  const { darkMode } = useTheme();
  return (
    <main
      className={`min-h-screen w-full overflow-x-hidden ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} p-3 sm:p-5 md:p-6 transition-colors duration-300 ${wrapperClassName}`}
      role="main"
      aria-label={ariaLabel}
    >
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Header */}
      {showHeader && showLogo && (
        <header className="text-center mb-4 sm:mb-6 md:mb-8">
          <img
            src={logo}
            alt="Keto Slim Logo"
            className="w-24 h-8 sm:w-32 sm:h-10 mx-auto my-2 sm:my-4"
          />
        </header>
      )}

      {/* Progress Indicator - Outside Card */}
      <div className="max-w-xl mx-auto w-full mb-6">
        {showProgress && currentStep && totalSteps && (
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
            darkMode={darkMode}
            label={progressLabel}
          />
        )}
      </div>

      {/* Main Content Card */}
      <article
        className={`rounded-2xl shadow-xl border p-4 sm:p-8 w-full max-w-lg mx-auto flex flex-col items-center mb-6 card-transition ${className}`}
        style={{
          background: darkMode ? 'rgb(26, 35, 50)' : 'rgb(255, 255, 255)',
          borderColor: darkMode ? 'transparent' : 'rgb(229, 231, 235)',
          color: darkMode ? '#fff' : 'rgb(24, 59, 73)',
        }}
        aria-labelledby={ariaLabelledBy}
      >
        {/* Card Content */}
        {children}
      </article>
    </main>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
  progressLabel: PropTypes.string,
  showLogo: PropTypes.bool,
  showProgress: PropTypes.bool,
  showHeader: PropTypes.bool,
  ariaLabel: PropTypes.string,
  ariaLabelledBy: PropTypes.string,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
};

export default Card;
