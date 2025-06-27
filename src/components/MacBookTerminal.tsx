"use client";
import React from "react";
import { motion } from 'framer-motion';

export const MacBookTerminal = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Status Bubble */}
            <motion.div
                className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2 bg-white rounded-full px-4 py-1.5 shadow-lg border border-gray-200/80"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Processing</span>
            </motion.div>

            {/* Laptop SVG */}
            <svg viewBox="0 0 400 250" className="w-full drop-shadow-xl">
                {/* Body */}
                <rect x="0" y="10" width="400" height="220" rx="20" fill="#e5e7eb" />
                <rect x="10" y="20" width="380" height="180" rx="10" fill="#1e2937" />
                {/* Keyboard area */}
                <rect x="30" y="205" width="340" height="20" rx="5" fill="#d1d5db" />
                {/* Base */}
                <path d="M 100 230 L 300 230 L 280 245 L 120 245 Z" fill="#9ca3af" />

                {/* Terminal Content */}
                <foreignObject x="15" y="25" width="370" height="170">
                    <div className="font-mono text-[10px] text-green-400 p-4 leading-relaxed">
                        <p><span className="text-blue-400">$</span> init_ingestion(sources=[&apos;web&apos;, &apos;academic_papers&apos;])</p>
                        <p><span className="text-blue-400">$</span> Connecting to data sources...</p>
                        <p>&gt; curate_dataset(&apos;ThinkBlueData&apos;, samples=10000+)</p>
                    </div>
                </foreignObject>
            </svg>
        </div>
    );
};