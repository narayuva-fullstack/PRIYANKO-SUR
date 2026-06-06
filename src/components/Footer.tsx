"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

export const Footer: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'clicked' | 'redirecting' | 'error'>('idle');

  const handleDevClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If in error state, allow direct navigation fallback to override blocker.
    if (status === 'error') {
      setTimeout(() => setStatus('idle'), 2000);
      return;
    }

    e.preventDefault();
    setStatus('clicked');

    // Sequence of 450ms for click micro-interaction (golden pulse & light sweep)
    setTimeout(() => {
      setStatus('redirecting');

      try {
        // Avoid passing features string so we get a valid window reference to check, then set opener to null
        const newWindow = window.open('https://www.linkedin.com/in/yuvanyenumula/', '_blank');
        if (newWindow) {
          try {
            newWindow.opener = null;
          } catch (openerErr) {
            console.warn('Could not nullify opener:', openerErr);
          }
          // Success state transition back to idle
          setTimeout(() => {
            setStatus('idle');
          }, 850);
        } else {
          // Blocked by popup blocker
          setStatus('error');
        }
      } catch (err) {
        console.error('Failed to redirect:', err);
        setStatus('error');
      }
    }, 450);
  };

  return (
    <footer className="w-full border-t border-white/5 py-12 md:py-16 mt-auto">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {/* Profile identity */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <BrandLogo variant="gold" size={36} animateOnLoad={false} />
            <div className="flex flex-col">
              <span 
                className="relative inline-flex items-center premium-dev-link cursor-default text-md font-serif text-white tracking-wider uppercase"
                aria-label="Priyanko Sur"
              >
                <span className="premium-dev-link-text font-serif">
                  Priyanko Sur
                </span>
                
                {/* Floating particles background trail */}
                <span className="dev-particle-container" aria-hidden="true">
                  <span className="dev-particle dev-particle-1" />
                  <span className="dev-particle dev-particle-2" />
                  <span className="dev-particle dev-particle-3" />
                  <span className="dev-particle dev-particle-4" />
                  <span className="dev-particle dev-particle-5" />
                </span>
              </span>
              <span className="text-[9px] font-mono text-luxury-accent tracking-widest uppercase">
                Composer • Producer • Researcher
              </span>
            </div>
          </div>
          <p className="text-xs text-luxury-secondary leading-relaxed max-w-sm">
            Preserving and propagating the heritage of Nada-Bramh sound frequencies, bridging traditional Vedic Sanskrit chanting with modern world fusion and acoustic science.
          </p>
        </div>

        {/* Dynamic Pages Menu */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-mono text-white tracking-widest uppercase">
            Explore
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Link href="/" className="text-luxury-secondary hover:text-luxury-accent transition-colors">
              Home
            </Link>
            <Link href="/profile" className="text-luxury-secondary hover:text-luxury-accent transition-colors">
              Profile Bio
            </Link>
            <Link href="/research" className="text-luxury-secondary hover:text-luxury-accent transition-colors">
              R & D Lab
            </Link>
            <Link href="/discography" className="text-luxury-secondary hover:text-luxury-accent transition-colors">
              Discography
            </Link>
            <Link href="/media" className="text-luxury-secondary hover:text-luxury-accent transition-colors">
              Media Gallery
            </Link>
            <Link href="/contact" className="text-luxury-secondary hover:text-luxury-accent transition-colors">
              Contact
            </Link>
          </div>
        </div>

        {/* Social connections */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-mono text-white tracking-widest uppercase">
            Connect
          </span>
          <div className="flex flex-col gap-2 text-xs text-luxury-secondary">
            <a
              href="https://www.facebook.com/priyankosur/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com/PriyankoSur"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Twitter (X)
            </a>
            <a
              href="https://www.youtube.com/user/zadoostar29/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              YouTube
            </a>
            <a
              href="https://www.instagram.com/priyankosur/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-luxury-muted">
        <span className="flex flex-wrap items-center justify-center md:justify-start gap-x-1.5 gap-y-1 text-center md:text-left">
          <span>&copy; {new Date().getFullYear()} Priyanko Sur. All Rights Reserved.</span>
          <span>•</span>
          <span>Developed by</span>
          <span className="relative inline-flex items-center">
            <a
              href="https://www.linkedin.com/in/yuvanyenumula/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDevClick}
              className={`premium-dev-link ${status === 'clicked' ? 'is-clicked' : ''}`}
              aria-label="Developer LinkedIn profile - Y Narasimha Yuvan. Opens in a new tab."
            >
              {status === 'redirecting' ? (
                <span className="premium-dev-link-redirect">
                  Opening LinkedIn...
                </span>
              ) : (
                <span className="premium-dev-link-text">
                  Y NARASIMHA YUVAN
                </span>
              )}

              {/* Floating particles background trail */}
              <span className="dev-particle-container" aria-hidden="true">
                <span className="dev-particle dev-particle-1" />
                <span className="dev-particle dev-particle-2" />
                <span className="dev-particle dev-particle-3" />
                <span className="dev-particle dev-particle-4" />
                <span className="dev-particle dev-particle-5" />
              </span>
            </a>

            {/* Error Tooltip alert */}
            {status === 'error' && (
              <span className="dev-tooltip-error" role="alert">
                Unable to open LinkedIn. Click again to continue.
              </span>
            )}
          </span>
        </span>
        <div className="flex gap-4">
          <span>ISCORCE Research</span>
          <span>Surya Krishna Production</span>
        </div>
      </div>
    </footer>
  );
};

