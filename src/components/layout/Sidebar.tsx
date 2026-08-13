"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useNav, Section } from "@/context/NavContext";
import { useLang } from "@/context/LangContext";

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
    labelEn: "Cases",
    labelEs: "Casos",
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
    id: "contact",
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
      {/* Mobile backdrop */}
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
          bg-[#18181B] border-r border-white/[0.06]
          transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          lg:static lg:top-auto lg:left-auto lg:z-auto lg:self-stretch
          ${collapsed ? "w-[52px]" : "w-[240px]"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        style={{ overflow: "visible" }}
      >
        {/* Brand header */}
        <div className={`flex items-center gap-3 pt-5 pb-4 ${collapsed ? "justify-center px-0" : "px-4"}`}>
          <Image
            src="/ico.png"
            alt="Javier Mora"
            width={32}
            height={32}
            className="rounded-[6px] shrink-0"
            priority
          />
          {!collapsed && (
            <div className="min-w-0 overflow-hidden">
              <p className="text-white text-[13px] font-semibold leading-[1.2] truncate">Javier Mora</p>
              <p className="text-white/40 text-[11px] leading-[1.4] truncate">Senior Product Designer</p>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="mx-3 h-px bg-white/[0.06]" />

        {/* Nav */}
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
                      relative group w-full flex items-center gap-2.5 rounded-md
                      text-[13px] font-medium text-left
                      transition-all duration-100
                      ${collapsed ? "justify-center py-[9px] px-0" : "px-3 py-[7px]"}
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
                      <span className={`ml-auto shrink-0 text-[10px] font-bold px-1.5 py-px rounded
                        ${isActive ? "bg-[#0A0A0A]/10 text-[#0A0A0A]" : "bg-[#2563EB]/20 text-[#60A5FA]"}`}
                      >
                        NEW
                      </span>
                    )}

                    {/* Tooltip — only when collapsed */}
                    {collapsed && (
                      <span className="
                        pointer-events-none absolute left-[calc(100%+10px)] z-[999]
                        bg-[#0A0A0A] text-white text-[12px] font-medium
                        px-2.5 py-1.5 rounded-md border border-white/[0.1]
                        whitespace-nowrap shadow-xl
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-150
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

        {/* Bottom controls */}
        <div className="pb-3 pt-2 px-1.5 space-y-0.5">
          <div className="mx-2 mb-2 h-px bg-white/[0.06]" />

          {/* Lang toggle — hidden when collapsed */}
          {!collapsed && (
            <button
              onClick={toggleLang}
              className="w-full flex items-center gap-2.5 px-3 py-[7px] rounded-md text-[13px] text-white/40 hover:bg-white/[0.06] hover:text-white/70 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.1"/>
                <path d="M7 1.75c-1.75 1.5-1.75 7 0 10.5M7 1.75c1.75 1.5 1.75 7 0 10.5M1.75 7h10.5" stroke="currentColor" strokeWidth="1.1"/>
              </svg>
              <span>{lang === "en" ? "Español" : "English"}</span>
            </button>
          )}

          {/* Collapse toggle */}
          <button
            onClick={onToggleCollapse}
            className={`w-full flex items-center gap-2.5 rounded-md py-[7px]
              text-[13px] text-white/40 hover:bg-white/[0.06] hover:text-white/70 transition-colors
              ${collapsed ? "justify-center px-0" : "px-3"}`}
          >
            <svg
              width="14" height="14" viewBox="0 0 14 14" fill="none"
              className={`shrink-0 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
            >
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {!collapsed && <span>{lang === "en" ? "Collapse" : "Colapsar"}</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
