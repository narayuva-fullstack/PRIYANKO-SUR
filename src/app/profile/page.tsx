"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, BookOpen, Music, Users, ShieldCheck, Quote } from "lucide-react";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Accolade {
  quote: string;
  author: string;
  role: string;
  organization?: string;
  location?: string;
  tag?: string;
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

const ACCOLADES: Accolade[] = [
  {
    quote: "Your video song 'Green Anthem' is featured on the UNEP Official website http://www.unep.org as part of the UNEP World Environment Programme 2013. Its a wonderful song and video and you must have put a lot of work into it. We have posted it in Greening the Blue's Facebook Page to inspire others. All the Best.",
    author: "Division of Communications and Public Information (DCPI)",
    role: "United Nations Environment Programme (UNEP)",
    location: "Nairobi, Kenya",
    tag: "UNEP Feature"
  },
  {
    quote: "Dear Priyanko Sur, thank you for your mail and your mp3 files of Vedic Chants integrated with Contemporary Sounds. I enjoyed listening to them.",
    author: "John McLaughlin",
    role: "Guitarist, Bandleader and Composer",
    organization: "Pioneer of Jazz Fusion Music",
    tag: "Jazz Legend"
  },
  {
    quote: "You are doing great and noble work. Peace and Blessings",
    author: "Kavi Alexander",
    role: "Grammy Award Winning Record Producer for Best World Music Album",
    organization: "Founder of Water Lily Acoustics Record Label & Sound Engineer",
    tag: "Grammy Winner"
  },
  {
    quote: "Shabdoscope. Sounds good... but its certainly an original crossover of New Age and EDM. I'm sure there's an audience for this.",
    author: "Emilio D Miler",
    role: "Grammy Nominated Producer",
    tag: "Grammy Nominee"
  }
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

        {/* Appreciations Section */}
        <div className="flex flex-col gap-10 mt-6 pb-12">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono text-luxury-accent uppercase tracking-widest">
              Accolades
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-reveal heading-safe">
              Global Appreciations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ACCOLADES.map((accolade, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="glass p-6 rounded-2xl border border-white/5 flex flex-col justify-between gap-6 relative group hover:border-luxury-accent/30 transition-all duration-500 shadow-lg"
              >
                {/* Quote decoration */}
                <div className="absolute top-6 right-6 text-luxury-accent/10 group-hover:text-luxury-accent/20 transition-colors duration-500">
                  <Quote size={40} className="transform rotate-180" />
                </div>

                <div className="flex flex-col gap-4">
                  {accolade.tag && (
                    <span className="w-fit px-2.5 py-0.5 rounded-full bg-luxury-accent/10 border border-luxury-accent/20 text-[8px] font-mono uppercase tracking-widest text-luxury-accent animate-fade-in">
                      {accolade.tag}
                    </span>
                  )}
                  <p className="text-xs text-luxury-secondary leading-relaxed font-sans font-light italic relative z-10">
                    &ldquo;{accolade.quote}&rdquo;
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 flex flex-col gap-1">
                  <span className="text-sm font-heading font-medium text-white">
                    {accolade.author}
                  </span>
                  <span className="text-[9px] font-mono text-luxury-accent tracking-wider uppercase leading-snug">
                    {accolade.role}
                  </span>
                  {(accolade.organization || accolade.location) && (
                    <span className="text-[9px] font-mono text-luxury-secondary tracking-widest uppercase">
                      {accolade.organization || accolade.location}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
