import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDarkMode: () => void;
}

// Create the Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use the Theme Context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

// Provider component that wraps your app
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize darkMode from localStorage or default to false
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      try {
        return JSON.parse(savedTheme);
      } catch (error) {
        // If invalid JSON, default to false
        return false;
      }
    }
    return false;
  });

  // Save darkMode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Toggle function for convenience
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Value object that will be accessible to all consuming components
  const value = {
    darkMode,
    setDarkMode,
    toggleDarkMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

