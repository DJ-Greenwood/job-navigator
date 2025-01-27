import React from 'react';
import { Link } from 'react-router-dom';

// PerformanceTools.jsx
const PerformanceTools = () => {
    const tools = [
      {
        title: 'Performance Review Template',
        description: 'Prepare for your next review',
        link: '/templates/review'
      },
      {
        title: 'Goal Setting Worksheet',
        description: 'Define and track your objectives',
        link: '/templates/goals'
      }
    ];
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Performance Tools</h2>
        <div className="space-y-4">
          {tools.map((tool, index) => (
            <Link 
              key={index}
              to={tool.link}
              className="block p-4 border rounded hover:border-blue-500"
            >
              <h3 className="font-medium">{tool.title}</h3>
              <p className="text-sm text-gray-600">{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  export default PerformanceTools;