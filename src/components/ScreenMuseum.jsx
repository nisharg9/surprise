import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Camera, X, Calendar, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import AestheticImage from './AestheticImage';
import { polaroidPhotos } from '../data/gallery';
import { soundEngine } from '../utils/audioEngine';

export default function ScreenMuseum({ onUnlockSecret, isSecretUnlocked }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const openModal = (photo) => {
    soundEngine.playEnvelopeOpen();
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const handleNext = () => {
    if (!selectedPhoto) return;
    const currentIndex = polaroidPhotos.findIndex(p => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % polaroidPhotos.length;
    setSelectedPhoto(polaroidPhotos[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedPhoto) return;
    const currentIndex = polaroidPhotos.findIndex(p => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + polaroidPhotos.length) % polaroidPhotos.length;
    setSelectedPhoto(polaroidPhotos[prevIndex]);
  };

  return (
    <section id="museum" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto relative select-none">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c28585]/10 border border-[#c28585]/30 text-xs uppercase tracking-widest text-[#c28585]">
          <Camera className="w-3.5 h-3.5" />
          <span>Chapter 02 • Scrapbook Archive</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe6] font-normal">
          Our Little Museum
        </h2>
        <p className="text-sm sm:text-base text-white/60 font-sans font-light">
          Ordinary moments that somehow became core memories. Click any polaroid to see the full photo and story.
        </p>
      </div>

      {/* Scattered Polaroid Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {polaroidPhotos.map((item, index) => {
          // Secret Easter Egg #2 hidden in photo index 1 (or 0)
          const isSecretItem = index === 1;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
              style={{ transform: `rotate(${item.rotation}deg)` }}
              className="relative p-3.5 sm:p-4 pb-10 sm:pb-12 bg-[#18171f] rounded-xl border border-white/10 polaroid-shadow cursor-pointer transition-all group"
              onClick={() => openModal(item)}
            >
              {/* Washi Tape */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 washi-tape rounded-xs z-20 pointer-events-none opacity-80"
                style={{ transform: `translateX(-50%) rotate(${item.rotation * -0.8}deg)` }}
              />

              {/* Secret Easter Egg #2 trigger on tape corner */}
              {isSecretItem && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onUnlockSecret('secret-polaroid-corner');
                  }}
                  title="A curious corner of tape..."
                  className={`absolute -top-3 right-4 z-30 p-1 text-[10px] text-[#d4af37]/60 hover:text-[#d4af37] transition-all cursor-pointer ${
                    isSecretUnlocked ? 'text-[#d4af37]' : 'animate-pulse'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Photo Frame - Optimized Aspect Ratio (3/4) & Centered Face Focus */}
              <div className="relative overflow-hidden rounded-lg">
                <AestheticImage
                  src={item.image}
                  alt={item.title}
                  aspectRatio="aspect-[3/4]"
                  objectPosition={item.objectPosition || "center 20%"}
                  fallbackTitle={item.title}
                  fallbackSubtitle={item.date}
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded-full bg-black/70 text-xs text-white flex items-center gap-1.5 backdrop-blur-md border border-white/10">
                    <Eye className="w-3.5 h-3.5 text-[#d4af37]" /> View Full Photo
                  </span>
                </div>
              </div>

              {/* Handwritten Caption */}
              <div className="mt-3.5 text-center px-1">
                <h4 className="font-handwriting text-xl text-[#f4efe6] font-normal leading-tight group-hover:text-[#d4af37] transition-colors">
                  {item.caption}
                </h4>
                <div className="flex items-center justify-center gap-2 mt-1.5 text-[11px] text-white/40 font-mono">
                  <span>{item.date}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Fullscreen Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-3xl w-full bg-[#16151c] border border-white/15 rounded-2xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/70 text-white/80 hover:text-white hover:bg-black transition-colors cursor-pointer border border-white/10"
                aria-label="Close photo"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/70 text-white/80 hover:text-white hover:bg-black transition-colors cursor-pointer border border-white/10"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/70 text-white/80 hover:text-white hover:bg-black transition-colors cursor-pointer border border-white/10"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Full Unclipped Photo Area */}
              <div className="relative bg-[#0d0c10] flex items-center justify-center p-4 sm:p-6 overflow-hidden min-h-[280px] sm:min-h-[380px]">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="max-h-[50vh] sm:max-h-[55vh] w-auto max-w-full object-contain rounded-lg photo-grade-cinematic shadow-2xl"
                />
              </div>

              {/* Story Description Container */}
              <div className="p-6 sm:p-8 space-y-4 overflow-y-auto bg-[#16151c] border-t border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-serif text-2xl text-[#f4efe6] font-semibold">
                    {selectedPhoto.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#d4af37] font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{selectedPhoto.date}</span>
                  </div>
                </div>

                <p className="font-handwriting text-xl text-[#c28585]">
                  “{selectedPhoto.caption}”
                </p>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans font-light">
                    {selectedPhoto.story}
                  </p>
                </div>

                {/* Tags */}
                {selectedPhoto.tags && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {selectedPhoto.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
