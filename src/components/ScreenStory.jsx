import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, BookOpen, Sparkles } from 'lucide-react';
import AestheticImage from './AestheticImage';
import { timelineMemories } from '../data/memories';

export default function ScreenStory({ onUnlockSecret, isSecretUnlocked }) {
  return (
    <section id="story" className="py-24 px-4 sm:px-6 max-w-5xl mx-auto relative">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs uppercase tracking-widest text-[#d4af37]">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Chapter 01 • The Timeline</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe6] font-normal">
          How did you become my sister?
        </h2>
        <p className="text-sm sm:text-base text-white/60 font-sans font-light">
          It didn't happen in a single day. It happened across a thousand small, chaotic, unforgettable moments.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        
        {/* Central Vertical Glowing Line (desktop) */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#d4af37]/40 to-transparent" />
        
        {/* Left Vertical Line (mobile) */}
        <div className="md:hidden absolute top-0 bottom-0 left-4 w-[1px] bg-gradient-to-b from-transparent via-[#d4af37]/40 to-transparent" />

        <div className="space-y-16 sm:space-y-24">
          {timelineMemories.map((item, index) => {
            const isEven = index % 2 === 0;
            const isSecretItem = index === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline node icon */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#17161b] border-2 border-[#d4af37] flex items-center justify-center z-10 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                  <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
                </div>

                {/* Content Card */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                  <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 hover:border-[#d4af37]/30 transition-colors relative overflow-hidden group">
                    
                    {/* Top Metadata */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-[11px] font-mono text-[#d4af37] uppercase tracking-wider">
                        {item.year}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-white/50">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.date}</span>
                      </div>
                    </div>

                    {/* Title & Caption */}
                    <h3 className="font-serif text-2xl text-[#f4efe6] font-semibold mb-2 group-hover:text-[#d4af37] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-handwriting text-lg text-[#c28585] mb-4">
                      {item.caption}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-white/70 leading-relaxed font-sans font-light mb-4">
                      {item.description}
                    </p>

                    {/* Quote / Footer */}
                    {item.quote && (
                      <div className="pt-3 border-t border-white/5 text-xs font-serif italic text-white/50">
                        {item.quote}
                      </div>
                    )}

                    {/* Location Badge */}
                    {item.location && (
                      <div className="mt-3 inline-flex items-center gap-1 text-[11px] text-[#c9a875]/80 font-mono">
                        <MapPin className="w-3 h-3 text-[#d4af37]" />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Photo Side */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8 flex justify-center">
                  <div className="w-full max-w-sm p-3.5 pb-8 bg-[#18171f] rounded-xl border border-white/10 polaroid-shadow transform hover:scale-[1.02] transition-transform duration-300 relative">
                    
                    {/* Secret trigger on the first polaroid corner */}
                    {isSecretItem && onUnlockSecret && (
                      <button
                        onClick={() => onUnlockSecret('secret-polaroid-corner')}
                        title="A curious corner on this photo..."
                        className={`absolute -top-3 right-3 z-30 p-1.5 rounded-full bg-black/60 text-[10px] text-[#d4af37]/60 hover:text-[#d4af37] transition-all cursor-pointer ${
                          isSecretUnlocked ? 'text-[#d4af37]' : 'animate-pulse'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <AestheticImage
                      src={item.image}
                      alt={item.title}
                      aspectRatio="aspect-[4/5]"
                      objectPosition="center 20%"
                      fallbackTitle={item.title}
                      fallbackSubtitle={item.tag}
                      className="rounded-lg shadow-inner"
                    />
                    <div className="mt-2.5 text-center">
                      <span className="font-handwriting text-base text-[#e2d9cc]/80">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
