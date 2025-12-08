import React from 'react';
import result1 from '../../assets/images/result1.png';
import Card from '../common/Card';
import Button from '../common/Button';
import { useTheme } from '../../contexts/ThemeContext';

interface ResultsDisplayProps {
  formData: {
    BodyFat: string | number;
    Gender: string;
    [key: string]: any;
  };
  onNext: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ formData, onNext }) => {
  const { darkMode } = useTheme();
  const { BodyFat, Gender } = formData;

  // Determine conditional callout based on body fat percentage and gender
  const getBodyFatCallout = () => {
    const bodyFatNum = typeof BodyFat === 'string' ? parseFloat(BodyFat) : BodyFat;
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
    <Card
      currentStep={1}
      totalSteps={6}
      progressLabel="Your Results"
      showLogo={true}
      showProgress={true}
      showHeader={true}
      wrapperClassName=""
      className=""
      afterCard={
        <div className="max-w-lg mx-auto w-full flex justify-end mb-6">
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
      <div className="flex justify-center items-center mb-2">
        <span className="text-[34px]">⚖️</span>
      </div>

      {/* Title */}
      <h1
        className={`text-center text-[34px] leading-[1.2em] font-semibold font-inter mb-1 ${darkMode ? 'text-[rgb(248,244,244)]' : 'text-[rgb(24,59,73)]'
          }`}
      >
        Your Body Fat
        <br />
        <span>
          Percentage Is <span className="text-(--accent2)">{BodyFat}%</span>
        </span>
      </h1>

      <h2
        className={`text-center text-[20px] font-semibold font-inter mb-2 ${darkMode ? 'text-[rgb(248,244,244)]' : 'text-[rgb(24,59,73)]'
          }`}
      >
        Here's Why That Matters
      </h2>

      {/* Image */}
      <div className="flex flex-row justify-center items-center gap-4 mb-4 relative">
        <img
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 w-[200px] h-[200px] object-contain blur-xs invert-23 sepia-99 saturate-7497 hue-rotate-353 brightness-101 contrast-101 opacity-70"
          loading="eager"
          src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='243.74'%20height='186.983'%20viewBox='0%200%20243.74%20186.983'%3e%3cdefs%3e%3clinearGradient%20id='linear-gradient'%20x1='0.5'%20y1='-0.034'%20x2='0.5'%20y2='1'%20gradientUnits='objectBoundingBox'%3e%3cstop%20offset='0'%20stop-color='%23fff'%20stop-opacity='0'/%3e%3cstop%20offset='0.227'%20stop-color='%23fff'/%3e%3cstop%20offset='0.493'%20stop-color='%23fff'/%3e%3cstop%20offset='0.759'%20stop-color='%23fff'/%3e%3cstop%20offset='1'%20stop-color='%23fff'%20stop-opacity='0'/%3e%3c/linearGradient%3e%3c/defs%3e%3cg%20id='Group_525'%20data-name='Group%20525'%20transform='translate(-66.631%20-171.088)'%3e%3cpath%20id='Path_129'%20data-name='Path%20129'%20d='M8634-1904.912l93.493,93.491L8634-1717.929v-36.984l56.509-56.508L8634-1867.928Z'%20transform='translate(-8494.52%202076)'%20fill='url(%23linear-gradient)'/%3e%3cpath%20id='Path_131'%20data-name='Path%20131'%20d='M8634-1904.912l93.493,93.491L8634-1717.929v-36.984l56.509-56.508L8634-1867.928Z'%20transform='translate(-8567.368%202076)'%20fill='url(%23linear-gradient)'/%3e%3cpath%20id='Path_130'%20data-name='Path%20130'%20d='M8634-1904.912l93.493,93.491L8634-1717.929v-36.984l56.509-56.508L8634-1867.928Z'%20transform='translate(-8417.121%202076)'%20fill='url(%23linear-gradient)'/%3e%3c/g%3e%3c/svg%3e"
        />
        <img
          src={result1}
          alt="Muscle Mass"
          className="rounded-lg relative w-auto h-auto z-1"
          loading="eager"
        />
      </div>

      {/* Description Text */}
      <p
        className={`text-[20px] font-normal font-inter mb-2 ${darkMode ? 'text-[rgb(181,194,201)]' : 'text-[rgb(19,85,111)]'
          }`}
      >
        Your body fat percentage gives a clearer picture than BMI alone. It tells us how much of
        your body is lean mass (muscle, organs, bone) vs stored fat.
        <br />
        <br />
        Too much stored fat doesn't just affect how you look — it impacts your energy, hormone
        balance, and ability to burn fat efficiently.
      </p>

      <p className="text-[16px] font-normal font-inter mt-2 mb-6 text-[rgb(247,89,80)]">
        {getBodyFatCallout()}
      </p>
    </Card>
  );
}

export default ResultsDisplay;
