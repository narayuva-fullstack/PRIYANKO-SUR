"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clapperboard, Flame, Music2, Headphones, Play, ArrowRight, Video, Quote } from "lucide-react";
import { InteractiveCard } from "@/components/InteractiveCard";
import { useAudio } from "@/context/AudioContext";

interface Capability {
  id: string;
  title: string;
  category: string;
  description: string;
  details: string;
  icon: React.ReactNode;
  tagColor: string;
}

const SCORING_CAPABILITIES: Capability[] = [
  {
    id: "cap-1",
    title: "Thematic Feature Film Scoring",
    category: "Full length films",
    description: "Composing customized character leitmotifs and full orchestral suites. Blending traditional acoustic violins and ethnic flutes with high-end synth architectures.",
    details: "Focuses on building emotional depth, character arcs, and thematic identity for visual narratives.",
    icon: <Music2 className="text-luxury-accent" size={24} />,
    tagColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  },
  {
    id: "cap-2",
    title: "Hybrid Background Scoring",
    category: "OTT Series & Shows",
    description: "Creating continuous atmospheric scores, dramatic tension builders, and action beats for visual media. Optimized for high dynamic range (HDR) broadcast layouts.",
    details: "Designed to keep viewers engaged, emphasizing micro-tensions and pacing shifts in episodic visual formats.",
    icon: <Clapperboard className="text-amber-500" size={24} />,
    tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  {
    id: "cap-3",
    title: "High-Impact Trailer Music",
    category: "Commercial promos",
    description: "High-intensity rises, massive sub-drops, epic sound design hits, and choral frequency layers tailored to command attention in 90-second promotional windows.",
    details: "Synthesizes modern trailer beats with high-resonance chanting segments for memorable audience hooks.",
    icon: <Flame className="text-pink-500" size={24} />,
    tagColor: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  },
  {
    id: "cap-4",
    title: "Psychoacoustic Sound Design",
    category: "Immersive media",
    description: "Fusing somatic frequency therapy with background textures. Integrating pure tones (such as Solfeggio 528Hz and AUM 136.1Hz) directly into visual scenes to induce subconscious reactions.",
    details: "Perfect for sci-fi, mystical dramas, and horror settings requiring intense cellular audience resonance.",
    icon: <Headphones className="text-purple-500" size={24} />,
    tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
];

const PRESS_ENDORSEMENTS = [
  {
    quote: "Priyanko Sur's crossover creations combine traditional Sanskrit layers with standard cinematic arrangements, forming original sonic paths for visual directors.",
    author: "Sakal Times",
    context: "UNEP Feature Press Review",
  },
  {
    quote: "A unique compositional ability that bridges Eastern Vedic meters with classical strings, producing a sound that feels both ancient and futuristic.",
    author: "ISCORCE Journal",
    context: "Sound Resonance & Narrative Audio Study",
  },
];

export default function Cinema() {
  const { playTrack } = useAudio();

  return (
    <div className="relative min-h-screen text-white py-16 divine-aura-glow-large">
      <div className="absolute inset-0 bg-radial-ambient pointer-events-none opacity-25" />

      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-16 relative z-10">
        
        {/* Cinematic Header Block */}
        <div className="flex flex-col gap-5 text-center items-center">
          <span className="text-[10px] font-mono text-luxury-accent uppercase tracking-widest hover-tracking">
            Visual Media & Scoring
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-reveal heading-safe">
            Music for Cinema
          </h1>
          <p className="text-sm md:text-base text-luxury-secondary max-w-2xl leading-relaxed font-light mt-1">
            Expansive soundscapes designed for Netflix, Disney, global studios, and film directors. Blending cinematic orchestrations with somatic frequency science to score stories that resonate deeply.
          </p>
        </div>

        {/* Studio Pitch / Spotlight Showcase */}
        <div className="glass rounded-3xl p-8 md:p-12 border-white/5 flex flex-col md:flex-row gap-8 items-center justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-ambient pointer-events-none opacity-30" />
          
          <div className="relative z-10 flex flex-col gap-5 max-w-xl">
            <span className="w-fit px-2.5 py-0.5 rounded-full bg-luxury-accent/10 border border-luxury-accent/20 text-[8px] font-mono uppercase tracking-widest text-luxury-accent">
              Spotlight Composition
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white heading-safe">
              Siddhivinayak Invocation Theme
            </h2>
            <p className="text-xs text-luxury-secondary leading-relaxed font-sans font-light">
              Commissioned and recorded inside the historical Siddhivinayak Temple under their official trust. Synthesizes a soaring violin chorus, rich modern ambient textures, and ancient vocal chants into a premium cinematic soundscape.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <button
                onClick={() => playTrack(5)} // Plays Siddhivinayak track
                className="px-6 py-2.5 rounded-full bg-white text-luxury-bg hover:bg-neutral-200 transition-colors text-xs font-mono uppercase tracking-widest font-semibold flex items-center gap-2"
              >
                <Play size={12} fill="currentColor" /> Sample Theme Cue
              </button>
              <Link
                href="/discography"
                className="px-6 py-2.5 rounded-full border border-white/10 hover:border-white/20 text-[10px] font-mono uppercase tracking-widest text-luxury-secondary hover:text-white transition-all flex items-center gap-1.5"
              >
                Full Releases
              </Link>
            </div>
          </div>

          <div className="relative z-10 w-full max-w-[320px] aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group flex-shrink-0 bg-black">
            <img 
              src="/images/shows/2.jpg" 
              alt="Live Television Telecast Close" 
              className="w-full h-full object-cover cinematic-img"
            />
            <div className="vignette-overlay-soft" />
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/5 text-[8px] font-mono text-luxury-secondary uppercase tracking-widest">
              <Video size={10} className="text-luxury-accent" /> Broadcasting Format
            </div>
          </div>
        </div>

        {/* Scoring Capabilities Grid */}
        <div className="flex flex-col gap-8 divine-aura-glow">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono text-luxury-accent uppercase tracking-widest">
              Capabilities
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-reveal heading-safe">
              Scoring Services & Formats
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SCORING_CAPABILITIES.map((cap) => (
              <InteractiveCard
                key={cap.id}
                cardType="default"
                className="p-8 border-white/5 flex flex-col justify-between gap-6"
              >
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-start gap-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      {cap.icon}
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-mono uppercase tracking-wider ${cap.tagColor}`}>
                      {cap.category}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg md:text-xl font-serif font-semibold text-white">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-luxury-secondary leading-relaxed font-light mt-1">
                      {cap.description}
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 text-[10px] text-luxury-muted font-sans font-light italic leading-relaxed">
                  {cap.details}
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>

        {/* Production Executive Testimony Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4 divine-aura-glow">
          {PRESS_ENDORSEMENTS.map((item, index) => (
            <div 
              key={index}
              className="glass p-8 rounded-3xl border border-white/5 flex flex-col justify-between gap-6 relative group hover:border-luxury-accent/30 transition-all duration-500 shadow-lg"
            >
              <div className="absolute top-6 right-8 text-luxury-accent/5">
                <Quote size={48} className="transform rotate-180" />
              </div>
              <p className="text-xs text-luxury-secondary leading-relaxed font-sans font-light italic relative z-10">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="border-t border-white/5 pt-4 flex flex-col gap-0.5">
                <span className="text-sm font-heading font-medium text-white">
                  {item.author}
                </span>
                <span className="text-[9px] font-mono text-luxury-accent tracking-wider uppercase">
                  {item.context}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Global Pitch / Why Partner Footer CTA */}
        <div className="glass rounded-3xl p-8 md:p-12 text-center flex flex-col items-center gap-6 border-white/5 mt-4 relative overflow-hidden divine-aura-glow">
          <div className="absolute inset-0 bg-radial-ambient pointer-events-none opacity-30" />
          
          <div className="relative z-10 flex flex-col items-center gap-3">
            <span className="text-[10px] font-mono text-luxury-accent uppercase tracking-widest">
              Industry Partnerships
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white heading-safe">
              Ready to elevate your visual storytelling?
            </h2>
            <p className="text-xs text-luxury-secondary max-w-lg leading-relaxed font-light mt-1">
              Connect to discuss customized scores for visual features, pilot scoring, sound design frameworks, or direct synchronization agreements.
            </p>
            <div className="mt-4">
              <Link
                href="/contact"
                className="px-8 py-3 rounded-full bg-white text-luxury-bg hover:bg-neutral-200 transition-all font-mono text-xs tracking-wider uppercase flex items-center gap-2"
              >
                Connect With Us <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
