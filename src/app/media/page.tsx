"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image, Video, FileText, X, Play, ExternalLink } from "lucide-react";
import { MEDIA_DATABASE } from "@/data/mediaDb";
import { InteractiveCard } from "@/components/InteractiveCard";

export default function MediaGallery() {
  const [activeTab, setActiveTab] = useState<"photos" | "videos" | "press">("photos");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string | null>(null);

  // Filter media from database
  const photoList = MEDIA_DATABASE.photos.filter((p) => p.category === "gallery" || p.category === "shows");
  const videoList = MEDIA_DATABASE.videos;
  const pressList = MEDIA_DATABASE.photos.filter((p) => p.category === "press");

  return (
    <div className="relative min-h-screen text-white py-16">
      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-12">
        
        {/* Header */}
        <div className="flex flex-col gap-4 text-center items-center">
          <span className="text-[10px] font-mono text-luxury-accent uppercase tracking-widest">
            Visual Archive & Press
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-reveal heading-safe">
            Media Gallery
          </h1>
          <p className="text-sm text-luxury-secondary max-w-2xl leading-relaxed font-light mt-1">
            Explore live shows, performance recordings, studio snapshots, and published media clippings.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center border-b border-white/5 pb-4 gap-2">
          <button
            onClick={() => setActiveTab("photos")}
            className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all flex items-center gap-2 ${
              activeTab === "photos" ? "bg-white text-luxury-bg font-semibold" : "text-luxury-secondary hover:text-white"
            }`}
          >
            <Image size={12} /> Photos ({photoList.length})
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all flex items-center gap-2 ${
              activeTab === "videos" ? "bg-white text-luxury-bg font-semibold" : "text-luxury-secondary hover:text-white"
            }`}
          >
            <Video size={12} /> Videos ({videoList.length})
          </button>
          <button
            onClick={() => setActiveTab("press")}
            className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all flex items-center gap-2 ${
              activeTab === "press" ? "bg-white text-luxury-bg font-semibold" : "text-luxury-secondary hover:text-white"
            }`}
          >
            <FileText size={12} /> Press ({pressList.length})
          </button>
        </div>

        {/* Dynamic Content Views */}
        <AnimatePresence mode="wait">
          {activeTab === "photos" && (
            <motion.div
              key="photos"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            >
              {photoList.map((photo) => (
                <InteractiveCard
                  key={photo.id}
                  cardType="gallery"
                  onClick={() => {
                    setLightboxImage(photo.src);
                    setLightboxTitle(photo.title);
                  }}
                  className="overflow-hidden aspect-square cursor-pointer p-0 rounded-[22px] border border-white/10 bg-white/[0.03] shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const p = e.currentTarget.parentElement;
                      if (p) {
                        p.innerHTML = `<div class="w-full h-full flex flex-col items-center justify-center bg-luxury-surface/80 p-4 text-center"><span class="text-xs font-serif text-white/80">${photo.title}</span><span class="text-[9px] font-mono text-luxury-muted uppercase tracking-widest mt-2">${photo.category}</span></div>`;
                      }
                    }}
                    className="w-full h-full object-cover rounded-[20px] transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center z-30">
                    <span className="text-[10px] font-mono uppercase tracking-widest bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                      Expand View
                    </span>
                  </div>
                </InteractiveCard>
              ))}
            </motion.div>
          )}

          {activeTab === "videos" && (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {videoList.map((video) => (
                <InteractiveCard key={video.id} cardType="default" className="p-4 border-white/5 flex flex-col gap-4">
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full aspect-video rounded-[22px] overflow-hidden border border-white/10 bg-neutral-900 shadow-[0_12px_30px_rgba(0,0,0,0.35)] relative z-20 group/video cursor-pointer block"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover rounded-[20px] transition-transform duration-500 group-hover/video:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = `https://img.youtube.com/vi/${video.id}/0.jpg`;
                      }}
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/35 flex items-center justify-center transition-opacity opacity-90 group-hover/video:opacity-100 z-10">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl transition-all duration-300 group-hover/video:scale-110 group-hover/video:bg-luxury-accent group-hover/video:border-luxury-accent">
                        <Play size={18} fill="currentColor" className="translate-x-[1px]" />
                      </div>
                    </div>
                  </a>
                  <div className="flex justify-between items-start px-1 gap-4">
                    <div className="flex flex-col gap-1 truncate">
                      <h3 className="text-sm font-serif font-medium text-white truncate">
                        {video.title}
                      </h3>
                      <a
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-mono text-luxury-secondary hover:text-luxury-accent transition-colors flex items-center gap-1 mt-0.5"
                      >
                        Watch on YouTube <ExternalLink size={10} />
                      </a>
                    </div>
                    <span className="text-[9px] font-mono text-luxury-accent uppercase tracking-widest bg-luxury-accent/5 px-2.5 py-0.5 rounded-full border border-luxury-accent/15 flex-shrink-0 mt-1">
                      {video.category}
                    </span>
                  </div>
                </InteractiveCard>
              ))}
            </motion.div>
          )}

          {activeTab === "press" && (
            <motion.div
              key="press"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            >
              {pressList.map((press) => (
                <InteractiveCard
                  key={press.id}
                  cardType="gallery"
                  onClick={() => {
                    setLightboxImage(press.src);
                    setLightboxTitle(press.title);
                  }}
                  className="overflow-hidden aspect-[3/4] cursor-pointer p-0 rounded-[22px] border border-white/10 bg-white/[0.03] shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
                >
                  <img
                    src={press.src}
                    alt={press.title}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const p = e.currentTarget.parentElement;
                      if (p) {
                        p.innerHTML = `<div class="w-full h-full flex flex-col items-center justify-center bg-luxury-surface text-center p-4"><span class="text-xs font-serif text-white">${press.title}</span><span class="text-[9px] font-mono text-luxury-muted uppercase tracking-widest mt-4">Clipping</span></div>`;
                      }
                    }}
                    className="w-full h-full object-cover rounded-[20px] transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center z-30">
                    <span className="text-[10px] font-mono uppercase tracking-widest bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                      Expand Article
                    </span>
                  </div>
                </InteractiveCard>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* FULLSCREEN LIGHTBOX DIALOG */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-6"
            >
              <button
                onClick={() => {
                  setLightboxImage(null);
                  setLightboxTitle(null);
                }}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>

              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="max-w-4xl max-h-[75vh] w-full h-full relative flex items-center justify-center"
              >
                <img
                  src={lightboxImage}
                  alt={lightboxTitle || "Expanded view"}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const p = e.currentTarget.parentElement;
                    if (p) {
                      p.innerHTML = `<div class="w-full h-64 bg-luxury-surface border border-white/5 rounded-2xl flex flex-col items-center justify-center"><span class="text-lg font-serif text-white">Expanded Frame View</span><span class="text-xs font-mono text-luxury-muted mt-2">${lightboxImage}</span></div>`;
                    }
                  }}
                  className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/5"
                />
              </motion.div>
              
              {lightboxTitle && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 text-center max-w-xl"
                >
                  <p className="text-sm font-serif text-white">{lightboxTitle}</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
