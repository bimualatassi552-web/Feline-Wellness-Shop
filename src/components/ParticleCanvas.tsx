/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";

interface ParticleCanvasProps {
  className?: string;
  particleCount?: number;
  particleColor?: string;
  lineColor?: string;
  attractionRadius?: number;
  attractionStrength?: number;
  connectionLimit?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  alpha: number;
  color: string;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({
  className = "absolute inset-0 z-0",
  particleCount = 100,
  particleColor = "196, 154, 69", // rgb(196, 154, 69) - Gold / Warm yellow
  lineColor = "196, 154, 69",
  attractionRadius = 180,
  attractionStrength = 0.4,
  connectionLimit = 85,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // Resize handler with observer
    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      
      // Re-initialize particles to fit new bounds
      initParticles(canvas.width, canvas.height);
    };

    const observer = new ResizeObserver(() => {
      resizeCanvas();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Initialize particles
    const initParticles = (width: number, height: number) => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          baseRadius: Math.random() * 1.5 + 1.0,
          radius: 1.0,
          alpha: Math.random() * 0.5 + 0.3,
          color: particleColor,
        });
      }
    };

    // Track mouse coordinate offsets relative to the canvas bounding box
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
      setIsHovered(false);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    // Main animation loop
    const render = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mX = mouseRef.current.x;
      const mY = mouseRef.current.y;

      // Update and draw particles
      particles.forEach((p) => {
        // Apply normal continuous movement
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off bounds
        if (p.x < 0 || p.x > canvas.width) {
          p.vx *= -1;
          p.x = Math.max(0, Math.min(p.x, canvas.width));
        }
        if (p.y < 0 || p.y > canvas.height) {
          p.vy *= -1;
          p.y = Math.max(0, Math.min(p.y, canvas.height));
        }

        // Proximity attraction logic
        if (mX !== null && mY !== null) {
          const dx = mX - p.x;
          const dy = mY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < attractionRadius) {
            // Force strength scales closer to mouse
            const force = (attractionRadius - dist) / attractionRadius;
            
            // Apply slight spring push towards mouse
            p.vx += (dx / dist) * force * attractionStrength * 0.15;
            p.vy += (dy / dist) * force * attractionStrength * 0.15;
            
            // Expand size slightly under focus
            p.radius = p.baseRadius * (1.0 + force * 1.5);
          } else {
            // Restore original radius smoothly
            p.radius += (p.baseRadius - p.radius) * 0.1;
          }
        } else {
          // Restore original radius smoothly
          p.radius += (p.baseRadius - p.radius) * 0.1;
        }

        // Limit speed to prevent chaotic flying
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = 1.6;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        // Add visual micro-friction to slow down extreme impulses over time
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();
      });

      // Draw lines between proximate particle nodes to form the interactive neural web
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionLimit) {
            const alpha = (1.0 - dist / connectionLimit) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      // Draw faint lines directly between the cursor and nearby particles
      if (mX !== null && mY !== null) {
        particles.forEach((p) => {
          const dx = p.x - mX;
          const dy = p.y - mY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < attractionRadius - 40) {
            const alpha = (1.0 - dist / (attractionRadius - 40)) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mX, mY);
            ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Trigger initial settings
    resizeCanvas();
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [particleCount, particleColor, lineColor, attractionRadius, attractionStrength, connectionLimit]);

  return (
    <div ref={containerRef} className={className}>
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
};
