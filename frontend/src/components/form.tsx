import React, { useState } from 'react';
import Button from './common/Button';
import { useTheme } from '../contexts/ThemeContext';
import RadioInput from './inputs/RadioInput';
import SliderInput from './inputs/SliderInput';
import NumberInput from './inputs/NumberInput';
import SelectInput from './inputs/SelectInput';

//onSubmit is takes data and returns nothing
interface FormProps {
  onSubmit: (data: any) => void;
}
//TypeScript type annotation saying "this is a React Functional Component that accepts props of type FormProps

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const { darkMode } = useTheme();
  const [Gender, setGender] = useState('');
  const [BodyFat, setBodyFat] = useState<number | string>(0);
  const [Calorie, setCalorie] = useState('');
  const [WaterCups, setWaterCups] = useState('');
  const [WeightLoss, setWeightLoss] = useState('');
  const [DaysToResults, setDaysToResults] = useState('');
  const [BMI, setBMI] = useState<number | string>(0);

  const selectBodyFat = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBodyFat(e.target.value);
  };

  const selectGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
  };

  const selectBMI = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBMI(e.target.value);
  };

  const selectCalorie = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalorie(e.target.value);
  };

  const selectWaterCups = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWaterCups(e.target.value);
  };

  const selectWeightLoss = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeightLoss(e.target.value);
  };

  const selectDaysToResults = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDaysToResults(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
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
      Number(BodyFat) > 0 &&
      Number(BMI) > 0 &&
      Calorie !== '' &&
      parseFloat(Calorie) > 0 &&
      WaterCups !== '' &&
      WeightLoss !== '' &&
      parseFloat(WeightLoss) > 0 &&
      DaysToResults !== '' &&
      parseInt(DaysToResults) > 0
    );
  };

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  const waterOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '6', label: '6' },
  ];

  return (
    <article
      className={`rounded-2xl shadow-xl border p-4 sm:p-8 w-full max-w-xl mx-auto flex flex-col items-center mb-6 transition-colors duration-300 ${
        darkMode
          ? 'bg-[#232627] border-[#2d3133] text-[#f8f4f4]'
          : 'bg-white border-gray-200 text-[#183b49]'
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full space-y-6"
        aria-label="Results Input Form"
        noValidate
      >
        {/* Gender Radio Buttons */}
        <RadioInput
          label="Gender"
          name="gender"
          options={genderOptions}
          value={Gender}
          onChange={selectGender}
          required={true}
        />

        {/* Body Fat Slider */}
        <SliderInput
          label="Body Fat %"
          id="bodyFatPercent"
          min="0"
          max="100"
          step="1"
          value={BodyFat}
          onChange={selectBodyFat}
          helpText="Enter your estimated body fat percentage (0-100)."
          required={true}
        />

        {/* BMI Slider */}
        <SliderInput
          label="BMI"
          id="BMI"
          min="0"
          max="40"
          step="1"
          value={BMI}
          onChange={selectBMI}
          helpText="Enter your Body Mass Index (0-40)."
          required={true}
        />

        {/* Daily Calorie Target */}
        <NumberInput
          label="Daily Calorie Target"
          id="calorieTarget"
          min="0"
          placeholder="e.g. 2000"
          value={Calorie}
          onChange={selectCalorie}
          required={true}
        />

        {/* Cups of Water Per Day */}
        <SelectInput
          label="Cups of Water Per Day"
          id="waterIntake"
          options={waterOptions}
          value={WaterCups}
          onChange={selectWaterCups}
          placeholder="Select cups"
          required={true}
        />

        {/* Weekly Weight Loss Goal */}
        <NumberInput
          label="Weekly Weight Loss Goal (lbs)"
          id="weightLossRate"
          min="0"
          step="0.1"
          placeholder="e.g. 1.5"
          value={WeightLoss}
          onChange={selectWeightLoss}
          required={true}
        />

        {/* Days to See Results */}
        <NumberInput
          label="Days to See Results"
          id="seeResultsDays"
          min="1"
          placeholder="e.g. 30"
          value={DaysToResults}
          onChange={selectDaysToResults}
          required={true}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="submit"
          disabled={!isFormValid()}
          ariaLabel="See My Results"
          className="w-full mt-4 py-3 rounded-xl font-inter font-semibold focus:outline-none focus:ring-2"
        >
          See My Results
        </Button>

        <div className="text-xs mt-2 text-center font-inter text-[#b5c2c9]" aria-live="polite">
          {isFormValid()
            ? 'All fields completed! Ready to see your results.'
            : 'Please fill out all required fields to enable the button.'}
        </div>
      </form>
    </article>
  );
};

export default Form;
