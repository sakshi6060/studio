'use client';

import React, { useEffect, useRef, type RefObject } from 'react';

interface BackgroundAnimationProps {
  beamColor?: string;
  gridLineColor?: string;
  particleDensity?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  color: string;
}

const BackgroundAnimation = ({
  beamColor = '#A020F0', // Default purple
  gridLineColor = 'rgba(255, 255, 255, 0.1)', // Default subtle white
  particleDensity = 0.0005, // Default density
}: BackgroundAnimationProps) => {
  const canvasRef: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);
  let animationFrameId: number;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const createParticle = (): Particle => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        life: 1,
        decay: Math.random() * 0.01 + 0.005,
        color: beamColor,
      };
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor(canvas.width * canvas.height * particleDensity);
      for (let i = 0; i < numParticles; i++) {
        particles.push(createParticle());
      }
    };

    const drawGrid = () => {
      const gridSize = 50;
      ctx.strokeStyle = gridLineColor;
      ctx.lineWidth = 0.5;

      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
    };

    const drawParticles = () => {
      ctx.shadowBlur = 15;
      ctx.shadowColor = beamColor;

      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          p.vx += (dx / dist) * 0.05; // Reduced acceleration
          p.vy += (dy / dist) * 0.05;
        }

        p.vx *= 0.98;
        p.vy *= 0.98;

        if (p.life <= 0 || p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          particles[index] = createParticle();
          // Reset to an edge
          if (Math.random() < 0.5) {
            particles[index].x = Math.random() * canvas.width;
            particles[index].y = Math.random() < 0.5 ? 0 : canvas.height;
          } else {
            particles[index].x = Math.random() < 0.5 ? 0 : canvas.width;
            particles[index].y = Math.random() * canvas.height;
          }
        }
        
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        for (let i = index + 1; i < particles.length; i++) {
          const otherP = particles[i];
          const distance = Math.sqrt(Math.pow(p.x - otherP.x, 2) + Math.pow(p.y - otherP.y, 2));

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(otherP.x, otherP.y);
            // Ensure beamColor is valid for RGBA parsing
            const r = parseInt(beamColor.slice(1, 3), 16) || 0;
            const g = parseInt(beamColor.slice(3, 5), 16) || 0;
            const b = parseInt(beamColor.slice(5, 7), 16) || 0;
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${Math.max(0, 0.5 - (distance / 200))})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      ctx.shadowBlur = 0; // Reset shadow for other drawings if any
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Apply a fill that is slightly transparent to allow CSS background to influence
      // This is a dark overlay, which creates the trail effect
      ctx.fillStyle = 'rgba(0, 0, 10, 0.05)'; // Dark blueish overlay for trails
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawGrid();
      drawParticles();

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    setCanvasDimensions();
    // initParticles(); // Called by setCanvasDimensions
    window.addEventListener('resize', setCanvasDimensions);
    document.addEventListener('mousemove', handleMouseMove); // Use document for wider mouse tracking
    
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasDimensions);
      document.removeEventListener('mousemove', handleMouseMove);
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
        backgroundColor: 'transparent', // Transparent so CSS bg shows through initially
      }}
    />
  );
};

export default BackgroundAnimation;
