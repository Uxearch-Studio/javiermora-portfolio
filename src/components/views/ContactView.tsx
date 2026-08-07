"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const links = [
  { labelEn: "Email", labelEs: "Email", value: "hello@javiermora.co", href: "mailto:hello@javiermora.co" },
  { labelEn: "LinkedIn", labelEs: "LinkedIn", value: "linkedin.com/in/javiermoradesign", href: "https://linkedin.com/in/javiermoradesign" },
  { labelEn: "Behance", labelEs: "Behance", value: "behance.net/javiermora", href: "https://behance.net/javiermora" },
  { labelEn: "Medium", labelEs: "Medium", value: "medium.com/@javiermora", href: "https://medium.com/@javiermora" },
];

export default function ContactView() {
  const { lang } = useLang();

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-xl">
      <motion.p variants={item} className="section-label mb-3">
        {lang === "en" ? "Get in touch" : "Contacto"}
      </motion.p>

      <motion.h1
        variants={item}
        className="text-3xl sm:text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A] mb-4"
      >
        {lang === "en"
          ? "Let's build something\nworth your time."
          : "Construyamos algo\nque valga tu tiempo."}
      </motion.h1>

      <motion.p variants={item} className="text-[#52525B] text-base leading-relaxed mb-10">
        {lang === "en"
          ? "I'm open to senior product design roles, consulting, and long-term partnerships. Fluent in English and Spanish. Miami-based, remote-first."
          : "Estoy abierto a roles senior de diseño de producto, consultoría y partnerships a largo plazo. Fluido en inglés y español. Basado en Miami, remoto primero."}
      </motion.p>

      {/* Primary CTA */}
      <motion.div variants={item} className="mb-10">
        <a
          href="mailto:hello@javiermora.co"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0A0A0A] hover:bg-[#1a1a1a] text-white font-semibold rounded-xl transition-all duration-150 text-sm"
        >
          hello@javiermora.co
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </motion.div>

      <hr className="divider" />

      {/* Links table */}
      <motion.div variants={item}>
        <p className="section-label mb-4">{lang === "en" ? "Elsewhere" : "En otros lados"}</p>
        <div className="space-y-0">
          {links.map((link, i) => (
            <a
              key={link.labelEn}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`flex items-center justify-between py-3.5 group transition-colors ${
                i < links.length - 1 ? "border-b border-[#E4E4E7]" : ""
              }`}
            >
              <span className="text-[#A1A1AA] text-sm">
                {lang === "en" ? link.labelEn : link.labelEs}
              </span>
              <span className="text-[#0A0A0A] text-sm font-medium group-hover:text-[#2563EB] transition-colors flex items-center gap-1.5">
                {link.value}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <path d="M2.5 9.5l7-7M4 2.5h5.5V8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          ))}
        </div>
      </motion.div>

      {/* Availability */}
      <motion.div variants={item} className="mt-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
          </span>
          <p className="text-[#15803D] text-xs font-medium">
            {lang === "en" ? "Open to opportunities · Miami · Remote" : "Disponible · Miami · Remoto"}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
