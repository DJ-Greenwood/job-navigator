import React from 'react';
import './ResourcesList.css';

// ResourcesList.jsx
const ResourcesList = () => {
    const resources = [
      {
        category: 'Workplace Navigation',
        items: [
          'Dealing with Difficult Conversations',
          'Time Management Strategies',
          'Building Professional Relationships'
        ]
      },
      {
        category: 'Career Development',
        items: [
          'Setting Career Goals',
          'Finding a Mentor',
          'Professional Networking'
        ]
      }
    ];
  
    return (
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Resources Library</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {resources.map((section, index) => (
            <div key={index}>
              <h3 className="font-medium mb-3">{section.category}</h3>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li 
                    key={itemIndex}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };
  export default ResourcesList;