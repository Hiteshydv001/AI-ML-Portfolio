"use client";
import React, { useState, useEffect } from 'react';
import { TerminalWindow } from './TerminalWindow';

export const CloudServer = ({ animationStep }: { animationStep: number }) => {
    const [logs, setLogs] = useState<string[]>([]);
    const allLogs = [
        "train_model('TicketConfirmNet')",
        "finetune('WasteNet-YOLO')",
        "eval_on_mmlu(acc=92.3%)",
        "✅ Training complete."
    ];

    useEffect(() => {
        if (animationStep === 1) {
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
                 <rect x="0" y="10" width="400" height="230" rx="15" fill="#111827" stroke="#a78bfa" strokeWidth="1" strokeOpacity="0.5" />
                 {[...Array(5)].map((_, i) => (
                    <rect key={i} x="20" y={25 + i * 42} width="360" height="30" rx="5" fill="#1f2937" />
                 ))}
                 <foreignObject x="25" y="30" width="350" height="195">
                    <TerminalWindow logs={logs} title="Training Cluster" />
                </foreignObject>
            </svg>
        </div>
    );
};