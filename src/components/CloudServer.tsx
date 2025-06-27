"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const CloudServer = () => {
    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
            <motion.div className="absolute -top-8 left-0 z-20 bg-white rounded-lg p-3 shadow-lg border border-gray-200/80 text-sm font-semibold space-y-1" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 1.2 }}>
                <p className="text-purple-600">TicketNet: 94%</p>
                <p className="text-purple-600">WasteNet: 92%</p>
                <p className="text-purple-600">Speed: +25%</p>
            </motion.div>
            <svg viewBox="0 0 400 250" className="w-full max-w-sm drop-shadow-xl">
                <rect x="0" y="10" width="400" height="220" rx="20" fill="#f9fafb" stroke="#e5e7eb" />
                <rect x="20" y="30" width="120" height="150" rx="10" fill="#f3e8ff" />
                <circle cx="80" cy="70" r="25" fill="#a855f7" />
                <text x="80" y="125" textAnchor="middle" className="font-bold text-gray-700 text-sm">Model</text>
                <text x="80" y="140" textAnchor="middle" className="font-bold text-gray-700 text-sm">Training Hub</text>
                <rect x="160" y="30" width="220" height="150" rx="10" fill="white" />
                <rect x="20" y="190" width="360" height="30" rx="5" fill="#f3f4f6" />
                <text x="40" y="210" className="text-xs font-mono text-gray-600">CPU: 98%</text>
                <text x="160" y="210" className="text-xs font-mono text-gray-600">GPU: 96%</text>
                <text x="280" y="210" className="text-xs font-mono text-gray-600">RAM: 87%</text>
            </svg>
            <div className="text-center mt-4">
                <h3 className="text-lg font-semibold text-purple-600">Model Training</h3>
                <p className="text-sm text-gray-500">TicketConfirmNet & WasteNet</p>
            </div>
        </div>
    );
}; 