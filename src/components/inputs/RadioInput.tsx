import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioInputProps {
  label: string;
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const RadioInput: React.FC<RadioInputProps> = ({ label, name, options, value, onChange, required = false }) => {
  const { darkMode } = useTheme();

  return (
    <fieldset className="mb-4" aria-required={required}>
      <legend
        className="block text-sm font-medium mb-1"
        style={{ color: darkMode ? 'rgb(248, 244, 244)' : 'rgb(24, 59, 73)' }}
      >
        {label}
        {required && (
          <span aria-label="required" className="ml-1" style={{ color: 'rgb(247, 89, 80)' }}>
            *
          </span>
        )}
      </legend>
      <div className="flex gap-4">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-1 cursor-pointer"
            style={{ color: darkMode ? 'rgb(248, 244, 244)' : 'rgb(24, 59, 73)' }}
          >
            <input
              required={required}
              aria-required={required}
              type="radio"
              value={option.value}
              name={name}
              checked={value === option.value}
              onChange={onChange}
              className="w-4 h-4"
              style={{ accentColor: 'rgb(54, 188, 159)' }}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default RadioInput;
