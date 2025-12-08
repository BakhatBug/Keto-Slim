import { useState, useEffect, useRef } from 'react';
import logo from './assets/images/ketoslim.png';
import './App.css';
import Form from './components/form';
import ResultsDisplay from './components/display/ResultsDisplay';
import BMIDisplay from './components/display/BMIDisplay';
import CaloriesDisplay from './components/display/CaloriesDisplay';
import WaterDisplay from './components/display/WaterDisplay';
import WeightLossDisplay from './components/display/WeightLossDisplay';
import ResultsTimelineDisplay from './components/display/ResultsTimelineDisplay';
import FinalPlanPage from './components/FinalPlanPage';
import ThemeToggle from './components/common/ThemeToggle';
import { useTheme } from './contexts/ThemeContext';
import { FormData } from './types';

function App() {
  // Use Theme Context instead of local state
  const { darkMode } = useTheme();

  // Always start from form page - don't persist across sessions
  const [currentPage, setCurrentPage] = useState<string>('form');

  // Don't persist form data across sessions
  const [formData, setFormData] = useState<FormData | null>(null);

  // Ref for focus management
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Focus management - focus main content when page changes
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.focus();
    }
    // Announce page change to screen readers
    const pageNames: { [key: string]: string } = {
      form: 'Health Assessment Form',
      bodyFat: 'Body Fat Results',
      bmi: 'BMI Results',
      calories: 'Calorie Recommendations',
      water: 'Water Intake Recommendations',
      weightLoss: 'Weight Loss Projections',
      timeline: 'Results Timeline',
      finalPlan: 'Your Personalized Plan',
    };
    document.title = `Keto Slim - ${pageNames[currentPage] || 'Health Assessment'}`;
  }, [currentPage]);

  // Don't persist currentPage and formData to localStorage
  // This ensures fresh start when dev server restarts

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    setCurrentPage('bodyFat');
  };

  const handleBodyFatNext = () => {
    setCurrentPage('bmi');
  };

  const handleBMINext = () => {
    setCurrentPage('calories');
  };

  const handleBMIBack = () => {
    setCurrentPage('bodyFat');
  };

  const handleCaloriesNext = () => {
    setCurrentPage('water');
  };

  const handleCaloriesBack = () => {
    setCurrentPage('bmi');
  };

  const handleWaterNext = () => {
    setCurrentPage('weightLoss');
  };

  const handleWaterBack = () => {
    setCurrentPage('calories');
  };

  const handleWeightLossNext = () => {
    setCurrentPage('resultsTimeline');
  };

  const handleWeightLossBack = () => {
    setCurrentPage('water');
  };

  const handleResultsTimelineNext = () => {
    setCurrentPage('finalPlan');
  };

  const handleResultsTimelineBack = () => {
    setCurrentPage('weightLoss');
  };

  const handleRestartForm = () => {
    setFormData(null);
    setCurrentPage('form');
    localStorage.removeItem('formData');
    localStorage.removeItem('currentPage');
  };

  const renderPage = () => {
    if (currentPage === 'bodyFat' && formData) {
      return (
        <ResultsDisplay
          formData={formData}
          onNext={handleBodyFatNext}
        />
      );
    }

    if (currentPage === 'bmi' && formData) {
      return (
        <BMIDisplay
          formData={formData}
          onNext={handleBMINext}
          onBack={handleBMIBack}
        />
      );
    }

    if (currentPage === 'calories' && formData) {
      return (
        <CaloriesDisplay
          formData={formData}
          onNext={handleCaloriesNext}
          onBack={handleCaloriesBack}
        />
      );
    }

    if (currentPage === 'water' && formData) {
      return (
        <WaterDisplay
          formData={formData}
          onNext={handleWaterNext}
          onBack={handleWaterBack}
        />
      );
    }

    if (currentPage === 'weightLoss' && formData) {
      return (
        <WeightLossDisplay
          formData={formData}
          onNext={handleWeightLossNext}
          onBack={handleWeightLossBack}
        />
      );
    }

    if (currentPage === 'resultsTimeline' && formData) {
      return (
        <ResultsTimelineDisplay
          formData={formData}
          onNext={handleResultsTimelineNext}
          onBack={handleResultsTimelineBack}
        />
      );
    }

    if (currentPage === 'finalPlan' && formData) {
      return (
        <FinalPlanPage
          formData={formData}
          onRestart={handleRestartForm}
        />
      );
    }

    return (
      <div
        className={`min-h-screen w-full flex flex-col items-center transition-colors duration-300 p-4 sm:p-8 ${darkMode ? 'bg-[#0f1419]' : 'bg-[rgb(248,244,244)]'
          }`}
        role="application"
        aria-label="Keto Slim health assessment application"
      >
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Logo */}
        <header className="text-center mb-3 sm:mb-4">
          <img src={logo} alt="Keto Slim Logo" className="w-28 h-9 sm:w-32 sm:h-10 mx-auto" />
        </header>

        {/* Heading */}
        <section className="text-center mb-5 sm:mb-6">
          <h1
            className={`text-2xl sm:text-3xl font-bold font-inter tracking-tight ${darkMode ? 'text-white' : 'text-[rgb(24,59,73)]'
              }`}
            style={{ letterSpacing: '-0.5px' }}
          >
            <span>Enter Your </span>
            <span className="text-[rgb(247,89,80)]">Details</span>
          </h1>
        </section>

        {/* Form */}
        <div className="w-full max-w-xl px-4">
          <Form onSubmit={handleFormSubmit} />
        </div>
      </div>
    );
  };

  return (
    <div
      key={currentPage}
      ref={mainContentRef}
      tabIndex={-1}
      className="focus:outline-none page-transition overflow-x-hidden w-full"
    >
      {renderPage()}
    </div>
  );
}

export default App;
