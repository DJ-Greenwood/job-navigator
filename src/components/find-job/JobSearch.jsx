import React, { useState } from 'react';
import '../../styles/globals.css';

const JobSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [jobResults, setJobResults] = useState([]);

    const handleSearch = () => {
        // Logic to fetch job results based on searchTerm
        // This is a placeholder for the actual API call
        const results = []; // Replace with actual API call
        setJobResults(results);
    };

    return (
        <div className="job-search">
            <h2>Job Search</h2>
            <input
                type="text"
                placeholder="Search for jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <div className="job-results">
                {jobResults.length > 0 ? (
                    jobResults.map((job, index) => (
                        <div key={index} className="job-result">
                            <h3>{job.title}</h3>
                            <p>{job.company}</p>
                            <p>{job.location}</p>
                        </div>
                    ))
                ) : (
                    <p>No jobs found.</p>
                )}
            </div>
        </div>
    );
};

export default JobSearch;