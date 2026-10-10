import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, KeyRound, CheckCircle2 } from 'lucide-react';

export default function SecretModal({ secret, isOpen, onClose, foundCount = 1, totalSecrets = 5 }) {
  if (!isOpen || !secret) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-lg w-full bg-gradient-to-b from-[#1c1a24] to-[#121118] border border-[#d4af37]/40 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(212,175,55,0.15)] z-10 overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/20 border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37]">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Secret Memory Unlocked 🔓
              </span>
              <h3 className="font-serif text-2xl text-[#f4efe6] font-semibold">
                {secret.title}
              </h3>
            </div>
          </div>

          {/* Badge & Hint */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-xs text-[#f4efe6] font-medium">
              {secret.badge}
            </span>
            <span className="text-xs text-white/40 italic">
              {secret.locationHint}
            </span>
          </div>

          {/* Memory Note Box */}
          <div className="p-5 rounded-xl bg-black/40 border border-white/10 mb-6 relative">
            <h4 className="font-serif text-lg text-[#e0a96d] mb-2 font-medium">
              “{secret.memoryTitle}”
            </h4>
            <p className="font-handwriting text-xl text-[#f4efe6]/90 leading-relaxed">
              {secret.secretNote}
            </p>
          </div>

          {/* Progress Tracker */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-white/60">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
              <span>Easter Egg Progress</span>
            </div>
            <span className="font-semibold text-[#d4af37]">
              {foundCount} / {totalSecrets} Found
            </span>
          </div>

          {/* Continue button */}
          <button
            onClick={onClose}
            className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#e0a96d] text-[#0a0a0c] font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <span>Keep Exploring</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
