"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalWindowProps {
  logs: string[];
  title?: string;
  compact?: boolean;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({ 
  logs, 
  title = "Terminal", 
  compact = false 
}) => {
  const [currentLog, setCurrentLog] = useState('');

  useEffect(() => {
    setCurrentLog(logs.length > 0 ? logs[logs.length - 1] : '');
  }, [logs]);

  return (
    <div className={`bg-black/80 backdrop-blur-sm rounded-lg border border-gray-600/50 shadow-lg ${compact ? 'text-xs h-full' : 'text-sm h-full'} flex flex-col`}>
      {/* Terminal Header */}
      <div className="flex items-center bg-gray-800/80 px-3 py-2 rounded-t-lg border-b border-gray-600/50">
        <div className="flex space-x-1.5">
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
        </div>
      </div>
      
      {/* Terminal Content */}
      <div className={`flex-1 p-3 font-mono text-green-400 ${compact ? 'min-h-[100px]' : 'min-h-[150px]'} flex flex-col justify-start`}>
        <AnimatePresence mode="popLayout">
          {logs.map((log, index) => (
            <motion.div
              layout
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-start"
            >
              <span className="text-cyan-400 mr-2 flex-shrink-0">$</span>
              <span className="flex-1 break-words">{log}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};