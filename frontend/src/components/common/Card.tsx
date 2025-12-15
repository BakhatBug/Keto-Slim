import React, { ReactNode } from 'react';
import logo from '../../assets/images/ketoslim.png';
import ThemeToggle from './ThemeToggle';
import ProgressIndicator from './ProgressIndicator';
import { useTheme } from '../../contexts/ThemeContext';

interface CardProps {
  children: ReactNode;
  currentStep?: number;
  totalSteps?: number;
  progressLabel?: string;
  showLogo?: boolean;
  showProgress?: boolean;
  showHeader?: boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  className?: string;
  wrapperClassName?: string;
  afterCard?: ReactNode;
}

const Card: React.FC<CardProps> = ({
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
  afterCard = null,
}) => {
  const { darkMode } = useTheme();
  return (
    <main
      className={`min-h-screen w-full overflow-x-hidden p-3 sm:p-5 md:p-6 transition-colors duration-300 ${
        darkMode ? 'bg-[rgb(24,26,27)]' : 'bg-[rgb(248,244,244)]'
      } ${wrapperClassName}`}
      role="main"
      aria-label={ariaLabel}
    >
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Header */}
      {showHeader && showLogo && (
        <header className="text-center mb-2 sm:mb-6 md:mb-8">
          <img
            src={logo}
            alt="Keto Slim Logo"
            className="w-24 h-8 sm:w-32 sm:h-10 mx-auto my-2 sm:my-4"
          />
        </header>
      )}

      {/* Progress Indicator - Outside Card */}
      <div className="max-w-lg mx-auto w-full mb-6">
        {showProgress && currentStep && totalSteps && (
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
            label={progressLabel}
          />
        )}
      </div>

      {/* Main Content Card */}
      <article
        className={`rounded-2xl shadow-xl border p-4 sm:p-8 w-full max-w-xl mx-auto flex flex-col items-center mb-6 card-transition ${
          darkMode
            ? 'bg-[rgb(35,38,39)] border-[rgb(45,49,51)] text-[rgb(248,244,244)]'
            : 'bg-white border-[rgb(229,231,235)] text-[rgb(24,59,73)]'
        } ${className}`}
        aria-labelledby={ariaLabelledBy}
      >
        {/* Card Content */}
        {children}
      </article>

      {/* Content after the card */}
      {afterCard}
    </main>
  );
};

export default Card;
