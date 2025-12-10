import React from 'react';
import weightLossImg from '../../assets/images/weight.png';
import Card from '../common/Card';
import Button from '../common/Button';
import { useTheme } from '../../contexts/ThemeContext';

interface WeightLossDisplayProps {
  formData: {
    WeightLoss: string | number;
    [key: string]: any;
  };
  onNext: () => void;
  onBack: () => void;
}

const WeightLossDisplay: React.FC<WeightLossDisplayProps> = ({ formData, onNext, onBack }) => {
  const { darkMode } = useTheme();
  const { WeightLoss } = formData;

  return (
    <Card
      currentStep={5}
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
        <div className="text-6xl">📉</div>
      </div>

      {/* Title */}
      <h2
        id="weightloss-title"
        className={`text-2xl font-bold text-center mb-2 ${
          darkMode ? 'text-[rgb(248,244,244)]' : 'text-[rgb(24,59,73)]'
        }`}
      >
        You Could Be Losing
        <br />
        <span className="text-[rgb(247,89,80)]">{WeightLoss} lbs / Week</span>
      </h2>
      <p
        className={`text-center font-semibold mb-6 ${
          darkMode ? 'text-[rgb(248,244,244)]' : 'text-[rgb(24,59,73)]'
        }`}
      >
        With the Right Fuel Source
      </p>

      {/* Illustration */}
      <div className="flex justify-center items-center mb-6">
        <img src={weightLossImg} alt="Weight Illustration" />
      </div>

      {/* Description Text */}
      <div className="space-y-4 mb-6 text-left">
        <p className={darkMode ? 'text-[rgb(181,194,201)]' : 'text-[rgb(19,85,111)]'}>
          This is your potential, what your body could lose if it's in fat-burning mode. But that
          depends on getting your metabolism working with you, not against you.
        </p>
        <p className={darkMode ? 'text-[rgb(181,194,201)]' : 'text-[rgb(19,85,111)]'}>
          Low energy, stubborn cravings, and slow progress usually mean your body is still burning
          sugar instead of fat — and that keeps weight loss stuck.
        </p>
        <p className="text-sm text-[rgb(247,89,80)]">
          With your numbers, results could show up even faster than expected, but only if your
          metabolism is dialed in and you're burning fat, not sugar.
        </p>
      </div>
    </Card>
  );
};

export default WeightLossDisplay;
