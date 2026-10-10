import React, { useState } from 'react';
import { Camera, Maximize2 } from 'lucide-react';

export default function AestheticImage({
  src,
  alt = "Memory",
  className = "",
  aspectRatio = "aspect-[4/5]",
  objectPosition = "center 22%",
  objectFit = "cover",
  fallbackTitle = "Vanshika Memory",
  fallbackSubtitle = "Photo placeholder",
  showTape = false,
  tapeRotation = "-3deg",
  enableZoom = true,
  onClick,
  ...props
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden group select-none ${aspectRatio} ${className} bg-[#111016]`}
      {...props}
    >
      {/* Tape sticker if requested */}
      {showTape && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 washi-tape rounded-xs z-20 pointer-events-none opacity-80"
          style={{ transform: `translateX(-50%) rotate(${tapeRotation})` }}
        />
      )}

      {!hasError ? (
        <>
          {/* Blur skeleton while loading */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-[#16151c] animate-pulse flex items-center justify-center z-10">
              <Camera className="w-8 h-8 text-[#d4af37]/30" />
            </div>
          )}

          {/* Color Graded Image with Centered Face Framing */}
          <img
            src={src}
            alt={alt}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            loading="lazy"
            style={{
              objectPosition: objectPosition,
              objectFit: objectFit,
            }}
            className={`w-full h-full photo-grade-cinematic group-hover:scale-105 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Warm Golden Hour Ambient Blend Overlay */}
          <div className="absolute inset-0 photo-warm-glow mix-blend-soft-light pointer-events-none opacity-80 group-hover:opacity-90 transition-opacity" />

          {/* Subtle Cinematic Vignette */}
          <div className="absolute inset-0 photo-vignette pointer-events-none opacity-70 group-hover:opacity-50 transition-opacity" />

          {/* Subtle Bottom Shade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-60 pointer-events-none group-hover:opacity-40 transition-opacity" />

          {/* Subtle hover icon if clickable */}
          {enableZoom && onClick && (
            <div className="absolute bottom-2.5 right-2.5 p-1.5 rounded-full bg-black/60 text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm pointer-events-none">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          )}
        </>
      ) : (
        /* Aesthetic styled SVG fallback frame if file not found */
        <div className="w-full h-full bg-gradient-to-br from-[#1e1c24] via-[#121117] to-[#0a090e] border border-white/10 p-6 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-full bg-white/5 border border-[#d4af37]/30 flex items-center justify-center mb-4 group-hover:border-[#d4af37] transition-colors">
            <Camera className="w-6 h-6 text-[#d4af37]" />
          </div>
          <h4 className="font-serif text-lg text-[#f4efe6] tracking-wide mb-1 font-semibold">
            {fallbackTitle}
          </h4>
          <p className="text-xs text-[#c9a875] tracking-wider uppercase font-sans mb-3 opacity-90">
            {fallbackSubtitle}
          </p>
          <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/50 font-handwriting">
            Memory Frame
          </div>
        </div>
      )}
    </div>
  );
}
