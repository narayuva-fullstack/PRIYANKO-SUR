"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/context/AudioContext";
import { Play, Pause, ArrowRight, Activity, Award, ShieldCheck, Calendar, BookOpen } from "lucide-react";
import { InteractiveCard } from "@/components/InteractiveCard";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const { tracks, currentTrackIndex, isPlaying, playTrack, pauseTrack } = useAudio();

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

  // Handle Splash Screen Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-luxury-bg text-white overflow-hidden">
      {/* 1. CINEMATIC INTRO SPLASH */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-4 text-center px-6"
            >
              <div className="flex gap-1.5 h-10 items-end justify-center">
                <motion.div className="w-1 bg-luxury-accent rounded-full" animate={{ height: [10, 40, 10] }} transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }} />
                <motion.div className="w-1 bg-luxury-accent rounded-full" animate={{ height: [18, 52, 18] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2, ease: "easeInOut" }} />
                <motion.div className="w-1 bg-luxury-accent rounded-full" animate={{ height: [8, 28, 8] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4, ease: "easeInOut" }} />
              </div>
              <h1 className="text-2xl font-display font-bold tracking-[0.25em] uppercase text-white mt-4">
                Priyanko Sur
              </h1>
              <p className="text-[9px] font-mono tracking-[0.4em] text-luxury-secondary uppercase">
                Acoustic Sadhana
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. PREMIUM HERO COMPOSITION (TYPOGRAPHY INTEGRATION) */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-32 pb-20 text-center">
        {/* Background vignetted portrait (Breathing system) */}
        <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
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
            Sadhana of Nada-Bramh
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 19 }}
            animate={showSplash ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-hero font-display font-bold text-reveal tracking-tighter heading-safe"
          >
            Preserving Frequencies.<br />
            Reimagining Sound.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={showSplash ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-sm md:text-base text-luxury-secondary max-w-2xl leading-relaxed font-sans font-light"
          >
            Bridging the medical application of ancient Sanskrit sound vibrations with contemporary electronic orchestration and acoustic science.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showSplash ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-6"
          >
            <button
              onClick={() => playTrack(0)}
              className="px-8 py-3 rounded-full bg-white text-luxury-bg hover:bg-neutral-200 transition-all font-heading font-medium text-xs tracking-wider uppercase flex items-center gap-2"
            >
              <Play size={14} fill="currentColor" /> Listen Opening Chant
            </button>
            <Link
              href="/research"
              className="px-8 py-3 rounded-full border border-white/10 hover:border-white/20 transition-all font-heading text-xs tracking-wider uppercase flex items-center gap-2 group text-luxury-secondary hover:text-white"
            >
              Explore R & D Lab <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 3. ARTIST PHILOSOPHY QUOTE (EDITORIAL NEW AGE STYLE) */}
      <section className="py-24 border-t border-white/5 relative bg-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex flex-col gap-6 items-center">
            <span className="text-[10px] font-mono text-luxury-muted tracking-[0.2em] uppercase">
              Artistic Philosophy
            </span>
            <p className="text-editorial-fluid text-luxury-secondary max-w-3xl leading-relaxed font-light">
              Nada-Bramh is the primordial vibration of existence. By translating this light and sound into mathematical frequencies, we do not just compose music; we restore coherence to human cellular life.
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
                  className="w-full h-full object-cover object-center md:object-[28%_50%] lg:object-[34%_50%] cinematic-img"
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
                20 Years of Chanting Research
              </span>
              <h3 className="text-3xl font-serif font-semibold text-white heading-safe">
                Vedic Chants and Contemporary Soundscapes
              </h3>
              <p className="text-sm text-luxury-secondary leading-relaxed font-sans font-light">
                Under the guidance of his GuruViswanarayan, Priyanko Sur has mapped the mathematical variables of Vedic meters. By blending traditional vocal intonations with pop, EDM, and world ambient synthesis, he creates sonic textures designed to heal the listener.
              </p>

              {/* Overlaying floating frame (overlapping layout depth) */}
              <div className="relative mt-4">
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
      <section className="py-24 border-t border-white/5 relative bg-luxury-surface/5">
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
              <InteractiveCard key={card.id} cardType="achievement" className="flex flex-col justify-between h-[380px]">
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

      {/* 7. INTERACTIVE RESEARCH TEASER */}
      <section className="py-24 border-t border-white/5 relative bg-luxury-surface/10">
        <div className="max-w-5xl mx-auto px-6">
          <InteractiveCard cardType="default" className="p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center justify-between border-white/5">
            <div className="absolute inset-0 bg-radial-ambient pointer-events-none opacity-30" />

            <div className="relative z-10 flex flex-col gap-4 max-w-lg">
              <span className="text-[9px] font-mono text-luxury-accent uppercase tracking-widest hover-tracking">
                Scientific Applications
              </span>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white heading-safe">
                Synthesized Frequency Research
              </h3>
              <p className="text-xs text-luxury-secondary leading-relaxed font-sans font-light">
                Discover the Nada-Bramh Lab. Interact with pure harmonic frequencies mapped to cellular research, and explore the ancient science of bio-resonance in real-time.
              </p>
              <div className="mt-2">
                <Link
                  href="/research"
                  className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-luxury-accent hover:text-white transition-colors group"
                >
                  Enter Visualizer Lab <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="relative z-10 w-full max-w-[280px] aspect-square rounded-2xl bg-luxury-bg/50 border border-white/5 flex items-center justify-center p-6">
              <div className="flex flex-col gap-1 items-center w-full">
                <div className="flex gap-1 items-end h-16 justify-center w-full">
                  <div className="w-1 bg-luxury-accent/30 rounded-full h-8 animate-pulse" />
                  <div className="w-1 bg-luxury-accent/50 rounded-full h-12 animate-pulse delay-75" />
                  <div className="w-1 bg-luxury-accent rounded-full h-16 animate-pulse" />
                  <div className="w-1 bg-luxury-accent/50 rounded-full h-10 animate-pulse delay-100" />
                  <div className="w-1 bg-luxury-accent/30 rounded-full h-6 animate-pulse" />
                </div>
                <span className="text-[9px] font-mono text-luxury-secondary uppercase mt-4 tracking-widest">
                  Active Resonance Matrix
                </span>
              </div>
            </div>
          </InteractiveCard>
        </div>
      </section>
    </div>
  );
}
