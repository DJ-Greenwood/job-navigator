import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL

export const fetchJobs = async (query) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/jobs`, { params: { query } });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching jobs: ' + error.message);
    }
};

export const fetchJobDetails = async (jobId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/jobs/${jobId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching job details: ' + error.message);
    }
};

export const submitApplication = async (applicationData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/applications`, applicationData);
        return response.data;
    } catch (error) {
        throw new Error('Error submitting application: ' + error.message);
    }
};