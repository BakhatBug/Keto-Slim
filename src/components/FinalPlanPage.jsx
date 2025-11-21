import React, { useState, useEffect } from 'react';
import logo from '../assets/images/ketoslim.png';
import slim from '../assets/images/slim.webp';
import obesse from '../assets/images/obesse.webp';
import phone from '../assets/images/mobile.webp';
import pmc from '../assets/images/pmc.svg';
import mayo from '../assets/images/mayo.webp';
import stamp from '../assets/images/stamp.png';
import ThemeToggle from './ThemeToggle';

function FinalPlanPage({ formData, darkMode, setDarkMode, onRestart }) {
    const { BodyFat, Gender } = formData;
    const [selectedPayment, setSelectedPayment] = useState('1payment');
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

    // Calculate "6 months" body fat (simple estimation)
    const currentBodyFat = parseFloat(BodyFat);
    const futureBodyFat = Math.max(10, currentBodyFat - 10);

    // Countdown timer effect
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Format time as MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
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
            <div className={`max-w-2xl mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8 mb-6 transition-colors duration-300 card-transition`}>
                {/* Icon */}
                <div className="text-center mb-6">
                    <div className="text-6xl">🎯</div>
                </div>

                {/* Title */}
                <h2 className={`text-3xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-800'} mb-8`}>
                    Your Personalized KetoSlim Plan Is Ready
                </h2>

                {/* Before/After Images Placeholder */}
                <div className="flex justify-center items-center gap-8 mb-8">
                    <div className="text-center">
                        <div className={`w-46 h-62 ${darkMode ? 'bg-gray-600' : 'bg-teal-100'} rounded-lg mb-2 flex items-center justify-center`}>
                            <img src={obesse} alt="Current Body" className='w-36' />
                        </div>
                        <p className={`font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Now</p>
                    </div>
                    <div className="text-6xl text-red-500">➤➤</div>
                    <div className="text-center">
                        <div className={`w-46 h-62 ${darkMode ? 'bg-gray-600' : 'bg-teal-200'} rounded-lg mb-2 flex items-center justify-center`}>
                            <img src={slim} alt="Future Body" className='w-36' />
                        </div>
                        <p className={`font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>6 Months</p>
                    </div>
                </div>

                {/* Progress Comparison */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                    {/* Current Stats */}
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Body Fat</span>
                                <span className="text-sm font-bold text-red-500">{currentBodyFat}%</span>
                            </div>
                            <div className={`w-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2`}>
                                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${Math.min(currentBodyFat * 2, 100)}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Energy Levels</span>
                            </div>
                            <div className={`w-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2`}>
                                <div className="bg-red-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Physical Health</span>
                            </div>
                            <div className={`w-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2`}>
                                <div className="bg-red-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Metabolism Speed</span>
                            </div>
                            <div className={`w-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2`}>
                                <div className="bg-red-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Future Stats */}
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Body Fat</span>
                                <span className="text-sm font-bold text-teal-500">{futureBodyFat}–{futureBodyFat + 2}%</span>
                            </div>
                            <div className={`w-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2`}>
                                <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${Math.min(futureBodyFat * 2, 100)}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Energy Levels</span>
                            </div>
                            <div className={`w-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2`}>
                                <div className="bg-teal-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Physical Health</span>
                            </div>
                            <div className={`w-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2`}>
                                <div className="bg-teal-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Metabolism Speed</span>
                            </div>
                            <div className={`w-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2`}>
                                <div className="bg-teal-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Program Benefits */}
                <div className="mb-8">
                    <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Your program will also work on:</p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full ${darkMode ? 'bg-red-500' : 'bg-red-100'} flex items-center justify-center text-red-500`}>✓</div>
                            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Improving Digestion</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full ${darkMode ? 'bg-red-500' : 'bg-red-100'} flex items-center justify-center text-red-500`}>✓</div>
                            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Toning Muscles</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full ${darkMode ? 'bg-red-500' : 'bg-red-100'} flex items-center justify-center text-red-500`}>✓</div>
                            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Mental Wellness Reset</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full ${darkMode ? 'bg-red-500' : 'bg-red-100'} flex items-center justify-center text-red-500`}>✓</div>
                            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Physical Endurance Boost</span>
                        </div>
                    </div>
                </div>

                {/* Tools & Knowledge Section */}
                <div className="text-center mb-6">
                    <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6`}>Get all the right tools & knowledge.</p>
                </div>

                {/* Features List */}
                <div className="flex items-center justify-between gap-8 mb-8">
                    {/* Left Column with features */}
                    <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">🍔</span>
                            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>Daily Custom Meal Plan</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">🛒</span>
                            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>Done-For-You Grocery Lists</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">🍜</span>
                            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>Overwhelm-Free Delicious Recipes</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">🎓</span>
                            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>Weekly Tips & Guidance</span>
                        </div>
                    </div>

                    {/* Right Column with mobile image */}
                    <div className="shrink-0">
                        <img src={phone} alt="Mobile phone displaying app" className="w-48 h-auto" />
                    </div>
                </div>

                {/* Trust Badges */}
                <div className={`border-t ${darkMode ? 'border-gray-600' : 'border-gray-200'} pt-6 mb-6`}>
                    <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6 text-center`}>
                        Trusted by health & nutrition professionals
                    </h3>

                    <div className="space-y-6">
                        <div className="text-center">
                            <img src={pmc} alt="PMC PubMed Central® logo" className='text-center mx-auto pb-3 w-80 h-20' />
                            <p className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} text-sm mb-2`}>
                                There is evidence to suggest that a Ketogenic Diet can help with weight loss,
                                visceral adiposity, and appetite control.
                            </p>
                            <a href="#" className="text-red-500 text-sm underline text-left">source</a>
                        </div>

                        <div className="text-center">
                            <img src={mayo} alt="Mayo Clinic logo" className='text-center mx-auto mb-5 w-20 h-20' />
                            <p className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} text-sm mb-2`}>
                                Research shows that a keto diet can result in weight loss and improvements
                                in cardiovascular risk factors.
                            </p>
                            <a href="#" className="text-red-500 text-sm underline">source</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
            <div className={`max-w-2xl mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8 mb-6 transition-colors duration-300`}>
                <h3 className={`text-2xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-600'} mb-4`}>
                    3 Month Custom Keto Plan
                </h3>

                {/* Countdown Timer */}
                <div className="bg-red-500 text-white rounded-lg p-4 mb-6 flex justify-between items-center">
                    <span className="font-semibold">Discount expires in:</span>
                    <span className="text-2xl font-bold">{formatTime(timeLeft)} ⏰</span>
                </div>

                {/* Payment Options */}
                <div className={`border ${selectedPayment === '3payments' ? 'border-teal-500 border-2' : darkMode ? 'border-gray-600' : 'border-gray-300'} ${selectedPayment === '3payments' ? (darkMode ? 'bg-teal-900/30' : 'bg-teal-50') : (darkMode ? 'bg-gray-700' : 'bg-transparent')} rounded-lg p-4 mb-4 relative cursor-pointer transition-colors`}
                    onClick={() => setSelectedPayment('3payments')}>
                    <p className={`font-bold ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>3 PAYMENTS OF $29</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Just $29 today. Split the rest over 2 easy payments.</p>
                    {selectedPayment === '3payments' && (
                        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white">✓</div>
                        </div>
                    )}
                </div>

                <div className={`border ${selectedPayment === '1payment' ? 'border-teal-500 border-2' : darkMode ? 'border-gray-600' : 'border-gray-300'} ${selectedPayment === '1payment' ? (darkMode ? 'bg-teal-900/30' : 'bg-teal-50') : (darkMode ? 'bg-gray-700' : 'bg-transparent')} rounded-lg p-4 mb-4 relative cursor-pointer transition-colors`}
                    onClick={() => setSelectedPayment('1payment')}>
                    <div className="absolute top-2 right-2 bg-teal-500 text-white px-3 py-1 rounded text-sm font-bold">
                        23% OFF
                    </div>
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        DISCOUNT
                    </div>
                    <p className={`font-bold ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-2 mt-6`}>1 Payment of $67. Pay in full today</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>and save $20 instantly.</p>
                    {selectedPayment === '1payment' && (
                        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white">✓</div>
                        </div>
                    )}
                    <div className="mt-4 bg-teal-500 text-white text-center py-2 rounded font-bold">
                        MOST POPULAR
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-green-600">🛡️</span>
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Risk-Free: Backed by 60-Day Money-Back Guarantee</span>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-6 rounded-lg mb-4 transition-colors flex items-center justify-center gap-2">
                    Continue
                    <span>→</span>
                </button>

                <div className="text-center">
                    <a href="#" className="text-red-600 text-sm underline">
                        No Thanks, I don't want my plan.
                    </a>
                </div>
            </div>

            {/* Money Back Guarantee */}
            <div className={`max-w-2xl mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8 transition-colors duration-300`}>
                <div className="flex justify-between items-center gap-4 mb-6">
                    <h3 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Money Back Guarantee</h3>
                    <img src={stamp} alt="Money Back Guarantee Stamp" className="w-16 h-16" />
                </div>

                <div className={`space-y-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <p>
                        We are confident with our service quality and its results. So, if you are ready
                        to reach your goals, it's a risk-free offer.
                    </p>
                    <p>
                        We guarantee you'll see visible results or you'll receive a full refund within
                        60 days after your purchase.
                    </p>
                    <hr className={`my-4 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`} />
                    <p className="text-sm">
                        By continuing, you represent that you are over 18 years of age and agree if for
                        whatever reason you're unhappy with your plan to contact customer support to request a refund.
                    </p>
                    <p className="text-sm">
                        You will only be charged $67 today for your first quarter (details above)
                    </p>
                    <p className="text-sm">
                        Your introductory period will last until Apr 27, 2025. You may cancel at any time
                        before Aug 27, 2025, and you will not be charged.
                    </p>
                    <p className="text-sm">
                        If you don't cancel, KetoSlim will automatically continue your membership at the end
                        of your introductory period and charge the membership price of $67 until you cancel.
                    </p>
                    <p className="text-sm">
                        Your subscription will be bound by our{' '}
                        <a href="#" className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} underline`}>Terms and Privacy Policy</a>.
                    </p>
                    <p className="text-sm">
                        If you would like a refund for any reason call{' '}
                        <a href="tel:1-800-685-5045" className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} underline`}>1-800-685-5045</a> or email{' '}
                        <a href="mailto:support@myketoslim.com" className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} underline`}>support@myketoslim.com</a>.
                    </p>
                </div>

                {/* Start Over Button */}
                <div className="mt-6 text-center">
                    <button
                        onClick={onRestart}
                        className={`px-6 py-3 rounded-lg font-semibold transition-colors ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                    >
                        ← Start Over
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FinalPlanPage;
