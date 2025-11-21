import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle.jsx';

function Form({ onSubmit, darkMode, setDarkMode }){
    
    const [Gender, setGender]= useState('');
    const [BodyFat, setBodyFat]= useState(0);
    const [Calorie, setCalorie]= useState(0);
    const [WaterCups, setWaterCups] = useState(0);
    const [WeightLoss, setWeightLoss] = useState(0);
    const [DaysToResults, setDaysToResults] = useState(0);
    const [BMI, setBMI] = useState(0);

    const selectBodyFat= (e)=>{
        setBodyFat(e.target.value)
    }

    const selectGender = (e)=>{
        setGender(e.target.value);
    }
    
    const selectBMI = (e) => {
        setBMI(e.target.value);
    }

    const selectCalorie = (e)=>{
        setCalorie(e.target.value);
    }
    
    const selectWaterCups = (e) => {
        setWaterCups(e.target.value);
    }

    const selectWeightLoss = (e) => {
        setWeightLoss(e.target.value);
    }

    const selectDaysToResults = (e) => {
        setDaysToResults(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { Gender, BodyFat, BMI, Calorie, WaterCups, WeightLoss, DaysToResults };
        console.log('Form data:', data);
        
        if (onSubmit) {
            onSubmit(data);
        }
    }

    return(
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} ${darkMode ? 'text-white' : 'text-gray-900'} p-8 rounded-lg shadow-lg font-sans transition-colors duration-300 relative card-transition`}>
            
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            
            <form onSubmit={handleSubmit}>
            
                {/*Gender Radio Buttons*/}
                <div className="mb-2.5">
                    <label className="block mb-2.5">
                        Gender <span className="text-red-500">*</span>
                    </label>
                    <label className="mr-5">
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={Gender === 'male'}
                            onChange={selectGender}
                            className="mr-1.5"
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={Gender === 'female'}
                            onChange={selectGender}
                            className="mr-1.5"
                            
                        />
                        Female
                    </label>
                </div>

                {/*Body Fat Slider*/}
                <div className="mb-5">
                    <label className="block mb-2.5">
                        Body Fat % <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2.5">
                        <input 
                            type="range"
                            value={BodyFat}
                            onChange={selectBodyFat}
                            min="0"
                            max="100"
                            className="flex-1 accent-green-400 "
                        />
                        <span className="text-lg font-bold">{BodyFat}</span>
                    </div>
                    <div className={`text-sm mt-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Enter your estimated body fat percentage (0-100).
                    </div>
                </div>

                {/* BMI Slider */}
                <div className="mb-5">
                    <label className="block mb-2.5">
                        BMI <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2.5">
                        <input 
                            type="range"
                            value={BMI}
                            onChange={selectBMI}
                            min="0"
                            max="40"
                            className="flex-1 accent-green-400"
                        />
                        <span className="text-lg font-bold">{BMI}</span>
                    </div>
                    <div className={`text-sm mt-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Enter your Body Mass Index (0-40).
                    </div>
                </div>
                
                {/* Daily Calorie Target*/}
                <div className="mb-5">
                    <label className="block mb-2.5">
                        Daily Calorie Target <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="number"
                        className={`w-full p-2.5 rounded border focus:outline-none focus:border-green-400 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'}`}
                        placeholder="e.g. 2000"
                        value={Calorie}
                        onChange={selectCalorie}
                        min= "0"
                    />
                </div>

                {/* Cups of Water Per Day */}
                <div className="mb-10">
                    <label className="block mb-2.5">
                        Cups of Water Per Day <span className="text-red-500">*</span>
                    </label>
                    <select 
                        className={`w-full p-2.5 rounded border focus:outline-none focus:border-green-400 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'}`}
                        value={WaterCups}
                        onChange={selectWaterCups}
                    >
                        <option value="">Select cups</option>
                        <option value="1">1 cup</option>
                        <option value="2">2 cups</option>
                        <option value="3">3 cups</option>
                        <option value="4">4 cups</option>
                        <option value="5">5 cups</option>
                        <option value="6">6 cups</option>
                        <option value="7">7 cups</option>
                        <option value="8">8 cups</option>
                    </select>
                </div>

                {/* Weekly Weight Loss Goal */}
                <div className="mb-5">
                    <label className="block mb-2.5">
                        Weekly Weight Loss Goal (lbs) <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="number"
                        className={`w-full p-2.5 rounded border focus:outline-none focus:border-green-400 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'}`}
                        placeholder="e.g. 1.5"
                        value={WeightLoss}
                        onChange={selectWeightLoss}
                        min="0"
                        step="0.1"
                    />
                </div>

                {/* Days to See Results */}
                <div className="mb-5">
                    <label className="block mb-2.5">
                        Days to See Results <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="number"
                        className={`w-full p-2.5 rounded border focus:outline-none focus:border-green-400 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'}`}
                        placeholder="e.g. 30"
                        value={DaysToResults}
                        onChange={selectDaysToResults}
                        min="1"
                    />
                </div>

                {/* Submit Button */}

                <button
                    type="submit"
                    className={`w-full mt-2.5 font-bold py-2.5 h-auto rounded-2xl transition-colors ${darkMode ? 'bg-white text-gray-800 hover:bg-gray-100' : 'bg-sky-400 text-white hover:bg-sky-500'}`}
                >See My Results</button>
            </form>
        </div>
    )
}

export default Form;