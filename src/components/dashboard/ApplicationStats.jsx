import React from 'react';

const ApplicationStats = () => {
    // Sample data for application statistics
    const stats = {
        totalApplications: 25,
        applicationsInProgress: 10,
        applicationsRejected: 5,
        applicationsAccepted: 10,
    };

    return (
        <div className="application-stats">
            <h2>Application Statistics</h2>
            <ul>
                <li>Total Applications: {stats.totalApplications}</li>
                <li>Applications In Progress: {stats.applicationsInProgress}</li>
                <li>Applications Rejected: {stats.applicationsRejected}</li>
                <li>Applications Accepted: {stats.applicationsAccepted}</li>
            </ul>
        </div>
    );
};

export default ApplicationStats;