import React from 'react';
import logo from '../assets/images/ketoslim.png';
import calorie_img from '../assets/images/calorie.png';
import ThemeToggle from './ThemeToggle';

function CaloriesDisplay({ formData, onNext, onBack, darkMode, setDarkMode }) {
    const { Calorie } = formData;

    // Determine conditional callout based on calorie target
    const getCalorieCallout = () => {
        const calorieNum = parseFloat(Calorie);
        
        if (calorieNum >= 1300 && calorieNum <= 1500) {
            return "You're already close — just upgrading your food quality could unlock smoother fat loss and better focus.";
        } else if (calorieNum >= 1100 && calorieNum <= 1299) {
            return "At this range, your body is primed to burn fat — but only if you're eating nutrient-dense, low-carb foods that stabilize your system.";
        } else if (calorieNum < 1100) {
            return "Extreme restriction can backfire — slowing your metabolism, increasing stress, and making results harder to sustain. Keto helps you eat smarter, not just less.";
        }
        return "You're already close — just upgrading your food quality could unlock smoother fat loss and better focus.";
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
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    </div>
                </div>
                {/* Icon */}
                <div className="text-center mb-6">
                    <div className="text-6xl">🔥</div>
                </div>

                {/* Title */}
                <h2 className={`text-2xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
                    You Should Be Eating Around {Calorie} Calories
                </h2>
                <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'} font-semibold mb-6`}>
                    But Not All Calories Are Equal
                </p>

                {/* Illustration */}
                <div className="flex justify-center items-center mb-6">
                    <img src={calorie_img} alt="Calorie Illustration" />
                </div>

                {/* Description Text */}
                <div className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} space-y-4 mb-6 text-left`}>
                    <p className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        Your body burns calories just to stay alive — that's your BMR. Add in movement,
                        and you burn even more. Eat less than you burn? You lose weight. Eat more? You
                        store it. Simple math, but the <span className="italic">type</span> of calories
                        still makes or breaks your results.
                    </p>
                    <p className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        Most people eat low-quality calories that spike cravings, crash energy, and cause
                        fat to stick — even if they're technically under their daily limit.
                    </p>
                    <p className="text-red-500 text-sm">
                        {getCalorieCallout()}
                    </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-6">
                    <button
                        onClick={onBack}
                        className={`flex-1 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'} text-teal-500 font-semibold py-3 px-6 rounded-lg border-2 border-teal-500 flex items-center justify-center gap-2 transition-colors`}
                    >
                        <span>←</span>
                        BMI
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

export default CaloriesDisplay;
