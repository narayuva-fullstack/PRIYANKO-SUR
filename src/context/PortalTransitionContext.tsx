"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export type TransitionState = 'idle' | 'initiating' | 'shaking' | 'detonating' | 'warping' | 'stabilizing';

interface Coords {
  x: number;
  y: number;
}

interface PortalTransitionContextType {
  state: TransitionState;
  coords: Coords;
  triggerTransition: (targetUrl: string, clickCoords: Coords) => void;
}

const PortalTransitionContext = createContext<PortalTransitionContextType | undefined>(undefined);

export const PortalTransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<TransitionState>('idle');
  const [coords, setCoords] = useState<Coords>({ x: 0, y: 0 });
  const [target, setTarget] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const triggerTransition = useCallback((targetUrl: string, clickCoords: Coords) => {
    if (state !== 'idle') return;

    setCoords(clickCoords);
    setTarget(targetUrl);
    
    // Phase 1: Initiating (Micro press feedback & instant bass visual impact)
    setState('initiating');

    // Phase 2: Shaking (Awakening camera-shake sequence)
    setTimeout(() => {
      setState('shaking');
    }, 200);

    // Phase 3: Detonation (Expanding OM resonance waves & frequency rings)
    setTimeout(() => {
      setState('detonating');
    }, 550);

    // Phase 4 & 5: Warping (3D reality unfold, perspective warp, route shift)
    setTimeout(() => {
      setState('warping');
    }, 950);
  }, [state]);

  // Handle routing during warp state
  useEffect(() => {
    if (state === 'warping' && target) {
      // Prefetch and then navigate to target R&D lab
      router.push(target);
      
      // Force scroll to top immediately while the overlay is fully opaque
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
      
      // Keep warping active to let the router load resources, then switch to stabilizing
      const routeTimer = setTimeout(() => {
        setState('stabilizing');
        setTarget(null);
      }, 700); // Wait for page route resolution

      return () => clearTimeout(routeTimer);
    }
  }, [state, target, router]);

  // Handle stabilizing fade out once pathname matches the target lab
  useEffect(() => {
    if (state === 'stabilizing') {
      // Safety fallback scroll to top when new page begins to fade in
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
      const stableTimer = setTimeout(() => {
        setState('idle');
      }, 900); // Smooth arrival frequency stabilization

      return () => clearTimeout(stableTimer);
    }
  }, [state, pathname]);

  return (
    <PortalTransitionContext.Provider value={{ state, coords, triggerTransition }}>
      {children}
    </PortalTransitionContext.Provider>
  );
};

export const usePortalTransition = () => {
  const context = useContext(PortalTransitionContext);
  if (!context) {
    throw new Error("usePortalTransition must be used within a PortalTransitionProvider");
  }
  return context;
};
