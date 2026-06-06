"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAudio } from "@/context/AudioContext";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize2, Minimize2, Activity, Music, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  color: string;
  type: "burst" | "gather" | "ambient" | "progress" | "reconnect";
  trail: { x: number; y: number }[];
}

export const AudioPlayer: React.FC = () => {
  const {
    tracks,
    currentTrackIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    activeFrequency,
    playbackError,
    playTrack,
    pauseTrack,
    resumeTrack,
    stopPlayback,
    nextTrack,
    prevTrack,
    setVolume,
    seek,
    analyzerNode,
    stopSynthesis,
  } = useAudio();

  const [isMinimized, setIsMinimized] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.8);
  const [isPlayHovered, setIsPlayHovered] = useState(false);
  const [isMouseOverPlayer, setIsMouseOverPlayer] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const visualizerCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const playBtnRef = useRef<HTMLButtonElement | null>(null);
  const progressContainerRef = useRef<HTMLDivElement | null>(null);

  const visualizerAnimRef = useRef<number | null>(null);
  const particleAnimRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const isPlayingRef = useRef(isPlaying);

  // Note: particle trigger helpers are declared below. We update refs in an effect
  // after the helpers exist to avoid accessing functions before declaration.

  const handleClose = useCallback(() => {
    if (isClosing) return;

    setIsClosing(true);
    setIsPlayHovered(false);
    setIsMouseOverPlayer(false);
    particlesRef.current = [];
    if (visualizerAnimRef.current) {
      cancelAnimationFrame(visualizerAnimRef.current);
      visualizerAnimRef.current = null;
    }
    if (particleAnimRef.current) {
      cancelAnimationFrame(particleAnimRef.current);
      particleAnimRef.current = null;
    }

    stopPlayback();
    setIsClosing(false);
  }, [isClosing, stopPlayback]);

  // Handle cursor moves relative to player container for magnetic gravity pulls
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (playerContainerRef.current) {
      const rect = playerContainerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // 1. Spawns particle burst on play click
  const triggerBurst = (count: number) => {
    const pCanvas = particleCanvasRef.current;
    const playBtn = playBtnRef.current;
    if (!pCanvas || !playBtn) return;

    const cRect = pCanvas.getBoundingClientRect();
    const bRect = playBtn.getBoundingClientRect();
    const startX = bRect.left - cRect.left + bRect.width / 2;
    const startY = bRect.top - cRect.top + bRect.height / 2;

    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 2; // high velocity click sparks
      newParticles.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.0, // slight upward bias
        size: Math.random() * 2 + 0.8,
        alpha: 1,
        life: Math.random() * 50 + 40,
        maxLife: 90,
        color: "url(#brandGoldGradient)",
        type: "burst",
        trail: [],
      });
    }
    particlesRef.current = [...particlesRef.current, ...newParticles];
  };

  // 2. Reactivates gather physics when returning
  const triggerReconnection = () => {
    const pCanvas = particleCanvasRef.current;
    const playBtn = playBtnRef.current;
    if (!pCanvas || !playBtn) return;

    const cRect = pCanvas.getBoundingClientRect();
    const bRect = playBtn.getBoundingClientRect();
    const targetX = bRect.left - cRect.left + bRect.width / 2;
    const targetY = bRect.top - cRect.top + bRect.height / 2;

    // Spawn 35 outer particles that accelerate inward towards play button
    const newParticles: Particle[] = [];
    for (let i = 0; i < 35; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 80 + 120; // spawn in outer circle boundary
      const spawnX = targetX + Math.cos(angle) * distance;
      const spawnY = targetY + Math.sin(angle) * distance;
      
      newParticles.push({
        x: spawnX,
        y: spawnY,
        vx: 0,
        vy: 0,
        size: Math.random() * 1.5 + 0.5,
        alpha: 0.8,
        life: 60,
        maxLife: 60,
        color: "#fcf6ba",
        type: "reconnect",
        trail: [],
      });
    }
    particlesRef.current = [...particlesRef.current, ...newParticles];
  };

  // 3. Fades and settles existing particles on pause
  const triggerDissolve = () => {
    particlesRef.current.forEach((p) => {
      p.vx *= 0.3; // decelerate abruptly
      p.vy *= 0.3;
      p.life = Math.min(p.life, 25); // shorten life to dissolve quickly
    });
  };

  // Sync isPlaying state to ref to trigger bursts on play toggle
  useEffect(() => {
    // If transitioning from paused to playing, trigger play click explosion
    if (isPlaying && !isPlayingRef.current) {
      triggerBurst(60);
    }
    // If transitioning from playing to paused, trigger gentle dissolve animation
    if (!isPlaying && isPlayingRef.current) {
      triggerDissolve();
    }
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && (currentTrackIndex !== null || activeFrequency)) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [currentTrackIndex, activeFrequency, handleClose]);

  // Synchronize dynamic frequency visualizer canvas (60-120fps)
  useEffect(() => {
    if (!isPlaying || isMinimized || !visualizerCanvasRef.current) {
      if (visualizerAnimRef.current) {
        cancelAnimationFrame(visualizerAnimRef.current);
      }
      return;
    }

    const canvas = visualizerCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const bufferLength = analyzerNode ? analyzerNode.frequencyBinCount : 64;
    const dataArray = new Uint8Array(bufferLength);

    const drawVisualizer = () => {
      visualizerAnimRef.current = requestAnimationFrame(drawVisualizer);
      
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      if (analyzerNode) {
        analyzerNode.getByteFrequencyData(dataArray);
      } else {
        // Soft mock sine-wave oscillations if Audio API isn't ready
        for (let i = 0; i < bufferLength; i++) {
          dataArray[i] = Math.sin(Date.now() * 0.003 + i * 0.1) * 20 + 30;
        }
      }

      // Render gold frequency bar trails
      ctx.fillStyle = "rgba(191, 149, 63, 0.4)"; // Gold translucent visualizer
      const barWidth = (w / bufferLength) * 1.8;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const percent = dataArray[i] / 255;
        const barHeight = Math.max(1.5, percent * h * 0.9);

        // Rounded bars for editorial watch-ad feel
        ctx.fillRect(x, h - barHeight, barWidth - 1, barHeight);
        x += barWidth;
      }
    };

    drawVisualizer();

    return () => {
      if (visualizerAnimRef.current) {
        cancelAnimationFrame(visualizerAnimRef.current);
      }
    };
  }, [isPlaying, isMinimized, analyzerNode]);

  // Synchronize GPU-accelerated gold particle physics simulation loop
  useEffect(() => {
    if (isMinimized || !particleCanvasRef.current) {
      if (particleAnimRef.current) {
        cancelAnimationFrame(particleAnimRef.current);
      }
      return;
    }

    const canvas = particleCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const dataArray = new Uint8Array(64);

    const updateParticles = () => {
      particleAnimRef.current = requestAnimationFrame(updateParticles);

      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      // Find relative center coordinate of the Play button
      let btnX = w / 2;
      let btnY = h - 35;
      const playBtn = playBtnRef.current;
      if (playBtn) {
        const cRect = canvas.getBoundingClientRect();
        const bRect = playBtn.getBoundingClientRect();
        btnX = bRect.left - cRect.left + bRect.width / 2;
        btnY = bRect.top - cRect.top + bRect.height / 2;
      }

      // Gather audio frequency amplitude for rhythm reactivity
      if (analyzerNode) {
        analyzerNode.getByteFrequencyData(dataArray);
      } else {
        dataArray[0] = isPlaying ? 80 : 0;
      }
      const musicAmplitude = dataArray[4] || 0; // middle range rhythm beat

      // A. SPARK EMITTERS FOR HOVER / PLAYING / PROGRESS
      
      // 1. Gathering gold dust around Play button on hover
      if (isPlayHovered && Math.random() < 0.3) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 30 + 30; // spawn in circle around button
        particlesRef.current.push({
          x: btnX + Math.cos(angle) * radius,
          y: btnY + Math.sin(angle) * radius,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 1.2 + 0.6,
          alpha: 0.1,
          life: 45,
          maxLife: 45,
          color: "#fbf5b7",
          type: "gather",
          trail: [],
        });
      }

      // 2. Ambient rising gold dust waves inside player while playing
      if (isPlaying && Math.random() < 0.25) {
        particlesRef.current.push({
          x: Math.random() * (w - 20) + 10,
          y: h - 10, // rise from bottom
          vx: (Math.random() - 0.5) * 0.4,
          vy: -(Math.random() * 0.6 + 0.3),
          size: Math.random() * 1.5 + 0.5,
          alpha: 0.1,
          life: Math.random() * 80 + 70,
          maxLife: 150,
          color: "#b38728",
          type: "ambient",
          trail: [],
        });
      }

      // 3. Spawns sparkles falling down from progress bar slider head
      if (isPlaying && !activeFrequency && progressContainerRef.current && Math.random() < 0.18) {
        const pRect = progressContainerRef.current.getBoundingClientRect();
        const cRect = canvas.getBoundingClientRect();
        const progressPercent = currentTime / (duration || 1);
        const progressX = pRect.left - cRect.left + pRect.width * progressPercent;
        const progressY = pRect.top - cRect.top + pRect.height / 2;

        particlesRef.current.push({
          x: progressX,
          y: progressY,
          vx: (Math.random() - 0.5) * 0.6,
          vy: Math.random() * 0.6 + 0.2, // gravity falls down
          size: Math.random() * 1.2 + 0.4,
          alpha: 0.8,
          life: 30,
          maxLife: 30,
          color: "#fcf6ba",
          type: "progress",
          trail: [],
        });
      }

      // B. PHYSICS UPDATE LOOP
      particlesRef.current = particlesRef.current.filter((p) => {
        // Update lifetime
        p.life--;
        p.alpha = Math.max(0, p.life / p.maxLife);

        // Capture trail
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 5) p.trail.shift();

        // 1. Gather particles: Spiral into play button
        if (p.type === "gather") {
          const dx = btnX - p.x;
          const dy = btnY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 3) {
            p.vx += (dx / dist) * 0.12;
            p.vy += (dy / dist) * 0.12;
            p.vx *= 0.88;
            p.vy *= 0.88;
          } else {
            p.life = 0; // dies upon reaching center
          }
          // Slow alpha build-up for orbital gathering particles
          p.alpha = Math.min(1.0, (p.maxLife - p.life) / 10);
        }

        // 2. Reconnect particles: Inward rush on resume
        else if (p.type === "reconnect") {
          const dx = btnX - p.x;
          const dy = btnY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 4) {
            const pull = 0.35;
            p.vx = (dx / dist) * pull * 10;
            p.vy = (dy / dist) * pull * 10;
          } else {
            p.life = 0;
          }
        }

        // 3. Ambient particles: Float up and sway reactively to music beat
        else if (p.type === "ambient") {
          p.vy -= 0.005; // float acceleration
          const swayFreq = 0.005;
          const amplitude = isPlaying ? 0.4 + (musicAmplitude / 255) * 1.2 : 0.4;
          p.x += Math.sin(Date.now() * swayFreq + p.y * 0.04) * amplitude;
        }

        // 4. Burst particles: Decelerate with slight wind upward
        else if (p.type === "burst") {
          p.vx *= 0.94;
          p.vy *= 0.94;
          p.vy -= 0.03; // slight upward drift
        }

        // Apply general velocity
        p.x += p.vx;
        p.y += p.vy;

        // 5. Magnetic attraction to cursor when hovered over player
        if (isMouseOverPlayer && (p.type === "ambient" || p.type === "burst")) {
          const dx = mousePos.x - p.x;
          const dy = mousePos.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            const force = (110 - dist) / 110 * 0.06;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Render Trails (Volumetric shimmer lines)
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let i = 1; i < p.trail.length; i++) {
            ctx.lineTo(p.trail[i].x, p.trail[i].y);
          }
          ctx.strokeStyle = `rgba(212, 175, 55, ${p.alpha * 0.25})`; // faded gold trail
          ctx.lineWidth = p.size * 0.6;
          ctx.stroke();
        }

        // Draw Sparkle core
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.2);
        grad.addColorStop(0, `rgba(252, 246, 186, ${p.alpha * 0.95})`); // white-gold core
        grad.addColorStop(0.3, `rgba(212, 175, 55, ${p.alpha * 0.85})`); // gold gradient
        grad.addColorStop(1, "rgba(212, 175, 55, 0)");
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
        ctx.fill();

        return p.life > 0 && p.x >= 0 && p.x <= w && p.y >= 0 && p.y <= h;
      });
    };

    updateParticles();

    return () => {
      if (particleAnimRef.current) {
        cancelAnimationFrame(particleAnimRef.current);
      }
    };
  }, [isMinimized, isPlayHovered, isMouseOverPlayer, mousePos, analyzerNode, isPlaying, currentTime, duration, activeFrequency]);

  if (currentTrackIndex === null && !activeFrequency) return null;

  const activeTrack = currentTrackIndex !== null ? tracks[currentTrackIndex] : null;

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      triggerReconnection(); // trigger gather particles on resume click
      resumeTrack();
    }
  };

  const handleRetryPlayback = () => {
    if (currentTrackIndex !== null) {
      playTrack(currentTrackIndex);
      return;
    }

    if (tracks.length > 0) {
      playTrack(0);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      <div
        aria-hidden="true"
        className={`${isMinimized ? "h-28 sm:h-24" : "h-[360px] sm:h-[340px]"} shrink-0`}
      />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex w-full flex-col items-stretch gap-3 px-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:inset-x-auto sm:right-5 sm:bottom-5 sm:max-w-sm sm:items-end sm:px-0 sm:pb-0 md:right-6 lg:right-8 select-none">
      <AnimatePresence mode="wait">
        {!isClosing && isMinimized ? (
          /* MINIMIZED CAPSULE STATE */
          <motion.div
            key="minimized"
            initial={{ y: 18, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 18, scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="glass pointer-events-auto w-full rounded-2xl border-white/10 p-3 shadow-[0_15px_45px_rgba(0,0,0,0.6)] text-white sm:w-auto sm:rounded-full sm:p-4"
          >
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Expand now playing"
                onClick={() => setIsMinimized(false)}
                className="group flex min-w-0 flex-1 items-center gap-3 text-left cursor-pointer sm:flex-none"
              >
                <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-luxury-bg border border-white/10 group-hover:border-luxury-accent/25">
                  {isPlaying ? (
                    <Activity size={14} className="text-luxury-accent animate-pulse" />
                  ) : (
                    <Music size={14} />
                  )}
                </div>
                <div className="flex min-w-0 flex-col items-start pr-1">
                  <span className="text-[10px] font-mono text-luxury-muted uppercase tracking-wider">
                    Now {isPlaying ? "Playing" : "Paused"}
                  </span>
                  <span className="max-w-[210px] truncate text-xs font-serif font-medium sm:max-w-[120px]">
                    {activeFrequency ? `Nada-Bramh ${activeFrequency}Hz` : activeTrack?.title}
                  </span>
                </div>
                <Maximize2 size={12} className="shrink-0 text-luxury-secondary group-hover:text-white" />
              </button>
              <button
                type="button"
                aria-label="Close now playing and stop audio"
                onClick={handleClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-luxury-secondary transition-colors hover:bg-white/5 hover:text-white cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>
          </motion.div>
        ) : !isClosing ? (
          /* EXPANDED INTERACTIVE WORK OF ART */
          <motion.div
            ref={playerContainerRef}
            key="expanded"
            role="region"
            aria-label="Now playing audio player"
            aria-live="polite"
            initial={{ y: 36, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsMouseOverPlayer(true)}
            onMouseLeave={() => setIsMouseOverPlayer(false)}
            className="glass pointer-events-auto w-full max-h-[calc(100dvh-6rem)] overflow-hidden rounded-2xl border border-white/10 p-4 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.7)] flex flex-col gap-4 relative sm:rounded-3xl sm:p-6"
          >
            {/* GPU Particle Canvas Overlay (Non-clickable, captures rendering) */}
            <canvas
              ref={particleCanvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
            />

            {/* Header section */}
            <div className="flex justify-between items-start gap-4 relative z-20">
              <div className="flex gap-3">
                {/* 3D album artwork reaction on hover/play */}
                <motion.div
                  animate={
                    isPlaying
                      ? {
                          rotateY: [0, 6, -6, 0],
                          rotateX: [0, -4, 4, 0],
                          boxShadow: [
                            "0px 0px 10px rgba(191,149,63,0.1)",
                            "0px 0px 25px rgba(191,149,63,0.35)",
                            "0px 0px 10px rgba(191,149,63,0.1)",
                          ],
                        }
                      : { rotateY: 0, rotateX: 0, boxShadow: "0px 0px 10px rgba(0,0,0,0.4)" }
                  }
                  transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
                  className="w-14 h-14 rounded-xl bg-luxury-surface border border-white/10 flex items-center justify-center overflow-hidden relative"
                >
                  {activeFrequency ? (
                    <Activity size={24} className="text-luxury-accent animate-pulse" />
                  ) : activeTrack ? (
                    <img
                      src={`/images/albums/${activeTrack.artwork}`}
                      alt={activeTrack.title}
                      className="w-full h-full object-cover cinematic-img scale-105"
                    />
                  ) : (
                    <div className="text-luxury-secondary font-serif font-bold text-xl">
                      PS
                    </div>
                  )}
                  {/* Subtle artwork reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                </motion.div>
                <div className="flex flex-col max-w-[170px]">
                  <span className="text-sm font-serif font-semibold truncate text-white tracking-wide">
                    {activeFrequency ? `Nada-Bramh Resonance` : activeTrack?.title}
                  </span>
                  <span className="text-[10.5px] font-mono text-luxury-secondary mt-0.5 truncate tracking-wide">
                    {activeFrequency ? `Therapeutic frequency: ${activeFrequency}Hz` : activeTrack?.artist}
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  aria-label="Minimize now playing"
                  onClick={() => setIsMinimized(true)}
                  className="p-2 rounded-full hover:bg-white/5 text-luxury-secondary hover:text-white transition-colors cursor-pointer border border-transparent hover:border-white/5"
                >
                  <Minimize2 size={13} />
                </button>
                <button
                  type="button"
                  aria-label="Close now playing and stop audio"
                  onClick={handleClose}
                  className="p-2 rounded-full hover:bg-white/5 text-luxury-secondary hover:text-white transition-colors cursor-pointer border border-white/10 hover:border-white/15"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {playbackError && !activeFrequency && (
              <div className="relative z-20 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-xs text-amber-100 flex items-center justify-between gap-3">
                <span className="leading-relaxed">{playbackError}</span>
                <button
                  type="button"
                  aria-label="Retry audio playback"
                  onClick={handleRetryPlayback}
                  className="shrink-0 rounded-full border border-amber-400/30 px-3 py-1.5 font-mono uppercase tracking-widest text-[10px] text-amber-100 hover:bg-amber-400/10 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Visualizer screen */}
            <div className="h-11 w-full rounded-xl bg-black/45 border border-white/5 overflow-hidden relative z-20 shadow-inner">
              <canvas ref={visualizerCanvasRef} className="w-full h-full" />
              {activeFrequency && (
                <button
                  type="button"
                  aria-label="Stop resonance tone"
                  onClick={stopSynthesis}
                  className="absolute inset-0 flex items-center justify-center bg-black/60 text-[9.5px] font-mono text-luxury-accent opacity-0 hover:opacity-100 transition-opacity cursor-pointer font-bold tracking-widest"
                >
                  Stop Resonance Tone
                </button>
              )}
            </div>

            {/* Custom styled progress slider emitting sparkles */}
            {!activeFrequency && (
              <div className="flex flex-col gap-2 relative z-20">
                <div ref={progressContainerRef} className="relative flex items-center h-2 group/progress cursor-pointer">
                  <input
                    aria-label="Track progress"
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={(e) => seek(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
                  />
                  {/* Outer track */}
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
                    {/* Glowing progress energy filling the bar */}
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-luxury-accent to-gold-gradient shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                      style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                    />
                  </div>
                  {/* Floating knob indicator */}
                  <div
                    className="absolute w-2.5 h-2.5 rounded-full bg-white border border-luxury-accent shadow-[0_0_8px_rgba(255,255,255,0.8)] -translate-x-1/2 left-0 transition-all duration-75 pointer-events-none opacity-0 group-hover/progress:opacity-100"
                    style={{ left: `${(currentTime / (duration || 1)) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] font-mono text-luxury-secondary tracking-wider">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            )}

            {/* Main Player Actions */}
            <div className="flex items-center justify-between gap-4 mt-1 relative z-20">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label={isMuted || volume === 0 ? "Unmute audio" : "Mute audio"}
                  onClick={toggleMute}
                  className="p-2 rounded-full hover:bg-white/5 text-luxury-secondary hover:text-white transition-colors cursor-pointer border border-transparent hover:border-white/5"
                >
                  {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
                <div className="relative flex items-center h-4 w-16 group/vol cursor-pointer">
                  <input
                    aria-label="Volume"
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
                  />
                  <div className="w-full h-[3px] bg-white/10 rounded-full relative">
                    <div
                      className="h-full rounded-full bg-white"
                      style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {!activeFrequency && (
                  <button
                    type="button"
                    aria-label="Previous track"
                    onClick={prevTrack}
                    className="p-2.5 rounded-full hover:bg-white/5 text-luxury-secondary hover:text-white transition-colors cursor-pointer border border-transparent hover:border-white/5"
                  >
                    <SkipBack size={15} />
                  </button>
                )}

                {/* Animated Play button triggering particles */}
                <button
                  ref={playBtnRef}
                  type="button"
                  aria-label={isPlaying ? "Pause audio" : "Play audio"}
                  onClick={handlePlayPause}
                  onMouseEnter={() => setIsPlayHovered(true)}
                  onMouseLeave={() => setIsPlayHovered(false)}
                  className="p-3.5 rounded-full bg-white text-luxury-bg hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] cursor-pointer relative flex items-center justify-center border border-white"
                >
                  {isPlaying ? (
                    <Pause size={17} fill="currentColor" className="text-luxury-bg relative z-10" />
                  ) : (
                    <Play size={17} fill="currentColor" className="text-luxury-bg relative z-10 translation-x-[1px]" />
                  )}
                </button>

                {!activeFrequency && (
                  <button
                    type="button"
                    aria-label="Next track"
                    onClick={nextTrack}
                    className="p-2.5 rounded-full hover:bg-white/5 text-luxury-secondary hover:text-white transition-colors cursor-pointer border border-transparent hover:border-white/5"
                  >
                    <SkipForward size={15} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      </div>
    </>
  );
};
