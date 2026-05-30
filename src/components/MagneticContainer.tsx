/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";

interface MagneticContainerProps {
  children: React.ReactElement;
  range?: number; // active distance radius
  strength?: number; // displacement factor between 0 and 1
  className?: string;
  style?: React.CSSProperties;
}

export const MagneticContainer: React.FC<MagneticContainerProps> = ({
  children,
  range = 90,
  strength = 0.35,
  className = "inline-block",
  style,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < range) {
      // Calculate spring offset with higher pull closer to the center
      const factor = (range - distance) / range; // 0 to 1
      const targetX = dx * strength * factor;
      const targetY = dy * strength * factor;
      setPosition({ x: targetX, y: targetY });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Monitor global mouse moves while coordinates intersect proximity
    window.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [range, strength]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        ...style,
        position: "relative",
      }}
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 12,
          mass: 0.7,
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
