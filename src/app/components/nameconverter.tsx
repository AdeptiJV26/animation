// components/SAOFileConverter.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Terminal } from "lucide-react";

export default function NameConverter() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const processText = (text: string) => {
    return text
      // 1. Target literal words WITH symbols first (before they turn into spaces)
      // Use "i" flag for case-insensitive matching
      .replace(/\(lyrics\)|\[lyrics\]/gi, "") 
      
      // 2. Standard cleanup
      .replace(/YTDown\.com_YouTube_/g, "")
      .replace(/_1080p|_720p/g, "")
      .replace(/1080p|720p/g, "")
      
      // 3. Turn separators into spaces
      .replace(/[_-]/g, " ")
      
      // 4. Remove standalone words (case insensitive)
      .replace(/\bmedia\b|\blyrics\b|\b001\b|\b1\b/gi, "")
      
      // 5. Final pass: Clean whitespace and filter Jumbled IDs
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .filter((word) => {
        const hasNumber = /\d/.test(word);
        const hasMixedCase = /[a-z]/.test(word) && /[A-Z]/.test(word);
        const isIDLength = word.length === 11;
        const isJumbled = (hasNumber && hasMixedCase) || (isIDLength && hasNumber);
        return !isJumbled;
      })
      .join(" ")
      .trim();
  };

  const output = processText(input);

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] p-4 font-mono">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-black/60 border border-white/10 rounded-sm relative shadow-[0_0_40px_rgba(0,0,0,0.5)]"
      >
        {/* TOP BAR / COPY BUTTON */}
        <div className="flex justify-between items-center p-2 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2 pl-2">
            <Terminal size={14} className="text-orange-500" />
            <span className="text-[10px] text-white/50 uppercase tracking-widest font-black">
              File_Refactor_v1.0
            </span>
          </div>

          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-6 py-1 transition-all duration-300 border ${
              copied
                ? "bg-emerald-500 border-emerald-400"
                : "bg-orange-600 border-orange-400 hover:bg-orange-500"
            }`}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span className="text-[10px] font-black text-white uppercase tracking-tighter">
              {copied ? "SUCCESS" : "LINK START (COPY)"}
            </span>
          </button>
        </div>

        {/* HUD CONTENT */}
        <div className="p-6 space-y-6 relative overflow-hidden">
          {/* Background Hex Decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rotate-45 translate-x-16 -translate-y-16 pointer-events-none border border-orange-500/10" />

          {/* INPUT AREA */}
          <div className="space-y-2">
            <div className="flex justify-between text-[9px] font-bold text-orange-500/70 tracking-widest uppercase">
              <span>[ Raw_Data_Input ]</span>
            </div>
            <textarea
              className="w-full h-24 bg-black/40 border border-white/20 p-3 text-white/80 text-sm focus:outline-none focus:border-orange-500/50 transition-all resize-none"
              placeholder="Paste YTDown string here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          {/* TRANSFORMATION VISUALIZER */}
          <div className="flex justify-center py-2">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-1 bg-orange-500 rotate-45"
            />
          </div>

          {/* OUTPUT AREA */}
          <div className="space-y-2">
            <div className="flex justify-between text-[9px] font-bold text-cyan-500/70 tracking-widest uppercase">
              <span>[ Processed_Result ]</span>
            </div>
            <div className="w-full min-h-24 bg-cyan-500/5 border border-cyan-500/30 p-4 text-cyan-400 text-sm font-bold break-all relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={output}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {output || "Awaiting Data..."}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* FOOTER STATUS */}
        <div className="p-2 bg-white/5 border-t border-white/10 flex justify-between px-4">
          <div className="flex gap-4">
            <div className="w-2 h-2 bg-orange-500 self-center" />
            <span className="text-[8px] text-white/30 uppercase font-black self-center">
              System_Integrity: 100%
            </span>
          </div>
          <span className="text-[8px] text-orange-500/50 uppercase font-black self-center tracking-tighter">
            Cardinal_Engine_Active
          </span>
        </div>
      </motion.div>
    </div>
  );
}
