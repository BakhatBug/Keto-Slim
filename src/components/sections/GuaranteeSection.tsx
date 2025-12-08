import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface GuaranteeSectionProps {
  stampImage: string;
}

const GuaranteeSection: React.FC<GuaranteeSectionProps> = ({ stampImage }) => {
  const { darkMode } = useTheme();
  return (
    <div id="guarantee-section" className="w-full flex justify-center px-3 sm:px-5 md:px-6">
      <div className="w-full max-w-xl flex flex-col gap-2 mt-8 px-4 sm:px-8">
        <div className="flex items-center gap-4 mb-2">
          <h3
            className={`font-bold text-4xl sm:text-5xl flex-1 ${darkMode ? 'text-[#b5c2c9]' : 'text-[#183b49]'
              }`}
          >
            Money Back Guarantee
          </h3>
          <img alt="60 Day Money Back Guarantee" className="w-26 h-26" src={stampImage} />
        </div>

        <p
          className={`text-base mb-2 ${darkMode ? 'text-[#b5c2c9]' : 'text-[#183b49]'
            }`}
        >
          We are confident with our service quality and its results. So, if you are ready to reach
          your goals, it's a risk-free offer.
        </p>

        <p
          className={`text-base mb-2 ${darkMode ? 'text-[#b5c2c9]' : 'text-[#183b49]'
            }`}
        >
          We guarantee you'll see visible results or you'll receive a full refund within 60 days
          after your purchase.
        </p>

        <p
          className={`text-sm mb-2 ${darkMode ? 'text-[#b5c2c9]' : 'text-[#183b49]'
            }`}
        >
          By continuing, you represent that you are over 18 years of age and agree if for whatever
          reason you're unhappy with your plan to contact customer support for a refund.
        </p>

        <p
          className={`text-sm mb-2 ${darkMode ? 'text-[#b5c2c9]' : 'text-[#183b49]'
            }`}
        >
          You will only be charged $67 today for your first quarter (details above)
        </p>

        <p
          className={`text-sm mb-3 ${darkMode ? 'text-[#b5c2c9]' : 'text-[#183b49]'
            }`}
        >
          Your introductory period will last until Aug 27, 2025. You may cancel at any time before
          Aug 27, 2025, and you will not be charged.
        </p>

        <p
          className={`text-sm mb-2 ${darkMode ? 'text-[#b5c2c9]' : 'text-[#183b49]'
            }`}
        >
          If you don't cancel, KetoSlim will automatically continue your membership at the end of
          your introductory period and charge the membership fee of{' '}
          <span className="font-bold">$67 quarterly</span> until you cancel.
        </p>

        <p
          className={`text-sm mb-2 ${darkMode ? 'text-[#b5c2c9]' : 'text-[#183b49]'
            }`}
        >
          Your subscription will be bound by our{' '}
          <a href="#" className="underline font-medium text-[#f75950]">
            Terms and Privacy Policy
          </a>
          .
        </p>

        <p
          className={`text-sm ${darkMode ? 'text-[#b5c2c9]' : 'text-[#183b49]'
            }`}
        >
          If you would like a refund for any reason call{' '}
          <a
            href="tel:1-800-695-5045"
            className="underline font-medium text-[#f75950]"
          >
            1-800-695-5045
          </a>{' '}
          or email{' '}
          <a
            href="mailto:support@myketoslim.com"
            className="underline font-medium text-[#f75950]"
          >
            support@myketoslim.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default GuaranteeSection;
