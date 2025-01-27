import React from 'react';

// CommunityForums.jsx
const CommunityForums = () => {
    const forums = [
      {
        title: 'Work-Life Balance Discussion',
        participants: 234,
        lastActive: '2 hours ago'
      },
      {
        title: 'Career Growth Stories',
        participants: 156,
        lastActive: '5 hours ago'
      },
      {
        title: 'Remote Work Tips',
        participants: 342,
        lastActive: '1 hour ago'
      }
    ];
  
    return (
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Community Forums</h2>
        <div className="grid gap-4">
          {forums.map((forum, index) => (
            <div key={index} className="p-4 border rounded hover:border-blue-500 cursor-pointer">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{forum.title}</h3>
                <span className="text-sm text-gray-500">{forum.lastActive}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {forum.participants} participants
              </p>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full bg-blue-600 text-white p-2 rounded">
          Start New Discussion
        </button>
      </div>
    );
  };
  export default CommunityForums;