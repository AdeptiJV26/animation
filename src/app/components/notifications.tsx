"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

const PURCHASES = [
  "RTX 5090 Ti",
  "Luxury Watch",
  "Coffee Machine",
  "Electric Scooter",
  "Designer Jacket",
  "OLED Monitor",
  "Noise Cancelling Headphones",
  "Smart Fridge",
  "Mechanical Keyboard",
  "Gaming Chair",
];

export default function NotificationLayer() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

const positions = useMemo(() => 
    PURCHASES.map((_, i) => {
      const quadrant = i % 4; 
      const randomOffset = Math.random() * 15; // Random variation
      
      switch(quadrant) {
        case 0: // Top-Left
          return { top: `${5 + randomOffset}%`, left: `${5 + randomOffset}%`, right: 'auto', bottom: 'auto' };
        case 1: // Top-Right
          return { top: `${5 + randomOffset}%`, right: `${5 + randomOffset}%`, left: 'auto', bottom: 'auto' };
        case 2: // Bottom-Left
          return { bottom: `${5 + randomOffset}%`, left: `${5 + randomOffset}%`, top: 'auto', right: 'auto' };
        case 3: // Bottom-Right
        default:
          return { bottom: `${5 + randomOffset}%`, right: `${5 + randomOffset}%`, top: 'auto', left: 'auto' };
      }
    }), 
  []);

  useEffect(() => {
    const timers = PURCHASES.map((_, i) =>
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, i]);
      }, (i + 1) * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 px-50 overflow-hidden bg-[#00FF00]">
      <div className="relative w-full h-full px-20">
        {PURCHASES.map(
          (item, i) =>
            visibleItems.includes(i) && (
              <motion.div
    key={i}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    className="absolute p-4 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl flex items-center space-x-3 w-64"
    style={{
      top: positions[i].top,
      left: positions[i].left,
      right: positions[i].right,
      bottom: positions[i].bottom,
    }}
  >
                <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-500 text-xl font-bold">✓</span>
                </div>
                <div className="overflow-hidden">
                  <p className="text-slate-400 text-[10px] uppercase font-bold">
                    Purchase Successful
                  </p>
                  <p className="text-white text-sm font-semibold truncate">
                    {item}
                  </p>
                </div>
              </motion.div>
            )
        )}
      </div>
    </div>
  );
}
