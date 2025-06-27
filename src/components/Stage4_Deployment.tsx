"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const Stage4_Deployment = () => {
    return (
         <div className="relative w-full h-full flex flex-col items-center justify-center">
              {/* Stats Bubble */}
            <motion.div
                 className="absolute -top-8 left-0 z-20 bg-white rounded-lg p-3 shadow-lg border border-gray-200/80 text-sm font-semibold space-y-1"
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.5, delay: 3.2 }}
            >
                <p className="text-cyan-600">API: FastAPI</p>
                <p className="text-cyan-600">Posts: 1K+/day</p>
                <p className="text-cyan-600 flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Status: Live</p>
            </motion.div>

             {/* Mobile Device SVG */}
            <svg viewBox="0 0 200 400" className="w-full max-w-[150px] mx-auto drop-shadow-xl">
                <rect x="0" y="0" width="200" height="400" rx="30" fill="#1e293b" />
                <rect x="10" y="10" width="180" height="380" rx="20" fill="black" />
                 <foreignObject x="15" y="15" width="170" height="370">
                    <div className="font-mono text-xs text-green-400 p-4">
                        <p className="text-gray-400">$ Deployment Hub</p>
                    </div>
                </foreignObject>
            </svg>
            
            <div className="text-center mt-4">
                <h3 className="text-lg font-semibold text-cyan-600">Deployment</h3>
                <p className="text-sm text-gray-500">LinkedIn Automation</p>
            </div>
         </div>
    );
}; 