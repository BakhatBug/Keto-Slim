import React from 'react';
import days from '../../assets/images/days.png';
import Card from '../common/Card';
import Button from '../common/Button';
import { useTheme } from '../../contexts/ThemeContext';

interface ResultsTimelineDisplayProps {
  formData: {
    DaysToResults: string | number;
    [key: string]: any;
  };
  onNext: () => void;
  onBack: () => void;
}

const ResultsTimelineDisplay: React.FC<ResultsTimelineDisplayProps> = ({
  formData,
  onNext,
  onBack,
}) => {
  const { darkMode } = useTheme();
  const { DaysToResults } = formData;

  return (
    <Card
      currentStep={6}
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
        <div className="text-6xl">⏳</div>
      </div>

      {/* Title */}
      <h2
        id="timeline-title"
        className={`text-4xl font-bold text-center mb-2 ${
          darkMode ? 'text-[rgb(248,244,244)]' : 'text-[rgb(24,59,73)]'
        }`}
      >
        You Could See Results in as Little as {DaysToResults} Days
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
        <img src={days} alt="Days illustration" />
      </div>

      {/* Description Text */}
      <div className="space-y-4 mb-6 text-left">
        <p className={darkMode ? 'text-[rgb(181,194,201)]' : 'text-[rgb(19,85,111)]'}>
          Visible change doesn't take forever — when your metabolism shifts, your body can start
          dropping bloat, water weight, and fat surprisingly fast.
        </p>
        <p className={darkMode ? 'text-[rgb(181,194,201)]' : 'text-[rgb(19,85,111)]'}>
          It's not about how long you try — it's about whether your body's actually set up to
          change. The wrong plan wastes months.
        </p>
        <p className="text-sm text-[rgb(247,89,80)]">
          You're already aware — and that's step one. Now imagine pairing that awareness with a plan
          that shows results in the mirror by day 10.
        </p>
      </div>
    </Card>
  );
};

export default ResultsTimelineDisplay;
