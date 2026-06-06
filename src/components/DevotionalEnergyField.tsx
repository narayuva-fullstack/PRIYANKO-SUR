"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  alpha: number;
  phase: number;
  phaseSpeed: number;
}

interface EmitterWave {
  r: number;
  speed: number;
  amp: number;
  freq: number;
  phase: number;
  phaseSpeed: number;
  color: string;
  maxR: number;
  seed: number;
}

interface PagePreset {
  amp: number;
  freqMult: number;
  speed: number;
  particleSpeed: number;
  waveCount: number;
  mode: string;
}

const PRESETS: Record<string, PagePreset> = {
  "/": { amp: 1.3, freqMult: 1.0, speed: 0.95, particleSpeed: 1.0, waveCount: 8, mode: "hero" },
  "/profile": { amp: 0.75, freqMult: 0.8, speed: 0.6, particleSpeed: 0.7, waveCount: 6, mode: "calm" },
  "/discography": { amp: 1.15, freqMult: 1.3, speed: 1.05, particleSpeed: 1.1, waveCount: 8, mode: "harmonic" },
  "/research": { amp: 0.95, freqMult: 1.5, speed: 0.85, particleSpeed: 0.8, waveCount: 8, mode: "scientific" },
  "/upcoming": { amp: 1.1, freqMult: 1.0, speed: 1.3, particleSpeed: 1.3, waveCount: 8, mode: "dynamic" },
  "/contact": { amp: 0.6, freqMult: 0.75, speed: 0.5, particleSpeed: 0.5, waveCount: 5, mode: "calm" },
};

const defaultPreset: PagePreset = {
  amp: 1.0,
  freqMult: 1.0,
  speed: 1.0,
  particleSpeed: 1.0,
  waveCount: 7,
  mode: "default"
};

const colors = [
  "rgba(212, 175, 55, ALPHA)", // Gold
  "rgba(245, 158, 11, ALPHA)", // Amber
  "rgba(248, 246, 240, ALPHA)", // Divine White
  "rgba(179, 143, 45, ALPHA)", // Copper
  "rgba(255, 253, 240, ALPHA)", // Warm Ivory
];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

