import React from 'react';

// FeatureCard.jsx
const FeatureCard = ({ features }) => {
  if (!features || !Array.isArray(features)) {
      return null; // or return a fallback UI
  }

  return (
      <div className="feature-cards">
          {features.map((feature, index) => (
              <div key={index} className="feature-card">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
              </div>
          ))}
      </div>
  );
};

export default FeatureCard;