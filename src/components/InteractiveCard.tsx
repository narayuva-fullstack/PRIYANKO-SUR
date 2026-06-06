"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  cardType?: "album" | "music" | "achievement" | "gallery" | "default";
  onClick?: () => void;
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  className = "",
  cardType = "default",
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse Coordinate values for 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth Spring configurations for 120Hz feel
  const springConfig = { stiffness: 250, damping: 22, mass: 0.5 };
  const rotateX = useSpring(x, springConfig);
  const rotateY = useSpring(y, springConfig);

  // Hover scale translations based on card family
  const getScaleTarget = () => {
    switch (cardType) {
      case "album": return 1.03;
      case "gallery": return 1.05;
      case "music": return 1.01;
      default: return 1.02;
    }
  };
  const scale = useSpring(isHovered ? getScaleTarget() : 1, springConfig);

  // Mouse hover glow custom CSS coordinate state
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Handle Mouse movement across the card surface
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate cursor positions relative to the center of the card
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Calculate rotation limits (e.g. max 12 degrees of tilt)
    const maxRotation = cardType === "album" ? 12 : 8;
    const rotX = (mouseY / (height / 2)) * -maxRotation;
    const rotY = (mouseX / (width / 2)) * maxRotation;

    x.set(rotX);
    y.set(rotY);

    // Calculate absolute mouse percentage for custom CSS properties
    const percentX = ((e.clientX - rect.left) / width) * 100;
    const percentY = ((e.clientY - rect.top) / height) * 100;
    setMousePos({ x: percentX, y: percentY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  // Shadow class selectors matching premium depth specifications
  const getShadowStyle = () => {
    if (isHovered) {
      switch (cardType) {
        case "album":
          return "shadow-[0_30px_60px_rgba(244,63,94,0.12)] border-luxury-accent/30";
        case "gallery":
          return "shadow-[0_35px_70px_rgba(255,255,255,0.06)] border-white/15";
        case "music":
          return "shadow-[0_20px_40px_rgba(244,63,94,0.06)] border-luxury-accent/20";
        case "achievement":
          return "shadow-[0_30px_60px_rgba(245,158,11,0.08)] border-amber-500/25";
        default:
          return "shadow-[0_25px_50px_rgba(0,0,0,0.6)] border-white/10";
      }
    }
    return "shadow-[0_15px_30px_rgba(0,0,0,0.4)] border-white/5";
  };

  // Subtle interior glow highlights based on card style
  const getAmbientGlow = () => {
    if (!isHovered) return "transparent";
    switch (cardType) {
      case "achievement":
        return "radial-gradient(circle at var(--mx) var(--my), rgba(245, 158, 11, 0.06) 0%, transparent 60%)";
      default:
        return "radial-gradient(circle at var(--mx) var(--my), rgba(244, 63, 94, 0.08) 0%, transparent 60%)";
    }
  };

  return (
    <motion.div
      ref={cardRef}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
      aria-pressed={undefined}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        perspective: 1000,
        // Set mouse coordinates dynamically inside custom CSS variables
        ...({ "--mx": `${mousePos.x}%`, "--my": `${mousePos.y}%` } as React.CSSProperties),
      }}
      className={`glass rounded-2xl p-6 relative overflow-hidden transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${onClick ? "cursor-pointer" : ""} ${getShadowStyle()} ${className}`}
    >
      {/* 1. Dynamic Specular Light Sweep Overlay */}
      <div
        style={{
          background: getAmbientGlow(),
        }}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* 2. SPECULAR SHINE SWEEP BEAM */}
      {isHovered && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-10 pointer-events-none opacity-[0.06] bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12"
        />
      )}

      {/* Content wrapper */}
      <div className="relative z-20 flex flex-col h-full justify-between">
        {children}
      </div>
    </motion.div>
  );
};
