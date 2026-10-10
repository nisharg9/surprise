// Script to generate aesthetic placeholder SVG images for all asset slots
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.join(__dirname, '../public/assets/vanshika');

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const placeholders = [
  { name: 'hero.jpg', title: 'Vanshika', subtitle: 'Hero Portrait Placeholder', tag: 'Replace in /assets/vanshika/hero.jpg', color1: '#241b18', color2: '#120f13', accent: '#e0a96d' },
  { name: 'memory01.jpg', title: 'Chapter 01', subtitle: 'Day Zero / The Beginning', tag: 'Replace in /assets/vanshika/memory01.jpg', color1: '#1b1d28', color2: '#0e1017', accent: '#845ec2' },
  { name: 'memory02.jpg', title: 'Chapter 02', subtitle: 'The Chaotic Adventure', tag: 'Replace in /assets/vanshika/memory02.jpg', color1: '#2b1b1e', color2: '#160c0f', accent: '#c28585' },
  { name: 'memory03.jpg', title: 'Chapter 03', subtitle: '3 AM Conversations', tag: 'Replace in /assets/vanshika/memory03.jpg', color1: '#152220', color2: '#091312', accent: '#6da08c' },
  { name: 'memory04.jpg', title: 'Chapter 04', subtitle: 'The Dumbest Sibling Fights', tag: 'Replace in /assets/vanshika/memory04.jpg', color1: '#2c2215', color2: '#140f08', accent: '#d4af37' },
  { name: 'memory05.jpg', title: 'Chapter 05', subtitle: 'Forever Sisterhood', tag: 'Replace in /assets/vanshika/memory05.jpg', color1: '#261726', color2: '#120912', accent: '#d65db1' },
  { name: 'funny01.jpg', title: 'The Vanshika Files', subtitle: 'Exhibit A: Drama Alert', tag: 'Replace in /assets/vanshika/funny01.jpg', color1: '#2d1a1a', color2: '#150a0a', accent: '#e26d5c' },
  { name: 'funny02.jpg', title: 'The Vanshika Files', subtitle: 'Exhibit B: The Stare', tag: 'Replace in /assets/vanshika/funny02.jpg', color1: '#1f1b2c', color2: '#0d0b14', accent: '#ff9671' },
  { name: 'future.jpg', title: 'Future Chapter', subtitle: 'More Memories Await', tag: 'Replace in /assets/vanshika/future.jpg', color1: '#16232b', color2: '#081116', accent: '#0089ba' },
  { name: 'final.jpg', title: 'Forever Family', subtitle: 'My Sister From Another Mother', tag: 'Replace in /assets/vanshika/final.jpg', color1: '#271f1a', color2: '#120c08', accent: '#e0a96d' }
];

placeholders.forEach(({ name, title, subtitle, tag, color1, color2, accent }) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="50%" stop-color="#141318" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.25" />
      <stop offset="100%" stop-color="${accent}" stop-opacity="0" />
    </radialGradient>
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.08 0"/>
    </filter>
  </defs>
  <rect width="800" height="1000" fill="url(#bgGrad)" />
  <rect width="800" height="1000" fill="url(#glow)" />
  <rect width="800" height="1000" filter="url(#noise)" opacity="0.6"/>
  
  <!-- Subtle aesthetic framing -->
  <rect x="30" y="30" width="740" height="940" fill="none" stroke="${accent}" stroke-opacity="0.3" stroke-width="1" stroke-dasharray="4,4" rx="12" />
  <rect x="40" y="40" width="720" height="920" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1" rx="8" />
  
  <!-- Camera icon placeholder -->
  <g transform="translate(360, 360)">
    <circle cx="40" cy="40" r="55" fill="rgba(255,255,255,0.03)" stroke="${accent}" stroke-opacity="0.4" stroke-width="1.5" />
    <path d="M25 32 L32 32 L35 27 L45 27 L48 32 L55 32 C58 32 60 34 60 37 L60 53 C60 56 58 58 55 58 L25 58 C22 58 20 56 20 53 L20 37 C20 34 22 32 25 32 Z" fill="none" stroke="${accent}" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="40" cy="45" r="7" fill="none" stroke="${accent}" stroke-width="2"/>
    <circle cx="53" cy="37" r="1.5" fill="${accent}"/>
  </g>

  <!-- Typography -->
  <text x="400" y="520" text-anchor="middle" font-family="'Cinzel', 'Playfair Display', serif" font-size="34" font-weight="600" fill="#f4efe6" letter-spacing="4">${title}</text>
  <text x="400" y="565" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" fill="#c9a875" letter-spacing="1.5">${subtitle}</text>
  
  <rect x="250" y="615" width="300" height="36" rx="18" fill="rgba(255,255,255,0.04)" stroke="${accent}" stroke-opacity="0.3" stroke-width="1"/>
  <text x="400" y="638" text-anchor="middle" font-family="'Caveat', cursive" font-size="18" fill="#e2d9cc" letter-spacing="0.5">${tag}</text>
  
  <text x="400" y="910" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" fill="rgba(255,255,255,0.25)" letter-spacing="2">PERSONAL SCRAPBOOK ARCHIVE</text>
</svg>`;

  fs.writeFileSync(path.join(assetsDir, name), svg);
});

console.log("Successfully generated all placeholder image files!");
