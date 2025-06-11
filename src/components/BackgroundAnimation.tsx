'use client';

import React, { useEffect, useRef } from 'react';

const BackgroundAnimation = ({
  beamColor = '#A020F0',
  gridLineColor = 'rgba(255, 255, 255, 0.1)',
  particleDensity = 0.0005,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      decay: number;
      color: string;
    }> = [];
    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      life: 1,
      decay: Math.random() * 0.01 + 0.005,
      color: beamColor,
    });

    const initParticles = () => {
      particles = [];
      const count = Math.floor(canvas.width * canvas.height * particleDensity);
      for (let i = 0; i < count; i++) {
        particles.push(createParticle());
      }
    };

    const drawGrid = () => {
      const size = 50;
      ctx.strokeStyle = gridLineColor;
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += size) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += size) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const drawParticles = () => {
      ctx.shadowBlur = 15;
      ctx.shadowColor = beamColor;
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 200) {
          p.vx += (dx / dist) * 0.5;
          p.vy += (dy / dist) * 0.5;
        }
        p.vx *= 0.98;
        p.vy *= 0.98;

        if (p.life <= 0) {
          particles[i] = createParticle();
        }

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            const alpha = 0.5 - d / 200;
            const r = parseInt(beamColor.slice(1, 3), 16) || 0;
            const g = parseInt(beamColor.slice(3, 5), 16) || 0;
            const b = parseInt(beamColor.slice(5, 7), 16) || 0;
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = setSize;
    const handleMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    setSize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouse);
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [beamColor, gridLineColor, particleDensity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        background: 'transparent',
      }}
    />
  );
};

export default BackgroundAnimation;