import React, { useState } from 'react';
import '../../styles/globals.css';

const ResumeBuilder = () => {
    const [resume, setResume] = useState({
        name: '',
        email: '',
        phone: '',
        education: '',
        experience: '',
        skills: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResume({ ...resume, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to save or process the resume
        console.log('Resume submitted:', resume);
    };

    return (
        <div className="resume-builder">
            <h2>Resume Builder</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={resume.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={resume.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Phone:</label>
                    <input type="tel" name="phone" value={resume.phone} onChange={handleChange} required />
                </div>
                <div>
                    <label>Education:</label>
                    <textarea name="education" value={resume.education} onChange={handleChange} required />
                </div>
                <div>
                    <label>Experience:</label>
                    <textarea name="experience" value={resume.experience} onChange={handleChange} required />
                </div>
                <div>
                    <label>Skills:</label>
                    <textarea name="skills" value={resume.skills} onChange={handleChange} required />
                </div>
                <button type="submit">Save Resume</button>
            </form>
        </div>
    );
};

export default ResumeBuilder;