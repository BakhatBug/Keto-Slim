import React from 'react';
import PropTypes from 'prop-types';
import calorie_img from '../assets/images/calorie.png';
import logo from '../assets/images/ketoslim.png';
import ThemeToggle from './ThemeToggle';
import ProgressIndicator from './ProgressIndicator';
import { useTheme } from '../contexts/ThemeContext.jsx';

function CaloriesDisplay({ formData, onNext, onBack }) {
  const { darkMode } = useTheme();
  const { Calorie } = formData;

  // Determine conditional callout based on calorie target
  const getCalorieCallout = () => {
    const calorieNum = parseFloat(Calorie);

    if (calorieNum >= 1300 && calorieNum <= 1500) {
      return "You're already close — just upgrading your food quality could unlock smoother fat loss and better focus.";
    } else if (calorieNum >= 1100 && calorieNum <= 1299) {
      return "At this range, your body is primed to burn fat — but only if you're eating nutrient-dense, low-carb foods that stabilize your system.";
    } else if (calorieNum < 1100) {
      return 'Extreme restriction can backfire — slowing your metabolism, increasing stress, and making results harder to sustain. Keto helps you eat smarter, not just less.';
    }
    return "You're already close — just upgrading your food quality could unlock smoother fat loss and better focus.";
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
          currentStep={3}
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
          <div className="text-6xl">🔥</div>
        </div>

        {/* Title */}
        <h2
          id="calorie-title"
          className="text-2xl font-bold text-center mb-2"
          style={{ color: darkMode ? 'rgb(248, 244, 244)' : 'rgb(24, 59, 73)' }}
        >
          You Should Be Eating Around {Calorie} Calories
        </h2>
        <p
          className="text-center font-semibold mb-6"
          style={{ color: darkMode ? 'rgb(248, 244, 244)' : 'rgb(24, 59, 73)' }}
        >
          But Not All Calories Are Equal
        </p>

        {/* Illustration */}
        <div className="flex justify-center items-center mb-6">
          <img src={calorie_img} alt="Calorie Illustration" />
        </div>

        {/* Description Text */}
        <div className="space-y-4 mb-6 text-left">
          <p style={{ color: darkMode ? 'rgb(181, 194, 201)' : 'rgb(19, 85, 111)' }}>
            Your body burns calories just to stay alive — that's your BMR. Add in movement, and you
            burn even more. Eat less than you burn? You lose weight. Eat more? You store it. Simple
            math, but the <span className="italic">type</span> of calories still makes or breaks
            your results.
          </p>
          <p style={{ color: darkMode ? 'rgb(181, 194, 201)' : 'rgb(19, 85, 111)' }}>
            Most people eat low-quality calories that spike cravings, crash energy, and cause fat to
            stick — even if they're technically under their daily limit.
          </p>
          <p className="text-sm" style={{ color: 'rgb(247, 89, 80)' }}>
            {getCalorieCallout()}
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

CaloriesDisplay.propTypes = {
  formData: PropTypes.shape({
    Calorie: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default CaloriesDisplay;
