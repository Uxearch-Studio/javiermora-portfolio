"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/context/LangContext";

export default function About() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="section-padding max-w-6xl mx-auto">
      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-[#7C3AED] font-mono text-sm tracking-widest uppercase mb-4"
      >
        {t.about.label}
      </motion.p>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left: text */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#E8E8F0] leading-tight mb-8 whitespace-pre-line"
          >
            {t.about.title}
          </motion.h2>

          <div className="space-y-4">
            {[t.about.bio1, t.about.bio2, t.about.bio3].map((bio, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className="text-[#9494AB] text-base sm:text-lg leading-relaxed"
              >
                {bio}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="mt-8 flex flex-col xs:flex-row gap-3"
          >
            <a
              href={`mailto:${t.about.email}`}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium rounded-xl transition-all text-sm"
            >
              {t.about.email}
            </a>
          </motion.div>
        </div>

        {/* Right: stats + photo placeholder */}
        <div className="space-y-6">
          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#0F0F1A] border border-[#1E1E32]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/20 via-transparent to-[#14B8A6]/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#14B8A6] mx-auto mb-3 flex items-center justify-center text-white text-3xl font-bold">
                  JM
                </div>
                <p className="text-[#4A4A6A] text-sm font-mono">Photo coming soon</p>
              </div>
            </div>
            {/* Corner accents */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-[#7C3AED]/40 rounded-tl-lg" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-[#14B8A6]/40 rounded-br-lg" />
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {t.about.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.1, duration: 0.5 }}
                className="bg-[#0F0F1A] border border-[#1E1E32] rounded-xl p-4 text-center"
              >
                <p className="text-2xl sm:text-3xl font-bold gradient-text mb-1">{stat.value}</p>
                <p className="text-[#4A4A6A] text-xs leading-tight">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
