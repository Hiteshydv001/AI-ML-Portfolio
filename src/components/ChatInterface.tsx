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
        <div className="relative w-full h-[600px] max-w-4xl mx-auto p-4">
            <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 via-blue-500/5 to-purple-800/10 rounded-2xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(0,0,0,0))]" />
            
            {/* Animated border effect */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-blue-600 to-purple-700 opacity-20 animate-gradient-x" />
            </div>
            
            {/* Main chat container */}
            <div className="relative h-full rounded-2xl border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700/50 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                            <h3 className="text-slate-200 font-semibold">AI Assistant</h3>
                        </div>
                        <div className="flex space-x-1">
                            <div className="w-2 h-2 rounded-full bg-slate-600" />
                            <div className="w-2 h-2 rounded-full bg-slate-600" />
                            <div className="w-2 h-2 rounded-full bg-slate-600" />
                        </div>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="h-[calc(100%-8rem)] overflow-y-auto p-4 space-y-4">
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
                                    max-w-[80%] rounded-xl p-4 text-sm md:text-base
                                    ${message.role === 'user' 
                                        ? 'bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/20' 
                                        : 'bg-gradient-to-br from-slate-800 to-slate-900 text-slate-200 shadow-lg border border-slate-700/50'
                                    }
                                `}>
                                    <p className="whitespace-pre-wrap leading-relaxed">
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
                                <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-slate-200 rounded-xl p-4 shadow-lg border border-slate-700/50">
                                    {currentResponse ? (
                                        <p className="whitespace-pre-wrap leading-relaxed">{currentResponse}</p>
                                    ) : (
                                        <div className="flex space-x-2">
                                            <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-slate-900/95 border-t border-slate-800">
                    <form onSubmit={handleSubmit} className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Type your message..."
                            className="w-full bg-slate-800 text-slate-200 rounded-xl pl-6 pr-14 py-4 text-sm md:text-base border border-slate-700 
                                     focus:outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 
                                     placeholder-slate-400 shadow-lg transition-all duration-200"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-500 hover:text-sky-400 disabled:opacity-50 
                                     disabled:hover:text-sky-500 transition-colors duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};