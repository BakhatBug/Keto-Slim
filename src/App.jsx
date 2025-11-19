import { useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import logo from './assets/images/ketoslim.png'
import './App.css'
import Form from './components/form.jsx'
import ResultsDisplay from './components/ResultsDisplay.jsx'

function App() {
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setShowResults(true);
  };

  const handleNext = () => {
    // Handle navigation to next result screen
    console.log('Moving to next result...');
  };

  if (showResults && formData) {
    return <ResultsDisplay formData={formData} onNext={handleNext} />;
  }

  return (
    <div className="w-max bg-gray-900 text-white p-6">
      {/*logo*/}
      <div className="text-center">
        <img src={logo} alt="Keto Slim Logo" className="w-32 h-32 mx-auto my-4" />
      </div>
      {/*text below the logo*/}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">
          <span className="text-gray-500">Enter Your </span>
          <span className="text-red-500">Details</span>
        </h1>
      </div>
      {/*form*/}
      <Form onSubmit={handleFormSubmit} />
      
    </div>
  )
}

export default App
