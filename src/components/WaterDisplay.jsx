import React from 'react';
import PropTypes from 'prop-types';
import water_img from '../assets/images/water.png';
import logo from '../assets/images/ketoslim.png';
import ThemeToggle from './ThemeToggle';
import ProgressIndicator from './ProgressIndicator';
import { useTheme } from '../contexts/ThemeContext.jsx';

function WaterDisplay({ formData, onNext, onBack }) {
  const { darkMode } = useTheme();
  const { WaterCups } = formData;

  // Determine conditional callout based on water intake
  const getWaterCallout = () => {
    const waterNum = parseInt(WaterCups);

    if (waterNum > 6) {
      return 'Drinking over 6 glasses a day? Nice work — your hydration game is strong. Keep it up to support optimal fat loss, steady energy, and fewer cravings.';
    } else if (waterNum >= 2 && waterNum <= 6) {
      return "Drinking 2-6 glasses means you're getting closer! Just a few more sips each day could make a real difference in your metabolism and how you feel overall.";
    } else if (waterNum === 2) {
      return 'Drinking about 2 glasses per day is a great start, but your body is likely still running dry. Upping your intake can improve digestion, curb cravings, and help you burn fat more efficiently.';
    } else if (waterNum === 1) {
      return "Only Drinking Coffee or Tea? Caffeine doesn't hydrate — in fact, it can dehydrate you. Adding just a few glasses of water each day could dramatically boost your energy and fat-burning.";
    }
    return "Drinking 2-6 glasses means you're getting closer! Just a few more sips each day could make a real difference in your metabolism and how you feel overall.";
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
          currentStep={4}
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
        <div className="text-center mb-6">
          <div className="text-6xl">💧</div>
        </div>

        {/* Title */}
        <h2
          id="water-title"
          className="text-2xl font-bold text-center mb-2"
          style={{ color: darkMode ? 'rgb(248, 244, 244)' : 'rgb(24, 59, 73)' }}
        >
          Your Body Needs 8-9 Cups of Water Daily
        </h2>
        <p
          className="text-center font-semibold mb-6"
          style={{ color: darkMode ? 'rgb(248, 244, 244)' : 'rgb(24, 59, 73)' }}
        >
          Here's Why That Matters
        </p>

        {/* Illustration */}
        <div className="flex justify-center items-center mb-6">
          <img src={water_img} alt="Water Cups Illustration" />
        </div>

        {/* Description Text */}
        <div className="space-y-4 mb-6 text-left">
          <p style={{ color: darkMode ? 'rgb(181, 194, 201)' : 'rgb(19, 85, 111)' }}>
            Hydration is a fat-burning multiplier. Without enough water, your body holds onto
            toxins, slows digestion, and burns fat less efficiently.
          </p>
          <p style={{ color: darkMode ? 'rgb(181, 194, 201)' : 'rgb(19, 85, 111)' }}>
            Even mild dehydration can feel like fatigue, hunger, or sugar cravings. You're not lazy
            — you're likely underhydrated.
          </p>
          <p className="text-sm" style={{ color: 'rgb(247, 89, 80)' }}>
            {getWaterCallout()}
          </p>
        </div>
      </article>

      {/* Navigation Buttons - Outside Card */}
      <div className="max-w-lg mx-auto w-full flex justify-between gap-4 mb-6">
        <button
          onClick={onBack}
          type="button"
          className="text-lg font-bold py-2 rounded-lg flex items-center justify-between gap-2 shadow transition hover:opacity-90 w-1/2 cursor-pointer"
          style={{
            background: 'transparent',
            borderWidth: '2px',
            borderColor: 'rgb(54, 188, 159)',
            borderStyle: 'solid',
            color: 'rgb(54, 188, 159)',
          }}
        >
          <span style={{ marginLeft: '8px' }}>
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
              style={{ color: 'rgb(54, 188, 159)' }}
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </span>
          <span className="flex-1 text-center">Back</span>
          <span style={{ width: '20px', marginRight: '8px' }}></span>
        </button>
        <button
          onClick={onNext}
          type="button"
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

WaterDisplay.propTypes = {
  formData: PropTypes.shape({
    WaterCups: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default WaterDisplay;
