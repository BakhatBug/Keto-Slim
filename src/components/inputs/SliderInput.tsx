import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface SliderInputProps {
  label: string;
  id: string;
  min: string | number;
  max: string | number;
  step: string | number;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helpText?: string;
  required?: boolean;
}

const SliderInput: React.FC<SliderInputProps> = ({ label, id, min, max, step, value, onChange, helpText, required = false }) => {
  const { darkMode } = useTheme();

  return (
    <div>
      <div className="mb-2">
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
        <div className="flex items-center gap-3">
          <input
            id={id}
            min={min}
            max={max}
            step={step}
            required={required}
            aria-required={required}
            aria-valuenow={typeof value === 'string' ? parseFloat(value) : value}
            aria-valuemin={typeof min === 'string' ? parseFloat(min) : min}
            aria-valuemax={typeof max === 'string' ? parseFloat(max) : max}
            className="flex-1"
            type="range"
            value={value}
            onChange={onChange}
            style={{ accentColor: 'rgb(54, 188, 159)' }}
          />
          <span className="w-12 text-right" style={{ color: 'rgb(181, 194, 201)' }}>
            {value}
          </span>
        </div>
      </div>
      {helpText && (
        <div className="text-xs" style={{ color: 'rgb(181, 194, 201)' }}>
          {helpText}
        </div>
      )}
    </div>
  );
}

export default SliderInput;
