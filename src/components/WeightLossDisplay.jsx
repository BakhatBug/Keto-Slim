import React from 'react';
import logo from '../assets/images/ketoslim.png';
import weight from '../assets/images/weight.png';
import ThemeToggle from './ThemeToggle';

function WeightLossDisplay({ formData, onNext, onBack, darkMode, setDarkMode }) {
    const { WeightLoss } = formData;

    return (
        <div className={`min-h-screen w-full ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} p-5 transition-colors duration-300`}>
            {/* Theme Toggle */}
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            
            {/* Header */}
            <div className="text-center mb-8">
                <img src={logo} alt="Keto Slim Logo" className="w-32 h-10 mx-auto my-4" />
            </div>

            {/* Main Content Card */}
            <div className={`max-w-md mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8 transition-colors duration-300 card-transition`}>
                {/* Progress Indicator */}
                <div className="flex justify-between items-center mb-8">
                    <span className={`${darkMode ? 'text-teal-400' : 'text-teal-500'} font-semibold`}>Your Results</span>
                    <div className="flex flex-row items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                        <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                        <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                        <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                        <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    </div>
                </div>
                {/* Icon */}
                <div className="text-center mb-6">
                    <div className="text-6xl">📉</div>
                </div>

                {/* Title */}
                <h2 className={`text-2xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
                    You Could Be Losing <span className="text-red-500">{WeightLoss} lbs / Week</span>
                </h2>
                <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-800'} font-semibold mb-6`}>
                    With the Right Fuel Source
                </p>

                {/* Illustration */}
                <div className="flex justify-center items-center mb-6">
                    <img src={weight} alt="Weight Illustration" />
                </div>

                {/* Description Text */}
                <div className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} space-y-4 mb-6 text-left`}>
                    <p className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        This is your potential, what your body could lose if it's in fat-burning mode.
                        But that depends on getting your metabolism working with you, not against you.
                    </p>
                    <p className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        Low energy, stubborn cravings, and slow progress usually mean your body is
                        still burning sugar instead of fat — and that keeps weight loss stuck.
                    </p>
                    <p className="text-red-500 text-sm">
                        With your numbers, results could show up even faster than expected, but only
                        if your metabolism is dialed in and you're burning fat, not sugar.
                    </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-6">
                    <button
                        onClick={onBack}
                        className={`flex-1 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'} text-teal-500 font-semibold py-3 px-6 rounded-lg border-2 border-teal-500 flex items-center justify-center gap-2 transition-colors`}
                    >
                        <span>←</span>
                        Hydration
                    </button>
                    <button
                        onClick={onNext}
                        className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        Next
                        <span>→</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WeightLossDisplay;
