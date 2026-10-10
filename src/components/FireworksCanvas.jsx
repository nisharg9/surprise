import React, { useEffect, useRef } from 'react';

export default function FireworksCanvas({ active = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const colors = ['#d4af37', '#f4efe6', '#ff758c', '#ff7eb3', '#f9d423', '#a1c4fd', '#c2e9fb', '#ff9a9e', '#fecfef'];

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 1.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.008;
        this.size = Math.random() * 3 + 1.5;
        this.gravity = 0.06;
      }

      update() {
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }

      draw(context) {
        context.save();
        context.globalAlpha = Math.max(0, this.alpha);
        context.fillStyle = this.color;
        context.shadowBlur = 10;
        context.shadowColor = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
    }

    const createExplosion = (x, y) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const count = 45 + Math.floor(Math.random() * 30);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y, color));
      }
    };

    let timer = 0;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      timer++;
      if (timer % 28 === 0) {
        const x = canvas.width * 0.2 + Math.random() * (canvas.width * 0.6);
        const y = canvas.height * 0.15 + Math.random() * (canvas.height * 0.4);
        createExplosion(x, y);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    // Initial bursts
    createExplosion(canvas.width * 0.35, canvas.height * 0.3);
    createExplosion(canvas.width * 0.65, canvas.height * 0.35);
    createExplosion(canvas.width * 0.5, canvas.height * 0.25);

    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
}
