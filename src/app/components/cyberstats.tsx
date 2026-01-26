// components/CyberStats.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { MailWarning, DollarSign, Clock, ShieldAlert } from "lucide-react";

function Counter({
  value,
  duration = 2.5, // [NEW_CODE] Fixed duration for precise sync
  isCurrency = false,
  suffix = "",
  isFloat = false,
}: {
  value: number;
  duration?: number;
  isCurrency?: boolean;
  suffix?: string;
  isFloat?: boolean;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: isFloat ? 1 : 0,
      maximumFractionDigits: isFloat ? 1 : 0,
    });
    return (isCurrency ? "$" : "") + formatter.format(latest) + suffix;
  });

  useEffect(() => {
    const controls = animate(count, value, { duration, ease: "easeOut" });
    return controls.stop;
  }, [count, value, duration]);

  return <motion.span>{rounded}</motion.span>;
}

export default function CyberStats() {
  const [showTitle, setShowTitle] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number>(0);

  useEffect(() => {
    const titleTimer = setTimeout(() => setShowTitle(true), 500);
    
    const statsStartTimer = setTimeout(() => {
      // [NEW_CODE] Interval is 2s, Counter is 2.5s. 
      // This ensures 0.5s of overlapping counting.
      const interval = setInterval(() => {
        setVisibleItems((prev) => {
          if (prev >= 4) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 2000); 
      return () => clearInterval(interval);
    }, 1000);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(statsStartTimer);
    };
  }, []);

  const stats = [
    {
      value: 3200,
      suffix: "",
      prefix: "Nearly ",
      text: " security breaches are officially recorded every year.",
      icon: <ShieldAlert className="text-cyan-400" size={32} />,
    },
    {
      value: 3.4,
      suffix: " Billion",
      text: " phishing emails are sent daily across the globe.",
      isFloat: true,
      icon: <MailWarning className="text-cyan-400" size={32} />,
    },
    {
      value: 17700,
      isCurrency: true,
      text: " is drained every minute from the global economy by phishing and related social engineering.",
      icon: <DollarSign className="text-cyan-400" size={32} />,
    },
    {
      value: 39,
      suffix: " seconds",
      prefix: "Every ",
      text: ", a new victim—individual or business—falls to a digital scam.",
      icon: <Clock className="text-cyan-400" size={32} />,
    },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#010409] bg-[radial-gradient(circle_at_20%_50%,_#0a192f_0%,_#020617_70%,_#000_100%)] flex flex-col items-center justify-center font-mono p-10">
      <div className="absolute inset-0 z-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(#22d3ee 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />

      <div className="h-32 flex items-center justify-center z-10">
        {showTitle && (
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-cyan-400 text-4xl md:text-5xl font-black uppercase tracking-tighter text-center drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]"
          >
            The Daily Reality
          </motion.h1>
        )}
      </div>

      <div className="mt-8 space-y-4 max-w-5xl w-full z-10">
        {stats.map((item, index) => (
          <div key={index} className="min-h-[110px]">
            {visibleItems > index && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-[#0f172a]/40 backdrop-blur-xl text-white p-6 border-l-8 rounded-xl border-cyan-500 flex items-center gap-6 shadow-2xl border border-white/5"
              >
                <div className="shrink-0 p-3 bg-cyan-950/30 rounded-lg border border-cyan-500/20">
                  {item.icon}
                </div>
                <p className="text-xl md:text-2xl font-bold leading-tight">
                  <span className="text-white/60 font-normal">{item.prefix}</span>
                  <span className="text-cyan-400">
                    <Counter
                      value={item.value}
                      suffix={item.suffix}
                      isCurrency={item.isCurrency}
                      isFloat={item.isFloat}
                    />
                  </span>
                  <span className="text-white/90"> {item.text}</span>
                </p>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}