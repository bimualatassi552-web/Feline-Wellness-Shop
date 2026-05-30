/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export const BlendCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem("blend_cursor_enabled");
    return saved === "true"; // default to false so parent store interaction has full clarity initially
  });
  
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(true);

  // High quality framer-motion physical springs for natural elastic mouse lag
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 450, damping: 28, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect viewport size to disable cursor on touchdevices
    const checkViewport = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsMobile(hasTouch);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);

    // Coordinate monitors
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    // Hover triggers over buttons/clickable targets
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === "BUTTON" ||
        target?.tagName === "A" ||
        target?.closest("button") ||
        target?.closest("a") ||
        target?.getAttribute("role") === "button"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    if (isEnabled && !isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseover", handleMouseOver);
      document.body.style.cursor = "none";
    } else {
      document.body.style.cursor = "auto";
    }

    return () => {
      window.removeEventListener("resize", checkViewport);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.style.cursor = "auto";
    };
  }, [isEnabled, isMobile]);

  // Sync state with storage
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextVal = !isEnabled;
    setIsEnabled(nextVal);
    localStorage.setItem("blend_cursor_enabled", String(nextVal));
  };

  if (isMobile) return null;

  return (
    <>
      {/* 1. Elegant Brown Circular Cursor (Visible only if enabled) */}
      {isEnabled && (
        <motion.div
          id="blend-cursor-inner"
          className="fixed left-0 top-0 w-6 h-6 rounded-full bg-[#8B5A2B]/35 border border-[#8B5A2B]/80 pointer-events-none z-9999 hidden sm:block shadow-sm"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "-50%",
            transformOrigin: "center center",
          }}
          animate={{
            scale: isHovered ? 2.0 : 1.0,
            backgroundColor: isHovered ? "rgba(139, 90, 43, 0.15)" : "rgba(139, 90, 43, 0.35)",
            borderColor: isHovered ? "rgba(139, 90, 43, 0.9)" : "rgba(139, 90, 43, 0.8)",
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 24,
          }}
        />
      )}

      {/* 2. Floating Toggle Assistant Button */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
        <button
          onClick={handleToggle}
          className="group flex items-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-850 hover:text-gold border border-white/15 text-[#FAF8F5] rounded-full shadow-lg transition-all duration-300 transform active:scale-95 text-xs font-mono select-none cursor-pointer"
          title="Toggle premium brown circular cursor effect"
        >
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isEnabled ? "bg-emerald-400" : "bg-gold"}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isEnabled ? "bg-emerald-500" : "bg-gold"}`}></span>
          </span>
          <span>🔮 Brown Cursor: <strong>{isEnabled ? "ON" : "OFF"}</strong></span>
        </button>
      </div>
    </>
  );
};
