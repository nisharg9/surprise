import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, Star } from 'lucide-react';
import AestheticImage from './AestheticImage';
import { siteConfig } from '../data/config';

export default function ScreenHero({ onUnlockSecret, isSecretUnlocked }) {
  return (
    <section id="hero" className="min-h-screen relative flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#d4af37]/10 via-[#c28585]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Secret Easter Egg #1: Hidden Star in Constellation */}
      <div className="absolute top-24 right-8 sm:right-20 z-20">
        <button
          onClick={() => onUnlockSecret('secret-hero-star')}
          title="A mysterious star in the sky..."
          className="group relative p-2 text-[#d4af37]/40 hover:text-[#d4af37] transition-all hover:scale-125 cursor-pointer"
        >
          <Star className={`w-4 h-4 transition-all duration-500 ${isSecretUnlocked ? 'text-[#d4af37] fill-[#d4af37]/40 drop-shadow-[0_0_8px_#d4af37]' : 'animate-pulse'}`} />
          <span className="sr-only">Secret Star</span>
        </button>
      </div>

      <div className="max-w-4xl w-full flex flex-col items-center text-center z-10 space-y-8">
        
        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-[#d4af37]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Chapter {siteConfig.chapterAge} • Birthday Edition</span>
        </motion.div>

        {/* Main Title Headings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-2"
        >
          <h2 className="font-sans text-xs sm:text-sm uppercase tracking-[0.35em] text-white/50">
            Happy Birthday
          </h2>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl text-[#f4efe6] font-normal tracking-tight">
            {siteConfig.recipientName}
          </h1>
          <p className="font-handwriting text-2xl sm:text-3xl md:text-4xl text-[#c28585] pt-1">
            “{siteConfig.subtitle}”
          </p>
        </motion.div>

        {/* Cinematic Polaroid Frame Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mt-4"
        >
          {/* Polaroid Frame */}
          <div className="p-3.5 sm:p-4 pb-12 sm:pb-14 bg-[#18171f] rounded-xl border border-white/10 polaroid-shadow transform -rotate-1 hover:rotate-0 transition-transform duration-500 max-w-xs sm:max-w-sm">
            {/* Washi tape on top */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape rounded-xs z-20 pointer-events-none opacity-85 rotate-1" />

            <AestheticImage
              src={siteConfig.heroImage}
              alt="Vanshika Hero Portrait"
              aspectRatio="aspect-[4/5]"
              objectPosition="center 18%"
              fallbackTitle="Vanshika"
              fallbackSubtitle="Portrait / Hero Photo"
              className="rounded-lg shadow-inner"
            />

            {/* Handwritten Polaroid Caption */}
            <div className="mt-3 text-center">
              <span className="font-handwriting text-xl text-[#e2d9cc]">
                The one and only sister ❤️
              </span>
            </div>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-lg text-sm sm:text-base text-[#e2d9cc]/70 font-serif italic"
        >
          “{siteConfig.themeQuote}”
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-6 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => {
            const el = document.getElementById('story');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-sans font-light">
            there's a whole story waiting ↓
          </span>
          <ChevronDown className="w-4 h-4 text-[#d4af37] animate-bounce" />
        </motion.div>

      </div>
    </section>
  );
}
