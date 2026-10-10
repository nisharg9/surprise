import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function ScreenEmotionalTurn() {
  const lines = [
    { text: "Okay…", style: "font-serif text-2xl sm:text-3xl text-white/50 italic mb-4" },
    { text: "Jokes aside.", style: "font-sans text-xs sm:text-sm uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-12" },
    { text: "We don't share the same blood.", style: "font-serif text-2xl sm:text-4xl text-[#f4efe6] font-normal" },
    { text: "We don't share the same home.", style: "font-serif text-2xl sm:text-4xl text-[#f4efe6] font-normal" },
    { text: "But somewhere between all the conversations…", style: "font-serif text-xl sm:text-3xl text-[#e2d9cc]/80 italic mt-8" },
    { text: "All the stupid moments…", style: "font-serif text-xl sm:text-3xl text-[#e2d9cc]/80 italic" },
    { text: "All the fights…", style: "font-serif text-xl sm:text-3xl text-[#e2d9cc]/80 italic" },
    { text: "All the laughs…", style: "font-serif text-xl sm:text-3xl text-[#e2d9cc]/80 italic" },
    { text: "You became family.", style: "font-serif text-3xl sm:text-6xl text-[#d4af37] font-medium tracking-wide mt-10" },
    { text: "And I'm genuinely grateful for that.", style: "font-handwriting text-3xl sm:text-4xl text-[#c28585] mt-6" }
  ];

  return (
    <section id="emotional" className="py-32 sm:py-48 px-4 sm:px-6 relative bg-[#070709] text-center select-none overflow-hidden">
      
      {/* Deep subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 relative z-10">
        
        <div className="w-12 h-12 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#c28585] mb-10">
          <Heart className="w-5 h-5 fill-[#c28585]/20" />
        </div>

        {lines.map((line, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <p className={line.style}>
              {line.text}
            </p>
          </motion.div>
        ))}

      </div>
    </section>
  );
}
