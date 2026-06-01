/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";

interface HackerTextProps {
  text: string;
  className?: string;
  speed?: number; // millisecond intervals per update cycle
  triggerOnHover?: boolean;
  disabled?: boolean;
}

const GLYPHS = "日ハミヒーウシナルサトヌネハキマケケム☆✧☢⚛⚡☣⚙◈✦☠☯☣";

export const HackerText: React.FC<HackerTextProps> = ({
  text,
  className = "",
  speed = 30,
  triggerOnHover = true,
  disabled = false,
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const iterationsRef = useRef<number>(0);
  const isDecodingRef = useRef<boolean>(false);

  // Sync with standard text alterations
  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  const startScramble = () => {
    if (disabled) return;
    if (isDecodingRef.current) return;
    isDecodingRef.current = true;
    iterationsRef.current = 0;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split("")
          .map((char, index) => {
            // Unscramble characters that completed their decode phase
            if (index < iterationsRef.current) {
              return text[index];
            }
            
            // Retain whitespace spaces to prevent layout shifting
            if (char === " ") {
              return " ";
            }

            // Otherwise draw a randomized decoding alien glyph
            const randomIndex = Math.floor(Math.random() * GLYPHS.length);
            return GLYPHS[randomIndex];
          })
          .join("");
      });

      // Decode 1/3 character per cycle to make it readable and last a little bit
      iterationsRef.current += 1 / 3;

      if (iterationsRef.current >= text.length) {
        clearInterval(intervalRef.current!);
        setDisplayText(text);
        isDecodingRef.current = false;
      }
    }, speed);
  };

  useEffect(() => {
    if (disabled) {
      setDisplayText(text);
      return;
    }
    // Optional automatic initial decode effect on mount
    startScramble();
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, disabled]);

  return (
    <span
      className={`inline-block font-mono select-none cursor-[#c49a45] ${className}`}
      onMouseEnter={(!disabled && triggerOnHover) ? startScramble : undefined}
    >
      {displayText}
    </span>
  );
};
