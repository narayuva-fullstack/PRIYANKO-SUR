"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      // Delay slightly to ensure smooth transition after all assets load
      setTimeout(() => setIsLoading(false), 800);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      // Fallback: max 4 seconds
      const fallback = setTimeout(() => setIsLoading(false), 4000);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(fallback);
      };
    }
  }, []);

  // Lock body scroll while loading screen is visible
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="global-loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4 text-center px-6"
          >
            {/* Pink/gold pulsing bars (the waves animation) */}
            <div className="flex gap-1.5 h-10 items-end justify-center">
              <motion.div
                className="w-1 bg-luxury-accent rounded-full"
                animate={{ height: [10, 40, 10] }}
                transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
              />
              <motion.div
                className="w-1 bg-luxury-accent rounded-full"
                animate={{ height: [18, 52, 18] }}
                transition={{ repeat: Infinity, duration: 1, delay: 0.2, ease: "easeInOut" }}
              />
              <motion.div
                className="w-1 bg-luxury-accent rounded-full"
                animate={{ height: [8, 28, 8] }}
                transition={{ repeat: Infinity, duration: 1, delay: 0.4, ease: "easeInOut" }}
              />
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
  );
};