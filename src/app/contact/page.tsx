"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [bookingTypes, setBookingTypes] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleCheckbox = (type: string) => {
    setBookingTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          bookingTypes,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setBookingTypes([]);
      } else {
        setSubmitError(result.error || "Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      console.error("Inquiry submission error:", err);
      setSubmitError("A connection error occurred. Please verify your network or email info@priyankosur.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-luxury-bg text-white py-16">
      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-12">

        {/* Header */}
        <div className="flex flex-col gap-4 text-center items-center">
          <span className="text-[10px] font-mono text-luxury-accent uppercase tracking-widest">
            Inquiries & Booking
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-reveal heading-safe">
            Connect for Collaboration
          </h1>
          <p className="text-sm text-luxury-secondary max-w-2xl leading-relaxed font-light mt-1">
            Initiate inquiries for film compositions, live world concert bookings, Vedic frequency healing workshops, or press interviews.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-6 items-start">

          {/* Info Details panel */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-serif text-white">Direct Contacts</h3>
              <p className="text-xs text-luxury-secondary font-light">
                Feel free to reach out directly for immediate professional correspondence.
              </p>
            </div>

            <div className="flex flex-col gap-6 text-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-luxury-accent">
                  <Mail size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-luxury-secondary uppercase tracking-widest">Email Address</span>
                  <a href="mailto:info@priyankosur.com" className="text-white hover:text-luxury-accent transition-colors font-light">
                    info@priyankosur.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-luxury-accent">
                  <Phone size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-luxury-secondary uppercase tracking-widest">Booking Hotline</span>
                  <span className="text-white font-light font-mono">+91 99694 18500</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-luxury-accent">
                  <MapPin size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-luxury-secondary uppercase tracking-widest">Primary Creative Hub</span>
                  <span className="text-white font-light">Mumbai, Maharashtra, India</span>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-6 flex flex-col gap-2">
              <span className="text-[10px] font-mono text-luxury-accent uppercase tracking-widest">Production Banner</span>
              <span className="text-xs text-white">Surya Krishna Production (SKP)</span>
              <span className="text-xs text-luxury-secondary font-light">Creative Head & Executive Producer</span>
            </div>
          </div>

          {/* Contact Interactive Form Card */}
          <div className="lg:col-span-3 glass rounded-2xl p-6 md:p-8 border-white/5 relative">
            <AnimatePresence mode="wait">
              {submitSuccess ? (
                /* SUCCESS VIEW SCREEN */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center text-center py-16 gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-luxury-accent/10 border border-luxury-accent/20 flex items-center justify-center text-luxury-accent mb-2">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-serif text-white">Inquiry Received</h3>
                  <p className="text-xs text-luxury-secondary max-w-sm leading-relaxed font-light">
                    Thank you. Your collaborative booking detail has been processed successfully. Priyanko&apos;s production office will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="px-6 py-2.5 rounded-full border border-white/10 hover:border-white/20 text-xs font-mono uppercase tracking-widest text-luxury-secondary hover:text-white transition-all mt-4"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                /* INPUT FORM VIEW */
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-serif text-white">Collaborator Form</h3>
                    <p className="text-xs text-luxury-secondary font-light">
                      Please supply contact fields and identify project focus targets.
                    </p>
                  </div>

                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-[10px] font-mono text-luxury-secondary uppercase tracking-widest">
                      Your Name / Entity *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. United Nations DCPI / Film Studio"
                      className="w-full bg-luxury-surface border border-white/5 focus:border-luxury-accent/40 rounded-xl px-4 py-3 text-sm outline-none text-white transition-all focus-visible:ring-2 focus-visible:ring-luxury-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    />
                  </div>

                  {/* Email & Phone grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-[10px] font-mono text-luxury-secondary uppercase tracking-widest">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. director@studio.com"
                        className="w-full bg-luxury-surface border border-white/5 focus:border-luxury-accent/40 rounded-xl px-4 py-3 text-sm outline-none text-white transition-all focus-visible:ring-2 focus-visible:ring-luxury-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-[10px] font-mono text-luxury-secondary uppercase tracking-widest">
                        Contact Number *
                      </label>
                      <input
                        type="text"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98200 XXXXX"
                        className="w-full bg-luxury-surface border border-white/5 focus:border-luxury-accent/40 rounded-xl px-4 py-3 text-sm outline-none text-white transition-all focus-visible:ring-2 focus-visible:ring-luxury-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                      />
                    </div>
                  </div>

                  {/* Project Focus Checkboxes */}
                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-mono text-luxury-secondary uppercase tracking-widest">
                      Inquiry Focus Targets
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        "Film Composition",
                        "Live Concert",
                        "Nada-Bramh Workshop",
                        "Press / Interview",
                      ].map((type) => {
                        const isChecked = bookingTypes.includes(type);
                        return (
                          <button
                            type="button"
                            key={type}
                            onClick={() => handleCheckbox(type)}
                            className={`p-3 rounded-xl border text-left transition-all ${isChecked
                                ? "border-luxury-accent/40 bg-luxury-accent/[0.02] text-white"
                                : "border-white/5 bg-luxury-surface/30 text-luxury-secondary hover:border-white/10"
                              }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message area */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-[10px] font-mono text-luxury-secondary uppercase tracking-widest">
                      Message / Proposal Details *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline collaboration scope, targeted locations, and timelines..."
                      className="w-full bg-luxury-surface border border-white/5 focus:border-luxury-accent/40 rounded-xl px-4 py-3 text-sm outline-none text-white transition-all resize-none focus-visible:ring-2 focus-visible:ring-luxury-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    />
                  </div>

                  {/* Error display */}
                  {submitError && (
                    <div className="p-4 rounded-xl border border-red-500/20 bg-red-950/20 text-red-200 text-xs font-mono flex flex-col gap-1.5">
                      <div className="font-semibold uppercase tracking-wider text-red-400">Submission Error</div>
                      <p>{submitError}</p>
                    </div>
                  )}

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full bg-white text-luxury-bg hover:bg-neutral-200 disabled:bg-white/50 transition-colors text-xs font-mono uppercase tracking-widest font-semibold flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={14} className="animate-spin" /> Submitting Inquiries...
                      </>
                    ) : (
                      <>
                        <Send size={12} /> Send Collaboration Inquiries
                      </>
                    )}
                  </button>

                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
