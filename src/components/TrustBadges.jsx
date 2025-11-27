import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../contexts/ThemeContext.jsx';

function TrustBadges({ pmcLogo, mayoLogo }) {
  const { darkMode } = useTheme();
  return (
    <div
      className="w-full mt-8 pt-6 border-t"
      style={{ borderColor: darkMode ? 'rgb(45, 49, 51)' : 'rgb(229, 231, 235)' }}
    >
      <h3
        className="text-2xl font-bold text-center mb-6"
        style={{ color: darkMode ? 'rgb(224, 230, 233)' : 'rgb(24, 59, 73)' }}
      >
        Trusted by health & nutrition professionals
      </h3>

      <div className="space-y-6">
        <div className="text-center">
          <img
            src={pmcLogo}
            alt="PMC PubMed Central® logo"
            className="text-center mx-auto pb-3 w-80 h-20"
          />
          <p className="text-base mb-2" style={{ color: 'rgb(181, 194, 201)' }}>
            There is evidence to suggest that a Ketogenic Diet can help with weight loss, visceral
            adiposity, and appetite control.
          </p>
          <a href="#" className="text-sm underline" style={{ color: 'rgb(247, 89, 80)' }}>
            source
          </a>
        </div>

        <div className="text-center">
          <img
            src={mayoLogo}
            alt="Mayo Clinic logo"
            className="text-center mx-auto mb-5 w-20 h-20"
          />
          <p className="text-base mb-2" style={{ color: 'rgb(181, 194, 201)' }}>
            Research shows that a keto diet can result in weight loss and improvements in
            cardiovascular risk factors.
          </p>
          <a href="#" className="text-sm underline" style={{ color: 'rgb(247, 89, 80)' }}>
            source
          </a>
        </div>
      </div>
    </div>
  );
}

TrustBadges.propTypes = {
  pmcLogo: PropTypes.string.isRequired,
  mayoLogo: PropTypes.string.isRequired,
};

export default TrustBadges;
