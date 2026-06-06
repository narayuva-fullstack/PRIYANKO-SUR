"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Video, Clapperboard, Radio, Calendar, ArrowRight } from "lucide-react";
import { InteractiveCard } from "@/components/InteractiveCard";

interface Project {
  id: string;
  title: string;
  category: string;
  status: string;
  description: string;
  details: string;
  icon: React.ReactNode;
  tagColor: string;
}

const UPCOMING_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Non-Fiction Book & Fictional Screenplays",
    category: "Literature",
    status: "Writing in Progress",
    description: "A comprehensive publication researching the scientific parameters of Nada-Bramh sound healing frequencies, alongside cinematic fictional storytelling scripts.",
    details: "Focusing on the medical effects of Vedic chanting meters and bio-resonance on brainwave synchronization.",
    icon: <BookOpen className="text-pink-500" size={24} />,
    tagColor: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  },
  {
    id: "proj-2",
    title: "International Music Video Productions",
    category: "Audio-Visual",
    status: "Pre-Production",
    description: "Global scale audio-visual releases produced under the Surya Krishna Production (SKP) banner, blending traditional Vedic chants with cinematic sets.",
    details: "Collaborating with international directors to visualize ancient spiritual soundscapes for modern media.",
    icon: <Video className="text-amber-500" size={24} />,
    tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  {
    id: "proj-3",
    title: "Cinematic Film Productions by SKP",
    category: "Cinematography",
    status: "Scripting Phase",
    description: "Development of full-length films, documentaries, and creative audio-visual narratives focused on cultural restoration and spiritual musical sagas.",
    details: "Building on SKP's legacy of producing Bengali feature titles, documentaries, and premium video contents.",
    icon: <Clapperboard className="text-blue-500" size={24} />,
    tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    id: "proj-4",
    title: "Sound Healing Workshops & Seminars",
    category: "Therapeutics",
    status: "Ongoing Schedule",
    description: "Global educational seminars and experiential sound workshops led by the International Sun Consciousness Research Center (ISCORCE).",
    details: "Teaching the physics of sacred frequencies (OM, 432Hz, 528Hz) and chanting methods to colleges, schools, and health centers.",
    icon: <Radio className="text-emerald-500" size={24} />,
    tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    id: "proj-5",
    title: "Live Concerts & Sacred Sound Tours",
    category: "Live Stages",
    status: "Booking Phase",
    description: "New Age classical fusion concerts combining live violins, acoustic instruments, Sanskrit chanting, and electronic ambient synthesizers.",
    details: "Mapping seasonal performance venues across key cities to present live soundscapes of Sun & Sound.",
    icon: <Calendar className="text-purple-500" size={24} />,
    tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
];

export default function Upcoming() {
  return (
    <div className="relative min-h-screen text-white py-16 divine-aura-glow-large">
      <div className="absolute inset-0 bg-radial-ambient pointer-events-none opacity-20" />

      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-16 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col gap-4 text-center items-center">
          <span className="text-[10px] font-mono text-luxury-accent uppercase tracking-widest">
            Future Manifestations
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-reveal heading-safe">
            Upcoming Projects
          </h1>
          <p className="text-sm text-luxury-secondary max-w-2xl leading-relaxed font-light mt-1">
            An overview of creative endeavors currently in development—spanning literature, international cinematic film releases, sound therapy seminars, and live tours.
          </p>
        </div>

        {/* Projects Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 divine-aura-glow">
          {UPCOMING_PROJECTS.map((project, index) => {
            const isLarge = index === 0; // Make the first project span full width on desktop for asymmetrical balance
            return (
              <InteractiveCard
                key={project.id}
                cardType="default"
                className={`p-8 border-white/5 flex flex-col justify-between gap-6 ${
                  isLarge ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-start gap-4">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      {project.icon}
                    </div>
                    <div className="flex flex-col items-end gap-1.5 text-[9px] font-mono uppercase tracking-wider">
                      <span className={`px-2.5 py-0.5 rounded-full border ${project.tagColor}`}>
                        {project.category}
                      </span>
                      <span className="text-luxury-secondary mt-0.5">
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl md:text-2xl font-serif font-semibold text-white">
                      {project.title}
                    </h3>
                    <p className="text-sm text-luxury-secondary leading-relaxed font-light mt-1.5">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 text-xs text-luxury-muted font-sans font-light italic leading-relaxed">
                  {project.details}
                </div>
              </InteractiveCard>
            );
          })}
        </div>

        {/* Dynamic CTA Footer Section */}
        <div className="glass rounded-3xl p-8 md:p-12 text-center flex flex-col items-center gap-6 border-white/5 mt-8 relative overflow-hidden divine-aura-glow">
          <div className="absolute inset-0 bg-radial-ambient pointer-events-none opacity-30" />
          <div className="relative z-10 flex flex-col items-center gap-3">
            <span className="text-[10px] font-mono text-luxury-accent uppercase tracking-widest">
              Collaborations
            </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white heading-safe">
              Have a proposal or want to co-create?
            </h2>
            <p className="text-xs text-luxury-secondary max-w-lg leading-relaxed font-light mt-1">
              Surya Krishna Production and ISCORCE are always open to aligning with global filmmakers, authors, medical researchers, and concert promoters.
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
