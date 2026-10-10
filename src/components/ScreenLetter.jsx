import React from 'react';
import { motion } from 'framer-motion';
import { Feather, Heart, Sparkles, Stamp } from 'lucide-react';
import { personalLetter } from '../data/letter';

export default function ScreenLetter({ onUnlockSecret, isSecretUnlocked }) {
  return (
    <section id="letter" className="py-24 px-4 sm:px-6 max-w-4xl mx-auto relative select-none">
      
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs uppercase tracking-widest text-[#d4af37]">
          <Feather className="w-3.5 h-3.5" />
          <span>Chapter 05 • Handwritten Note</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe6] font-normal">
          For Vanshika
        </h2>
        <p className="text-sm sm:text-base text-white/60 font-sans font-light">
          A few words from the heart, stored in ink and time.
        </p>
      </div>

      {/* Letter Parchment Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative bg-[#f6f2ea] text-[#2c2621] rounded-2xl p-8 sm:p-12 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.6)] letter-paper border border-[#dfd7c9] overflow-hidden"
      >
        {/* Top washi tape */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-36 h-7 washi-tape rounded-xs z-20 pointer-events-none opacity-80 rotate-[-1deg]" />

        {/* Vintage Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#2c2621]/15 pb-6 mb-8 gap-2">
          <h3 className="font-serif text-2xl sm:text-3xl text-[#1a1714] font-semibold">
            {personalLetter.salutation}
          </h3>
          <span className="font-mono text-xs uppercase tracking-widest text-[#2c2621]/60">
            {personalLetter.date}
          </span>
        </div>

        {/* Letter Paragraphs */}
        <div className="space-y-6 font-serif text-base sm:text-lg leading-relaxed text-[#2c2621]/90">
          {personalLetter.paragraphs.map((p, idx) => (
            <p key={idx} className="tracking-wide">
              {p}
            </p>
          ))}
        </div>

        {/* Sign-off & Wax Seal */}
        <div className="mt-12 pt-8 border-t border-[#2c2621]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-handwriting text-2xl text-[#8e4a49]">
              {personalLetter.signOff}
            </p>
            <p className="font-serif text-xl font-semibold text-[#1a1714] mt-1">
              {personalLetter.sender}
            </p>
            {personalLetter.postScript && (
              <p className="font-sans text-xs text-[#2c2621]/60 italic mt-3">
                {personalLetter.postScript}
              </p>
            )}
          </div>

          {/* Golden Wax Seal with Secret Trigger */}
          <div className="relative">
            <button
              onClick={() => onUnlockSecret('secret-wax-seal')}
              title="Click wax seal to inspect..."
              className="group relative w-16 h-16 rounded-full bg-gradient-to-br from-[#c99738] via-[#a37021] to-[#734b0e] border-2 border-[#ffdb7d]/50 shadow-[0_4px_12px_rgba(0,0,0,0.3)] flex items-center justify-center text-[#ffeaad] cursor-pointer hover:scale-110 transition-transform"
            >
              <Heart className={`w-7 h-7 transition-transform group-hover:scale-110 ${isSecretUnlocked ? 'fill-white/80 text-white' : ''}`} />
              <span className="sr-only">Secret Wax Seal</span>
            </button>
            <div className="text-[10px] text-center font-mono text-[#2c2621]/50 mt-1.5 uppercase tracking-wider">
              Wax Seal
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
