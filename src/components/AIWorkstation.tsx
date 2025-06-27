"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Data for the animated terminal logs ---
const pipelineStages = [
    { title: "DATA INGESTION", logs: ["> Scraper targeting 'arxiv' & 'github'...", "✅ Curated 10k+ samples from 'ThinkBlueData'.", "✅ Processed CV data for 'GuardAI'."] },
    { title: "DATA PROCESSING", logs: ["> Cleaning and filtering raw text...", "> Deduplicating dataset...", "✅ Preprocessing complete."] },
    { title: "TOKENIZATION", logs: ["> Initializing BPE tokenizer...", "> Processing 2.1TB of text...", "✅ Corpus tokenized."] },
    { title: "MODEL TRAINING", logs: ["> Training 'TicketConfirmNet' (ICACCTech 2024)...", "📈 Finetuning 'WeatherRouteNet' (ICRAAI 2025)...", "✅ Training Loss: 0.18 | Accuracy: 94%"] },
    { title: "RAG & VECTOR DB", logs: ["> Building 'Multi-RAG-Agent'...", "> Indexing documents with FAISS...", "✅ Vector store active. Gain: +40%"] },
    { title: "DEPLOYMENT", logs: ["> Containerizing with Docker...", "> Deploying API via FastAPI...", "✅ API Live. Status: 200 OK"] },
];

export const AIWorkstation = () => {
    const [currentStageIndex, setCurrentStageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStageIndex(prev => (prev + 1) % pipelineStages.length);
        }, 3500); // Cycle through stages every 3.5 seconds
        return () => clearInterval(interval);
    }, []);

    const currentStage = pipelineStages[currentStageIndex];

    return (
        <div className="relative w-full h-full flex items-center justify-center p-4">
            <svg viewBox="0 0 600 400" className="w-full max-w-3xl drop-shadow-2xl">
                <defs>
                    <linearGradient id="screen-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0f172a" />
                        <stop offset="100%" stopColor="#1e293b" />
                    </linearGradient>
                    <filter id="monitor-glow">
                        <feGaussianBlur stdDeviation="7" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Monitor Stand */}
                <path d="M 280 380 L 320 380 L 340 400 L 260 400 Z" fill="#9ca3af" />
                <rect x="295" y="320" width="10" height="60" fill="#cbd5e1" />

                {/* Monitor */}
                <rect
                    x="50" y="20" width="500" height="300" rx="20"
                    fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2"
                />
                <rect
                    x="65" y="35" width="470" height="270" rx="10"
                    fill="url(#screen-gradient)" stroke="#3b82f6" strokeWidth="1"
                    style={{ filter: 'url(#monitor-glow)' }}
                />

                {/* Terminal Content */}
                <foreignObject x="75" y="45" width="450" height="250">
                    <div className="font-mono text-xs text-white p-4 h-full flex flex-col">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStage.title}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.5 }}
                                className="border-b border-blue-400/30 pb-2 mb-2"
                            >
                                <p className="text-sm font-bold text-blue-300">
                                    [ STAGE {currentStageIndex + 1}/{pipelineStages.length}: {currentStage.title} ]
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        <div className="flex-grow">
                            <AnimatePresence>
                                {currentStage.logs.map((log, i) => (
                                    <motion.p
                                        key={`${currentStage.title}-${i}`}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.5 + i * 0.3 }}
                                        className="leading-relaxed"
                                    >
                                        <span className={log.startsWith('✅') ? 'text-green-400' : (log.startsWith('📈') ? 'text-purple-400' : 'text-cyan-400')}>{log.startsWith('>') ? '>' : '•'}</span>
                                        <span className="ml-2 text-gray-300">{log.substring(1)}</span>
                                    </motion.p>
                                ))}
                            </AnimatePresence>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-700/50 rounded-full h-1.5 mt-auto">
                             <motion.div
                                key={`${currentStage.title}-progress`}
                                className="bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full h-1.5"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 3.5, ease: "linear" }}
                             ></motion.div>
                        </div>
                    </div>
                </foreignObject>
            </svg>
        </div>
    );
};