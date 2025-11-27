import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../contexts/ThemeContext.jsx';

function ProgressGrid() {
  const { darkMode } = useTheme();
  return (
    <div
      className="w-full grid grid-cols-2 gap-x-8 gap-y-4 rounded-xl p-4 sm:p-6"
      style={{ background: darkMode ? 'rgb(35, 38, 39)' : 'rgb(255, 255, 255)' }}
    >
      {/* Current Stats */}
      <div className="flex flex-col gap-5 pr-2">
        <div>
          <div
            className="text-xs mb-1"
            style={{ color: darkMode ? 'rgb(181, 194, 201)' : 'rgb(24, 59, 73)' }}
          >
            Body Fat
          </div>
          <div className="font-bold text-base" style={{ color: 'rgb(247, 89, 80)' }}>
            20–25%
          </div>
        </div>
        <div>
          <div
            className="text-xs mb-1"
            style={{ color: darkMode ? 'rgb(181, 194, 201)' : 'rgb(24, 59, 73)' }}
          >
            Energy Levels
          </div>
          <div
            className="w-full h-2 rounded"
            style={{ background: darkMode ? 'rgb(45, 49, 51)' : 'rgb(229, 231, 235)' }}
          >
            <div
              className="h-2 rounded"
              style={{ width: '30%', background: 'rgb(247, 89, 80)', transition: 'width 0.4s' }}
            ></div>
          </div>
        </div>
        <div>
          <div
            className="text-xs mb-1"
            style={{ color: darkMode ? 'rgb(181, 194, 201)' : 'rgb(24, 59, 73)' }}
          >
            Physical Health
          </div>
          <div
            className="w-full h-2 rounded"
            style={{ background: darkMode ? 'rgb(45, 49, 51)' : 'rgb(229, 231, 235)' }}
          >
            <div
              className="h-2 rounded"
              style={{ width: '35%', background: 'rgb(247, 89, 80)', transition: 'width 0.4s' }}
            ></div>
          </div>
        </div>
        <div>
          <div
            className="text-xs mb-1"
            style={{ color: darkMode ? 'rgb(181, 194, 201)' : 'rgb(24, 59, 73)' }}
          >
            Metabolism Speed
          </div>
          <div
            className="w-full h-2 rounded"
            style={{ background: darkMode ? 'rgb(45, 49, 51)' : 'rgb(229, 231, 235)' }}
          >
            <div
              className="h-2 rounded"
              style={{ width: '25%', background: 'rgb(247, 89, 80)', transition: 'width 0.4s' }}
            ></div>
          </div>
        </div>
      </div>

      {/* Future Stats */}
      <div className="flex flex-col gap-5 pl-2">
        <div>
          <div
            className="text-xs mb-1"
            style={{ color: darkMode ? 'rgb(181, 194, 201)' : 'rgb(24, 59, 73)' }}
          >
            Body Fat
          </div>
          <div className="font-bold text-base" style={{ color: 'rgb(54, 188, 159)' }}>
            10–12%
          </div>
        </div>
        <div>
          <div
            className="text-xs mb-1"
            style={{ color: darkMode ? 'rgb(181, 194, 201)' : 'rgb(24, 59, 73)' }}
          >
            Energy Levels
          </div>
          <div
            className="w-full h-2 rounded"
            style={{ background: darkMode ? 'rgb(45, 49, 51)' : 'rgb(229, 231, 235)' }}
          >
            <div
              className="h-2 rounded"
              style={{ width: '85%', background: 'rgb(54, 188, 159)', transition: 'width 0.4s' }}
            ></div>
          </div>
        </div>
        <div>
          <div
            className="text-xs mb-1"
            style={{ color: darkMode ? 'rgb(181, 194, 201)' : 'rgb(24, 59, 73)' }}
          >
            Physical Health
          </div>
          <div
            className="w-full h-2 rounded"
            style={{ background: darkMode ? 'rgb(45, 49, 51)' : 'rgb(229, 231, 235)' }}
          >
            <div
              className="h-2 rounded"
              style={{ width: '90%', background: 'rgb(54, 188, 159)', transition: 'width 0.4s' }}
            ></div>
          </div>
        </div>
        <div>
          <div
            className="text-xs mb-1"
            style={{ color: darkMode ? 'rgb(181, 194, 201)' : 'rgb(24, 59, 73)' }}
          >
            Metabolism Speed
          </div>
          <div
            className="w-full h-2 rounded"
            style={{ background: darkMode ? 'rgb(45, 49, 51)' : 'rgb(229, 231, 235)' }}
          >
            <div
              className="h-2 rounded"
              style={{ width: '80%', background: 'rgb(54, 188, 159)', transition: 'width 0.4s' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

ProgressGrid.propTypes = {};

export default ProgressGrid;
