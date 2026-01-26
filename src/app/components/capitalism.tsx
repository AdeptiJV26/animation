// components/SAOConverter.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function SAOConverter() {
  const [text, setText] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] font-mono p-6">
      {/* SAO HUD Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-white/5 border-2 border-[#eee] rounded-sm p-1 relative overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.05)]"
      >
        {/* Geometric Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
        
        <div className="p-8 space-y-8 bg-black/40 backdrop-blur-md border border-white/10">
          <h2 className="text-[#eee] text-xs tracking-[0.5em] uppercase font-bold border-b border-orange-500/50 pb-2 mb-6">
            User Interface // Text_Processor
          </h2>

          {/* Input Field */}
          <div className="space-y-2">
            <label className="text-orange-500 text-[10px] uppercase font-black tracking-widest block">
              [ Input_Source ]
            </label>
            <textarea
              placeholder="Paste text here..."
              onChange={handleInput}
              className="w-full h-32 bg-white/5 border border-white/20 p-4 text-white focus:outline-none focus:border-orange-500 transition-colors resize-none placeholder:text-white/20"
            />
          </div>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] flex-1 bg-white/10" />
            <div className="w-2 h-2 rotate-45 border border-orange-500" />
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          {/* Output Field */}
          <div className="space-y-2">
            <label className="text-orange-500 text-[10px] uppercase font-black tracking-widest block">
              [ Output_Result ]
            </label>
            <textarea
              readOnly
              value={text.toUpperCase()}
              placeholder="TRANSFORMED TEXT WILL APPEAR HERE"
              className="w-full h-32 bg-orange-500/5 border border-orange-500/30 p-4 text-orange-400 font-bold focus:outline-none resize-none placeholder:text-orange-900/40"
            />
          </div>

          {/* Status Bar */}
          <div className="flex justify-between items-center text-[9px] text-white/40 uppercase">
            <span>Buffer: {text.length} chars</span>
            <span className="text-orange-500 animate-pulse">● System_Online</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}