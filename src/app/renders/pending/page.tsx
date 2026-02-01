"use client";

import { motion } from "framer-motion";
import { Hammer, Coffee, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full p-8 antialiased text-center">
      {/* Floating Icon Group */}
      <div className="relative mb-8">
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Hammer className="w-20 h-20 text-accent" strokeWidth={3} />
        </motion.div>
        
        <motion.div 
          className="absolute -top-4 -right-4"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-8 h-8 text-yellow-500" />
        </motion.div>
      </div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4 max-w-md"
      >
        <h1 className="text-5xl font-black tracking-tighter text-txt1">
          Brewing Greatness
        </h1>
        <p className="text-xl font-medium text-txt1/70 leading-relaxed">
          This tool is currently being forged in the workshop. Grab a coffee and check back soon!
        </p>
      </motion.div>

      {/* Interactive Elements */}
      <motion.div 
        className="mt-12 flex flex-col items-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex gap-2 items-center px-4 py-2 bg-fg1/10 rounded-full border border-fg1/20 text-accent font-bold">
          <Coffee className="w-5 h-5" strokeWidth={3} />
          <span>Status: Roasting Pixels</span>
        </div>

        <Link
          href="/"
          className="group flex items-center gap-2 px-6 py-3 bg-bg1 border-2 border-fg1 text-txt1 font-black rounded-2xl hover:bg-fg1 transition-all active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" strokeWidth={3} />
          Back to Overview
        </Link>
      </motion.div>
    </div>
  );
}