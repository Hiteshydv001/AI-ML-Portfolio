"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typewriter } from "./Typewriter";

// --- Data for the animated terminal logs ---
const pipelineStages = [
    { title: "DATA INGESTION", logs: ["> Initializing neural pathways...", "✅ Memory clusters allocated: 1.21 PB", "✅ Neural bridges established: 10M+"] },
    { title: "DATA PROCESSING", logs: ["> Training synthetic neurons...", "> Optimizing synaptic weights...", "✅ Neural plasticity: 98.7%"] },
    { title: "TOKENIZATION", logs: ["> Neural tokenizer online...", "> Processing semantic patterns...", "✅ Compression ratio: 42x"] },
    { title: "MODEL TRAINING", logs: ["> Training deep networks...", "📈 Neural efficiency: 99.9%", "✅ Model convergence: 0.89"] },
    { title: "RAG & VECTOR DB", logs: ["> Embedding in vector space...", "> Knowledge graph: stable", "✅ Semantic anchor: δ < 0.001"] },
    { title: "DEPLOYMENT", logs: ["> Activating neural cores...", "> AI mesh: operational", "✅ System Status: ONLINE"] },
];

interface TypewriterTextProps {
    text: string;
    delay?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, delay = 0 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() => {
        if (delay > 0) {
            const delayTimeout = setTimeout(() => {
                startTyping();
            }, delay);
            return () => clearTimeout(delayTimeout);
        } else {
            startTyping();
        }
    }, [delay]);

    const startTyping = () => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => {
                if (prev >= text.length - 1) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + 1;
            });
        }, 35);

        return () => clearInterval(interval);
    };

    useEffect(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
    }, [currentIndex, text]);

    return <span>{displayedText}</span>;
};

// Neural network visualization
const NeuralNetwork: React.FC = () => {
    return (
        <g className="neural-network">
            {/* Neural layers */}
            {[0, 1, 2].map((layer) => (
                <g key={layer} transform={`translate(${100 + layer * 150}, 0)`}>
                    {[0, 1, 2, 3].map((node) => (
                        <g key={`${layer}-${node}`}>
                            <circle
                                cx={0}
                                cy={100 + node * 50}
                                r={4}
                                className="fill-green-400/50 animate-pulse"
                                style={{ animationDelay: `${layer * 0.3 + node * 0.2}s` }}
                            />
                            {layer < 2 && [0, 1, 2, 3].map((nextNode) => (
                                <line
                                    key={`${layer}-${node}-${nextNode}`}
                                    x1={0}
                                    y1={100 + node * 50}
                                    x2={150}
                                    y2={100 + nextNode * 50}
                                    className="stroke-green-400/10"
                                    strokeWidth={1}
                                >
                                    <animate
                                        attributeName="stroke-opacity"
                                        values="0.1;0.4;0.1"
                                        dur="3s"
                                        repeatCount="indefinite"
                                        begin={`${layer * 0.5 + node * 0.2}s`}
                                    />
                                </line>
                            ))}
                        </g>
                    ))}
                </g>
            ))}
            
            {/* Data flow particles */}
            {[0, 1].map((layer) => (
                <g key={`flow-${layer}`}>
                    {[0, 1, 2, 3].map((node) => (
                        <circle
                            key={`particle-${layer}-${node}`}
                            r={2}
                            className="fill-green-400"
                        >
                            <animateMotion
                                path={`M ${100 + layer * 150} ${100 + node * 50} L ${250 + layer * 150} ${100 + ((node + 1) % 4) * 50}`}
                                dur="2s"
                                repeatCount="indefinite"
                                begin={`${layer * 0.5 + node * 0.3}s`}
                            />
                        </circle>
                    ))}
                </g>
            ))}
        </g>
    );
};

