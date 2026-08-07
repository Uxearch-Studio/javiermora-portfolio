"use client";

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
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
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

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-[240px] z-40 flex flex-col
          bg-[#0A0A0A] border-r border-white/[0.06]
          transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          lg:translate-x-0 lg:sticky lg:h-screen
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo — 20px horizontal, 20px top */}
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
              <span className="text-[#0A0A0A] text-[11px] font-bold tracking-tight">JM</span>
            </div>
            <div className="min-w-0">
              <p className="text-white text-[13px] font-semibold leading-[1.2] truncate">Javier Mora</p>
              <p className="text-white/40 text-[11px] leading-[1.4] truncate">Product Designer</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-5 h-px bg-white/[0.06]" />

        {/* Nav — 8px top padding, 20px horizontal */}
        <nav className="flex-1 px-3 pt-3 overflow-y-auto">
          <ul className="space-y-0.5">
            {navItems.map((navItem) => {
              const isActive = active === navItem.id;
              const label = lang === "en" ? navItem.labelEn : navItem.labelEs;
              return (
                <li key={navItem.id}>
                  <button
                    onClick={() => navigate(navItem.id)}
                    className={`
                      w-full flex items-center gap-2.5 px-3 py-[7px] rounded-md
                      text-[13px] font-medium text-left
                      transition-all duration-100
                      ${isActive
                        ? "bg-white text-[#0A0A0A]"
                        : "text-white/50 hover:bg-white/[0.06] hover:text-white/90"
                      }
                    `}
                  >
                    <span className={`flex-shrink-0 ${isActive ? "text-[#0A0A0A]" : "text-white/30"}`}>
                      {navItem.icon}
                    </span>
                    <span className="truncate">{label}</span>
                    {navItem.id === "ai-design" && (
                      <span className={`ml-auto shrink-0 text-[10px] font-bold px-1.5 py-px rounded
                        ${isActive
                          ? "bg-[#0A0A0A]/10 text-[#0A0A0A]"
                          : "bg-[#2563EB]/20 text-[#60A5FA]"
                        }`}
                      >
                        NEW
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="px-3 pb-4 pt-3 space-y-1">
          {/* Divider */}
          <div className="mx-2 mb-3 h-px bg-white/[0.06]" />

          {/* Availability */}
          <div className="flex items-center gap-2.5 px-3 py-[7px] rounded-md bg-white/[0.04]">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            <p className="text-emerald-400 text-[12px] font-medium">
              {lang === "en" ? "Open to work" : "Disponible"}
            </p>
          </div>

          {/* Lang toggle */}
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
        </div>
      </aside>
    </>
  );
}
