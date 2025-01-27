import React from 'react';
import { Link } from 'react-router-dom';

// HeroSection.jsx
const HeroSection = () => {
    return (
      <div className="max-w-screen-xl mx-auto px-4 text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Navigate Your Career Journey</h1>
        <p className="text-xl text-gray-600">Tools and resources to help you find, keep, and enjoy your dream job</p>
        <div className="mt-8">
          <Link
            to="/find-job"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-6 py-3"
          >
            Start Your Journey
          </Link>
        </div>
      </div>
    );
  };

export default HeroSection;