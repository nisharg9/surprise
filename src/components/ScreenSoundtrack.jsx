import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause, SkipForward, SkipBack, Disc, Heart, Upload, Sparkles, Repeat } from 'lucide-react';
import { soundtrack } from '../data/songs';
import { soundEngine } from '../utils/audioEngine';

export default function ScreenSoundtrack({ onUnlockSecret, isSecretUnlocked, isAudioPlaying, setIsAudioPlaying }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(soundEngine.currentTrackIndex || 0);
  const [customTrackName, setCustomTrackName] = useState(null);

  // Sync with audio engine when songs automatically advance
  useEffect(() => {
    soundEngine.setOnTrackChange((newIdx) => {
      setCurrentTrackIndex(newIdx);
      setCustomTrackName(null);
    });
  }, []);

  const track = soundtrack[currentTrackIndex] || soundtrack[0];

  const handleTogglePlay = () => {
    if (isAudioPlaying) {
      soundEngine.stopBackgroundMusic();
      setIsAudioPlaying(false);
    } else {
      soundEngine.playTrackAtIndex(currentTrackIndex);
      setIsAudioPlaying(true);
    }
  };

  const handleSelectTrack = (idx) => {
    setCustomTrackName(null);
    soundEngine.playEnvelopeOpen();
    soundEngine.playTrackAtIndex(idx);
    setIsAudioPlaying(true);
  };

  const handleNext = () => {
    setCustomTrackName(null);
    soundEngine.playNextTrack();
    setIsAudioPlaying(true);
  };

  const handlePrev = () => {
    setCustomTrackName(null);
    soundEngine.playPrevTrack();
    setIsAudioPlaying(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomTrackName(file.name);
      soundEngine.startBackgroundMusic(url);
      setIsAudioPlaying(true);
      soundEngine.playSecretUnlocked();
    }
  };

  return (
    <section id="soundtrack" className="py-24 px-4 sm:px-6 max-w-5xl mx-auto relative select-none">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#845ec2]/10 border border-[#845ec2]/30 text-xs uppercase tracking-widest text-[#845ec2]">
          <Music className="w-3.5 h-3.5" />
          <span>Chapter 05 • Background Anthem</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe6] font-normal">
          Our Soundtrack
        </h2>
        <p className="text-sm sm:text-base text-white/60 font-sans font-light">
          Featuring <span className="text-[#d4af37] font-medium">“Tenu Sang Rakhna”</span>, <span className="text-[#d4af37] font-medium">“Iktara”</span>, and <span className="text-[#d4af37] font-medium">“Die With A Smile”</span> in a continuous, auto-cycling memory playlist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Vintage Cassette Player Deck (7 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1b1924] to-[#111016] border border-white/15 shadow-2xl relative overflow-hidden"
        >
          {/* Cassette Shell Visual */}
          <div className="w-full bg-[#201d2a] rounded-2xl p-6 border border-white/10 shadow-inner relative">
            
            {/* Cassette Header Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-xs font-mono text-white/50">
              <span className="flex items-center gap-1.5 text-[#d4af37]">
                <Disc className="w-4 h-4" /> CASSETTE TAPE • VINTAGE STEREO
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#d4af37] bg-[#d4af37]/15 px-2 py-0.5 rounded border border-[#d4af37]/30 flex items-center gap-1" title="Songs will automatically cycle when finished">
                  <Repeat className="w-2.5 h-2.5" />
                  <span>CYCLE ON</span>
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  {isAudioPlaying ? 'PLAYING NOW' : 'READY'}
                </span>
              </div>
            </div>

            {/* Cassette Window & Spools */}
            <div className="w-full h-32 sm:h-40 bg-[#121118] rounded-xl border border-white/10 p-4 flex items-center justify-around relative">
              
              {/* Left Spool */}
              <div className="relative flex items-center justify-center">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-dashed border-white/20 flex items-center justify-center transition-all ${isAudioPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}>
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/30" />
                </div>
              </div>

              {/* Center Secret Easter Egg Trigger */}
              <button
                onClick={() => onUnlockSecret('secret-cassette-heart')}
                title="Tap center spool for a secret track..."
                className="group p-3 rounded-full bg-white/5 hover:bg-[#d4af37]/20 border border-white/10 hover:border-[#d4af37] transition-all cursor-pointer"
              >
                <Heart className={`w-5 h-5 transition-transform group-hover:scale-125 ${isSecretUnlocked ? 'text-[#d4af37] fill-[#d4af37]' : 'text-white/40'}`} />
                <span className="sr-only">Secret Track</span>
              </button>

              {/* Right Spool */}
              <div className="relative flex items-center justify-center">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-dashed border-white/20 flex items-center justify-center transition-all ${isAudioPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}>
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/30" />
                </div>
              </div>

              {/* Tape counter */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] text-[#d4af37] px-2 py-0.5 rounded bg-black/60 border border-white/10">
                0{currentTrackIndex + 1} : {isAudioPlaying ? 'PLAY' : 'STOP'}
              </div>
            </div>

            {/* Current Track Label on Cassette */}
            <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
              <h4 className="font-serif text-lg sm:text-xl text-[#f4efe6] font-medium truncate">
                {customTrackName || track.title}
              </h4>
              <p className="text-xs text-[#c9a875] font-sans mt-0.5">
                {customTrackName ? 'Custom Audio File' : track.artist}
              </p>
            </div>
          </div>

          {/* Player Controls Bar */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/60 font-mono">
                {track.vibe}
              </span>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Previous Track"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleTogglePlay(track)}
                className="p-4 rounded-full bg-[#d4af37] hover:bg-[#e0a96d] text-black font-bold shadow-lg transition-transform hover:scale-105 cursor-pointer"
                aria-label={isAudioPlaying ? "Pause" : "Play"}
              >
                {isAudioPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
              </button>

              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Next Track"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* File upload option */}
            <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
              <label
                htmlFor="custom-audio-upload"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer border border-white/10 text-[11px]"
                title="Upload MP3 from your computer"
              >
                <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Load MP3</span>
              </label>
              <input
                id="custom-audio-upload"
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        </motion.div>

        {/* Right: Track List & Personal Notes (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl glass-panel border border-white/10">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-mono mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Special Meaning</span>
            </div>
            <h3 className="font-serif text-xl text-[#f4efe6] mb-1">
              Why this song reminds me of you:
            </h3>
            <p className="font-handwriting text-xl text-[#c28585] leading-relaxed mt-3">
              “{track.note}”
            </p>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-white/40 px-2">
              Memory Playlist
            </span>
            <div className="space-y-1.5 mt-2">
              {soundtrack.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectTrack(idx)}
                  className={`w-full p-3 rounded-xl text-left transition-all flex items-center justify-between cursor-pointer ${
                    currentTrackIndex === idx
                      ? 'bg-white/10 border border-[#d4af37]/40 text-[#d4af37]'
                      : 'hover:bg-white/5 text-white/70 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-white/40">0{idx + 1}</span>
                    <div>
                      <p className="text-sm font-medium leading-tight">{item.title}</p>
                      <p className="text-xs text-white/40">{item.artist}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-white/40">{item.duration}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
