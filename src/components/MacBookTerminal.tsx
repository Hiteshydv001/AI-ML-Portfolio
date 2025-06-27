"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TerminalWindow } from './TerminalWindow';

export const MacBookTerminal = ({ animationStep }: { animationStep: number }) => {
    const [logs, setLogs] = useState<string[]>([]);
    const allLogs = ["init_ingestion()", "curate_dataset('ThinkBlueData')", "process_cv_data('GuardAI')"];

    useEffect(() => {
        if (animationStep === 0) {
            setLogs([]);
            let i = 0;
            const interval = setInterval(() => {
                if (i < allLogs.length) {
                    setLogs(prev => [...prev, allLogs[i]]);
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 800);
            return () => clearInterval(interval);
        }
    }, [animationStep]);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
            <motion.div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2 bg-white rounded-full px-4 py-1.5 shadow-lg border border-gray-200/80" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Processing</span>
            </motion.div>
            <svg viewBox="0 0 400 250" className="w-full max-w-sm drop-shadow-xl">
                <rect x="0" y="10" width="400" height="220" rx="20" fill="#e5e7eb" />
                <rect x="10" y="20" width="380" height="180" rx="10" fill="#1e2937" />
                <rect x="30" y="205" width="340" height="20" rx="5" fill="#d1d5db" />
                <path d="M 100 230 L 300 230 L 280 245 L 120 245 Z" fill="#9ca3af" />
                <foreignObject x="15" y="25" width="370" height="170">
                    <TerminalWindow logs={logs} title="Data Ingestion Terminal" />
                </foreignObject>
            </svg>
            <div className="text-center mt-4">
                <h3 className="text-lg font-semibold text-blue-600">Data Ingestion</h3>
                <p className="text-sm text-gray-500">ThinkBlueData & GuardAI</p>
            </div>
        </div>
    );
}; 