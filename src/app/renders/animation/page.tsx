'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export default function BankAnimation() {
  const count = useMotionValue(10000);
  const rounded = useTransform(count, (latest) =>
    latest.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );

  const [isLowBalance, setIsLowBalance] = useState(false);

  useEffect(() => {
    const controls = animate(count, 0, {
      duration: 10,
      ease: "linear",
      onUpdate: (latest) => {
        if (latest <= 1000 && !isLowBalance) {
          setIsLowBalance(true);
        }
      },
    });

    return () => controls.stop();
  }, [count, isLowBalance]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-md mx-auto"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-linear-to-br from-slate-700 to-slate-800 rounded-full border border-slate-700" />
          <div>
            <div className="h-4 w-32 bg-slate-800 rounded-md mb-2" />
            <div className="h-3 w-20 bg-slate-800/50 rounded-md" />
          </div>
        </div>
        <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-500 font-bold uppercase tracking-wider">
          Active Account
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest">Available Balance</p>
        <motion.p 
          className={`text-5xl font-mono font-bold tracking-tighter transition-colors duration-500 ${
            isLowBalance ? 'text-red-500' : 'text-white'
          }`}
        >
          $<motion.span>{rounded}</motion.span>
        </motion.p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="h-10 bg-slate-800 rounded-xl border border-slate-700/50" />
        <div className="h-10 bg-blue-600 rounded-xl border border-blue-500/50 shadow-lg shadow-blue-900/20" />
      </div>

      {isLowBalance && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-center text-xs text-red-400 font-medium animate-pulse"
        >
          Critical Balance Warning: Below $1,000.00
        </motion.p>
      )}
    </motion.div>
  );
}