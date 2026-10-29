"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useNav, Section } from "@/context/NavContext";
import { useLang } from "@/context/LangContext";

const VERSION = "v1.0.0";

const navItems: { id: Section; labelEn: string; labelEs: string; icon: React.ReactNode }[] = [
  {
    id: "home",
    labelEn: "Home",
    labelEs: "Inicio",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M1.5 6.2L7.5 1.5l6 4.7V13a.5.5 0 01-.5.5H9.5V9.5h-4V13.5H2a.5.5 0 01-.5-.5V6.2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "process",
    labelEn: "Design Process",
    labelEs: "Proceso de Diseño",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M7.5 4.5v3.25l2 1.75" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "cases",
    labelEn: "Work",
    labelEs: "Proyectos",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1.5" y="4" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M5 4V3a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v1" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M1.5 7.5h12" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    id: "about",
    labelEn: "About Me",
    labelEs: "Sobre Mí",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <circle cx="7.5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M2 13.5c0-2.761 2.462-5 5.5-5s5.5 2.239 5.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "experience",
    labelEn: "Experience",
    labelEs: "Experiencia",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1.5" y="5" width="12" height="8.5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M5 5V3.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5V5" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    id: "ai-design",
    labelEn: "AI Native Design",
    labelEs: "Diseño AI Native",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M7.5 1.5l1.5 3.5L13 6.5l-4 1.5L7.5 12l-1.5-4L2 6.5l4-1.5L7.5 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "contact" as Section,
    labelEn: "Contact",
    labelEs: "Contacto",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1.5" y="3.5" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M1.5 5l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({ mobileOpen, onClose, collapsed, onToggleCollapse }: SidebarProps) {
  const { active, setActive } = useNav();
  const { lang, toggleLang } = useLang();

  const navigate = (id: Section) => {
    setActive(id);
    onClose();
  };

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={`
          fixed top-0 left-0 h-full z-40 flex flex-col shrink-0
          bg-[#141D2C] border-r border-white/[0.06]
          transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          lg:sticky lg:left-auto lg:z-[50] lg:self-start lg:h-dvh
          ${collapsed ? "w-[52px]" : "w-[200px]"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        style={{ overflow: "visible" }}
      >
        {/* ── Brand header ── */}
        {collapsed ? (
          <div className="flex flex-col items-center pt-5 pb-3 gap-2">
            <Image src="/ico.png" alt="Javier Mora" width={32} height={32} className="rounded-[6px]" priority />
            {/* Expand button */}
            <button
              onClick={onToggleCollapse}
              className="w-7 h-7 flex items-center justify-center rounded-md text-white/30 hover:bg-white/[0.06] hover:text-white/70 transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M4.5 2l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-3 pt-5 pb-4">
            <Image src="/ico.png" alt="Javier Mora" width={28} height={28} className="rounded-[6px] shrink-0" priority />
            <div className="min-w-0 flex-1 overflow-hidden">
              <p className="text-white text-[13px] font-semibold leading-[1.2] truncate">Javier Mora</p>
              <p className="text-white/40 text-[10px] leading-[1.4] truncate">Senior Product Designer</p>
            </div>
            {/* Collapse button */}
            <button
              onClick={onToggleCollapse}
              className="shrink-0 w-6 h-6 flex items-center justify-center rounded-md text-white/30 hover:bg-white/[0.06] hover:text-white/70 transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M8.5 2L4 6.5l4.5 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}

        {/* Divider */}
        <div className="mx-3 h-px bg-white/[0.06]" />

        {/* ── Nav items ── */}
        <nav className="flex-1 px-1.5 pt-2" style={{ overflow: "visible" }}>
          <ul className="space-y-0.5">
            {navItems.map((navItem) => {
              const isActive = active === navItem.id;
              const label = lang === "en" ? navItem.labelEn : navItem.labelEs;
              return (
                <li key={navItem.id}>
                  <button
                    onClick={() => navigate(navItem.id)}
                    className={`
                      relative group w-full flex items-center gap-2 rounded-md
                      text-[13px] font-medium text-left transition-all duration-100
                      ${collapsed ? "justify-center py-[9px] px-0" : "px-2.5 py-[7px]"}
                      ${isActive
                        ? "bg-white text-[#0A0A0A]"
                        : "text-white/50 hover:bg-white/[0.06] hover:text-white/90"
                      }
                    `}
                  >
                    <span className={`flex-shrink-0 ${isActive ? "text-[#0A0A0A]" : "text-white/30"}`}>
                      {navItem.icon}
                    </span>
                    {!collapsed && <span className="truncate">{label}</span>}
                    {!collapsed && navItem.id === "ai-design" && (
                      <span className={`ml-auto shrink-0 text-[10px] font-bold px-1 py-px rounded
                        ${isActive ? "bg-[#0A0A0A]/10 text-[#0A0A0A]" : "bg-[#2563EB]/20 text-[#60A5FA]"}`}>
                        NEW
                      </span>
                    )}
                    {collapsed && (
                      <span className="
                        pointer-events-none absolute left-[calc(100%+10px)] z-[999]
                        bg-[#0A0A0A] text-white text-[12px] font-medium
                        px-2.5 py-1.5 rounded-md border border-white/[0.1]
                        whitespace-nowrap shadow-xl
                        opacity-0 group-hover:opacity-100 transition-opacity duration-150
                      ">
                        {label}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ── Bottom section ── */}
        <div className="pb-3 pt-2 px-1.5 space-y-2">
          <div className="mx-2 h-px bg-white/[0.06]" />

          {/* Lang toggle */}
          {collapsed ? (
            <button
              onClick={toggleLang}
              title={lang === "en" ? "Switch to Español" : "Switch to English"}
              className="w-full flex items-center justify-center py-[7px] rounded-md text-white/40 hover:bg-white/[0.06] hover:text-white/70 transition-colors"
            >
              <span className="text-[10px] font-bold tracking-wide">{lang.toUpperCase()}</span>
            </button>
          ) : (
            <div
              className="relative flex items-center h-[28px] rounded-[6px] p-[2px] mx-2"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div
                className="absolute top-[2px] bottom-[2px] rounded-[4px] transition-all duration-200 ease-out"
                style={{
                  background: "rgba(255,255,255,0.16)",
                  width: "calc(50% - 2px)",
                  left: lang === "en" ? 2 : "calc(50%)",
                }}
              />
              <button
                onClick={() => lang === "es" && toggleLang()}
                className={`relative z-10 flex-1 text-[11px] font-bold h-full rounded-[4px] transition-colors select-none
                  ${lang === "en" ? "text-white" : "text-white/30 hover:text-white/55"}`}
              >
                EN
              </button>
              <button
                onClick={() => lang === "en" && toggleLang()}
                className={`relative z-10 flex-1 text-[11px] font-bold h-full rounded-[4px] transition-colors select-none
                  ${lang === "es" ? "text-white" : "text-white/30 hover:text-white/55"}`}
              >
                ES
              </button>
            </div>
          )}

          {/* Contact CTA */}
          {collapsed ? (
            <a
              href="mailto:hello@javiermora.co"
              title="hello@javiermora.co"
              className="w-full flex items-center justify-center py-[7px] rounded-md text-white/40 hover:bg-white/[0.06] hover:text-white/70 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
                <rect x="1.5" y="3.5" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M1.5 5l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </a>
          ) : (
            <a
              href="mailto:hello@javiermora.co"
              className="mx-2 flex items-center gap-2 px-3 py-2 rounded-[6px] transition-colors group"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <svg width="13" height="13" viewBox="0 0 15 15" fill="none" className="shrink-0 text-white/30 group-hover:text-white/60 transition-colors">
                <rect x="1.5" y="3.5" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M1.5 5l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span className="text-[11px] text-white/50 group-hover:text-white/80 transition-colors truncate">
                hello@javiermora.co
              </span>
            </a>
          )}

          {/* Version */}
          {!collapsed && (
            <p className="text-center text-[10px] text-white/20 tracking-wide pt-0.5">
              {VERSION}
            </p>
          )}
        </div>
      </aside>
    </>
  );
}
