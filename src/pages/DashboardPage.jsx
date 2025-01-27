import React from 'react';
import ApplicationStats from '../components/dashboard/ApplicationStats';
import ProgressTracker from '../components/dashboard/ProgressTracker';
import SavedResources from '../components/dashboard/SavedResources';
import Layout from '../components/layout/Layout';

const DashboardPage = () => {
    return (
        <Layout>
            <h1>User Dashboard</h1>
            <ApplicationStats />
            <ProgressTracker />
            <SavedResources />
        </Layout>
    );
};

export default DashboardPage;