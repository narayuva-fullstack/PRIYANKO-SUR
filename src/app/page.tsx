"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/context/AudioContext";
import { Play, Pause, ArrowRight, Activity, Award, ShieldCheck, Calendar, BookOpen } from "lucide-react";
import { InteractiveCard } from "@/components/InteractiveCard";
import { usePortalTransition } from "@/context/PortalTransitionContext";

export default function Home() {
  const [showSplash, setShowSplash] = useState(false);
  const [isLabHovered, setIsLabHovered] = useState(false);
  const { state: transitionState, triggerTransition } = usePortalTransition();
  const { tracks, currentTrackIndex, isPlaying, playTrack, pauseTrack } = useAudio();

  const handleLabClick = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      const x = e.clientX;
      const y = e.clientY;
      triggerTransition("/research", { x, y });
    } else {
      triggerTransition("/research", { x: typeof window !== "undefined" ? window.innerWidth / 2 : 0, y: typeof window !== "undefined" ? window.innerHeight / 2 : 0 });
    }
  };

  const biographyCards = [
    {
      id: "m1",
      image: "/images/media/1.jpg",
      alt: "Sakal Times newspaper clipping featuring Priyanko Sur and the Chant His Name headline",
      year: "2013 • UNEP Feature",
      title: "UN Environment Programme",
      description: "His composition Green Anthem was selected by the United Nations Environment Program and showcased on their website for World Environment Day.",
      frameClassName: "bg-[#f6efe3]/95",
      imageClassName: "object-contain object-[center_8%] scale-[1.1]",
    },
    {
      id: "m2",
      image: "/images/media/2.jpg",
      alt: "Navbharat newspaper clipping showing Priyanko Sur at the event",
      year: "2020 • Temple Trust CD",
      title: "Siddhivinayak Invocation",
      description: "The invocation Siddhivinayak Stuti was shot inside the historical Siddhivinayak Temple in Mumbai and released officially under their trust.",
      frameClassName: "bg-[#f5efe4]/95",
      imageClassName: "object-contain object-[center_10%] scale-[1.08]",
    },
    {
      id: "s4",
      image: "/images/shows/4.jpg",
      alt: "Doordarshan event poster for Makar Sankranti Musical 2019",
      year: "Present • ISCORCE Workshops",
      title: "Nada-Bramh Frequency Lab",
      description: "Spearheading Sun Consciousness seminars and medical frequency R&D workshops globally, educating the youth on somatic sound therapy.",
      frameClassName: "bg-black/10",
      imageClassName: "object-contain object-center scale-[1.03]",
    },
  ] as const;

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* 1. PREMIUM HERO COMPOSITION (TYPOGRAPHY INTEGRATION) */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-32 pb-20 text-center divine-aura-glow-large">
        {/* Background vignetted portrait (Breathing system) */}
        <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center hero-block-bg">
          <motion.div
            initial={{ scale: 1.15, filter: "blur(20px)", opacity: 0 }}
            animate={showSplash ? {} : { scale: 1.05, filter: "blur(0px)", opacity: 0.25 }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl h-full relative"
          >
            <img
              src="/images/about.jpg"
              alt="Priyanko Sur Hero Portrait"
              className="w-full h-full object-cover cinematic-img select-none"
            />
            {/* Vignette overlays to merge image naturally with layout bounds */}
            <div className="vignette-overlay" />
          </motion.div>
        </div>

        {/* Ambient background light projection */}
        <div className="absolute inset-0 bg-radial-ambient pointer-events-none opacity-30 z-0" />

        <div className="relative z-10 max-w-5xl flex flex-col items-center gap-6">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={showSplash ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-[10px] font-mono tracking-[0.3em] uppercase text-luxury-accent hover-tracking"
          >
            Music Director & Composer
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 19 }}
            animate={showSplash ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-hero font-display font-bold text-reveal tracking-tighter heading-safe"
          >
            Cinematic Soundscapes.<br />
            Orchestral Stories.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={showSplash ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-sm md:text-base text-luxury-secondary max-w-2xl leading-relaxed font-sans font-light"
          >
            Composing expansive themes, evocative background scores, and premium trailer layers for television, OTT, and visual media, synthesizing rich orchestral colors with contemporary synthesis and ancient acoustic science.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showSplash ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-6"
          >
            <Link
              href="/cinema"
              className="px-8 py-3 rounded-full bg-white text-luxury-bg hover:bg-neutral-200 transition-all font-heading font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2"
            >
              Explore Scoring Portfolio
            </Link>
            <button
              onClick={() => playTrack(0)}
              className="px-8 py-3 rounded-full border border-white/10 hover:border-white/20 transition-all font-heading text-xs tracking-wider uppercase flex items-center justify-center gap-2 group text-luxury-secondary hover:text-white"
            >
              <Play size={12} fill="currentColor" /> Sample Theme Chant
            </button>
          </motion.div>
        </div>
      </section>

      {/* 3. ARTIST PHILOSOPHY QUOTE (EDITORIAL NEW AGE STYLE) */}
      <section className="py-24 border-t border-white/5 relative divine-aura-glow">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex flex-col gap-6 items-center">
            <span className="text-[10px] font-mono text-luxury-accent tracking-[0.2em] uppercase">
              Creative Philosophy
            </span>
            <p className="text-editorial-fluid text-luxury-secondary max-w-3xl leading-relaxed font-light">
              Music is the bridge between the unseen and the felt. By combining modern cinematic orchestrations with the mathematical resonance of ancient sound frequencies, we create visual narratives that do not just underscore a scene—they align the listener's consciousness.
            </p>
            <div className="h-px w-12 bg-luxury-accent/30 mt-2" />
          </div>
        </div>
      </section>

      {/* 4. ASYMMETRICAL LEGACY GALLERY (ZONES 2 & 3: PARALLAX & FLOATING MEMORY FRAMES) */}
      <section className="py-24 border-t border-white/5 relative bg-luxury-surface/10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-20">

          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-mono text-luxury-accent uppercase tracking-widest hover-tracking">
              Visual Narrative
            </span>
            <h2 className="text-h1-fluid font-heading font-bold heading-safe">
              Legacy Introduction
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

            {/* Overlapping Left Image Frame (Parallax reveal) */}
            <div className="md:col-span-6 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2 }}
                className="w-full aspect-[4/5] md:aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 relative shadow-2xl group"
              >
                <img
                  src="/images/shows/1.jpg"
                  alt="Pune Festival Concert Stage"
                  className="legacy-stage-image w-full h-full object-contain object-center md:object-cover md:object-[28%_50%] lg:object-[34%_50%] cinematic-img"
                />
                <div className="vignette-overlay-soft" />
                <div className="absolute bottom-6 left-6 z-20">
                  <span className="text-[9px] font-mono text-luxury-secondary uppercase tracking-widest bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/5">
                    Live stage, Pune
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Asymmetrical Right content block (Luxury Spacing) */}
            <div className="md:col-span-6 flex flex-col gap-6 pl-0 md:pl-8">
              <span className="text-xs font-mono text-luxury-accent">
                Orchestral & Electronic Fusion
              </span>
              <h3 className="text-3xl font-serif font-semibold text-white heading-safe">
                Original Soundtracks & Scoring
              </h3>
              <p className="text-sm text-luxury-secondary leading-relaxed font-sans font-light lg:max-w-[70%]">
                Drawing from two decades of classical Hindustani and Carnatic study, Priyanko Sur designs expansive acoustic structures for visual media, film titles, and live stages. Blending orchestral strings, electronic ambient synthesis, and sacred frequencies, his compositions form rich, emotional soundscapes that draw viewers deep into the story.
              </p>

              {/* Overlaying floating frame (overlapping layout depth) */}
              <div className="relative mt-6">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="absolute -top-12 right-0 md:-right-20 w-44 aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl hidden lg:block"
                >
                  <img
                    src="/images/shows/2.jpg"
                    alt="Television Live Telecast close"
                    className="w-full h-full object-cover cinematic-img"
                  />
                  <div className="vignette-overlay-soft" />
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. TIMELINE STORYTELLING (ZONE 4: MILestones connected with visual assets) */}
      <section className="py-24 border-t border-white/5 relative bg-luxury-surface/5 divine-aura-glow">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-12">

          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-mono text-luxury-accent uppercase tracking-widest hover-tracking">
              Timeline Milestones
            </span>
            <h2 className="text-h1-fluid font-heading font-bold heading-safe">
              Visual Biography
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {biographyCards.map((card) => (
              <InteractiveCard key={card.id} cardType="achievement" className="flex flex-col justify-between h-full">
                <div className="flex flex-col gap-4">
                  <div className={`w-full h-[230px] rounded-lg overflow-hidden relative border border-white/5 ${card.frameClassName} flex items-center justify-center px-2 py-2`}>
                    <img
                      src={card.image}
                      alt={card.alt}
                      className={`w-full h-full cinematic-img ${card.imageClassName}`}
                    />
                    <div className="vignette-overlay-soft" />
                  </div>
                  <div className="flex flex-col gap-1 min-h-[74px]">
                    <span className="text-[9px] font-mono text-luxury-accent uppercase tracking-widest flex items-center gap-1">
                      <Calendar size={10} /> {card.year}
                    </span>
                    <h3 className="text-base font-heading font-medium text-white mt-1">
                      {card.title}
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-luxury-secondary font-sans font-light leading-relaxed">
                  {card.description}
                </p>
              </InteractiveCard>
            ))}
          </div>

        </div>
      </section>

      {/* 6. IMMERSIVE ALBUMS PREVIEW */}
      <section className="py-24 border-t border-white/5 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-mono text-luxury-accent uppercase tracking-widest hover-tracking">
                Selected Works
              </span>
              <h2 className="text-h1-fluid font-heading font-bold heading-safe">
                Listen to the Archive
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {tracks.slice(0, 4).map((track, idx) => {
                const isCurrent = currentTrackIndex === idx;
                const isCurrentPlaying = isCurrent && isPlaying;
                return (
                  <div
                    key={track.id}
                    className={`glass p-4 sm:p-6 rounded-2xl flex items-center justify-between gap-4 transition-all duration-300 ${isCurrent ? "border-luxury-accent/30 bg-luxury-accent/[0.02]" : "hover:border-white/10"
                      }`}
                  >
                    <div className="flex items-center gap-4 truncate">
                      <button
                        onClick={() => (isCurrentPlaying ? pauseTrack() : playTrack(idx))}
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform ${isCurrent ? "bg-luxury-accent text-white" : "bg-white/5 text-white hover:scale-105"
                          }`}
                      >
                        {isCurrentPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="translate-x-[1px]" />}
                      </button>
                      <div className="flex flex-col truncate">
                        <span className="text-sm font-heading font-medium text-white truncate">
                          {track.title}
                        </span>
                        <span className="text-[9px] font-mono text-luxury-secondary mt-1 uppercase tracking-wider">
                          {track.genre}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="hidden sm:inline text-xs text-luxury-secondary font-sans font-light max-w-[240px] truncate">
                        {track.description}
                      </span>
                      <span className="text-[10px] font-mono text-luxury-secondary">
                        {track.duration}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center mt-4">
              <Link
                href="/discography"
                className="px-8 py-3 rounded-full border border-white/10 hover:border-white/20 text-[10px] font-mono uppercase tracking-widest text-luxury-secondary hover:text-white transition-all flex items-center gap-2 group"
              >
                View Full Discography <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-white/5 relative bg-luxury-surface/10 divine-aura-glow">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            animate={
              transitionState !== "idle"
                ? transitionState === "initiating"
                  ? { scale: 0.91, y: 4, filter: "brightness(1.5)" }
                  : { scale: 1.08, y: -6, filter: "brightness(2)" }
                : isLabHovered
                ? {
                    x: [0, -1.5, 1.5, -1, 1, 0],
                    y: [0, 4, -10, -3, -7, -6],
                    rotate: 0,
                    scale: [1, 0.93, 1.10, 1.04, 1.07, 1.06],
                    boxShadow: [
                      "0px 15px 30px rgba(0,0,0,0.4)",
                      "0px 5px 15px rgba(212,175,55,0.15)",
                      "0px 35px 70px rgba(212,175,55,0.65)",
                      "0px 20px 40px rgba(212,175,55,0.35)",
                      "0px 28px 56px rgba(212,175,55,0.45)",
                      "0px 28px 56px rgba(212,175,55,0.45)"
                    ]
                  }
                : { x: 0, y: 0, rotate: 0, scale: 1, filter: "brightness(1)", boxShadow: "0px 15px 30px rgba(0,0,0,0.4)" }
            }
            transition={{
              duration: transitionState !== "idle" ? 0.35 : isLabHovered ? 0.48 : 0.25,
              ease: "easeOut"
            }}
            className="w-full"
          >
            <InteractiveCard 
              cardType="default" 
              onClick={handleLabClick}
              className="p-8 md:p-12 relative overflow-hidden flex flex-col border-white/5"
            >
              <div className="absolute inset-0 bg-radial-ambient pointer-events-none opacity-30" />

              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between w-full">
                <div className="flex flex-col gap-4 max-w-lg">
                  <span className="text-[9px] font-mono text-luxury-accent uppercase tracking-widest hover-tracking">
                    Cinema & Visual Media
                  </span>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-reveal heading-safe">
                    Scoring Original Visual Narratives
                  </h3>
                  <p className="text-xs text-luxury-secondary leading-relaxed font-sans font-light">
                    From large-scale orchestral arrangements to intimate narrative sound design. Explore scoring portfolios tailored for Netflix, Disney, and global media producers.
                  </p>
                  <div className="mt-2">
                    <Link
                      href="/cinema"
                      className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-luxury-accent hover:text-white transition-colors group"
                    >
                      Explore Cinema Works <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                <div className="w-full max-w-[280px] aspect-square rounded-2xl bg-luxury-bg/50 border border-white/5 flex items-center justify-center p-6">
                  <div className="flex flex-col gap-1 items-center w-full">
                    <div className="flex gap-1 items-end h-16 justify-center w-full">
                      <div className="w-1 bg-luxury-accent/30 rounded-full h-10 animate-pulse" />
                      <div className="w-1 bg-luxury-accent/50 rounded-full h-6 animate-pulse delay-75" />
                      <div className="w-1 bg-luxury-accent rounded-full h-14 animate-pulse" />
                      <div className="w-1 bg-luxury-accent/50 rounded-full h-8 animate-pulse delay-100" />
                      <div className="w-1 bg-luxury-accent/30 rounded-full h-12 animate-pulse" />
                    </div>
                    <span className="text-[9px] font-mono text-luxury-secondary uppercase mt-4 tracking-widest">
                      Audio Sync Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Secondary Gateway to R&D Lab */}
              <div className="relative z-10 border-t border-white/5 pt-6 mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-luxury-muted uppercase tracking-wider">Scientific R&D Sub-Universe</span>
                  <p className="text-[11px] text-luxury-secondary font-light max-w-md">
                    Discover the mathematical parameters of Vedic sound vibration and pure frequencies in the separate R&D portal.
                  </p>
                </div>
                <Link 
                  href="/research" 
                  onClick={handleLabClick}
                  onMouseEnter={() => setIsLabHovered(true)}
                  onMouseLeave={() => setIsLabHovered(false)}
                  className="text-[10px] font-mono text-luxury-accent hover:text-white transition-colors flex items-center gap-1 uppercase tracking-widest font-semibold"
                >
                  Enter Nada-Bramh Lab &rarr;
                </Link>
              </div>
            </InteractiveCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
