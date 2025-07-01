"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    isStreaming?: boolean;
}

export const ChatInterface = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFirstMount, setIsFirstMount] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [streamedText, setStreamedText] = useState('');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isFirstMount) {
            setIsFirstMount(false);
            if (messages.length > 0) {
                scrollToBottom();
            }
            return;
        }
        
        if (messages.length > 0) {
            scrollToBottom();
        }
    }, [messages, isFirstMount]);

    const simulateStreamingResponse = async (response: string) => {
        setMessages(prev => [...prev, { role: 'assistant', content: '', isStreaming: true }]);
        
        let currentText = '';
        const words = response.split(' ');
        
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const delay = Math.random() * 50 + 30; // Random delay between 30-80ms
            
            await new Promise(resolve => setTimeout(resolve, delay));
            
            currentText += (i === 0 ? '' : ' ') + word;
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                    role: 'assistant',
                    content: currentText,
                    isStreaming: i < words.length - 1
                };
                return newMessages;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            if (!userMessage.trim()) {
                throw new Error('Please enter a message');
            }

            const response = await fetch('/api/v1/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `Server error: ${response.status}`);
            }

            if (!data.response) {
                throw new Error('Invalid response from server');
            }

            await simulateStreamingResponse(data.response);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
            await simulateStreamingResponse(`I apologize, but there was an error: ${errorMessage}. Please try again later.`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative w-full h-full flex items-center justify-center p-4">
            <svg viewBox="0 0 1200 800" className="w-full max-w-7xl drop-shadow-2xl">
                <defs>
                    <linearGradient id="monitor-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#020617" />
                        <stop offset="50%" stopColor="#0f172a" />
                        <stop offset="100%" stopColor="#1e293b" />
                    </linearGradient>
                    
                    <radialGradient id="chat-ambient-light" cx="50%" cy="0%" r="100%">
                        <stop offset="0%" stopColor="#4ade8020" />
                        <stop offset="100%" stopColor="#00000000" />
                    </radialGradient>

                    <filter id="chat-glow">
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

                    <filter id="chat-shadow">
                        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.3" />
                    </filter>

                    <pattern id="chat-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
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
                    d="M 520 720 C 520 720, 560 715, 600 715 C 640 715, 680 720, 680 720 L 720 760 L 480 760 Z" 
                    fill="url(#monitor-gradient)"
                    filter="url(#chat-shadow)"
                />
                <path
                    d="M 590 620 Q 590 670, 590 720 L 610 720 Q 610 670, 610 620 Z"
                    fill="#1e293b"
                />

                {/* Monitor Frame */}
                <rect
                    x="150" y="40" width="900" height="580" rx="30"
                    fill="#1e293b"
                    filter="url(#chat-shadow)"
                />
                <rect
                    x="157" y="47" width="886" height="566" rx="27"
                    fill="#0f172a"
                />
                
                {/* Screen */}
                <rect
                    x="172" y="62" width="856" height="536" rx="20"
                    fill="url(#monitor-gradient)"
                />
                <rect
                    x="172" y="62" width="856" height="536" rx="20"
                    fill="url(#chat-grid)"
                />
                <rect
                    x="172" y="62" width="856" height="536" rx="20"
                    fill="url(#chat-ambient-light)"
                    stroke="#4ade80"
                    strokeWidth="2"
                    style={{ filter: 'url(#chat-glow)' }}
                />

                {/* Window Controls */}
                <g transform="translate(187, 77)">
                    <circle cx="15" cy="15" r="6" fill="#ef4444" />
                    <circle cx="37" cy="15" r="6" fill="#f59e0b" />
                    <circle cx="59" cy="15" r="6" fill="#10b981" />
                </g>

                {/* Chat Content */}
                <foreignObject x="187" y="107" width="826" height="476">
                    <div className="h-full flex flex-col bg-gradient-to-b from-transparent to-black/20 rounded-lg backdrop-blur-sm text-green-400 font-mono">
                        {/* Messages Area */}
                        <div className="flex-grow overflow-y-auto p-6 space-y-4 text-base">
                            <AnimatePresence mode="popLayout">
                                {messages.map((message, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`
                                            max-w-[80%] rounded-lg p-3 text-sm
                                            ${message.role === 'user' 
                                                ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
                                                : 'bg-slate-800/50 border border-slate-700 text-green-400'
                                            }
                                        `}>
                                            <p className="whitespace-pre-wrap">
                                                {message.content}
                                                {message.isStreaming && (
                                                    <span className="inline-block w-2 h-4 ml-1 bg-green-400 animate-pulse">▊</span>
                                                )}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                                {isLoading && !messages[messages.length - 1]?.isStreaming && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex justify-start"
                                    >
                                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                                            <div className="flex space-x-2">
                                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-6 border-t border-slate-700/50">
                            <form onSubmit={handleSubmit} className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your message..."
                                    className="w-full bg-slate-800/50 text-green-400 rounded-lg pl-6 pr-14 py-4 text-base border border-slate-700 focus:outline-none focus:border-green-500/50 placeholder-green-600/30"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 hover:text-green-300 disabled:opacity-50 disabled:hover:text-green-400"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </foreignObject>

                {/* Decorative Circuit Lines */}
                <g className="circuit-lines" stroke="#4ade8015" strokeWidth="1.5">
                    <path d="M 75 150 Q 105 150, 135 180" fill="none" />
                    <path d="M 75 300 Q 105 300, 135 270" fill="none" />
                    <path d="M 1125 150 Q 1095 150, 1065 180" fill="none" />
                    <path d="M 1125 300 Q 1095 300, 1065 270" fill="none" />
                </g>
            </svg>
        </div>
    );
}; 