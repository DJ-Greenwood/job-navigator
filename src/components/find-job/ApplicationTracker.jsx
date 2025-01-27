import React, { useState } from 'react';
import '../../styles/globals.css';

const ApplicationTracker = () => {
    const [applications, setApplications] = useState([]);
    const [newApplication, setNewApplication] = useState({ title: '', company: '', status: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewApplication({ ...newApplication, [name]: value });
    };

    const addApplication = () => {
        setApplications([...applications, newApplication]);
        setNewApplication({ title: '', company: '', status: '' });
    };

    return (
        <div className="application-tracker">
            <h2>Application Tracker</h2>
            <input
                type="text"
                name="title"
                placeholder="Job Title"
                value={newApplication.title}
                onChange={handleInputChange}
                className="input-field"
            />
            <input
                type="text"
                name="company"
                placeholder="Company"
                value={newApplication.company}
                onChange={handleInputChange}
                className="input-field"
            />
            <input
                type="text"
                name="status"
                placeholder="Application Status"
                value={newApplication.status}
                onChange={handleInputChange}
                className="input-field"
            />
            <button onClick={addApplication} className="add-button">Add Application</button>

            <ul className="application-list">
                {applications.map((app, index) => (
                    <li key={index} className="application-item">
                        {app.title} at {app.company} - Status: {app.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ApplicationTracker;

