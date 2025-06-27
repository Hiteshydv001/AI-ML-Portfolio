"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const VectorStore = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
             {/* Stats Bubble */}
            <motion.div
                 className="absolute -top-6 left-0 z-20 bg-white rounded-lg p-3 shadow-lg border border-gray-200/80 text-sm font-semibold space-y-1"
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.5, delay: 2.2 }}
            >
                <p className="text-green-600 flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Agents: Multi</p>
                <p className="text-green-600">Gain: +40%</p>
                <p className="text-green-600 flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Status: Active</p>
            </motion.div>

            {/* Vector Store SVG */}
             <svg viewBox="0 0 400 250" className="w-full drop-shadow-xl">
                 <rect x="0" y="10" width="400" height="220" rx="20" fill="#f0fdf4" stroke="#dcfce7" />
                 {/* Left visual */}
                 <g transform="translate(40, 70)">
                    {[...Array(5)].map((_, i) => (
                        <motion.circle key={i} cx={i*15} cy={i*10 + 20} r="5" fill="#16a34a"
                            initial={{ scale: 0}}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 2.5 + i * 0.1 }}
                        />
                    ))}
                 </g>
                 {/* Terminal Window */}
                 <foreignObject x="150" y="40" width="230" height="150">
                    <div className="font-mono text-[10px] bg-gray-800 text-green-400 p-4 rounded-lg h-full leading-relaxed">
                        <p>&gt; build_agent(&apos;Multi-RAG-Agent&apos;)</p>
                        <p className="text-gray-400"># Efficiency gain: +40%</p>
                    </div>
                </foreignObject>
             </svg>
        </div>
    );
}; 