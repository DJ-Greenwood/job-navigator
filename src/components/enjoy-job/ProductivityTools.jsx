import React from 'react';

// ProductivityTools.jsx
const ProductivityTools = () => {
    const tools = [
      {
        title: 'Time Tracking',
        description: 'Monitor and optimize your work hours',
        isNew: true
      },
      {
        title: 'Task Management',
        description: 'Organize and prioritize your work',
        isNew: false
      }
    ];
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Productivity Tools</h2>
        <div className="space-y-4">
          {tools.map((tool, index) => (
            <div key={index} className="p-4 border rounded">
              <div className="flex items-center">
                <h3 className="font-medium">{tool.title}</h3>
                {tool.isNew && (
                  <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    New
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
              <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
                Try Now →
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default ProductivityTools;