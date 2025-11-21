import React from 'react';
import logo from '../assets/images/ketoslim.png';
import water_img from '../assets/images/water.png';
import ThemeToggle from './ThemeToggle';

function WaterDisplay({ formData, onNext, onBack, darkMode, setDarkMode }) {
    const { WaterCups } = formData;

    // Determine conditional callout based on water intake
    const getWaterCallout = () => {
        const waterNum = parseInt(WaterCups);
        
        if (waterNum > 6) {
            return "Drinking over 6 glasses a day? Nice work — your hydration game is strong. Keep it up to support optimal fat loss, steady energy, and fewer cravings.";
        } else if (waterNum >= 2 && waterNum <= 6) {
            return "Drinking 2-6 glasses means you're getting closer! Just a few more sips each day could make a real difference in your metabolism and how you feel overall.";
        } else if (waterNum === 2) {
            return "Drinking about 2 glasses per day is a great start, but your body is likely still running dry. Upping your intake can improve digestion, curb cravings, and help you burn fat more efficiently.";
        } else if (waterNum === 1) {
            return "Only Drinking Coffee or Tea? Caffeine doesn't hydrate — in fact, it can dehydrate you. Adding just a few glasses of water each day could dramatically boost your energy and fat-burning.";
        }
        return "Drinking 2-6 glasses means you're getting closer! Just a few more sips each day could make a real difference in your metabolism and how you feel overall.";
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
                        <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                        <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    </div>
                </div>
                {/* Icon */}
                <div className="text-center mb-6">
                    <div className="text-6xl">💧</div>
                </div>

                {/* Title */}
                <h2 className={`text-2xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
                    Your Body Needs 8-9 Cups of Water Daily
                </h2>
                <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'} font-semibold mb-6`}>
                    Here's Why That Matters
                </p>

                {/* Illustration */}
                <div className="flex justify-center items-center mb-6">
                    <img src={water_img} alt="Water Cups Illustration" />
                </div>

                {/* Description Text */}
                <div className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} space-y-4 mb-6 text-left`}>
                    <p className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        Hydration is a fat-burning multiplier. Without enough water, your body holds 
                        onto toxins, slows digestion, and burns fat less efficiently.
                    </p>
                    <p className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        Even mild dehydration can feel like fatigue, hunger, or sugar cravings. 
                        You're not lazy — you're likely underhydrated.
                    </p>
                    <p className="text-red-500 text-sm">
                        {getWaterCallout()}
                    </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-6">
                    <button
                        onClick={onBack}
                        className={`flex-1 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'} text-teal-500 font-semibold py-3 px-6 rounded-lg border-2 border-teal-500 flex items-center justify-center gap-2 transition-colors`}
                    >
                        <span>←</span>
                        Caloric Intake
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

export default WaterDisplay;
