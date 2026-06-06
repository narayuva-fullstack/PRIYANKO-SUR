import React from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-luxury-bg border-t border-white/5 py-12 md:py-16 mt-auto">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {/* Profile identity */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <BrandLogo variant="gold" size={36} animateOnLoad={false} />
            <div className="flex flex-col">
              <span className="text-md font-serif text-white tracking-wider uppercase">
                Priyanko Sur
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
        <span>
          &copy; {new Date().getFullYear()} Priyanko Sur. All Rights Reserved.
        </span>
        <div className="flex gap-4">
          <span>ISCORCE Research</span>
          <span>Surya Krishna Production</span>
        </div>
      </div>
    </footer>
  );
};
