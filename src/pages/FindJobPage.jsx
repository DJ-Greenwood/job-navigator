import React from 'react';
import JobSearch from '../components/find-job/JobSearch';
import ResumeBuilder from '../components/find-job/ResumeBuilder';
import ApplicationTracker from '../components/find-job/ApplicationTracker';
import InterviewPrep from '../components/ai/InterviewPrep';
import CoverLetterImprover from '../components/ai/CoverLetterImprover';
import '../styles/globals.css';

const FindJobPage = () => {
    return (
        <div className="py-8 max-w-screen-xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Find a Job</h1>
            <div className="grid md:grid-cols-2 gap-8">
                <JobSearch />
                <ResumeBuilder />
                <ApplicationTracker />
                <InterviewPrep />
                <CoverLetterImprover />
            </div>
        </div>
    );
};

export default FindJobPage;
