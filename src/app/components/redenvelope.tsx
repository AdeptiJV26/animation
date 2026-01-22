'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DelayedRedEnvelope() {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Wait 10 seconds before showing the envelope
    const timer = setTimeout(() => {
      setShouldShow(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#00FF00]">
      <AnimatePresence>
        {shouldShow && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.34, 1.56, 0.64, 1], // Custom cubic-bezier for a strong "backOut" bounce
            }}
            className="relative w-64 h-44 bg-red-600 rounded-xl shadow-2xl border-4 border-red-700 flex flex-col items-center justify-center"
          >
            {/* Envelope Flap */}
            <div 
              className="absolute top-0 left-0 right-0 h-1/2 bg-red-500 rounded-t-lg border-b-2 border-red-800/30" 
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} 
            />
            
            {/* Gold Seal */}
            <div className="z-10 w-16 h-16 bg-linear-to-br from-yellow-300 to-yellow-500 rounded-full border-4 border-yellow-600 shadow-xl flex items-center justify-center">
              <span className="text-red-700 text-center text-1xl font-bold italic">Click Here</span>
            </div>
            
            {/* Shadow beneath for 3D effect */}
            <div className="absolute -bottom-10 w-48 h-4 bg-black/20 blur-xl rounded-[100%]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}