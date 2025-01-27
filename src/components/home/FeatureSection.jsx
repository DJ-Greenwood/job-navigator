import React from 'react';
import FeatureCard from './FeatureCard';


  // FeaturesSection.jsx
  const FeaturesSection = () => {
    const features = {
      find: ['Job Search Aggregator', 'Resume Builder', 'Career Assessments', 'Application Tracker'],
      keep: ['Skill Training', 'Workplace Resources', 'Performance Templates'],
      enjoy: ['Wellness Resources', 'Productivity Tools', 'Community Forums']
    };
  
    return (
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard title="Find a Job" features={features.find} />
          <FeatureCard title="Keep Your Job" features={features.keep} />
          <FeatureCard title="Enjoy Your Job" features={features.enjoy} />
        </div>
      </div>
    );
  };
  export default FeaturesSection;