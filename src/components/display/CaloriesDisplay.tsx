import React from 'react';
import calorie_img from '../../assets/images/calorie.png';
import Card from '../common/Card';
import Button from '../common/Button';
import { useTheme } from '../../contexts/ThemeContext';

interface CaloriesDisplayProps {
  formData: {
    Calorie: string | number;
    [key: string]: any;
  };
  onNext: () => void;
  onBack: () => void;
}

const CaloriesDisplay: React.FC<CaloriesDisplayProps> = ({ formData, onNext, onBack }) => {
  const { darkMode } = useTheme();
  const { Calorie } = formData;

  // Determine conditional callout based on calorie target
  const getCalorieCallout = () => {
    const calorieNum = typeof Calorie === 'string' ? parseFloat(Calorie) : Calorie;

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
    <Card
      currentStep={3}
      totalSteps={6}
      progressLabel="Your Results"
      showLogo={true}
      showProgress={true}
      showHeader={true}
      wrapperClassName=""
      className=""
      afterCard={
        <div className="max-w-lg mx-auto w-full flex justify-between gap-4 mb-6">
          <Button
            onClick={onBack}
            variant="secondary"
            className="w-1/2"
            icon={
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
                className="text-[rgb(54,188,159)]"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            }
            iconPosition="left"
          >
            Back
          </Button>
          <Button
            onClick={onNext}
            variant="primary"
            className="w-1/2"
            icon={
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
                className="text-white"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            }
            iconPosition="right"
          >
            Next
          </Button>
        </div>
      }
    >
      {/* Icon */}
      <div className="text-center mb-6">
        <div className="text-6xl">🔥</div>
      </div>

      {/* Title */}
      <h2
        id="calorie-title"
        className={`text-2xl font-bold text-center mb-2 ${darkMode ? 'text-[rgb(248,244,244)]' : 'text-[rgb(24,59,73)]'
          }`}
      >
        You Should Be Eating Around {Calorie} Calories
      </h2>
      <p
        className={`text-center font-semibold mb-6 ${darkMode ? 'text-[rgb(248,244,244)]' : 'text-[rgb(24,59,73)]'
          }`}
      >
        But Not All Calories Are Equal
      </p>

      {/* Illustration */}
      <div className="flex justify-center items-center mb-6">
        <img src={calorie_img} alt="Calorie Illustration" />
      </div>

      {/* Description Text */}
      <div className="space-y-4 mb-6 text-left">
        <p className={darkMode ? 'text-[rgb(181,194,201)]' : 'text-[rgb(19,85,111)]'}>
          Your body burns calories just to stay alive — that's your BMR. Add in movement, and you
          burn even more. Eat less than you burn? You lose weight. Eat more? You store it. Simple
          math, but the <span className="italic">type</span> of calories still makes or breaks
          your results.
        </p>
        <p className={darkMode ? 'text-[rgb(181,194,201)]' : 'text-[rgb(19,85,111)]'}>
          Most people eat low-quality calories that spike cravings, crash energy, and cause fat to
          stick — even if they're technically under their daily limit.
        </p>
        <p className="text-sm text-[rgb(247,89,80)]">
          {getCalorieCallout()}
        </p>
      </div>
    </Card>
  );
}

export default CaloriesDisplay;