export const DevotionalEnergyField: React.FC = () => {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const scrollRef = useRef({ current: 0, target: 0, delta: 0 });
  const [isClient, setIsClient] = useState(false);

  // Active preset reference to dynamically morph preset multipliers inside the loop
  const presetRef = useRef<PagePreset>(PRESETS[pathname] || defaultPreset);

  // Current interpolated values for smooth transitions
  const currentAmp = useRef(1.0);
  const currentFreqMult = useRef(1.0);
  const currentSpeed = useRef(1.0);
  const currentParticleSpeed = useRef(1.0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Sync pathname changes to preset ref
  useEffect(() => {
    if (isClient) {
      presetRef.current = PRESETS[pathname] || defaultPreset;
    }
  }, [pathname, isClient]);

  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Particle[] = [];
    const numParticles = 45;

    const leftWaves: EmitterWave[] = [];
    const rightWaves: EmitterWave[] = [];
    const numWaves = 8; // Number of wave items in buffer

    // Track scroll
    const handleScroll = () => {
      scrollRef.current.target = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Initialize Canvas Dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Update maxRadius of waves dynamically based on screen size
      const maxR = canvas.width * 0.75;
      leftWaves.forEach(w => w.maxR = maxR);
      rightWaves.forEach(w => w.maxR = maxR);
    };
    
    // Initialize Waves before resize trigger
    const initialMaxR = window.innerWidth * 0.75;
    for (let i = 0; i < numWaves; i++) {
      leftWaves.push({
        r: Math.random() * initialMaxR,
        speed: Math.random() * 0.35 + 0.25,
        amp: Math.random() * 9 + 5,
        freq: Math.random() * 3 + 2,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: Math.random() * 0.012 + 0.004,
        color: getRandomColor(),
        maxR: initialMaxR,
        seed: Math.random(),
      });

      rightWaves.push({
        r: Math.random() * initialMaxR,
        speed: Math.random() * 0.35 + 0.25,
        amp: Math.random() * 9 + 5,
        freq: Math.random() * 3 + 2,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: Math.random() * 0.012 + 0.004,
        color: getRandomColor(),
        maxR: initialMaxR,
        seed: Math.random(),
      });
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize Particles
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.2 + 0.4, // micro golden dust
        speedX: Math.random() * 0.25 + 0.08,
        speedY: Math.random() * 0.35 + 0.2,
        alpha: Math.random() * 0.3 + 0.1,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: Math.random() * 0.015 + 0.003,
      });
    }

    let time = 0;

    // Sanskrit OM visual imprint state values
    let omState = "idle"; // idle | fadeIn | sustain | fadeOut
    let omTimer = 0;
    let omAlpha = 0;
    let omX = canvas.width / 2;
    let omY = canvas.height / 2;
    let omScale = 1.0;

    // Rendering loop
    const render = () => {
      time += 0.015;

      // 0. Preset interpolation for ultra-smooth morph transitions
      const preset = presetRef.current;
      currentAmp.current += (preset.amp - currentAmp.current) * 0.04;
      currentFreqMult.current += (preset.freqMult - currentFreqMult.current) * 0.04;
      currentSpeed.current += (preset.speed - currentSpeed.current) * 0.04;
      currentParticleSpeed.current += (preset.particleSpeed - currentParticleSpeed.current) * 0.04;

      // Smooth scroll interpolation
      const scroll = scrollRef.current;
      scroll.delta = (scroll.target - scroll.current) * 0.07;
      scroll.current += scroll.delta;

      // Clear context
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const maxAlpha = canvas.width < 768 ? 0.02 : canvas.width < 1024 ? 0.05 : 0.18;

      // 1. Draw Mouse Radial Aura Glow
      if (mouse.active) {
        const auraGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          340
        );
        // Soft amber/gold interactive resonance distortion
        auraGrad.addColorStop(0, "rgba(245, 158, 11, 0.045)");
        auraGrad.addColorStop(0.35, "rgba(212, 175, 55, 0.015)");
        auraGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = auraGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // 2. Draw Scientific/Harmonic Background Overlay structures
      if (preset.mode === "scientific") {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(212, 175, 55, 0.006)";
        ctx.lineWidth = 0.55;
        // Concentric scientific reference orbits
        ctx.arc(canvas.width / 2, canvas.height / 2, 180, 0, Math.PI * 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, 340, 0, Math.PI * 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, 500, 0, Math.PI * 2);
        ctx.setLineDash([3, 10]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      if (preset.mode === "harmonic") {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(245, 158, 11, 0.009)";
        ctx.lineWidth = 0.5;
        // Subtle central horizontal wave path
        for (let x = 0; x < canvas.width; x += 5) {
          const y = canvas.height * 0.5 + Math.sin(x * 0.006 + time * 1.5) * 16 * Math.cos(x * 0.0018);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // 3. Draw Left & Right OM Emitter Waves (continuous flow inward)
      const scrollEffect = scroll.current * 0.22;
      const scrollFactor = Math.min(Math.abs(scroll.delta) * 0.15, 3.5);
      const cy = canvas.height * 0.5;

      // Left Emitters (Origin: x = 0)
      leftWaves.slice(0, preset.waveCount).forEach((w) => {
        // Increment radius
        w.r += w.speed * currentSpeed.current * (1 + scrollFactor * 0.35);
        w.phase += w.phaseSpeed * currentSpeed.current;

        // Reset if exceeded limits
        if (w.r > w.maxR) {
          w.r = 0;
          w.speed = Math.random() * 0.35 + 0.25;
          w.amp = Math.random() * 9 + 5;
          w.freq = Math.random() * 3 + 2;
          w.color = getRandomColor();
        }

        ctx.beginPath();
        ctx.lineWidth = 0.85;

        // Opacity profile: fades in at edge, fades out towards center
        let alpha = 0;
        if (w.r < 180) {
          alpha = (w.r / 180) * maxAlpha;
        } else {
          alpha = (1 - (w.r - 180) / (w.maxR - 180)) * maxAlpha;
        }
        alpha = Math.max(0, Math.min(maxAlpha, alpha)) * currentAmp.current;
        ctx.strokeStyle = w.color.replace("ALPHA", alpha.toString());

        const segments = 90;
        for (let j = 0; j <= segments; j++) {
          const theta = -Math.PI / 2 + (Math.PI * j) / segments;
          
          const rippleFreq = w.freq * currentFreqMult.current;
          const ripple = Math.sin(theta * rippleFreq + w.phase + scrollEffect * 0.04) * w.amp * currentAmp.current;
          
          let rad = w.r + ripple;
          let px = rad * Math.cos(theta);
          let py = cy + rad * Math.sin(theta);

          // Mouse-bending distortion pushes wave paths away from cursor
          if (mouse.active) {
            const dx = px - mouse.x;
            const dy = py - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const forceRadius = 140;
            if (dist < forceRadius) {
              const force = (forceRadius - dist) / forceRadius;
              px += (dx / (dist || 1)) * force * 18;
              py += (dy / (dist || 1)) * force * 18;
            }
          }

          if (j === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      });

      // Right Emitters (Origin: x = canvas.width)
      rightWaves.slice(0, preset.waveCount).forEach((w) => {
        // Increment radius
        w.r += w.speed * currentSpeed.current * (1 + scrollFactor * 0.35);
        w.phase += w.phaseSpeed * currentSpeed.current;

        // Reset if exceeded limits
        if (w.r > w.maxR) {
          w.r = 0;
          w.speed = Math.random() * 0.35 + 0.25;
          w.amp = Math.random() * 9 + 5;
          w.freq = Math.random() * 3 + 2;
          w.color = getRandomColor();
        }

        ctx.beginPath();
        ctx.lineWidth = 0.85;

        // Opacity profile
        let alpha = 0;
        if (w.r < 180) {
          alpha = (w.r / 180) * maxAlpha;
        } else {
          alpha = (1 - (w.r - 180) / (w.maxR - 180)) * maxAlpha;
        }
        alpha = Math.max(0, Math.min(maxAlpha, alpha)) * currentAmp.current;
        ctx.strokeStyle = w.color.replace("ALPHA", alpha.toString());

        const segments = 90;
        for (let j = 0; j <= segments; j++) {
          // Angles in second and third quadrants to sweep to the left
          const theta = Math.PI / 2 + (Math.PI * j) / segments;
          
          const rippleFreq = w.freq * currentFreqMult.current;
          const ripple = Math.sin(theta * rippleFreq + w.phase + scrollEffect * 0.04) * w.amp * currentAmp.current;
          
          let rad = w.r + ripple;
          let px = canvas.width + rad * Math.cos(theta);
          let py = cy + rad * Math.sin(theta);

          // Mouse-bending distortion
          if (mouse.active) {
            const dx = px - mouse.x;
            const dy = py - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const forceRadius = 140;
            if (dist < forceRadius) {
              const force = (forceRadius - dist) / forceRadius;
              px += (dx / (dist || 1)) * force * 18;
              py += (dy / (dist || 1)) * force * 18;
            }
          }

          if (j === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      });

      // 4. Center Resonance Convergence Glow (where left and right converge)
      const pulseSpeed = preset.mode === "calm" ? 0.3 : 0.6;
      const convergenceGlowRadius = 240 + Math.sin(time * pulseSpeed) * 45;
      const convergenceGlowOpacity = (preset.mode === "calm" ? 0.025 : 0.04) * currentAmp.current;
      
      const convGrad = ctx.createRadialGradient(
        canvas.width / 2,
        cy,
        0,
        canvas.width / 2,
        cy,
        convergenceGlowRadius
      );
      convGrad.addColorStop(0, `rgba(245, 158, 11, ${convergenceGlowOpacity})`); // Amber center
      convGrad.addColorStop(0.4, `rgba(212, 175, 55, ${convergenceGlowOpacity * 0.4})`); // Gold edge
      convGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = convGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Faint intersecting reference ripple circles in convergence center
      if (preset.mode === "hero" || preset.mode === "dynamic") {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(212, 175, 55, ${0.015 * currentAmp.current})`;
        ctx.lineWidth = 0.55;
        const rippleScale = (time * 15) % 180;
        ctx.arc(canvas.width / 2, cy, rippleScale, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 5. Draw Spiritual Particles (Golden dust drift)
      particles.forEach((p) => {
        p.phase += p.phaseSpeed;
        p.y -= (p.speedY + scrollFactor * 0.8) * currentParticleSpeed.current;
        p.x += Math.sin(p.phase) * p.speedX;

        // Reactive push away from mouse
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pushRadius = 130;

          if (dist < pushRadius) {
            const force = (pushRadius - dist) / pushRadius;
            p.x += (dx / (dist || 1)) * force * 1.5;
            p.y += (dy / (dist || 1)) * force * 1.5;
          }
        }

        // Loop boundaries
        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        } else if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }

        if (p.x < -20) p.x = canvas.width + 20;
        else if (p.x > canvas.width + 20) p.x = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha * currentAmp.current})`;
        ctx.shadowColor = "#d4af37";
        ctx.shadowBlur = p.size > 1 ? 3 : 0;
        ctx.fill();
      });

      ctx.shadowBlur = 0; // Reset shadows

      // 6. Sanskrit "ॐ" Visual Imprint (Periodic mystical glow)
      omTimer++;
      if (omState === "idle" && omTimer > 1500) {
        // Trigger OM approximately every 25 seconds
        omState = "fadeIn";
        omTimer = 0;
        omX = canvas.width / 2 + (Math.random() * 140 - 70);
        omY = cy + (Math.random() * 100 - 50);
        omScale = 0.95;
      }

      if (omState === "fadeIn") {
        omAlpha += 0.0006; // extremely slow fade-in
        omScale += 0.00015;
        if (omAlpha >= 0.035) {
          omAlpha = 0.035;
          omState = "sustain";
          omTimer = 0;
        }
      } else if (omState === "sustain") {
        omScale += 0.00008;
        if (omTimer > 280) { // sustain for ~4.5 seconds
          omState = "fadeOut";
          omTimer = 0;
        }
      } else if (omState === "fadeOut") {
        omAlpha -= 0.0006; // extremely slow fade-out
        omScale += 0.00015;
        if (omAlpha <= 0) {
          omAlpha = 0;
          omState = "idle";
          omTimer = 0;
        }
      }

      if (omAlpha > 0) {
        ctx.save();
        ctx.font = `italic 300 ${100 * omScale}px var(--font-cormorant), Cormorant Garamond, Georgia, serif`;
        ctx.fillStyle = `rgba(212, 175, 55, ${omAlpha})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = "rgba(245, 158, 11, 0.2)";
        ctx.shadowBlur = 12;
        ctx.fillText("ॐ", omX, omY);
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isClient]);

  if (!isClient) return null;

  return (
    <>
      {/* 1. Animated Canvas for Emitters, Frequencies, Particles and Aura */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none bg-transparent"
        style={{ mixBlendMode: "screen", zIndex: -1 }}
      />

      {/* 2. Concentric Sri Yantra/Mandala Inspired Sacred Geometry Grid */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden flex items-center justify-center" style={{ zIndex: -1 }}>
        <svg
          className="w-[85vw] h-[85vw] max-w-[850px] opacity-[0.013] text-[#d4af37] animate-spin-slow-centered select-none"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.3"
          aria-hidden="true"
        >
          {/* Concentric Resonance Rings */}
          <circle cx="100" cy="100" r="95" strokeDasharray="1 3" />
          <circle cx="100" cy="100" r="88" />
          <circle cx="100" cy="100" r="80" strokeDasharray="4 2" />
          <circle cx="100" cy="100" r="70" />
          <circle cx="100" cy="100" r="58" strokeDasharray="1 1" />
          <circle cx="100" cy="100" r="46" />
          <circle cx="100" cy="100" r="30" strokeDasharray="3 1" />
          <circle cx="100" cy="100" r="16" />

          {/* Intersecting Geometry / Sri Yantra Metatron Core */}
          <polygon points="100,12 24,144 176,144" />
          <polygon points="100,188 24,56 176,56" />

          {/* Inner Intersecting Octagrams */}
          <polygon points="100,38 46,132 154,132" />
          <polygon points="100,162 46,68 154,68" />
          
          <polygon points="100,52 62,118 138,118" />
          <polygon points="100,148 62,82 138,82" />

          <polygon points="100,68 76,110 124,110" />
          <polygon points="100,132 76,90 124,90" />

          {/* Grid Rays (15-degree spatial alignments) */}
          <line x1="100" y1="5" x2="100" y2="195" />
          <line x1="5" y1="100" x2="195" y2="100" />
          <line x1="32.8" y1="32.8" x2="167.2" y2="167.2" strokeDasharray="2 4" />
          <line x1="32.8" y1="167.2" x2="167.2" y2="32.8" strokeDasharray="2 4" />
          
          <line x1="100" y1="100" x2="182.1" y2="51.6" />
          <line x1="100" y1="100" x2="17.9" y2="148.4" />
          <line x1="100" y1="100" x2="182.1" y2="148.4" />
          <line x1="100" y1="100" x2="17.9" y2="51.6" />

          <line x1="100" y1="100" x2="148.4" y2="182.1" />
          <line x1="100" y1="100" x2="51.6" y2="17.9" />
          <line x1="100" y1="100" x2="148.4" y2="17.9" />
          <line x1="100" y1="100" x2="51.6" y2="182.1" />
        </svg>
      </div>
    </>
  );
};
