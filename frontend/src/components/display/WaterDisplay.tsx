import React from 'react';
import water_img from '../../assets/images/water.png';
import Card from '../common/Card';
import Button from '../common/Button';
import { useTheme } from '../../contexts/ThemeContext';

interface WaterDisplayProps {
  formData: {
    WaterCups: string | number;
    [key: string]: any;
  };
  onNext: () => void;
  onBack: () => void;
}

const WaterDisplay: React.FC<WaterDisplayProps> = ({ formData, onNext, onBack }) => {
  const { darkMode } = useTheme();
  const { WaterCups } = formData;

  // Determine conditional callout based on water intake
  const getWaterCallout = () => {
    const waterNum = typeof WaterCups === 'string' ? parseInt(WaterCups) : WaterCups;

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
    <Card
      currentStep={4}
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
        <div className="text-6xl">💧</div>
      </div>

      {/* Title */}
      <h2
        id="water-title"
        className={`text-2xl font-bold text-center mb-2 ${
          darkMode ? 'text-[rgb(248,244,244)]' : 'text-[rgb(24,59,73)]'
        }`}
      >
        Your Body Needs 8-9 Cups of Water Daily
      </h2>
      <p
        className={`text-center font-semibold mb-6 ${
          darkMode ? 'text-[rgb(248,244,244)]' : 'text-[rgb(24,59,73)]'
        }`}
      >
        Here's Why That Matters
      </p>

      {/* Illustration */}
      <div className="flex justify-center items-center mb-6">
        <img src={water_img} alt="Water Cups Illustration" />
      </div>

      {/* Description Text */}
      <div className="space-y-4 mb-6 text-left">
        <p className={darkMode ? 'text-[rgb(181,194,201)]' : 'text-[rgb(19,85,111)]'}>
          Hydration is a fat-burning multiplier. Without enough water, your body holds onto toxins,
          slows digestion, and burns fat less efficiently.
        </p>
        <p className={darkMode ? 'text-[rgb(181,194,201)]' : 'text-[rgb(19,85,111)]'}>
          Even mild dehydration can feel like fatigue, hunger, or sugar cravings. You're not lazy —
          you're likely underhydrated.
        </p>
        <p className="text-sm text-[rgb(247,89,80)]">{getWaterCallout()}</p>
      </div>
    </Card>
  );
};

export default WaterDisplay;
