"use client";
import React, { useRef, useState, useEffect } from "react";

type Prediction = { label: string; confidence: number };

export default function GuessDrawingGame() {
  console.log('🎯 Component: GuessDrawingGame mounted');
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize canvas on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set initial background
    ctx.fillStyle = "#f9fafb";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // Analyze drawing using Hugging Face API
  const analyzeDrawing = async (): Promise<Prediction[]> => {
    console.log('🎨 Frontend: Starting drawing analysis');
    if (!canvasRef.current) {
      console.error('❌ Frontend: No canvas reference found');
      throw new Error("No canvas found");
    }

    const canvas = canvasRef.current;
    
    try {
      setPredictions([]); // Clear previous predictions
      console.log('🖼️ Frontend: Converting canvas to base64...');
      // Convert canvas to base64 image
      const imageBase64 = canvas.toDataURL('image/png').split(',')[1];
      console.log('✅ Frontend: Image converted successfully');

      console.log('🚀 Frontend: Sending request to API...');
      // Send to our API endpoint
      const response = await fetch('/api/sketch-recognition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageBase64 }),
      });
      console.log('📡 Frontend: Response received, status:', response.status);
      
      console.log('API Response Status:', response.status);

      if (!response.ok) {
        throw new Error('Failed to analyze drawing');
      }

      const result = await response.json();
      console.log('API Response:', result);

      if (result.error) {
        throw new Error(result.error);
      }

      // Check if there are any predictions
      if (!Array.isArray(result)) {
        console.error('Invalid API response:', result);
        throw new Error('Invalid response from API');
      }

      if (result.length === 0) {
        throw new Error('No predictions returned from API');
      }

      return result;
    } catch (error) {
      console.error("Error during analysis:", error);
      throw error;
    }
  };

  // Drawing logic
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    console.log('🖊️ User Action: Started drawing');
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set up drawing style
    ctx.strokeStyle = "#000000"; // Pure black for better detection
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = async () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    setError(null);
    
    try {
      setIsAnalyzing(true);
      const results = await analyzeDrawing();
      setPredictions(results);
    } catch (error) {
      console.error("Error analyzing drawing:", error);
      setError(error instanceof Error ? error.message : "Failed to analyze drawing");
      setPredictions([]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Clear the canvas with white background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f9fafb";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    setPredictions([]);
    setError(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full px-2 sm:px-4 py-6 max-w-7xl mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center tracking-tight">Guess the Drawing – AI Pictionary</h1>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full max-w-3xl">
        <div className="bg-white rounded-2xl shadow-xl p-3 sm:p-5 flex flex-col items-center w-full md:w-1/2">
          <div className="w-full max-w-xs aspect-square relative">
            <canvas
              ref={canvasRef}
              width={320}
              height={320}
              className="border-2 border-gray-300 rounded-xl cursor-crosshair bg-gray-50 w-full h-full touch-none shadow-sm"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={(e) => {
                e.preventDefault();
                const touch = e.touches[0];
                const mouseEvent = new MouseEvent('mousedown', {
                  clientX: touch.clientX,
                  clientY: touch.clientY
                });
                e.target.dispatchEvent(mouseEvent);
              }}
              onTouchMove={(e) => {
                e.preventDefault();
                const touch = e.touches[0];
                const mouseEvent = new MouseEvent('mousemove', {
                  clientX: touch.clientX,
                  clientY: touch.clientY
                });
                e.target.dispatchEvent(mouseEvent);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                const mouseEvent = new MouseEvent('mouseup', {});
                e.target.dispatchEvent(mouseEvent);
              }}
            />
          </div>
          <button
            onClick={clearCanvas}
            className="mt-4 px-5 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition w-full sm:w-auto text-base font-semibold shadow"
          >
            Clear
          </button>
        </div>
        <div className="w-full md:w-1/2 bg-gray-900 text-white rounded-2xl shadow-xl p-4 sm:p-6 flex flex-col items-center min-h-[320px]">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 tracking-tight">AI Guesses</h2>
          <ul className="w-full">
            {error ? (
              <li className="text-red-400 text-center py-4">{error}</li>
            ) : isAnalyzing ? (
              <li className="text-gray-400 text-center py-4">Analyzing drawing...</li>
            ) : predictions.length === 0 ? (
              <li className="text-gray-400 text-center py-4">Draw something to see predictions!</li>
            ) : (
              predictions.map((p: Prediction, i: number) => (
                <li key={i} className="flex justify-between items-center mb-2">
                  <span className="capitalize text-base md:text-lg">{p.label}</span>
                  <span className="font-mono text-sky-400 text-base md:text-lg">{(p.confidence * 100).toFixed(0)}%</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
      <p className="mt-6 text-gray-500 text-center text-xs sm:text-sm md:text-base max-w-xl px-2 sm:px-4">
        Draw something on the canvas and let the AI guess what it is! Works on mobile too!
      </p>
      <p className="mt-2 text-gray-400 text-center text-xs sm:text-sm max-w-xl px-2 sm:px-4">
        Tip: Draw simple objects like house, tree, car, or cat for better results
      </p>
    </div>
  );
}
