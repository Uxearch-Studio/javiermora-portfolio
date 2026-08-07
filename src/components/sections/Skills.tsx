"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/context/LangContext";

export default function Skills() {
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
        {t.skills.label}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#E8E8F0] mb-12"
      >
        {t.skills.title}
      </motion.h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {t.skills.categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
            className="bg-[#0F0F1A] border border-[#1E1E32] rounded-2xl p-5 hover:border-[#2E2E4A] transition-all group"
          >
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: ["#7C3AED", "#14B8A6", "#F59E0B", "#3B82F6"][i],
                }}
              />
              <h3 className="text-[#E8E8F0] font-semibold text-sm">{cat.name}</h3>
            </div>
            <ul className="space-y-2">
              {cat.items.map((item) => (
                <li
                  key={item}
                  className="text-[#9494AB] text-sm group-hover:text-[#B4B4C4] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#4A4A6A]">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Marquee of tools */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-10 overflow-hidden relative"
      >
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#09090F] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#09090F] to-transparent z-10" />
        <div className="flex gap-6 animate-marquee whitespace-nowrap">
          {[...tools, ...tools].map((tool, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0F0F1A] border border-[#1E1E32] rounded-full text-[#4A4A6A] text-sm flex-shrink-0"
            >
              {tool}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

const tools = [
  "Figma", "Framer", "Principle", "ProtoPie", "Notion",
  "Linear", "Miro", "Lottie", "Webflow", "Vercel",
  "Firebase", "GitHub", "Tailwind", "React", "Storybook",
];
