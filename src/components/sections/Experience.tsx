"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/context/LangContext";

export default function Experience() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} className="section-padding max-w-6xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-[#7C3AED] font-mono text-sm tracking-widest uppercase mb-4"
      >
        {t.experience.label}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#E8E8F0] leading-tight mb-12"
      >
        {t.experience.title}
      </motion.h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#7C3AED]/60 via-[#1E1E32] to-transparent" />

        <div className="space-y-8">
          {t.experience.items.map((item, i) => (
            <motion.div
              key={item.company}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-12 sm:pl-16"
            >
              {/* Dot */}
              <div className="absolute left-[13px] sm:left-[21px] top-5 w-3 h-3 rounded-full border-2 border-[#7C3AED] bg-[#09090F]" />

              <div className="bg-[#0F0F1A] border border-[#1E1E32] rounded-2xl p-5 sm:p-6 hover:border-[#2E2E4A] transition-all duration-300 group">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#E8E8F0] group-hover:text-white transition-colors">
                      {item.company}
                    </h3>
                    <p className="text-[#7C3AED] text-sm font-medium mt-0.5">{item.role}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[#9494AB] text-sm font-mono">{item.period}</p>
                    <p className="text-[#4A4A6A] text-xs mt-0.5">{item.location}</p>
                  </div>
                </div>

                <p className="text-[#9494AB] text-sm leading-relaxed mb-4">{item.description}</p>

                <div className="flex flex-wrap gap-2">
                  {item.highlights.map((h) => (
                    <span
                      key={h}
                      className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#7C3AED]/10 text-[#A78BFA] border border-[#7C3AED]/20"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
