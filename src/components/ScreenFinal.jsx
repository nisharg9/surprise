import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import AestheticImage from './AestheticImage';
import { siteConfig } from '../data/config';
import { soundEngine } from '../utils/audioEngine';

export default function ScreenFinal({ onReplay }) {
  const handleReplayClick = () => {
    soundEngine.playEnvelopeOpen();
    onReplay();
  };

  return (
    <section id="final" className="min-h-screen py-24 px-4 sm:px-6 relative flex flex-col items-center justify-center text-center select-none overflow-hidden bg-[#060608]">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-t from-[#c28585]/10 via-[#d4af37]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl w-full mx-auto space-y-8 z-10">
        
        {/* Highlight Framed Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative inline-block"
        >
          <div className="p-4 pb-12 bg-[#18171f] rounded-xl border border-white/15 polaroid-shadow max-w-xs sm:max-w-sm mx-auto transform rotate-1 hover:rotate-0 transition-transform duration-500">
            {/* Washi tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape rounded-xs z-20 pointer-events-none opacity-80" />

            <AestheticImage
              src={siteConfig.finalImage}
              alt="Vanshika Final Highlight"
              aspectRatio="aspect-[4/5]"
              objectPosition="center 18%"
              fallbackTitle="Forever Family"
              fallbackSubtitle="My Sister From Another Mother"
              className="rounded-lg shadow-inner"
            />

            <div className="mt-3 text-center">
              <span className="font-handwriting text-xl text-[#e2d9cc]">
                Forever my sister ❤️
              </span>
            </div>
          </div>
        </motion.div>

        {/* Narrative Text */}
        <div className="space-y-4 max-w-xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl sm:text-5xl text-[#f4efe6] font-normal"
          >
            Happy Birthday, {siteConfig.recipientName}.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.9 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-2 text-sm sm:text-base text-white/70 font-sans font-light"
          >
            <p>You're not my sister because we're related.</p>
            <p>You're my sister because somewhere along the way…</p>
            <p className="italic text-[#e2d9cc]">…you became family.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="pt-2"
          >
            <h3 className="font-serif text-2xl sm:text-4xl text-[#d4af37] font-semibold">
              {siteConfig.subtitle} ❤️
            </h3>
            <p className="text-xs uppercase tracking-widest text-[#c28585] mt-2 font-mono">
              Chapter {siteConfig.chapterAge} begins now.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="font-serif italic text-base text-white/50 pt-4"
          >
            “See you in the next memory.”
          </motion.p>
        </div>

        {/* Replay Story Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="pt-6"
        >
          <button
            onClick={handleReplayClick}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs uppercase tracking-widest text-[#d4af37] font-semibold transition-all hover:scale-105 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>REPLAY OUR STORY ↻</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
