"use client";

import { useNav, Section } from "@/context/NavContext";
import { useLang } from "@/context/LangContext";

const navItems: {
  id: Section;
  labelEn: string;
  labelEs: string;
  icon: React.ReactNode;
}[] = [
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
    labelEn: "Process",
    labelEs: "Proceso",
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
    labelEn: "About",
    labelEs: "Sobre",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <circle cx="7.5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M2 14c0-3.314 2.462-5.5 5.5-5.5S13 10.686 13 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "experience",
    labelEn: "Exp.",
    labelEs: "Exp.",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1.5" y="5" width="12" height="8.5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M5 5V3.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5V5" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    id: "ai-design",
    labelEn: "AI",
    labelEs: "AI",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M7.5 1.5l1.5 3.5L13 6.5l-4 1.5L7.5 12l-1.5-4L2 6.5l4-1.5L7.5 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function BottomNav() {
  const { active, setActive } = useNav();
  const { lang } = useLang();

  return (
    <nav className="sticky bottom-0 z-50 h-[62px] bg-[#050505] border-t border-white/[0.08]">
      <div className="h-full max-w-[1400px] mx-auto px-5 md:px-[60px] flex items-center">
      <div className="flex items-stretch h-[42px] border border-white/[0.18] rounded-[3px] overflow-hidden w-full md:w-auto">
        {navItems.map((item, i) => {
          const isActive = active === item.id;
          const label = lang === "en" ? item.labelEn : item.labelEs;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`
                relative flex flex-col items-center justify-center gap-[3px]
                flex-1 md:w-[74px] md:flex-none transition-colors duration-150 select-none
                ${i < navItems.length - 1 ? "border-r border-white/[0.1]" : ""}
                ${isActive
                  ? "bg-white/[0.12] text-white"
                  : "bg-transparent text-white/30 hover:bg-white/[0.05] hover:text-white/55"
                }
              `}
            >
              {isActive && (
                <span className="absolute top-0 inset-x-0 h-[2px] bg-white" />
              )}
              <span className="shrink-0">{item.icon}</span>
              <span className="text-[9px] md:text-[10px] font-medium tracking-[0.02em] leading-none whitespace-nowrap">
                {label}
              </span>
              {item.id === "ai-design" && !isActive && (
                <span className="absolute top-[5px] right-[10px] w-[4px] h-[4px] bg-[#3B82F6] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
      </div>
    </nav>
  );
}