export const AIWorkstation = () => {
    const [currentStageIndex, setCurrentStageIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStageIndex(prev => (prev + 1) % pipelineStages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);

    const currentStage = pipelineStages[currentStageIndex];

    const startTyping = () => {
        setIsTyping(true);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            startTyping();
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-full h-full flex items-center justify-center p-4">
            <svg viewBox="0 0 800 500" className="w-full max-w-6xl drop-shadow-2xl">
                <defs>
                    <linearGradient id="screen-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#020617" />
                        <stop offset="50%" stopColor="#0f172a" />
                        <stop offset="100%" stopColor="#1e293b" />
                    </linearGradient>
                    
                    <radialGradient id="ambient-light" cx="50%" cy="0%" r="100%">
                        <stop offset="0%" stopColor="#4ade8020" />
                        <stop offset="100%" stopColor="#00000000" />
                    </radialGradient>

                    <filter id="monitor-glow">
                        <feGaussianBlur stdDeviation="2" result="base-blur" />
                        <feColorMatrix
                            in="base-blur"
                            type="matrix"
                            values="0 0 0 0 0.29
                                    0 0 0 0 0.87
                                    0 0 0 0 0.49
                                    0 0 0 1 0"
                            result="green-glow"
                        />
                        <feMerge>
                            <feMergeNode in="green-glow" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    <filter id="monitor-shadow">
                        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.3" />
                    </filter>

                    {/* Grid pattern */}
                    <pattern id="grid-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path
                            d="M 20 0 L 0 0 0 20"
                            fill="none"
                            stroke="#4ade8008"
                            strokeWidth="1"
                        />
                    </pattern>
                </defs>

                {/* Monitor Stand */}
                <path 
                    d="M 360 460 C 360 460, 380 455, 400 455 C 420 455, 440 460, 440 460 L 460 480 L 340 480 Z" 
                    fill="url(#screen-gradient)"
                    filter="url(#monitor-shadow)"
                />
                <path
                    d="M 395 400 Q 395 430, 395 460 L 405 460 Q 405 430, 405 400 Z"
                    fill="#1e293b"
                />

                {/* Monitor Frame */}
                <rect
                    x="100" y="20" width="600" height="380" rx="20"
                    fill="#1e293b"
                    filter="url(#monitor-shadow)"
                />
                <rect
                    x="105" y="25" width="590" height="370" rx="18"
                    fill="#0f172a"
                />

                {/* Screen */}
                <rect
                    x="115" y="35" width="570" height="350" rx="12"
                    fill="url(#screen-gradient)"
                />
                <rect
                    x="115" y="35" width="570" height="350" rx="12"
                    fill="url(#grid-pattern)"
                />
                <rect
                    x="115" y="35" width="570" height="350" rx="12"
                    fill="url(#ambient-light)"
                    stroke="#4ade80"
                    strokeWidth="1.5"
                    style={{ filter: 'url(#monitor-glow)' }}
                />

                {/* Neural Network Visualization */}
                <NeuralNetwork />

                {/* Window Controls */}
                <g transform="translate(125, 45)">
                    <circle cx="10" cy="10" r="4" fill="#ef4444" />
                    <circle cx="25" cy="10" r="4" fill="#f59e0b" />
                    <circle cx="40" cy="10" r="4" fill="#10b981" />
                </g>

                {/* Terminal Content */}
                <foreignObject x="125" y="65" width="550" height="310">
                    <div className="relative font-mono text-xs text-green-400 p-4 h-full flex flex-col bg-gradient-to-b from-transparent to-black/20 rounded-lg backdrop-blur-sm">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStage.title}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="border-b border-green-400/30 pb-2 mb-2"
                            >
                                <p className="text-sm font-bold text-green-300 flex items-center">
                                    <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
                                    <TypewriterText text={`[ STAGE ${currentStageIndex + 1}/${pipelineStages.length}: ${currentStage.title} ]`} />
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        <div className="flex-grow font-mono relative z-10">
                            <AnimatePresence mode="wait">
                                <div key={currentStage.title}>
                                {currentStage.logs.map((log, i) => (
                                        <div key={`${currentStage.title}-${i}`} className="leading-relaxed flex items-center">
                                            <span className={`
                                                ${log.startsWith('✅') ? 'text-emerald-400' : (log.startsWith('📈') ? 'text-green-200' : 'text-green-400')}
                                                ${log.startsWith('>') ? 'animate-pulse' : ''}
                                            `}>
                                                {log.startsWith('>') ? '>' : '•'}
                                            </span>
                                            <span className="ml-2 text-green-300">
                                                <TypewriterText 
                                                    text={log.substring(1)} 
                                                    delay={i * 1500}
                                                />
                                                {i === currentStage.logs.length - 1 && showCursor && (
                                                    <span className="animate-blink">▊</span>
                                                )}
                                            </span>
                                        </div>
                                ))}
                                </div>
                            </AnimatePresence>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-slate-800/50 rounded-full h-2 mt-auto overflow-hidden relative">
                            <div className="absolute inset-0 bg-green-400/10 animate-pulse"></div>
                             <motion.div
                                key={`${currentStage.title}-progress`}
                                className="relative bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-full h-2"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 5, ease: "linear" }}
                            >
                                <div className="absolute top-0 right-0 w-4 h-full bg-white/20 blur-sm"></div>
                            </motion.div>
                        </div>
                    </div>
                </foreignObject>

                {/* Decorative Circuit Lines */}
                <g className="circuit-lines" stroke="#4ade8015" strokeWidth="1">
                    <path d="M 50 100 Q 70 100, 90 120" fill="none" />
                    <path d="M 50 200 Q 70 200, 90 180" fill="none" />
                    <path d="M 750 100 Q 730 100, 710 120" fill="none" />
                    <path d="M 750 200 Q 730 200, 710 180" fill="none" />
                </g>
            </svg>
        </div>
    );
};