// components/shield.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Shield() {
  const shieldPath = "M100 20C60 20 30 40 20 80C20 140 60 200 100 220C140 200 180 140 180 80C170 40 140 20 100 20Z";

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#010409] bg-[radial-gradient(circle_at_20%_50%,_#0a192f_0%,_#020617_70%,_#000_100%)]">
      
      {/* 1. OPTIMIZED BEAMS */}
      <div className="absolute inset-0 pointer-events-none">
        {[10, 25, 45, 75, 90].map((pos, i) => (
          <motion.div
            key={`beam-${i}`}
            initial={{ transform: 'translateY(-100%)', opacity: 0 }}
            animate={{ transform: 'translateY(400%)', opacity: [0, 0.4, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: i * 1.2, ease: "linear" }}
            style={{ left: `${pos}%` }}
            className="absolute w-[2px] h-[400px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent will-change-transform"
          />
        ))}
      </div>

      {/* 2. OPTIMIZED PADLOCKS */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[30, 50, 70, 90].map((pos, i) => (
          <motion.div
            key={`padlock-${i}`}
            initial={{ transform: 'translateY(110vh)' }}
            animate={{ transform: 'translateY(-20vh)' }}
            transition={{ duration: 20, repeat: Infinity, delay: i * 5, ease: "linear" }}
            style={{ left: `${pos}%` }}
            className="absolute will-change-transform"
          >
            <svg width="24" height="32" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* 3. THE BLUE STATIC SHIELD & GLOW */}
      <div className="absolute left-[10%] top-1/2 -translate-y-1/2 z-10">
        
        {/* Constant Cyan Aura */}
        <div className="absolute inset-[-120px] bg-cyan-500/15 blur-[100px] rounded-full" />
        
        <div className="relative scale-110 md:scale-150 transform-gpu">
           <svg viewBox="0 0 200 240" className="w-64 h-80 overflow-visible">
            {/* Main Blue Body */}
            <path 
              d={shieldPath} 
              fill="#083344" // Deep blue-cyan base
              stroke="#22d3ee"
              strokeWidth="2"
              className="opacity-90"
            />

            {/* Glowing Inner Gradient */}
            <defs>
              <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0891b2" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path d={shieldPath} fill="url(#shieldGrad)" />

            {/* Pulsing Aura Stroke */}
            <motion.path
              d={shieldPath}
              stroke="#67e8f9"
              strokeWidth="4"
              animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none"
              style={{ transformOrigin: 'center' }}
            />

            {/* Highlight Edge */}
            <path 
              d={shieldPath} 
              stroke="#cffafe" 
              strokeWidth="1" 
              className="opacity-50"
            />
          </svg>
        </div>
      </div>

      {/* 4. STATIC SCANLINES */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px]" />
    </div>
  );
}