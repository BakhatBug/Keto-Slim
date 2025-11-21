import React from 'react';
import logo from '../assets/images/ketoslim.png';
import cardLady from '../assets/images/car2_lad.png';
import ThemeToggle from './ThemeToggle';

function BMIDisplay({ formData, onNext, onBack, darkMode, setDarkMode }) {
    const { BMI } = formData;

    // Determine conditional callout based on BMI
    const getBMICallout = () => {
        const bmiNum = parseFloat(BMI);
        
        if (bmiNum < 26) {
            return "You're right on the edge — just a few small shifts could unlock better energy and faster fat-burning.";
        } else if (bmiNum >= 30 && bmiNum <= 34.9) {
            return "At this level, your body may be under more strain than you realize — from hormone balance to inflammation and recovery.";
        } else if (bmiNum >= 35) {
            return "This BMI range often comes with deeper challenges, like insulin resistance and chronic fatigue — but with the right plan, you can absolutely turn things around.";
        }
        return "You're right on the edge — just a few small shifts could unlock better energy and faster fat-burning.";
    };

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
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    </div>
                </div>
                {/* Icon */}
                <div className="text-center mb-6">
                    <div className="text-6xl">📊</div>
                </div>

                {/* Title */}
                <h2 className={`text-4xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
                    Your BMI Is {BMI}
                </h2>
                <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'} font-semibold mb-6`}>
                    — What That Means
                </p>

                {/* Illustration */}
                <div className="flex justify-center items-center gap-6 mb-6">
                    <img src={cardLady} alt="BMI Illustration" />
                </div>

                {/* Description Text */}
                <div className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} space-y-4 mb-6 text-left`}>
                    <p className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        BMI (Body Mass Index) is a quick way to estimate how your weight 
                        might affect your health based on your height and weight.
                    </p>
                    <p className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        When your BMI is too high, your body may store more fat than it uses. 
                        That can slow your metabolism, drain your energy, and make fat loss 
                        harder — even if you're putting in effort.
                    </p>
                    <p className="text-red-500 text-sm">
                        {getBMICallout()}
                    </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-6">
                    <button
                        onClick={onBack}
                        className={`flex-1 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'} text-teal-500 font-semibold py-3 px-6 rounded-lg border-2 border-teal-500 flex items-center justify-center gap-2 transition-colors`}
                    >
                        <span>←</span>
                        Body Fat %
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

export default BMIDisplay;
