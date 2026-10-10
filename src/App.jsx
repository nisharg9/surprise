import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScreenIntro from './components/ScreenIntro';
import ScreenHero from './components/ScreenHero';
import ScreenStory from './components/ScreenStory';
import ScreenVanshikaFiles from './components/ScreenVanshikaFiles';
import ScreenSoundtrack from './components/ScreenSoundtrack';
import ScreenEmotionalTurn from './components/ScreenEmotionalTurn';
import ScreenLetter from './components/ScreenLetter';
import ScreenOpenWhen from './components/ScreenOpenWhen';
import ScreenFuture from './components/ScreenFuture';
import ScreenBirthdayCake from './components/ScreenBirthdayCake';
import ScreenFinal from './components/ScreenFinal';
import FloatingNav from './components/FloatingNav';
import { chapters } from './data/chapters';
import SecretModal from './components/SecretModal';
import { easterEggList } from './data/secrets';
import { siteConfig } from './data/config';
import { soundEngine } from './utils/audioEngine';

export default function App() {
  const [hasOpenedGift, setHasOpenedGift] = useState(false);
  const [currentChapter, setCurrentChapter] = useState('hero');
  const [secretsFound, setSecretsFound] = useState(() => {
    try {
      const saved = localStorage.getItem('vanshika_secrets_found');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [activeSecretModal, setActiveSecretModal] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  // Sync secrets to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('vanshika_secrets_found', JSON.stringify(secretsFound));
    } catch (e) {
      console.warn("Storage error:", e);
    }
  }, [secretsFound]);

  // Enforce manual scroll restoration & reset to top on mount and while intro is shown
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    if (!hasOpenedGift) {
      document.body.style.overflow = 'hidden';
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else {
      document.body.style.overflow = '';
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [hasOpenedGift]);

  // Observer to track current chapter on scroll
  useEffect(() => {
    if (!hasOpenedGift) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentChapter(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    chapters.forEach((ch) => {
      const el = document.getElementById(ch.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [hasOpenedGift]);

  const handleUnlockSecret = (secretId) => {
    const secretObj = easterEggList.find((s) => s.id === secretId);
    if (!secretObj) return;

    if (!secretsFound.includes(secretId)) {
      const nextSecrets = [...secretsFound, secretId];
      setSecretsFound(nextSecrets);
    }

    soundEngine.playSecretUnlocked();
    setActiveSecretModal(secretObj);
  };

  const handleOpenGift = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setHasOpenedGift(true);
    setIsAudioPlaying(true);
    setCurrentChapter('hero');

    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 50);
  };

  const handleReplay = () => {
    // 1. Reset all secret easter eggs & clear storage
    setSecretsFound([]);
    try {
      localStorage.removeItem('vanshika_secrets_found');
    } catch (e) {
      console.warn("Storage error:", e);
    }
    setActiveSecretModal(null);

    // 2. Increment replay key so cake candle & effects reset
    setReplayKey((prev) => prev + 1);

    // 3. Reset chapter to hero and scroll to top
    setHasOpenedGift(false);
    setCurrentChapter('hero');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#f4efe6] selection:bg-[#d4af37]/30 selection:text-[#fff8eb] relative">
      
      {/* SCREEN 1: Cinematic Intro */}
      <AnimatePresence>
        {!hasOpenedGift && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 z-50"
          >
            <ScreenIntro
              recipientName={siteConfig.recipientName}
              onOpenGift={handleOpenGift}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Experience Body (Rendered once gift is opened or always in background ready) */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: hasOpenedGift ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="relative"
      >
        {/* Film grain subtle overlay */}
        <div className="fixed inset-0 pointer-events-none film-grain z-30 opacity-40" />

        {/* Floating Navigation & Controls */}
        <FloatingNav
          currentChapter={currentChapter}
          onSelectChapter={setCurrentChapter}
          secretsFound={secretsFound}
          totalSecrets={easterEggList.length}
          isAudioPlaying={isAudioPlaying}
          setIsAudioPlaying={setIsAudioPlaying}
        />

        {/* SCREEN 2: Hero */}
        <ScreenHero
          onUnlockSecret={handleUnlockSecret}
          isSecretUnlocked={secretsFound.includes('secret-hero-star')}
        />

        {/* SCREEN 3: Our Story Timeline */}
        <ScreenStory
          onUnlockSecret={handleUnlockSecret}
          isSecretUnlocked={secretsFound.includes('secret-polaroid-corner')}
        />

        {/* SCREEN 4: The Vanshika Files */}
        <ScreenVanshikaFiles />

        {/* SCREEN 6: Our Soundtrack */}
        <ScreenSoundtrack
          onUnlockSecret={handleUnlockSecret}
          isSecretUnlocked={secretsFound.includes('secret-cassette-heart')}
          isAudioPlaying={isAudioPlaying}
          setIsAudioPlaying={setIsAudioPlaying}
        />

        {/* SCREEN 7: The Emotional Turn */}
        <ScreenEmotionalTurn />

        {/* SCREEN 8: Letter to Vanshika */}
        <ScreenLetter
          onUnlockSecret={handleUnlockSecret}
          isSecretUnlocked={secretsFound.includes('secret-wax-seal')}
        />

        {/* SCREEN 9: Open When Envelopes */}
        <ScreenOpenWhen />

        {/* SCREEN 10: Future Memories Checklist */}
        <ScreenFuture />

        {/* SCREEN 11: Birthday Cake Climax */}
        <ScreenBirthdayCake
          key={`cake-${replayKey}`}
          recipientName={siteConfig.recipientName}
          onUnlockSecret={handleUnlockSecret}
          isSecretUnlocked={secretsFound.includes('secret-candle-spark')}
        />

        {/* SCREEN 12: Final Highlight Screen */}
        <ScreenFinal onReplay={handleReplay} />

        {/* Secret Easter Egg Modal */}
        <SecretModal
          secret={activeSecretModal}
          isOpen={!!activeSecretModal}
          onClose={() => setActiveSecretModal(null)}
          foundCount={secretsFound.length}
          totalSecrets={easterEggList.length}
        />
      </motion.main>
    </div>
  );
}
