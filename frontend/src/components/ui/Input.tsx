import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, icon, className, ...props }, ref) => {
        return (
            <div className={clsx('input-group', className)}>
                <div className="input-wrapper">
                    {icon && <span className="input-icon">{icon}</span>}
                    <input
                        ref={ref}
                        className={clsx('input-field', { 'has-error': error, 'has-icon': icon })}
                        placeholder=" "
                        {...props}
                    />
                    <label className="input-label">{label}</label>
                </div>
                {error && (
                    <motion.span
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="input-error"
                    >
                        {error}
                    </motion.span>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
