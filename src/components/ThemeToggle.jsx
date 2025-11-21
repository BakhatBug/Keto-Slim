import React from 'react';

function ThemeToggle({ darkMode, setDarkMode }) {
    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className={`fixed top-4 right-4 z-50 px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all border-2 font-semibold ${
                darkMode 
                    ? 'bg-white text-gray-900 border-gray-300 hover:bg-gray-100' 
                    : 'bg-gray-900 text-white border-gray-700 hover:bg-gray-800'
            }`}
            aria-label="Toggle theme"
        >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
}

export default ThemeToggle;


