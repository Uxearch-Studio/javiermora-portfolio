"use client";

import Image from "next/image";
import { useNav } from "@/context/NavContext";
import { useLang } from "@/context/LangContext";

const sectionNames: Record<string, { en: string; es: string }> = {
  home:        { en: "Home",             es: "Inicio" },
  process:     { en: "Design Process",   es: "Proceso" },
  cases:       { en: "Cases",            es: "Casos" },
  about:       { en: "About Me",         es: "Sobre Mí" },
  experience:  { en: "Experience",       es: "Experiencia" },
  "ai-design": { en: "AI Native Design", es: "AI Native" },
  contact:     { en: "Contact",          es: "Contacto" },
};

export default function TopBar() {
  const { active } = useNav();
  const { lang, toggleLang } = useLang();
  const section = sectionNames[active]?.[lang] ?? "";

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
            <span className="text-white/40 text-[13px] font-medium hidden sm:block">Product Designer</span>
            <span className="text-white/20 text-[13px] hidden sm:block">·</span>
            <span className="text-white text-[13px] font-semibold">{section}</span>
          </div>
        </div>

        {/* Right: availability + lang toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            <span className="text-emerald-400 text-[11px] font-medium">
              {lang === "en" ? "Open to work" : "Disponible"}
            </span>
          </div>

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
