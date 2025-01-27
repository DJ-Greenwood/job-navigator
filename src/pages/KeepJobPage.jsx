import React from 'react';
import SkillTraining from '../components/keep-job/SkillTraining';
import ResourceCard from '../components/keep-job/ResourceCard';
import PerformanceTools from '../components/keep-job/PerformanceTools';

// KeepJobPage.jsx
const KeepJobPage = () => {
    return (
      <div className="py-8 max-w-screen-xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Succeed in Your Role</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <SkillTraining />
          <PerformanceTools />
        </div>
        <ResourceCard />
      </div>
    );
  };

export default KeepJobPage;