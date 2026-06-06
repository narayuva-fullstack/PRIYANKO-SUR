"use client";

import React from "react";
import { PortalTransitionProvider, usePortalTransition } from "@/context/PortalTransitionContext";
import { PortalTransitionOverlay } from "@/components/PortalTransitionOverlay";

const InnerCoordinator: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state } = usePortalTransition();

  // Screen shake and camera-vibe CSS classes mapping
  const getCameraVibeClass = () => {
    switch (state) {
      case "initiating":
        return "animate-camera-vibe-micro";
      case "shaking":
        return "animate-camera-vibe-rumble";
      case "detonating":
        return "animate-camera-detonation";
      default:
        return "";
    }
  };

  // 3D Perspective Warp transformations for reality unfolding (Phase 4 & 5)
  const get3DLayoutStyles = (): React.CSSProperties => {
    if (state === "warping") {
      return {
        transform: "perspective(1200px) rotateX(15deg) rotateY(-8deg) translateZ(-400px) translateY(50px)",
        filter: "blur(12px) brightness(0.1) saturate(0.2)",
        opacity: 0,
        pointerEvents: "none",
        transition: "transform 0.95s cubic-bezier(0.16, 1, 0.3, 1), filter 0.95s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.85s ease-out",
        transformStyle: "preserve-3d",
      };
    } else if (state === "stabilizing") {
      return {
        transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)",
        filter: "blur(0px) brightness(1) saturate(1)",
        opacity: 1,
        transition: "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), filter 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s ease-out",
        transformStyle: "preserve-3d",
      };
    }
    return {
      transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)",
      filter: "blur(0px) brightness(1) saturate(1)",
      opacity: 1,
      transition: "transform 0.4s ease, filter 0.4s ease, opacity 0.4s ease",
      transformStyle: "preserve-3d",
    };
  };

  return (
    <div 
      className={`min-h-full flex flex-col overflow-x-hidden ${getCameraVibeClass()}`}
      style={get3DLayoutStyles()}
    >
      {children}
      <PortalTransitionOverlay />
    </div>
  );
};

export const PortalLayoutCoordinator: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PortalTransitionProvider>
      <InnerCoordinator>{children}</InnerCoordinator>
    </PortalTransitionProvider>
  );
};
