import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import FindJobPage from './pages/FindJobPage';
import KeepJobPage from './pages/KeepJobPage';
import EnjoyJobPage from './pages/EnjoyJobPage';
import DashboardPage from './pages/DashboardPage';
// src/index.js
import { validateEnvironment } from './utils/env.validator';

// Validate environment variables before rendering the app
validateEnvironment();

const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/find-job" element={<FindJobPage />} />
                    <Route path="/keep-job" element={<KeepJobPage />} />
                    <Route path="/enjoy-job" element={<EnjoyJobPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;