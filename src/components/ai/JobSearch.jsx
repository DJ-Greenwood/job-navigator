import React, { useState } from 'react';
import { searchJobs } from '../../services/openai';

const JobSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const jobResults = await searchJobs(query);
        setResults(jobResults);
    };

    return (
        <div>
            <h1>Job Search</h1>
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Enter job title or keyword" 
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {results.map((job, index) => (
                    <li key={index}>{job.title} - {job.company}</li>
                ))}
            </ul>
        </div>
    );
};

export default JobSearch;