"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const ConnectingLines = () => {
    const pathVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: { pathLength: 1, opacity: 1 },
    };

    const Circle = ({ cx, cy, delay }: { cx: string, cy: string, delay: number }) => (
        <motion.circle
            cx={cx} cy={cy} r="5" fill="#e0e7ff" stroke="#a5b4fc" strokeWidth="2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: delay, ease: 'backOut' }}
        />
    );

    return (
        <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
            <svg className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                 <defs>
                    <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                </defs>
                <motion.path
                    d="M 22% 50% C 37.5% 50%, 37.5% 50%, 52.5% 50% C 67.5% 50%, 67.5% 50%, 82.5% 50%"
                    stroke="url(#flow-gradient)" strokeWidth="2" fill="none"
                    variants={pathVariants}
                    initial="hidden" animate="visible"
                    transition={{ duration: 2.5, delay: 1, ease: "easeInOut" }}
                    strokeDasharray="4 4"
                />
                {/* Connection points */}
                <Circle cx="22%" cy="50%" delay={0.5} />
                <Circle cx="37.5%" cy="50%" delay={1.5} />
                <Circle cx="52.5%" cy="50%" delay={2.5} />
                <Circle cx="67.5%" cy="50%" delay={3.5} />
            </svg>
        </div>
    );
}; 