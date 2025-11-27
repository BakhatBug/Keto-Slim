import React from 'react';
import PropTypes from 'prop-types';
import result1 from '../assets/images/result1.png';
import Card from './Card.jsx';
import logo from '../assets/images/ketoslim.png';
import ThemeToggle from './ThemeToggle';
import ProgressIndicator from './ProgressIndicator';
import { useTheme } from '../contexts/ThemeContext.jsx';

function ResultsDisplay({ formData, onNext }) {
  const { darkMode } = useTheme();
  const { BodyFat, Gender } = formData;

  // Determine conditional callout based on body fat percentage and gender
  const getBodyFatCallout = () => {
    const bodyFatNum = parseFloat(BodyFat);
    const isMale = Gender === 'male';

    if (isMale) {
      if (bodyFatNum < 24) {
        return 'Your current level may be slowing metabolism, increasing inflammation, or making it harder to stay consistent with workouts.';
      } else if (bodyFatNum >= 25 && bodyFatNum <= 31) {
        return 'Your current level may be slowing metabolism, increasing inflammation, or making it harder to stay consistent with workouts.';
      } else if (bodyFatNum >= 32) {
        return 'At this level, your body may be stuck in a constant state of inflammation and energy imbalance — making fat loss harder, appetite less predictable, and progress feel like a constant uphill battle.';
      }
    } else {
      if (bodyFatNum < 31) {
        return 'Your current level may be slowing metabolism, increasing inflammation, or making it harder to stay consistent with workouts.';
      } else if (bodyFatNum >= 32 && bodyFatNum <= 39) {
        return 'Your current level may be slowing metabolism, increasing inflammation, or making it harder to stay consistent with workouts.';
      } else if (bodyFatNum >= 40) {
        return 'At this level, your body may be stuck in a constant state of inflammation and energy imbalance — making fat loss harder, appetite less predictable, and progress feel like a constant uphill battle.';
      }
    }
    return 'Your current level may be slowing metabolism, increasing inflammation, or making it harder to stay consistent with workouts.';
  };

  return (
    <main
      className="min-h-screen w-full p-3 sm:p-5 md:p-6 transition-colors duration-300"
      role="main"
      style={{ background: darkMode ? 'rgb(24, 26, 27)' : 'rgb(248, 244, 244)' }}
    >
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Header */}
      <header className="text-center mb-4 sm:mb-6 md:mb-8">
        <img
          src={logo}
          alt="Keto Slim Logo"
          className="w-24 h-8 sm:w-32 sm:h-10 mx-auto my-2 sm:my-4"
        />
      </header>

      {/* Progress Indicator - Outside Card */}
      <div className="max-w-lg mx-auto w-full mb-6">
        <ProgressIndicator
          currentStep={1}
          totalSteps={6}
          darkMode={darkMode}
          label="Your Results"
        />
      </div>

      {/* Main Content Card */}
      <article
        className="rounded-2xl shadow-xl border p-4 sm:p-8 w-full max-w-lg mx-auto flex flex-col items-center mb-6"
        style={{
          background: darkMode ? 'rgb(35, 38, 39)' : 'rgb(255, 255, 255)',
          borderColor: darkMode ? 'rgb(45, 49, 51)' : 'rgb(229, 231, 235)',
          color: darkMode ? 'rgb(248, 244, 244)' : 'rgb(24, 59, 73)',
        }}
      >
        {/* Icon */}
        <div className="flex justify-center items-center mb-2">
          <span className="text-[34px]">⚖️</span>
        </div>

        {/* Title */}
        <h1
          className="text-center text-[34px] leading-[1.2em] font-semibold font-inter mb-1"
          style={{ color: darkMode ? 'rgb(248, 244, 244)' : 'rgb(24, 59, 73)' }}
        >
          Your Body Fat
          <br />
          <span>
            Percentage Is <span style={{ color: 'var(--accent2)' }}>{BodyFat}%</span>
          </span>
        </h1>

        <h2
          className="text-center text-[20px] font-semibold font-inter mb-2"
          style={{ color: darkMode ? 'rgb(248, 244, 244)' : 'rgb(24, 59, 73)' }}
        >
          Here's Why That Matters
        </h2>

        {/* Image */}
        <div className="flex flex-row justify-center items-center gap-4 mb-4 relative">
          <img
            alt=""
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
            loading="eager"
            src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='243.74'%20height='186.983'%20viewBox='0%200%20243.74%20186.983'%3e%3cdefs%3e%3clinearGradient%20id='linear-gradient'%20x1='0.5'%20y1='-0.034'%20x2='0.5'%20y2='1'%20gradientUnits='objectBoundingBox'%3e%3cstop%20offset='0'%20stop-color='%23fff'%20stop-opacity='0'/%3e%3cstop%20offset='0.227'%20stop-color='%23fff'/%3e%3cstop%20offset='0.493'%20stop-color='%23fff'/%3e%3cstop%20offset='0.759'%20stop-color='%23fff'/%3e%3cstop%20offset='1'%20stop-color='%23fff'%20stop-opacity='0'/%3e%3c/linearGradient%3e%3c/defs%3e%3cg%20id='Group_525'%20data-name='Group%20525'%20transform='translate(-66.631%20-171.088)'%3e%3cpath%20id='Path_129'%20data-name='Path%20129'%20d='M8634-1904.912l93.493,93.491L8634-1717.929v-36.984l56.509-56.508L8634-1867.928Z'%20transform='translate(-8494.52%202076)'%20fill='url(%23linear-gradient)'/%3e%3cpath%20id='Path_131'%20data-name='Path%20131'%20d='M8634-1904.912l93.493,93.491L8634-1717.929v-36.984l56.509-56.508L8634-1867.928Z'%20transform='translate(-8567.368%202076)'%20fill='url(%23linear-gradient)'/%3e%3cpath%20id='Path_130'%20data-name='Path%20130'%20d='M8634-1904.912l93.493,93.491L8634-1717.929v-36.984l56.509-56.508L8634-1867.928Z'%20transform='translate(-8417.121%202076)'%20fill='url(%23linear-gradient)'/%3e%3c/g%3e%3c/svg%3e"
            style={{
              zIndex: 0,
              width: '200px',
              height: '200px',
              objectFit: 'contain',
              filter:
                'blur(4px) brightness(0) saturate(100%) invert(23%) sepia(99%) saturate(7497%) hue-rotate(353deg) brightness(101%) contrast(101%)',
              opacity: 0.7,
            }}
          />
          <img
            src={result1}
            alt="Muscle Mass"
            className="rounded-lg relative"
            loading="eager"
            style={{ width: 'auto', height: 'auto', zIndex: 1 }}
          />
        </div>

        {/* Description Text */}
        <p
          className="text-[20px] font-normal font-inter mb-2"
          style={{ color: darkMode ? 'rgb(181, 194, 201)' : 'rgb(19, 85, 111)' }}
        >
          Your body fat percentage gives a clearer picture than BMI alone. It tells us how much of
          your body is lean mass (muscle, organs, bone) vs stored fat.
          <br />
          <br />
          Too much stored fat doesn't just affect how you look — it impacts your energy, hormone
          balance, and ability to burn fat efficiently.
        </p>

        <p
          className="text-[16px] font-normal font-inter mt-2 mb-6"
          style={{ color: 'rgb(247, 89, 80)' }}
        >
          {getBodyFatCallout()}
        </p>
      </article>

      {/* Next Button - Outside Card */}
      <div className="max-w-lg mx-auto w-full flex justify-end mb-6">
        <button
          type="button"
          onClick={onNext}
          className="text-white text-lg font-bold py-2 rounded-lg flex items-center justify-between gap-2 shadow transition hover:opacity-90 w-1/2 cursor-pointer"
          style={{
            background: 'rgb(54, 188, 159)',
            borderWidth: '2px',
            borderColor: 'rgb(54, 188, 159)',
            borderStyle: 'solid',
          }}
        >
          <span style={{ width: '20px', marginRight: '8px' }}></span>
          <span className="flex-1 text-center">Next</span>
          <span style={{ marginRight: '8px' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: 'white' }}
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        </button>
      </div>
    </main>
  );
}

ResultsDisplay.propTypes = {
  formData: PropTypes.shape({
    BodyFat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    Gender: PropTypes.string.isRequired,
  }).isRequired,
  onNext: PropTypes.func.isRequired,
};

export default ResultsDisplay;
