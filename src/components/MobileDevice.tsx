"use client";
import React, { useState, useEffect } from 'react';
import { TerminalWindow } from './TerminalWindow';

export const MobileDevice = ({ animationStep }: { animationStep: number }) => {
  const [apiLogs, setApiLogs] = useState<string[]>([]);
  const allLogs = [
    "deploy_api('GuardAI-FastAPI')",
    "run_automation('LinkedIn-Bot')",
    "containerize_with_docker()",
    "✅ Systems online."
  ];

  useEffect(() => {
    if (animationStep === 3) {
      setApiLogs([]);
      let i = 0;
      const interval = setInterval(() => {
        if (i < allLogs.length) {
          setApiLogs(prev => [...prev, allLogs[i]]);
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
      <svg viewBox="0 0 300 500" className="w-full max-w-sm mx-auto drop-shadow-2xl">
        <rect x="0" y="10" width="300" height="480" rx="40" fill="#1e293b" />
        <rect x="15" y="25" width="270" height="450" rx="25" fill="black" />
        <rect x="100" y="15" width="100" height="15" rx="7.5" fill="#1e293b" />
        <foreignObject x="20" y="30" width="260" height="440">
          <TerminalWindow logs={apiLogs} title="Inference API" compact={true} />
        </foreignObject>
      </svg>
    </div>
  );
};