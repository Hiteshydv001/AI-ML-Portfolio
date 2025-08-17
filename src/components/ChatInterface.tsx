"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export const ChatInterface = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentResponse, setCurrentResponse] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            const scrollContainer = messagesEndRef.current.parentElement;
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(scrollToBottom, 100);
        return () => clearTimeout(timeoutId);
    }, [messages, currentResponse]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const processStreamResponse = async (response: Response) => {
        const reader = response.body?.getReader();
        if (!reader) throw new Error("No response body");

        const decoder = new TextDecoder();
        let buffer = '';
        let fullResponse = '';

        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                // Decode the chunk and add it to our buffer
                buffer += decoder.decode(value, { stream: true });

                // Process complete messages from the buffer
                const lines = buffer.split('\n');
                buffer = lines.pop() || ''; // Keep the last incomplete line in the buffer

                for (const line of lines) {
                    if (line.trim() === '') continue;
                    if (!line.startsWith('data: ')) continue;

                    try {
                        const data = JSON.parse(line.substring(6));
                        console.log('Received data:', data);

                        if (data.type === 'text') {
                            fullResponse += data.data;
                            setCurrentResponse(fullResponse);
                        } else if (data.type === 'end') {
                            console.log('End of stream, final response:', fullResponse);
                            if (fullResponse) {
                                setMessages(prev => [...prev, {
                                    role: 'assistant',
                                    content: fullResponse
                                }]);
                                setCurrentResponse('');
                            }
                        }
                    } catch (error) {
                        console.error('Error parsing line:', line, error);
                    }
                }
            }

            // Process any remaining data in the buffer
            if (buffer) {
                console.log('Processing remaining buffer:', buffer);
                if (buffer.startsWith('data: ')) {
                    try {
                        const data = JSON.parse(buffer.substring(6));
                        if (data.type === 'text') {
                            fullResponse += data.data;
                            setCurrentResponse(fullResponse);
                        }
                    } catch (error) {
                        console.error('Error parsing final buffer:', error);
                    }
                }
            }
        } catch (error) {
            console.error('Error reading stream:', error);
            throw error;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setIsLoading(true);
        setCurrentResponse('');
        
        // Add user message immediately
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

        try {
            console.log('Sending request with message:', userMessage);
            const response = await fetch('/api/v1/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    chat_history: messages.map(msg => ({
                        role: msg.role,
                        content: msg.content
                    }))
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            await processStreamResponse(response);
        } catch (error) {
            console.error('Error in chat:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I apologize, but I encountered an error. Please try again."
            }]);
        } finally {
            setIsLoading(false);
            setCurrentResponse('');
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
                    <div className="h-full flex flex-col bg-gradient-to-b from-slate-900/90 to-black/40 rounded-lg backdrop-blur-sm text-green-400 font-mono shadow-xl">
                        {/* Messages Area */}
                        <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4 text-sm md:text-base">
                            <AnimatePresence mode="popLayout">
                                {messages.map((message: Message, index: number) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`
                                            max-w-[80%] rounded-lg p-3 text-sm md:text-base font-medium
                                            ${message.role === 'user' 
                                                ? 'bg-green-500/30 border border-green-500/40 text-green-300 shadow-green-500/20 shadow-lg' 
                                                : 'bg-slate-800/80 border border-slate-600 text-green-300 shadow-lg'
                                            }
                                        `}>
                                            <p className="whitespace-pre-wrap leading-relaxed tracking-wide">
                                                {message.content}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                                {(isLoading || currentResponse) && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex justify-start"
                                    >
                                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-sm">
                                            {currentResponse ? (
                                                <p className="whitespace-pre-wrap">{currentResponse}</p>
                                            ) : (
                                                <div className="flex space-x-2">
                                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div ref={messagesEndRef} />
                        </div>
                        
                        {/* Input Area */}
                        <div className="p-4 md:p-6 border-t border-slate-600/50 bg-slate-900/50">
                            <form onSubmit={handleSubmit} className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="Type your message..."
                                    className="w-full bg-slate-800/90 text-green-300 rounded-lg pl-6 pr-14 py-4 text-sm md:text-base font-medium border border-slate-600 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-500/20 placeholder-green-500/40 shadow-lg transition-all duration-200"
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