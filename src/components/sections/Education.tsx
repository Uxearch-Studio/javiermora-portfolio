"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/context/LangContext";

export default function Education() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-padding max-w-6xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="text-[#7C3AED] font-mono text-sm tracking-widest uppercase mb-4"
      >
        {t.education.label}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#E8E8F0] leading-tight mb-12 whitespace-pre-line"
      >
        {t.education.title}
      </motion.h2>

      <div className="grid sm:grid-cols-2 gap-5">
        {t.education.items.map((item, i) => (
          <motion.div
            key={item.institution}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 + i * 0.15, duration: 0.6 }}
            className="bg-[#0F0F1A] border border-[#1E1E32] rounded-2xl p-6 hover:border-[#2E2E4A] transition-all group"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-white text-sm"
                style={{
                  background: i === 0 ? "#7C3AED" : "#14B8A6",
                }}
              >
                {item.institution.charAt(0)}
              </div>
              <span className="text-[#4A4A6A] text-xs font-mono text-right">{item.period}</span>
            </div>

            <h3 className="text-[#E8E8F0] font-bold text-lg mb-1 group-hover:text-white transition-colors">
              {item.institution}
            </h3>
            <p className="text-[#A78BFA] text-sm font-medium mb-1">{item.degree}</p>
            <p className="text-[#4A4A6A] text-xs font-mono mb-3">{item.location}</p>
            <p className="text-[#9494AB] text-sm leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
