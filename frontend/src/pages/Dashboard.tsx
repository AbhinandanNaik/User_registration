import React from 'react';
import { useAuth } from '../features/auth/AuthContext';

const Dashboard: React.FC = () => {
    const { user } = useAuth();

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {user?.firstName}!</p>
        </div>
    );
};

export default Dashboard;
