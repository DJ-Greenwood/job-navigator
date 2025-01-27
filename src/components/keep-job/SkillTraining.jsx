import React from 'react';

// SkillTraining.jsx
const SkillTraining = () => {
    const skills = [
      {
        title: 'Communication Skills',
        description: 'Master workplace communication',
        progress: 60,
      },
      {
        title: 'Leadership',
        description: 'Develop management skills',
        progress: 40,
      }
    ];
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Skill Training</h2>
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div key={index} className="p-4 border rounded">
              <h3 className="font-medium">{skill.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{skill.description}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${skill.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default SkillTraining;
  