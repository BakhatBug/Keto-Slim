import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectInputProps {
  label: string;
  id: string;
  options: SelectOption[];
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({ label, id, options, value, onChange, placeholder = 'Select an option', required = false }) => {
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
      <select
        id={id}
        required={required}
        aria-required={required}
        className="w-full rounded px-3 py-2 transition h-[43px]"
        value={value}
        onChange={onChange}
        style={{
          background: darkMode ? 'rgb(35, 38, 39)' : 'rgb(255, 255, 255)',
          color: darkMode ? 'rgb(248, 244, 244)' : 'rgb(24, 59, 73)',
          border: `1px solid ${darkMode ? 'rgb(45, 49, 51)' : 'rgb(229, 231, 235)'}`,
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
