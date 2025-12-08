import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface PaymentOptionsProps {
  selectedPayment: string;
  onPaymentChange: (payment: string) => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ selectedPayment, onPaymentChange }) => {
  const { darkMode } = useTheme();
  return (
    <div className="flex flex-col gap-3">
      {/* 3 Payments Option */}
      <div
        className={`border-2 rounded-xl p-4 flex items-center justify-between cursor-pointer transition ${selectedPayment === '3payments'
            ? 'border-[#36bc9f]'
            : darkMode
              ? 'border-[#2d3133]'
              : 'border-gray-200'
          } ${selectedPayment === '3payments'
            ? darkMode
              ? 'bg-[#181a1b]'
              : 'bg-white'
            : darkMode
              ? 'bg-[#232627]'
              : 'bg-white'
          }`}
        onClick={() => onPaymentChange('3payments')}
      >
        <div>
          <div
            className={`font-bold text-base mb-1 ${darkMode ? 'text-[#b5c2c9]' : 'text-[#183b49]'
              }`}
          >
            3 PAYMENTS OF $29
          </div>
          <div
            className={`text-sm leading-tight ${darkMode ? 'text-[#b5c2c9]' : 'text-[#183b49]'
              }`}
          >
            Just $29 today. Split the rest
            <br />
            over 2 easy payments.
          </div>
        </div>
        <span className="ml-4 flex items-center justify-center">
          <span
            className={`w-8 h-8 border-2 rounded-full flex items-center justify-center ${selectedPayment === '3payments'
                ? 'border-[#36bc9f] bg-[#36bc9f]'
                : darkMode
                  ? 'border-[#2d3133] bg-[#232627]'
                  : 'border-gray-200 bg-white'
              }`}
          >
            {selectedPayment === '3payments' && (
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="13" fill="#36BC9F"></circle>
                <path
                  d="M9 15.5l4 4 6-8"
                  stroke="#fff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            )}
          </span>
        </span>
      </div>

      {/* 1 Payment Option */}
      <div
        className={`relative border-2 rounded-xl p-4 flex items-center justify-between cursor-pointer transition ${selectedPayment === '1payment'
            ? 'border-[#36bc9f]'
            : darkMode
              ? 'border-[#2d3133]'
              : 'border-gray-200'
          } ${selectedPayment === '1payment'
            ? darkMode
              ? 'bg-[#181a1b]'
              : 'bg-white'
            : darkMode
              ? 'bg-[#232627]'
              : 'bg-white'
          }`}
        onClick={() => onPaymentChange('1payment')}
      >
        <div className="flex-1 relative">
          <span
            className="absolute -top-4 -right-16 bg-[#36bc9f] text-[#181a1b] font-bold text-base border-2 border-[#36bc9f] rounded-tr-[10px] rounded-bl-[10px] px-4 py-1 z-10 shadow-[0_2px_8px_rgba(54,188,159,0.1)] tracking-wider"
          >
            23% OFF
          </span>
          <div className="flex items-center gap-2 mb-1 mt-2">
            <span
              className="text-white text-xs font-bold px-2 py-1 rounded bg-[#f75950]"
            >
              DISCOUNT
            </span>
          </div>
          <div
            className={`font-medium text-base mb-6 ${darkMode ? 'text-[#b5c2c9]' : 'text-[#183b49]'
              }`}
          >
            1 Payment of $67. Pay in full today
            <br />
            and save $20 instantly.
          </div>
        </div>
        <span className="ml-4 flex items-center justify-center">
          <span
            className={`w-8 h-8 border-2 rounded-full flex items-center justify-center ${selectedPayment === '1payment'
                ? 'border-[#36bc9f] bg-[#36bc9f]'
                : darkMode
                  ? 'border-[#2d3133] bg-[#232627]'
                  : 'border-gray-200 bg-white'
              }`}
          >
            {selectedPayment === '1payment' && (
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="13" fill="#36BC9F"></circle>
                <path
                  d="M9 15.5l4 4 6-8"
                  stroke="#fff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            )}
          </span>
        </span>
        <span
          className="absolute left-0 right-0 bottom-0 text-[#181a1b] text-xs font-bold px-4 py-1 rounded-b-xl shadow flex justify-center items-center bg-[#36bc9f] tracking-wider border-t border-[#36bc9f] rounded-bl-[10px] rounded-br-[10px] w-full mt-2.5"
        >
          MOST POPULAR
        </span>
      </div>
    </div>
  );
}

export default PaymentOptions;
