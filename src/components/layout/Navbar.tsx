"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LangContext";

const sections = ["work", "about", "experience", "now", "contact"] as const;

export default function Navbar() {
  const { t, toggleLang, lang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#09090F]/90 backdrop-blur-md border-b border-[#1E1E32]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#14B8A6] flex items-center justify-center text-white font-bold text-sm">
              JM
            </div>
            <span className="text-[#E8E8F0] font-medium text-sm hidden sm:block group-hover:text-[#A78BFA] transition-colors">
              Javier Mora
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {sections.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="px-3 py-2 text-sm text-[#9494AB] hover:text-[#E8E8F0] transition-colors rounded-lg hover:bg-[#1E1E32]/50"
              >
                {t.nav[s]}
              </button>
            ))}
            <div className="w-px h-4 bg-[#1E1E32] mx-2" />
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 text-sm font-medium text-[#7C3AED] border border-[#7C3AED]/40 rounded-lg hover:bg-[#7C3AED]/10 transition-all"
            >
              {lang === "en" ? "ES" : "EN"}
            </button>
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleLang}
              className="px-2.5 py-1 text-xs font-medium text-[#7C3AED] border border-[#7C3AED]/40 rounded-lg"
            >
              {lang === "en" ? "ES" : "EN"}
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="p-2 text-[#9494AB] hover:text-[#E8E8F0] transition-colors"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5 w-5">
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  className="block h-px bg-current origin-center transition-all"
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block h-px bg-current"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className="block h-px bg-current origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#09090F]/95 backdrop-blur-md border-b border-[#1E1E32] md:hidden"
          >
            <div className="flex flex-col px-5 py-4 gap-1">
              {sections.map((s) => (
                <button
                  key={s}
                  onClick={() => scrollTo(s)}
                  className="text-left px-4 py-3 text-[#9494AB] hover:text-[#E8E8F0] hover:bg-[#1E1E32]/50 rounded-lg transition-all"
                >
                  {t.nav[s]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
