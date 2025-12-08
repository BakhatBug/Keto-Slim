import React, { useState, useEffect } from 'react';
import logo from '../assets/images/ketoslim.png';
import slim from '../assets/images/slim.webp';
import obesse from '../assets/images/obesse.webp';
import phone from '../assets/images/mobile.webp';
import pmc from '../assets/images/pmc.svg';
import mayo from '../assets/images/mayo.webp';
import stamp from '../assets/images/stamp.png';
import ThemeToggle from './common/ThemeToggle';
import Button from './common/Button';
import ProgressGrid from './sections/ProgressGrid';
import BenefitsChecklist from './sections/BenefitsChecklist';
import ToolsSection from './sections/ToolsSection';
import TrustBadges from './sections/TrustBadges';
import PaymentOptions from './sections/PaymentOptions';
import GuaranteeSection from './sections/GuaranteeSection';
import { useTheme } from '../contexts/ThemeContext';

import { FormData } from '../types';

interface FinalPlanPageProps {
  formData: FormData;
  onRestart: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FinalPlanPage: React.FC<FinalPlanPageProps> = ({ formData, onRestart: _onRestart }) => {
  const { darkMode } = useTheme();
  const { BodyFat: _BodyFat, Gender: _Gender } = formData;
  const [selectedPayment, setSelectedPayment] = useState('1payment');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [showFloatingButton, setShowFloatingButton] = useState(true);

  // Calculate "6 months" body fat (simple estimation)
  // const currentBodyFat = typeof BodyFat === 'string' ? parseFloat(BodyFat) : BodyFat;
  // const _futureBodyFat = Math.max(10, currentBodyFat - 10);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Scroll effect to hide floating button when pricing section is visible or scrolled past
  useEffect(() => {
    const handleScroll = () => {
      const pricingSection = document.querySelector('.pricing-section');
      if (pricingSection) {
        const rect = pricingSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Hide button once pricing section enters viewport and keep it hidden
        const hasPricingSectionBeenReached = rect.top < windowHeight;
        setShowFloatingButton(!hasPricingSectionBeenReached);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <main
        className={`min-h-screen w-full overflow-x-hidden p-3 sm:p-5 md:p-6 transition-colors duration-300 ${darkMode ? 'bg-[#181a1b]' : 'bg-[#f8f4f4]'
          }`}
        role="main"
        aria-label="Your personalized keto plan"
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

        {/* Main Content Card */}
        <article
          className={`rounded-2xl shadow-xl border p-4 sm:p-8 w-full max-w-xl mx-auto flex flex-col items-center mb-6 transition-colors duration-300 ${darkMode
            ? 'bg-[#232627] border-[#2d3133]'
            : 'bg-white border-gray-200'
            }`}
          aria-labelledby="plan-title"
        >
          {/* Icon */}
          <div className="flex justify-center items-center mb-2">
            <span className="text-2xl">🎯</span>
          </div>

          {/* Title */}
          <h2
            className={`text-center text-2xl sm:text-3xl font-bold mb-2 ${darkMode ? 'text-[#e0e6e9]' : 'text-[#183b49]'
              }`}
          >
            Your Personalized
            <br />
            KetoSlim Plan Is Ready
          </h2>

          {/* Before and After Images */}
          <div
            className="relative flex flex-row justify-center items-end gap-18 mb-2 mt-4 w-full min-h-[180px]"
          >
            <img
              alt=""
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50 blur-md select-none"
              loading="eager"
              src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='243.74'%20height='186.983'%20viewBox='0%200%20243.74%20186.983'%3e%3cdefs%3e%3clinearGradient%20id='linear-gradient'%20x1='0.5'%20y1='-0.034'%20x2='0.5'%20y2='1'%20gradientUnits='objectBoundingBox'%3e%3cstop%20offset='0'%20stop-color='%23fff'%20stop-opacity='0'/%3e%3cstop%20offset='0.227'%20stop-color='%23fff'/%3e%3cstop%20offset='0.493'%20stop-color='%23fff'/%3e%3cstop%20offset='0.759'%20stop-color='%23fff'/%3e%3cstop%20offset='1'%20stop-color='%23fff'%20stop-opacity='0'/%3e%3c/linearGradient%3e%3c/defs%3e%3cg%20id='Group_525'%20data-name='Group%20525'%20transform='translate(-66.631%20-171.088)'%3e%3cpath%20id='Path_129'%20data-name='Path%20129'%20d='M8634-1904.912l93.493,93.491L8634-1717.929v-36.984l56.509-56.508L8634-1867.928Z'%20transform='translate(-8494.52%202076)'%20fill='url(%23linear-gradient)'/%3e%3cpath%20id='Path_131'%20data-name='Path%20131'%20d='M8634-1904.912l93.493,93.491L8634-1717.929v-36.984l56.509-56.508L8634-1867.928Z'%20transform='translate(-8567.368%202076)'%20fill='url(%23linear-gradient)'/%3e%3cpath%20id='Path_130'%20data-name='Path%20130'%20d='M8634-1904.912l93.493,93.491L8634-1717.929v-36.984l56.509-56.508L8634-1867.928Z'%20transform='translate(-8417.121%202076)'%20fill='url(%23linear-gradient)'/%3e%3c/g%3e%3c/svg%3e"
              style={{
                filter: 'brightness(0) saturate(100%) invert(23%) sepia(99%) saturate(7497%) hue-rotate(353deg) brightness(101%) contrast(101%)',
              }}
            />
            <img
              alt="Before"
              className="rounded-lg relative z-10"
              width="170"
              height="180"
              loading="lazy"
              src={obesse}
            />
            <img
              alt="After"
              className="rounded-lg relative z-10"
              width="170"
              height="180"
              loading="lazy"
              src={slim}
            />
          </div>

          {/* Now / 6 Months Labels */}
          <div
            className={`flex w-full justify-between items-center mt-2 mb-4 shadow-md rounded-lg py-4 ${darkMode ? 'bg-[#232627]' : 'bg-white'
              }`}
          >
            <div
              className={`w-1/2 text-center font-bold ${darkMode ? 'text-[#e0e6e9]' : 'text-[#183b49]'
                }`}
            >
              Now
            </div>
            <div
              className={`w-1/2 text-center font-bold ${darkMode ? 'text-[#e0e6e9]' : 'text-[#183b49]'
                }`}
            >
              6 Months
            </div>
          </div>

          {/* Progress Comparison */}
          <ProgressGrid />

          {/* Additional Benefits Section */}
          <BenefitsChecklist />

          {/* Tools & Knowledge Section */}
          <ToolsSection phoneImage={phone} />

          {/* Trust Badges */}
          <TrustBadges pmcLogo={pmc} mayoLogo={mayo} />

          {/* Pricing Section - Now inside the same card */}
          <div className="w-full mt-10 pricing-section">
            <h2
              className="text-center text-[22px] sm:text-2xl mb-2 text-[#b5c2c9]"
            >
              3 Month Custom Keto Plan
            </h2>

            {/* Countdown Timer */}
            <div
              className="flex items-center justify-between rounded-lg px-4 py-2 mb-4 bg-[#f75950]"
            >
              <span className="text-white font-medium text-base">Discount expires in:</span>
              <span className="text-white font-bold text-lg flex items-center gap-1">
                {formatTime(timeLeft)}
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="9" stroke="#fff" strokeWidth="2"></circle>
                  <path d="M10 5v5l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round"></path>
                </svg>
              </span>
            </div>

            {/* Payment Options */}
            <PaymentOptions
              selectedPayment={selectedPayment}
              onPaymentChange={setSelectedPayment}
            />

            {/* Guarantee Text */}
            <div className="flex items-center justify-center gap-2 mt-8 mb-4 text-center">
              <span className="text-xs font-medium text-[#b5c2c9]">
                ✅ Risk-Free: Backed by 60-Day Money-Back Guarantee
              </span>
            </div>

            {/* CTA Button */}
            <Button
              variant="primary"
              ariaLabel="Continue to checkout"
              className="py-3 px-8 rounded-lg w-full pointer-events-auto shadow-lg shadow-[rgba(54,188,159,0.1)] self-center"
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
              Continue
            </Button>

            {/* No Thanks Link */}
            <div className="w-full  text-center mt-2">
              <Button
                variant="secondary"
                className="underline text-sm pl-8 text-center mx-auto pointer-events-auto text-black bg-transparent border-none! shadow-none"
              >
                No Thanks, I don't want my plan.
              </Button>
            </div>
          </div>
        </article>

        {/* Money Back Guarantee Section */}
        <GuaranteeSection stampImage={stamp} />
      </main>

      {/* Floating Claim My Plan Button - Outside main so it doesn't appear in guarantee section */}
      {showFloatingButton && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-xl px-4">
          <Button
            onClick={() => {
              const pricingSection = document.querySelector('.pricing-section');
              if (pricingSection) {
                pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            variant="primary"
            ariaLabel="Scroll to plan section"
            className="py-3 px-8 rounded-lg w-full pointer-events-auto shadow-lg shadow-[rgba(54,188,159,0.1)] self-center"
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
            Claim My Plan
          </Button>
        </div>
      )}
    </>
  );
}

export default FinalPlanPage;
