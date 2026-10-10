import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Sparkles, Plus, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';
import { defaultFutureBucketList } from '../data/futureMemories';
import { soundEngine } from '../utils/audioEngine';

export default function ScreenFuture() {
  const [list, setList] = useState(() => {
    try {
      const saved = localStorage.getItem('vanshika_future_list');
      return saved ? JSON.parse(saved) : defaultFutureBucketList;
    } catch {
      return defaultFutureBucketList;
    }
  });

  const [customGoal, setCustomGoal] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('vanshika_future_list', JSON.stringify(list));
    } catch (e) {
      console.warn("localStorage error:", e);
    }
  }, [list]);

  const toggleItem = (id) => {
    soundEngine.playCheckSparkle();

    setList(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextState = !item.completed;
          if (nextState) {
            // Little sparkle confetti for checking a memory off
            confetti({
              particleCount: 25,
              spread: 50,
              origin: { y: 0.7 },
              colors: ['#d4af37', '#e0a96d', '#f4efe6'],
              disableForReducedMotion: true
            });
          }
          return { ...item, completed: nextState };
        }
        return item;
      })
    );
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customGoal.trim()) return;
    const newItem = {
      id: `custom-${Date.now()}`,
      text: customGoal.trim(),
      completed: false
    };
    setList([...list, newItem]);
    setCustomGoal('');
    soundEngine.playEnvelopeOpen();
  };

  const completedCount = list.filter(i => i.completed).length;

  return (
    <section id="future" className="py-24 px-4 sm:px-6 max-w-4xl mx-auto relative select-none">
      
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs uppercase tracking-widest text-[#d4af37]">
          <Compass className="w-3.5 h-3.5" />
          <span>Chapter 07 • Next Chapters</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe6] font-normal">
          We're not done yet.
        </h2>
        <p className="text-sm sm:text-base text-white/60 font-sans font-light">
          A pact for all the memories, trips, and chaos still waiting ahead of us.
        </p>
      </div>

      {/* Checklist Container */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="p-6 sm:p-10 rounded-2xl glass-panel border border-white/10 relative overflow-hidden"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Sisterhood Bucket List
          </span>
          <span className="font-mono text-xs text-white/60">
            {completedCount} of {list.length} Unlocked
          </span>
        </div>

        {/* Checklist Items */}
        <div className="space-y-3">
          {list.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                item.completed
                  ? 'bg-[#d4af37]/10 border-[#d4af37]/30 text-[#f4efe6]'
                  : 'bg-white/5 border-white/5 hover:border-white/20 text-white/80'
              }`}
            >
              <div className="shrink-0">
                {item.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37] animate-in zoom-in-50" />
                ) : (
                  <Circle className="w-5 h-5 text-white/30" />
                )}
              </div>
              <span className={`text-sm sm:text-base flex-1 font-sans ${item.completed ? 'line-through text-white/50' : ''}`}>
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* Add custom goal form */}
        <form onSubmit={handleAddCustom} className="mt-6 pt-6 border-t border-white/10 flex gap-2">
          <input
            type="text"
            value={customGoal}
            onChange={(e) => setCustomGoal(e.target.value)}
            placeholder="Add a new memory to unlock together..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-[#f4efe6] placeholder-white/30 focus:outline-none focus:border-[#d4af37]/50"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-[#d4af37] text-black text-xs font-semibold uppercase tracking-wider hover:bg-[#e0a96d] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </form>

        {/* Bottom Epilogue Quote */}
        <div className="mt-10 pt-8 border-t border-white/10 text-center space-y-2">
          <p className="font-serif text-lg sm:text-xl text-[#f4efe6]">
            “This website isn't finished.”
          </p>
          <p className="font-handwriting text-2xl text-[#c28585]">
            “Because we're not finished making memories.”
          </p>
        </div>

      </motion.div>
    </section>
  );
}
