import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Flame, Heart, Star, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audioEngine';
import FireworksCanvas from './FireworksCanvas';

export default function ScreenBirthdayCake({ onUnlockSecret, isSecretUnlocked, recipientName = "Vanshika" }) {
  const [isBlown, setIsBlown] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleBlowCandle = () => {
    if (isBlown) return;

    // SFX: Candle blow out whoosh
    soundEngine.playCandleBlow();
    setIsBlown(true);

    // Brief heartbeat pause before full celebration climax
    setTimeout(() => {
      setShowCelebration(true);

      // Explosive confetti cannon
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#f4efe6', '#ff758c', '#ff7eb3', '#f9d423', '#a1c4fd'],
      });

      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#d4af37', '#e0a96d', '#c28585']
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#d4af37', '#e0a96d', '#c28585']
        });
      }, 400);

    }, 800);
  };

  const handleRelight = () => {
    setIsBlown(false);
    setShowCelebration(false);
  };

  return (
    <section id="cake" className="min-h-screen py-24 px-4 sm:px-6 relative flex flex-col items-center justify-center text-center select-none overflow-hidden bg-[#07070a]">
      
      {/* Dynamic Fireworks Canvas on Climax */}
      <FireworksCanvas active={showCelebration} />

      {/* Secret Easter Egg #5: Wish Spark near top */}
      <div className="absolute top-12 left-10 sm:left-24 z-20">
        <button
          onClick={() => onUnlockSecret('secret-candle-spark')}
          title="A subtle sparkle near the candlelight..."
          className="p-2 text-[#d4af37]/40 hover:text-[#d4af37] transition-all hover:scale-125 cursor-pointer"
        >
          <Sparkles className={`w-4 h-4 ${isSecretUnlocked ? 'text-[#d4af37]' : 'animate-pulse'}`} />
          <span className="sr-only">Secret Wish Spark</span>
        </button>
      </div>

      <div className="max-w-2xl w-full mx-auto space-y-8 z-10">
        
        {/* Intro Text */}
        <div className="space-y-2">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            viewport={{ once: true }}
            className="font-serif italic text-lg sm:text-2xl text-white/60"
          >
            Okay {recipientName}…
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-xs sm:text-sm uppercase tracking-[0.3em] text-[#d4af37] font-semibold"
          >
            Close your eyes. Make a wish.
          </motion.p>
        </div>

        {/* Minimalist Aesthetic Cake & Candle Stage */}
        <div className="relative py-8 flex flex-col items-center justify-center">
          
          {/* Ambient Candle Glow */}
          {!isBlown && (
            <div className="absolute top-4 w-48 h-48 bg-[#ffaa40]/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
          )}

          {/* Candle Flame */}
          <div className="relative flex flex-col items-center mb-1">
            {!isBlown ? (
              <div className="relative">
                {/* Outer halo */}
                <div className="w-6 h-10 bg-gradient-to-t from-[#ff5500] via-[#ffaa00] to-[#fff3cc] rounded-full animate-flame shadow-[0_0_20px_#ff9900]" />
                {/* Inner bright blue/white core */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-4 bg-white rounded-full opacity-90" />
              </div>
            ) : (
              /* Smoke Puff animation when blown out */
              <motion.div
                initial={{ opacity: 0.8, y: 0, scale: 0.8 }}
                animate={{ opacity: 0, y: -40, scale: 2 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-4 h-4 rounded-full bg-white/40 blur-xs"
              />
            )}

            {/* Candle Wick */}
            <div className="w-1 h-3 bg-[#3a3530]" />

            {/* Candle Stick */}
            <div className="w-4 h-16 bg-gradient-to-b from-[#f4efe6] via-[#e2d9cc] to-[#c9a875] rounded-t-sm shadow-md" />
          </div>

          {/* Birthday Cake Base (Tiered Elegant Design) */}
          <div className="relative flex flex-col items-center">
            {/* Top Tier */}
            <div className="w-44 sm:w-56 h-12 bg-gradient-to-b from-[#2a2438] to-[#1d1928] rounded-t-xl border-t border-x border-[#d4af37]/30 shadow-lg relative overflow-hidden flex items-center justify-around px-4">
              <div className="w-2 h-2 rounded-full bg-[#d4af37]/60" />
              <div className="w-2 h-2 rounded-full bg-[#c28585]/60" />
              <div className="w-2 h-2 rounded-full bg-[#d4af37]/60" />
              <div className="w-2 h-2 rounded-full bg-[#c28585]/60" />
              <div className="w-2 h-2 rounded-full bg-[#d4af37]/60" />
            </div>

            {/* Bottom Tier */}
            <div className="w-60 sm:w-76 h-16 bg-gradient-to-b from-[#221c30] to-[#14121d] rounded-b-2xl border border-[#d4af37]/40 shadow-2xl flex items-center justify-center relative">
              <span className="font-display tracking-[0.25em] text-xs text-[#d4af37] font-semibold opacity-90">
                VANSHIKA
              </span>
            </div>

            {/* Golden Plate */}
            <div className="w-72 sm:w-92 h-3 bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent rounded-full mt-1 blur-[0.5px]" />
          </div>

        </div>

        {/* Action Button: BLOW OUT THE CANDLE */}
        {!isBlown ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-4"
          >
            <button
              onClick={handleBlowCandle}
              className="group px-8 py-4 rounded-full bg-gradient-to-r from-[#d4af37] via-[#ffaa40] to-[#d4af37] text-black font-semibold text-base uppercase tracking-wider shadow-[0_0_35px_rgba(255,170,64,0.4)] hover:scale-105 transition-all cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span>🕯️ BLOW OUT THE CANDLE</span>
              </span>
            </button>
            <p className="text-[11px] text-white/40 mt-3 font-mono">
              (Click or tap to make your wish come true)
            </p>
          </motion.div>
        ) : (
          /* Climax Wish Reveal Message */
          <AnimatePresence>
            {showCelebration && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="p-8 sm:p-10 rounded-3xl glass-panel-gold border border-[#d4af37]/50 shadow-[0_0_50px_rgba(212,175,55,0.2)] space-y-6"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-[#d4af37]/20 border border-[#d4af37]/60 flex items-center justify-center text-[#d4af37]">
                  <PartyPopper className="w-6 h-6 animate-bounce" />
                </div>

                <div className="space-y-4">
                  <h3 className="font-serif text-2xl sm:text-4xl text-[#f4efe6] font-normal leading-snug">
                    “I hope this year gives you reasons to smile that you haven't even imagined yet.”
                  </h3>
                  <p className="font-handwriting text-2xl sm:text-3xl text-[#d4af37]">
                    “And I hope I get to be there for some of them.”
                  </p>
                </div>

                <div className="pt-4 flex justify-center gap-4">
                  <button
                    onClick={handleRelight}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Relight Candle 🕯️
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

      </div>
    </section>
  );
}
