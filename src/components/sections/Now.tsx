"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/context/LangContext";

export default function Now() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const nowData = [
    { key: "building" as const, icon: "🛠", color: "#7C3AED", border: "#7C3AED/20", bg: "#7C3AED/10" },
    { key: "learning" as const, icon: "🧠", color: "#14B8A6", border: "#14B8A6/20", bg: "#14B8A6/10" },
    { key: "reading" as const, icon: "📚", color: "#F59E0B", border: "#F59E0B/20", bg: "#F59E0B/10" },
  ];

  return (
    <section id="now" ref={ref} className="section-padding max-w-6xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="text-[#7C3AED] font-mono text-sm tracking-widest uppercase mb-4"
      >
        {t.now.label}
      </motion.p>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#E8E8F0] leading-tight whitespace-pre-line"
        >
          {t.now.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 flex-shrink-0"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#14B8A6] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#14B8A6]" />
          </span>
          <span className="text-[#4A4A6A] text-xs font-mono">{t.now.location}</span>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
        className="text-[#4A4A6A] text-sm font-mono mb-8 -mt-6"
      >
        {t.now.subtitle}
      </motion.p>

      <div className="grid sm:grid-cols-3 gap-5">
        {nowData.map(({ key, icon, color }, i) => {
          const section = t.now[key];
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
              className="bg-[#0F0F1A] border border-[#1E1E32] rounded-2xl p-5 hover:border-[#2E2E4A] transition-all"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">{icon}</span>
                <h3 className="text-[#E8E8F0] font-semibold text-sm">{section.label}</h3>
              </div>
              <ul className="space-y-3">
                {section.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: color }}
                    />
                    <span className="text-[#9494AB] text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
