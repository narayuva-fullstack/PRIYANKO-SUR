"use client";

import React, { useEffect, useState, useRef } from "react";
import { useAudio } from "@/context/AudioContext";
import { Play, Square, Activity, HelpCircle, Video } from "lucide-react";
import { motion } from "framer-motion";

interface FrequencyPreset {
  freq: number;
  label: string;
  healingTarget: string;
  description: string;
}

const FREQUENCY_PRESETS: FrequencyPreset[] = [
  {
    freq: 136.1,
    label: "AUM (Cosmic Tone)",
    healingTarget: "Cognitive Balance",
    description: "The classical vibration of the Anahat Nada. Deeply grounding and correlates to the Earth's orbit period.",
  },
  {
    freq: 432,
    label: "Harmonic Scale",
    healingTarget: "Emotional Coherence",
    description: "Balances emotional state, decreases heart rate variability, and creates musical spatial harmony.",
  },
  {
    freq: 528,
    label: "Solfeggio Frequency",
    healingTarget: "Cellular Resonance",
    description: "Known to lower cellular stress, reduce stress hormones, and encourage natural restoration cycles.",
  },
  {
    freq: 852,
    label: "Intuitive Awareness",
    healingTarget: "Mental Clarity",
    description: "Awakens the subconscious brain state, returning spiritual balance and calming nervous system hyper-arousal.",
  },
];

const YOUTUBE_VIDEOS = [
  { id: "YB4mO5pWx-c", title: "Surya 21 Names Invocation Chanting" },
  { id: "VQqbJyB7NxM", title: "Music Healing Workshop Presentation" },
  { id: "a-sjAiAhhN8", title: "Siddhivinayak Stuti Audio-Visual Release" },
  { id: "AYruL7y4pXM", title: "Vedic Sanskrit Chanting & Modern Acoustic Blends" },
];

