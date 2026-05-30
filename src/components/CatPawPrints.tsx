import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PawStep {
  x: string; // horizontal percentage or position (e.g., '10%')
  y: string; // vertical percentage or position (e.g., '20%')
  rotate: number; // degrees
  isLeft: boolean; // whether it is a left paw (influences thumb placement/size slightly if we want, or just offset)
  textStyle?: string; // color style overrides if needed
}

interface PawTrack {
  id: string;
  steps: PawStep[];
  className?: string; // container-level overrides (e.g. coordinates positioning)
}

const CatPaw: React.FC<{ rotate: number; className?: string; isLeft: boolean }> = ({
  rotate,
  className = "text-[#c49a45]/15",
  isLeft
}) => {
  return (
    <div
      className="absolute pointer-events-none select-none transition-opacity duration-500"
      style={{
        transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`w-6 h-6 sm:w-8 sm:h-8 ${className}`}
        aria-hidden="true"
      >
        {/* Main pad (trilobed rounded shape at the bottom) */}
        <path d="M12 14c-1.8 0-3.5 1-3.5 2.5s1 2 2.5 2h2c1.5 0 2.5-.5 2.5-2s-1.2-2.5-3.5-2.5z" />
        
        {/* Four toe pads curving above the main pad */}
        {/* Far Left Toe */}
        <circle cx={isLeft ? "5.5" : "6.5"} cy="11.5" r="1.5" />
        {/* Mid Left Toe */}
        <circle cx="9.5" cy="8.5" r="1.6" />
        {/* Mid Right Toe */}
        <circle cx="14.5" cy="8.5" r="1.6" />
        {/* Far Right Toe */}
        <circle cx={isLeft ? "17.5" : "18.5"} cy="11.5" r="1.5" />
      </svg>
    </div>
  );
};

export const CatPawPrints: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  // We loop the walking sequence continuously
  // Each step takes 350ms, plus a dwell phase of 3 seconds where all pawprints remain fully visible,
  // followed by a fade out and refresh.
  const totalStepsInCycle = 24; // 12-14 steps + dwell delay

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % totalStepsInCycle);
    }, 450);

    return () => clearInterval(timer);
  }, []);

  // Defined trails of cat walks in the empty margins or blank background areas.
  const tracks: PawTrack[] = [
    {
      id: "left-outer-margin",
      className: "fixed left-2 2xl:left-12 top-[30vh] bottom-[10vh] w-24 hidden xl:block z-0 pointer-events-none",
      steps: [
        { x: "30%", y: "90%", rotate: -15, isLeft: true, textStyle: "text-wine/10" },
        { x: "65%", y: "82%", rotate: -10, isLeft: false, textStyle: "text-wine/10" },
        { x: "25%", y: "74%", rotate: -15, isLeft: true, textStyle: "text-wine/10" },
        { x: "60%", y: "66%", rotate: -5, isLeft: false, textStyle: "text-wine/10" },
        { x: "35%", y: "58%", rotate: 0, isLeft: true, textStyle: "text-wine/10" },
        { x: "70%", y: "50%", rotate: 5, isLeft: false, textStyle: "text-wine/10" },
        { x: "40%", y: "42%", rotate: 10, isLeft: true, textStyle: "text-wine/10" },
        { x: "75%", y: "34%", rotate: 15, isLeft: false, textStyle: "text-wine/10" },
        { x: "45%", y: "26%", rotate: 20, isLeft: true, textStyle: "text-wine/10" },
        { x: "80%", y: "18%", rotate: 25, isLeft: false, textStyle: "text-wine/10" },
      ],
    },
    {
      id: "right-outer-margin",
      className: "fixed right-2 2xl:right-12 top-[20vh] bottom-[20vh] w-24 hidden xl:block z-0 pointer-events-none",
      steps: [
        { x: "70%", y: "10%", rotate: 165, isLeft: true, textStyle: "text-wine/10" },
        { x: "35%", y: "18%", rotate: 170, isLeft: false, textStyle: "text-wine/10" },
        { x: "75%", y: "26%", rotate: 165, isLeft: true, textStyle: "text-wine/10" },
        { x: "40%", y: "34%", rotate: 175, isLeft: false, textStyle: "text-wine/10" },
        { x: "65%", y: "42%", rotate: 180, isLeft: true, textStyle: "text-wine/10" },
        { x: "30%", y: "50%", rotate: -175, isLeft: false, textStyle: "text-wine/10" },
        { x: "60%", y: "58%", rotate: -170, isLeft: true, textStyle: "text-wine/10" },
        { x: "25%", y: "66%", rotate: -165, isLeft: false, textStyle: "text-wine/10" },
        { x: "55%", y: "74%", rotate: -160, isLeft: true, textStyle: "text-wine/10" },
        { x: "20%", y: "82%", rotate: -155, isLeft: false, textStyle: "text-wine/10" },
      ],
    },
    // Cross-screen background walk (appears between sections in the main list)
    {
      id: "diagonal-bento-connector",
      className: "absolute left-[5%] right-[5%] top-[1200px] h-48 w-[90%] pointer-events-none overflow-hidden hidden sm:block md:opacity-75",
      steps: [
        { x: "5%", y: "85%", rotate: 75, isLeft: true, textStyle: "text-wine/5" },
        { x: "13%", y: "65%", rotate: 70, isLeft: false, textStyle: "text-wine/5" },
        { x: "21%", y: "75%", rotate: 75, isLeft: true, textStyle: "text-wine/5" },
        { x: "29%", y: "55%", rotate: 65, isLeft: false, textStyle: "text-wine/5" },
        { x: "37%", y: "63%", rotate: 70, isLeft: true, textStyle: "text-wine/5" },
        { x: "45%", y: "45%", rotate: 60, isLeft: false, textStyle: "text-wine/5" },
        { x: "53%", y: "50%", rotate: 65, isLeft: true, textStyle: "text-wine/5" },
        { x: "61%", y: "35%", rotate: 55, isLeft: false, textStyle: "text-wine/5" },
        { x: "69%", y: "38%", rotate: 60, isLeft: true, textStyle: "text-wine/5" },
        { x: "77%", y: "25%", rotate: 50, isLeft: false, textStyle: "text-wine/5" },
        { x: "85%", y: "28%", rotate: 55, isLeft: true, textStyle: "text-wine/5" },
        { x: "93%", y: "15%", rotate: 45, isLeft: false, textStyle: "text-wine/5" },
      ],
    },
    // Subtle mini trail inside Hero border or header empty spaces
    {
      id: "hero-top-left-walk",
      className: "absolute left-[1%] top-[80px] w-48 h-64 pointer-events-none select-none hidden lg:block opacity-60",
      steps: [
        { x: "10%", y: "85%", rotate: 45, isLeft: true, textStyle: "text-[#c49a45]/15" },
        { x: "25%", y: "70%", rotate: 40, isLeft: false, textStyle: "text-[#c49a45]/15" },
        { x: "40%", y: "55%", rotate: 45, isLeft: true, textStyle: "text-[#c49a45]/15" },
        { x: "55%", y: "40%", rotate: 35, isLeft: false, textStyle: "text-[#c49a45]/15" },
        { x: "70%", y: "25%", rotate: 40, isLeft: true, textStyle: "text-[#c49a45]/15" },
        { x: "85%", y: "10%", rotate: 30, isLeft: false, textStyle: "text-[#c49a45]/15" },
      ],
    }
  ];

  return (
    <>
      {tracks.map((track) => (
        <div key={track.id} className={track.className}>
          <div className="relative w-full h-full">
            {track.steps.map((step, index) => {
              // The paw appears when the activeStep query reaches or exceeds its index.
              // We also make it fade out during the reset/dwell phase of the cycle.
              const isVisible = activeStep >= index && activeStep < track.steps.length + 6;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{
                    opacity: isVisible ? 0.75 : 0,
                    scale: isVisible ? 1.05 : 0.3,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 14,
                    mass: 0.8,
                  }}
                  className="absolute pointer-events-none"
                  style={{
                    left: step.x,
                    top: step.y,
                  }}
                >
                  <CatPaw
                    rotate={step.rotate}
                    isLeft={step.isLeft}
                    className={step.textStyle || "text-[#c49a45]/20"}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
};
