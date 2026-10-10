import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audioEngine';

export default function ScreenIntro({ onOpenGift, recipientName = "Vanshika" }) {
  const [step, setStep] = useState(0);

  // Progressive staggered text reveal with natural emotional pauses
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1000),  // Vanshika...
      setTimeout(() => setStep(2), 2600),  // It's your birthday.
      setTimeout(() => setStep(3), 4400),  // I could've just said...
      setTimeout(() => setStep(4), 6000),  // Happy Birthday ❤️
      setTimeout(() => setStep(5), 8200),  // But you're not exactly a normal sister...
      setTimeout(() => setStep(6), 10400), // So you don't get a normal birthday wish.
      setTimeout(() => setStep(7), 12200), // Show Button: OPEN YOUR GIFT 🎁
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleOpenGift = () => {
    // Play warm chime & start ambient music
    soundEngine.playEnvelopeOpen();
    soundEngine.startAmbientMusic();

    // Subtle golden confetti burst
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#d4af37', '#f4efe6', '#c28585', '#e0a96d'],
      disableForReducedMotion: true
    });

    onOpenGift();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0c] text-[#f4efe6] flex flex-col items-center justify-center p-6 select-none overflow-hidden film-grain">
      {/* Subtle ambient light gradient */}
      <div className="absolute w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none -top-20 -left-20 animate-pulse-glow" />
      <div className="absolute w-96 h-96 bg-[#c28585]/5 rounded-full blur-3xl pointer-events-none -bottom-20 -right-20 animate-pulse-glow" />

      <div className="max-w-xl w-full text-center space-y-6 relative z-10">
        
        {/* Step 1: Name */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#f4efe6] font-medium tracking-wide"
            >
              {recipientName}…
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Step 2: It's your birthday */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 1.0 }}
              className="font-sans text-sm sm:text-base text-[#c9a875] tracking-widest uppercase font-light"
            >
              It’s your birthday.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Step 3 & 4: I could've just said -> Happy Birthday */}
        <div className="py-2">
          <AnimatePresence>
            {step >= 3 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.8 }}
                className="font-serif italic text-lg sm:text-xl text-white/60 mb-2"
              >
                I could've just said…
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#d4af37] font-semibold tracking-wide"
              >
                “Happy Birthday ❤️”
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Step 5 & 6: Sister statement */}
        <div className="space-y-3">
          <AnimatePresence>
            {step >= 5 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.9, y: 0 }}
                transition={{ duration: 1.0 }}
                className="font-sans text-sm sm:text-lg text-[#e2d9cc] font-light"
              >
                But you're not exactly a normal sister…
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 6 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0 }}
                className="font-handwriting text-2xl sm:text-3xl text-[#c28585]"
              >
                So you don't get a normal birthday wish.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Step 7: Glowing Button */}
        <AnimatePresence>
          {step >= 7 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="pt-8"
            >
              <button
                onClick={handleOpenGift}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e0a96d] to-[#d4af37] bg-[length:200%_auto] text-[#0a0a0c] font-semibold text-base sm:text-lg tracking-wider uppercase transition-all duration-500 hover:scale-105 shadow-[0_0_40px_rgba(212,175,55,0.4)] cursor-pointer hover:shadow-[0_0_60px_rgba(212,175,55,0.6)]"
              >
                <Gift className="w-5 h-5 transition-transform group-hover:rotate-12" />
                <span>OPEN YOUR GIFT 🎁</span>
                <Sparkles className="w-4 h-4 text-black/60" />
              </button>

              <p className="mt-4 text-[11px] text-white/40 tracking-wider font-mono">
                (Click to open & begin music)
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Skip button for quick review */}
      <button
        onClick={() => setStep(7)}
        className={`absolute bottom-6 right-6 text-xs text-white/30 hover:text-white/70 transition-opacity uppercase tracking-widest font-mono cursor-pointer ${
          step >= 7 ? 'hidden' : 'opacity-60'
        }`}
      >
        Skip intro →
      </button>
    </div>
  );
}
