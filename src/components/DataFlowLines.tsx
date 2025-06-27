"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const DataFlowLines = () => {
    const pathVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: { pathLength: 1, opacity: 1 },
    };

    const Circle = ({ cx, cy, delay }: { cx: string, cy: string, delay: number }) => (
        <motion.circle
            cx={cx} cy={cy} r="5" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: delay, ease: 'backOut' }}
        />
    );

    return (
        <div className="absolute inset-0 pointer-events-none z-10">
            <svg className="w-full h-full" preserveAspectRatio="none">
                 <defs>
                    <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                </defs>
                {/* Main connecting line */}
                <motion.path
                    d="M 20% 50% C 35% 50%, 65% 50%, 80% 50%"
                    stroke="url(#flow-gradient)" strokeWidth="2" fill="none"
                    variants={pathVariants}
                    initial="hidden" animate="visible"
                    transition={{ duration: 2.5, delay: 1, ease: "easeInOut" }}
                    strokeDasharray="4 4"
                />
                {/* Connection points */}
                <Circle cx="20%" cy="50%" delay={0.5} />
                <Circle cx="40%" cy="50%" delay={1.5} />
                <Circle cx="60%" cy="50%" delay={2.5} />
                <Circle cx="80%" cy="50%" delay={3.5} />
            </svg>
        </div>
    );
};