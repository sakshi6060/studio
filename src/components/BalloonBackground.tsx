'use client';

import type { FC } from 'react';
import React from 'react';

const BalloonBackground: FC = () => (
  <>
    <div className="balloon-bg">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className={`balloon balloon--${i + 1}`} />
      ))}
    </div>
    <style jsx>{`
      .balloon-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        z-index: -1;
        pointer-events: none;
        background: #000; /* Consider if this should be transparent or theme-aware */
      }

      .balloon {
        position: absolute;
        bottom: -150px;
        width: 40px;
        height: 60px;
        background: rgba(255, 100, 150, 0.7);
        border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        animation: rise var(--duration) linear infinite;
        opacity: 0.8;
      }

      .balloon::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 6px;
        height: 8px;
        background: inherit;
        clip-path: polygon(50% 0, 0% 100%, 100% 100%);
      }

      .balloon--1 { --duration: 12s; left: 10%;   background: rgba(255, 80, 120, 0.7); }
      .balloon--2 { --duration: 10s; left: 30%;   background: rgba(255, 200, 80, 0.7); }
      .balloon--3 { --duration: 14s; left: 50%;   background: rgba(80, 200, 255, 0.7); }
      .balloon--4 { --duration: 11s; left: 70%;   background: rgba(200, 80, 255, 0.7); }
      .balloon--5 { --duration: 13s; left: 85%;   background: rgba(80, 255, 120, 0.7); }
      .balloon--6 { --duration: 9s;  left: 20%;   background: rgba(255, 120, 200, 0.7); }
      .balloon--7 { --duration: 15s; left: 40%;   background: rgba(120, 255, 200, 0.7); }
      .balloon--8 { --duration: 8s;  left: 60%;   background: rgba(200, 120, 255, 0.7); }

      @keyframes rise {
        0%   { transform: translateY(0)    scale(0.8); }
        50%  { opacity: 1; }
        100% { transform: translateY(-120vh) scale(1); opacity: 0; }
      }
    `}</style>
  </>
);

export default BalloonBackground;
