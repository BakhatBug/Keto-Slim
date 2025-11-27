import React from 'react';
import { useTheme } from '../contexts/ThemeContext.jsx';

function ThemeToggle() {
  // Get theme from Context - no props needed!
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 z-50 px-4 py-2 rounded-lg font-semibold transition"
      aria-label="Toggle dark mode"
      type="button"
      style={{
        background: darkMode ? 'rgb(35, 38, 39)' : 'rgb(255, 255, 255)',
        color: darkMode ? 'rgb(248, 244, 244)' : 'rgb(24, 59, 73)',
        border: '2px solid rgb(229, 231, 235)',
        cursor: 'pointer',
      }}
    >
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}

export default ThemeToggle;
