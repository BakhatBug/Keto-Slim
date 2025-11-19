import React from 'react';
import cardLady from '../assets/images/card_lady.webp';

function ResultsDisplay({ formData, onNext }) {
    const { BodyFat } = formData;

    return (
        <div className="min-h-screen bg-gray-100 p-5">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">
                    <span className="text-teal-500">KETO</span>
                    <span className="text-pink-500">SLIM</span>
                </h1>
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-between items-center mb-8">
                <span className="text-teal-500 font-semibold">Your Results</span>
                <div className="flex flex-row items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
                {/* Icon */}
                <div className="text-center mb-6">
                    <div className="text-6xl">⚖️</div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                    Your Body Fat Percentage Is {BodyFat}%
                </h2>
                <p className="text-center text-gray-600 font-semibold mb-6">
                    Here's Why That Matters
                </p>

                {/* Illustration Placeholder */}
                <div className="flex justify-center items-center gap-4 pt-3 mb-6">
                    <div className="w-24 h-32 bg-teal-100 rounded-lg flex flex-col items-center justify-center p-2">
                        <img src={cardLady} alt="Muscle Mass" className="w-16 h-20 object-cover mb-1" />
                        <p className="text-xs font-bold text-gray-600">Muscle Mass</p>
                    </div>
                    <div className="w-26 h-40 bg-teal-100 rounded-lg flex flex-col items-center justify-center p-2 ">
                        <img src={cardLady} alt="Body" className="w-20 h-32 object-cover mb-1.5" />
                        <p className="text-xs font-bold text-gray-600">Center Image</p>
                    </div>
                    <div className="w-24 h-32 bg-teal-100 rounded-lg flex flex-col items-center justify-center p-2">
                        <img src={cardLady} alt="Body Fat" className="w-16 h-20 object-cover mb-1" />
                        <p className="text-xs font-bold text-gray-600">Body Fat</p>
                    </div>
                </div>

                {/* Description Text */}
                <div className="text-gray-700 space-y-4 mb-6 text-left">
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
                        Your current level may be slowing metabolism, increasing inflammation, 
                        or making it harder to stay consistent with workouts.
                    </p>
                </div>
            </div>

            {/* Next Button */}
            <div className="max-w-md mx-auto mt-6">
                <button
                    onClick={onNext}
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                    Next
                    <span>→</span>
                </button>
            </div>
        </div>
    );
}

export default ResultsDisplay;
