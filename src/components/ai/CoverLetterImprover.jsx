import React, { useState } from 'react';
import { useOpenAI } from '../../hooks/useOpenAI';

// src/components/ai/CoverLetterImprover.jsx
const CoverLetterImprover = () => {
    const [coverLetter, setCoverLetter] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [improvedLetter, setImprovedLetter] = useState('');
    const { loading, error, improveCoverLetter } = useOpenAI();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const result = await improveCoverLetter(coverLetter, jobDescription);
        setImprovedLetter(result);
      } catch (err) {
        console.error('Failed to improve cover letter:', err);
      }
    };
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">AI Cover Letter Improver</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description
            </label>
            <textarea
              className="w-full p-2 border rounded"
              rows="4"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Cover Letter
            </label>
            <textarea
              className="w-full p-2 border rounded"
              rows="6"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded disabled:bg-blue-400"
          >
            {loading ? 'Improving...' : 'Improve Cover Letter'}
          </button>
        </form>
        
        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded">
            {error}
          </div>
        )}
  
        {improvedLetter && (
          <div className="mt-6">
            <h3 className="font-medium mb-2">Improved Cover Letter:</h3>
            <div className="p-4 bg-gray-50 rounded whitespace-pre-wrap">
              {improvedLetter}
            </div>
          </div>
        )}
      </div>
    );
  };
  
    export default CoverLetterImprover;