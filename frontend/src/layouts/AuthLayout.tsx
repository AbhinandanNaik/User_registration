import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import './AuthLayout.css';

const AuthLayout: React.FC = () => {
    return (
        <div className="auth-layout">
            <div className="auth-background">
                <div className="gradient-sphere sphere-1" />
                <div className="gradient-sphere sphere-2" />
                <div className="gradient-sphere sphere-3" />
            </div>

            <motion.div
                className="auth-content"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Outlet />
            </motion.div>
        </div>
    );
};

export default AuthLayout;
