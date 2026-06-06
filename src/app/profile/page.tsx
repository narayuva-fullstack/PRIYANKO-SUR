"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, BookOpen, Music, Users, ShieldCheck } from "lucide-react";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: "Childhood (Age 6)",
    title: "Initial Musical Awakening",
    description: "Began performances as a Soprano Soloist in Calcutta Boys School Choir. Initiated Classical Violin lessons to develop ear efficacy and structural theory.",
    icon: <Music size={16} />,
  },
  {
    year: "Teenage Era",
    title: "Classical Training Roots",
    description: "Studied Hindustani and Carnatic Classical Music. Received guidance under Carnatic exponent Smt. Laxmi Narayan Swami in Kolkata.",
    icon: <Compass size={16} />,
  },
  {
    year: "Guru Sadhana",
    title: "Nada-Bramh Initiation",
    description: "Met Guru Viswanarayan. Began 20+ years of intense training in Nada-Bramh, Vedic Sanskrit Chanting, and Surya Consciousness.",
    icon: <BookOpen size={16} />,
  },
  {
    year: "2013",
    title: "United Nations UNEP Feature",
    description: "Composed and sang Green Anthem, which was officially featured on the United Nations Environment Programme website for World Environment Day.",
    icon: <Users size={16} />,
  },
  {
    year: "2020",
    title: "Siddhivinayak Temple Integration",
    description: "Shot and released the official Siddhivinayak Stuti directly inside the Siddhivinayak Temple in Mumbai under their trust banner.",
    icon: <ShieldCheck size={16} />,
  },
];

export default function Profile() {
  return (
    <div className="relative min-h-screen bg-luxury-bg text-white py-16">
      <div className="max-w-4xl mx-auto px-6 flex flex-col gap-16">
        
        {/* Editorial Header */}
        <div className="flex flex-col gap-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-mono text-luxury-accent uppercase tracking-widest"
          >
            Biography & Philosophy
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold heading-safe"
          >
            The Journey of a Sonic Architect
          </motion.h1>
        </div>

        {/* Narrative Biography Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 flex flex-col gap-6 text-sm text-luxury-secondary leading-relaxed font-light">
            <p>
              Priyanko Sur is an avant-garde Indian singer, music producer, and researcher on Nada-Bramh, Vedic Sanskrit Chanting, and Folk Music. His works merge classical vocal styling with electronic and ambient sound arrangements.
            </p>
            <p>
              As a performing artist and composer, Priyanko conducts dedicated research on the medical applications of AUM and Surya Mantras, investigating how acoustic frequencies influence cognitive processing and physical well-being.
            </p>
            <p>
              Under the tutelage of his Guru, Surya & Sangeet Sadhak Shree Viswanarayan, Priyanko has spent two decades refining the nuances of Vedic chanting and contemporary New Age music composition, seeking to preserve India&apos;s ancient sonic heritage for future generations.
            </p>
          </div>
          
          {/* Quick info panel */}
          <div className="glass p-6 rounded-2xl flex flex-col gap-4 h-fit border-white/5">
            <h3 className="text-xs font-mono text-white tracking-widest uppercase">
              Core Profiles
            </h3>
            <div className="flex flex-col gap-3 text-xs text-luxury-secondary font-light">
              <div>
                <span className="text-white font-serif block">Genres</span>
                <span>World, New Age, Vedic, Electronic</span>
              </div>
              <div>
                <span className="text-white font-serif block">Alma Mater</span>
                <span>Calcutta Boys School Choir</span>
              </div>
              <div>
                <span className="text-white font-serif block">Tutelage</span>
                <span>Guru Viswanarayan Ji</span>
              </div>
              <div>
                <span className="text-white font-serif block">Organizations</span>
                <span>ISCORCE, SKP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Career Timeline */}
        <div className="flex flex-col gap-10 mt-6">
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-reveal heading-safe">
            Career Timeline
          </h2>

          <div className="relative border-l border-white/5 ml-4 flex flex-col gap-12 py-2">
            {TIMELINE_EVENTS.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-8"
              >
                {/* Timeline node dot indicator */}
                <div className="absolute -left-3.5 top-1.5 w-7 h-7 rounded-full bg-luxury-bg border border-white/10 flex items-center justify-center text-luxury-accent shadow-lg">
                  {event.icon}
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-luxury-accent uppercase tracking-widest">
                    {event.year}
                  </span>
                  <h3 className="text-lg font-serif font-medium text-white">
                    {event.title}
                  </h3>
                  <p className="text-xs text-luxury-secondary max-w-2xl font-light leading-relaxed mt-1">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
