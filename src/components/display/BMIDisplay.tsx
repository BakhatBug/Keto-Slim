import React from 'react';
import cardLady from '../../assets/images/car2_lad.png';
import Card from '../common/Card';
import Button from '../common/Button';
import { useTheme } from '../../contexts/ThemeContext';

interface BMIDisplayProps {
  formData: {
    BMI: string | number;
    [key: string]: any; // Allow other properties
  };
  onNext: () => void;
  onBack: () => void;
}

const BMIDisplay: React.FC<BMIDisplayProps> = ({ formData, onNext, onBack }) => {
  const { darkMode } = useTheme();
  const { BMI } = formData;

  // Determine conditional callout based on BMI
  const getBMICallout = () => {
    const bmiNum = typeof BMI === 'string' ? parseFloat(BMI) : BMI;

    if (bmiNum < 26) {
      return "You're right on the edge — just a few small shifts could unlock better energy and faster fat-burning.";
    } else if (bmiNum >= 30 && bmiNum <= 34.9) {
      return 'At this level, your body may be under more strain than you realize — from hormone balance to inflammation and recovery.';
    } else if (bmiNum >= 35) {
      return 'This BMI range often comes with deeper challenges, like insulin resistance and chronic fatigue — but with the right plan, you can absolutely turn things around.';
    }
    return "You're right on the edge — just a few small shifts could unlock better energy and faster fat-burning.";
  };

  return (
    <Card
      currentStep={2}
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
        <div className="text-6xl">📊</div>
      </div>

      {/* Title */}
      <h2
        className={`text-4xl font-bold text-center mb-2 ${darkMode ? 'text-[rgb(248,244,244)]' : 'text-[rgb(24,59,73)]'
          }`}
      >
        Your BMI Is {BMI}
      </h2>
      <p
        className={`text-center font-semibold mb-6 ${darkMode ? 'text-[rgb(248,244,244)]' : 'text-[rgb(24,59,73)]'
          }`}
      >
        — What That Means
      </p>

      {/* Illustration */}
      <div className="flex justify-center items-center gap-6 mb-6">
        <img src={cardLady} alt="BMI Illustration" />
      </div>

      {/* Description Text */}
      <div className="space-y-4 mb-6 text-left">
        <p className={darkMode ? 'text-[rgb(181,194,201)]' : 'text-[rgb(19,85,111)]'}>
          BMI (Body Mass Index) is a quick way to estimate how your weight might affect your
          health based on your height and weight.
        </p>
        <p className={darkMode ? 'text-[rgb(181,194,201)]' : 'text-[rgb(19,85,111)]'}>
          When your BMI is too high, your body may store more fat than it uses. That can slow your
          metabolism, drain your energy, and make fat loss harder — even if you're putting in
          effort.
        </p>
        <p className="text-sm text-[rgb(247,89,80)]">
          {getBMICallout()}
        </p>
      </div>
    </Card>
  );
}

export default BMIDisplay;
