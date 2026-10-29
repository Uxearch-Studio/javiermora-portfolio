"use client";

import Image from "next/image";
import { useNav } from "@/context/NavContext";
import { useLang } from "@/context/LangContext";

const sectionNames: Record<string, { en: string; es: string }> = {
  home:        { en: "Home",             es: "Inicio" },
  process:     { en: "Design Process",   es: "Proceso" },
  cases:       { en: "Work",             es: "Proyectos" },
  about:       { en: "About Me",         es: "Sobre Mí" },
  experience:  { en: "Experience",       es: "Experiencia" },
  "ai-design": { en: "AI Native Design", es: "AI Native" },
  contact:     { en: "Contact",          es: "Contacto" },
};

export default function TopBar() {
  const { active, setActive } = useNav();
  const { lang, toggleLang } = useLang();
  const section = sectionNames[active]?.[lang] ?? "";
  const contactActive = active === "contact";

  return (
    <header className="sticky top-0 z-50 h-12 bg-[#0A0A0A] border-b border-white/[0.06]">
      <div className="h-full max-w-[1400px] mx-auto px-5 md:px-[60px] flex items-center justify-between">

        {/* Left: logo + breadcrumb */}
        <div className="flex items-center gap-3">
          <Image
            src="/ico.png"
            alt="JM"
            width={28}
            height={28}
            className="rounded-[6px] shrink-0"
            priority
          />
          <div className="flex items-center gap-2">
            <span className="text-white/40 text-[13px] font-medium hidden sm:block">Senior Product Designer</span>
            <span className="text-white/20 text-[13px] hidden sm:block">·</span>
            <span className="text-white text-[13px] font-semibold">{section}</span>
          </div>
        </div>

        {/* Right: availability + contact + lang toggle */}
        <div className="flex items-center gap-3">
          {/* Contact button */}
          <button
            onClick={() => setActive("contact")}
            className="flex items-center gap-1.5 h-[26px] px-3 rounded-[5px] transition-all duration-150 bg-white hover:bg-white/90 active:scale-[0.97]"
            style={{ border: "1px solid rgba(0,0,0,0.08)" }}
          >
            <svg width="12" height="12" viewBox="0 0 15 15" fill="none" style={{ color: "#0A0A0A" }}>
              <rect x="1.5" y="3.5" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M1.5 5.5l6 4 6-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <span className="text-[12px] font-semibold text-[#0A0A0A] leading-none">
              {lang === "en" ? "Contact" : "Contacto"}
            </span>
          </button>

          {/* Segmented lang control */}
          <div
            className="relative flex items-center h-[26px] rounded-[5px] p-[2px]"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <div
              className="absolute top-[2px] bottom-[2px] rounded-[3px] transition-all duration-200 ease-out"
              style={{
                background: "rgba(255,255,255,0.18)",
                width: "calc(50% - 2px)",
                left: lang === "en" ? 2 : "calc(50%)",
              }}
            />
            <button
              onClick={() => lang === "es" && toggleLang()}
              className={`relative z-10 px-[10px] text-[11px] font-semibold h-full rounded-[3px] transition-colors select-none ${
                lang === "en" ? "text-white" : "text-white/30 hover:text-white/55"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => lang === "en" && toggleLang()}
              className={`relative z-10 px-[10px] text-[11px] font-semibold h-full rounded-[3px] transition-colors select-none ${
                lang === "es" ? "text-white" : "text-white/30 hover:text-white/55"
              }`}
            >
              ES
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}
