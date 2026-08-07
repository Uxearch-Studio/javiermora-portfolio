"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";

export default function Hero() {
  const { t } = useLang();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % t.hero.roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [t.hero.roles.length]);

  const scrollToWork = () =>
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-5 pt-20 pb-16 overflow-hidden"
    >
      {/* Background glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#7C3AED]/10 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#14B8A6]/8 blur-[100px]" />
      </div>

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--bg-border) 1px, transparent 1px), linear-gradient(90deg, var(--bg-border) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-[#9494AB] text-base sm:text-lg mb-3 font-mono tracking-wide"
        >
          {t.hero.greeting}
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#E8E8F0] leading-[1.05] mb-4"
        >
          {t.hero.name}
        </motion.h1>

        {/* Animated role */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="h-14 sm:h-16 md:h-20 flex items-center mb-6"
        >
          <motion.span
            key={roleIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight gradient-text"
          >
            {t.hero.roles[roleIndex]}
          </motion.span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-[#9494AB] text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mb-10"
        >
          {t.hero.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="flex flex-col xs:flex-row gap-3 mb-14"
        >
          <button
            onClick={scrollToWork}
            className="group relative px-6 py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium rounded-xl transition-all duration-200 text-sm sm:text-base overflow-hidden"
          >
            <span className="relative z-10">{t.hero.cta} →</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button
            onClick={scrollToContact}
            className="px-6 py-3.5 border border-[#1E1E32] hover:border-[#7C3AED]/50 text-[#9494AB] hover:text-[#E8E8F0] font-medium rounded-xl transition-all duration-200 text-sm sm:text-base hover:bg-[#7C3AED]/5"
          >
            {t.hero.contact}
          </button>
        </motion.div>

        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex items-center gap-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#14B8A6] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#14B8A6]" />
          </span>
          <span className="text-[#4A4A6A] text-sm font-mono">{t.hero.location}</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[#4A4A6A] text-xs font-mono tracking-widest uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[#4A4A6A] to-transparent"
        />
      </motion.div>
    </section>
  );
}
