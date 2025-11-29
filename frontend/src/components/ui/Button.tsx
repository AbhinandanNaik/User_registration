import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';
import './Button.css';

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    isLoading,
    leftIcon,
    rightIcon,
    disabled,
    ...props
}) => {
    return (
        <motion.button
            className={clsx('btn', `btn-${variant}`, `btn-${size}`, className)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <span className="spinner" />}
            {!isLoading && leftIcon && <span className="btn-icon">{leftIcon}</span>}
            <span className="btn-text">{children as React.ReactNode}</span>
            {!isLoading && rightIcon && <span className="btn-icon">{rightIcon}</span>}
        </motion.button>
    );
};
