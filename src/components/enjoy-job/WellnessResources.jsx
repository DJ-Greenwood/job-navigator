import React from 'react';

// WellnessResources.jsx
const WellnessResources = () => {
    const resources = [
      {
        title: 'Work-Life Balance',
        description: 'Tips for maintaining balance',
        type: 'Article',
        duration: '10 min read'
      },
      {
        title: 'Stress Management',
        description: 'Techniques for workplace stress',
        type: 'Video',
        duration: '15 min'
      }
    ];
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Wellness Resources</h2>
        <div className="space-y-4">
          {resources.map((resource, index) => (
            <div key={index} className="p-4 border rounded">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{resource.title}</h3>
                  <p className="text-sm text-gray-600">{resource.description}</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {resource.type}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-500">{resource.duration}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default WellnessResources;