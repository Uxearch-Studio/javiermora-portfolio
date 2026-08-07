"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/context/LangContext";

export default function Hobbies() {
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
        {t.hobbies.label}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#E8E8F0] leading-tight mb-12 whitespace-pre-line"
      >
        {t.hobbies.title}
      </motion.h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {t.hobbies.items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
            className="group bg-[#0F0F1A] border border-[#1E1E32] rounded-2xl p-5 hover:border-[#2E2E4A] hover:bg-[#111120] transition-all duration-300 cursor-default"
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">
              {item.emoji}
            </div>
            <h3 className="text-[#E8E8F0] font-bold text-base mb-2 group-hover:text-white transition-colors">
              {item.title}
            </h3>
            <p className="text-[#4A4A6A] text-sm leading-relaxed group-hover:text-[#9494AB] transition-colors">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
