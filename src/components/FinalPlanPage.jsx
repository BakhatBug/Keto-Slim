import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/images/ketoslim.png';
import slim from '../assets/images/slim.webp';
import obesse from '../assets/images/obesse.webp';
import phone from '../assets/images/mobile.webp';
import pmc from '../assets/images/pmc.svg';
import mayo from '../assets/images/mayo.webp';
import stamp from '../assets/images/stamp.png';
import ThemeToggle from './ThemeToggle';
import ProgressGrid from './ProgressGrid';
import BenefitsChecklist from './BenefitsChecklist';
import ToolsSection from './ToolsSection';
import TrustBadges from './TrustBadges';
import PaymentOptions from './PaymentOptions';
import GuaranteeSection from './GuaranteeSection';
import { useTheme } from '../contexts/ThemeContext.jsx';

function FinalPlanPage({ formData, onRestart }) {
  const { darkMode } = useTheme();
  const { BodyFat, Gender } = formData;
  const [selectedPayment, setSelectedPayment] = useState('1payment');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [showFloatingButton, setShowFloatingButton] = useState(true);

  // Calculate "6 months" body fat (simple estimation)
  const currentBodyFat = parseFloat(BodyFat);
  const futureBodyFat = Math.max(10, currentBodyFat - 10);

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
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <main
        className="min-h-screen w-full overflow-x-hidden p-3 sm:p-5 md:p-6 transition-colors duration-300"
        role="main"
        aria-label="Your personalized keto plan"
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

        {/* Main Content Card */}
        <article
          className="rounded-2xl shadow-xl border p-4 sm:p-8 w-full max-w-xl mx-auto flex flex-col items-center mb-6 card-transition"
          aria-labelledby="plan-title"
          style={{
            background: darkMode ? 'rgb(35, 38, 39)' : 'rgb(255, 255, 255)',
            borderColor: darkMode ? 'rgb(45, 49, 51)' : 'rgb(229, 231, 235)',
          }}
        >
          {/* Icon */}
          <div className="flex justify-center items-center mb-2">
            <span className="text-2xl">🎯</span>
          </div>

          {/* Title */}
          <h2
            className="text-center text-2xl sm:text-3xl font-bold mb-2"
            style={{ color: darkMode ? 'rgb(224, 230, 233)' : 'rgb(24, 59, 73)' }}
          >
            Your Personalized
            <br />
            KetoSlim Plan Is Ready
          </h2>

          {/* Before/After Images */}
          <div
            className="relative flex flex-row justify-center items-end gap-18 mb-2 mt-4 w-full"
            style={{ minHeight: '180px' }}
          >
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
            className="flex w-full justify-between items-center mt-2 mb-4 shadow-md rounded-lg py-4"
            style={{ background: darkMode ? 'rgb(35, 38, 39)' : 'rgb(255, 255, 255)' }}
          >
            <div
              className="w-1/2 text-center font-bold"
              style={{ color: darkMode ? 'rgb(224, 230, 233)' : 'rgb(24, 59, 73)' }}
            >
              Now
            </div>
            <div
              className="w-1/2 text-center font-bold"
              style={{ color: darkMode ? 'rgb(224, 230, 233)' : 'rgb(24, 59, 73)' }}
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
              className="text-center text-[22px] sm:text-2xl mb-2"
              style={{ color: 'rgb(181, 194, 201)' }}
            >
              3 Month Custom Keto Plan
            </h2>

            {/* Countdown Timer */}
            <div
              className="flex items-center justify-between rounded-lg px-4 py-2 mb-4"
              style={{ background: 'rgb(247, 89, 80)' }}
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
              <span className="text-xs font-medium" style={{ color: 'rgb(181, 194, 201)' }}>
                ✅ Risk-Free: Backed by 60-Day Money-Back Guarantee
              </span>
            </div>

            {/* CTA Button */}
            <button
              className="font-bold py-3 px-8 rounded-lg flex items-center justify-center transition w-full relative pointer-events-auto shadow-lg cursor-pointer"
              aria-label="Continue to checkout"
              style={{
                background: 'rgb(54, 188, 159)',
                color: 'rgb(255, 255, 255)',
                boxShadow: 'rgba(54, 188, 159, 0.1) 0px 2px 8px 0px',
                alignSelf: 'center',
              }}
            >
              <span className="mx-auto">Continue</span>
              <span className="absolute right-6 text-lg">
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
                  style={{ color: 'rgb(255, 255, 255)' }}
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </button>

            {/* No Thanks Link */}
            <div className="w-full text-center mt-2">
              <button
                className="underline text-base font-medium cursor-pointer"
                type="button"
                style={{ pointerEvents: 'auto', color: 'rgb(248, 244, 244)' }}
              >
                No Thanks, I don't want my plan.
              </button>
            </div>
          </div>
        </article>

        {/* Money Back Guarantee Section */}
        <GuaranteeSection stampImage={stamp} />
      </main>

      {/* Floating Claim My Plan Button - Outside main so it doesn't appear in guarantee section */}
      {showFloatingButton && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-xl px-4">
          <button
            onClick={() => {
              const pricingSection = document.querySelector('.pricing-section');
              if (pricingSection) {
                pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="font-bold py-3 px-8 rounded-lg flex items-center justify-center transition w-full relative pointer-events-auto shadow-lg cursor-pointer"
            aria-label="Scroll to plan section"
            style={{
              background: 'rgb(54, 188, 159)',
              color: 'rgb(255, 255, 255)',
              boxShadow: 'rgba(54, 188, 159, 0.1) 0px 2px 8px 0px',
              alignSelf: 'center',
            }}
          >
            <span className="mx-auto">Claim My Plan</span>
            <span className="absolute right-6 text-lg">
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
                style={{ color: 'rgb(255, 255, 255)' }}
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </button>
        </div>
      )}
    </>
  );
}

FinalPlanPage.propTypes = {
  formData: PropTypes.shape({
    BodyFat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    Gender: PropTypes.string.isRequired,
  }).isRequired,
  onRestart: PropTypes.func.isRequired,
};

export default FinalPlanPage;
