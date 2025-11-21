import React from 'react';
import cardLady from '../assets/images/card_lady.webp';
import logo from '../assets/images/ketoslim.png';
import ThemeToggle from './ThemeToggle.jsx';

function ResultsDisplay({ formData, onNext, darkMode, setDarkMode }) {
    const { BodyFat, Gender } = formData;

    // Determine conditional callout based on body fat percentage and gender
    const getBodyFatCallout = () => {
        const bodyFatNum = parseFloat(BodyFat);
        const isMale = Gender === 'male';
        
        if (isMale) {
            if (bodyFatNum < 24) {
                return "Your current level may be slowing metabolism, increasing inflammation, or making it harder to stay consistent with workouts.";
            } else if (bodyFatNum >= 25 && bodyFatNum <= 31) {
                return "Your current level may be slowing metabolism, increasing inflammation, or making it harder to stay consistent with workouts.";
            } else if (bodyFatNum >= 32) {
                return "At this level, your body may be stuck in a constant state of inflammation and energy imbalance — making fat loss harder, appetite less predictable, and progress feel like a constant uphill battle.";
            }
        } else {
            if (bodyFatNum < 31) {
                return "Your current level may be slowing metabolism, increasing inflammation, or making it harder to stay consistent with workouts.";
            } else if (bodyFatNum >= 32 && bodyFatNum <= 39) {
                return "Your current level may be slowing metabolism, increasing inflammation, or making it harder to stay consistent with workouts.";
            } else if (bodyFatNum >= 40) {
                return "At this level, your body may be stuck in a constant state of inflammation and energy imbalance — making fat loss harder, appetite less predictable, and progress feel like a constant uphill battle.";
            }
        }
        return "Your current level may be slowing metabolism, increasing inflammation, or making it harder to stay consistent with workouts.";
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
            <div className={`max-w-md mx-auto ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg shadow-lg p-8 transition-colors duration-300 card-transition`}>
                
                {/* Progress Indicator */}
                <div className="flex justify-between items-center mb-8">
                    <span className={`${darkMode ? 'text-teal-400' : 'text-teal-500'} font-semibold`}>Your Results</span>
                    <div className="flex flex-row items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    </div>
                </div>

                {/* Icon */}
                <div className="text-center mb-6">
                    <div className="text-6xl">⚖️</div>
                </div>

                {/* Title */}
                <h2 className={`text-2xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
                    Your Body Fat Percentage Is {BodyFat}%
                </h2>
                <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'} font-semibold mb-6`}>
                    Here's Why That Matters
                </p>

                {/* Illustration Placeholder */}
                <div className="flex justify-center items-center gap-4 pt-3 mb-6">
                    <div className="w-24 h-32 bg-teal-100 rounded-lg flex flex-col items-center justify-center p-2">
                        <img src={cardLady} alt="Muscle Mass" className="w-16 h-20 object-cover mb-1" />
                        <p className={`text-xs font-bold ${darkMode ? 'text-gray-700' : 'text-gray-600'}`}>Muscle Mass</p>
                    </div>
                    <div className="w-26 h-40 bg-teal-100 rounded-lg flex flex-col items-center justify-center p-2 ">
                        <img src={cardLady} alt="Body" className="w-20 h-32 object-cover mb-1.5" />
                        <p className={`text-xs font-bold ${darkMode ? 'text-gray-700' : 'text-gray-600'}`}>Center Image</p>
                    </div>
                    <div className="w-24 h-32 bg-teal-100 rounded-lg flex flex-col items-center justify-center p-2">
                        <img src={cardLady} alt="Body Fat" className="w-16 h-20 object-cover mb-1" />
                        <p className={`text-xs font-bold ${darkMode ? 'text-gray-700' : 'text-gray-600'}`}>Body Fat</p>
                    </div>
                </div>

                {/* Description Text */}
                <div className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} space-y-4 mb-6 text-left`}>
                    <p>
                        Your body fat percentage gives a clearer picture than BMI alone.
                        It tells us how much of your body is lean mass (muscle, organs, bone)
                        vs stored fat.
                    </p>
                    <p>
                        Too much stored fat doesn't just affect how you look — it impacts
                        your energy, hormone balance, and ability to burn fat efficiently.
                    </p>
                    <p className="text-red-500 text-sm">
                        {getBodyFatCallout()}
                    </p>
                </div>

                {/* Next Button */}
                <div className="flex justify-end mt-6">
                    <button
                        onClick={onNext}
                        className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        Next
                        <span>→</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResultsDisplay;
