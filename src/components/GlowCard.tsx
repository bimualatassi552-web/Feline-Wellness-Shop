/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g., "rgba(196, 154, 69, 0.15)"
  borderColor?: string; // Hover border color trace
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = "",
  glowColor = "rgba(196, 154, 69, 0.18)",
  borderColor = "rgba(196, 154, 69, 0.4)",
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden bg-white/70 backdrop-blur-md rounded-3xl border border-stone-200/80 p-6 transition-all duration-300 group shadow-sm hover:shadow-md ${className}`}
      style={{
        // Define standard styles
        transition: "border 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Real-time Glowing Mask Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 80%)`,
        }}
      />

      {/* Dynamic Border Trail Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 rounded-3xl"
        style={{
          border: `1.5px solid transparent`,
          backgroundImage: `radial-gradient(180px circle at ${coords.x}px ${coords.y}px, ${borderColor}, transparent 80%)`,
          backgroundClip: "border-box",
          WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Actual Content relative above overlays */}
      <div className="relative z-20 w-full h-full">
        {children}
      </div>
    </div>
  );
};
