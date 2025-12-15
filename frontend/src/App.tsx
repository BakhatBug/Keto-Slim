import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
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
  // Use Theme Context
  const { darkMode } = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

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
      '/': 'Health Assessment Form',
      '/body-fat': 'Body Fat Results',
      '/bmi': 'BMI Results',
      '/calories': 'Calorie Recommendations',
      '/water': 'Water Intake Recommendations',
      '/weight-loss': 'Weight Loss Projections',
      '/timeline': 'Results Timeline',
      '/plan': 'Your Personalized Plan',
    };
    document.title = `Keto Slim - ${pageNames[location.pathname] || 'Health Assessment'}`;
  }, [location]);

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    navigate('/body-fat');
  };

  const handleRestartForm = () => {
    setFormData(null);
    navigate('/');
  };

  // Protected Route wrapper to ensure form data exists
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!formData) {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  };

  // Form Page Layout
  const FormPage = () => (
    <div
      className={`min-h-screen w-full flex flex-col items-center transition-colors duration-300 p-4 sm:p-8 ${
        darkMode ? 'bg-[#0f1419]' : 'bg-[rgb(248,244,244)]'
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
          className={`text-2xl sm:text-3xl font-bold font-inter tracking-tight ${
            darkMode ? 'text-white' : 'text-[rgb(24,59,73)]'
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

  return (
    <div
      key={location.pathname}
      ref={mainContentRef}
      tabIndex={-1}
      className="focus:outline-none page-transition overflow-x-hidden w-full"
    >
      <Routes>
        <Route path="/" element={<FormPage />} />

        <Route
          path="/body-fat"
          element={
            <ProtectedRoute>
              <ResultsDisplay formData={formData!} onNext={() => navigate('/bmi')} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bmi"
          element={
            <ProtectedRoute>
              <BMIDisplay
                formData={formData!}
                onNext={() => navigate('/calories')}
                onBack={() => navigate('/body-fat')}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/calories"
          element={
            <ProtectedRoute>
              <CaloriesDisplay
                formData={formData!}
                onNext={() => navigate('/water')}
                onBack={() => navigate('/bmi')}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/water"
          element={
            <ProtectedRoute>
              <WaterDisplay
                formData={formData!}
                onNext={() => navigate('/weight-loss')}
                onBack={() => navigate('/calories')}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/weight-loss"
          element={
            <ProtectedRoute>
              <WeightLossDisplay
                formData={formData!}
                onNext={() => navigate('/timeline')}
                onBack={() => navigate('/water')}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/timeline"
          element={
            <ProtectedRoute>
              <ResultsTimelineDisplay
                formData={formData!}
                onNext={() => navigate('/plan')}
                onBack={() => navigate('/weight-loss')}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/plan"
          element={
            <ProtectedRoute>
              <FinalPlanPage formData={formData!} onRestart={handleRestartForm} />
            </ProtectedRoute>
          }
        />

        {/* Catch all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
