"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePortalTransition, TransitionState } from "@/context/PortalTransitionContext";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  angle: number;
  speed: number;
}

interface Wave {
  r: number;
  maxR: number;
  color: string;
  speed: number;
  lineWidth: number;
  type: 'om' | 'ring' | 'geometry';
  alpha: number;
}

export const PortalTransitionOverlay: React.FC = () => {
  const { state, coords } = usePortalTransition();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const [chromaticOffset, setChromaticOffset] = useState(0);

  // Sync chromatic aberration channel offset to the transition phases
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state === 'idle') {
      setChromaticOffset(0);
    } else if (state === 'initiating') {
      setChromaticOffset(1.5);
    } else if (state === 'shaking') {
      setChromaticOffset(5);
    } else if (state === 'detonating') {
      // Detonation: massive blast channel shift
      setChromaticOffset(16);
    } else if (state === 'warping') {
      // Warp sequence: continuous high distortion
      setChromaticOffset(10);
    } else if (state === 'stabilizing') {
      // Decay back to normal
      let offsetVal = 8;
      interval = setInterval(() => {
        offsetVal = Math.max(0, offsetVal - 0.5);
        setChromaticOffset(offsetVal);
        if (offsetVal <= 0) clearInterval(interval);
      }, 30);
    }
    return () => clearInterval(interval);
  }, [state]);

  useEffect(() => {
    if (state === 'idle') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set dimensions
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);

    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    const centerX = w / 2;
    const centerY = h / 2;

    // Coordinate mapping for click origin
    const originX = coords.x;
    const originY = coords.y;

    const particles: Particle[] = [];
    const waves: Wave[] = [];

    // Initialize 80 stars for the warp portal tunnel
    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * Math.max(w, h);
      particles.push({
        x: centerX + Math.cos(angle) * dist,
        y: centerY + Math.sin(angle) * dist,
        z: Math.random() * 800 + 200,
        vx: 0,
        vy: 0,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
        color: i % 2 === 0 ? "rgba(212, 175, 55, ALPHA)" : "rgba(245, 158, 11, ALPHA)", // Gold / Amber
        angle,
        speed: Math.random() * 12 + 6,
      });
    }

    // Trigger initial detonation rings
    if (state === 'detonating' || state === 'shaking' || state === 'initiating') {
      // Standard frequency circles
      waves.push({
        r: 0,
        maxR: Math.max(w, h) * 1.2,
        color: "rgba(212, 175, 55, ALPHA)", // Gold
        speed: 15,
        lineWidth: 1.5,
        type: 'ring',
        alpha: 0.9,
      });

      waves.push({
        r: 0,
        maxR: Math.max(w, h) * 1.2,
        color: "rgba(245, 158, 11, ALPHA)", // Amber
        speed: 22,
        lineWidth: 2.5,
        type: 'om',
        alpha: 0.8,
      });

      // Sacred geometry ring
      waves.push({
        r: 0,
        maxR: Math.min(w, h) * 0.85,
        color: "rgba(248, 246, 240, ALPHA)", // Divine White
        speed: 10,
        lineWidth: 0.8,
        type: 'geometry',
        alpha: 0.95,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.fillStyle = "rgba(5, 5, 5, 0.08)"; // trail accumulation
      
      if (state === 'warping') {
        // Darken the background screen further to pull user in
        ctx.fillStyle = "rgba(5, 5, 5, 0.16)";
      } else if (state === 'stabilizing') {
        ctx.fillStyle = "rgba(5, 5, 5, 0.25)";
      }

      ctx.fillRect(0, 0, w, h);

      // A. DRAW DETONATION RINGS & OM WAVES
      waves.forEach((wave, idx) => {
        wave.r += wave.speed;
        wave.alpha = Math.max(0, 1 - wave.r / wave.maxR) * 0.9;

        ctx.beginPath();
        ctx.lineWidth = wave.lineWidth;
        ctx.strokeStyle = wave.color.replace("ALPHA", wave.alpha.toString());

        if (wave.type === 'ring') {
          // Concentric circles
          ctx.arc(originX, originY, wave.r, 0, Math.PI * 2);
          ctx.stroke();
        } else if (wave.type === 'om') {
          // Sine-rippled pressure sound wave
          const segments = 120;
          for (let j = 0; j <= segments; j++) {
            const theta = (j * Math.PI * 2) / segments;
            const ripple = Math.sin(theta * 24 + time * 12) * (wave.r * 0.035);
            const px = originX + (wave.r + ripple) * Math.cos(theta);
            const py = originY + (wave.r + ripple) * Math.sin(theta);
            if (j === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        } else if (wave.type === 'geometry') {
          // Star polygon expanding geometry
          ctx.arc(originX, originY, wave.r, 0, Math.PI * 2);
          ctx.stroke();

          // Intersecting Metatron triangles inside the ring
          if (wave.alpha > 0.1) {
            ctx.save();
            ctx.translate(originX, originY);
            ctx.rotate(time * 0.2);
            ctx.strokeStyle = `rgba(212, 175, 55, ${wave.alpha * 0.3})`;
            ctx.lineWidth = 0.55;
            
            // Draw metatron octagram paths
            ctx.beginPath();
            for (let k = 0; k < 8; k++) {
              const ang1 = (k * Math.PI) / 4;
              const ang2 = ((k + 3) * Math.PI) / 4;
              const px1 = wave.r * Math.cos(ang1);
              const py1 = wave.r * Math.sin(ang1);
              const px2 = wave.r * Math.cos(ang2);
              const py2 = wave.r * Math.sin(ang2);
              ctx.moveTo(px1, py1);
              ctx.lineTo(px2, py2);
            }
            ctx.stroke();
            ctx.restore();
          }
        }
      });

      // Filter out dead waves
      const activeWaves = waves.filter(w => w.r < w.maxR);
      waves.length = 0;
      waves.push(...activeWaves);

      // B. DRAW PORTAL WARP TUNNEL PARTICLES
      if (state === 'warping' || state === 'stabilizing') {
        particles.forEach((p) => {
          // Speed up towards center to form vortex
          if (state === 'warping') {
            p.z -= p.speed * 2.5; // pull inward rapidly
            p.alpha = Math.min(0.9, (1000 - p.z) / 800);
          } else {
            // Stabilizing deceleration
            p.z += p.speed * 1.5; // push outward/disperse
            p.alpha = Math.max(0, p.alpha - 0.015);
          }

          // Bound reset
          if (p.z <= 0) {
            p.z = 1000;
            p.alpha = 0;
          }

          // Project 3D coordinate onto 2D screen viewport
          const scale3D = 300 / p.z;
          const px = centerX + (p.x - centerX) * scale3D;
          const py = centerY + (p.y - centerY) * scale3D;

          // Render linear streaks
          if (px >= 0 && px <= w && py >= 0 && py <= h && p.alpha > 0) {
            ctx.beginPath();
            
            // Motion blur line length
            const lengthFactor = state === 'warping' ? 45 : 10;
            const prevPx = centerX + (p.x - centerX) * (300 / (p.z + lengthFactor));
            const prevPy = centerY + (p.y - centerY) * (300 / (p.z + lengthFactor));

            ctx.moveTo(px, py);
            ctx.lineTo(prevPx, prevPy);

            ctx.lineWidth = p.size * scale3D * 1.8;
            ctx.strokeStyle = p.color.replace("ALPHA", p.alpha.toString());
            ctx.stroke();

            // Glow core
            ctx.beginPath();
            ctx.arc(px, py, p.size * scale3D * 0.8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.9})`;
            ctx.fill();
          }
        });
      }

      // C. SPATIAL GEOMETRY CONVERGENCE (Sri Yantra core focus)
      if (state === 'warping') {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(212, 175, 55, ${0.05 + Math.sin(time * 8) * 0.02})`;
        ctx.lineWidth = 0.55;
        // Convergence concentric core orbits
        ctx.arc(centerX, centerY, 80 + Math.sin(time * 3) * 20, 0, Math.PI * 2);
        ctx.arc(centerX, centerY, 140, 0, Math.PI * 2);
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [state, coords]);

  return (
    <AnimatePresence>
      {state !== 'idle' && (
        <motion.div
          key="portal-transition-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55 }}
          className="fixed inset-0 pointer-events-none w-full h-full bg-transparent overflow-hidden"
          style={{ 
            zIndex: 9999,
            // Apply GPU-accelerated Chromatic Aberration SVG filter
            filter: chromaticOffset > 0 ? "url(#portal-chromatic-aberration)" : "none",
            mixBlendMode: "screen",
          }}
        >
          {/* Transition overlay canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full bg-transparent"
          />

          {/* SVG Chromatic Aberration Displacement Definition */}
          <svg className="absolute w-0 h-0 pointer-events-none select-none" aria-hidden="true">
            <defs>
              <filter id="portal-chromatic-aberration">
                <feColorMatrix 
                  type="matrix" 
                  values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" 
                  in="SourceGraphic" 
                  result="red"
                />
                <feColorMatrix 
                  type="matrix" 
                  values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" 
                  in="SourceGraphic" 
                  result="green"
                />
                <feColorMatrix 
                  type="matrix" 
                  values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" 
                  in="SourceGraphic" 
                  result="blue"
                />
                <feOffset 
                  dx={-chromaticOffset} 
                  dy={0} 
                  in="red" 
                  result="redShift"
                />
                <feOffset 
                  dx={chromaticOffset} 
                  dy={0} 
                  in="blue" 
                  result="blueShift"
                />
                <feMerge>
                  <feMergeNode in="redShift" />
                  <feMergeNode in="green" />
                  <feMergeNode in="blueShift" />
                </feMerge>
              </filter>
            </defs>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
