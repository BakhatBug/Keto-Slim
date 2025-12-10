import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface NumberInputProps {
  label: string;
  id: string;
  min?: string | number;
  step?: string | number;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  id,
  min,
  step,
  placeholder,
  value,
  onChange,
  required = false,
}) => {
  const { darkMode } = useTheme();

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-1"
        style={{ color: darkMode ? 'rgb(248, 244, 244)' : 'rgb(24, 59, 73)' }}
      >
        {label}
        {required && (
          <span aria-label="required" className="ml-1" style={{ color: 'rgb(247, 89, 80)' }}>
            *
          </span>
        )}
      </label>
      <input
        id={id}
        min={min}
        step={step}
        required={required}
        placeholder={placeholder}
        className="w-full rounded px-3 py-2 transition"
        aria-required={required}
        type="number"
        value={value}
        onChange={onChange}
        style={{
          background: darkMode ? 'rgb(35, 38, 39)' : 'rgb(255, 255, 255)',
          color: darkMode ? 'rgb(248, 244, 244)' : 'rgb(24, 59, 73)',
          border: `1px solid ${darkMode ? 'rgb(45, 49, 51)' : 'rgb(229, 231, 235)'}`,
        }}
      />
    </div>
  );
};

export default NumberInput;
