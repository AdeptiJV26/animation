// components/CyberStats.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { MailWarning, DollarSign, Clock, ShieldAlert } from "lucide-react"; // [NEW_CODE] added ShieldAlert

function Counter({
  value,
  duration = 2,
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
    const titleTimer = setTimeout(() => setShowTitle(true), 2000);
    const statsStartTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleItems((prev) => {
          if (prev >= 4) {
            // [NEW_CODE] Updated from 3 to 4
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 2500);
    }, 2000);

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
      {/* TITLE SECTION */}
      <div className="h-32 flex items-center justify-center">
        {showTitle && (
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-cyan-400 text-4xl md:text-5xl font-black uppercase text-center drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]"
          >
            The Daily Reality
          </motion.h1>
        )}
      </div>

      {/* STAGGERED STATS SECTION */}
      <div className="mt-12 space-y-6 max-w-5xl w-full">
        {stats.map((item, index) => (
          <div key={index} className="h-28">
            {visibleItems > index && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#0f172a]/80 backdrop-blur-md text-white p-6 border-l-16 rounded-2xl border-cyan-500 flex items-center gap-6 shadow-xl"
              >
                <div className="flex-shrink-0">{item.icon}</div>
                <p className="text-xl md:text-2xl font-bold leading-tight">
                  {item.prefix}
                  <Counter
                    value={item.value}
                    suffix={item.suffix}
                    isCurrency={item.isCurrency}
                    isFloat={item.isFloat}
                  />{" "}
                  {item.text}
                </p>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
