// components/CyberVerticalChart.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface FraudData {
  label: string;
  value: number;
  color: "orange" | "grey";
  shortLabel: string;
}

function RollingNumber({ value, isLoaded, delay, duration }: { 
  value: number; 
  isLoaded: boolean; 
  delay: number; 
  duration: number 
}) {
  const count = useMotionValue(0);
  // [NEW_CODE] Updated to show 2 decimal places for accuracy with smaller values
  const rounded = useTransform(count, (latest) => `$${latest.toFixed(2)}B`);

  useEffect(() => {
    if (isLoaded) {
      const controls = animate(count, value, {
        duration: duration,
        delay: delay,
        ease: "circOut",
      });
      return controls.stop;
    }
  }, [isLoaded, count, value, delay, duration]);

  return <motion.span className="text-[10px] md:text-xs text-white font-bold mb-1 tracking-tighter">
    {rounded}
  </motion.span>;
}

export default function CyberVerticalChart() {
  const [isLoaded, setIsLoaded] = useState(false);
  const BAR_DURATION = 6;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // [NEW_CODE] Updated Data Source 2025
  const data: FraudData[] = [
    { label: "Investment Fraud", shortLabel: "Investment Fraud", value: 6.50, color: "orange" },
    { label: "Business Email Compromise (BEC)", shortLabel: "BEC", value: 2.90, color: "orange" },
    { label: "Tech Support / Impersonation", shortLabel: "Tech Support", value: 1.90, color: "orange" },
    { label: "Personal Data Breach", shortLabel: "Personal Data Breach", value: 1.45, color: "grey" },
    { label: "Ransomware", shortLabel: "Ransomware", value: 1.10, color: "orange" },
    { label: "Phishing / Spoofing", shortLabel: "Phish", value: 0.07, color: "orange" },
  ];

  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="relative h-screen w-full bg-[#010409] bg-[radial-gradient(circle_at_20%_50%,_#0a192f_0%,_#020617_70%,_#000_100%)] flex flex-col items-center justify-center font-mono overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full px-6 md:px-12 text-center mb-8"
      >
        <h2 className="text-cyan-400 text-xl md:text-3xl font-black uppercase tracking-widest">
          Information Security Threats of 2025</h2>
         
      </motion.div>

      <div className="relative w-full max-w-6xl h-[50vh] md:h-[60vh] px-8 md:px-16 flex items-end justify-around gap-2 md:gap-4 border-b border-slate-700/50 pb-2">
        {data.map((item, idx) => {
          const itemDelay = idx * 0.2;
          return (
            <div key={idx} className="relative flex flex-col items-center w-full h-full justify-end group">
              <RollingNumber 
                value={item.value} 
                isLoaded={isLoaded} 
                delay={itemDelay} 
                duration={BAR_DURATION} 
              />

              <div className="relative w-full max-w-[50px] bg-slate-900/40 border-t border-x border-slate-800 h-full flex items-end">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{
                    height: isLoaded ? `${(item.value / maxValue) * 100}%` : 0,
                  }}
                  transition={{
                    duration: BAR_DURATION,
                    delay: isLoaded ? itemDelay : 0,
                    ease: "circOut",
                  }}
                  className={`w-full relative ${
                    item.color === "orange"
                      ? "bg-gradient-to-t from-orange-700 via-orange-500 to-orange-300 shadow-[0_0_15px_rgba(251,146,60,0.3)]"
                      : "bg-gradient-to-t from-slate-700 via-slate-500 to-slate-300 shadow-[0_0_15px_rgba(148,163,184,0.1)]"
                  }`}
                >
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-white/40" />
                </motion.div>
              </div>

              <div className="absolute -bottom-10 h-8 flex items-center justify-center">
                <span className={`text-[9px] md:text-xs font-bold uppercase ${
                    item.color === "orange" ? "text-orange-400" : "text-slate-400"
                  }`}>
                  {item.shortLabel}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 px-6 overflow-hidden">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={isLoaded ? { y: 0, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 10, bounce: 0.6, delay: 1 }}
          className="bg-black/40 border border-slate-700 px-6 py-3 rounded-full"
        >
          <span className="text-white text-xl md:text-3xl font-bold uppercase tracking-[0.2em]">
            Majority of threats involves <span className="text-orange-500 underline">CLICKING</span>
          </span>
        </motion.div>
      </div>
    </div>
  );
}