import { useTheme } from '../../contexts/ThemeContext';

function ThemeToggle() {
  // Get theme from Context - no props needed!
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg font-semibold transition border-2 border-[rgb(229,231,235)] cursor-pointer ${darkMode
        ? 'bg-[rgb(35,38,39)] text-[rgb(248,244,244)]'
        : 'bg-white text-[rgb(24,59,73)]'
        }`}
      aria-label="Toggle dark mode"
      type="button"
    >
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}

export default ThemeToggle;
