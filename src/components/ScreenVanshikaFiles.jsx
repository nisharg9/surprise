import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Flame, ShieldAlert, FolderArchive, Check } from 'lucide-react';
import AestheticImage from './AestheticImage';
import { vanshikaStats, thingsSheWillDeny, evidenceMemes } from '../data/vanshikaFiles';
import { soundEngine } from '../utils/audioEngine';

export default function ScreenVanshikaFiles() {
  const [deniedList, setDeniedList] = useState(thingsSheWillDeny.map((_, i) => i === 0));

  const toggleDeny = (index) => {
    soundEngine.playCheckSparkle();
    setDeniedList(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <section id="files" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto relative select-none">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e26d5c]/10 border border-[#e26d5c]/30 text-xs uppercase tracking-widest text-[#e26d5c]">
          <FolderArchive className="w-3.5 h-3.5" />
          <span>Chapter 03 • Declassified Dossier</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe6] font-normal">
          The Vanshika Files
        </h2>
        <p className="text-sm sm:text-base text-white/60 font-sans font-light">
          An unscientific, 100% accurate psychological breakdown of our friendship.
        </p>
      </div>

      {/* Grid of dossier cards */}
      <div className="space-y-8">
        
        {/* Row 1: Metrics & Denials Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: Behavioral Metrics (Progress Bars) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <Flame className="w-5 h-5 text-[#e0a96d]" />
                  <h3 className="font-serif text-xl sm:text-2xl text-[#f4efe6]">
                    Things Vanshika Does
                  </h3>
                </div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-white/40 px-2 py-0.5 rounded bg-white/5">
                  Official Metrics
                </span>
              </div>

              <div className="space-y-5">
                {vanshikaStats.map((stat, i) => {
                  const displayVal = Math.min(stat.value, 100);
                  return (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-white/80 font-medium">{stat.label}</span>
                        <span className="font-mono text-[#d4af37] font-semibold">{stat.value}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden p-0.5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${displayVal}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                          className={`h-full rounded-full ${stat.color}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Card 2: Things She Will Deny */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <ShieldAlert className="w-5 h-5 text-[#d4af37]" />
                  <h3 className="font-serif text-xl sm:text-2xl text-[#f4efe6]">
                    Things She Will Deny
                  </h3>
                </div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#d4af37] px-2 py-0.5 rounded bg-[#d4af37]/10 border border-[#d4af37]/20">
                  High Probability of Denial
                </span>
              </div>

              <div className="space-y-3">
                {thingsSheWillDeny.map((item, i) => {
                  const isChecked = deniedList[i];
                  return (
                    <div
                      key={i}
                      onClick={() => toggleDeny(i)}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <div
                        className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-all shrink-0 ${
                          isChecked
                            ? 'bg-[#d4af37] border-[#d4af37] text-black'
                            : 'border-white/30 bg-transparent'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm ${isChecked ? 'line-through text-white/40' : 'text-white/80'}`}>
                          {item}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <p className="mt-4 text-[11px] text-white/40 text-center font-mono">
              (Click any item to confirm Vanshika's denial)
            </p>
          </motion.div>

        </div>

        {/* Row 2: Photographic Evidence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-[#e26d5c]" />
              <h3 className="font-serif text-xl sm:text-2xl text-[#f4efe6]">
                Confidential Evidence
              </h3>
            </div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#e26d5c] px-2 py-0.5 rounded bg-[#e26d5c]/10 border border-[#e26d5c]/20">
              Blackmail Material
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {evidenceMemes.map((ev) => (
              <div
                key={ev.id}
                className="p-4 bg-[#18171f] rounded-xl border border-white/10 polaroid-shadow flex flex-col items-center"
              >
                <AestheticImage
                  src={ev.image}
                  alt={ev.title}
                  aspectRatio="aspect-[4/5] sm:aspect-[3/4]"
                  objectPosition={ev.objectPosition || "center center"}
                  objectFit={ev.objectFit || "cover"}
                  fallbackTitle={ev.title}
                  fallbackSubtitle="Meme Evidence"
                  className="rounded-lg w-full shadow-inner"
                />
                <div className="mt-3 text-center">
                  <h4 className="font-serif text-base font-semibold text-[#f4efe6]">
                    {ev.title}
                  </h4>
                  <p className="font-handwriting text-base text-[#e2d9cc]/80 mt-1">
                    {ev.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
