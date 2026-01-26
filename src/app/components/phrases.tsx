// components/CyberReminder.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // [NEW_CODE] Added AnimatePresence
import { ShieldAlert } from "lucide-react";
import Image from "next/image";

export default function CyberReminder() {
  const [step, setStep] = useState(0);
  const [isShuttingDown, setIsShuttingDown] = useState(false); // [NEW_CODE] Shutdown state

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 5000),
      setTimeout(() => setStep(2), 8000),
      setTimeout(() => setStep(3), 9100),
      setTimeout(() => setStep(4), 11000),
      setTimeout(() => setStep(5), 13000),
      setTimeout(() => setIsShuttingDown(true), 113000), // [NEW_CODE] Trigger shutdown
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-black font-mono overflow-hidden">
      {/* TV SHUTDOWN OVERLAY */}
      <AnimatePresence>
        {isShuttingDown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center pointer-events-none"
          >
            {/* Horizontal Line Collapse */}
            <motion.div
              initial={{ scaleY: 0.005, scaleX: 1, background: "#fff" }}
              animate={{
                scaleX: [1, 1, 0],
                scaleY: [0.005, 0.005, 0],
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 0.4,
                times: [0, 0.5, 1],
                ease: "easeInOut",
              }}
              className="w-full h-1 shadow-[0_0_15px_#fff]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1PX DOT PATTERN BACKGROUND */}
      <div
        className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#10b981 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* 1. Logo Reveal Section */}
      <div className="relative mb-12 z-10">
        <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border border-emerald-500/30 overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.15)] bg-black">
          <div className="absolute inset-0 bg-[#061a11] z-0" />
          <motion.div
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.2)_0%,transparent_70%)] z-0"
          />
          <motion.div
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{
              duration: 3,
              ease: [0.45, 0.05, 0.55, 0.95],
              delay: 0.5,
            }}
            className="relative w-full h-full z-10"
          >
            <Image
              src="/LBRDClogo.png"
              alt="LBRDC Logo"
              fill
              className="object-contain p-6 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
            />
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_30px_rgba(16,185,129,0.3)] pointer-events-none" />
          </motion.div>

          <motion.div
            initial={{ top: "100%", opacity: 1 }}
            animate={{ top: "-12%", opacity: 1 }}
            transition={{
              duration: 3.2,
              ease: [0.45, 0.05, 0.55, 0.95],
              delay: 0.5,
            }}
            onAnimationComplete={() => {
              const el = document.getElementById("weld-ray");
              if (el) el.style.display = "none";
            }}
            id="weld-ray"
            className="absolute left-0 right-0 h-[3px] bg-white z-40 shadow-[0_0_15px_#fff,0_0_30px_#10b981]"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5], scaleY: [1, 2, 1] }}
              transition={{ duration: 0.1, repeat: Infinity }}
              className="absolute inset-0 w-full h-full bg-emerald-400 blur-[3px]"
            />
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                animate={{
                  x: [0, i % 2 === 0 ? 40 : -40],
                  y: [0, 30],
                  opacity: [1, 0],
                  scale: [1, 0],
                }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                style={{ left: `${15 + i * 15}%` }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* 2. Sequential Suspense Text Section */}
      <div className="text-center space-y-8 max-w-4xl px-6 relative z-50">
        <motion.div
          initial="hidden"
          animate={step >= 1 ? "visible" : "hidden"}
          variants={fadeIn}
          className="flex items-center justify-center gap-3 text-emerald-500 tracking-[0.6em] uppercase font-black"
        >
          <span className="text-md text-amber-500">&gt;LBRDC ADVISORY</span>
        </motion.div>

        <div className="space-y-4 leading-tight">
          <motion.p
            initial="hidden"
            animate={step >= 2 ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-white text-2xl md:text-5xl font-bold"
          >
            If you notice any
          </motion.p>
          <motion.p
            initial="hidden"
            animate={step >= 3 ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-red-600 text-2xl md:text-6xl font-black drop-shadow-[0_0_15px_rgba(220,38,38,0.6)] uppercase"
          >
            suspicious activity
          </motion.p>
          <motion.p
            initial="hidden"
            animate={step >= 4 ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-lg md:text-3xl font-light text-red-500"
          >
            or technical irregularities
          </motion.p>
        </div>

        {/* Step 5: Glassmorphism & Gradient Accent Panel */}
        <div className="mt-12 relative flex justify-center items-center min-h-[120px] w-full max-w-2xl mx-auto">
          <motion.div
            initial={{ width: 0, height: "2px", opacity: 0 }}
            animate={
              step >= 5
                ? { width: "100%", height: ["2px", "2px", "100%"], opacity: 1 }
                : {}
            }
            transition={{
              duration: 0.8,
              times: [0, 0.4, 1],
              ease: "easeInOut",
            }}
            className="absolute bg-white/5 border-y border-emerald-500/50 backdrop-blur-xl rounded-2xl w-full h-full shadow-2xl overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={step >= 5 ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="absolute inset-0 border-x border-emerald-500/30 rounded-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-emerald-500" />
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={step >= 5 ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="relative z-10 p-8 flex flex-col md:flex-row items-center gap-8 w-full"
          >
            <div className="bg-emerald-500 p-3 rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.4)] shrink-0">
              <ShieldAlert className="text-black w-8 h-8" />
            </div>
            <div className="text-center md:text-left flex flex-col gap-2">
              {" "}
              {/* Structure fixed here */}
              <p className="text-white text-xl leading-snug">
                Please contact the{" "}
                <span className="text-amber-500 font-bold underline underline-offset-8 decoration-amber-500/50">
                  IT Unit
                </span>{" "}
                immediately.
              </p>
              <p className="text-white/80 text-lg">
                Email:{" "}
                <motion.span
                  // [NEW_CODE] Subtle glow and scale pulse for visibility
                  animate={{
                    color: ["#22d3ee", "#ffffff", "#22d3ee"],
                    textShadow: [
                      "0 0 0px rgba(34,211,238,0)",
                      "0 0 12px rgba(250, 204, 21, 0.3)",
                      "0 0 0px rgba(34,211,238,0)",
                    ],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  it@lbpresources.com
                </motion.span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
