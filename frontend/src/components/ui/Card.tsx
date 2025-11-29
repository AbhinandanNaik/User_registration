import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';
import './Card.css';

interface CardProps extends HTMLMotionProps<"div"> {
    glass?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    className,
    glass = true,
    ...props
}) => {
    return (
        <motion.div
            className={clsx('card', { 'card-glass': glass }, className)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            {...props}
        >
            {children}
        </motion.div>
    );
};
