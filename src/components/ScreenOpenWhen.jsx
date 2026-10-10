import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MailOpen, X, Sparkles, Heart } from 'lucide-react';
import { openWhenLetters } from '../data/openWhen';
import { soundEngine } from '../utils/audioEngine';

export default function ScreenOpenWhen() {
  const [openedEnvelope, setOpenedEnvelope] = useState(null);

  const handleOpen = (item) => {
    soundEngine.playEnvelopeOpen();
    setOpenedEnvelope(item);
  };

  const handleClose = () => {
    setOpenedEnvelope(null);
  };

  return (
    <section id="open-when" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto relative select-none">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs uppercase tracking-widest text-[#d4af37]">
          <Mail className="w-3.5 h-3.5" />
          <span>Chapter 06 • Time Capsules</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe6] font-normal">
          Open When…
        </h2>
        <p className="text-sm sm:text-base text-white/60 font-sans font-light">
          Five letters sealed for specific days in the future. Click an envelope whenever you need it.
        </p>
      </div>

      {/* 5 Physical Looking Envelope Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {openWhenLetters.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onClick={() => handleOpen(item)}
            className={`p-6 rounded-2xl bg-gradient-to-br ${item.color} border shadow-xl cursor-pointer relative overflow-hidden group transition-all`}
          >
            {/* Wax Seal / Stamp Accent */}
            <div
              className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
              style={{ backgroundColor: item.sealColor }}
            >
              <Heart className="w-4 h-4 text-white/90 fill-white/20" />
            </div>

            {/* Envelope Visual Shape */}
            <div className="text-3xl mb-4">{item.icon}</div>

            <h3 className="font-serif text-xl sm:text-2xl text-[#f4efe6] font-medium mb-2 group-hover:text-[#d4af37] transition-colors">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-white/60 font-sans font-light mb-6">
              {item.subtitle}
            </p>

            {/* Action prompt */}
            <div className="inline-flex items-center gap-1.5 text-xs text-[#d4af37] font-medium group-hover:underline">
              <MailOpen className="w-3.5 h-3.5" />
              <span>Tap to unseal envelope</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Envelope Modal Reveal */}
      <AnimatePresence>
        {openedEnvelope && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Letter Sheet Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="relative max-w-xl w-full bg-[#f7f3eb] text-[#2c2621] rounded-2xl p-6 sm:p-10 shadow-2xl z-10 letter-paper border border-[#ded5c5] max-h-[88vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full text-[#2c2621]/60 hover:text-[#2c2621] hover:bg-black/5 transition-colors cursor-pointer"
                aria-label="Close message"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{openedEnvelope.icon}</span>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#8e4a49]">
                    Personal Time Capsule
                  </span>
                  <h3 className="font-serif text-2xl text-[#1a1714] font-semibold">
                    {openedEnvelope.title}
                  </h3>
                </div>
              </div>

              {/* Message Content */}
              <div className="p-5 rounded-xl bg-white/60 border border-[#2c2621]/10 space-y-3 mb-6">
                <h4 className="font-serif text-lg font-medium text-[#1a1714]">
                  {openedEnvelope.message.heading}
                </h4>
                {openedEnvelope.message.text.map((t, idx) => (
                  <p key={idx} className="font-sans text-sm sm:text-base text-[#2c2621]/80 leading-relaxed font-light">
                    {t}
                  </p>
                ))}
              </div>

              {/* Footnote */}
              {openedEnvelope.message.footnote && (
                <div className="text-center">
                  <p className="font-handwriting text-xl text-[#8e4a49]">
                    “{openedEnvelope.message.footnote}”
                  </p>
                </div>
              )}

              {/* Close prompt */}
              <button
                onClick={handleClose}
                className="w-full mt-6 py-2.5 rounded-xl bg-[#2c2621] text-[#f7f3eb] text-sm font-medium hover:bg-black transition-colors cursor-pointer"
              >
                Fold and Seal Back
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
