import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../contexts/ThemeContext.jsx';

function PaymentOptions({ selectedPayment, onPaymentChange }) {
  const { darkMode } = useTheme();
  return (
    <div className="flex flex-col gap-3">
      {/* 3 Payments Option */}
      <div
        className="border-2 rounded-xl p-4 flex items-center justify-between cursor-pointer transition"
        style={{
          borderColor:
            selectedPayment === '3payments'
              ? 'rgb(54, 188, 159)'
              : darkMode
                ? 'rgb(45, 49, 51)'
                : 'rgb(229, 231, 235)',
          background:
            selectedPayment === '3payments'
              ? darkMode
                ? 'rgb(24, 26, 27)'
                : 'rgb(255, 255, 255)'
              : darkMode
                ? 'rgb(35, 38, 39)'
                : 'rgb(255, 255, 255)',
        }}
        onClick={() => onPaymentChange('3payments')}
      >
        <div>
          <div
            className="font-bold text-base mb-1"
            style={{ color: darkMode ? 'rgb(181, 194, 201)' : 'rgb(24, 59, 73)' }}
          >
            3 PAYMENTS OF $29
          </div>
          <div
            className="text-sm leading-tight"
            style={{ color: darkMode ? 'rgb(181, 194, 201)' : 'rgb(24, 59, 73)' }}
          >
            Just $29 today. Split the rest
            <br />
            over 2 easy payments.
          </div>
        </div>
        <span className="ml-4 flex items-center justify-center">
          <span
            className="w-8 h-8 border-2 rounded-full flex items-center justify-center"
            style={{
              borderColor:
                selectedPayment === '3payments'
                  ? 'rgb(54, 188, 159)'
                  : darkMode
                    ? 'rgb(45, 49, 51)'
                    : 'rgb(229, 231, 235)',
              background:
                selectedPayment === '3payments'
                  ? 'rgb(54, 188, 159)'
                  : darkMode
                    ? 'rgb(35, 38, 39)'
                    : 'rgb(255, 255, 255)',
            }}
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
        className="relative border-2 rounded-xl p-4 flex items-center justify-between cursor-pointer transition"
        style={{
          borderColor:
            selectedPayment === '1payment'
              ? 'rgb(54, 188, 159)'
              : darkMode
                ? 'rgb(45, 49, 51)'
                : 'rgb(229, 231, 235)',
          background:
            selectedPayment === '1payment'
              ? darkMode
                ? 'rgb(24, 26, 27)'
                : 'rgb(255, 255, 255)'
              : darkMode
                ? 'rgb(35, 38, 39)'
                : 'rgb(255, 255, 255)',
        }}
        onClick={() => onPaymentChange('1payment')}
      >
        <div className="flex-1 relative">
          <span
            className="absolute"
            style={{
              top: '-16px',
              right: '-64px',
              background: 'rgb(54, 188, 159)',
              color: 'rgb(24, 26, 27)',
              fontWeight: 700,
              fontSize: '16px',
              border: '2px solid rgb(54, 188, 159)',
              borderTopRightRadius: '10px',
              borderBottomLeftRadius: '10px',
              padding: '4px 16px',
              zIndex: 10,
              boxShadow: 'rgba(54, 188, 159, 0.1) 0px 2px 8px 0px',
              letterSpacing: '1px',
            }}
          >
            23% OFF
          </span>
          <div className="flex items-center gap-2 mb-1 mt-2">
            <span
              className="text-white text-xs font-bold px-2 py-1 rounded"
              style={{ background: 'rgb(247, 89, 80)' }}
            >
              DISCOUNT
            </span>
          </div>
          <div
            className="font-medium text-base mb-6"
            style={{ color: darkMode ? 'rgb(181, 194, 201)' : 'rgb(24, 59, 73)' }}
          >
            1 Payment of $67. Pay in full today
            <br />
            and save $20 instantly.
          </div>
        </div>
        <span className="ml-4 flex items-center justify-center">
          <span
            className="w-8 h-8 border-2 rounded-full flex items-center justify-center"
            style={{
              borderColor:
                selectedPayment === '1payment'
                  ? 'rgb(54, 188, 159)'
                  : darkMode
                    ? 'rgb(45, 49, 51)'
                    : 'rgb(229, 231, 235)',
              background:
                selectedPayment === '1payment'
                  ? 'rgb(54, 188, 159)'
                  : darkMode
                    ? 'rgb(35, 38, 39)'
                    : 'rgb(255, 255, 255)',
            }}
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
          className="absolute left-0 right-0 bottom-0 text-black text-xs font-bold px-4 py-1 rounded-b-xl shadow flex justify-center items-center"
          style={{
            background: 'rgb(54, 188, 159)',
            color: 'rgb(24, 26, 27)',
            letterSpacing: '1px',
            borderTop: '1px solid rgb(54, 188, 159)',
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
            width: '100%',
            marginTop: '10px',
          }}
        >
          MOST POPULAR
        </span>
      </div>
    </div>
  );
}

PaymentOptions.propTypes = {
  selectedPayment: PropTypes.string.isRequired,
  onPaymentChange: PropTypes.func.isRequired,
};

export default PaymentOptions;
