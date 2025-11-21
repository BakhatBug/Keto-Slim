import React from 'react';
import logo from '../assets/images/ketoslim.png';
import days from '../assets/images/days.png';
import ThemeToggle from './ThemeToggle';

function ResultsTimelineDisplay({ formData, onNext, onBack, darkMode, setDarkMode }) {
    const { DaysToResults } = formData;

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
                        <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                    </div>
                </div>
                {/* Icon */}
                <div className="text-center mb-6">
                    <div className="text-6xl">⏳</div>
                </div>

                {/* Title */}
                <h2 className={`text-2xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
                    You Could See Results in as Little as <span className="text-red-500">{DaysToResults} Days</span>
                </h2>
                <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'} font-semibold mb-6`}>
                    With the Right Fuel Source
                </p>

                {/* Illustration */}
                <div className="flex justify-center items-center mb-6">
                    <img src={days} alt="Days illustration" />
                </div>

                {/* Description Text */}
                <div className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} space-y-4 mb-6 text-left`}>
                    <p className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        Visible change doesn't take forever — when your metabolism shifts, your body can
                        start dropping bloat, water weight, and fat surprisingly fast.
                    </p>
                    <p className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        It's not about how long you try — it's about whether your body's actually set up
                        to change. The wrong plan wastes months.
                    </p>
                    <p className="text-red-500 text-sm">
                        You're already aware — and that's step one. Now imagine pairing that awareness
                        with a plan that shows results in the mirror by day 10.
                    </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-6">
                    <button
                        onClick={onBack}
                        className={`flex-1 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'} text-teal-500 font-semibold py-3 px-6 rounded-lg border-2 border-teal-500 flex items-center justify-center gap-2 transition-colors`}
                    >
                        <span>←</span>
                        Weight Loss
                    </button>
                    <button
                        onClick={onNext}
                        className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        Get Plan
                        <span>→</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResultsTimelineDisplay;
