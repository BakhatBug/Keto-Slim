import { useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import logo from './assets/images/ketoslim.png'
import './App.css'
import Form from './components/form.jsx'
import ResultsDisplay from './components/ResultsDisplay.jsx'
import BMIDisplay from './components/BMIDisplay.jsx'
import CaloriesDisplay from './components/CaloriesDisplay.jsx'
import WaterDisplay from './components/WaterDisplay.jsx'
import WeightLossDisplay from './components/WeightLossDisplay.jsx'
import ResultsTimelineDisplay from './components/ResultsTimelineDisplay.jsx'
import FinalPlanPage from './components/FinalPlanPage.jsx'


function App() {
  // Initialize currentPage from localStorage or default to 'form'
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('currentPage');
    return savedPage || 'form';
  });
  
  // Initialize formData from localStorage or default to null
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : null;
  });
  
  // Initialize darkMode from localStorage or default to false
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // Save darkMode to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Save currentPage to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  // Save formData to localStorage whenever it changes
  React.useEffect(() => {
    if (formData) {
      localStorage.setItem('formData', JSON.stringify(formData));
    }
  }, [formData]);

  const handleFormSubmit = (data) => {
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
      return <ResultsDisplay formData={formData} onNext={handleBodyFatNext} darkMode={darkMode} setDarkMode={setDarkMode} />;
    }

    if (currentPage === 'bmi' && formData) {
      return <BMIDisplay formData={formData} onNext={handleBMINext} onBack={handleBMIBack} darkMode={darkMode} setDarkMode={setDarkMode} />;
    }

    if (currentPage === 'calories' && formData) {
      return <CaloriesDisplay formData={formData} onNext={handleCaloriesNext} onBack={handleCaloriesBack} darkMode={darkMode} setDarkMode={setDarkMode} />;
    }

    if (currentPage === 'water' && formData) {
      return <WaterDisplay formData={formData} onNext={handleWaterNext} onBack={handleWaterBack} darkMode={darkMode} setDarkMode={setDarkMode} />;
    }

    if (currentPage === 'weightLoss' && formData) {
      return <WeightLossDisplay formData={formData} onNext={handleWeightLossNext} onBack={handleWeightLossBack} darkMode={darkMode} setDarkMode={setDarkMode} />;
    }

    if (currentPage === 'resultsTimeline' && formData) {
      return <ResultsTimelineDisplay formData={formData} onNext={handleResultsTimelineNext} onBack={handleResultsTimelineBack} darkMode={darkMode} setDarkMode={setDarkMode} />;
    }

    if (currentPage === 'finalPlan' && formData) {
      return <FinalPlanPage formData={formData} darkMode={darkMode} setDarkMode={setDarkMode} onRestart={handleRestartForm} />;
    }

    return (
      <div className={`min-h-screen w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} text-white p-6`}>
        {/*logo*/}

        <div className="text-center mb-8">
          <img src={logo} alt="Keto Slim Logo" className="w-32 h-10 mx-auto my-4" />
        </div>

        {/*text below the logo*/}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">
            <span className="text-gray-500">Enter Your </span>
            <span className="text-red-500">Details</span>
          </h1>
        </div>

        {/*form*/}
        <div className="max-w-3xl mx-auto">
          <Form onSubmit={handleFormSubmit} darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
      </div>
    );
  };

  return (
    <div key={currentPage}>
      {renderPage()}
    </div>
  );
}

export default App
