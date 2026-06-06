"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Music, Radio, Globe } from "lucide-react";
import { useAudio } from "@/context/AudioContext";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageDropdown } from "@/components/LanguageDropdown";
import { BrandLogo } from "@/components/BrandLogo";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Journey", href: "/profile" },
  { label: "Cinema", href: "/cinema" },
  { label: "Discography", href: "/discography" },
  { label: "Science", href: "/research" },
  { label: "Media", href: "/media" },
  { label: "Upcoming", href: "/upcoming" },
  { label: "Contact", href: "/contact" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isPlaying, activeFrequency } = useAudio();
  const { currentLanguage } = useLanguage();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-0 right-0 z-50 transition-all duration-500 flex justify-center px-4 ${
          isScrolled ? "top-4" : "top-0"
        }`}
      >
        <div
          className={`w-full max-w-5xl transition-all duration-500 flex items-center justify-between gap-4 lg:gap-8 px-6 md:px-8 ${
            isScrolled
              ? "glass py-3 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/5"
              : "bg-transparent py-6 border-b border-transparent"
          }`}
        >
          {/* Logo Identity */}
          <Link href="/" className="flex items-center gap-3 group select-none shrink-0">
            <BrandLogo variant="gold" size={42} animateOnLoad={true} />
            <div className="flex flex-col">
              <span className="text-md font-serif font-semibold text-white tracking-wider whitespace-nowrap group-hover:text-luxury-accent transition-colors duration-300">
                Priyanko Sur
              </span>
              <span className="text-[9px] font-mono text-luxury-secondary tracking-widest uppercase whitespace-nowrap group-hover:text-white transition-colors duration-300">
                Music Director
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-2 py-1 text-[11px] xl:px-3 xl:py-1.5 xl:text-[13px] font-medium tracking-wide text-luxury-secondary hover:text-white transition-colors duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-white/5 border border-white/10 rounded-full z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action Trigger Buttons / Indicators */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Healing Tone Visual Indicator */}
            {activeFrequency && (
              <div className="hidden lg:flex items-center gap-2 bg-luxury-accent/10 border border-luxury-accent/20 px-3 py-1 rounded-full text-[10px] font-mono text-luxury-accent animate-pulse">
                <Radio size={10} />
                Synth: {activeFrequency}Hz
              </div>
            )}

            {/* Floating Language Selector Button */}
            <button
              onClick={() => setIsLangDropdownOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-luxury-accent/30 bg-white/5 hover:bg-white/10 text-white hover:text-luxury-accent transition-all duration-300 shadow-md group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              title="Change language"
            >
              <Globe size={14} className="group-hover:rotate-12 transition-transform duration-500 text-luxury-accent" />
              <span className="text-xs font-mono font-bold tracking-wider">{currentLanguage.code.toUpperCase()}</span>
            </button>

            {/* LanguageDropdown Modal */}
            <LanguageDropdown
              isOpen={isLangDropdownOpen}
              onClose={() => setIsLangDropdownOpen(false)}
            />
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Menu Dropdown Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-luxury-bg/95 backdrop-blur-xl flex flex-col justify-center px-8 lg:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {NAV_ITEMS.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-2xl font-serif tracking-wider ${
                        isActive ? "text-luxury-accent" : "text-luxury-secondary hover:text-white"
                      } transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-lg px-2 py-1`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile Language Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.05 }}
                className="mt-4 flex justify-center"
              >
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsLangDropdownOpen(true);
                  }}
                  className="flex items-center justify-center gap-2.5 px-6 py-3 rounded-full border border-luxury-accent/20 hover:border-luxury-accent/40 bg-luxury-accent/5 text-luxury-accent hover:text-white transition-all duration-300 w-full max-w-[260px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <Globe size={16} className="animate-spin-slow" />
                  <span className="text-sm font-semibold tracking-wider">Change Language ({currentLanguage.name})</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
