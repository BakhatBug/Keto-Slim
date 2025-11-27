import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../contexts/ThemeContext.jsx';

function Form({ onSubmit }) {
  const { darkMode } = useTheme();
  const [Gender, setGender] = useState('');
  const [BodyFat, setBodyFat] = useState(0);
  const [Calorie, setCalorie] = useState('');
  const [WaterCups, setWaterCups] = useState('');
  const [WeightLoss, setWeightLoss] = useState('');
  const [DaysToResults, setDaysToResults] = useState('');
  const [BMI, setBMI] = useState(0);

  const selectBodyFat = (e) => {
    setBodyFat(e.target.value);
  };

  const selectGender = (e) => {
    setGender(e.target.value);
  };

  const selectBMI = (e) => {
    setBMI(e.target.value);
  };

  const selectCalorie = (e) => {
    setCalorie(e.target.value);
  };

  const selectWaterCups = (e) => {
    setWaterCups(e.target.value);
  };

  const selectWeightLoss = (e) => {
    setWeightLoss(e.target.value);
  };

  const selectDaysToResults = (e) => {
    setDaysToResults(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { Gender, BodyFat, BMI, Calorie, WaterCups, WeightLoss, DaysToResults };
    console.log('Form data:', data);

    if (onSubmit) {
      onSubmit(data);
    }
  };

  const isFormValid = () => {
    return (
      Gender !== '' &&
      BodyFat > 0 &&
      BMI > 0 &&
      Calorie !== '' &&
      parseFloat(Calorie) > 0 &&
      WaterCups !== '' &&
      WeightLoss !== '' &&
      parseFloat(WeightLoss) > 0 &&
      DaysToResults !== '' &&
      parseInt(DaysToResults) > 0
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-xl rounded-2xl p-4 sm:p-8 w-full max-w-xl space-y-6 border card-transition"
      aria-label="Results Input Form"
      noValidate
      style={{
        background: darkMode ? 'rgb(35, 38, 39)' : 'rgb(255, 255, 255)',
        borderColor: darkMode ? 'rgb(45, 49, 51)' : 'rgb(229, 231, 235)',
        color: darkMode ? 'rgb(248, 244, 244)' : 'rgb(24, 59, 73)',
      }}
    >
      {/* Gender Radio Buttons */}
      <fieldset className="mb-4" aria-required="true">
        <legend
          className="block text-sm font-medium mb-1"
          style={{ color: darkMode ? 'rgb(248, 244, 244)' : 'rgb(24, 59, 73)' }}
        >
          Gender
          <span aria-label="required" className="ml-1" style={{ color: 'rgb(247, 89, 80)' }}>
            *
          </span>
        </legend>
        <div className="flex gap-4">
          <label
            className="flex items-center gap-1 cursor-pointer"
            style={{ color: darkMode ? 'rgb(248, 244, 244)' : 'rgb(24, 59, 73)' }}
          >
            <input
              required
              aria-required="true"
              type="radio"
              value="male"
              name="gender"
              checked={Gender === 'male'}
              onChange={selectGender}
              className="w-4 h-4"
              style={{ accentColor: 'rgb(54, 188, 159)' }}
            />
            <span>Male</span>
          </label>
          <label
            className="flex items-center gap-1 cursor-pointer"
            style={{ color: darkMode ? 'rgb(248, 244, 244)' : 'rgb(24, 59, 73)' }}
          >
            <input
              required
              aria-required="true"
              type="radio"
              value="female"
              name="gender"
              checked={Gender === 'female'}
              onChange={selectGender}
              className="w-4 h-4"
              style={{ accentColor: 'rgb(54, 188, 159)' }}
            />
            <span>Female</span>
          </label>
        </div>
      </fieldset>

      {/* Body Fat Slider */}
      <div className="mb-2">
        <label
          htmlFor="bodyFatPercent"
          className="block text-sm font-medium mb-1"
          style={{ color: darkMode ? 'rgb(248, 244, 244)' : 'rgb(24, 59, 73)' }}
        >
          Body Fat %
          <span aria-label="required" className="ml-1" style={{ color: 'rgb(247, 89, 80)' }}>
            *
          </span>
        </label>
        <div className="flex items-center gap-3">
          <input
            id="bodyFatPercent"
            min="0"
            max="100"
            step="1"
            required
            aria-required="true"
            aria-valuenow={BodyFat}
            aria-valuemin="0"
            aria-valuemax="100"
            className="flex-1"
            type="range"
            value={BodyFat}
            name="bodyFatPercent"
            onChange={selectBodyFat}
            style={{ accentColor: 'rgb(54, 188, 159)' }}
          />
          <span className="w-12 text-right" style={{ color: 'rgb(181, 194, 201)' }}>
            {BodyFat}
          </span>
        </div>
      </div>
      <div className="text-xs" style={{ color: 'rgb(181, 194, 201)' }}>
        Enter your estimated body fat percentage (0-100).
      </div>

      {/* BMI Slider */}
      <div className="mb-2">
        <label
          htmlFor="BMI"
          className="block text-sm font-medium mb-1"
          style={{ color: darkMode ? 'rgb(248, 244, 244)' : 'rgb(24, 59, 73)' }}
        >
          BMI
          <span aria-label="required" className="ml-1" style={{ color: 'rgb(247, 89, 80)' }}>
            *
          </span>
        </label>
        <div className="flex items-center gap-3">
          <input
            id="BMI"
            min="0"
            max="40"
            step="1"
            required
            aria-required="true"
            aria-valuenow={BMI}
            aria-valuemin="0"
            aria-valuemax="40"
            className="flex-1"
            type="range"
            value={BMI}
            name="BMI"
            onChange={selectBMI}
            style={{ accentColor: 'rgb(54, 188, 159)' }}
          />
          <span className="w-12 text-right" style={{ color: 'rgb(181, 194, 201)' }}>
            {BMI}
          </span>
        </div>
      </div>
      <div className="text-xs" style={{ color: 'rgb(181, 194, 201)' }}>
        Enter your Body Mass Index (0-40).
      </div>

      {/* Daily Calorie Target */}
      <div className="mb-4">
        <label
          htmlFor="calorieTarget"
          className="block text-sm font-medium mb-1"
          style={{ color: darkMode ? 'rgb(248, 244, 244)' : 'rgb(24, 59, 73)' }}
        >
          Daily Calorie Target
          <span aria-label="required" className="ml-1" style={{ color: 'rgb(247, 89, 80)' }}>
            *
          </span>
        </label>
        <input
          id="calorieTarget"
          min="0"
          required
          placeholder="e.g. 2000"
          className="w-full rounded px-3 py-2 transition"
          aria-required="true"
          type="number"
          value={Calorie}
          name="calorieTarget"
          onChange={selectCalorie}
          style={{
            background: darkMode ? 'rgb(35, 38, 39)' : 'rgb(255, 255, 255)',
            color: darkMode ? 'rgb(248, 244, 244)' : 'rgb(24, 59, 73)',
            border: `1px solid ${darkMode ? 'rgb(45, 49, 51)' : 'rgb(229, 231, 235)'}`,
          }}
        />
      </div>

      {/* Cups of Water Per Day */}
      <div className="mb-4">
        <label
          htmlFor="waterIntake"
          className="block text-sm font-medium mb-1"
          style={{ color: darkMode ? 'rgb(248, 244, 244)' : 'rgb(24, 59, 73)' }}
        >
          Cups of Water Per Day
          <span aria-label="required" className="ml-1" style={{ color: 'rgb(247, 89, 80)' }}>
            *
          </span>
        </label>
        <select
          id="waterIntake"
          name="waterIntake"
          required
          aria-required="true"
          className="w-full rounded px-3 py-2 transition h-[43px]"
          value={WaterCups}
          onChange={selectWaterCups}
          style={{
            background: darkMode ? 'rgb(35, 38, 39)' : 'rgb(255, 255, 255)',
            color: darkMode ? 'rgb(248, 244, 244)' : 'rgb(24, 59, 73)',
            border: `1px solid ${darkMode ? 'rgb(45, 49, 51)' : 'rgb(229, 231, 235)'}`,
          }}
        >
          <option value="">Select cups</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="6">6</option>
        </select>
      </div>

      {/* Weekly Weight Loss Goal */}
      <div className="mb-4">
        <label
          htmlFor="weightLossRate"
          className="block text-sm font-medium mb-1"
          style={{ color: darkMode ? 'rgb(248, 244, 244)' : 'rgb(24, 59, 73)' }}
        >
          Weekly Weight Loss Goal (lbs)
          <span aria-label="required" className="ml-1" style={{ color: 'rgb(247, 89, 80)' }}>
            *
          </span>
        </label>
        <input
          id="weightLossRate"
          min="0"
          required
          step="0.1"
          placeholder="e.g. 1.5"
          className="w-full rounded px-3 py-2 transition"
          aria-required="true"
          type="number"
          value={WeightLoss}
          name="weightLossRate"
          onChange={selectWeightLoss}
          style={{
            background: darkMode ? 'rgb(35, 38, 39)' : 'rgb(255, 255, 255)',
            color: darkMode ? 'rgb(248, 244, 244)' : 'rgb(24, 59, 73)',
            border: `1px solid ${darkMode ? 'rgb(45, 49, 51)' : 'rgb(229, 231, 235)'}`,
          }}
        />
      </div>

      {/* Days to See Results */}
      <div className="mb-4">
        <label
          htmlFor="seeResultsDays"
          className="block text-sm font-medium mb-1"
          style={{ color: darkMode ? 'rgb(248, 244, 244)' : 'rgb(24, 59, 73)' }}
        >
          Days to See Results
          <span aria-label="required" className="ml-1" style={{ color: 'rgb(247, 89, 80)' }}>
            *
          </span>
        </label>
        <input
          id="seeResultsDays"
          min="1"
          required
          placeholder="e.g. 30"
          className="w-full rounded px-3 py-2 transition"
          aria-required="true"
          type="number"
          value={DaysToResults}
          name="seeResultsDays"
          onChange={selectDaysToResults}
          style={{
            background: darkMode ? 'rgb(35, 38, 39)' : 'rgb(255, 255, 255)',
            color: darkMode ? 'rgb(248, 244, 244)' : 'rgb(24, 59, 73)',
            border: `1px solid ${darkMode ? 'rgb(45, 49, 51)' : 'rgb(229, 231, 235)'}`,
          }}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full mt-4 text-lg font-semibold py-3 rounded-xl transition disabled:opacity-50 font-inter hover:opacity-90 focus:outline-none focus:ring-2 cursor-pointer"
        disabled={!isFormValid()}
        aria-disabled={!isFormValid()}
        aria-label="See My Results"
        style={{
          background: 'rgb(54, 188, 159)',
          color: 'rgb(255, 255, 255)',
          border: '1px solid rgb(54, 188, 159)',
        }}
      >
        See My Results
      </button>

      <div
        className="text-xs mt-2 text-center font-inter"
        aria-live="polite"
        style={{ color: 'rgb(181, 194, 201)' }}
      >
        {isFormValid()
          ? 'All fields completed! Ready to see your results.'
          : 'Please fill out all required fields to enable the button.'}
      </div>
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
