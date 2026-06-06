"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { useAudio } from "@/context/AudioContext";

interface BrandLogoProps {
  variant?: "gold" | "white" | "monochrome" | "glass" | "minimal";
  size?: number;
  showText?: boolean;
  animateOnLoad?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = "gold",
  size = 48,
  showText = false,
  animateOnLoad = true,
}) => {
  const { isPlaying } = useAudio();

  // Define styling configurations based on the requested visual styles
  const styles = {
    gold: {
      primaryColor: "url(#brandGoldGradient)",
      secondaryColor: "url(#brandGoldGradient)",
      glowColor: "rgba(212, 175, 55, 0.4)",
      borderColor: "rgba(212, 175, 55, 0.2)",
      textColor: "text-luxury-accent",
    },
    white: {
      primaryColor: "#ffffff",
      secondaryColor: "rgba(255, 255, 255, 0.7)",
      glowColor: "rgba(255, 255, 255, 0.3)",
      borderColor: "rgba(255, 255, 255, 0.15)",
      textColor: "text-white",
    },
    monochrome: {
      primaryColor: "currentColor",
      secondaryColor: "currentColor",
      glowColor: "transparent",
      borderColor: "currentColor",
      textColor: "text-white",
    },
    glass: {
      primaryColor: "rgba(255, 255, 255, 0.95)",
      secondaryColor: "rgba(255, 255, 255, 0.5)",
      glowColor: "rgba(255, 255, 255, 0.2)",
      borderColor: "rgba(255, 255, 255, 0.1)",
      textColor: "text-white/95",
    },
    minimal: {
      primaryColor: "url(#brandGoldGradient)",
      secondaryColor: "transparent",
      glowColor: "transparent",
      borderColor: "transparent",
      textColor: "text-white",
    },
  }[variant];

  // Motion variants for line drawing animation
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring" as const, duration: 2.2, bounce: 0 },
        opacity: { duration: 0.8 },
      },
    },
  };

  const glowVariant: Variants = {
    hidden: { filter: "drop-shadow(0px 0px 0px rgba(0, 0, 0, 0))" },
    visible: {
      filter: `drop-shadow(0px 0px 8px ${styles.glowColor})`,
      transition: { delay: 1.0, duration: 1.0 },
    },
  };


  return (
    <div className="flex items-center gap-3.5 select-none group">
      {/* Sacred Monogram Emblem */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {/* Soft Ambient Glow background (for luxury visual depth) */}
        {variant !== "minimal" && (
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-700"
            style={{
              background: variant === "gold"
                ? "radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
            }}
          />
        )}

        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Rich Luxury Metallic Gold Gradient */}
            <linearGradient id="brandGoldGradient" x1="15%" y1="15%" x2="85%" y2="85%">
              <stop offset="0%" stopColor="#bf953f" />
              <stop offset="25%" stopColor="#fcf6ba" />
              <stop offset="50%" stopColor="#b38728" />
              <stop offset="75%" stopColor="#fbf5b7" />
              <stop offset="100%" stopColor="#aa771c" />
            </linearGradient>

            {/* Glass reflection filter */}
            {variant === "glass" && (
              <filter id="glassReflect">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
              </filter>
            )}
          </defs>

          {/* 1. Outer Sacred Geometry Mandala Ring (Reactive rotation on audio play) */}
          {variant !== "minimal" && (
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke={styles.borderColor}
              strokeWidth="0.75"
              strokeDasharray="4 4"
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={
                isPlaying
                  ? { repeat: Infinity, ease: "linear", duration: 24 }
                  : { duration: 1 }
              }
              className="origin-center"
            />
          )}

          {/* 2. Inner Vibration Ring (Pulsates reacting to sound) */}
          {variant !== "minimal" && (
            <motion.circle
              cx="50"
              cy="50"
              r="41"
              stroke={styles.secondaryColor}
              strokeWidth="0.5"
              opacity="0.3"
              animate={isPlaying ? { scale: [1, 1.02, 0.98, 1.01, 1] } : { scale: 1 }}
              transition={
                isPlaying
                  ? { repeat: Infinity, duration: 2.0, ease: "easeInOut" }
                  : {}
              }
              className="origin-center"
            />
          )}

          {/* 3. Audio Frequency Wave Arcs (Left/Right side brackets) */}
          {variant !== "minimal" && (
            <g opacity="0.6">
              {/* Left Side Waves */}
              <motion.path
                d="M20,38 C15,46 15,54 20,62"
                stroke={styles.secondaryColor}
                strokeWidth="0.75"
                strokeLinecap="round"
                animate={
                  isPlaying
                    ? { scaleX: [1, 1.25, 0.85, 1.15, 1], x: [0, -2, 1, -1, 0] }
                    : { scaleX: 1, x: 0 }
                }
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="origin-left"
              />
              {/* Right Side Waves */}
              <motion.path
                d="M80,38 C85,46 85,54 80,62"
                stroke={styles.secondaryColor}
                strokeWidth="0.75"
                strokeLinecap="round"
                animate={
                  isPlaying
                    ? { scaleX: [1, 1.25, 0.85, 1.15, 1], x: [0, 2, -1, 1, 0] }
                    : { scaleX: 1, x: 0 }
                }
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="origin-right"
              />
            </g>
          )}

          {/* 4. The Monogram (P + S Merged Calligraphy) */}
          <motion.g
            variants={animateOnLoad ? glowVariant : {}}
            initial="hidden"
            animate="visible"
          >
            {/* The True Crossover Continuous Monogram Path */}
            <motion.path
              d="M50,75 L50,25 C65,25 65,46 50,46 C35,46 32,58 48,66 C64,74 64,58 50,50 C36,42 36,26 50,25"
              stroke={styles.primaryColor}
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={animateOnLoad ? draw : {}}
              initial={animateOnLoad ? "hidden" : "visible"}
              animate="visible"
              className="origin-center"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            />

            {/* Sacred Lotus/Flame Bindu (Top Spiritual Crown Dot) */}
            {variant !== "minimal" && (
              <motion.circle
                cx="49"
                cy="17"
                r="2.5"
                fill={styles.primaryColor}
                initial={animateOnLoad ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                animate={
                  animateOnLoad
                    ? { scale: 1, opacity: 1, transition: { delay: 1.6, type: "spring" as const } }
                    : {}
                }
                whileHover={{ scale: 1.3 }}
              />
            )}
          </motion.g>
        </svg>

        {/* Ambient shine glide animation on hover */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <div className="w-1/2 h-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent -rotate-45 -translate-x-[150%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
        </div>
      </div>

      {/* Accompanying Editorial Typography (If text display requested) */}
      {showText && (
        <div className="flex flex-col">
          <span className="text-[17px] font-serif font-semibold tracking-wider text-white group-hover:text-luxury-accent transition-colors duration-500">
            Priyanko Sur
          </span>
          <span className="text-[8.5px] font-mono text-luxury-secondary tracking-[0.25em] uppercase group-hover:text-white transition-colors duration-500">
            Digital Monogram
          </span>
        </div>
      )}
    </div>
  );
};
