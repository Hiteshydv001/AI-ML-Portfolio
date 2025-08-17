"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const TerminalWindow = ({ logs, title, compact = false }: { logs: string[], title: string, compact?: boolean }) => {
  return (
    // Explicit dark background for the terminal itself
    <div className={`bg-[#1e2937] rounded-lg h-full flex flex-col`}>
      {/* Terminal Header */}
      <div className="flex items-center bg-gray-700/50 px-3 py-1.5 rounded-t-lg border-b border-gray-600/50">
        <div className="flex space-x-1.5">
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
        </div>
      </div>
      
      {/* Terminal Content */}
      <div className={`p-3 font-mono text-green-400 ${compact ? 'text-xs leading-tight' : 'text-sm leading-relaxed'}`}>
        <p className="text-gray-400 font-medium">{title}</p>
        <AnimatePresence>
            {logs.map((log, index) => (
                <motion.p
                    layout
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                    <span className="text-blue-400 mr-1">$</span>
                    <span className="text-green-300">{log}</span>
                </motion.p>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}; 