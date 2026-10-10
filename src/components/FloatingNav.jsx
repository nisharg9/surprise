import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Compass } from 'lucide-react';
import { soundEngine } from '../utils/audioEngine';
import { chapters } from '../data/chapters';

export default function FloatingNav({ currentChapter, onSelectChapter, secretsFound = [], totalSecrets = 5, isAudioPlaying, setIsAudioPlaying }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const playing = soundEngine.toggleAmbientMusic();
    setIsAudioPlaying(playing);
  };

  const handleNavClick = (id) => {
    onSelectChapter(id);
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/5 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#d4af37] via-[#c28585] to-[#e0a96d] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Bottom / Top-Right Capsule Controls */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-fit px-3 py-2 rounded-full glass-panel border border-white/10 shadow-2xl flex items-center gap-2 md:gap-3 transition-all">
        
        {/* Chapter Switcher Menu Button */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs text-[#f4efe6] font-medium transition-colors cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="hidden sm:inline">Chapter:</span>
            <span className="text-[#d4af37] uppercase tracking-wider font-semibold">
              {chapters.find(c => c.id === currentChapter)?.label || 'Story'}
            </span>
          </button>

          {/* Expanded Chapter Drawer */}
          {isMenuOpen && (
            <div className="absolute bottom-12 left-0 w-48 py-2 bg-[#17151e] border border-white/10 rounded-xl shadow-2xl z-50 backdrop-blur-xl animate-in fade-in zoom-in-95">
              <div className="px-3 py-1 text-[10px] uppercase tracking-widest text-white/40 font-semibold border-b border-white/5 mb-1">
                Chapters
              </div>
              <div className="max-h-60 overflow-y-auto">
                {chapters.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => handleNavClick(ch.id)}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      currentChapter === ch.id
                        ? 'text-[#d4af37] font-semibold bg-white/5'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{ch.label}</span>
                    {currentChapter === ch.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Easter Egg Counter */}
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/5 text-xs text-white/70">
          <Sparkles className="w-3 h-3 text-[#d4af37]" />
          <span className="font-mono text-[11px] text-[#f4efe6]">
            {secretsFound.length}/{totalSecrets}
          </span>
        </div>

        {/* Audio Toggle */}
        <button
          onClick={toggleSound}
          title={isAudioPlaying ? "Mute ambient music" : "Play ambient music"}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
            isAudioPlaying
              ? 'bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40 shadow-[0_0_15px_rgba(212,175,55,0.2)]'
              : 'bg-white/5 text-white/60 hover:text-white'
          }`}
        >
          {isAudioPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 animate-pulse" />
              {/* Animated Equalizer */}
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 h-full bg-[#d4af37] animate-pulse" />
                <span className="w-0.5 h-2 bg-[#d4af37] animate-pulse delay-75" />
                <span className="w-0.5 h-3 bg-[#d4af37] animate-pulse delay-150" />
              </div>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">Audio Off</span>
            </>
          )}
        </button>
      </nav>
    </>
  );
}
