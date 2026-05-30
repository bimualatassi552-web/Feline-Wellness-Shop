/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

export const TrailCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);
  const lastMouseRef = useRef<{ x: number; y: number } | null>(null);
  const [activePalette, setActivePalette] = useState<"aurora" | "cosmic" | "gold">("aurora");

  // Dynamic palettes with elegant glowing spectrums
  const palettes = {
    aurora: ["#3E5E4E", "#c49a45", "#E5DCC5", "#A36B4C", "#5F8D75"],
    cosmic: ["#e11d48", "#9333ea", "#2563eb", "#38bdf8", "#ec4899"],
    gold: ["#d97706", "#f59e0b", "#fbbf24", "#fef08a", "#fffbeb"],
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    const observer = new ResizeObserver(() => {
      resizeCanvas();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const currentPalette = palettes[activePalette];

    const addSpark = (x: number, y: number) => {
      // Emit a burst of sparkles
      const numSparks = Math.random() * 3 + 2;
      for (let i = 0; i < numSparks; i++) {
        const color = currentPalette[Math.floor(Math.random() * currentPalette.length)];
        sparksRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 3.5 + (Math.random() * 0.5 - 0.25),
          vy: (Math.random() - 0.5) * 3.5 - Math.random() * 0.8, // drift slightly up
          size: Math.random() * 5 + 3,
          color,
          alpha: 1.0,
          decay: Math.random() * 0.02 + 0.015,
        });
      }
    };

    // Main update loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Shadow overlay glow style
      ctx.shadowBlur = 10;

      const sparks = sparksRef.current;
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        
        // Apply physics
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.02; // gravity drift
        s.size -= 0.05; // slowly shrink
        s.alpha -= s.decay;

        // Draw spark if alive
        if (s.alpha <= 0 || s.size <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.shadowColor = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color + Math.floor(s.alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();
      }

      ctx.shadowBlur = 0; // reset
      animId = requestAnimationFrame(render);
    };

    resizeCanvas();
    render();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Draw trails only when within boundary
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        addSpark(x, y);

        // Add interpolation intermediates if moved extremely quickly
        if (lastMouseRef.current) {
          const prev = lastMouseRef.current;
          const dx = x - prev.x;
          const dy = y - prev.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > 15) {
            const steps = Math.min(Math.floor(dist / 10), 5);
            for (let i = 1; i < steps; i++) {
              const ix = prev.x + dx * (i / steps);
              const iy = prev.y + dy * (i / steps);
              addSpark(ix, iy);
            }
          }
        }
        
        lastMouseRef.current = { x, y };
      }
    };

    const handleMouseLeave = () => {
      lastMouseRef.current = null;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [activePalette]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-80 rounded-[30px] overflow-hidden bg-stone-950 border border-white/10 flex flex-col items-center justify-center p-6 text-center select-none"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full pointer-events-none z-0" />

      {/* Floating Spark Control UI */}
      <div className="relative z-10 space-y-4 max-w-sm pointer-events-auto">
        <p className="text-[10px] font-mono text-gold tracking-widest uppercase font-bold">
          ✧ DRAG OR MOVE MOUSE INSIDE THIS BOX ✧
        </p>
        <h4 className="font-display font-semibold text-xl text-white tracking-tight">
          💫 Stardust Particle Tracer
        </h4>
        <p className="text-stone-400 text-xs leading-relaxed">
          Hover or move your cursor rapidly inside this panel to yield fluid stardust that responds with spark decay physics. Choose a palette preset:
        </p>

        {/* Palette selector buttons */}
        <div className="flex justify-center gap-2 pt-2">
          {(["aurora", "cosmic", "gold"] as const).map((pal) => (
            <button
              key={pal}
              onClick={() => setActivePalette(pal)}
              className={`px-3 py-1.5 text-[10px] font-mono rounded-lg border text-capitalize transition-all cursor-pointer ${
                activePalette === pal
                  ? "bg-gold border-gold text-wine font-extrabold"
                  : "bg-white/5 border-white/15 text-stone-300 hover:bg-white/10"
              }`}
            >
              {pal}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
