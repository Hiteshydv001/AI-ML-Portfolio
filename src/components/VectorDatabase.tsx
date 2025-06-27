"use client";
import React, { useState, useEffect } from 'react';
import { TerminalWindow } from './TerminalWindow';

export const VectorDatabase = ({ animationStep }: { animationStep: number }) => {
    const [logs, setLogs] = useState<string[]>([]);
    const allLogs = [
        "init_vector_db(engine='FAISS')",
        "index_documents('Multi-RAG')",
        "create_retriever()",
        "✅ RAG pipeline ready."
    ];

    useEffect(() => {
        if (animationStep === 2) {
            setLogs([]);
            let i = 0;
            const interval = setInterval(() => {
                if (i < allLogs.length) {
                    setLogs(prev => [...prev, allLogs[i]]);
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 800);
            return () => clearInterval(interval);
        }
    }, [animationStep]);

    return (
        <div className="relative w-full h-full">
            <svg viewBox="0 0 400 250" className="w-full drop-shadow-2xl">
                <rect x="0" y="10" width="400" height="230" rx="15" fill="#052e16" stroke="#10b981" strokeWidth="1" strokeOpacity="0.5" />
                <foreignObject x="25" y="30" width="350" height="195">
                    <TerminalWindow logs={logs} title="Vector Indexing" />
                </foreignObject>
            </svg>
        </div>
    );
};