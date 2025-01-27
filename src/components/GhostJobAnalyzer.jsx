import React, { useState } from 'react';
import jobBoardService from '../services/jobBoards';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ResponsiveContainer } from 'recharts';

const GhostJobAnalyzer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await jobBoardService.searchJobs(searchQuery, location);
      setResults(data);
    } catch (err) {
      setError('Failed to fetch job data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Ghost Job Analyzer</h2>
        
        <form onSubmit={handleSearch} className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Software Engineer"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. New York, NY"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
          >
            {loading ? 'Analyzing...' : 'Analyze Job Postings'}
          </button>
        </form>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {results && (
          <div className="space-y-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Job Posting Analysis</h3>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={results.analysis}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="company" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalPostings" name="Total Postings" fill="#4F46E5" />
                    <Bar dataKey="similarJobsCount" name="Similar Jobs" fill="#7C3AED" />
                    <Bar dataKey="ghostJobScore" name="Ghost Job Score" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Detailed Analysis</h3>
              {results.analysis.map((company) => (
                <div key={company.company} className="bg-white border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-medium">{company.company}</h4>
                      <p className="text-sm text-gray-600">
                        {company.totalPostings} total postings • {company.similarJobsCount} similar jobs
                      </p>
                    </div>
                    <div className={`px-4 py-2 rounded-full ${
                      company.ghostJobScore > 70 ? 'bg-red-100 text-red-800' :
                      company.ghostJobScore > 40 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      Score: {company.ghostJobScore}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {company.jobs.map((job) => (
                      <div key={job.id} className="p-4 bg-gray-50 rounded">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium">{job.title}</h5>
                            <p className="text-sm text-gray-600">
                              {job.location} • Posted: {new Date(job.postDate).toLocaleDateString()}
                            </p>
                          </div>
                          <a
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            View Job
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GhostJobAnalyzer;