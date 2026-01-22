// components/BreachSequence.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Compromised() {
  const [showHacker, setShowHacker] = useState(false);

  useEffect(() => {
    // 10 second delay before the icon appears and stays
    const timer = setTimeout(() => {
      setShowHacker(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#00FF00] flex flex-col items-center justify-center font-mono">
      
      {/* 1. HACKER ICON (Pops in and stays, Highest Z-Index, No Shadows) */}
      <div className="relative z-[100] mb-8">
        {showHacker && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-black"
          >
            <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </motion.div>
        )}
      </div>

      {/* 2. SIMPLIFIED ALERT BOX (No Shadows for easy Chroma Key) */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
        className="relative z-20 bg-black p-6 border-4 border-red-600 text-center"
      >
        <h1 className="text-white text-3xl font-black uppercase tracking-widest">
          BREACH DETECTED
        </h1>
      </motion.div>
    </div>
  );
}