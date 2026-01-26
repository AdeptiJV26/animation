// components/CyberCombinedBackground.tsx
'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CyberCombinedBackground() {
  const [isClient, setIsClient] = useState(false);
  const BEAM_COUNT = 10;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const vBeams = useMemo(() => 
    [...Array(BEAM_COUNT)].map(() => ({
      x: Math.random() * 100,
      duration: Math.random() * 5 + 4,
      delay: Math.random() * 10,
    })), []);

  const hBeams = useMemo(() => 
    [...Array(BEAM_COUNT)].map(() => ({
      y: Math.random() * 100,
      duration: Math.random() * 6 + 5,
      delay: Math.random() * 10,
    })), []);

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#020617]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#0a192f_0%,_#020617_100%)]" />
      
      <div 
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 90%)'
        }}
      />

      {/* [NEW_CODE] SVG now has hue-rotate animation and increased beam thickness/opacity for color visibility */}
      <motion.svg 
        className="absolute inset-0 h-full w-full"
        animate={{ filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)'] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {vBeams.map((beam, i) => (
          <motion.rect
            key={`v-${i}`}
            width="1.5"
            height="140"
            fill="url(#vGradient)"
            initial={{ x: `${beam.x}%`, y: "-20vh", opacity: 0 }}
            animate={{ y: ['-20vh', '120vh'], opacity: [0, 0.7, 0] }}
            transition={{
              duration: beam.duration,
              repeat: Infinity,
              delay: beam.delay,
              ease: "linear"
            }}
          />
        ))}

        {hBeams.map((beam, i) => (
          <motion.rect
            key={`h-${i}`}
            width="140"
            height="1.5"
            fill="url(#hGradient)"
            initial={{ x: "-20vw", y: `${beam.y}%`, opacity: 0 }}
            animate={{ x: ['-20vw', '120vw'], opacity: [0, 0.7, 0] }}
            transition={{
              duration: beam.duration,
              repeat: Infinity,
              delay: beam.delay,
              ease: "linear"
            }}
          />
        ))}

        <defs>
          <linearGradient id="vGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="hGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </motion.svg>

      <motion.div 
        className="absolute w-full h-[1px] bg-cyan-500/10 shadow-[0_0_10px_rgba(34,211,238,0.3)]"
        animate={{ y: ['0vh', '100vh'], filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)'] }}
        transition={{ 
          y: { duration: 12, repeat: Infinity, ease: "linear" },
          filter: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
      />
      <motion.div 
        className="absolute h-full w-[1px] bg-sky-500/10 shadow-[0_0_10px_rgba(14,165,233,0.3)]"
        animate={{ x: ['0vw', '100vw'], filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)'] }}
        transition={{ 
          x: { duration: 15, repeat: Infinity, ease: "linear" },
          filter: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
      />

      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.9)]" />
    </div>
  );
}