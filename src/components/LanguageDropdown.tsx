"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Globe, Check, X, Command } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { LANGUAGES, Language } from "@/data/languages";

interface LanguageDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({ isOpen, onClose }) => {
  const { currentLanguage, recentLanguages, changeLanguage } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  // Group languages for organized presentation
  const filteredLanguages = LANGUAGES.filter((lang) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      lang.name.toLowerCase().includes(query) ||
      lang.nativeName.toLowerCase().includes(query) ||
      lang.code.toLowerCase().includes(query)
    );
  });

  // Flat list of items available for keyboard navigation
  const flatNavList = filteredLanguages;

  // Reset active keyboard index when search changes
  useEffect(() => {
    // Defer state update to avoid cascading renders inside effect
    setTimeout(() => setActiveIndex(-1), 0);
  }, [searchQuery]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
      document.body.style.overflow = "hidden"; // Lock scroll for focus
    } else {
      document.body.style.overflow = "";
      // Defer clearing search to avoid synchronous state update in effect
      setTimeout(() => setSearchQuery(""), 0);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Keyboard navigation logic
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => {
        const next = prev + 1 >= flatNavList.length ? 0 : prev + 1;
        scrollActiveIntoView(next);
        return next;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => {
        const next = prev - 1 < 0 ? flatNavList.length - 1 : prev - 1;
        scrollActiveIntoView(next);
        return next;
      });
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < flatNavList.length) {
        handleSelect(flatNavList[activeIndex]);
      }
    }
  };

  const scrollActiveIntoView = (index: number) => {
    const container = listContainerRef.current;
    if (!container) return;

    const activeEl = container.querySelector(`[data-nav-index="${index}"]`) as HTMLElement;
    if (activeEl) {
      const containerTop = container.scrollTop;
      const containerBottom = containerTop + container.clientHeight;
      const elemTop = activeEl.offsetTop;
      const elemBottom = elemTop + activeEl.clientHeight;

      if (elemTop < containerTop) {
        container.scrollTop = elemTop;
      } else if (elemBottom > containerBottom) {
        container.scrollTop = elemBottom - container.clientHeight;
      }
    }
  };

  const handleSelect = (lang: Language) => {
    changeLanguage(lang.code);
    onClose();
  };

  const indianLangs = filteredLanguages.filter((l) => l.region === "Indian");
  const internationalLangs = filteredLanguages.filter((l) => l.region === "International");
  const otherLangs = filteredLanguages.filter((l) => l.region === "Other");

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-md">
          {/* Backdrop Overlay Close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-transparent"
            onClick={onClose}
          />

          {/* Glassmorphic Dropdown Panel */}
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            onKeyDown={handleKeyDown}
            className="relative w-full max-w-2xl h-[80vh] max-h-[650px] flex flex-col rounded-3xl border border-white/10 bg-luxury-bg/80 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Ambient reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-luxury-accent/5 via-transparent to-white/5 pointer-events-none" />

            {/* Header: Search Box & Dynamic Glow border */}
            <div className="p-5 border-b border-white/5 flex items-center justify-between gap-4 relative">
              <div className="flex-grow relative flex items-center">
                <Search className="absolute left-4 text-luxury-secondary w-5 h-5 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search languages by name, native script, or code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-10 py-3 rounded-xl bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/10 focus:border-luxury-accent/50 outline-none text-white placeholder-luxury-secondary text-sm font-medium tracking-wide transition-all duration-300 shadow-inner focus-visible:ring-2 focus-visible:ring-luxury-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 p-1 rounded-full text-luxury-secondary hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 hover:text-luxury-accent border border-white/10 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                title="Close selector"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Suggested/Recent Languages Row */}
            {!searchQuery && recentLanguages.length > 0 && (
              <div className="px-6 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="text-[10px] font-mono text-luxury-secondary uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Command className="w-3 h-3 text-luxury-accent" />
                  Recent & Recommended
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentLanguages.map((lang) => (
                    <button
                      key={`recent-${lang.code}`}
                      onClick={() => handleSelect(lang)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                        currentLanguage.code === lang.code
                          ? "bg-luxury-accent/20 border-luxury-accent text-luxury-accent shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                          : "bg-white/5 border-white/5 hover:border-white/20 text-luxury-secondary hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span className="font-sans text-[11px] opacity-60">[{lang.code.toUpperCase()}]</span>
                      <span>{lang.name}</span>
                      <span className="opacity-75 text-[10px] font-normal font-serif italic">{lang.nativeName}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Scrollable Language Database */}
            <div
              ref={listContainerRef}
              className="flex-grow overflow-y-auto p-6 scrollbar-premium space-y-6"
            >
              {filteredLanguages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-60">
                  <Globe className="w-12 h-12 text-luxury-secondary mb-3 animate-pulse" />
                  <p className="text-white text-md font-serif tracking-wider">No matching languages found</p>
                  <p className="text-luxury-secondary text-xs mt-1">Try entering another spelling or language code.</p>
                </div>
              ) : (
                <>
                  {/* INDIAN REGION SECTION */}
                  {indianLangs.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-xs font-mono uppercase tracking-widest text-luxury-accent flex items-center gap-2 border-b border-white/5 pb-2">
                        <span>🇮🇳</span> Major Indian Languages
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {indianLangs.map((lang) => {
                          const globalIdx = flatNavList.findIndex((l) => l.code === lang.code);
                          return renderItem(lang, globalIdx);
                        })}
                      </div>
                    </div>
                  )}

                  {/* INTERNATIONAL REGION SECTION */}
                  {internationalLangs.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-xs font-mono uppercase tracking-widest text-luxury-accent flex items-center gap-2 border-b border-white/5 pb-2">
                        <span>🌐</span> International Languages
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {internationalLangs.map((lang) => {
                          const globalIdx = flatNavList.findIndex((l) => l.code === lang.code);
                          return renderItem(lang, globalIdx);
                        })}
                      </div>
                    </div>
                  )}

                  {/* OTHER GLOBAL SUPPORT SECTION */}
                  {otherLangs.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-xs font-mono uppercase tracking-widest text-luxury-secondary flex items-center gap-2 border-b border-white/5 pb-2">
                        <span>🌍</span> All Global Dialects & Regions ({otherLangs.length})
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {otherLangs.map((lang) => {
                          const globalIdx = flatNavList.findIndex((l) => l.code === lang.code);
                          return renderItem(lang, globalIdx);
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Bottom Keyboard Guide */}
            <div className="px-6 py-3.5 bg-black/40 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-luxury-secondary">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">↑↓</kbd> navigate
                <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 ml-2">enter</kbd> select
                <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 ml-2">esc</kbd> close
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-luxury-accent animate-spin-slow" />
                200+ Global Languages Supported
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  function renderItem(lang: Language, globalIndex: number) {
    const isSelected = currentLanguage.code === lang.code;
    const isKeyboardActive = globalIndex === activeIndex;

    return (
      <button
        key={lang.code}
        data-nav-index={globalIndex}
        onClick={() => handleSelect(lang)}
        className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-300 relative group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
          isSelected
            ? "bg-luxury-accent/10 border-luxury-accent/30 text-white"
            : isKeyboardActive
            ? "bg-white/10 border-white/20 text-white"
            : "bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/5 text-luxury-secondary hover:text-white"
        }`}
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold tracking-wide transition-colors duration-200">
            {lang.name}
            {lang.rtl && (
              <span className="ml-2 text-[9px] font-mono uppercase bg-luxury-secondary/15 text-luxury-secondary px-1.5 py-0.5 rounded-md font-normal">
                RTL
              </span>
            )}
          </span>
          <span className="text-xs text-luxury-secondary group-hover:text-luxury-secondary/80 font-serif italic">
            {lang.nativeName}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-[10px] font-mono opacity-50 select-none">[{lang.code.toUpperCase()}]</span>
          {isSelected && (
            <motion.div
              layoutId="selectedLangTick"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Check className="w-4 h-4 text-luxury-accent" />
            </motion.div>
          )}
        </div>
      </button>
    );
  }
};
