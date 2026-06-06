"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, LANGUAGES } from "@/data/languages";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, X, Sparkles, Loader2 } from "lucide-react";

declare global {
  interface Window {
    google?: unknown;
    googleTranslateElementInit?: () => void;
  }
}

interface LanguageContextType {
  currentLanguage: Language;
  isTranslating: boolean;
  recentLanguages: Language[];
  suggestedLanguage: Language | null;
  showSuggestion: boolean;
  changeLanguage: (code: string) => Promise<void>;
  dismissSuggestion: () => void;
  acceptSuggestion: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const RECENT_LANGS_KEY = "ps_recent_languages";
const SELECTED_LANG_KEY = "ps_selected_language";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    LANGUAGES.find((l) => l.code === "en") || LANGUAGES[0]
  );
  const [isTranslating, setIsTranslating] = useState(false);
  const [recentLanguages, setRecentLanguages] = useState<Language[]>([]);
  const [suggestedLanguage, setSuggestedLanguage] = useState<Language | null>(null);
  const [showSuggestion, setShowSuggestion] = useState(false);

 
  // Initialize and load script
  

  useEffect(() => {
    // 1. Initialize recent languages from localStorage
    const savedRecents = localStorage.getItem(RECENT_LANGS_KEY);
    if (savedRecents) {
      try {
        const codes = JSON.parse(savedRecents) as string[];
        const matched = codes
          .map((c) => LANGUAGES.find((l) => l.code === c))
          .filter((l): l is Language => !!l);
        // Defer to avoid cascading renders from synchronous setState inside effect
        setTimeout(() => setRecentLanguages(matched.slice(0, 5)), 0);
      } catch (e) {
        console.error("Failed to parse recent languages", e);
      }
    } else {
      // Default suggested/recent list
      const defaults = ["es", "fr", "te", "hi"].map((c) => LANGUAGES.find((l) => l.code === c)).filter((l): l is Language => !!l);
      setTimeout(() => setRecentLanguages(defaults), 0);
    }

    // 2. Setup Google Translate Init Function
    window.googleTranslateElementInit = () => {
      // The external google global is dynamically loaded; cast locally to avoid typing churn
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anyGoogle = (window as any).google;
      if (anyGoogle && anyGoogle.translate) {
        new anyGoogle.translate.TranslateElement(
          {
            pageLanguage: "en",
            layout: anyGoogle.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    // 3. Inject Google Translate script dynamically
    const scriptId = "google-translate-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    // 4. Detect browser language and previous selection
    const savedLangCode = localStorage.getItem(SELECTED_LANG_KEY);
    const browserLangCode = navigator.language.split("-")[0];

    if (savedLangCode) {
      const matched = LANGUAGES.find((l) => l.code === savedLangCode);
      if (matched) {
        // Defer state update to avoid cascading renders inside effect
        setTimeout(() => setCurrentLanguage(matched), 0);
        applyLanguageSettings(matched);
      }
    } else if (browserLangCode && browserLangCode !== "en") {
      const matched = LANGUAGES.find((l) => l.code === browserLangCode);
      if (matched) {
        setSuggestedLanguage(matched);
        // Delay suggestion slightly for premium entrance
        const timer = setTimeout(() => {
          setShowSuggestion(true);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Update HTML elements (data-lang, dir) for layout and typography overrides
  const applyLanguageSettings = (lang: Language) => {
    const html = document.documentElement;
    html.setAttribute("data-lang", lang.code);
    html.setAttribute("dir", lang.rtl ? "rtl" : "ltr");
    
    // Cookie is standard format for google translate: /en/CODE
    document.cookie = `googtrans=/en/${lang.code}; path=/;`;
    document.cookie = `googtrans=/en/${lang.code}; path=/; domain=${window.location.hostname};`;
  };

  const changeLanguage = async (code: string): Promise<void> => {
    const targetLang = LANGUAGES.find((l) => l.code === code);
    if (!targetLang) return;

    setIsTranslating(true);
    setCurrentLanguage(targetLang);
    applyLanguageSettings(targetLang);
    localStorage.setItem(SELECTED_LANG_KEY, code);

    // Update recents
    setRecentLanguages((prev) => {
      const filtered = prev.filter((l) => l.code !== code);
      const updated = [targetLang, ...filtered].slice(0, 5);
      localStorage.setItem(RECENT_LANGS_KEY, JSON.stringify(updated.map((l) => l.code)));
      return updated;
    });

    // Programmatic trigger to Google Translate widget
    try {
      const selectEl = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (selectEl) {
        selectEl.value = code;
        selectEl.dispatchEvent(new Event("change"));
      } else {
        // Fallback: If elements are still loading, wait and retry
        await new Promise((resolve) => setTimeout(resolve, 300));
        const retrySelect = document.querySelector(".goog-te-combo") as HTMLSelectElement;
        if (retrySelect) {
          retrySelect.value = code;
          retrySelect.dispatchEvent(new Event("change"));
        } else {
          // If all else fails, reload the page to let googtrans cookie take effect
          window.location.reload();
        }
      }
    } catch (err) {
      console.error("Translation trigger failed", err);
    } finally {
      // Keep loading overlay for 900ms to allow DOM changes and prevent layout flashes
      setTimeout(() => {
        setIsTranslating(false);
      }, 900);
    }
  };

  const dismissSuggestion = () => {
    setShowSuggestion(false);
  };

  const acceptSuggestion = () => {
    if (suggestedLanguage) {
      changeLanguage(suggestedLanguage.code);
    }
    setShowSuggestion(false);
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        isTranslating,
        recentLanguages,
        suggestedLanguage,
        showSuggestion,
        changeLanguage,
        dismissSuggestion,
        acceptSuggestion,
      }}
    >
      {children}
      {/* Hidden Translate target needed by Google Script */}
      <div id="google_translate_element" className="hidden" style={{ display: "none" }} />

      {/* Dynamic Translation Loading Overlay */}
      <AnimatePresence>
        {isTranslating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-luxury-bg/90 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="flex flex-col items-center p-8 rounded-3xl border border-white/10 bg-white/[0.02] shadow-[0_30px_70px_rgba(0,0,0,0.6)]"
            >
              <div className="relative mb-6">
                <Loader2 className="w-12 h-12 text-luxury-accent animate-spin" />
                <Globe className="w-6 h-6 text-white absolute inset-0 m-auto animate-pulse" />
              </div>
              <h2 className="text-xl font-serif text-white tracking-wider mb-2">
                Adapting Experience
              </h2>
              <p className="text-sm font-mono text-luxury-secondary animate-pulse text-center">
                Translating content to {currentLanguage.name}...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Browser Language Detection & Geo-Suggestion Notification */}
      <AnimatePresence>
        {showSuggestion && suggestedLanguage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 24 }}
            className="fixed bottom-6 right-6 z-[999] w-full max-w-sm p-5 rounded-2xl border border-luxury-accent/30 bg-luxury-bg/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-4"
          >
            <div className="flex gap-3">
              <div className="p-2.5 rounded-xl bg-luxury-accent/10 text-luxury-accent h-fit">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div className="flex-grow flex flex-col gap-1">
                <h4 className="text-sm font-serif font-semibold text-white tracking-wide">
                  Language Preference
                </h4>
                <p className="text-xs text-luxury-secondary leading-relaxed">
                  We detected your browser language is <strong className="text-white">{suggestedLanguage.name}</strong>. Switch to read in your native language?
                </p>
              </div>
              <button
                onClick={dismissSuggestion}
                className="p-1 rounded-full text-luxury-secondary hover:text-white transition-colors h-fit"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-2.5 justify-end">
              <button
                onClick={dismissSuggestion}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-white/5 hover:bg-white/10 text-luxury-secondary hover:text-white border border-white/5 transition-all cursor-pointer"
              >
                Keep English
              </button>
              <button
                onClick={acceptSuggestion}
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-luxury-accent hover:bg-luxury-accent/90 text-luxury-bg shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all cursor-pointer"
              >
                Translate
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