export default function Research() {
  const { activeFrequency, toggleSynthesis, stopSynthesis, isPlaying } = useAudio();
  const [phase, setPhase] = useState(0);
  const animationRef = useRef<number | null>(null);

  // SVG wave animation loop
  useEffect(() => {
    if (!activeFrequency || !isPlaying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const animate = () => {
      setPhase((prev) => (prev + 0.05) % (Math.PI * 2));
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [activeFrequency, isPlaying]);

  // Generate SVG path for visual frequency soundwave simulation
  const getSineWavePath = () => {
    const width = 800;
    const height = 150;
    const points: string[] = [];
    const amplitude = activeFrequency ? 35 : 5;
    const frequency = activeFrequency ? (activeFrequency / 100) * 0.08 : 0.02;

    for (let x = 0; x <= width; x += 5) {
      const y = height / 2 + Math.sin(x * frequency + phase) * amplitude;
      points.push(`${x},${y}`);
    }
    return `M ${points.join(" L ")}`;
  };

  return (
    <div className="relative min-h-screen bg-luxury-bg text-white py-16 divine-aura-glow-large">
      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-16">
        
        {/* Header Section */}
        <div className="flex flex-col gap-4 text-center items-center">
          <span className="text-[10px] font-mono text-luxury-accent uppercase tracking-widest">
            Sound Science & Nada-Bramh
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-reveal heading-safe">
            Research & Development
          </h1>
          <p className="text-sm text-luxury-secondary max-w-2xl leading-relaxed font-light mt-1">
            Exploring the therapeutic utility of sound. Using classical Vedic structures, pure sine frequency modulation, and modern acoustic measurements to impact brainwave synchrony and somatic health.
          </p>
        </div>

        {/* 1. INTERACTIVE OSCILLATOR MATRIX */}
        <div className="glass rounded-3xl p-6 md:p-10 relative overflow-hidden border-white/5 divine-aura-glow">
          <div className="absolute inset-0 bg-radial-ambient pointer-events-none opacity-20" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Visualizer screen */}
            <div className="flex flex-col gap-6 w-full">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono text-luxury-secondary uppercase tracking-wider">
                  Harmonic Visualization
                </span>
                <h3 className="text-xl font-serif text-white">
                  Resonance Path Waveform
                </h3>
              </div>

              <div className="h-44 w-full bg-luxury-surface/50 border border-white/5 rounded-2xl flex items-center justify-center relative overflow-hidden px-4">
                <svg viewBox="0 0 800 150" className="w-full h-full">
                  <path
                    d={getSineWavePath()}
                    fill="none"
                    stroke={activeFrequency ? "#f43f5e" : "#52525b"}
                    strokeWidth={2}
                    className="transition-all duration-300"
                  />
                  {/* Subtle Grid guides */}
                  <line x1="0" y1="75" x2="800" y2="75" stroke="rgba(255,255,255,0.03)" strokeDasharray="5,5" />
                </svg>

                {activeFrequency && (
                  <div className="absolute top-4 right-4 flex items-center gap-2 bg-luxury-accent/10 border border-luxury-accent/20 px-3 py-1 rounded-full text-[10px] font-mono text-luxury-accent animate-pulse">
                    <Activity size={10} /> Active Frequency: {activeFrequency}Hz
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center text-xs text-luxury-secondary font-mono">
                <span>Phase Alignment: Sync</span>
                <span>Signal Wave: Sine Osc</span>
              </div>
            </div>

            {/* Frequencies panel */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-serif text-white">Select Resonance Wave</h3>
                <p className="text-xs text-luxury-secondary font-light">
                  Click to toggle pure sonic frequency generation directly on your audio output device.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FREQUENCY_PRESETS.map((preset) => {
                  const isActive = activeFrequency === preset.freq;
                  return (
                    <button
                      key={preset.freq}
                      onClick={() => toggleSynthesis(preset.freq)}
                      className={`glass p-4 rounded-xl text-left transition-all ${
                        isActive ? "border-luxury-accent/40 bg-luxury-accent/[0.03]" : "hover:border-white/10"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-mono text-luxury-secondary">
                          {preset.freq} Hz
                        </span>
                        <span className="text-[10px] font-mono text-luxury-accent uppercase tracking-wider">
                          {preset.healingTarget}
                        </span>
                      </div>
                      <h4 className="text-sm font-serif font-medium text-white mt-1">
                        {preset.label}
                      </h4>
                      <p className="text-[10px] text-luxury-secondary leading-relaxed font-light mt-1.5">
                        {preset.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {activeFrequency && (
                <button
                  onClick={stopSynthesis}
                  className="w-full py-3 rounded-xl border border-luxury-accent/30 text-xs font-mono text-luxury-accent hover:bg-luxury-accent/5 transition-all text-center uppercase tracking-widest"
                >
                  Terminate Resonance Waves
                </button>
              )}
            </div>

          </div>
        </div>

        {/* 2. ISCORCE RESEARCH DETAIL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-6 divine-aura-glow">
          <div className="flex flex-col gap-5">
            <span className="text-[10px] font-mono text-luxury-accent uppercase tracking-widest">
              Research Mission
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white heading-safe">
              Acoustic Consciousness & Healing
            </h2>
            <p className="text-sm text-luxury-secondary font-light leading-relaxed">
              Leading the scientific work of the **International Sun Consciousness Research Center (ISCORCE)**, Priyanko Sur researches Nada-Bramh sound frequencies.
            </p>
            <p className="text-sm text-luxury-secondary font-light leading-relaxed">
              Focus areas include measuring cellular responsiveness, modulating autonomic heart variability, and exploring sound-induced meditation states. These structures merge historical Vedas chanting methodology with mathematical waveform acoustics.
            </p>
          </div>

          <div className="glass p-8 rounded-3xl border-white/5 flex flex-col gap-6">
            <h3 className="text-lg font-serif font-medium text-white">
              ISCORCE Laboratory Mandate
            </h3>
            <div className="flex flex-col gap-4 text-xs font-light text-luxury-secondary">
              <div className="flex gap-3">
                <div className="w-5 h-5 rounded bg-white/5 flex items-center justify-center text-luxury-accent text-[9px] font-mono">01</div>
                <div>
                  <strong className="text-white font-serif block">Vedic Metre Analysis</strong>
                  Analyze structural audio metrics inside traditional chants to map physiological responses.
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-5 h-5 rounded bg-white/5 flex items-center justify-center text-luxury-accent text-[9px] font-mono">02</div>
                <div>
                  <strong className="text-white font-serif block">Clinical Case Studies</strong>
                  Collaborating on non-pharmacological sound interventions to alleviate anxiety and target mental coherence.
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-5 h-5 rounded bg-white/5 flex items-center justify-center text-luxury-accent text-[9px] font-mono">03</div>
                <div>
                  <strong className="text-white font-serif block">Youth Educational Outreach</strong>
                  Regular music workshops in schools, institutes, and colleges to promote chanting parameters.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. RESEARCH VIDEOS PRESENTATION */}
        <div className="flex flex-col gap-8 divine-aura-glow">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono text-luxury-accent uppercase tracking-widest">
              Audio-Visual Presentation
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-white">
              Research Video Archive
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {YOUTUBE_VIDEOS.map((video) => (
              <div key={video.id} className="glass p-4 rounded-2xl flex flex-col gap-4 border-white/5">
                <div className="w-full aspect-video rounded-lg overflow-hidden border border-white/5 relative bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-serif font-medium text-white truncate">
                    {video.title}
                  </span>
                  <span className="text-[9px] font-mono text-luxury-secondary uppercase tracking-widest mt-1 flex items-center gap-1">
                    <Video size={10} /> Case Study Presentation
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
