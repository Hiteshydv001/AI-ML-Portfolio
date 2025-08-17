"use client";

import React, { useRef, useState, useEffect } from "react";

const labels = [
  "cat", "dog", "car", "tree", "house", "bicycle", "fish", "flower", "star", "cloud"
];

type Prediction = { label: string; confidence: number };

export default function GuessDrawingGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [brushColor, setBrushColor] = useState("#222");
  const [bgColor, setBgColor] = useState("#fff");
  const [brushSize, setBrushSize] = useState(8);
  const [strokeStyle, setStrokeStyle] = useState<'solid' | 'dashed' | 'dotted'>("solid");
  const [sloppiness, setSloppiness] = useState<'normal' | 'wavy' | 'scribbly'>("normal");
  const [edgeStyle, setEdgeStyle] = useState<'rounded' | 'sharp'>("rounded");
  const [opacity, setOpacity] = useState(1);
  const [image, setImage] = useState<string | null>(null);


  // Swatch options
  const strokeColors = ["#222", "#e53935", "#43a047", "#1e88e5", "#fbc02d", "#fb8c00", "#000"];
  const bgColors = ["#fff", "#f8bbd0", "#b2dfdb", "#fff9c4", "#bbdefb", "#ffff", "transparent"];
  const widthOptions = [4, 8, 16];

  // Drawing state
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  // Drawing handlers (mouse)
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const rect = e.currentTarget.getBoundingClientRect();
    lastPoint.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = edgeStyle === "rounded" ? "round" : "butt";
    ctx.lineJoin = edgeStyle === "rounded" ? "round" : "miter";
    if (strokeStyle === "dashed") ctx.setLineDash([10, 10]);
    else if (strokeStyle === "dotted") ctx.setLineDash([2, 8]);
    else ctx.setLineDash([]);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (lastPoint.current) {
      ctx.beginPath();
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      // Sloppiness effect (simple version)
      if (sloppiness === "wavy") {
        for (let i = 0; i < 5; i++) {
          const dx = (x - lastPoint.current.x) * (i / 5) + Math.sin(i) * 2;
          const dy = (y - lastPoint.current.y) * (i / 5) + Math.cos(i) * 2;
          ctx.lineTo(lastPoint.current.x + dx, lastPoint.current.y + dy);
        }
      } else if (sloppiness === "scribbly") {
        for (let i = 0; i < 10; i++) {
          const dx = (x - lastPoint.current.x) * (i / 10) + (Math.random() - 0.5) * 4;
          const dy = (y - lastPoint.current.y) * (i / 10) + (Math.random() - 0.5) * 4;
          ctx.lineTo(lastPoint.current.x + dx, lastPoint.current.y + dy);
        }
      } else {
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.closePath();
    }
    lastPoint.current = { x, y };
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    lastPoint.current = null;
  };

  // Touch event handlers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let drawing = false;
    let last = { x: 0, y: 0 };

  const getTouchPos = (touch: Touch) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    };

  const handleTouchStart = (e: TouchEvent) => {
      if (e.cancelable) e.preventDefault();
      drawing = true;
      const touch = e.touches[0];
      last = getTouchPos(touch);
      lastPoint.current = last;
    };

  const handleTouchMove = (e: TouchEvent) => {
      if (!drawing) return;
      if (e.cancelable) e.preventDefault();
      const touch = e.touches[0];
      const pos = getTouchPos(touch);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
      ctx.lineCap = edgeStyle === "rounded" ? "round" : "butt";
      ctx.lineJoin = edgeStyle === "rounded" ? "round" : "miter";
      if (strokeStyle === "dashed") ctx.setLineDash([10, 10]);
      else if (strokeStyle === "dotted") ctx.setLineDash([2, 8]);
      else ctx.setLineDash([]);
      if (lastPoint.current) {
        ctx.beginPath();
        ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
        // Sloppiness effect (simple version)
        if (sloppiness === "wavy") {
          for (let i = 0; i < 5; i++) {
            const dx = (pos.x - lastPoint.current.x) * (i / 5) + Math.sin(i) * 2;
            const dy = (pos.y - lastPoint.current.y) * (i / 5) + Math.cos(i) * 2;
            ctx.lineTo(lastPoint.current.x + dx, lastPoint.current.y + dy);
          }
        } else if (sloppiness === "scribbly") {
          for (let i = 0; i < 10; i++) {
            const dx = (pos.x - lastPoint.current.x) * (i / 10) + (Math.random() - 0.5) * 4;
            const dy = (pos.y - lastPoint.current.y) * (i / 10) + (Math.random() - 0.5) * 4;
            ctx.lineTo(lastPoint.current.x + dx, lastPoint.current.y + dy);
          }
        } else {
          ctx.lineTo(pos.x, pos.y);
        }
        ctx.stroke();
        ctx.closePath();
      }
      lastPoint.current = pos;
    };

  const handleTouchEnd = (e: TouchEvent) => {
      drawing = false;
      lastPoint.current = null;
    };

    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [brushColor, brushSize, strokeStyle, sloppiness, edgeStyle, opacity]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Always fill with bgColor first
    ctx.globalAlpha = 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // If image is present, redraw it
    if (image) {
      const img = new window.Image();
      img.src = image;
      img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
    setPredictions([]);
  };

  const handleBgColor = (color: string) => {
    setBgColor(color);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (image) {
      const img = new window.Image();
      img.src = image;
      img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  };

  const handleAttachImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      setImage(ev.target?.result as string);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const img = new window.Image();
      img.src = ev.target?.result as string;
      img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    reader.readAsDataURL(file);
  };

  // On mount and when bgColor or image changes, fill bg
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (image) {
      const img = new window.Image();
      img.src = image;
      img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }, [bgColor, image]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-8">
      <h2 className="text-2xl font-bold mb-4 text-center">🎨 Guess the Drawing – AI Pictionary</h2>
      <div className="flex flex-row gap-8 items-center">
        {/* Sidebar Toolbar */}
    <div className="flex flex-col gap-4 bg-white/80 rounded-xl shadow border border-gray-100 min-w-[120px] p-3">
          {/* Stroke color swatches */}
          <div>
            <div className="font-medium text-xs mb-1 text-gray-700">Stroke</div>
            <div className="flex gap-1">
              {strokeColors.map(c => (
                <button key={c} className={`w-6 h-6 rounded border ${brushColor === c ? 'border-sky-400 ring-2 ring-sky-200' : 'border-gray-200'}`} style={{background: c}} onClick={() => setBrushColor(c)} aria-label={c} />
              ))}
            </div>
          </div>
          {/* Background color swatches */}
          <div>
            <div className="font-medium text-xs mb-1 text-gray-700">Background</div>
            <div className="flex gap-1">
              {bgColors.map(c => (
                <button key={c} className={`w-6 h-6 rounded border ${bgColor === c ? 'border-sky-400 ring-2 ring-sky-200' : 'border-gray-200'}`} style={{background: c === 'transparent' ? 'repeating-linear-gradient(45deg,#eee 0 4px,transparent 4px 8px)' : c}} onClick={() => setBgColor(c)} aria-label={c} />
              ))}
            </div>
          </div>
          {/* Stroke width */}
          <div>
            <div className="font-medium text-xs mb-1 text-gray-700">Stroke width</div>
            <div className="flex gap-1">
              {widthOptions.map(w => (
                <button key={w} className={`w-7 h-7 flex items-center justify-center rounded border ${brushSize === w ? 'border-sky-400 ring-2 ring-sky-200' : 'border-gray-200'}`} onClick={() => setBrushSize(w)}>
                  <div style={{width: w, height: w, background: brushColor, borderRadius: '50%'}} />
                </button>
              ))}
            </div>
          </div>
          {/* Stroke style */}
          <div>
            <div className="font-medium text-xs mb-1 text-gray-700">Stroke style</div>
            <div className="flex gap-1">
              {['solid','dashed','dotted'].map(s => (
                <button key={s} className={`w-7 h-7 flex items-center justify-center rounded border ${strokeStyle === s ? 'border-sky-400 ring-2 ring-sky-200' : 'border-gray-200'}`} onClick={() => setStrokeStyle(s as any)}>
                  <div className="w-5 h-0.5" style={{background: brushColor, borderRadius:2, borderBottom: s==='dashed'? '2px dashed '+brushColor : s==='dotted'? '2px dotted '+brushColor : 'none'}} />
                </button>
              ))}
            </div>
          </div>
          {/* Sloppiness */}
          <div>
            <div className="font-medium text-xs mb-1 text-gray-700">Sloppiness</div>
            <div className="flex gap-1">
              {['normal','wavy','scribbly'].map(s => (
                <button key={s} className={`w-7 h-7 flex items-center justify-center rounded border ${sloppiness === s ? 'border-sky-400 ring-2 ring-sky-200' : 'border-gray-200'}`} onClick={() => setSloppiness(s as any)}>
                  <span className="text-lg">{s==='normal'?'~':s==='wavy'?'≈':'≈≈'}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Edges */}
          <div>
            <div className="font-medium text-xs mb-1 text-gray-700">Edges</div>
            <div className="flex gap-1">
              {['rounded','sharp'].map(e => (
                <button key={e} className={`w-7 h-7 flex items-center justify-center rounded border ${edgeStyle === e ? 'border-sky-400 ring-2 ring-sky-200' : 'border-gray-200'}`} onClick={() => setEdgeStyle(e as any)}>
                  <span className="text-lg">{e==='rounded'?'▢':'▭'}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Opacity */}
          <div>
            <div className="font-medium text-xs mb-1 text-gray-700">Opacity</div>
            <input type="range" min={0.1} max={1} step={0.01} value={opacity} onChange={e=>setOpacity(Number(e.target.value))} className="w-full accent-sky-400" />
          </div>
          {/* Attach image */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700">
              <span className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded border border-gray-300">📎</span>
              <input type="file" accept="image/*" onChange={handleAttachImage} className="hidden" />
              Attach Image
            </label>
          </div>
          {/* Clear */}
          <button onClick={clearCanvas} className="px-2 py-1 bg-gray-100 text-gray-700 rounded border border-gray-300 shadow-sm hover:bg-gray-200 transition text-xs font-semibold mt-2">Clear</button>
        </div>
        {/* Canvas */}
        <div className="relative flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-fuchsia-100 rounded-2xl shadow-2xl p-6 border-4 border-sky-200">
          <canvas
            ref={canvasRef}
            width={600}
            height={420}
            className="border-2 border-sky-300 rounded-2xl cursor-crosshair bg-white z-10 shadow-lg touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            style={{ boxShadow: '0 4px 32px 0 rgba(56,189,248,0.10)', background: bgColor }}
          />
        </div>
        {/* AI Guesses */}
        <div className="w-60 bg-gray-900 text-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2">AI Guesses</h3>
          <ul className="w-full">
            {predictions.map((p, i) => (
              <li key={i} className="flex justify-between items-center mb-2">
                <span className="capitalize">{p.label}</span>
                <span className="font-mono text-sky-400">{(p.confidence * 100).toFixed(0)}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-6 text-gray-500 text-center max-w-xl">
        Draw something on the canvas, attach an image, and let the AI guess what it is! (Live model coming soon)
      </p>
    </div>
  );
}

