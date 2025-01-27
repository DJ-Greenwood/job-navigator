import React from 'react';
import WellnessResources from '../components/enjoy-job/WellnessResources';
import CommunityForums from '../components/enjoy-job/CommunityForums';
import ProductivityTools from '../components/enjoy-job/ProductivityTools';

// EnjoyJobPage.jsx
const EnjoyJobPage = () => {
    return (
      <div className="py-8 max-w-screen-xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Enhance Your Work Life</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <WellnessResources />
          <ProductivityTools />
        </div>
        <CommunityForums />
      </div>
    );
  };

export default EnjoyJobPage;