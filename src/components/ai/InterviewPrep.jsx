import React, { useState } from 'react';
import { useOpenAI } from '../../hooks/useOpenAI';


// src/components/ai/InterviewPrep.jsx
const InterviewPrep = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [questions, setQuestions] = useState('');
    const { loading, error, generateInterviewQuestions } = useOpenAI();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const result = await generateInterviewQuestions(jobTitle);
        setQuestions(result);
      } catch (err) {
        console.error('Failed to generate questions:', err);
      }
    };
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">AI Interview Question Generator</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded disabled:bg-blue-400"
          >
            {loading ? 'Generating...' : 'Generate Questions'}
          </button>
        </form>
  
        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded">
            {error}
          </div>
        )}
  
        {questions && (
          <div className="mt-6">
            <h3 className="font-medium mb-2">Practice These Questions:</h3>
            <div className="p-4 bg-gray-50 rounded whitespace-pre-wrap">
              {questions}
            </div>
          </div>
        )}
      </div>
    );
  };

export default InterviewPrep;