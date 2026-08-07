"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/context/LangContext";

export default function Contact() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const socials = [
    { name: "LinkedIn", href: "https://linkedin.com/in/javiermoradesign", icon: "in" },
    { name: "Behance", href: "https://behance.net/javiermora", icon: "bē" },
    { name: "Medium", href: "https://medium.com/@javiermora", icon: "M" },
  ];

  return (
    <section id="contact" ref={ref} className="section-padding max-w-6xl mx-auto">
      {/* Big CTA card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-[#0F0F1A] border border-[#1E1E32] rounded-3xl p-8 sm:p-12 overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#7C3AED]/10 blur-[100px]" />
        </div>

        {/* Grid lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--bg-border) 1px, transparent 1px), linear-gradient(90deg, var(--bg-border) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative text-center max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-[#7C3AED] font-mono text-sm tracking-widest uppercase mb-4"
          >
            {t.contact.label}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#E8E8F0] leading-tight mb-6 whitespace-pre-line"
          >
            {t.contact.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-[#9494AB] text-base sm:text-lg leading-relaxed mb-8"
          >
            {t.contact.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <a
              href="mailto:hello@javiermora.co"
              className="group relative px-8 py-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-xl transition-all duration-200 text-base overflow-hidden"
            >
              <span className="relative z-10">{t.contact.cta} →</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center gap-3"
          >
            <p className="text-[#4A4A6A] text-sm">{t.contact.orConnect}</p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl border border-[#1E1E32] bg-[#16162A] flex items-center justify-center text-[#9494AB] hover:text-[#E8E8F0] hover:border-[#7C3AED]/40 transition-all text-sm font-bold"
                  aria-label={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-8 flex items-center justify-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#14B8A6] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#14B8A6]" />
            </span>
            <span className="text-[#4A4A6A] text-sm font-mono">{t.contact.availability}</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
